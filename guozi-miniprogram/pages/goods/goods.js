const H = require('../../utils/helper.js');

Page({
  data: {
    cats: [],
    cat: '全部',
    list: [],
    atlas: []
  },

  onLoad() {
    this.setData({
      cats: H.catList(H.data.GOODS),
      list: H.data.GOODS.map(H.viewOf),
      atlas: H.data.ATLAS.map(function (a) {
        return { id: a.id, name: a.name, unit: a.unit, count: (H.kindsOf(a.kind) || []).length };
      })
    });
  },

  pickCat(e) {
    const cat = e.currentTarget.dataset.cat;
    const list = H.data.GOODS.filter(function (g) { return cat === '全部' || g.cat === cat; }).map(H.viewOf);
    this.setData({ cat: cat, list: list });
  },

  openItem(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
  },

  openAtlas(e) {
    wx.navigateTo({ url: '/pages/atlas/atlas?id=' + e.currentTarget.dataset.id });
  }
});
