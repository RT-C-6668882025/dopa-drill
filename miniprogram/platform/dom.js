const viewport=require('./viewport');
const registry=new Map(); let page=null;
function bindPage(p){page=p}
function norm(sel){return String(sel||'').trim()}
class ClassList{constructor(el){this.el=el} _set(){return new Set((this.el.className||'').split(/\s+/).filter(Boolean))} _put(s){this.el.className=[...s].join(' ');this.el.sync('className',this.el.className)} add(...xs){const s=this._set();xs.forEach(x=>s.add(x));this._put(s)} remove(...xs){const s=this._set();xs.forEach(x=>s.delete(x));this._put(s)} toggle(x,force){const s=this._set(),on=force===undefined?!s.has(x):!!force;on?s.add(x):s.delete(x);this._put(s);return on} contains(x){return this._set().has(x)}}
class Style{constructor(el){this.el=el} setProperty(k,v){this[k]=String(v);this.el.syncStyle()}}
class Element{
 constructor(id=''){this.id=id;this.dataset={};this.className='';this.style=new Style(this);this.classList=new ClassList(this);this.children=[];this.hidden=false;this.disabled=false;this.value='';this._text='';this._html='';this._events={}}
 sync(k,v){if(page&&this.id)page.setData({['dom.'+this.id+'.'+k]:v})}
 syncStyle(){if(!page||!this.id)return;const o={};for(const k of Object.keys(this.style))if(k!=='el')o[k]=this.style[k];page.setData({['dom.'+this.id+'.style']:o})}
 set textContent(v){this._text=String(v??'');this.sync('textContent',this._text)} get textContent(){return this._text}
 set innerHTML(v){this._html=String(v??'');this.sync('innerHTML',this._html)} get innerHTML(){return this._html}
 setAttribute(k,v){if(k==='class')this.className=String(v);else if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=String(v);else this[k]=v;this.sync(k,v)}
 getAttribute(k){if(k==='class')return this.className;if(k.startsWith('data-'))return this.dataset[k.slice(5)];return this[k]??null}
 appendChild(x){this.children.push(x);return x} append(...xs){this.children.push(...xs)} replaceChildren(...xs){this.children=xs} remove(){registry.delete(this.id)}
 addEventListener(type,fn){(this._events[type]??=[]).push(fn)} removeEventListener(type,fn){this._events[type]=(this._events[type]||[]).filter(x=>x!==fn)}
 dispatch(type,event={}){for(const fn of this._events[type]||[])fn({...event,currentTarget:this,target:event.target||this})}
 querySelector(sel){return document.querySelector(sel)} querySelectorAll(sel){return document.querySelectorAll(sel)}
 closest(){return this} focus(){} blur(){} scrollIntoView(){}
 getBoundingClientRect(){return this._rect||{left:0,top:0,right:0,bottom:0,width:0,height:0,x:0,y:0}}
}
function get(id){if(!registry.has(id))registry.set(id,new Element(id));return registry.get(id)}
const body=get('__body');
const document={body,documentElement:get('__html'),createElement:(tag)=>new Element(),createElementNS:(ns,tag)=>new Element(),querySelector(sel){sel=norm(sel);if(sel.startsWith('#'))return get(sel.slice(1).split(/[ .:[>]/)[0]);return get(sel)},querySelectorAll(sel){sel=norm(sel);if(sel==='.screen')return ['title','tree','trophy','collect','play','result','final'].map(x=>get('screen-'+x));if(sel==='#pad button')return [];return []}};
const window={devicePixelRatio:viewport.dpr(),get innerWidth(){return viewport.width()},get innerHeight(){return viewport.height()},performance:{now:()=>Date.now()},navigator:{language:'zh-CN'},location:{search:''},requestAnimationFrame:(fn)=>setTimeout(()=>fn(Date.now()),16),cancelAnimationFrame:(id)=>clearTimeout(id),addEventListener(){},removeEventListener(){}};
function setRect(id,r){const e=get(id);e._rect={...r,right:r.right??r.left+r.width,bottom:r.bottom??r.top+r.height,x:r.x??r.left,y:r.y??r.top}}
module.exports={document,window,Element,bindPage,get,setRect};
