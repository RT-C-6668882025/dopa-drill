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
 domEvent(e){let id=e.target&&e.target.dataset&&e.target.dataset.domId;if(!id)id=e.currentTarget&&e.currentTarget.dataset&&e.currentTarget.dataset.domId;if(!id)return;const el=dom.get(id);const ds=e.target&&e.target.dataset||{};Object.assign(el.dataset,ds);el.dispatch('click',{detail:e.detail,target:el});},
 measure(){const q=wx.createSelectorQuery().in(this);q.selectAll('[data-dom-id]').boundingClientRect(rs=>{for(const r of rs||[])if(r&&r.id)dom.setRect(r.id,r)}).exec()},
 bindCanvas(){return new Promise(resolve=>{const q=wx.createSelectorQuery().in(this);let left=3;for(const id of ['#fx','#fx-back','#bg'])q.select(id).fields({node:true,size:true},r=>{if(r&&r.node){const el=dom.get(id.slice(1));el.getContext=(...a)=>r.node.getContext(...a);el.width=r.width;el.height=r.height;el.style=el.style||{};el.addEventListener=el.addEventListener||(()=>{});el._node=r.node}if(--left===0)resolve()});q.exec()})}
});
