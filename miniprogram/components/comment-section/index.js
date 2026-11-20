/**
 * 评论区组件（comment-section）
 *
 * 用法（在详情页里）：
 *   <comment-section id="cmt" content-id="{{contentId}}" page-size="{{10}}" is-admin="{{false}}" />
 *   加载下一页：this.selectComponent('#cmt').loadMore()
 *   页面 onReachBottom 里调上面这句即可实现"下拉/触底分页加载"
 *
 * 只做评论：没有发帖、没有话题流、没有图片评论。
 */

const PAGE_SIZE_DEFAULT = 10
const MAX_LENGTH = 200

/** 相对时间：刚刚 / n 分钟前 / n 小时前 / 昨天 / 具体日期 */
function formatTime (ts) {
  if (!ts) return ''
  const now = Date.now()
  const diff = Math.max(0, now - ts)
  const min = 60 * 1000
  const hour = 60 * min
  const day = 24 * hour

  if (diff < min) return '刚刚'
  if (diff < hour) return Math.floor(diff / min) + ' 分钟前'
  if (diff < day) return Math.floor(diff / hour) + ' 小时前'
  if (diff < 2 * day) return '昨天'

  const d = new Date(ts)
  const mm = ('0' + (d.getMonth() + 1)).slice(-2)
  const dd = ('0' + d.getDate()).slice(-2)
  return mm + '-' + dd
}

/** 给列表里每条评论补上 timeText */
function withTime (list) {
  return (list || []).map((item) => {
    const next = Object.assign({}, item, {
      timeText: formatTime(item.createTime),
      initial: (item.nickName || '游')[0]   // WXML 里不方便直接取字符串下标
    })
    next.children = (item.children || []).map((child) =>
      Object.assign({}, child, {
        timeText: formatTime(child.createTime),
        initial: (child.nickName || '游')[0]
      })
    )
    return next
  })
}

Component({
  options: {
    // 让外部 class 可以作用到组件根节点
    addGlobalClass: true
  },

  properties: {
    // 所属内容 ID（必填），对应已有 contents 集合
    contentId: {
      type: String,
      value: '',
      // 切换内容时自动重拉，避免页面手动调 refresh
      observer (val) {
        if (val && this.__attached) this.refresh()
      }
    },
    // 每页条数
    pageSize: { type: Number, value: PAGE_SIZE_DEFAULT },
    // 当前用户是否管理员（由页面判断后传入；同时云函数还会再校验一次）
    isAdmin: { type: Boolean, value: false }
  },

  data: {
    list: [],          // 顶层评论（含 children）
    page: 1,
    hasMore: false,
    total: 0,
    loading: false,
    submitting: false,

    draft: '',
    draftLen: 0,         // 输入内容
    maxLength: MAX_LENGTH,
    inputFocus: false,

    // 回复目标：{ parentId, openid, nickName }
    replyTo: null,

    // 当前用户展示信息（昵称/头像）
    myInfo: { nickName: '', avatarUrl: '' }
  },

  lifetimes: {
    attached () {
      this.loadMyInfo()
      this.refresh()
    }
  },

  methods: {
    /* ================= 基础数据 ================= */

    /**
     * 从本地缓存取昵称头像；本模块没有登录体系，
     * 昵称取自小程序既有的 "我的" 页昵称（storage: maoming.v2）。
     */
    loadMyInfo () {
      let nickName = ''
      try {
        const cache = wx.getStorageSync('maoming.v2') || {}
        nickName = cache.nick || ''
      } catch (err) {
        nickName = ''
      }
      this.setData({
        myInfo: { nickName, avatarUrl: '', initial: (nickName || '游')[0] }
      })
    },

    /** 重新从第一页拉取 */
    refresh () {
      this.setData({ page: 1, list: [], hasMore: false })
      return this.fetchPage(1, true)
    },

    /**
     * 拉取一页评论
     * @param {number} page 页码
     * @param {boolean} reset 是否覆盖现有列表
     */
    async fetchPage (page, reset) {
      const contentId = this.data.contentId
      if (!contentId) {
        console.warn('[comment-section] contentId 为空，未发起请求')
        return
      }
      if (this.data.loading) return

      this.setData({ loading: true })
      try {
        const res = await wx.cloud.callFunction({
          name: 'listComments',
          data: { contentId, page, pageSize: this.data.pageSize }
        })
        const r = (res && res.result) || {}
        if (!r.ok) {
          wx.showToast({ title: r.msg || '加载失败', icon: 'none' })
          return
        }
        const pageList = withTime(r.list)
        this.setData({
          list: reset ? pageList : this.data.list.concat(pageList),
          page: r.page,
          hasMore: !!r.hasMore,
          total: r.total || 0
        })
      } catch (err) {
        console.error('[comment-section] listComments failed:', err)
        wx.showToast({ title: '网络异常，请稍后再试', icon: 'none' })
      } finally {
        this.setData({ loading: false })
      }
    },

    /** 供页面 onReachBottom 调用 */
    loadMore () {
      if (!this.data.hasMore || this.data.loading) return
      this.fetchPage(this.data.page + 1, false)
    },

    /* ================= 输入 ================= */

    onInput (e) {
      const val = e.detail.value || ''
      // 长度在 JS 里算好再交给视图：WXML 对字符串取 .length 不可靠
      this.setData({ draft: val, draftLen: val.length })
    },

    onFocus () {
      this.setData({ inputFocus: true })
    },

    onBlur () {
      this.setData({ inputFocus: false })
    },

    /** 点击某条的“回复”：记录 parentId / 被回复人 */
    onReplyTap (e) {
      const { id, openid, nick } = e.currentTarget.dataset
      this.setData({
        replyTo: { parentId: id, openid, nickName: nick },
        inputFocus: true
      })
    },

    cancelReply () {
      this.setData({ replyTo: null })
    },

    /* ================= 发布 ================= */

    async submit () {
      const text = (this.data.draft || '').trim()
      if (!text) return
      if (text.length > MAX_LENGTH) {
        wx.showToast({ title: `最多 ${MAX_LENGTH} 字`, icon: 'none' })
        return
      }
      if (this.data.submitting) return

      const replyTo = this.data.replyTo
      this.setData({ submitting: true })

      try {
        const res = await wx.cloud.callFunction({
          name: 'submitComment',
          data: {
            contentId: this.data.contentId,
            text,
            parentId: replyTo ? replyTo.parentId : '',
            replyToOpenid: replyTo ? replyTo.openid : '',
            nickName: this.data.myInfo.nickName || '游客',
            avatarUrl: this.data.myInfo.avatarUrl || ''
          }
        })
        const r = (res && res.result) || {}

        if (!r.ok) {
          // 敏感内容 / 参数错误的提示都由云函数给出
          wx.showToast({ title: r.msg || '发布失败', icon: 'none' })
          return
        }

        const created = withTime([r.data])[0]

        // 先审后发：不进列表，只提示
        if (!created.isPass) {
          this.setData({ draft: '', draftLen: 0, replyTo: null })
          wx.showToast({ title: '已提交，审核后展示', icon: 'none' })
          return
        }

        this.applyCreated(created, replyTo)
        this.setData({ draft: '', draftLen: 0, replyTo: null })
        wx.showToast({ title: '已发布', icon: 'success' })
      } catch (err) {
        console.error('[comment-section] submitComment failed:', err)
        wx.showToast({ title: '发布失败，请稍后再试', icon: 'none' })
      } finally {
        this.setData({ submitting: false })
      }
    },

    /**
     * 把新评论插到本地列表里（毫秒级反馈，不重新请求整页）
     * @param {object} created 云函数返回的评论
     * @param {object|null} replyTo 回复目标
     */
    applyCreated (created, replyTo) {
      const list = this.data.list.slice()

      if (!replyTo) {
        // 顶层评论：插到最前面
        list.unshift(created)
        this.setData({ list, total: this.data.total + 1 })
        return
      }

      // 楼中楼：找到父评论，追加到 children 末尾
      const idx = list.findIndex((it) => it._id === replyTo.parentId)
      if (idx < 0) {
        // 父评论不在当前页（比如只加载了第一页），直接重新拉取
        this.refresh()
        return
      }
      const children = (list[idx].children || []).slice()
      created.replyToNick = replyTo.nickName
      children.push(created)
      list[idx] = Object.assign({}, list[idx], { children })
      this.setData({ list })
    },

    /* ================= 点赞 ================= */

    async onLikeTap (e) {
      const id = e.currentTarget.dataset.id
      const found = this.findComment(id)
      if (!found) return

      const { comment, parentIndex, childIndex } = found
      const nextLiked = !comment.liked
      const nextCount = Math.max(0, (comment.likeCount || 0) + (nextLiked ? 1 : -1))

      // 先本地更新（点击手感），失败再回滚
      this.patchComment(parentIndex, childIndex, { liked: nextLiked, likeCount: nextCount })

      try {
        const res = await wx.cloud.callFunction({
          name: 'likeComment',
          data: { commentId: id, action: nextLiked ? 'like' : 'unlike' }
        })
        const r = (res && res.result) || {}
        if (!r.ok) throw new Error(r.msg || 'fail')
        // 用服务端真实值校正
        this.patchComment(parentIndex, childIndex, { liked: r.liked, likeCount: r.likeCount })
      } catch (err) {
        console.error('[comment-section] likeComment failed:', err)
        this.patchComment(parentIndex, childIndex, {
          liked: comment.liked,
          likeCount: comment.likeCount
        })
        wx.showToast({ title: '操作失败', icon: 'none' })
      }
    },

    /** 在 list 里定位一条评论（顶层或子回复） */
    findComment (id) {
      const list = this.data.list
      for (let i = 0; i < list.length; i++) {
        if (list[i]._id === id) return { comment: list[i], parentIndex: i, childIndex: -1 }
        const children = list[i].children || []
        for (let j = 0; j < children.length; j++) {
          if (children[j]._id === id) return { comment: children[j], parentIndex: i, childIndex: j }
        }
      }
      return null
    },

    /** 局部更新一条评论字段 */
    patchComment (parentIndex, childIndex, patch) {
      const list = this.data.list.slice()
      if (childIndex < 0) {
        list[parentIndex] = Object.assign({}, list[parentIndex], patch)
      } else {
        const children = (list[parentIndex].children || []).slice()
        children[childIndex] = Object.assign({}, children[childIndex], patch)
        list[parentIndex] = Object.assign({}, list[parentIndex], { children })
      }
      this.setData({ list })
    },

    /* ================= 举报 / 删除 ================= */

    onReportTap (e) {
      const id = e.currentTarget.dataset.id
      wx.showModal({
        title: '举报这条评论',
        content: '如该评论含辱骂、广告或违法信息，可截图后通过小程序客服反馈，我们会尽快处理。',
        confirmText: '我知道了',
        showCancel: false,
        confirmColor: '#b3261e',
        success: () => {
          console.log('[comment-section] report tapped:', id)
        }
      })
    },

    onDeleteTap (e) {
      const { id, parent } = e.currentTarget.dataset
      wx.showModal({
        title: '删除评论',
        content: '删除后不可恢复，确定删除？',
        confirmText: '删除',
        confirmColor: '#b3261e',
        success: async (res) => {
          if (!res.confirm) return
          await this.doDelete(id, parent)
        }
      })
    },

    async doDelete (id, parentId) {
      wx.showLoading({ title: '删除中', mask: true })
      try {
        const res = await wx.cloud.callFunction({
          name: 'deleteComment',
          data: { commentId: id }
        })
        const r = (res && res.result) || {}
        if (!r.ok) {
          wx.hideLoading()
          wx.showToast({ title: r.msg || '删除失败', icon: 'none' })
          return
        }

        // 本地移除：子回复从父的 children 里删，顶层从 list 里删
        if (parentId) {
          const idx = this.data.list.findIndex((it) => it._id === parentId)
          if (idx >= 0) {
            const list = this.data.list.slice()
            const children = (list[idx].children || []).filter((c) => c._id !== id)
            list[idx] = Object.assign({}, list[idx], { children })
            this.setData({ list })
          }
        } else {
          const list = this.data.list.filter((it) => it._id !== id)
          this.setData({ list, total: Math.max(0, this.data.total - (r.removed || 1)) })
        }

        wx.hideLoading()
        wx.showToast({ title: '已删除', icon: 'success' })
      } catch (err) {
        console.error('[comment-section] deleteComment failed:', err)
        wx.hideLoading()
        wx.showToast({ title: '删除失败', icon: 'none' })
      }
    }
  }
})
