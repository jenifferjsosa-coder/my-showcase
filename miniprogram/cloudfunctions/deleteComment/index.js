/**
 * 云函数：deleteComment —— 删除评论
 *
 * 入参：
 *   commentId  String  必填
 *
 * 出参：
 *   { ok: true, removed: Number }   删除的评论条数（顶层评论会连带删除其下回复）
 *   { ok: false, code: 'FORBIDDEN' | 'NOT_FOUND' | 'SERVER_ERROR', msg }
 *
 * 权限：
 *   1) 本人（openid 一致）可删自己的评论；
 *   2) 管理员可删任意评论。管理员有两种配置方式，满足其一即可：
 *      a. admins 集合中存在 _id === 当前 openid 的文档（推荐，可随时增删）；
 *      b. 云函数环境变量 ADMINS 中逗号分隔列出的 openid。
 */

const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

const COMMENTS = 'comments'
const LIKES = 'comment_likes'
const ADMINS = 'admins'

/**
 * 判断当前用户是否管理员
 * @param {string} openid
 * @returns {Promise<boolean>}
 */
async function isAdmin(openid) {
  // 方式 a：admins 集合
  try {
    const res = await db.collection(ADMINS).doc(openid).get()
    if (res.data) return true
  } catch (err) {
    // 文档不存在会抛错，忽略
  }
  // 方式 b：环境变量白名单
  const envAdmins = String(process.env.ADMINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return envAdmins.indexOf(openid) >= 0
}

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()

  const commentId = String(event.commentId || '').trim()
  if (!commentId) {
    return { ok: false, code: 'BAD_PARAM', msg: '缺少 commentId' }
  }

  try {
    // ---------- 1. 取评论并鉴权 ----------
    let doc
    try {
      const res = await db.collection(COMMENTS).doc(commentId).get()
      doc = res.data
    } catch (err) {
      doc = null
    }
    if (!doc) {
      return { ok: false, code: 'NOT_FOUND', msg: '评论不存在或已删除' }
    }

    const mine = doc.openid === OPENID
    const admin = mine ? true : await isAdmin(OPENID)
    if (!mine && !admin) {
      return { ok: false, code: 'FORBIDDEN', msg: '只能删除自己的评论' }
    }

    // ---------- 2. 连带删除子回复 ----------
    const childRes = await db.collection(COMMENTS)
      .where({ parentId: commentId })
      .limit(100)
      .get()
    const childIds = (childRes.data || []).map((c) => c._id)

    // ---------- 3. 删除点赞记录 ----------
    const targetIds = childIds.concat([commentId])
    try {
      await db.collection(LIKES).where({ commentId: db.command.in(targetIds) }).remove()
    } catch (err) {
      console.warn('[deleteComment] remove likes failed:', err && err.errMsg)
    }

    // ---------- 4. 删除评论本体 ----------
    if (childIds.length) {
      await db.collection(COMMENTS).where({ parentId: commentId }).remove()
    }
    await db.collection(COMMENTS).doc(commentId).remove()

    return { ok: true, removed: 1 + childIds.length }
  } catch (err) {
    console.error('[deleteComment] failed:', err)
    return { ok: false, code: 'SERVER_ERROR', msg: '删除失败，请稍后再试' }
  }
}
