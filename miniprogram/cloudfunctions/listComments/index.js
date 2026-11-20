/**
 * 云函数：listComments —— 拉取某条内容下的评论（顶层 + 楼中楼）
 *
 * 入参：
 *   contentId  String  必填，内容 ID（对应已有 contents 集合的 _id）
 *   page       Number  可选，页码，从 1 开始，默认 1
 *   pageSize   Number  可选，每页条数，默认 10，最大 20
 *
 * 出参：
 *   { ok: true, list: [...], page, pageSize, hasMore, total }
 *   { ok: false, code, msg }
 *
 * 说明：
 *   1) 只有 isPass === true 的评论才会被返回（先审后发模式下未过审评论不出现）；
 *   2) 顶层评论按 createTime 倒序；子回复按 createTime 正序（符合阅读习惯）；
 *   3) 点赞数用聚合一次性算出，避免 N+1 查询；
 *   4) 当前用户是否点过赞，用一次 in 查询批量取回。
 */

const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate

const COMMENTS = 'comments'
const LIKES = 'comment_likes'

// 单次查询上限（云开发服务端单次最多 100 条）
const MAX_LIMIT = 20
const CHILD_LIMIT = 100

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext()

  const contentId = String(event.contentId || '').trim()
  const page = Math.max(1, parseInt(event.page, 10) || 1)
  const pageSize = Math.min(MAX_LIMIT, Math.max(1, parseInt(event.pageSize, 10) || 10))

  if (!contentId) {
    return { ok: false, code: 'BAD_PARAM', msg: '缺少 contentId' }
  }

  try {
    // ---------- 1. 顶层评论分页 ----------
    const topWhere = {
      contentId,
      parentId: '',            // 约定：顶层评论 parentId 为空字符串
      isPass: true
    }

    const [topRes, countRes] = await Promise.all([
      db.collection(COMMENTS)
        .where(topWhere)
        .orderBy('createTime', 'desc')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .get(),
      db.collection(COMMENTS).where(topWhere).count()
    ])

    const tops = topRes.data || []
    const total = countRes.total || 0

    if (!tops.length) {
      return { ok: true, list: [], page, pageSize, hasMore: false, total }
    }

    // ---------- 2. 子回复（楼中楼），一次取回 ----------
    const topIds = tops.map((c) => c._id)
    const childRes = await db.collection(COMMENTS)
      .where({
        contentId,
        parentId: _.in(topIds),
        isPass: true
      })
      .orderBy('createTime', 'asc')
      .limit(CHILD_LIMIT)
      .get()

    const children = childRes.data || []

    // ---------- 3. 点赞数与我的点赞状态 ----------
    const allIds = topIds.concat(children.map((c) => c._id))

    const [likeAgg, mineRes] = await Promise.all([
      db.collection(LIKES).aggregate()
        .match({ commentId: _.in(allIds) })
        .group({ _id: '$commentId', n: $.sum(1) })
        .end(),
      OPENID
        ? db.collection(LIKES)
          .where({ openid: OPENID, commentId: _.in(allIds) })
          .limit(CHILD_LIMIT)
          .get()
        : Promise.resolve({ data: [] })
    ])

    const likeMap = {}
    ;(likeAgg.list || []).forEach((row) => {
      likeMap[row._id] = row.n
    })

    const likedSet = {}
    ;(mineRes.data || []).forEach((row) => {
      likedSet[row.commentId] = true
    })

    // ---------- 4. 组装结构 ----------
    const decorate = (c) => ({
      _id: c._id,
      contentId: c.contentId,
      openid: c.openid,
      nickName: c.nickName || '游客',
      avatarUrl: c.avatarUrl || '',
      parentId: c.parentId || '',
      replyToOpenid: c.replyToOpenid || '',
      text: c.text,
      createTime: c.createTime,
      likeCount: likeMap[c._id] || 0,
      liked: !!likedSet[c._id],
      isMine: c.openid === OPENID,
      children: []
    })

    const childMap = {}
    const decoratedChildren = children.map((c) => {
      const item = decorate(c)
      if (!childMap[item.parentId]) childMap[item.parentId] = []
      childMap[item.parentId].push(item)
      return item
    })
    // 子回复里被回复人昵称：用同批数据建索引，前端直接显示“回复 XX”
    const nickIndex = {}
    decoratedChildren.concat(tops.map(decorate)).forEach((c) => {
      nickIndex[c.openid] = c.nickName
    })

    const list = tops.map((c) => {
      const item = decorate(c)
      item.children = (childMap[item._id] || []).map((child) => {
        child.replyToNick = child.replyToOpenid ? (nickIndex[child.replyToOpenid] || '') : ''
        return child
      })
      return item
    })

    return {
      ok: true,
      list,
      page,
      pageSize,
      hasMore: page * pageSize < total,
      total
    }
  } catch (err) {
    console.error('[listComments] failed:', err)
    return { ok: false, code: 'SERVER_ERROR', msg: '评论加载失败，请稍后再试' }
  }
}
