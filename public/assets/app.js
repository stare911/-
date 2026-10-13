(() => {
  'use strict';
  const {lang,labels:t}=JSON.parse(document.getElementById('site-data').textContent);
  const zh=lang==='zh';
  const saveKey='china-table:saved:v1';
  let saved=new Set();
  let metric='metric';
  try { const data=JSON.parse(localStorage.getItem(saveKey)||'[]'); if(Array.isArray(data)) saved=new Set(data.filter(x=>typeof x==='string')); metric=localStorage.getItem('china-table:units')==='us'?'us':'metric'; } catch {}
  let toastTimer;
  const toast=message=>{const el=document.querySelector('.toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2200);};
  const syncSaved=()=>{
    document.querySelectorAll('[data-save]').forEach(b=>{const on=saved.has(b.dataset.save);b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?t.unsave:t.save);});
    document.querySelectorAll('.saved-count').forEach(el=>{el.textContent=String(saved.size);el.hidden=saved.size===0;});
  };
  const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const section=document.querySelector('[data-collection]');
  let activeFilter='all';
  let pageNumber=1;
  const pageSize=12;
  const applyFilters=(resetPage=false)=>{
    if(!section) return;
    if(resetPage===true) pageNumber=1;
    const query=normalize(document.getElementById('recipe-search').value);
    const matches=[];
    section.querySelectorAll('.recipe-card').forEach(card=>{
      const matchesText=normalize(card.dataset.search).includes(query);
      const matchesFilter=activeFilter==='all'||(activeFilter==='quick'?Number(card.dataset.minutes)<=30:activeFilter==='vegetarian'?card.dataset.vegetarian==='true':activeFilter.startsWith('type-')?card.dataset.type===activeFilter.slice(5):card.dataset.category===activeFilter);
      const matchesSaved=section.dataset.collection!=='saved'||saved.has(card.dataset.id);
      card.hidden=true;
      if(matchesText&&matchesFilter&&matchesSaved) matches.push(card);
    });
    const count=matches.length,pages=Math.max(1,Math.ceil(count/pageSize));
    pageNumber=Math.min(pageNumber,pages);
    matches.slice((pageNumber-1)*pageSize,pageNumber*pageSize).forEach(card=>card.hidden=false);
    document.getElementById('result-number').textContent=String(count);
    section.querySelector('.recipe-grid').hidden=count===0;
    const pagination=section.querySelector('.pagination');
    pagination.hidden=count<=pageSize;
    pagination.querySelector('.page-position').textContent=zh?`第 ${pageNumber} / ${pages} 页`:`Page ${pageNumber} of ${pages}`;
    pagination.querySelector('[data-page="prev"]').disabled=pageNumber<=1;
    pagination.querySelector('[data-page="next"]').disabled=pageNumber>=pages;
    const empty=section.querySelector('.empty-state');
    empty.hidden=count!==0;
    const noSaved=section.dataset.collection==='saved'&&saved.size===0;
    empty.querySelector('h3').textContent=noSaved?t.savedEmpty:t.noResults;
    empty.querySelector('p').textContent=noSaved?t.savedDesc:t.noResultsDesc;
    empty.querySelector('[data-reset]').hidden=noSaved;
  };
  document.querySelectorAll('[data-save]').forEach(button=>button.addEventListener('click',()=>{
    const id=button.dataset.save,on=saved.has(id);
    const next=new Set(saved);on?next.delete(id):next.add(id);
    try {localStorage.setItem(saveKey,JSON.stringify([...next]));}catch{toast(zh?'当前浏览器无法保存收藏，请允许网站使用本地存储。':'This browser cannot save recipes. Please allow local site storage.');return;}
    saved=next;syncSaved();applyFilters();toast(on?t.removedToast:t.savedToast);
  }));
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter;
    section.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
    applyFilters(true);
  }));
  document.getElementById('recipe-search')?.addEventListener('input',()=>applyFilters(true));
  section?.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{
    pageNumber+=button.dataset.page==='next'?1:-1;
    applyFilters();
    section.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }));
  document.querySelector('[data-reset]')?.addEventListener('click',()=>{document.getElementById('recipe-search').value='';section.querySelector('[data-filter="all"]').click();document.getElementById('recipe-search').focus();});
  window.addEventListener('storage',event=>{if(event.key===saveKey){try{const list=JSON.parse(event.newValue||'[]');saved=new Set(Array.isArray(list)?list.filter(x=>typeof x==='string'):[]);}catch{saved=new Set();}syncSaved();applyFilters();}});
  syncSaved();applyFilters();
  const menu=document.querySelector('.menu-button'),nav=document.getElementById('main-nav');
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
  document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
  const recipe=document.querySelector('[data-recipe]');
  if(recipe){
    const base=Number(recipe.dataset.baseServings);
    let servings=base;
    const format=n=>Number(n.toFixed(2)).toLocaleString(zh?'zh-CN':'en-US',{maximumFractionDigits:2});
    const updateAmounts=()=>{
      recipe.querySelectorAll('[data-amount]').forEach(el=>{
        let amount=Number(el.dataset.amount)*servings/base,unit=el.dataset.measure;
        if(metric==='us'&&unit==='g'){amount/=28.349523125;unit='oz';}
        if(metric==='us'&&unit==='ml'){amount/=29.5735295625;unit='fl oz';}
        const units=zh?{g:'克',ml:'毫升',pieces:'个',tbsp:'汤匙',tsp:'茶匙',oz:'盎司','fl oz':'液体盎司'}:{pieces:''};
        el.textContent=format(amount)+' '+(units[unit]??unit);
      });
      document.getElementById('servings').textContent=String(servings);
      recipe.querySelector('[data-servings="-1"]').disabled=servings<=1;
      recipe.querySelector('[data-servings="1"]').disabled=servings>=12;
      recipe.querySelectorAll('[data-unit]').forEach(b=>{const on=b.dataset.unit===metric;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});
    };
    recipe.querySelectorAll('[data-servings]').forEach(b=>b.addEventListener('click',()=>{servings=Math.max(1,Math.min(12,servings+Number(b.dataset.servings)));updateAmounts();}));
    recipe.querySelectorAll('[data-unit]').forEach(b=>b.addEventListener('click',()=>{metric=b.dataset.unit;try{localStorage.setItem('china-table:units',metric);}catch{}updateAmounts();}));
    recipe.querySelectorAll('[data-ingredient]').forEach(input=>input.addEventListener('change',()=>{const all=recipe.querySelectorAll('[data-ingredient]').length,checked=recipe.querySelectorAll('[data-ingredient]:checked').length;recipe.querySelector('.ingredient-progress').textContent=`${checked} / ${all} ${t.checked}`;}));
    updateAmounts();
  }
})();
