import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {test} from 'node:test';
import contract from '../js/catalog.js';
const catalog=JSON.parse(await readFile('data/products.json','utf8'));
test('catalogue passes shared validation',()=>assert.equal(contract.validateCatalog(catalog),catalog));
for(const [name,change] of [
 ['negative price',c=>c.products[0].price=-1],
 ['duplicate order',c=>c.order[1]=c.order[0]],
 ['missing variant',c=>c.order.pop()],
 ['unsafe text',c=>c.products[0].description='<script>'],
 ['duplicate size',c=>c.sizes.push(c.sizes[0])],
 ['wrong route',c=>c.products[1].route='conjuntos'],
 ['duplicate color',c=>c.products[0].colors[1][0]=c.products[0].colors[0][0]],
 ['bad image path',c=>c.caps[0].file='../cap'],
 ['invalid tuple',c=>c.order[0]=null]
])test('reject '+name,()=>{const c=structuredClone(catalog);change(c);assert.throws(()=>contract.validateCatalog(c),/Cadastro inválido/)});
test('all photographs exist',async()=>{for(const p of catalog.products)for(const co of p.colors){await access('img/'+co[1]+'.webp');await access('img/model-'+co[1]+'.webp')}for(const c of catalog.caps){await access('img/'+c.file+'.webp');await access('img/catalog-'+c.file+'.webp')}});
