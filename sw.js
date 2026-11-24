// Cache only recovery assets; never cache prices, orders or storefront pages.
const CACHE='apell-offline-v1';
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await cache.addAll([new Request('/offline.html',{cache:'reload'}),new Request('/icons/apell-192.png',{cache:'reload'})]);
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith('apell-offline-')&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(url.pathname==='/icons/apell-192.png'){
  event.respondWith(fetch(req).catch(async()=>await (await caches.open(CACHE)).match('/icons/apell-192.png')||Response.error()));return;
 }
 if(req.mode!=='navigate')return;
 event.respondWith((async()=>{
  try{return await fetch(req)}catch{
   return await (await caches.open(CACHE)).match('/offline.html')||new Response('APELL: sem conexão. Reconecte-se para acessar a loja.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})
  }
 })());
});
