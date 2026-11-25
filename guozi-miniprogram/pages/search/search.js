const H = require('../../utils/helper.js');

const HOT = ['荔枝', '放鸡岛', '年例', '簸箕炊', '化橘红', '中国第一滩', '冼夫人', '捞粉', '糯米糍', '糖水'];
const KINDS_ORDER = ['好物', '品种', '景点', '味道', '人文', '时令'];

function buildIndex() {
  const out = [];
  H.data.GOODS.forEach(function (g) {
    out.push({ id: g.id, kind: '好物', name: g.name, sub: g.area + ' · ' + g.line, img: H.img(g.img), text: (g.name + g.area + g.cat + g.tag + g.line + (g.paras || []).join('')).toLowerCase(), act: 'item' });
  });
  H.data.SPOTS.forEach(function (s) {
    out.push({ id: s.id, kind: '景点', name: s.name, sub: s.area + ' · ' + s.line, img: H.img(s.img), text: (s.name + s.area + s.cat + s.tag + s.line + (s.paras || []).join('')).toLowerCase(), act: 'item' });
  });
  H.data.FOOD.forEach(function (f) {
    out.push({ id: f.id, kind: '味道', name: f.name, sub: f.area + ' · ' + f.line, img: H.img(f.img), text: (f.name + f.area + f.cat + f.tag + f.line + (f.paras || []).join('')).toLowerCase(), act: 'item' });
  });
  H.data.CULTURE.forEach(function (c) {
    out.push({ id: c.id, kind: '人文', name: c.name, sub: c.area + ' · ' + c.line, img: H.img(c.img), text: (c.name + c.area + c.cat + c.tag + c.line + (c.paras || []).join('')).toLowerCase(), act: 'item' });
  });
  Object.keys(H.data.KINDS).forEach(function (key) {
    H.data.KINDS[key].forEach(function (k) {
      out.push({
        id: key, kind: '品种', name: k.n, sub: k.t + ' · ' + k.d,
        img: '', glyph: k.n.slice(0, 1),
        text: (k.n + k.t + k.d + key).toLowerCase(),
        act: 'atlas'
      });
    });
  });
  H.data.MONTHS.forEach(function (m) {
    out.push({ id: 'm' + m.m, kind: '时令', name: m.m + ' 月', sub: m.tip, img: '', glyph: String(m.m), text: (m.tip + m.items.join('') + m.m + '月').toLowerCase(), act: 'month' });
  });
  return out;
}

const IDX = buildIndex();

Page({
  data: { q: '', hot: HOT, list: [], kinds: [], kind: '全部', count: 0, ms: 0, empty: false, recent: [] },

  onLoad() {
    const S = getApp().getState();
    this.setData({ recent: S.recent || [] });
  },

  onInput(e) {
    this.setData({ q: e.detail.value, kind: '全部' });
    this.run(e.detail.value, '全部');
  },

  hotTap(e) {
    const q = e.currentTarget.dataset.q;
    this.setData({ q: q, kind: '全部' });
    this.run(q, '全部');
  },

  pickKind(e) {
    const kind = e.currentTarget.dataset.kind;
    this.setData({ kind: kind });
    this.run(this.data.q, kind);
  },

  run(q, kind) {
    const terms = (q || '').toLowerCase().split(/\s+/).filter(Boolean);
    const t0 = Date.now();
    let hits = [];
    if (terms.length) {
      hits = IDX.filter(function (row) {
        return terms.every(function (t) { return row.text.indexOf(t) >= 0 || row.name.indexOf(t) >= 0; });
      });
    }
    const counts = {};
    hits.forEach(function (r) { counts[r.kind] = (counts[r.kind] || 0) + 1; });
    const kinds = KINDS_ORDER.filter(function (k) { return counts[k]; }).map(function (k) {
      return { k: k, n: counts[k] };
    });
    const list = hits.filter(function (r) { return kind === '全部' || r.kind === kind; }).slice(0, 60);
    this.setData({
      list: list,
      kinds: kinds,
      count: hits.length,
      ms: Math.max(1, Date.now() - t0),
      empty: terms.length > 0 && hits.length === 0
    });
  },

  tapRow(e) {
    const i = e.currentTarget.dataset.i;
    const r = this.data.list[i];
    const S = getApp().getState();
    S.recent = (S.recent || []).filter(function (x) { return x !== this.data.q; });
    if (this.data.q) S.recent.unshift(this.data.q);
    S.recent = S.recent.slice(0, 8);
    getApp().saveState(S);
    if (r.act === 'item') {
      wx.navigateTo({ url: '/pages/detail/detail?id=' + r.id });
    } else if (r.act === 'atlas') {
      wx.navigateTo({ url: '/pages/atlas/atlas?id=' + r.id });
    } else {
      wx.showToast({ title: r.sub.slice(0, 18), icon: 'none' });
    }
  },

  clearRecent() {
    const S = getApp().getState();
    S.recent = [];
    getApp().saveState(S);
    this.setData({ recent: [] });
  }
});
