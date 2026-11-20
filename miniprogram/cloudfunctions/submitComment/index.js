/**
 * 云函数：submitComment —— 发布评论 / 回复评论
 *
 * 入参：
 *   contentId      String  必填，所属内容 ID
 *   text           String  必填，正文（≤200 字）
 *   parentId       String  可选，父评论 ID；为空表示顶层评论
 *   replyToOpenid  String  可选，被回复人的 openid（楼中楼）
 *   nickName       String  可选，昵称（前端可传，缺省“游客”）
 *   avatarUrl      String  可选，头像
 *
 * 出参：
 *   { ok: true, data: {...} }                    发布成功
 *   { ok: false, code: 'RISKY', msg }            内容安全校验未通过
 *   { ok: false, code: 'BAD_PARAM' | 'TOO_LONG' | 'SERVER_ERROR', msg }
 *
 * 审核模式（先发后审 / 先审后发）：
 *   读取 config 集合中 _id = 'commentSetting' 的文档：
 *     { auditMode: 'after' }  → 先发后审，isPass 直接置 true
 *     { auditMode: 'before' } → 先审后发，isPass 置 false，等管理员审核
 *   文档不存在时按“先发后审”处理。
 */

const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

const COMMENTS = 'comments'
const CONFIG = 'config'

const MAX_TEXT = 200
// msgSecCheck 报错码：87014 = 内容含有违法违规内容
const RISKY_ERR_CODE = 87014

/**
 * 读取审核模式，异常时回落到先发后审
 * @returns {Promise<'after'|'before'>}
 */
async function readAuditMode() {
  try {
    const res = await db.collection(CONFIG).doc('commentSetting').get()
    const mode = res.data && res.data.auditMode
    return mode === 'before' ? 'before' : 'after'
  } catch (err) {
    // 集合/文档不存在都按默认策略处理，不阻断发布
    return 'after'
  }
}

/**
 * 调用微信内容安全接口（云调用，无需自建服务端）
 * @param {string} text 正文
 * @param {string} openid 用户 openid（v2 接口必填）
 * @returns {Promise<{pass: boolean, reason?: string}>}
 */
async function securityCheck(text, openid) {
  try {
    await cloud.openapi.security.msgSecCheck({
      content: text,
      version: 2,
      scene: 2, // 2 = 评论
      openid
    })
    return { pass: true }
  } catch (err) {
    const code = err && (err.errCode || err.errcode)
    if (Number(code) === RISKY_ERR_CODE) {
      return { pass: false, reason: '内容包含敏感信息，请修改后再试' }
    }
    // 其他异常（未开通云调用、超频、参数问题）：默认放行并留日志，
    // 需要“校验失败即拦截”时把下面的 FAIL_CLOSED 改成 true。
    const FAIL_CLOSED = false
    console.error('[submitComment] msgSecCheck error:', code, err && err.errMsg)
    if (FAIL_CLOSED) {
      return { pass: false, reason: '内容校验服务暂时不可用，请稍后再试' }
    }
    return { pass: true }
  }
}


// ---------- 集合兜底：首次调用时自动建集合，避免控制台漏建导致 502005 ----------
let __ensured = false
async function ensureCollections () {
  if (__ensured) return
  const names = ['comments', 'comment_likes']
  for (let i = 0; i < names.length; i++) {
    try {
      await db.createCollection(names[i])
    } catch (e) {
      // 已存在（-501001 / ResourceUnavailable.CollectionExists）直接忽略
    }
  }
  __ensured = true
}

exports.main = async (event) => {
  await ensureCollections()

  const { OPENID } = cloud.getWXContext()

  const contentId = String(event.contentId || '').trim()
  const rawText = String(event.text || '')
  const text = rawText.trim()
  const parentId = String(event.parentId || '').trim()
  const replyToOpenid = String(event.replyToOpenid || '').trim()
  const nickName = String(event.nickName || '').trim().slice(0, 20) || '游客'
  const avatarUrl = String(event.avatarUrl || '').trim()

  // ---------- 1. 参数校验 ----------
  if (!contentId) {
    return { ok: false, code: 'BAD_PARAM', msg: '缺少 contentId' }
  }
  if (!text) {
    return { ok: false, code: 'BAD_PARAM', msg: '说点什么再发吧' }
  }
  if (text.length > MAX_TEXT) {
    return { ok: false, code: 'TOO_LONG', msg: `最多 ${MAX_TEXT} 字` }
  }

  // 回复模式下校验父评论确实存在且属于同一条内容
  if (parentId) {
    try {
      const parent = await db.collection(COMMENTS).doc(parentId).get()
      if (!parent.data || parent.data.contentId !== contentId) {
        return { ok: false, code: 'BAD_PARAM', msg: '被回复的评论不存在' }
      }
    } catch (err) {
      return { ok: false, code: 'BAD_PARAM', msg: '被回复的评论不存在' }
    }
  }

  try {
    // ---------- 2. 内容安全校验 ----------
    const check = await securityCheck(text, OPENID)
    if (!check.pass) {
      return { ok: false, code: 'RISKY', msg: check.reason || '内容未通过校验' }
    }

    // ---------- 3. 按配置决定 isPass ----------
    const auditMode = await readAuditMode()
    const isPass = auditMode === 'after' // 先发后审 → 立即展示

    // ---------- 4. 入库 ----------
    const now = Date.now()
    const doc = {
      contentId,
      openid: OPENID,
      nickName,
      avatarUrl,
      parentId,
      replyToOpenid,
      text,
      createTime: now,
      isPass
    }

    const addRes = await db.collection(COMMENTS).add({ data: doc })

    return {
      ok: true,
      data: Object.assign({ _id: addRes._id, likeCount: 0, liked: false, isMine: true, children: [] }, doc),
      auditMode
    }
  } catch (err) {
    console.error('[submitComment] failed:', err)
    return { ok: false, code: 'SERVER_ERROR', msg: '发布失败，请稍后再试' }
  }
}
