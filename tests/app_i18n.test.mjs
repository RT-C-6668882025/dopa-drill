import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLanguage, setLanguage, t, skillName, laneName,
  problemTitle, stepLabel, nextStarI18n, monthYearText,
  dayLogTitleText, questTextI18n, formatDopaValue,
  trophyItemName, trophyItemDesc, trophySeriesTitle,
  cellTextI18n, problemHelpText, answerTextI18n
} from '../app/js/i18n.js';
import { SKILLS } from '../app/js/skills.js';
import { TROPHIES, SERIES } from '../app/js/trophies.js';

test('i18n default language and switching', () => {
  // Reset to zh
  setLanguage('zh');
  assert.equal(getLanguage(), 'zh');
  assert.equal(t('appTitle'), '多帕速算 (Dopa Drill)');
  assert.equal(t('correctStampText'), '正确');
  assert.equal(t('fullScoreBanner'), '100分达成！');

  // Switch to ja
  setLanguage('ja');
  assert.equal(getLanguage(), 'ja');
  assert.equal(t('appTitle'), 'ドパドリル');
  assert.equal(t('correctStampText'), 'せいかい');

  // Switch to en
  setLanguage('en');
  assert.equal(getLanguage(), 'en');
  assert.equal(t('appTitle'), 'Dopa Drill');
  assert.equal(t('correctStampText'), 'Correct!');

  // Switch back to zh
  setLanguage('zh');
  assert.equal(getLanguage(), 'zh');
});

test('every skill has a Chinese name mapping', () => {
  setLanguage('zh');
  assert.equal(SKILLS.length, 58);
  for (const sk of SKILLS) {
    const zh = skillName(sk.id);
    assert.ok(zh, `Missing Chinese translation for skill: ${sk.id} (${sk.name})`);
    assert.notEqual(zh.trim(), '');
  }
});

test('problemTitle and stepLabel translate accurately', () => {
  setLanguage('zh');
  assert.equal(problemTitle('あまりのあるわりざん'), '有余数的除法');
  assert.equal(problemTitle('分数のたしひき'), '分数加减法');
  assert.equal(problemTitle('小数のかけざん'), '小数乘法');
  assert.equal(stepLabel('一の位'), '个位');
  assert.equal(stepLabel('くりあがり'), '进位');
  assert.equal(stepLabel('あまり'), '余数');
  assert.equal(stepLabel('2をかける'), '乘以 2');
  assert.equal(stepLabel('たす（一の位）'), '相加（个位）');
  assert.equal(stepLabel('商の一の位'), '商的个位');
  assert.equal(cellTextI18n('最大公約数'), '最大公因数');
  assert.equal(cellTextI18n('あまり'), '余');
  assert.equal(cellTextI18n('十の位まで'), '十位');
  assert.equal(problemHelpText('どちらも わりきれる 数'), '公因数：都能整除的数');
  assert.equal(answerTextI18n('14と42の最大公約数 ＝ 7'), '14 和 42 的 最大公因数 ＝ 7');

  setLanguage('en');
  assert.equal(problemTitle('あまりのあるわりざん'), 'Division with Remainder');
  assert.equal(problemTitle('小数のかけざん'), 'Decimal Multiplication');
  assert.equal(stepLabel('一の位'), 'Ones');
  assert.equal(stepLabel('2をかける'), 'Multiply by 2');
  assert.equal(stepLabel('たす（一の位）'), 'Add (Ones)');
  assert.equal(cellTextI18n('最大公約数'), 'GCD');
  assert.equal(problemHelpText('どちらも わりきれる 数'), 'Common factor: divides both');

  setLanguage('ja');
  assert.equal(problemTitle('あまりのあるわりざん'), 'あまりのあるわりざん');
  assert.equal(stepLabel('一の位'), '一の位');
  assert.equal(stepLabel('2をかける'), '2をかける');
  assert.equal(cellTextI18n('最大公約数'), '最大公約数');
  assert.equal(problemHelpText('どちらも わりきれる 数'), 'どちらも わりきれる 数');
});

test('nextStarI18n translates star upgrade requirements to Chinese', () => {
  setLanguage('zh');
  // ☆2
  const next2 = { n: 2, text: 'さいきん 10もんの 初回正解が 80% いじょう', now: 'いま 6もん・83%' };
  const res2 = nextStarI18n(next2);
  assert.match(res2.text, /最近 10 题初次正解率达 80% 以上/);
  assert.match(res2.now, /当前 6 题·83%/);

  // ☆3
  const next3 = { n: 3, text: '1もんを だいたい 2.5びょう いないで とく', now: 'いま 2.1びょう（4/5もん）' };
  const res3 = nextStarI18n(next3);
  assert.match(res3.text, /每题平均在 2.5 秒内解答完毕/);
  assert.match(res3.now, /当前 2.1 秒（已答 4\/5 题）/);

  // ☆4
  const next4 = { n: 4, text: '☆3から 7日 たってから、5もん つづけて 初回正解', now: 'あと 3日 まってね' };
  const res4 = nextStarI18n(next4);
  assert.match(res4.text, /达到 ☆3 后满 7 天/);
  assert.match(res4.now, /还需等待 3 天/);
});

test('date and calendar formatting in Chinese', () => {
  setLanguage('zh');
  assert.equal(monthYearText(2026, 8), '2026年9月');
  assert.equal(dayLogTitleText(9, 29), '9月29日的练习记录');
});

test('questTextI18n translations', () => {
  setLanguage('zh');
  assert.equal(questTextI18n({ id: 'play1' }, 'fallback'), '游玩 1 轮算术练习');
  assert.equal(questTextI18n({ id: 'combo5' }, 'fallback'), '达成 5 连击');
  assert.equal(questTextI18n({ id: 'extra' }, 'fallback'), '进入加时挑战关卡');
});

test('trophy translations cover all series and items without empty results', () => {
  setLanguage('zh');

  // Verify series titles
  for (const s of SERIES) {
    const title = trophySeriesTitle(s.key, s.title);
    assert.ok(title, `Missing title for series ${s.key}`);
    assert.notEqual(title.trim(), '');
  }

  // Verify specific series titles
  assert.equal(trophySeriesTitle('streak', 'れんぞくで あそぶ'), '连续打卡');
  assert.equal(trophySeriesTitle('items', 'コレクション'), '外观收集');
  assert.equal(trophySeriesTitle('unlocked', 'スキル かいほう'), '技能解锁');
  assert.equal(trophySeriesTitle('stickers', 'ログインシール'), '日历印章');
  assert.equal(trophySeriesTitle('dopa', 'ドパ'), '多帕能量');

  // Verify all trophies have non-empty Chinese name and desc
  assert.ok(TROPHIES.length > 300, `Expected 300+ trophies, found ${TROPHIES.length}`);
  for (const t of TROPHIES) {
    const name = trophyItemName(t);
    const desc = trophyItemDesc(t);
    assert.ok(name, `Missing name for trophy ${t.id}`);
    assert.ok(desc, `Missing desc for trophy ${t.id}`);
    assert.notEqual(name.trim(), '');
    assert.notEqual(desc.trim(), '');
  }

  // Verify sample item translations
  const tStreak3 = TROPHIES.find((x) => x.id === 'streak-3');
  assert.equal(trophyItemName(tStreak3), '连续 3 天');

  const tItems10 = TROPHIES.find((x) => x.id === 'items-10');
  assert.equal(trophyItemName(tItems10), '收集外观 10 个');

  const tUnlocked3 = TROPHIES.find((x) => x.id === 'unlocked-3');
  assert.equal(trophyItemName(tUnlocked3), '解锁 3 项');

  const tSecretSunday = TROPHIES.find((x) => x.id === 'secret-sunday');
  assert.equal(trophyItemName(tSecretSunday), '星期天的数学');
});

test('settings credits translations in all supported languages', () => {
  setLanguage('zh');
  assert.equal(t('setCreditsLabel'), '关于与致谢');
  assert.ok(t('setCreditsDesc').includes('@grmchn4ai'));
  assert.equal(t('setCreditsRepo'), 'GitHub 原作仓库');

  setLanguage('ja');
  assert.equal(t('setCreditsLabel'), 'クレジット');
  assert.ok(t('setCreditsDesc').includes('@grmchn4ai'));
  assert.equal(t('setCreditsRepo'), 'GitHub 原作リポジトリ');

  setLanguage('en');
  assert.equal(t('setCreditsLabel'), 'Credits');
  assert.ok(t('setCreditsDesc').includes('@grmchn4ai'));
  assert.equal(t('setCreditsRepo'), 'GitHub Original Repo');

  // Reset to default
  setLanguage('zh');
});
