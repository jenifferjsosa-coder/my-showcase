/**
 * 云函数：likeComment —— 评论点赞 / 取消点赞
 *
 * 入参：
 *   commentId  String  必填
 *   action     String  可选，'like' | 'unlike'；不传则按当前状态取反
 *
 * 出参：
 *   { ok: true, liked: Boolean, likeCount: Number }
 *
 * 防重复点赞：
 *   comment_likes 以 (commentId, openid) 唯一。云开发控制台需给该组合建
 *   “唯一索引”，index.js 里也做了先查后写的兜底（并发极小时足够）。
 */

const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

const COMMENTS = 'comments'
const LIKES = 'comment_likes'

/**
 * 统计某条评论的点赞总数
 * @param {string} commentId
 * @returns {Promise<number>}
 */
async function countLikes(commentId) {
  const res = await db.collection(LIKES).where({ commentId }).count()
  return res.total || 0
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

  const commentId = String(event.commentId || '').trim()
  const action = event.action === 'like' || event.action === 'unlike' ? event.action : ''

  if (!commentId) {
    return { ok: false, code: 'BAD_PARAM', msg: '缺少 commentId' }
  }

  try {
    // 评论必须存在（已删除的评论不可再点赞）
    const comment = await db.collection(COMMENTS).doc(commentId).get()
    if (!comment.data) {
      return { ok: false, code: 'NOT_FOUND', msg: '评论不存在' }
    }

    const existRes = await db.collection(LIKES)
      .where({ commentId, openid: OPENID })
      .limit(1)
      .get()
    const existed = !!(existRes.data && existRes.data.length)

    // 目标动作：显式传入优先，否则取反
    const wantLike = action ? action === 'like' : !existed

    if (wantLike && !existed) {
      await db.collection(LIKES).add({
        data: { commentId, openid: OPENID, createTime: Date.now() }
      })
    } else if (!wantLike && existed) {
      await db.collection(LIKES).where({ commentId, openid: OPENID }).remove()
    }

    const likeCount = await countLikes(commentId)

    return { ok: true, liked: wantLike, likeCount }
  } catch (err) {
    console.error('[likeComment] failed:', err)
    return { ok: false, code: 'SERVER_ERROR', msg: '操作失败，请稍后再试' }
  }
}
