function getAudioContext(){try{if(typeof wx!=='undefined'&&typeof wx.createWebAudioContext==='function')return wx.createWebAudioContext()}catch{}return null}
function AudioContext(){const ctx=getAudioContext();if(!ctx)throw new Error('WebAudio unavailable');return ctx}
module.exports={AudioContext,getAudioContext};
