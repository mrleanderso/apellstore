// Regenera as páginas públicas após alterações no catálogo ou index.html.
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import contract from '../js/catalog.js';
function entryHtml(home,route,color,title,desc,photo,price,origin=""){
const esc=v=>String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const key=color.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replaceAll(" ","-"),hash="produto/"+route+"/"+key,path="/p/"+route+"/"+key+".html",label=title+" — "+color+" | APELL",description=title+" em "+color+". "+desc;
let page=home.replace("<head>","<head><base href=\"/\">").replace(/<title>[^<]*<\/title>/,"<title>"+esc(label)+"</title>").replace(/(<meta name="description" content=")[^"]*"/,"$1"+esc(description)+'"').replace(/(<meta property="og:title" content=")[^"]*"/,"$1"+esc(label)+'"').replace(/(<meta property="og:description" content=")[^"]*"/,"$1"+esc(description)+'"').replace(/(<meta property="og:image" content=")[^"]*"/,"$1"+esc(origin+photo)+'"');
page=page.replace("</head>",'<link rel="canonical" href="'+esc(origin+path)+'"></head>').replace("<body>",'<body data-product-route="'+esc(hash)+'">').replace('<main id="inicio">','<main id="inicio" hidden>');
const fallback='<article class="product-entry-preview"><a href="/#colecao">Voltar à coleção</a><h1>'+esc(title)+' — '+esc(color)+'</h1><img src="'+esc(photo)+'" alt="'+esc(title+' em '+color)+'"><p>'+esc(desc)+'</p><p>'+esc(price)+'</p><a class="primary" href="/#'+esc(hash)+'">Abrir detalhes na loja</a></article>';
return page.replace('<main id="motionView" class="motion-view wrap" hidden tabindex="-1"></main>','<main id="motionView" class="motion-view wrap" tabindex="-1">'+fallback+'</main>');
}
const home=await readFile('index.html','utf8'),catalog=contract.validateCatalog(JSON.parse(await readFile('data/products.json','utf8'))),origin=(process.env.APELL_PUBLIC_ORIGIN||'').replace(/\/$/,'');
const slug=x=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replaceAll(" ","-");
const items=[...catalog.products.flatMap(p=>p.colors.map(co=>({route:p.route,color:co[0],title:p.title,description:p.description,photo:'/img/'+co[1]+'.webp',price:(p.price/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})+' · a confirmar'}))),...catalog.caps.map(co=>({route:'bones',color:co.name,title:'Boné APELL',description:co.detail+'. Consulte valor e disponibilidade. Foto original: recorte da campanha.',photo:'/img/'+co.file+'.webp',price:'Valor sob consulta'}))];
for(const e of items){const path='p/'+e.route+'/'+slug(e.color)+'.html';await mkdir(dirname(path),{recursive:true});await writeFile(path,entryHtml(home,e.route,e.color,e.title,e.description,e.photo,e.price,origin));}
if(origin){
 const url=new URL(origin);if(url.protocol!=='https:'||url.pathname!=='/'||url.search||url.hash||url.username||url.password)throw Error('APELL_PUBLIC_ORIGIN deve ser a origem HTTPS oficial');
 const urls=['/',...items.map(e=>'/p/'+e.route+'/'+slug(e.color)+'.html')];
 const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(path=>'<url><loc>'+url.origin+path+'</loc></url>').join('')+'</urlset>\n';
 await writeFile('sitemap.xml',xml);await writeFile('robots.txt','User-agent: *\nAllow: /\nSitemap: '+url.origin+'/sitemap.xml\n');
}
console.log(items.length+' páginas geradas.');
