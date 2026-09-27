// Instagram post collector: run on /p/<code>/ — steps carousel, stores largest srcset per slide in localStorage.__hl
await new Promise(r=>setTimeout(r,2500));
const code=location.pathname.split('/').filter(Boolean).pop();
const best=i=>{const c=(i.srcset||'').split(',').map(s=>s.trim().split(' ')).filter(x=>x[0]).map(([u,w])=>({u,w:parseInt(w)||0})).sort((a,b)=>b.w-a.w);return c[0]||{u:i.src,w:i.naturalWidth}};
const seen=new Map();
const grab=()=>{const imgs=[...document.querySelectorAll('img')].filter(i=>i.complete);const mx=Math.max(...imgs.map(i=>i.getBoundingClientRect().width));for(const i of imgs){if(i.getBoundingClientRect().width>=mx*0.9&&mx>200){const b=best(i);const k=b.u.split('?')[0];if(!seen.has(k))seen.set(k,{u:b.u,w:i.naturalWidth,h:i.naturalHeight,alt:i.alt})}}};
for(let k=0;k<20;k++){await new Promise(r=>setTimeout(r,1000));grab();const nx=document.querySelector('button[aria-label=Next]');if(!nx)break;nx.click();}
await new Promise(r=>setTimeout(r,1000));grab();
const all=JSON.parse(localStorage.__hl||'{}');all[code]=[...seen.values()];localStorage.__hl=JSON.stringify(all);
code+': '+all[code].map(x=>x.w+'x'+x.h+' '+x.alt.slice(0,40)).join(' | ')
