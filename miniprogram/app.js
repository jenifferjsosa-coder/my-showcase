const KEY = 'maoming.v2';

App({
  globalData: {
    BASE: 'https://jenifferjsosa-coder.github.io/my-showcase/'
  },

  blank() {
    return { nick: '', favs: [], score: 0, signin: '', recent: [] };
  },

  onLaunch() {
    if (!wx.getStorageSync(KEY)) wx.setStorageSync(KEY, this.blank());

    // ---------- 云开发初始化（评论模块依赖） ----------
    // 环境 ID：微信开发者工具 → 云开发 → 设置 → 环境 ID
    // 换环境时只改这一处；不写 env 会默认用“当前环境”
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-d2gz0v75xf4962e09',
        traceUser: true
      });
    } else {
      console.warn('[app] 当前基础库不支持云开发，请把基础库调到 2.2.3 以上');
    }
  },

  getState() {
    const st = wx.getStorageSync(KEY) || {};
    return {
      nick: st.nick || '',
      favs: Array.isArray(st.favs) ? st.favs : [],
      score: st.score || 0,
      signin: st.signin || '',
      recent: Array.isArray(st.recent) ? st.recent : []
    };
  },

  saveState(st) {
    wx.setStorageSync(KEY, st);
  },

  reset() {
    wx.setStorageSync(KEY, this.blank());
  },

  today() {
    const d = new Date();
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  },

  levels: ['荔乡新人', '山海边民', '高凉食客', '好心使者', '茂名通'],

  levelOf(score) {
    const last = this.levels.length - 1;
    const i = Math.min(last, Math.floor((score || 0) / 50));
    return {
      i: i,
      name: this.levels[i],
      next: this.levels[Math.min(last, i + 1)],
      need: Math.max(0, (i + 1) * 50 - (score || 0))
    };
  }
});
