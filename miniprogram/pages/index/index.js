const store = require('../../utils/store');

const MODES = [
  { key: 'add', label: '加法', op: '+' },
  { key: 'sub', label: '减法', op: '−' },
  { key: 'mul', label: '乘法', op: '×' },
  { key: 'div', label: '除法', op: '÷' }
];

function rand(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }

Page({
  data: {
    keys: [1,2,3,4,5,6,7,8,9],
    a: 0, b: 0, op: '+', expected: 0, answer: '',
    score: 0, correct: 0, combo: 0, streak: 0, dopa: '1.0',
    bestScore: 0, modeIndex: 0, modeLabel: '加法',
    feedback: '', celebrating: false, hint: '输入答案',
    sound: true
  },

  onLoad() {
    const saved = store.load();
    this.setData({ bestScore: saved.bestScore || 0, sound: saved.sound !== false });
    this.nextProblem();
  },

  makeProblem() {
    const mode = MODES[this.data.modeIndex];
    let a, b, expected;
    if (mode.key === 'add') {
      a = rand(1, 49); b = rand(1, 49); expected = a + b;
    } else if (mode.key === 'sub') {
      a = rand(10, 99); b = rand(1, a); expected = a - b;
    } else if (mode.key === 'mul') {
      a = rand(2, 9); b = rand(2, 9); expected = a * b;
    } else {
      b = rand(2, 9); expected = rand(2, 9); a = b * expected;
    }
    return { a, b, expected, op: mode.op, modeLabel: mode.label };
  },

  nextProblem() {
    const p = this.makeProblem();
    this.setData(Object.assign(p, { answer: '', feedback: '', celebrating: false, hint: '输入答案' }));
  },

  tapKey(e) {
    if (this.locked) return;
    const answer = (this.data.answer + String(e.currentTarget.dataset.key)).replace(/^0+(?=\d)/, '');
    this.setData({ answer });
    const target = String(this.data.expected);
    if (answer.length >= target.length) this.check(answer);
  },

  backspace() {
    if (this.locked) return;
    this.setData({ answer: this.data.answer.slice(0, -1) });
  },

  skip() {
    this.setData({ combo: 0, streak: 0, hint: '换一道，继续。' });
    setTimeout(() => this.nextProblem(), 180);
  },

  check(answer) {
    this.locked = true;
    if (Number(answer) === this.data.expected) {
      const combo = this.data.combo + 1;
      const gain = 100 + Math.min(combo, 20) * 5;
      const score = this.data.score + gain;
      const correct = this.data.correct + 1;
      const dopa = Math.min(9999, Math.pow(1.34, correct) * (1 + combo / 10)).toFixed(correct > 20 ? 0 : 1);
      const bestScore = Math.max(this.data.bestScore, score);
      this.setData({
        score, correct, combo, streak: this.data.streak + 1, dopa, bestScore,
        feedback: 'ok', celebrating: true,
        hint: combo >= 10 ? '多巴胺暴走中 ✦' : '正确！'
      });
      store.save({ bestScore, totalCorrect: (store.load().totalCorrect || 0) + 1 });
      if (this.data.sound) wx.vibrateShort({ type: combo >= 10 ? 'heavy' : 'light' });
      setTimeout(() => { this.locked = false; this.nextProblem(); }, combo >= 10 ? 520 : 330);
    } else {
      this.setData({ feedback: 'ng', combo: 0, streak: 0, hint: '再试一次' });
      if (this.data.sound) wx.vibrateShort({ type: 'medium' });
      setTimeout(() => {
        this.locked = false;
        this.setData({ answer: '', feedback: '' });
      }, 320);
    }
  },

  changeMode() {
    const modeIndex = (this.data.modeIndex + 1) % MODES.length;
    this.setData({ modeIndex, modeLabel: MODES[modeIndex].label, combo: 0 });
    this.nextProblem();
  },

  toggleSound() {
    const sound = !this.data.sound;
    this.setData({ sound });
    store.save({ sound });
  },

  onUnload() {
    store.save({ bestScore: this.data.bestScore, sessions: (store.load().sessions || 0) + 1 });
  }
});
