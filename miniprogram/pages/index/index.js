const svgCanvas=require('../../platform/svg-canvas');
const dom=require('../../platform/dom');
const runtime=require('../../platform/runtime');
Page({
 data:{dom:{}},
 onLoad(options){dom.bindPage(this);runtime.setQuery(options||{});this.measure();},
 onReady(){this.bindCanvas().then(()=>{try{require('../../runtime/main')}catch(e){console.error('dopa main boot',e)}})},
 onShow(){this.measure()},
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
