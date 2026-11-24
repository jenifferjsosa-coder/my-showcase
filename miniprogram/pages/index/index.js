const H = require('../../utils/helper.js');
const app = getApp();

Page({
  data: {
    mapImg: H.base('assets/map/map-admin'),
    hero: H.base('assets/g-litchi'),
    stats: [
      { n: '141.92', u: '万亩', l: '荔枝种植面积' },
      { n: '62.23', u: '万吨', l: '荔枝年产量' },
      { n: '182', u: '公里', l: '海岸线' },
      { n: '32', u: '个', l: 'A 级景区' }
    ],
    ind: { n: '550', u: '亿元' },
    indChips: [],
    atlas: null,
    today: null,
    months: [],
    monthSel: 0,
    monthTip: '',
    spots: [],
    foods: [],
    routes: [],
    arrive: []
  },

  onLoad() {
    const today = H.viewOf(H.todayItem());
    const months = H.data.MONTHS.map(function (m) {
      return { m: m.m, tip: m.tip, items: m.items.join('、') };
    });
    const d = new Date();
    this.setData({
      today: today,
      months: months,
      monthSel: d.getMonth(),
      monthTip: months[d.getMonth()].tip,
      spots: H.data.SPOTS.slice(0, 6).map(H.viewOf),
      foods: H.data.FOOD.map(H.viewOf),
      routes: H.data.ROUTES,
      arrive: H.data.ARRIVE,
      atlas: H.data.ATLAS.slice(0, 4).map(function (a) {
        return { id: a.id, name: a.name, count: (H.kindsOf(a.kind) || []).length, unit: a.unit };
      }),
      indChips: ['荔枝', '龙眼', '三华李', '化橘红', '沉香', '罗非鱼', '高凉菜']
    });
  },

  onShow() {
    // 从详情页返回时刷新收藏态（首页不显示，但保持数据一致）
  },

  /** 月份 chip */
  pickMonth(e) {
    const i = e.currentTarget.dataset.i;
    this.setData({ monthSel: i, monthTip: this.data.months[i].tip });
  },

  goGoods() { wx.switchTab({ url: '/pages/goods/goods' }); },
  goSpots() { wx.switchTab({ url: '/pages/spots/spots' }); },
  goMap() {
    wx.navigateTo({ url: '/pages/map/map' });
  },

  goSearch() { wx.navigateTo({ url: '/pages/search/search' }); },
  goAtlas() { wx.navigateTo({ url: '/pages/atlas/atlas' }); },

  openAtlas(e) {
    wx.navigateTo({ url: '/pages/atlas/atlas?id=' + e.currentTarget.dataset.id });
  },

  openItem(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
  },

  openRoute(e) {
    const r = this.data.routes[e.currentTarget.dataset.i];
    wx.showModal({
      title: r.days + ' · ' + r.name,
      content: r.steps.map(function (s, i) { return (i + 1) + '. ' + s; }).join('\n') + '\n\n' + r.area + ' · ' + r.time,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#c0304a'
    });
  },

  onShareAppMessage() {
    return {
      title: '什么时候熟、哪里好看：物产与去处的图文整理',
      path: '/pages/index/index'
    };
  }
});
