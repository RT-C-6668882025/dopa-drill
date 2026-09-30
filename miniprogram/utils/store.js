const KEY = 'dopa-drill:wechat:v1';

const defaults = {
  bestScore: 0,
  totalCorrect: 0,
  sessions: 0,
  sound: true,
  grade: 1
};

function load() {
  try {
    return Object.assign({}, defaults, wx.getStorageSync(KEY) || {});
  } catch (e) {
    return Object.assign({}, defaults);
  }
}

function save(patch) {
  const next = Object.assign(load(), patch);
  try { wx.setStorageSync(KEY, next); } catch (e) {}
  return next;
}

module.exports = { load, save };
