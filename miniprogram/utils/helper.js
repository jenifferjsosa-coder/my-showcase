const BASE = 'https://jenifferjsosa-coder.github.io/my-showcase/';
const data = require('./data.js');

function img(path, small) {
  if (!path) return '';
  return BASE + path + (small === false ? '.jpg' : '-s.jpg');
}

function base(path) {
  if (!path) return '';
  return BASE + path + '.jpg';
}

function allItems() {
  return [].concat(data.GOODS, data.SPOTS, data.FOOD, data.CULTURE);
}

function findById(id) {
  return allItems().filter(function (x) { return x.id === id; })[0] || null;
}

function catList(list) {
  const out = ['全部'];
  list.forEach(function (x) { if (out.indexOf(x.cat) < 0) out.push(x.cat); });
  return out;
}

function todayItem() {
  const list = data.GOODS.concat(data.SPOTS);
  const d = new Date();
  const n = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
  return list[n % list.length];
}

function monthOf(m) {
  return data.MONTHS.filter(function (x) { return x.m === m; })[0] || data.MONTHS[0];
}

function kindsOf(id) {
  return data.KINDS[id] || [];
}

function kindsCount() {
  const out = {};
  Object.keys(data.KINDS).forEach(function (k) { out[k] = data.KINDS[k].length; });
  return out;
}

/** 把数据条目转成页面用的视图模型 */
function viewOf(item) {
  if (!item) return null;
  const months = [];
  for (let m = 1; m <= 12; m++) {
    months.push({ m: m, on: (item.months || []).indexOf(m) >= 0 });
  }
  const kinds = kindsOf(item.id);
  const stats = (item.stats || []).map(function (s) {
    return { n: s[0], u: s[1], l: s[2] };
  });
  return {
    id: item.id,
    name: item.name,
    en: item.en || '',
    area: item.area,
    cat: item.cat,
    tag: item.tag,
    line: item.line,
    img: img(item.img),
    big: base(item.img),
    stats: stats,
    paras: item.paras || [],
    tip: item.tip || '',
    months: months,
    kinds: kinds,
    kindCount: kinds.length,
    monthText: (item.months || []).map(function (m) { return m + '月'; }).join(' · ')
  };
}

module.exports = {
  BASE, data, img, base, allItems, findById, catList, todayItem, monthOf,
  kindsOf, kindsCount, viewOf
};
