// Lightweight native i18n module for dopa-drill (zero external dependencies).
// Supports 'zh' (Simplified Chinese), 'ja' (Japanese), and 'en' (English).

const STORAGE_KEY = 'dopa-drill-lang';

export const SUPPORTED_LANGS = [
  { code: 'zh', name: '简体中文' },
  { code: 'ja', name: '日本語' },
  { code: 'en', name: 'English' },
];

// Active language state. Default is Chinese ('zh').
let currentLang = (() => {
  try {
    if (typeof location !== 'undefined') {
      const p = new URLSearchParams(location.search);
      const urlLang = p.get('lang');
      if (urlLang && ['zh', 'ja', 'en'].includes(urlLang)) return urlLang;
    }
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved && ['zh', 'ja', 'en'].includes(saved)) return saved;
    return 'zh'; // 默认统一使用中文展示
  } catch {
    return 'zh';
  }
})();

export function getLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (!['zh', 'ja', 'en'].includes(lang)) return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

// ---------------------------------------------------------------- Dictionaries
const STRINGS = {
  zh: {
    // Brand & General
    appTitle: '多帕速算 (Dopa Drill)',
    gameName: '多帕速算',
    logoBurstTop: '多帕',
    logoBurstRibbon: '速算',
    mascotName: '多帕吉',
    noscript: '本游戏需要开启 JavaScript 才能运行。',
    loading: '加载中...',
    pts: '分',
    timesUnit: '次',
    problemsUnit: '题',
    secondsUnit: '秒',
    minutesUnit: '分',
    streakDaysUnit: '天',
    starCountUnit: '颗',
    
    // Top HUD & Controls
    helpBtnAria: '玩法说明与帮助',
    settingsBtnAria: '设置',
    keyboardHint: '支持使用数字键和退格键（Backspace）作答',
    cellInputAria: '输入框',
    muteBtnAria: '静音切换',
    muteOn: '静音',
    muteOff: '开启声音',
    demoTag: '演示模式',

    // Modes & Main Menu
    myLevel: '个性化闯关',
    myLevelSub: '首次游玩将进行实力诊断测试',
    review: '巩固错题',
    skillTree: '技能树',
    trophy: '成就奖杯',
    collection: '收藏展示',
    grade1: '一年级',
    grade2: '二年级',
    grade3: '三年级',
    grade4: '四年级',
    grade5: '五年级',
    grade6: '六年级',
    gradeGroupAria: '按年级练习',
    
    // Quests & Calendar
    todayQuests: '今日任务',
    questComplete: '全部完成！',
    questAllBonus: '全完成奖励',
    calendarTitle: '出勤打卡日历',
    calPrevMonth: '上一月',
    calNextMonth: '下一月',
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    
    // Play Screen HUD
    targetTime: '目标 {time}',
    targetOver: '超出目标时间',
    correctCount: '正确',
    missCount: '差一点',
    comboLabel: '连击',
    dopaLabel: '多帕',
    dopaMultMax: '多帕×2 极速',
    dopaMult: '多帕×{val}',
    stepInputAria: '输入框',
    hintLabel: '提示',
    questionLast: '最后一题！',
    questionIndex: '第 {num} 题',
    questionExtra: '挑战 EX {num}',
    unlockCutin: '解锁新技能！ {name}',
    correctStampText: '正确',
    fullScoreStamp: '100分！',
    fullScoreBanner: '100分达成！',
    perfectRun: '全部做对啦！太棒了！',

    // Result Screens
    basicResultTitle: '基础练习完成',
    reviewResultTitle: '错题复习完成',
    finalResultTitle: '加时挑战结束',
    modeResultTitle: '{mode} 闯关成功',
    scoreLabel: '得分',
    accuracyLabel: '初次正解率',
    timeLabel: '用时',
    growthHeader: '你进步啦！',
    firstTimeTry: '首次作答（{day}）',
    yesterday: '昨天',
    today: '今天',
    btnGoExtra: '挑战加时赛',
    btnGoExtraSub: '90秒限时',
    btnReviewMistakes: '重做错题',
    btnViewTree: '查看技能树',
    btnPlayAgain: '再来一次',
    btnFinish: '结束返回',
    finalBreakdown: '基础 {basic} ＋ 挑战加分 {extra}',
    extraSolvedLabel: '挑战答对',
    extraMissLabel: '挑战失误',
    basicMissLabel: '基础失误',
    basicTimeLabel: '基础用时',

    // Skill Tree Screen
    treeHeadTitle: '技能树',
    treeBackAria: '返回',
    treeNote: '轻按练习（达到 ☆ 条件可掌握）· 长按可重置该技能及后续节点',
    treeMasterCond: '掌握条件：近6次中有5次初次答对',
    treeMastered: '已掌握',
    treeLearning: '练习中',
    treeLocked: '未解锁',
    treeStarPrefix: '☆{count}',

    // Trophies Screen
    trophyHeadTitle: '成就奖杯',
    trFilterAll: '全部',
    trFilterGot: '已获得',
    trFilterNext: '未获得',
    trFilterSoon: '即将达成',
    trCategoryLabel: '分类',
    trGotTitle: '获得新成就！',
    trGotButton: '太棒了！',

    // Collection Screen
    collectHeadTitle: '宝物收藏库',
    collectNote: '在此选择游戏中生效的视觉外观、音乐与终场特效（选择“随机”每次将自动随机）',
    collectAuto: '随机轮换',

    // Settings Modal
    settingsTitle: '系统设置',
    setLanguage: '语言 / Language',
    setProblemCount: '每组题数',
    setSound: '音效与音乐',
    setSoundOn: '开启',
    setSoundOff: '关闭',
    setVolumeAria: '音量调节',
    setMotion: '动态特效强度',
    setMotionNote: '调至 0% 可关闭屏幕晃动、强光闪烁与纸屑飘落',
    setDemo: '自动演示',
    setDemoBtn: '▶ 查看自动演示',
    setDemoNote: '轻触屏幕或按任意键即可退出演示（不计入个人记录）',
    setData: '存档数据',
    setDataReset: '全部重置',
    setDataResetNote: '清除此浏览器上的所有游戏进度、成就与自定义设置，回到初始状态',
    setCreditsLabel: '关于与致谢',
    setCreditsDesc: '感谢原作者 <b>@grmchn4ai</b> 的精妙原作与开源分享',
    setCreditsRepo: 'GitHub 原作仓库',
    setCreditsAria: '前往 GitHub 查看原作仓库',
    btnClose: '关闭',

    // Modals: Bonus, Hammer, Confirm, Info
    bonusTitle: '每日登录奖励',
    bonusGetBtn: '立即领取',
    bonusConsecutive: '已连续签到 {days} 天',
    bonusHammerReward: '获得 补签铁锤 ×1',
    bonusCardNote: '每天坚持算一算，多多练习更有劲！',
    hammerTitle: '补签铁锤',
    hammerNoUse: '暂不使用',
    hammerUse: '立即补签',
    hammerHave: '当前持有：{count} 把',
    hammerOfferMsg: '检测到之前中断了 {days} 天的练习，使用补签铁锤可以拯救保持你的 {run} 天连续打卡记录！',
    confirmRelockTitle: '重置此技能进度',
    confirmRelockMsg: '确定要清除该技能及其所有后续依赖技能的练习记录吗？',
    confirmCancel: '取消',
    confirmDanger: '确认重置',
    dayLogTitle: '历史游玩记录',
    siPracticeBtn: '专项练习',
    siNextStarLabel: '升至 ☆{n}',
    siMaxStars: '☆5 达成！超凡大师！',
    siRustyNote: '技能有点生疏了，初次答对1题即可重新擦亮！',
    siSolvedCount: '已练习 {count} 题',
    siBestSpeed: '最快单题用时 {sec} 秒',

    // Guide Tour
    guideIntroTitle: '欢迎来到多帕速算',
    guideIntroText: '这里有 3 种适合不同场景的\n数学算术练习方式',
    guideLevelTitle: '个性化闯关',
    guideLevelText: '为你量身定制的动态难度题目。\n首次游玩时会进行实力测评。',
    guideGradesTitle: '年级分册练习',
    guideGradesText: '汇集小学各年级核心大纲，\n系统巩固该年级的所有算法。',
    guideTreeTitle: '完整技能树',
    guideTreeText: '自由选择感兴趣的算法专项突破，\n一步步解锁更高级的数学技能。',
    guideTrophyTitle: '成就奖杯',
    guideTrophyText: '不断练习就能解锁各种成就奖章，\n坚持每天出勤还能收获更多惊喜！',
    guideCollectTitle: '外观与音乐收藏',
    guideCollectText: '达成成就可解锁丰富的游戏主题、\n背景乐曲、打击特效与吉祥物装扮！',
    guideLastTitle: '如果拿不准，就选个性化闯关！',
    guideLastText: '点击左上角帮助按钮\n随时可以再次查看本说明哦。',
    guideSkip: '跳过',
    guideBack: '上一步',
    guideNext: '下一步',
    guideStart: '开始游玩！',
    guideRecommend: '推荐',
    guidePageOf: '共 {total} 页，第 {cur} 页',

    // Almost / Miss Feedback
    almost: '差一点！',
    almostTimeout: '连击中断',
    almostEnded: '{count} 连击结束',
    comboCountTxt: '{count} 连击！',
  },

  ja: {
    // Brand & General
    appTitle: 'ドパドリル',
    gameName: 'ドパドリル',
    logoBurstTop: 'ドパ',
    logoBurstRibbon: 'ドリル',
    mascotName: 'ドパキチ',
    noscript: 'このゲームの操作にはJavaScriptが必要です。',
    loading: '読み込み中...',
    pts: '点',
    timesUnit: '回',
    problemsUnit: '問',
    secondsUnit: '秒',
    minutesUnit: '分',
    streakDaysUnit: '日',
    starCountUnit: 'こ',
    
    // Top HUD & Controls
    helpBtnAria: 'あそびかた',
    settingsBtnAria: 'せってい',
    keyboardHint: '数字キーとBackspaceでも操作できます',
    cellInputAria: '入力欄',
    muteBtnAria: '音を消す',
    muteOn: 'ミュート中',
    muteOff: '音あり',
    demoTag: 'DEMO',

    // Modes & Main Menu
    myLevel: 'じぶんレベル',
    myLevelSub: 'はじめは じつりょくチェック',
    review: 'ふくしゅう',
    skillTree: 'スキルツリー',
    trophy: 'トロフィー',
    collection: 'コレクション',
    grade1: '1ねんせい',
    grade2: '2ねんせい',
    grade3: '3ねんせい',
    grade4: '4ねんせい',
    grade5: '5ねんせい',
    grade6: '6ねんせい',
    gradeGroupAria: '学年べつ',

    // Quests & Calendar
    todayQuests: 'きょうの クエスト',
    questComplete: 'コンプリート！',
    questAllBonus: 'ぜんぶで',
    calendarTitle: 'カレンダー',
    calPrevMonth: '前の月',
    calNextMonth: '次の月',
    weekDays: ['日', '月', '火', '水', '木', '金', '土'],

    // Play Screen HUD
    targetTime: '目標 {time}',
    targetOver: '目標超過',
    correctCount: '正解',
    missCount: 'おしい',
    comboLabel: 'コンボ',
    dopaLabel: 'ドパ',
    dopaMultMax: 'ドパ×2 MAX',
    dopaMult: 'ドパ×{val}',
    stepInputAria: '入力欄',
    hintLabel: 'ヒント',
    questionLast: 'ラスト1問',
    questionIndex: '第{num}問',
    questionExtra: 'EX {num}',
    unlockCutin: 'かいほう！ {name}',
    correctStampText: 'せいかい',
    fullScoreStamp: '100点',
    fullScoreBanner: '100てん！',
    perfectRun: 'パーフェクト！',

    // Result Screens
    basicResultTitle: '基本結果',
    reviewResultTitle: 'ふくしゅう クリア',
    finalResultTitle: 'エクストラ終了',
    modeResultTitle: '{mode} クリア',
    scoreLabel: '得点',
    accuracyLabel: '初回正解率',
    timeLabel: 'タイム',
    growthHeader: 'のびたよ！',
    firstTimeTry: 'はじめて（{day}）',
    yesterday: 'きのう',
    today: 'きょう',
    btnGoExtra: 'エクストラへ',
    btnGoExtraSub: '90秒',
    btnReviewMistakes: 'まちがえた問題を やりなおす',
    btnViewTree: 'スキルツリーを見る',
    btnPlayAgain: 'もう一度',
    btnFinish: 'おわる',
    finalBreakdown: '基本 {basic} ＋ エクストラ {extra}',
    extraSolvedLabel: 'エクストラ正解',
    extraMissLabel: 'エクストラのおしい',
    basicMissLabel: '基本のおしい',
    basicTimeLabel: '基本タイム',

    // Skill Tree Screen
    treeHeadTitle: 'スキルツリー',
    treeBackAria: 'もどる',
    treeNote: 'タップで れんしゅう（マスターは ☆の じょうけん）　ながおしで けす',
    treeMasterCond: 'マスター条件：直近6回中5回初回正解',
    treeMastered: 'マスター',
    treeLearning: 'れんしゅうちゅう',
    treeLocked: '未解放',
    treeStarPrefix: '☆{count}',

    // Trophies Screen
    trophyHeadTitle: 'トロフィー',
    trFilterAll: 'ぜんぶ',
    trFilterGot: 'ゲットした',
    trFilterNext: 'まだ',
    trFilterSoon: 'もうすぐ',
    trCategoryLabel: 'カテゴリ',
    trGotTitle: 'トロフィー ゲット！',
    trGotButton: 'やったね！',

    // Collection Screen
    collectHeadTitle: 'コレクション',
    collectNote: 'トロフィーのごほうびでふえる はいけい・おんがく・きせかえなどを えらべるよ',
    collectAuto: 'おまかせ',

    // Settings Modal
    settingsTitle: 'せってい',
    setLanguage: '言語 / Language',
    setProblemCount: '問題の数',
    setSound: '音',
    setSoundOn: 'オン',
    setSoundOff: 'オフ',
    setVolumeAria: '音の大きさ',
    setMotion: '動きの強さ',
    setMotionNote: '0%で揺れ・光・紙吹雪・移動を止めます',
    setDemo: 'デモプレイ',
    setDemoBtn: '▶ 自動でプレイを見る',
    setDemoNote: '画面をタップするか、キーを押すと終わります（記録には残りません）',
    setData: 'データ',
    setDataReset: 'すべて リセット',
    setDataResetNote: 'すべての データを けして さいしょに もどします',
    setCreditsLabel: 'クレジット',
    setCreditsDesc: '原作者 <b>@grmchn4ai</b> さんの素晴らしい発想と公開に感謝します',
    setCreditsRepo: 'GitHub 原作リポジトリ',
    setCreditsAria: 'GitHubの原作リポジトリを開く',
    btnClose: 'とじる',

    // Modals: Bonus, Hammer, Confirm, Info
    bonusTitle: 'ログインボーナス',
    bonusGetBtn: 'もらう',
    bonusConsecutive: '{days}日 れんぞく プレイ中！',
    bonusHammerReward: 'ノーカンハンマー ＋1',
    bonusCardNote: 'まいにち つづけて あそぼう！',
    hammerTitle: 'ノーカンハンマー',
    hammerNoUse: 'つかわない',
    hammerUse: 'つかう',
    hammerHave: 'もっているかず：{count}本',
    hammerOfferMsg: '{days}日ぶんの やすみを ノーカンにして {run}日れんぞくを まもる？',
    confirmRelockTitle: 'スキルを けす',
    confirmRelockMsg: 'この スキルと、この スキルから つながる スキルの きろくを けしますか？',
    confirmCancel: 'やめる',
    confirmDanger: 'けす',
    dayLogTitle: 'きろく',
    siPracticeBtn: 'れんしゅう する',
    siNextStarLabel: 'つぎの ☆{n}',
    siMaxStars: '☆5 たっせい！ すごい！',
    siRustyNote: 'すこし さびているよ。1もん 初回正解で ピカピカ！　',
    siSolvedCount: 'といた もんだい {count}もん',
    siBestSpeed: 'いちばん はやい 1もん {sec}びょう',

    // Guide Tour
    guideIntroTitle: 'あそびかた',
    guideIntroText: 'もんだいは 3つの\nえらびかたが あるよ',
    guideLevelTitle: 'じぶんレベル',
    guideLevelText: 'いまの きみに あった もんだい。\nはじめは じつりょくチェック',
    guideGradesTitle: '1ねんせい〜6ねんせい',
    guideGradesText: 'がくねんの もんだいを\nまとめて れんしゅう',
    guideTreeTitle: 'スキルツリー',
    guideTreeText: 'やりたい もんだいを\n1つ えらんで れんしゅう',
    guideTrophyTitle: 'トロフィー',
    guideTrophyText: 'あそぶと もらえるよ。\nつづけて あそぶと ふえていく',
    guideCollectTitle: 'コレクション',
    guideCollectText: 'トロフィーの ごほうびで ふえる\nはいけい・おんがく・きせかえなどを\nえらべるよ',
    guideLastTitle: 'まよったら じぶんレベル！',
    guideLastText: 'この せつめいは\n？ で また みられるよ',
    guideSkip: 'とばす',
    guideBack: 'もどる',
    guideNext: 'つぎへ',
    guideStart: 'はじめる！',
    guideRecommend: 'おすすめ',
    guidePageOf: '{total}つのうち {cur}つめ',

    // Almost / Miss Feedback
    almost: 'おしい',
    almostTimeout: 'コンボ おわり',
    almostEnded: '{count}コンボ おわり',
    comboCountTxt: '{count}コンボ！',
  },

  en: {
    // Brand & General
    appTitle: 'Dopa Drill',
    gameName: 'Dopa Drill',
    logoBurstTop: 'Dopa',
    logoBurstRibbon: 'Drill',
    mascotName: 'Dopakichi',
    noscript: 'JavaScript is required to play this game.',
    loading: 'Loading...',
    pts: 'Pts',
    timesUnit: 'times',
    problemsUnit: 'Qs',
    secondsUnit: 's',
    minutesUnit: 'min',
    streakDaysUnit: 'days',
    starCountUnit: 'stars',

    // Top HUD & Controls
    helpBtnAria: 'How to Play & Help',
    settingsBtnAria: 'Settings',
    keyboardHint: 'You can also use number keys and Backspace',
    cellInputAria: 'Input field',
    muteBtnAria: 'Toggle Mute',
    muteOn: 'Muted',
    muteOff: 'Sound On',
    demoTag: 'DEMO',

    // Modes & Main Menu
    myLevel: 'My Level',
    myLevelSub: 'Starts with an assessment test',
    review: 'Review Mistakes',
    skillTree: 'Skill Tree',
    trophy: 'Trophies',
    collection: 'Collection',
    grade1: 'Grade 1',
    grade2: 'Grade 2',
    grade3: 'Grade 3',
    grade4: 'Grade 4',
    grade5: 'Grade 5',
    grade6: 'Grade 6',
    gradeGroupAria: 'Practice by Grade',

    // Quests & Calendar
    todayQuests: "Today's Quests",
    questComplete: 'Complete!',
    questAllBonus: 'All Clear Bonus',
    calendarTitle: 'Calendar',
    calPrevMonth: 'Previous Month',
    calNextMonth: 'Next Month',
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    // Play Screen HUD
    targetTime: 'Target {time}',
    targetOver: 'Over Target',
    correctCount: 'Correct',
    missCount: 'Almost',
    comboLabel: 'Combo',
    dopaLabel: 'Dopa',
    dopaMultMax: 'Dopa×2 MAX',
    dopaMult: 'Dopa×{val}',
    stepInputAria: 'Input field',
    hintLabel: 'Hint',
    questionLast: 'Final Problem!',
    questionIndex: 'Q{num}',
    questionExtra: 'EX {num}',
    unlockCutin: 'Unlocked! {name}',
    correctStampText: 'Correct!',
    fullScoreStamp: '100 Pts!',
    fullScoreBanner: '100 Points!',
    perfectRun: 'Perfect Clear!',

    // Result Screens
    basicResultTitle: 'Stage Clear!',
    reviewResultTitle: 'Review Clear!',
    finalResultTitle: 'Extra Finished!',
    modeResultTitle: '{mode} Clear',
    scoreLabel: 'Score',
    accuracyLabel: 'First-Try Rate',
    timeLabel: 'Time',
    growthHeader: 'Look at you grow!',
    firstTimeTry: 'First time ({day})',
    yesterday: 'Yesterday',
    today: 'Today',
    btnGoExtra: 'Go to Extra',
    btnGoExtraSub: '90 sec',
    btnReviewMistakes: 'Retry Mistakes',
    btnViewTree: 'View Skill Tree',
    btnPlayAgain: 'Play Again',
    btnFinish: 'Finish',
    finalBreakdown: 'Base {basic} ＋ Extra {extra}',
    extraSolvedLabel: 'Extra Solved',
    extraMissLabel: 'Extra Slips',
    basicMissLabel: 'Base Slips',
    basicTimeLabel: 'Base Time',

    // Skill Tree Screen
    treeHeadTitle: 'Skill Tree',
    treeBackAria: 'Back',
    treeNote: 'Tap to practice (Mastery: ☆ requirement) · Long press to reset',
    treeMasterCond: 'Mastery: 5 first-try clears in last 6 attempts',
    treeMastered: 'Mastered',
    treeLearning: 'Learning',
    treeLocked: 'Locked',
    treeStarPrefix: '☆{count}',

    // Trophies Screen
    trophyHeadTitle: 'Trophies',
    trFilterAll: 'All',
    trFilterGot: 'Earned',
    trFilterNext: 'Locked',
    trFilterSoon: 'Almost There',
    trCategoryLabel: 'Category',
    trGotTitle: 'Trophy Unlocked!',
    trGotButton: 'Awesome!',

    // Collection Screen
    collectHeadTitle: 'Collection',
    collectNote: 'Equip backgrounds, correct stamps, music, and outfits earned from trophies!',
    collectAuto: 'Random',

    // Settings Modal
    settingsTitle: 'Settings',
    setLanguage: 'Language / 言語',
    setProblemCount: 'Problem Count',
    setSound: 'Sound & Music',
    setSoundOn: 'On',
    setSoundOff: 'Off',
    setVolumeAria: 'Volume',
    setMotion: 'Motion & Effects',
    setMotionNote: '0% disables screen shakes, flashes, confetti, and big animations',
    setDemo: 'Demo Play',
    setDemoBtn: '▶ Watch Auto Demo',
    setDemoNote: 'Tap screen or press any key to exit (will not be saved)',
    setData: 'Game Data',
    setDataReset: 'Reset All Data',
    setDataResetNote: 'Clear all game progress, trophies and settings on this browser',
    setCreditsLabel: 'Credits',
    setCreditsDesc: 'Special thanks to original author <b>@grmchn4ai</b> for the wonderful project',
    setCreditsRepo: 'GitHub Original Repo',
    setCreditsAria: 'View original repository on GitHub',
    btnClose: 'Close',

    // Modals: Bonus, Hammer, Confirm, Info
    bonusTitle: 'Daily Login Bonus',
    bonusGetBtn: 'Claim',
    bonusConsecutive: '{days} Day Streak!',
    bonusHammerReward: '+1 No-Count Hammer',
    bonusCardNote: 'Keep up the daily practice!',
    hammerTitle: 'No-Count Hammer',
    hammerNoUse: "Don't Use",
    hammerUse: 'Use Hammer',
    hammerHave: 'Held: {count}',
    hammerOfferMsg: 'Bridge {days} missed day(s) to protect your {run}-day streak?',
    confirmRelockTitle: 'Reset Skill',
    confirmRelockMsg: 'Are you sure you want to reset this skill and all dependent skills?',
    confirmCancel: 'Cancel',
    confirmDanger: 'Reset',
    dayLogTitle: 'History Log',
    siPracticeBtn: 'Practice Now',
    siNextStarLabel: 'Next ☆{n}',
    siMaxStars: '☆5 Mastered! Outstanding!',
    siRustyNote: 'A bit rusty! Clear 1 problem on first try to polish!',
    siSolvedCount: 'Problems solved: {count}',
    siBestSpeed: 'Best speed: {sec}s',

    // Guide Tour
    guideIntroTitle: 'How to Play',
    guideIntroText: 'There are 3 ways to choose\nyour math practice:',
    guideLevelTitle: 'My Level',
    guideLevelText: 'Problems tailored to your level.\nStarts with an assessment.',
    guideGradesTitle: 'Grades 1 to 6',
    guideGradesText: 'Practice standard curriculum\nfor each school grade.',
    guideTreeTitle: 'Skill Tree',
    guideTreeText: 'Pick any specific topic\nyou want to master.',
    guideTrophyTitle: 'Trophies',
    guideTrophyText: 'Earn trophies by playing\nand keeping daily streaks!',
    guideCollectTitle: 'Collection',
    guideCollectText: 'Customize backgrounds, music,\neffects, and mascot outfits!',
    guideLastTitle: 'When in doubt, pick My Level!',
    guideLastText: 'Tap the ? button anytime\nto view this guide again.',
    guideSkip: 'Skip',
    guideBack: 'Back',
    guideNext: 'Next',
    guideStart: 'Start!',
    guideRecommend: 'Recommended',
    guidePageOf: 'Page {cur} of {total}',

    // Almost / Miss Feedback
    almost: 'Almost!',
    almostTimeout: 'Combo Lost',
    almostEnded: '{count} Combo Ended',
    comboCountTxt: '{count} Combo!',
  },
};

// ---------------------------------------------------------------- Skills Translation
export const SKILL_NAMES = {
  zh: {
    'g1-compose10': '10的分成与合成',
    'g1-add-nc': '1位数的加法',
    'g1-sub-nb': '10以内的减法',
    'g1-add-c': '进位加法',
    'g1-sub-b': '退位减法',
    'g1-add3': '连加与连减',
    'g1-add-2d1': '两位数加一位数',
    'g1-sub-2d1': '两位数减一位数',
    'g2-vadd2-nc': '两位数加法竖式',
    'g2-vadd2-c': '进位加法竖式',
    'g2-vsub2-nb': '两位数减法竖式',
    'g2-vsub2-b': '退位减法竖式',
    'g2-vadd3s': '过百加法',
    'g2-vsub3s': '百以内退位减法',
    'g2-kuku25': '九九乘法 2和5的乘法',
    'g2-kuku34': '九九乘法 3和4的乘法',
    'g2-kuku67': '九九乘法 6和7的乘法',
    'g2-kuku891': '九九乘法 8、9、1的乘法',
    'g2-kuku-mix': '九九乘法 综合混合',
    'g2-mul-tens': '整十数乘一位数',
    'g2-frac-of': '几分之一（1/2与1/4）',
    'g3-vadd3': '三位数加法',
    'g3-vsub3': '三位数减法',
    'g3-vadd4': '四位数加法',
    'g3-vsub4': '四位数减法',
    'g3-div-basic': '表内除法',
    'g3-div-rem': '有余数的除法',
    'g3-div-tens': '整十数除以一位数',
    'g3-vmul-2x1': '两位数乘一位数竖式',
    'g3-vmul-3x1': '三位数乘一位数',
    'g3-vmul-2x2': '两位数乘两位数',
    'g3-vmul-3x2': '三位数乘两位数',
    'g3-dec-add1': '一位小数加法',
    'g3-dec-sub1': '一位小数减法',
    'g3-frac-same': '同分母分数加减法',
    'g4-vdiv-2d1': '两位数除以一位数竖式',
    'g4-vdiv-3d1': '三位数除以一位数',
    'g4-vdiv-2d2': '两位数除以两位数',
    'g4-vdiv-3d2': '三位数除以两位数',
    'g4-order': '四则混合运算顺序',
    'g4-round': '近似数（四舍五入）',
    'g4-dec-add2': '两位小数加减法',
    'g4-dec-mul': '小数乘整数',
    'g4-dec-div': '小数除以整数',
    'g4-frac-mixed': '带分数加减法',
    'g5-dec-mul': '小数乘小数',
    'g5-dec-div': '小数除以小数',
    'g5-gcd': '最大公因数',
    'g5-lcm': '最小公倍数',
    'g5-frac-reduce': '分数的约分',
    'g5-frac-diff': '异分母分数加减法',
    'g5-frac-int': '分数乘除整数',
    'g5-percent': '百分数',
    'g6-frac-mul': '分数乘分数',
    'g6-frac-div': '分数除以分数',
    'g6-frac-dec': '分数与小数混合计算',
    'g6-ratio': '化简比与比例',
    'g6-letter': '解方程（求未知数x）',
  },
  en: {
    'g1-compose10': 'Pairs to 10',
    'g1-add-nc': '1-Digit Addition',
    'g1-sub-nb': 'Subtraction within 10',
    'g1-add-c': 'Addition with Regrouping',
    'g1-sub-b': 'Subtraction with Regrouping',
    'g1-add3': '3-Number Operations',
    'g1-add-2d1': '2-Digit + 1-Digit',
    'g1-sub-2d1': '2-Digit - 1-Digit',
    'g2-vadd2-nc': 'Vertical Addition (2 Digits)',
    'g2-vadd2-c': 'Vertical Addition w/ Carry',
    'g2-vsub2-nb': 'Vertical Subtraction (2 Digits)',
    'g2-vsub2-b': 'Vertical Subtraction w/ Borrow',
    'g2-vadd3s': 'Addition Past 100',
    'g2-vsub3s': 'Subtraction from 100',
    'g2-kuku25': 'Multiplication: 2s & 5s',
    'g2-kuku34': 'Multiplication: 3s & 4s',
    'g2-kuku67': 'Multiplication: 6s & 7s',
    'g2-kuku891': 'Multiplication: 8s, 9s, 1s',
    'g2-kuku-mix': 'Mixed Times Tables',
    'g2-mul-tens': 'Multiples of 10 × 1-Digit',
    'g2-frac-of': 'Fractions 1/2 & 1/4',
    'g3-vadd3': '3-Digit Addition',
    'g3-vsub3': '3-Digit Subtraction',
    'g3-vadd4': '4-Digit Addition',
    'g3-vsub4': '4-Digit Subtraction',
    'g3-div-basic': 'Basic Division',
    'g3-div-rem': 'Division with Remainder',
    'g3-div-tens': 'Multiples of 10 ÷ 1-Digit',
    'g3-vmul-2x1': '2-Digit × 1-Digit Vertical',
    'g3-vmul-3x1': '3-Digit × 1-Digit',
    'g3-vmul-2x2': '2-Digit × 2-Digit',
    'g3-vmul-3x2': '3-Digit × 2-Digit',
    'g3-dec-add1': '1-Place Decimal Addition',
    'g3-dec-sub1': '1-Place Decimal Subtraction',
    'g3-frac-same': 'Fractions with Like Denominators',
    'g4-vdiv-2d1': '2-Digit ÷ 1-Digit Vertical',
    'g4-vdiv-3d1': '3-Digit ÷ 1-Digit',
    'g4-vdiv-2d2': '2-Digit ÷ 2-Digit',
    'g4-vdiv-3d2': '3-Digit ÷ 2-Digit',
    'g4-order': 'Order of Operations',
    'g4-round': 'Rounding Numbers',
    'g4-dec-add2': '2-Place Decimal Addition/Sub',
    'g4-dec-mul': 'Decimal × Integer',
    'g4-dec-div': 'Decimal ÷ Integer',
    'g4-frac-mixed': 'Mixed Numbers Operations',
    'g5-dec-mul': 'Decimal × Decimal',
    'g5-dec-div': 'Decimal ÷ Decimal',
    'g5-gcd': 'Greatest Common Divisor',
    'g5-lcm': 'Least Common Multiple',
    'g5-frac-reduce': 'Simplifying Fractions',
    'g5-frac-diff': 'Fractions with Unlike Denominators',
    'g5-frac-int': 'Fractions ×÷ Integers',
    'g5-percent': 'Percentages',
    'g6-frac-mul': 'Fraction × Fraction',
    'g6-frac-div': 'Fraction ÷ Fraction',
    'g6-frac-dec': 'Mixed Decimals and Fractions',
    'g6-ratio': 'Ratios & Proportions',
    'g6-letter': 'Solving for x',
  },
};

export const LANES_I18N = {
  zh: ['加减法', '乘除法', '小数与分数', '综合拓展'],
  ja: ['たし・ひき', 'かけ・わり', '小数・分数', 'そのほか'],
  en: ['Add & Sub', 'Mult & Div', 'Dec & Frac', 'Other Topics'],
};

// ---------------------------------------------------------------- Trophy Translations
export const CATS_I18N = {
  zh: {
    'つづける': '坚持不懈',
    'たくさん': '练习海量',
    'スキル': '技能大师',
    'せいちょう': '自我成长',
    'エクストラ': '极限挑战',
    'コンボ': '连击大师',
    'せいかく': '精准无误',
    'ドパ': '多帕能量',
    'ふくしゅう': '温故知新',
    'がくねん': '年级全通',
    'コレクション': '宝物收藏',
    'ひみつ': '隐藏成就',
  },
  ja: {
    'つづける': 'つづける',
    'たくさん': 'たくさん',
    'スキル': 'スキル',
    'せいちょう': 'せいちょう',
    'エクストラ': 'エクストラ',
    'コンボ': 'コンボ',
    'せいかく': 'せいかく',
    'ドパ': 'ドパ',
    'ふくしゅう': 'ふくしゅう',
    'がくねん': 'がくねん',
    'コレクション': 'コレクション',
    'ひみつ': 'ひみつ',
  },
  en: {
    'つづける': 'Consistency',
    'たくさん': 'Volume',
    'スキル': 'Skills',
    'せいちょう': 'Growth',
    'エクストラ': 'Extra Stage',
    'コンボ': 'Combos',
    'せいかく': 'Accuracy',
    'ドパ': 'Dopa Energy',
    'ふくしゅう': 'Review',
    'がくねん': 'Grades',
    'コレクション': 'Collection',
    'ひみつ': 'Secrets',
  },
};

export const RANK_NAME_I18N = {
  zh: { bronze: '铜牌', silver: '银牌', gold: '金牌', rainbow: '彩虹', secret: '绝密' },
  ja: { bronze: 'どう', silver: 'ぎん', gold: 'きん', rainbow: 'にじ', secret: 'ひみつ' },
  en: { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', rainbow: 'Rainbow', secret: 'Secret' },
};

const fmtZh = (n) => (n >= 10000 && n % 10000 === 0 ? `${n / 10000}万` : Number(n).toLocaleString('zh-CN'));
const DOPA_LABELS_ZH = { 2: '100', 3: '1000', 4: '1万', 5: '10万', 6: '100万', 7: '1000万', 8: '1亿', 9: '10亿' };
const DOPA_LABELS_EN = { 2: '100', 3: '1,000', 4: '10K', 5: '100K', 6: '1M', 7: '10M', 8: '100M', 9: '1B' };

// Trophy series & descriptions
export const TROPHY_SERIES_I18N = {
  zh: {
    days: { title: '每日出勤', name: (v) => `坚持 ${fmtZh(v)} 天`, desc: (v) => `累计游玩达到 ${fmtZh(v)} 天` },
    streak: { title: '连续打卡', name: (v) => `连续 ${v} 天`, desc: (v) => `不间断连续游玩 ${v} 天` },
    stickers: { title: '日历印章', name: (v) => `印章 ${v} 枚`, desc: (v) => `在打卡日历上收集 ${v} 枚印章` },
    crowns: { title: '完美皇冠', name: (v) => `皇冠 ${v} 顶`, desc: (v) => `在日历上累计收获 ${v} 顶满分皇冠` },
    plays: { title: '游玩次数', name: (v) => `游玩 ${fmtZh(v)} 轮`, desc: (v) => `完成 ${fmtZh(v)} 轮基础算术练习` },
    minutes: { title: '练习时长', name: (v) => (v >= 60 ? `累计 ${v / 60} 小时` : `时长 ${v} 分钟`), desc: (v) => (v >= 60 ? `累计练习时间达 ${v / 60} 小时` : `累计练习时间达 ${v} 分钟`) },
    problems: { title: '做题总数', name: (v) => `解题 ${fmtZh(v)} 道`, desc: (v) => `累计答对 ${fmtZh(v)} 道数学题` },
    cells: { title: '填入数字', name: (v) => `填写 ${fmtZh(v)} 格`, desc: (v) => `在算式中正确输入 ${fmtZh(v)} 个数字格` },
    unlocked: { title: '技能解锁', name: (v) => `解锁 ${v} 项`, desc: (v) => `在技能树中解锁 ${v} 项技能` },
    mastered: { title: '技能掌握', name: (v) => `掌握 ${v} 项`, desc: (v) => `在技能树中彻底掌握 ${v} 项技能` },
    extras: { title: '进入挑战', name: (v) => `挑战 ${v} 次`, desc: (v) => `进入加时挑战关卡 ${v} 次` },
    extraBest: { title: '挑战单场答对', name: (v) => `单场挑战 ${v} 题`, desc: (v) => `在单次加时挑战中答对 ${v} 题` },
    extraSolved: { title: '挑战累计答对', name: (v) => `挑战累计 ${fmtZh(v)} 题`, desc: (v) => `在加时挑战中累计答对 ${fmtZh(v)} 题` },
    combo: { title: '连击达人', name: (v) => `${v} 连击`, desc: (v) => `达成 ${v} 次连续正确连击` },
    perfects: { title: '满分全对', name: (v) => `100分 ${v} 次`, desc: (v) => `以初次100%全对成绩通关 ${v} 次` },
    firstTry: { title: '初次正解', name: (v) => `首次答对 ${fmtZh(v)} 题`, desc: (v) => `第一遍就正确回答 ${fmtZh(v)} 题` },
    dopa: { title: '多帕能量', name: (v) => `${DOPA_LABELS_ZH[v] || v}多帕`, desc: (v) => `单场比赛中多帕能量达到 ${DOPA_LABELS_ZH[v] || v}` },
    bestDopa: { title: '多帕能量', name: (v) => `${DOPA_LABELS_ZH[v] || v}多帕`, desc: (v) => `单场比赛中多帕能量达到 ${DOPA_LABELS_ZH[v] || v}` },
    review: { title: '错题攻坚', name: (v) => `复习 ${v} 题`, desc: (v) => `在复习模式中重新答对 ${v} 道错题` },
    questDays: { title: '每日任务全清', name: (v) => `任务全清 ${v} 天`, desc: (v) => `完成当天全部 3 个每日任务达 ${v} 天` },
    questRun: { title: '连续任务全清', name: (v) => `连续全清 ${v} 天`, desc: (v) => `连续 ${v} 天全部完成每日任务` },
    hammer: { title: '补签铁锤', name: (v) => (v === 1 ? '初次补签' : `补签 ${v} 次`), desc: (v) => `使用补签铁锤拯救连续记录 ${v} 次` },
    starsTotal: { title: '星星总数', name: (v) => `星星 ${v} 颗`, desc: (v) => `技能树中累计收集 ${v} 颗星星` },
    star5: { title: '5星技能', name: (v) => `☆5 技能 ${v} 个`, desc: (v) => `将 ${v} 个技能提升至满级 ☆5` },
    gradeStar3: { title: '全学年达☆3', name: (g) => `${g}年级全达☆3`, desc: (g) => `将${g}年级所有技能全部升至☆3及以上` },
    gradeDone: { title: '学年掌握', name: (g) => `${g}年级大圆满`, desc: (g) => `彻底掌握${g}年级的所有技能` },
    gradePlays: { title: '学年练习', name: (g) => `${g}年级练习`, desc: (g, v) => `在${g}年级分册中游玩 ${v} 轮` },
    laneDone: { title: '领域大圆满', name: (idx) => `${LANES_I18N.zh[idx]}全掌握`, desc: (idx) => `彻底掌握“${LANES_I18N.zh[idx]}”分类下的全部技能` },
    polished: { title: '擦亮技能', name: (v) => `擦亮 ${v} 次`, desc: (v) => `将生疏技能重新擦亮复习 ${v} 次` },
    capsules: { title: '时光胶囊', name: (v) => `开启胶囊 ${v} 个`, desc: (v) => `开启 ${v} 个过去的时光胶囊挑战` },
    capsuleFaster: { title: '超越过去', name: (v) => `超越过去 ${v} 次`, desc: (v) => `在时光胶囊中比最初答题速度更快 ${v} 次` },
    grew: { title: '见证成长', name: (v) => `突破进步 ${v} 次`, desc: (v) => `在结算中触发“你进步啦！”记录 ${v} 次` },
    items: { title: '外观收集', name: (v) => `收集外观 ${v} 个`, desc: (v) => `在宝物库中解锁收集 ${v} 种外观` },
    catComplete: { title: '分类大圆满', name: (v) => `集齐 ${v} 大类`, desc: (v) => `完全集齐 ${v} 个外观分类的全部物品` },
  },
  en: {
    days: { title: 'Days Played', name: (v) => `${v} Days`, desc: (v) => `Play on ${v} different days` },
    streak: { title: 'Daily Streak', name: (v) => `${v}-Day Streak`, desc: (v) => `Play ${v} consecutive days` },
    stickers: { title: 'Calendar Stamps', name: (v) => `${v} Stamps`, desc: (v) => `Collect ${v} calendar stamps` },
    crowns: { title: 'Perfect Crowns', name: (v) => `${v} Crowns`, desc: (v) => `Collect ${v} 100-pt crowns on the calendar` },
    plays: { title: 'Sessions Played', name: (v) => `${v} Sessions`, desc: (v) => `Finish ${v} play sessions` },
    minutes: { title: 'Total Time', name: (v) => `${v} Minutes`, desc: (v) => `Play for a total of ${v} minutes` },
    problems: { title: 'Problems Solved', name: (v) => `${v} Problems`, desc: (v) => `Solve ${v} problems correctly` },
    cells: { title: 'Cells Filled', name: (v) => `${v} Cells`, desc: (v) => `Fill ${v} math digits correctly` },
    unlocked: { title: 'Skills Unlocked', name: (v) => `${v} Skills`, desc: (v) => `Unlock ${v} skills in the tree` },
    mastered: { title: 'Skills Mastered', name: (v) => `${v} Mastered`, desc: (v) => `Master ${v} skills in the tree` },
    extras: { title: 'Extra Stages', name: (v) => `${v} Extras`, desc: (v) => `Reach the Extra stage ${v} times` },
    extraBest: { title: 'Best Extra Run', name: (v) => `${v} in Extra`, desc: (v) => `Solve ${v} problems in a single Extra stage` },
    extraSolved: { title: 'Total Extra Solved', name: (v) => `${v} Extra Total`, desc: (v) => `Solve ${v} problems across all Extra stages` },
    combo: { title: 'Combos', name: (v) => `${v} Combo`, desc: (v) => `Reach a ${v} combo streak` },
    perfects: { title: 'Perfect 100s', name: (v) => `${v} Perfect 100s`, desc: (v) => `Score 100 on first try ${v} times` },
    firstTry: { title: 'First-Try Answers', name: (v) => `${v} First-Try`, desc: (v) => `Answer ${v} problems correctly on the first try` },
    bestDopa: { title: 'Dopa Record', name: (v) => `Dopa ${v}`, desc: (v) => `Reach ${v} Dopa energy in one session` },
    review: { title: 'Review Solved', name: (v) => `${v} Reviewed`, desc: (v) => `Solve ${v} mistakes in Review mode` },
    questDays: { title: 'Quests Completed', name: (v) => `${v} Quest Days`, desc: (v) => `Complete all 3 daily quests on ${v} days` },
    questRun: { title: 'Quest Streak', name: (v) => `${v}-Day Quest Streak`, desc: (v) => `Clear all daily quests for ${v} consecutive days` },
    hammer: { title: 'Hammer Used', name: (v) => (v === 1 ? 'First Hammer' : `${v} Hammers`), desc: (v) => `Use a No-Count Hammer ${v} times` },
    starsTotal: { title: 'Total Stars', name: (v) => `${v} Stars`, desc: (v) => `Earn a total of ${v} stars in the skill tree` },
    star5: { title: '5-Star Skills', name: (v) => `${v} 5-Star Skills`, desc: (v) => `Raise ${v} skills to ☆5` },
    gradeStar3: { title: 'All Grade ☆3', name: (g) => `Grade ${g} all ☆3`, desc: (g) => `Reach ☆3 or higher on all Grade ${g} skills` },
    gradeDone: { title: 'Grade Mastered', name: (g) => `Grade ${g} Mastered`, desc: (g) => `Master all skills in Grade ${g}` },
    gradePlays: { title: 'Grade Practice', name: (g) => `Grade ${g} Practice`, desc: (g, v) => `Play ${v} sessions in Grade ${g}` },
    laneDone: { title: 'Lane Mastered', name: (idx) => `${LANES_I18N.en[idx]} Mastered`, desc: (idx) => `Master all skills in ${LANES_I18N.en[idx]}` },
    polished: { title: 'Skills Polished', name: (v) => `${v} Polished`, desc: (v) => `Polish a rusty skill ${v} times` },
    capsules: { title: 'Time Capsules', name: (v) => `${v} Capsules`, desc: (v) => `Open ${v} time capsules` },
    capsuleFaster: { title: 'Beating the Past', name: (v) => `${v} Times Faster`, desc: (v) => `Beat your past time in a time capsule ${v} times` },
    grew: { title: 'Milestones Reached', name: (v) => `${v} Growth Hits`, desc: (v) => `Trigger the "Look at you grow!" card ${v} times` },
    items: { title: 'Collection Items', name: (v) => `${v} Items`, desc: (v) => `Collect ${v} cosmetic items` },
    catComplete: { title: 'Categories Done', name: (v) => `${v} Categories`, desc: (v) => `Collect every item in ${v} cosmetic categories` },
  }
};

export const SECRET_TROPHIES_I18N = {
  zh: {
    'secret-perfect14': { name: '14题满分全对', desc: '在14题模式中零失误完美通关' },
    'secret-extraClean': { name: '加时挑战无懈可击', desc: '在挑战阶段答对5题以上且零失误' },
    'secret-sunday': { name: '星期天的数学', desc: '在周日开启数学速算练习' },
    'secret-newyear': { name: '新年第一练', desc: '在1月1日元旦游玩' },
    'secret-comeback': { name: '欢迎回来！', desc: '间隔一周以上重新回归游戏' },
    'secret-allmodes': { name: '全能玩家', desc: '完整体验过个性化、年级、专项与复习全部模式' },
  },
  en: {
    'secret-perfect14': { name: '14-Problem Perfect', desc: 'Clear a 14-problem set with zero misses' },
    'secret-extraClean': { name: 'Flawless Extra', desc: 'Solve 5+ problems in Extra with zero misses' },
    'secret-sunday': { name: 'Sunday Math', desc: 'Play on a Sunday' },
    'secret-newyear': { name: 'New Year Practice', desc: 'Play on January 1st' },
    'secret-comeback': { name: 'Welcome Back!', desc: 'Play again after taking a week or more off' },
    'secret-allmodes': { name: 'All Modes Explorer', desc: 'Play My Level, Grades, Practice, and Review' },
  }
};

// ---------------------------------------------------------------- Unlocks Translation
export const UNLOCK_CATS_I18N = {
  zh: {
    bg: '背景主题',
    mark: '正确印记',
    particle: '碎彩纸特效',
    music: '游戏音乐',
    costume: '角色装扮',
    color: '多帕吉体色',
    crowd: '观众小人',
    finale: '终场演出',
  },
  ja: {
    bg: 'はいけい',
    mark: 'せいかいの しるし',
    particle: 'かみふぶき',
    music: 'おんがく',
    costume: 'きせかえ',
    color: 'ドパキチの いろ',
    crowd: 'おきゃくさん',
    finale: 'フィナーレ',
  },
  en: {
    bg: 'Background',
    mark: 'Correct Stamp',
    particle: 'Confetti',
    music: 'Music',
    costume: 'Costume',
    color: "Dopakichi's Color",
    crowd: 'Crowd',
    finale: 'Finale',
  }
};

export const UNLOCK_ITEMS_I18N = {
  zh: {
    'bg:classic': '动感光芒',
    'mark:hanamaru': '樱花红圈',
    'particle:classic': '碎彩纸',
    'music:classic': '马林巴进行曲',
    'costume:none': '原版无装扮',
    'color:pink': '经典粉',
    'crowd:classic': '缤纷观众',
    'finale:classic': '巨大多帕吉',
    'costume:cap': '棒球帽',
    'particle:note': '欢乐音符',
    'mark:stamp': '正确印章',
    'bg:night': '宁静夜空',
    'color:blue': '清新蓝',
    'finale:fireworks': '盛大烟花秀',
    'music:chip': '8-bit 复古电子',
    'crowd:costume': '盛装观众',
    'bg:sea': '海底气泡',
    'bg:festival': '庙会祭典',
    'bg:paper': '折纸手作',
    'bg:space': '浩瀚宇宙',
    'mark:medal': '闪耀奖章',
    'mark:crown': '胜利王冠',
    'mark:ring': '烟花之环',
    'particle:petal': '飞舞花瓣',
    'particle:digit': '跃动数字',
    'particle:bubble': '梦幻泡泡',
    'particle:candy': '甜蜜糖果',
    'music:matsuri': '祭典伴奏',
    'music:brass': '铜管管乐队',
    'music:electro': '流行电音',
    'costume:hachimaki': '必胜头巾',
    'costume:cape': '英雄披风',
    'costume:glasses': '圆框眼镜',
    'costume:ribbon': '蝴蝶结发带',
    'costume:crown': '迷你皇冠',
    'costume:wizard': '魔法师尖帽',
    'costume:headphones': '潮流耳机',
    'color:mint': '薄荷绿',
    'color:snow': '纯净雪白',
    'color:yellow': '活力黄',
    'color:violet': '梦幻紫',
    'color:gold': '闪耀金',
    'color:rainbow': '幻彩霓虹',
    'crowd:rainbow': '彩虹观众',
    'crowd:twins': '孪生同款观众',
    'finale:parade': '狂欢大游行',
    'finale:rocket': '飞天小火箭',
  },
  en: {
    'bg:classic': 'Sunburst',
    'mark:hanamaru': 'Hanamaru Flower',
    'particle:classic': 'Confetti',
    'music:classic': 'Marimba March',
    'costume:none': 'None',
    'color:pink': 'Pink',
    'crowd:classic': 'Colorful Crowd',
    'finale:classic': 'Giant Dopakichi',
    'costume:cap': 'Baseball Cap',
    'particle:note': 'Musical Notes',
    'mark:stamp': 'Stamp of Approval',
    'bg:night': 'Night Sky',
    'color:blue': 'Sky Blue',
    'finale:fireworks': 'Grand Fireworks',
    'music:chip': '8-Bit Chiptune',
    'crowd:costume': 'Costumed Crowd',
    'bg:sea': 'Ocean Bubbles',
    'bg:festival': 'Festival Lanterns',
    'bg:paper': 'Origami Paper',
    'bg:space': 'Deep Space',
    'mark:medal': 'Gold Medal',
    'mark:crown': 'Victory Crown',
    'mark:ring': 'Sparkler Ring',
    'particle:petal': 'Flower Petals',
    'particle:digit': 'Bouncing Numbers',
    'particle:bubble': 'Soap Bubbles',
    'particle:candy': 'Sweet Candies',
    'music:matsuri': 'Festival Drums',
    'music:brass': 'Brass Band',
    'music:electro': 'Electro Pop',
    'costume:hachimaki': 'Headband',
    'costume:cape': 'Hero Cape',
    'costume:glasses': 'Round Glasses',
    'costume:ribbon': 'Cute Ribbon',
    'costume:crown': 'Royal Crown',
    'costume:wizard': 'Wizard Hat',
    'costume:headphones': 'DJ Headphones',
    'color:mint': 'Mint Green',
    'color:snow': 'Snow White',
    'color:yellow': 'Sunny Yellow',
    'color:violet': 'Magic Violet',
    'color:gold': 'Shining Gold',
    'color:rainbow': 'Rainbow Glow',
    'crowd:rainbow': 'Rainbow Crowd',
    'crowd:twins': 'Twin Crowd',
    'finale:parade': 'Festive Parade',
    'finale:rocket': 'Space Rocket',
  }
};

// ---------------------------------------------------------------- Helper Functions
export function t(key, params = {}) {
  const dict = STRINGS[currentLang] || STRINGS.zh;
  let str = dict[key] ?? (STRINGS.ja[key] || key);
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return str;
}

export function skillName(id) {
  if (currentLang === 'ja') return null; // fallback to native sk.name
  const dict = SKILL_NAMES[currentLang];
  return dict ? dict[id] : null;
}

export function laneName(idx) {
  const lanes = LANES_I18N[currentLang] || LANES_I18N.zh;
  return lanes[idx] || '';
}

export function trophyCatName(cat) {
  const dict = CATS_I18N[currentLang] || CATS_I18N.zh;
  return dict[cat] || cat;
}

export function rankName(rank) {
  const dict = RANK_NAME_I18N[currentLang] || RANK_NAME_I18N.zh;
  return dict[rank] || rank;
}

export function unlockCatName(catKey) {
  const dict = UNLOCK_CATS_I18N[currentLang] || UNLOCK_CATS_I18N.zh;
  return dict[catKey] || catKey;
}

export function unlockItemName(id) {
  if (currentLang === 'ja') return null;
  const dict = UNLOCK_ITEMS_I18N[currentLang];
  return dict ? dict[id] : null;
}

export function trophySeriesInfo(key) {
  const dict = TROPHY_SERIES_I18N[currentLang];
  return dict ? dict[key] : null;
}

export function secretTrophyInfo(id) {
  const dict = SECRET_TROPHIES_I18N[currentLang];
  return dict ? dict[id] : null;
}

export function trophySeriesTitle(seriesKey, fallbackTitle) {
  if (currentLang === 'ja' || !seriesKey) return fallbackTitle;
  const lang = currentLang === 'en' ? 'en' : 'zh';
  const dict = TROPHY_SERIES_I18N[lang] || TROPHY_SERIES_I18N.zh;
  if (!dict) return fallbackTitle;
  const gm = /^grade([1-6])$/.exec(seriesKey);
  if (gm) {
    const g = gm[1];
    return lang === 'zh' ? `${g}年级练习` : `Grade ${g} Practice`;
  }
  if (seriesKey === 'dopa' && dict.dopa) return dict.dopa.title;
  if (seriesKey === 'dopa' && dict.bestDopa) return dict.bestDopa.title;
  if (dict[seriesKey] && dict[seriesKey].title) return dict[seriesKey].title;
  return fallbackTitle;
}

export function trophyItemI18n(item) {
  if (!item) return { name: '', desc: '' };
  if (currentLang === 'ja') return { name: item.name, desc: item.desc };

  const lang = currentLang === 'en' ? 'en' : 'zh';
  const id = item.id || '';
  const seriesKey = item.series || '';
  const need = item.need;

  // 1. Secrets
  if (id.startsWith('secret-')) {
    const sdict = SECRET_TROPHIES_I18N[lang] || {};
    if (sdict[id]) return sdict[id];
  }

  // 2. Grade Done
  const gDone = /^gradeDone-([1-6])$/.exec(id);
  if (gDone) {
    const g = gDone[1];
    return lang === 'zh'
      ? { name: `${g}年级大圆满`, desc: `彻底掌握${g}年级的所有技能` }
      : { name: `Grade ${g} Mastered`, desc: `Master all skills in Grade ${g}` };
  }

  // 3. Grade Star 3
  const gStar = /^gradeStar3-([1-6])$/.exec(id);
  if (gStar) {
    const g = gStar[1];
    return lang === 'zh'
      ? { name: `${g}年级全达☆3`, desc: `将${g}年级所有技能全部升至☆3及以上` }
      : { name: `Grade ${g} all ☆3`, desc: `Reach ☆3 or higher on all Grade ${g} skills` };
  }

  // 4. Lane Done
  const lDone = /^laneDone-([0-3])$/.exec(id);
  if (lDone) {
    const idx = Number(lDone[1]);
    const lName = (LANES_I18N[lang] && LANES_I18N[lang][idx]) || `分类${idx}`;
    return lang === 'zh'
      ? { name: `「${lName}」全掌握`, desc: `彻底掌握“${lName}”分类下的全部技能` }
      : { name: `${lName} Mastered`, desc: `Master all skills in ${lName}` };
  }

  // 5. Grade 1 ~ 6 Plays
  const gPlay = /^grade([1-6])$/.exec(seriesKey);
  if (gPlay) {
    const g = gPlay[1];
    return lang === 'zh'
      ? { name: `${g}年级 ${need} 轮`, desc: `在「${g}年级」分册中游玩 ${need} 轮` }
      : { name: `Grade ${g} (${need} Sessions)`, desc: `Play ${need} sessions in Grade ${g}` };
  }

  // 6. Dopa
  if (seriesKey === 'dopa') {
    const dLabel = (lang === 'zh' ? DOPA_LABELS_ZH[need] : DOPA_LABELS_EN[need]) || String(need);
    return lang === 'zh'
      ? { name: `${dLabel}多帕`, desc: `单场比赛中多帕能量达到 ${dLabel}` }
      : { name: `${dLabel} Dopa`, desc: `Reach ${dLabel} Dopa energy in one session` };
  }

  // 7. General Series
  const dict = TROPHY_SERIES_I18N[lang] || {};
  const sdict = dict[seriesKey] || (seriesKey === 'dopa' ? dict.bestDopa : null);
  if (sdict) {
    const name = typeof sdict.name === 'function' ? sdict.name(need) : sdict.name;
    const desc = typeof sdict.desc === 'function' ? sdict.desc(need) : sdict.desc;
    if (name && desc) return { name, desc };
  }

  return { name: item.name, desc: item.desc };
}

export function trophyItemName(item) {
  return trophyItemI18n(item).name;
}

export function trophyItemDesc(item) {
  return trophyItemI18n(item).desc;
}

export function questTextI18n(q, fallbackText) {
  if (currentLang === 'ja') return fallbackText;
  if (!q) return '';
  if (currentLang === 'zh') {
    switch (q.id) {
      case 'play1': return '游玩 1 轮算术练习';
      case 'play2': return '游玩 2 轮算术练习';
      case 'combo5': return '达成 5 连击';
      case 'combo20': return '达成 20 连击';
      case 'first5': return '初次正解 5 道题';
      case 'review1': return '复习攻克 1 道错题';
      case 'new1': return '学习 1 道新技能题目';
      case 'extra': return '进入加时挑战关卡';
      case 'extra5': return '在加时挑战中答对 5 题';
      case 'grade1': return '在年级分册中游玩 1 轮';
      case 'learn10': return '练习中的技能答对 10 题';
      case 'polish': return `擦亮生疏技能「${skillName(q.skill) || ''}」（答对3题）`;
      default: return fallbackText;
    }
  }
  if (currentLang === 'en') {
    switch (q.id) {
      case 'play1': return 'Play 1 session';
      case 'play2': return 'Play 2 sessions';
      case 'combo5': return 'Reach a 5 combo';
      case 'combo20': return 'Reach a 20 combo';
      case 'first5': return 'Answer 5 problems on first try';
      case 'review1': return 'Review 1 mistake';
      case 'new1': return 'Solve 1 problem of a NEW skill';
      case 'extra': return 'Reach the Extra stage';
      case 'extra5': return 'Solve 5 problems in Extra stage';
      case 'grade1': return 'Play 1 session by grade';
      case 'learn10': return 'Solve 10 problems of learning skills';
      case 'polish': return `Polish rusty skill "${skillName(q.skill) || ''}" (3 problems)`;
      default: return fallbackText;
    }
  }
  return fallbackText;
}

export function problemTitle(jaTitle) {
  if (currentLang === 'ja' || !jaTitle) return jaTitle;
  const dictZh = {
    'わりざん': '除法',
    'あまりのあるわりざん': '有余数的除法',
    '小数のたしざん': '小数加法',
    '小数のひきざん': '小数减法',
    '小数のかけざん': '小数乘法',
    '小数のわりざん': '小数除法',
    'たしざん': '加法',
    'ひきざん': '减法',
    '3つのかず': '连加连减',
    'かけざん': '乘法',
    'ぶんすう': '分数',
    '最大公約数': '最大公因数',
    '最小公倍数': '最小公倍数',
    'けいさんのきまり': '运算顺序',
    'がい数': '近似数',
    '百分率': '百分数',
    'ひ': '比例',
    'xをもとめる': '解方程',
    '約分': '约分',
    '分数のたしひき': '分数加减法',
    '分数と整数': '分数与整数运算',
    '分数のかけざん': '分数乘法',
    '分数のわりざん': '分数除法',
    '小数と分数': '小数与分数运算',
    'いくつといくつ': '数的分解与组成',
  };
  const dictEn = {
    'わりざん': 'Division',
    'あまりのあるわりざん': 'Division with Remainder',
    '小数のたしざん': 'Decimal Addition',
    '小数のひきざん': 'Decimal Subtraction',
    '小数のかけざん': 'Decimal Multiplication',
    '小数のわりざん': 'Decimal Division',
    'たしざん': 'Addition',
    'ひきざん': 'Subtraction',
    '3つのかず': '3 Numbers',
    'かけざん': 'Multiplication',
    'ぶんすう': 'Fractions',
    '最大公約数': 'Greatest Common Divisor',
    '最小公倍数': 'Least Common Multiple',
    'けいさんのきまり': 'Order of Operations',
    'がい数': 'Rounding',
    '百分率': 'Percentages',
    'ひ': 'Ratios',
    'xをもとめる': 'Solve for x',
    '約分': 'Simplifying Fractions',
    '分数のたしひき': 'Fraction Add & Sub',
    '分数と整数': 'Fractions & Integers',
    '分数のかけざん': 'Fraction Multiplication',
    '分数のわりざん': 'Fraction Division',
    '小数と分数': 'Decimals & Fractions',
    'いくつといくつ': 'Making Numbers',
  };
  const d = currentLang === 'en' ? dictEn : dictZh;
  return d[jaTitle] || jaTitle;
}

export function stepLabel(jaLabel) {
  if (currentLang === 'ja' || !jaLabel) return jaLabel;
  const isEn = currentLang === 'en';
  const dictZh = {
    '一の位': '个位',
    '十の位': '十位',
    '百の位': '百位',
    '千の位': '千位',
    '万の位': '万位',
    '十万の位': '十万位',
    '小数第一位': '十分位',
    '小数第二位': '百分位',
    '小数第三位': '千分位',
    '整数の部分': '整数部分',
    '分子': '分子',
    '分母': '分母',
    '商': '商',
    'あまり': '余数',
    'こたえ': '答案',
    'くりあがり': '进位',
    'くりさがり': '退位',
    'ひいた のこり': '相减求差',
  };
  const dictEn = {
    '一の位': 'Ones',
    '十の位': 'Tens',
    '百の位': 'Hundreds',
    '千の位': 'Thousands',
    '万の位': 'Ten Thousands',
    '十万の位': 'Hundred Thousands',
    '小数第一位': 'Tenths',
    '小数第二位': 'Hundredths',
    '小数第三位': 'Thousandths',
    '整数の部分': 'Whole number',
    '分子': 'Numerator',
    '分母': 'Denominator',
    '商': 'Quotient',
    'あまり': 'Remainder',
    'こたえ': 'Answer',
    'くりあがり': 'Carry',
    'くりさがり': 'Borrow',
    'ひいた のこり': 'Subtract',
  };
  const d = isEn ? dictEn : dictZh;
  if (d[jaLabel]) return d[jaLabel];

  // 动态模式 1: `${factor}をかける`，如 "2をかける"
  const mMul = /^(\d+)をかける$/.exec(jaLabel);
  if (mMul) {
    return isEn ? `Multiply by ${mMul[1]}` : `乘以 ${mMul[1]}`;
  }

  // 动态模式 2: `たす（${PLACE[i]}）`，如 "たす（一の位）"
  const mAdd = /^たす（(.+)）$/.exec(jaLabel);
  if (mAdd) {
    const sub = d[mAdd[1]] || mAdd[1];
    return isEn ? `Add (${sub})` : `相加（${sub}）`;
  }

  // 动态模式 3: `商の${PLACE[cols - 1 - col]}`，如 "商の一の位"
  const mQuot = /^商の(.+)$/.exec(jaLabel);
  if (mQuot) {
    const sub = d[mQuot[1]] || mQuot[1];
    return isEn ? `Quotient ${sub}` : `商的${sub}`;
  }

  return jaLabel;
}

export function formatDopaValue(L) {
  const v = Math.round(10 ** L);
  if (currentLang === 'en') {
    if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
    return String(v);
  }
  if (currentLang === 'zh') {
    if (v >= 1e8) return `${Math.round(v / 1e8)}亿`;
    if (v >= 1e4) return `${Math.round(v / 1e4)}万`;
    return String(v);
  }
  // ja default
  if (v >= 1e8) return `${Math.round(v / 1e8)}億`;
  if (v >= 1e4) return `${Math.round(v / 1e4)}万`;
  return String(v);
}

export function nextStarI18n(next) {
  if (!next) return null;
  if (currentLang === 'ja') return next;
  const { n, text, now } = next;
  if (currentLang === 'zh') {
    let zhText = text;
    let zhNow = now;
    if (n === 2) {
      zhText = text.replace(/さいきん\s*(\d+)もんの\s*初回正解が\s*(\d+)%\s*いじょう/, '最近 $1 题初次正解率达 $2% 以上');
      zhNow = now.replace(/いま\s*(\d+)もん・(\d+)%/, '当前 $1 题·$2%');
    } else if (n === 3) {
      zhText = text.replace(/1もんを\s*だいたい\s*([\d.]+)びょう\s*いないで\s*とく/, '每题平均在 $1 秒内解答完毕');
      zhNow = now.replace(/いま\s*(\d+)もん/, '当前已答 $1 题')
        .replace(/いま\s*([\d.]+)びょう（(\d+)\/(\d+)もん）/, '当前 $1 秒（已答 $2/$3 题）');
    } else if (n === 4) {
      zhText = text.replace(/☆3から\s*(\d+)日\s*たってから、(\d+)もん\s*つづけて\s*初回正解/, '达到 ☆3 后满 $1 天，且连续 $2 题初次答对');
      zhNow = now.replace(/あと\s*(\d+)日\s*まってね/, '还需等待 $1 天')
        .replace(/きょうから\s*ちょうせん\s*できるよ/, '今天即可开始挑战！');
    } else if (n === 5) {
      zhText = text.replace(/さいきん\s*(\d+)もんの\s*初回正解が\s*(\d+)%\s*いじょうで、1もん\s*([\d.]+)びょう\s*いない/, '最近 $1 题初次正解率达 $2% 以上，且每题在 $3 秒以内');
      zhNow = now.replace(/いま\s*(\d+)%・([\d.]+)びょう/, '当前 $1%·$2 秒')
        .replace(/いま\s*(\d+)%/, '当前 $1%');
    }
    return { n, text: zhText, now: zhNow };
  }
  if (currentLang === 'en') {
    let enText = text;
    let enNow = now;
    if (n === 2) {
      enText = text.replace(/さいきん\s*(\d+)もんの\s*初回正解が\s*(\d+)%\s*いじょう/, 'First-try rate >= $2% on last $1 problems');
      enNow = now.replace(/いま\s*(\d+)もん・(\d+)%/, 'Now: $1 problems, $2%');
    } else if (n === 3) {
      enText = text.replace(/1もんを\s*だいたい\s*([\d.]+)びょう\s*いないで\s*とく/, 'Solve each problem within ~$1s');
      enNow = now.replace(/いま\s*(\d+)もん/, 'Now: $1 problems')
        .replace(/いま\s*([\d.]+)びょう（(\d+)\/(\d+)もん）/, 'Now: $1s ($2/$3 problems)');
    } else if (n === 4) {
      enText = text.replace(/☆3から\s*(\d+)日\s*たってから、(\d+)もん\s*つづけて\s*初回正解/, '$1 days after ☆3, get $2 first-try answers in a row');
      enNow = now.replace(/あと\s*(\d+)日\s*まってね/, '$1 more day(s) to wait')
        .replace(/きょうから\s*ちょうせん\s*できるよ/, 'Ready to challenge today!');
    } else if (n === 5) {
      enText = text.replace(/さいきん\s*(\d+)もんの\s*初回正解が\s*(\d+)%\s*いじょうで、1もん\s*([\d.]+)びょう\s*いない/, 'Last $1 problems: first-try >= $2% and under $3s each');
      enNow = now.replace(/いま\s*(\d+)%・([\d.]+)びょう/, 'Now: $1% · $2s')
        .replace(/いま\s*(\d+)%/, 'Now: $1%');
    }
    return { n, text: enText, now: enNow };
  }
  return next;
}

export function monthYearText(y, m) {
  if (currentLang === 'zh') return `${y}年${m + 1}月`;
  if (currentLang === 'en') {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[m]} ${y}`;
  }
  return `${y}年${m + 1}月`;
}

export function dayKeyFormat(d) {
  if (currentLang === 'zh') return `${d}日`;
  if (currentLang === 'en') return `${d}`;
  return `${d}日`;
}

export function dayLogTitleText(m, d) {
  if (currentLang === 'zh') return `${m}月${d}日的练习记录`;
  if (currentLang === 'en') return `Records for ${m}/${d}`;
  return `${m}月${d}日のきろく`;
}

export function cellTextI18n(text, lang = currentLang) {
  if (!text || lang === 'ja') return text;
  if (lang === 'zh') {
    if (text === 'は') return '分成';
    if (text === 'と') return '和';
    if (text === 'の') return '的';
    if (text === 'あまり') return '余';
    if (text === '最大公約数') return '最大公因数';
    if (text === '最小公倍数') return '最小公倍数';
    if (text === 'を') return '精确到';
    const m = /^([一十百千万]+)の位まで$/.exec(text);
    if (m) {
      const pl = m[1] === '一' ? '个' : m[1];
      return `${pl}位`;
    }
  } else if (lang === 'en') {
    if (text === 'は') return 'is';
    if (text === 'と') return 'and';
    if (text === 'の') return 'of';
    if (text === 'あまり') return 'R';
    if (text === '最大公約数') return 'GCD';
    if (text === '最小公倍数') return 'LCM';
    if (text === 'を') return 'rounded to';
    const m = /^([一十百千万]+)の位まで$/.exec(text);
    if (m) {
      const pl = m[1] === '一' ? 'ones' : m[1] === '十' ? 'tens' : m[1] === '百' ? 'hundreds' : m[1] === '千' ? 'thousands' : 'ten-thousands';
      return `${pl} place`;
    }
  }
  return text;
}

export function stepHint(jaHint) {
  if (currentLang === 'ja' || !jaHint) return jaHint;
  const isEn = currentLang === 'en';
  const m = /^(\d+)の中に(\d+)はいくつ$/.exec(jaHint);
  if (m) {
    return isEn ? `How many ${m[2]}s in ${m[1]}?` : `${m[1]} 里面有几个 ${m[2]}？`;
  }
  return jaHint;
}

export function problemHelpText(jaText) {
  if (currentLang === 'ja' || !jaText) return jaText;
  const isEn = currentLang === 'en';

  if (jaText === 'どちらも わりきれる 数') {
    return isEn ? 'Common factor: divides both' : '公因数：都能整除的数';
  }
  if (jaText === '分母どうし・分子どうしをかける') {
    return isEn ? 'Multiply numerators & denominators' : '分子与分子相乘，分母与分母相乘';
  }
  if (jaText === 'くりあがりの 1') {
    return isEn ? 'Carry 1' : '进位的 1';
  }

  let m;
  if ((m = /^くりあがりの\s*(\d+)$/.exec(jaText))) {
    return isEn ? `Carry ${m[1]}` : `进位的 ${m[1]}`;
  }
  if ((m = /^(\d+)のだん\s*(.*)$/.exec(jaText))) {
    return isEn ? `${m[1]} times table: ${m[2]}` : `${m[1]}的倍数: ${m[2]}`;
  }
  if ((m = /^(\d+)に\s*いくつで\s*(\d+)$/.exec(jaText))) {
    return isEn ? `${m[1]} + ? = ${m[2]}` : `${m[1]} 加上几等于 ${m[2]}`;
  }
  if ((m = /^(\d+)に\s*(\d+)で\s*10$/.exec(jaText))) {
    return isEn ? `Make 10: ${m[1]} + ${m[2]}` : `${m[1]} 凑十差 ${m[2]}`;
  }
  if ((m = /^まず\s*(.+)$/.exec(jaText))) {
    return isEn ? `First ${m[1]}` : `先算 ${m[1]}`;
  }
  if ((m = /^先に\s*(.+)$/.exec(jaText))) {
    return isEn ? `First ${m[1]}` : `先算 ${m[1]}`;
  }
  if ((m = /^(.+)の\s*10こぶん$/.exec(jaText))) {
    return isEn ? `10 times of ${m[1]}` : `${m[1]} 的 10 倍`;
  }
  if ((m = /^(\d+)を\s*(\d+)つに\s*わける$/.exec(jaText))) {
    return isEn ? `Divide ${m[1]} into ${m[2]} parts` : `把 ${m[1]} 平均分成 ${m[2]} 份`;
  }
  if ((m = /^(.+)\s*と\s*(.+)$/.exec(jaText))) {
    return isEn ? `${m[1]} and ${m[2]}` : `${m[1]} 和 ${m[2]}`;
  }
  if ((m = /^(.+)\s*を\s*考える$/.exec(jaText))) {
    return isEn ? `Think about ${m[1]}` : `先思考 ${m[1]}`;
  }
  if ((m = /^(.+)\s*と\s*同じ$/.exec(jaText))) {
    return isEn ? `Same as ${m[1]}` : `相当于 ${m[1]}`;
  }
  if ((m = /^(\d+)のばいすう$/.exec(jaText))) {
    return isEn ? `Multiples of ${m[1]}` : `找 ${m[1]} 的倍数`;
  }
  if ((m = /^([一十百千万]+)の位を\s*四捨五入$/.exec(jaText))) {
    const plZh = m[1] === '一' ? '个' : m[1];
    const plEn = m[1] === '一' ? 'ones' : m[1] === '十' ? 'tens' : 'hundreds';
    return isEn ? `Round at ${plEn} place` : `对${plZh}位四舍五入`;
  }
  if ((m = /^(\d+)ばい$/.exec(jaText))) {
    return isEn ? `× ${m[1]}` : `${m[1]} 倍`;
  }
  if ((m = /^(\d+)で\s*わる$/.exec(jaText))) {
    return isEn ? `Divide by ${m[1]}` : `除以 ${m[1]}`;
  }
  if ((m = /^分母は\s*(.+)\s*のまま$/.exec(jaText))) {
    return isEn ? `Keep denominator ${m[1]}` : `分母保持 ${m[1]} 不变`;
  }
  if ((m = /^通分すると\s*分母は\s*(.+)$/.exec(jaText))) {
    return isEn ? `Common denominator is ${m[1]}` : `通分公分母为 ${m[1]}`;
  }
  if ((m = /^分子に\s*(.+)\s*をかける$/.exec(jaText))) {
    return isEn ? `Multiply numerator by ${m[1]}` : `分子乘以 ${m[1]}`;
  }
  if ((m = /^分母に\s*(.+)\s*をかける$/.exec(jaText))) {
    return isEn ? `Multiply denominator by ${m[1]}` : `分母乘以 ${m[1]}`;
  }
  if ((m = /^(.+)\s*を\s*ひっくりかえして\s*かける$/.exec(jaText))) {
    return isEn ? `Invert ${m[1]} and multiply` : `把 ${m[1]} 颠倒过来相乘`;
  }

  return jaText;
}

export function answerTextI18n(text, lang = currentLang) {
  if (!text || lang === 'ja') return text;
  if (lang === 'zh') {
    return text
      .replace(/あまり/g, ' 余 ')
      .replace(/最大公約数/g, '最大公因数')
      .replace(/最小公倍数/g, '最小公倍数')
      .replace(/(\d+)と(\d+\/\d+)/g, '$1又$2')
      .replace(/(\d+)と(\d+)/g, '$1 和 $2')
      .replace(/の/g, ' 的 ')
      .replace(/を/g, ' 精确到 ')
      .replace(/([一十百千万]+)の位まで/g, '$1位')
      .replace(/\s+/g, ' ')
      .trim();
  }
  if (lang === 'en') {
    return text
      .replace(/あまり/g, ' R ')
      .replace(/最大公約数/g, 'GCD')
      .replace(/最小公倍数/g, 'LCM')
      .replace(/(\d+)と(\d+\/\d+)/g, '$1 and $2')
      .replace(/(\d+)と(\d+)/g, '$1 and $2')
      .replace(/の/g, ' of ')
      .replace(/を/g, ' rounded to ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return text;
}
