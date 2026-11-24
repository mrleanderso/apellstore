/* Shared catalogue contract. No network, credentials or browser dependencies. */
(function(root){
'use strict';
const safeText=x=>typeof x==='string'&&x.trim().length>0&&x.length<=500&&!/[<>&"'\u0000-\u001f]/.test(x);
const tone=x=>typeof x==='string'&&/^#[0-9a-f]{6}$/i.test(x);
const slug=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replaceAll(' ','-');
function validateCatalog(c){
 const fail=reason=>{throw Error('Cadastro inválido: '+reason)};
 if(!c||c.version!==1||!Array.isArray(c.products)||c.products.length!==2||!Array.isArray(c.caps)||c.caps.length!==3||!Array.isArray(c.order)||!Array.isArray(c.sizes))fail('estrutura');
 const routes=['conjuntos','camisetas'],expected=new Set(),photos=new Set();
 c.products.forEach((p,i)=>{
  if(!p||!safeText(p.title)||!safeText(p.description)||p.route!==routes[i]||!Number.isSafeInteger(p.price)||p.price<=0||p.price>100000000||!Array.isArray(p.colors)||!p.colors.length)fail('produto '+i);
  const names=new Set();
  p.colors.forEach((co,j)=>{
   if(!Array.isArray(co)||co.length!==3||!safeText(co[0])||typeof co[1]!=='string'||!/^\d+$/.test(co[1])||!tone(co[2]))fail('cor '+i+':'+j);
   const key=slug(co[0]);if(!/^[a-z0-9-]+$/.test(key)||names.has(key)||photos.has(co[1]))fail('cor ou fotografia duplicada');
   names.add(key);photos.add(co[1]);expected.add(i+':'+j);
  });
 });
 const caps=new Set();
 c.caps.forEach((x,i)=>{
  if(!x||!safeText(x.name)||!safeText(x.detail)||typeof x.file!=='string'||!/^cap-[a-z]+$/.test(x.file)||!tone(x.hex)||caps.has(slug(x.name))||photos.has(x.file)||!/^[a-z0-9-]+$/.test(slug(x.name)))fail('boné '+i);
  caps.add(slug(x.name));photos.add(x.file);expected.add('2:'+i);
 });
 if(!c.sizes.length||c.sizes.some(x=>typeof x!=='string'||!/^[A-Z0-9]{1,8}$/.test(x))||new Set(c.sizes).size!==c.sizes.length)fail('tamanhos');
 if(c.order.length!==expected.size)fail('ordem incompleta');
 for(const item of c.order){if(!Array.isArray(item)||item.length!==2||!item.every(Number.isInteger)||!expected.delete(item.join(':')))fail('ordem duplicada ou inexistente')}
 return c;
}
const api=Object.freeze({validateCatalog,slug});
if(typeof module==='object'&&module.exports)module.exports=api;else root.APELL_CATALOG=api;
})(typeof globalThis!=='undefined'?globalThis:this);
