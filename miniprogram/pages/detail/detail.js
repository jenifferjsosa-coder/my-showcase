const H = require('../../utils/helper.js');
const app = getApp();

Page({
  data: { it: null, faved: false, kinds: [], cur: 0 },

  onLoad(opt) {
    const it = H.viewOf(H.findById(opt.id));
    if (!it) {
      wx.showToast({ title: '没找到这条内容', icon: 'none' });
      return;
    }
    wx.setNavigationBarTitle({ title: it.name });
    const S = app.getState();
    this.setData({
      it: it,
      cur: 0,
      kinds: it.kinds.map(function (k, i) { return { i: i + 1, n: k.n, t: k.t, d: k.d }; }),
      faved: (S.favs || []).indexOf(it.id) >= 0
    });
  },

  onSwipe(e) {
    this.setData({ cur: e.detail.current });
  },

  toggleFav() {
    const S = app.getState();
    S.favs = S.favs || [];
    const i = S.favs.indexOf(this.data.it.id);
    if (i >= 0) {
      S.favs.splice(i, 1);
      S.score = Math.max(0, (S.score || 0) - 2);
    } else {
      S.favs.push(this.data.it.id);
      S.score = (S.score || 0) + 2;
    }
    app.saveState(S);
    this.setData({ faved: i < 0 });
    wx.showToast({ title: i >= 0 ? '已取消收藏' : '收藏 +2 分', icon: 'none' });
  },

  preview(e) {
    const i = Number((e && e.currentTarget && e.currentTarget.dataset.i) || 0);
    const urls = this.data.it.imgs || [this.data.it.big];
    wx.previewImage({ urls: urls, current: urls[i] });
  },

  onShareAppMessage() {
    const it = this.data.it || {};
    return {
      title: it.name + ' · ' + it.line,
      path: '/pages/detail/detail?id=' + (it.id || ''),
      imageUrl: it.img
    };
  }
});
