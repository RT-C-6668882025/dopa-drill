let info=null;
function sys(){if(info)return info;try{info=wx.getWindowInfo?wx.getWindowInfo():wx.getSystemInfoSync()}catch{info={windowWidth:375,windowHeight:667,pixelRatio:1}}return info}
const width=()=>sys().windowWidth||375;
const height=()=>sys().windowHeight||667;
const dpr=()=>sys().pixelRatio||1;
module.exports={width,height,dpr};
