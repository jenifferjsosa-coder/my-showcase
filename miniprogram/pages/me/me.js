const app = getApp();

Page({
  data: {
    nick: '',
    input: '',
    score: 0,
    level: '',
    next: '',
    favs: [],
    signed: false,
    count: 0
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const S = app.getState();
    const lv = app.levelOf(S.score);
    const favs = [];
    const H = require('../../utils/helper.js');
    (S.favs || []).forEach(function (id) {
      const it = H.findById(id);
      if (it) {
        favs.push({ id: it.id, name: it.name, area: it.area, tag: it.tag, img: H.img(it.img), line: it.line });
      }
    });
    this.setData({
      nick: S.nick || '',
      input: S.nick || '',
      score: S.score || 0,
      level: lv.name,
      next: lv.next,
      favs: favs,
      count: favs.length,
      signed: S.signin === app.today()
    });
  },

  onInput(e) {
    this.setData({ input: e.detail.value });
  },

  doLogin() {
    const v = (this.data.input || '').trim();
    if (!v) {
      wx.showToast({ title: '写个昵称吧', icon: 'none' });
      return;
    }
    const S = app.getState();
    S.nick = v;
    app.saveState(S);
    this.refresh();
    wx.showToast({ title: '欢迎回来', icon: 'success' });
  },

  signin() {
    if (this.data.signed) {
      wx.showToast({ title: '今天已经打过卡', icon: 'none' });
      return;
    }
    const S = app.getState();
    S.score = (S.score || 0) + 10;
    S.signin = app.today();
    app.saveState(S);
    this.refresh();
    wx.showToast({ title: '打卡 +10 分', icon: 'success' });
  },

  openItem(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
  },

  unfav(e) {
    const S = app.getState();
    S.favs = (S.favs || []).filter(function (x) { return x !== e.currentTarget.dataset.id; });
    app.saveState(S);
    this.refresh();
  },

  reset() {
    const that = this;
    wx.showModal({
      title: '清空本机数据',
      content: '昵称、收藏与积分都会清除，确定吗？',
      confirmColor: '#c0304a',
      success(res) {
        if (res.confirm) {
          app.reset();
          that.refresh();
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  },

  goSearch() {
    wx.navigateTo({ url: '/pages/search/search' });
  }
});
