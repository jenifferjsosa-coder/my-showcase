const H = require('../../utils/helper.js');

Page({
  data: {
    timeline: [],
    heritage: [],
    stories: [],
    dialect: [],
    night: H.base('assets/c-night')
  },

  onLoad() {
    this.setData({
      timeline: H.data.TIMELINE,
      heritage: H.data.HERITAGE.map(function (h) {
        return { id: h.id, n: h.n, s: h.s, img: H.img(h.img) };
      }),
      stories: H.data.CULTURE.map(H.viewOf),
      dialect: H.data.DIALECT.map(function (d) { return { k: d[0], v: d[1] }; })
    });
  },

  openItem(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
  }
});
