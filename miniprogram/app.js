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
