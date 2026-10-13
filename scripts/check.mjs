import {readFile,readdir,stat,access} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import assert from 'node:assert/strict';
import {recipes} from '../src/recipes.mjs';
import config from '../site.config.mjs';
const root=resolve('dist');
async function walk(dir){const result=[];for(const item of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,item.name);result.push(...(item.isDirectory()?await walk(path):[path]));}return result;}
const files=await walk(root),htmls=files.filter(p=>extname(p)==='.html');
let links=0;
for(const path of htmls){
 const html=await readFile(path,'utf8');
 assert.match(html,/<html lang="(en|zh-CN)">/);
 assert.match(html,/<meta name="description"/);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,'Duplicate IDs in '+path);
 assert(!html.includes('undefined'),'Undefined content: '+path);
 if(!config.adsense.enabled) assert(!html.includes('pagead2.googlesyndication.com'),'Ads script must remain disabled');
 for(const m of html.matchAll(/(?:href|src)="([^"<>]+)"/g)){
  const url=m[1];if(/^(https?:|mailto:|data:)/.test(url))continue;
  const [local,fragment]=url.split('#');
  const target=local?resolve(dirname(path),local):path;
  await access(target);links++;
  if(fragment&&extname(target)==='.html'){const body=target===path?html:await readFile(target,'utf8');assert(body.includes(`id="${fragment}"`),'Broken fragment '+url+' in '+path);}
 }
 for(const m of html.matchAll(/<script[^>]+type="(?:application\/ld\+json|application\/json)"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
}
for(const r of recipes){assert(r.prep+r.cook===r.minutes,'Time mismatch: '+r.id);assert(r.ingredients.length&&r.steps.length>=4);assert(r.ingredients.every(x=>typeof x[0]==='number'&&x[0]>0));const photo=await stat(resolve(root,'assets',r.image));assert(photo.size>10000);}
const credits=JSON.parse(await readFile('src/credits.json','utf8'));assert.equal(credits.length,recipes.length);assert(credits.every(x=>x.author&&x.source&&x.licenseUrl));
assert.equal(htmls.length,28);
console.log(`PASS: ${htmls.length} bilingual pages, ${links} local links/assets, six recipe datasets, image licenses, embedded JSON, and disabled ad scripts.`);
