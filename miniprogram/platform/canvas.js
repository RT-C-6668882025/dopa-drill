function create2D(w=1,h=1){try{if(wx.createOffscreenCanvas){const c=wx.createOffscreenCanvas({type:'2d',width:w,height:h});c.width=w;c.height=h;return c}}catch{}return{width:w,height:h,getContext(){return null}}}
module.exports={create2D};
