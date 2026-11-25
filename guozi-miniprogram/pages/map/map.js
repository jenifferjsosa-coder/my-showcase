const H = require('../../utils/helper.js');

Page({
  data: { maps: [] },

  onLoad() {
    this.setData({
      maps: [
        { key: 'admin', t: '茂名在哪 · 景点分布', s: '五个区市、32 个景点与公园，一键看清谁在哪儿', img: H.base('assets/map/map-admin'), full: H.base('assets/map/map-admin') },
        { key: 'geo', t: '山与海 · 地形与交通', s: '北高南低：云开大山、云雾山在北，鉴江向南入海', img: H.base('assets/map/map-geo'), full: H.base('assets/map/map-geo') }
      ]
    });
  },

  preview(e) {
    const i = Number(e.currentTarget.dataset.i || 0);
    const urls = this.data.maps.map(function (m) { return m.full; });
    wx.previewImage({ urls: urls, current: urls[i] });
  },

  goSpots() {
    wx.switchTab({ url: '/pages/spots/spots' });
  }
});
