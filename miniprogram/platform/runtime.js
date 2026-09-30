const query={};
const params={get:(k)=>query[k]??null,has:(k)=>Object.prototype.hasOwnProperty.call(query,k)};
const clock={now:()=>Date.now(),raf:(fn)=>setTimeout(()=>fn(Date.now()),16),caf:(id)=>clearTimeout(id)};
function centerOf(target){if(target&&target.left!=null)return{x:target.left+target.width/2,y:target.top+target.height/2,w:target.width,h:target.height};return{x:0,y:0,w:0,h:0}}
function setQuery(q){Object.assign(query,q||{})}
module.exports={clock,params,centerOf,setQuery};
