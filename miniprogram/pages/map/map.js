const H = require('../../utils/helper.js');

Page({
  data: { maps: [] },

  onLoad() {
    this.setData({
      maps: [
        { key: 'admin', t: '茂名在哪 · 政区与路网', s: '五个区市、沈海\u002f包茂\u002f汕湛高速与主要景点，一图看清位置', img: H.base('assets/map/map-admin'), full: H.base('assets/map/map-admin') },
        { key: 'geo', t: '山与海 · 卫星影像', s: '北边是山、中间是江、南边是海\u2014\u2014同一片土地的三层', img: H.base('assets/map/map-geo'), full: H.base('assets/map/map-geo') }
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
