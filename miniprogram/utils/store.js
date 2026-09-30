const KEY='dopa-drill:wechat:v2';
const defaults={version:2,settings:{count:10,sound:true,vibration:true,motion:1},progress:{},history:[],stats:{plays:0,problems:0,cells:0,firstTry:0,errors:0,maxCombo:0,bestScore:0},equip:{bg:'classic',mark:'hanamaru',particle:'classic',costume:'none',color:'pink'}};
function clone(v){return JSON.parse(JSON.stringify(v))}
function load(){try{const x=wx.getStorageSync(KEY)||{};return Object.assign(clone(defaults),x,{settings:Object.assign({},defaults.settings,x.settings||{}),stats:Object.assign({},defaults.stats,x.stats||{}),progress:x.progress||{},history:x.history||[]})}catch(e){return clone(defaults)}}
function write(s){try{wx.setStorageSync(KEY,s)}catch(e){}return s}
function patch(p){return write(Object.assign(load(),p))}
function skill(id){const s=load();return s.progress[id]||{recent:[],solved:0,stars:0,mastered:false}}
function recordSkill(id,firstTry){const s=load(),p=s.progress[id]||{recent:[],solved:0,stars:0,mastered:false};p.recent.push(!!firstTry);if(p.recent.length>6)p.recent.shift();p.solved++;const good=p.recent.filter(Boolean).length;p.mastered=p.recent.length>=6&&good>=5;p.stars=Math.min(5,Math.max(p.stars,p.mastered?3:good>=4?2:good>=2?1:0));s.progress[id]=p;write(s);return p}
function addHistory(rec){const s=load();s.history.push(Object.assign({at:Date.now()},rec));if(s.history.length>3000)s.history.splice(0,s.history.length-3000);write(s)}
function reset(){try{wx.removeStorageSync(KEY)}catch(e){}}
module.exports={load,write,patch,skill,recordSkill,addHistory,reset};