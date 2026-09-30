function getItem(key){try{const v=wx.getStorageSync(key);return v===''||v==null?null:String(v)}catch{return null}}
function setItem(key,value){try{wx.setStorageSync(key,String(value))}catch{}}
function removeItem(key){try{wx.removeStorageSync(key)}catch{}}
module.exports={getItem,setItem,removeItem};
