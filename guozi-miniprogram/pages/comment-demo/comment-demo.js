/**
 * 评论模块测试页
 * 作用：不改动正式详情页，单独验证评论区组件（列表 / 发布 / 回复 / 点赞 / 删除 / 举报）
 */
Page({
  data: {
    // 默认拿站内已有的一个内容 ID 做测试；正式接入时由详情页把自己的 id 传进来
    contentId: 'lychee',
    isAdmin: false
  },

  onContentIdInput (e) {
    this.setData({ contentId: e.detail.value })
  },

  onAdminChange (e) {
    this.setData({ isAdmin: e.detail.value })
  },

  /** 切换 contentId 后让组件重新拉取 */
  reload () {
    const cmt = this.selectComponent('#cmt')
    if (cmt) cmt.refresh()
  },

  /** 触底加载下一页（对应"下拉分页加载"） */
  onReachBottom () {
    const cmt = this.selectComponent('#cmt')
    if (cmt) cmt.loadMore()
  }
})
