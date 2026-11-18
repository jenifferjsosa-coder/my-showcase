// 改这里：换成你 GitHub Pages 发布后的地址（必须以 https 开头、且已在小程序后台配好业务域名）
var SITE = 'https://jenifferjsosa-coder.github.io/my-showcase/index.html';

Page({
  data: { url: SITE },
  onShareAppMessage: function () {
    return { title: '好心茂名 · 山海荔乡', path: '/pages/index/index' };
  }
});
