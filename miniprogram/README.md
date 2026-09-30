# Dopa Drill 微信小程序版

这是原 Web 版的原生微信小程序迁移分支，目标不是 web-view 套壳，而是逐步把 UI、存储、音频和舞台系统迁移到微信运行时。

## 当前可运行
- 原生 WXML/WXSS 页面
- 加减乘除答题主循环
- Combo / Score / Dopa 正反馈
- 连击庆祝动画与震动反馈
- 微信本地缓存（wx.getStorageSync / wx.setStorageSync）
- 运算模式切换
- 声音/反馈开关状态持久化

## 打开方式
1. 微信开发者工具 -> 导入项目
2. 选择仓库根目录
3. project.config.json 已将 miniprogramRoot 指向 miniprogram/
4. 当前 appid 使用 touristappid，正式发布前替换为你自己的小程序 AppID

## 下一阶段迁移
Web 版可复用的纯逻辑：problems.js、skills.js、scoring.js、growth.js、quests.js、trophies.js、unlocks.js。
需要微信化重写：main.js（DOM 状态机）、store.js（localStorage）、audio.js（Web Audio API）、bg.js/fx.js/dopakichi.js（DOM/CSS 动画）。

优先顺序：
1. 58 技能题库 + 竖式/分数渲染
2. 技能树与年级模式
3. 错题/历史/签到/任务
4. 奖杯与解锁系统
5. Canvas 2D 舞台、吉祥物和粒子效果
6. 小程序音频实现与资源策略

Web 版继续保留在 app/，两端可以并行维护。
