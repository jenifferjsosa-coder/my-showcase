const H = require('../../utils/helper.js');

Page({
  data: { cats: [], cat: '全部', list: [] },

  onLoad() {
    this.setData({
      cats: H.catList(H.data.SPOTS),
      list: H.data.SPOTS.map(H.viewOf)
    });
  },

  pickCat(e) {
    const cat = e.currentTarget.dataset.cat;
    this.setData({
      cat: cat,
      list: H.data.SPOTS.filter(function (s) { return cat === '全部' || s.cat === cat; }).map(H.viewOf)
    });
  },

  openItem(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
  }
});
