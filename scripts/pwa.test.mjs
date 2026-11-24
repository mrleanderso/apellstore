import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {test} from 'node:test';
const manifest=JSON.parse(await readFile('manifest.webmanifest','utf8'));
const sw=await readFile('sw.js','utf8'),pwa=await readFile('js/pwa.js','utf8'),home=await readFile('index.html','utf8');
test('manifest and square PNG dimensions',async()=>{
 assert.equal(manifest.display,'standalone');assert.equal(manifest.scope,'/');assert.equal(manifest.start_url,'/');
 for(const icon of manifest.icons){const b=await readFile('.'+icon.src);assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(b.readUInt32BE(16),Number(icon.sizes.split('x')[0]));assert.equal(b.readUInt32BE(20),Number(icon.sizes.split('x')[1]))}
});
test('all public pages include PWA metadata',async()=>{
 const pages=[home];
 for(const route of ['conjuntos','camisetas','bones'])for(const f of await readdir('p/'+route))if(f.endsWith('.html'))pages.push(await readFile('p/'+route+'/'+f,'utf8'));
 for(const html of pages){assert.match(html,/rel="manifest" href="\/manifest.webmanifest"/);assert.match(html,/apple-touch-icon/);assert.match(html,/js\/pwa.js/)}
});
test('worker only precaches recovery page and icon',()=>{new Function(sw);new Function(pwa);assert.match(sw,/req\.mode!=='navigate'/);assert.match(sw,/cache\.addAll\(\[new Request\('\/offline\.html'/);assert.doesNotMatch(sw,/products\.json|localStorage|wa\.me/);assert.match(home,/connectionNotice/);assert.match(pwa,/beforeinstallprompt/)});
