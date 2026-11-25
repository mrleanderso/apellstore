// npm install --no-save --package-lock=false playwright@1.56.1
// npx playwright install chromium
// node scripts/browser-smoke.mjs
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile,stat,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {chromium} from 'playwright';
const root=resolve('.'),mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp'};
const server=createServer(async(req,res)=>{try{let p=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(p!==root&&!p.startsWith(root+sep))throw Error();if((await stat(p)).isDirectory())p=resolve(p,'index.html');const data=await readFile(p);res.writeHead(200,{'Content-Type':mime[extname(p)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
const report=[];
async function ready(page,path='/'){await page.goto(origin+path);await page.locator('#appStatus').waitFor({state:'hidden',timeout:15000})}
async function noOverflow(page,label){const x=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.ok(x.scroll<=x.width+1,label+': '+JSON.stringify(x))}
try{
 browser=await chromium.launch({headless:true});
 await mkdir('audit-results',{recursive:true});
 for(const width of [320,390,768,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await ready(page);assert.equal(await page.locator('#products .product-card').count(),6);await noOverflow(page,'home '+width);
  assert.equal(await page.locator('#heroImage').evaluate(x=>getComputedStyle(x).objectFit),'contain');
  await page.locator('#heroThumbs button').nth(1).click();assert.equal(await page.locator('#heroTitle').textContent(),'Conjuntos');
  await page.locator('.catalog-group-toggle').click();assert.equal(await page.locator('#products .product-card').count(),3);
  await page.locator('#products .product-card').first().locator('select').selectOption('3');assert.match(await page.locator('#products .catalog-piece-link').first().getAttribute('href'),/rosa\.html$/);
  await page.locator('#products .catalog-piece-link').first().click();await page.locator('#productSizes').waitFor();await noOverflow(page,'produto '+width);
  await page.locator('[data-size="M"]').click();await page.locator('[data-photo-mode="real"]').click();assert.equal(await page.locator('#detailZoom').getAttribute('data-mode'),'real');
  if(await page.locator('#mobileAdd').isVisible())await page.locator('#mobileAdd').click();else await page.locator('#addBtn').click();
  assert.equal(await page.locator('#count').textContent(),'1');assert.equal(await page.locator('#panel').evaluate(x=>x.open),false);
  const beforeBag=await page.evaluate(()=>({hash:location.hash,scroll:window.scrollY}));
  await page.locator('#bagBtn').click();await page.locator('#continue').click();await page.locator('#panel').waitFor({state:'hidden'});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert.equal(await page.evaluate(()=>location.hash),beforeBag.hash);assert.equal(await page.locator('#count').textContent(),'1');assert.ok(Math.abs(await page.evaluate(()=>window.scrollY)-beforeBag.scroll)<=2,'bag return scroll');
  await page.locator('#bagBtn').click();await page.locator('.bag-edit summary').click();await page.locator('.bag-edit select').nth(1).selectOption('G');await page.locator('.bag-edit-actions .outline').click();
  assert.match(await page.locator('.cart-item > div > small').textContent(),/Tamanho G/);
  await page.locator('.cart-item button[aria-label^="Remover"]').click();await page.locator('.bag-undo button').click();assert.equal(await page.locator('#count').textContent(),'1');
  await page.locator('#startCheckout').click();await page.locator('#checkoutForm').waitFor();await noOverflow(page,'checkout '+width);
  await page.locator('#orderName').fill('Cliente Teste');await page.locator('input[value="pickup"]').check();await page.locator('#orderPayment').selectOption('pix');
  await page.locator('#editBag').click();assert.equal((await page.locator('#continue').textContent()).trim(),'Voltar ao pedido');await page.locator('#continue').click();await page.locator('#panel').waitFor({state:'hidden'});assert.equal(await page.locator('#orderName').inputValue(),'Cliente Teste');assert.equal(await page.locator('#orderPayment').inputValue(),'pix');
  // Prevent opening WhatsApp; inspect only the generated link with fictitious data.
  await page.evaluate(()=>{document.getElementById('requestFallback').addEventListener('click',e=>e.preventDefault())});
  await page.locator('#checkoutForm button[type="submit"]').click();const href=await page.locator('#requestFallback').getAttribute('href');assert.ok(href);assert.match(new URL(href).searchParams.get('text'),/Preferência de pagamento: Pix/);assert.match(new URL(href).searchParams.get('text'),/Rosa · G/);
  await page.screenshot({path:'audit-results/checkout-'+width+'.png',fullPage:true});
  await ready(page,'/p/conjuntos/rosa.html');await page.locator('#detailImg').waitFor();assert.match(await page.locator('#colorName').textContent(),/Rosa/);await noOverflow(page,'link direto '+width);
  assert.deepEqual(errors,[]);report.push({width,flow:'ok'});await ctx.close();
 }
 const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.route('**/*',route=>route.request().url().endsWith('/data/products.json')?route.abort():route.request().url().startsWith(origin+'/')?route.continue():route.abort());
 const page=await ctx.newPage();await page.goto(origin);await page.getByRole('button',{name:'Tentar novamente'}).waitFor({timeout:15000});assert.ok(await page.locator('#appStatus a').isVisible());await ctx.close();
 console.log(JSON.stringify({report,catalogFailure:'ok'},null,2));
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
