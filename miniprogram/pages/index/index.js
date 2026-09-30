const store=require('../../utils/store');
const {SKILLS,SKILL,LANES}=require('../../core/skills');
const {makeProblem,makeRng}=require('../../core/problems');
const scoring=require('../../core/scoring');
const quests=require('../../core/quests');
const collection=require('../../core/unlocks');
const seed=()=>((Date.now()^(Math.random()*0xffffffff))>>>0);
function unlocked(sk,progress){return !sk.req.length||sk.req.every(id=>progress[id]&&progress[id].mastered)}
function viewSkills(grade,progress){return SKILLS.filter(s=>s.grade===grade).map(s=>{const p=progress[s.id]||{};return Object.assign({},s,{locked:!unlocked(s,progress),stars:p.stars||0,starText:'★'.repeat(p.stars||0)+'☆'.repeat(5-(p.stars||0)),mastered:!!p.mastered,laneName:LANES[s.lane]})})}
function decorate(p,revealed,active){const after={};(p.steps||[]).slice(0,revealed).forEach(s=>{after[s.cell]=true;(s.after||[]).forEach(id=>after[id]=true)});return (p.cells||[]).map(c=>({id:c.id,text:c.kind==='input'&&!after[c.id]?'':c.text,kind:c.kind,active:c.id===active,hidden:(c.kind==='auto'||c.kind==='carry'||c.kind==='mark')&&!after[c.id],style:'grid-row:'+(c.r+1)+' / span '+(c.rs||1)+';grid-column:'+(c.c+1)+' / span '+(c.cs||1)+';'}))}
Page({
 data:{screen:'home',grades:[1,2,3,4,5,6],grade:1,skills:[],skill:null,problem:null,cells:[],lines:[],step:0,combo:0,score:0,done:0,count:10,feedback:'',hint:'',keys:[1,2,3,4,5,6,7,8,9],stats:{},settings:{},history:[]},
 onLoad(){store.touchDay();this.ensureQuests();this.refresh()},
 refresh(){const s=store.load();this.setData({skills:viewSkills(this.data.grade,s.progress),stats:s.stats,settings:s.settings,count:s.settings.count,history:s.history.slice(-30).reverse(),login:s.login,questList:(s.quests.list||[]).map(q=>Object.assign({},q,{text:quests.questText(q)}))})},
 showHome(){this.setData({screen:'home'});this.refresh()},
 showSkills(){this.setData({screen:'skills'});this.refresh()},
 showHistory(){this.setData({screen:'history'});this.refresh()},
 showSettings(){this.setData({screen:'settings'});this.refresh()},
 showQuests(){this.ensureQuests();this.setData({screen:'quests'});this.refresh()},
 showCollection(){const s=store.load(),got=s.trophies.got||{};this.setData({screen:'collection',collection:collection.ITEMS.map(x=>Object.assign({},x,{owned:collection.isUnlocked(x,got)}))})},
 ensureQuests(){const s=store.load(),ctx={count:s.settings.count,review:0,hasNew:true,hasLearning:true,placed:true,extraOk:false,avgCells:3,rusty:[],polishWeek:0};quests.ensureDay(s.quests,store.dayKey(),ctx);store.write(s)},
 pickGrade(e){const grade=Number(e.currentTarget.dataset.grade),s=store.load();this.setData({grade,skills:viewSkills(grade,s.progress)})},
 pickSkill(e){const id=e.currentTarget.dataset.id,sk=SKILL[id];if(!sk)return;const s=store.load();if(!unlocked(sk,s.progress)){wx.showToast({title:'先完成前置技能',icon:'none'});return}this.start(id)},
 start(id){this.rng=makeRng(seed());this.skillId=id;this.session={score:0,done:0,combo:0,errors:0};this.setData({screen:'play',skill:SKILL[id],score:0,done:0,combo:0});this.next()},
 next(){if(this.session.done>=this.data.count){this.finish();return}const p=makeProblem(this.skillId,this.rng);this.problem=p;this.firstTry=true;this.render(0,'')},
 render(step,feedback){const p=this.problem,cur=p.steps[step];this.setData({problem:p,step,cells:decorate(p,step,cur&&cur.cell),gridStyle:'grid-template-columns:repeat('+Math.max(1,p.cols)+',1fr);grid-template-rows:repeat('+Math.max(1,p.rows)+',64rpx);',feedback,hint:cur?(cur.label||cur.hint||'数字を入力'):'',lines:p.lines||[]})},
 tapKey(e){if(this.locked)return;const d=String(e.currentTarget.dataset.key),p=this.problem,st=p.steps[this.data.step];if(!st)return;if(d===String(st.digit)){const n=this.data.step+1;if(n>=p.steps.length){this.correctProblem()}else{this.render(n,'ok');if(this.data.settings.vibration)wx.vibrateShort({type:'light'})}}else{this.firstTry=false;this.session.errors++;this.setData({feedback:'ng',hint:(st.help&&st.help.text)||'再试行'});if(this.data.settings.vibration)wx.vibrateShort({type:'medium'})}},
 correctProblem(){this.locked=true;const combo=this.session.combo+1,gain=scoring.BASIC_SCORE;this.session.combo=combo;this.session.score+=gain;this.session.done++;store.recordSkill(this.skillId,this.firstTry);const s=store.load();quests.questEvent(s.quests,{type:'solve',firstTry:this.firstTry,skill:this.skillId,skillState:'learning'});quests.questEvent(s.quests,{type:'combo',value:combo});s.stats.problems++;s.stats.cells+=this.problem.steps.length;s.stats.firstTry+=this.firstTry?1:0;s.stats.errors+=this.firstTry?0:1;s.stats.maxCombo=Math.max(s.stats.maxCombo,combo);s.stats.bestScore=Math.max(s.stats.bestScore,this.session.score);store.write(s);this.setData({combo,score:this.session.score,done:this.session.done,feedback:'complete',cells:decorate(this.problem,this.problem.steps.length,'')});if(this.data.settings.vibration)wx.vibrateShort({type:combo>=10?'heavy':'light'});setTimeout(()=>{this.locked=false;this.next()},420)},
 finish(){const s=store.load();quests.questEvent(s.quests,{type:'play',mode:'grade'});s.stats.plays++;store.write(s);store.addHistory({skill:this.skillId,name:SKILL[this.skillId].name,score:this.session.score,count:this.session.done,errors:this.session.errors});this.setData({screen:'result'});this.refresh()},
 changeCount(e){const count=Number(e.currentTarget.dataset.count),s=store.load();s.settings.count=count;store.write(s);this.setData({count,settings:s.settings})},
 toggleSound(){const s=store.load();s.settings.sound=!s.settings.sound;store.write(s);this.setData({settings:s.settings})},
 toggleVibration(){const s=store.load();s.settings.vibration=!s.settings.vibration;store.write(s);this.setData({settings:s.settings})},
 resetAll(){wx.showModal({title:'清除全部记录？',content:'学习进度、历史和设置都会删除，无法恢复。',success:r=>{if(r.confirm){store.reset();this.setData({grade:1});this.showHome()}}})}
});