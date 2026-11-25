const H = require('../../utils/helper.js');

Page({
  data: { nav: [], groups: [], cur: '' },

  onLoad(opt) {
    const nav = H.data.ATLAS.map(function (a) {
      return { id: a.id, name: a.name, count: (H.kindsOf(a.kind) || []).length };
    });
    const groups = H.data.ATLAS.map(function (a) {
      return {
        id: a.id,
        kicker: a.kicker,
        name: a.name,
        sub: a.sub,
        unit: a.unit,
        kinds: (H.kindsOf(a.kind) || []).map(function (k, i) {
          return { i: i + 1, n: k.n, t: k.t, d: k.d };
        })
      };
    });
    const cur = (opt && opt.id) || (groups[0] && groups[0].id) || '';
    this.setData({ nav: nav, groups: groups, cur: cur });
    if (opt && opt.id) {
      wx.nextTick(function () {
        wx.pageScrollTo({ selector: '#a-' + opt.id, offsetTop: -60, duration: 240 });
      });
    }
  },

  jump(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ cur: id });
    wx.pageScrollTo({ selector: '#a-' + id, offsetTop: -60, duration: 240 });
  },

  onShareAppMessage() {
    return { title: '品种图谱：荔枝 12 个品种、糖水 10 碗', path: '/pages/atlas/atlas' };
  }
});
