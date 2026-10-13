import {mkdir,writeFile,readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
const target=resolve('public/assets');
await mkdir(target,{recursive:true});
const allRequested=[
 ['tomato-egg.jpg','File:Hunan cuisine, stir-fried tomato with eggs.jpg'],
 ['kung-pao.jpg','File:2016-08-14 Kung Pao Chicken dish in Beijing anagoria.jpg'],
 ['fried-rice.jpg','File:Egg fried rice.jpg'],
 ['dumplings.jpg','File:Asian Dumplings (Jiaozi) by ArmAg.jpg'],
 ['noodles.jpg','File:Shanghai oil noodle.jpg'],
 ['tofu.jpg','File:Authentic Mapo Tofu.jpg']
];
let credits=[];
try { credits=JSON.parse(await readFile(resolve('src/credits.json'),'utf8')); } catch {}
const requested=[];
for(const entry of allRequested){try {await access(resolve(target,entry[0]));}catch{requested.push(entry);}}
if(!requested.length) { console.log('All licensed images are already local.'); process.exit(0); }
const url=new URL('https://commons.wikimedia.org/w/api.php');
url.search=new URLSearchParams({action:'query',format:'json',titles:requested.map(x=>x[1]).join('|'),prop:'imageinfo',iiprop:'url|extmetadata',iiurlwidth:'1200'});
const response=await fetch(url,{headers:{'User-Agent':'ChinaTable/1.0 (recipe website; licensed image download)'}});
if(!response.ok) throw new Error('Wikimedia metadata request: '+response.status);
const data=await response.json();
const pages=Object.values(data.query.pages);
for(const [file,title] of requested){
 const p=pages.find(x=>x.title===title);
 if(!p?.imageinfo) { console.log('MISSING '+title); continue; }
 const info=p.imageinfo[0], meta=info.extmetadata;
 const license=meta.LicenseShortName?.value||'';
 if(!/CC0|CC BY|Public domain/i.test(license)) throw new Error('Unapproved image license: '+license);
 const download=(info.thumburl||info.url).split('?')[0];
 const image=await fetch(download);
 if(!image.ok) throw new Error('Image download failed: '+title+' '+image.status);
 const bytes=new Uint8Array(await image.arrayBuffer());
 await writeFile(resolve(target,file),bytes);
 const plain=s=>s.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();
 credits.push({file,title:title.slice(5),author:plain(meta.Artist?.value||'Wikimedia contributor'),source:info.descriptionurl,license,licenseUrl:meta.LicenseUrl?.value||'https://commons.wikimedia.org/wiki/Commons:Licensing',changes:'Resized by Wikimedia; displayed with a CSS crop. Photo illustrates the dish, not a test of this recipe.'});
 console.log(file+' '+bytes.length+' bytes '+license);
}
await writeFile(resolve('src/credits.json'),JSON.stringify(credits,null,2)+'\n');
