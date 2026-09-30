const svgCanvas=require('../../platform/svg-canvas');
const dom=require('../../platform/dom');
const runtime=require('../../platform/runtime');
Page({
 data:{dom:{}},
 onLoad(options){dom.bindPage(this);dom.hydrate(["paper","rays-fallback","bg","fx-back","app","screen-title","open-settings","open-guide","logo","title-stage","modes","start","level-sub","start-review","review-count","open-tree","tree-badge","open-trophy","trophy-badge","open-collect","collect-badge","quests","quest-title","quest-reward","quest-list","calendar","cal-prev","cal-title","cal-next","cal-badges","cal-week","cal-grid","screen-tree","tree-back","tree-title","tree-count","tree-stars","tree-scroll","tree-lanes","tree","toast","screen-trophy","trophy-back","trophy-title","trophy-count","tr-scroll","tr-list","screen-collect","collect-back","collect-title","collect-count","co-preview","co-mark","co-now","co-tabs","co-scroll","co-note","co-grid","screen-play","pips","clock-label","clock","mute","ok","ok-total","ng","combo-box","combo","combo-mult","combo-bar","dopa-box","dopa","stage","card","qtitle","qno","sheet","step-label","stamp","reach-tag","pad","screen-result","result-title","r-score","r-ok","r-ng","r-rate","r-time","r-dopa","r-growth","r-unlock","r-skills","r-quests","go-extra","go-review","go-tree","go-again","go-title","screen-final","final-title","f-score","f-break","f-ok","f-ng","f-bng","f-time","f-dopa","f-skills","f-quests","f-review","f-tree","again","settings","settings-title","lang-pick","sound-state-text","volume","motion-val","motion","motion-note","demo-play","reset-data","close-settings","bonus","bonus-title","bonus-run","bonus-grid","bonus-note","bonus-ok","skill-info","si-grade","si-title","si-stars","si-next","si-note","si-close","si-go","trophy-got","tg-title","tg-sub","tg-list","tg-ok","hammer","hammer-title","hammer-art","hammer-msg","hammer-have","hammer-no","hammer-yes","confirm","confirm-title","confirm-msg","confirm-list","confirm-no","confirm-yes","day-log","day-title","day-list","close-day","fx","actors","actors-back","actors-front","cutins","flash"]);runtime.setQuery(options||{});this.measure();},
 onReady(){this.bindCanvas().then(()=>{try{require('../../runtime/main')}catch(e){console.error('dopa main boot',e)}})},
 onShow(){this.measure()},
  renderActors(){
    const q=wx.createSelectorQuery().in(this);
    q.select('#actors').fields({node:true,size:true},r=>{
      if(!r||!r.node)return;const info=wx.getWindowInfo?wx.getWindowInfo():wx.getSystemInfoSync(),dpr=info.pixelRatio||1;
      if(r.node.width!==r.width*dpr||r.node.height!==r.height*dpr){r.node.width=r.width*dpr;r.node.height=r.height*dpr}
      const ctx=r.node.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,r.width,r.height);
      const back=dom.tree('actors-back'),front=dom.tree('actors-front');
      for(const n of back)svgCanvas.drawNode(ctx,n);for(const n of front)svgCanvas.drawNode(ctx,n);
    }).exec();
  },
  renderSvgTree(id,tree){
    const q=wx.createSelectorQuery().in(this);
    q.select('[data-svg-id="'+id+'"]').fields({node:true,size:true},r=>{
      if(!r||!r.node)return;
      const info=wx.getWindowInfo?wx.getWindowInfo():wx.getSystemInfoSync();
      const dpr=info.pixelRatio||1;
      r.node.width=r.width*dpr;r.node.height=r.height*dpr;
      const ctx=r.node.getContext('2d');ctx.scale(dpr,dpr);
      svgCanvas.drawTree(ctx,tree,{width:r.width,height:r.height});
    }).exec();
  },
 resolveEl(e){const ds=e.target&&e.target.dataset||e.currentTarget&&e.currentTarget.dataset||{};const id=ds.domId;if(!id)return null;const el=dom.get(id);Object.assign(el.dataset,ds);return el},
  domEvent(e){const el=this.resolveEl(e);if(el)el.dispatch('click',{detail:e.detail,target:el,clientX:e.detail&&e.detail.x,clientY:e.detail&&e.detail.y})},
  domInput(e){const el=this.resolveEl(e);if(!el)return;el.value=e.detail.value;el.dispatch('input',{detail:e.detail,target:el});},
  domChange(e){const el=this.resolveEl(e);if(!el)return;el.value=e.detail.value;el.dispatch('change',{detail:e.detail,target:el});},
  domTouchStart(e){const el=this.resolveEl(e);if(!el)return;const t=e.touches&&e.touches[0]||{};el.dispatch('pointerdown',{target:el,pointerId:t.identifier||1,clientX:t.clientX||0,clientY:t.clientY||0,preventDefault(){}})},
  domTouchMove(e){const el=this.resolveEl(e);if(!el)return;const t=e.touches&&e.touches[0]||{};el.dispatch('pointermove',{target:el,pointerId:t.identifier||1,clientX:t.clientX||0,clientY:t.clientY||0,preventDefault(){}})},
  domTouchEnd(e){const el=this.resolveEl(e);if(el)el.dispatch('pointerup',{target:el,pointerId:1,preventDefault(){}})},
 measure(){const q=wx.createSelectorQuery().in(this);q.selectAll('[data-dom-id]').boundingClientRect(rs=>{for(const r of rs||[])if(r&&r.id)dom.setRect(r.id,r)}).exec()},
 bindCanvas(){return new Promise(resolve=>{const q=wx.createSelectorQuery().in(this);let left=3;for(const id of ['#fx','#fx-back','#bg'])q.select(id).fields({node:true,size:true},r=>{if(r&&r.node){const el=dom.get(id.slice(1));el.getContext=(...a)=>r.node.getContext(...a);el.width=r.width;el.height=r.height;el.style=el.style||{};el.addEventListener=el.addEventListener||(()=>{});el._node=r.node}if(--left===0)resolve()});q.exec()})}
});
