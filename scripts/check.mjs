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
assert.equal(recipes.length,100,'The requested hundred dishes must exist.');
assert.equal(new Set(recipes.map(r=>r.id)).size,100,'Recipe IDs must be unique.');
assert.equal(new Set(recipes.map(r=>r.zh)).size,100,'Chinese dish names must be unique.');
for(const r of recipes){assert(r.prep+r.cook===r.minutes,'Time mismatch: '+r.id);assert(r.ingredients.length>=4&&r.steps.length>=4);assert(r.ingredients.every(x=>typeof x[0]==='number'&&x[0]>0));assert(r.steps.every(s=>s.length===4&&s.every(x=>typeof x==='string'&&x.length)));const asset=await stat(resolve(root,'assets',r.image));assert(asset.size>(r.illustration?2000:10000));}
assert.equal(recipes.filter(r=>r.international).length,10,'Ten overseas starter dishes');
const credits=[...JSON.parse(await readFile('src/credits.json','utf8')),...JSON.parse(await readFile('src/credits-extras.json','utf8'))];assert.equal(credits.length,recipes.length);assert(credits.every(x=>x.author&&x.source&&x.licenseUrl));
assert.equal(htmls.length,recipes.length*2+16);
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');
assert.equal([...sitemap.matchAll(/<loc>/g)].length,recipes.length*2+12);
const textSitemap=(await readFile(resolve(root,'sitemap.txt'),'utf8')).trim().split('\n');
assert.deepEqual(textSitemap,[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]),'Backup text sitemap must contain exactly the same canonical URLs as XML.');
console.log(`PASS: ${recipes.length} unique dishes, ${htmls.length} bilingual pages, ${links} local links/assets, full ingredients and steps, one hundred image credits, sitemap, embedded JSON, and disabled ad scripts.`);
