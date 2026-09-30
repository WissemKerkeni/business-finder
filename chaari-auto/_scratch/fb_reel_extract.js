// Run on https://www.facebook.com/reel/<id> (logged in). Appends to localStorage.__chaari_fbr:
//   stories: {post_id, ct, actor, text, vids:[media ids]} ; dash: {video_id: best video-only representation {u,w,h,bw}}
// Returns a URL-free summary (the extension blocks output containing signed query strings).
const S=JSON.parse(localStorage.__chaari_fbr||'{"stories":{},"dash":{}}');
const walk=o=>{ if(!o||typeof o!=='object')return; if(Array.isArray(o)){o.forEach(walk);return;}
 if(o.all_video_dash_prefetch_representations) for(const x of o.all_video_dash_prefetch_representations){
   const best=x.representations.filter(r=>/video/.test(r.mime_type)).sort((a,b)=>(b.width*b.height-a.width*a.height)||(b.bandwidth-a.bandwidth))[0];
   const cur=S.dash[x.video_id]; if(best&&(!cur||best.width*best.height>cur.w*cur.h)) S.dash[x.video_id]={u:best.base_url,w:best.width,h:best.height,bw:best.bandwidth}; }
 if(o.post_id&&o.creation_time&&o.actors){ const vids=[]; const f=a=>{ if(!a||typeof a!=='object')return; if(Array.isArray(a)){a.forEach(f);return;} if(a.__typename==='Video'&&a.id)vids.push(a.id); for(const k in a)f(a[k]); }; f(o.attachments);
   S.stories[o.post_id]={post_id:o.post_id,ct:o.creation_time,actor:o.actors?.[0]?.name,text:o.message?.text||'',vids:[...new Set(vids)]}; }
 for(const k in o) walk(o[k]); };
for(const s of document.querySelectorAll('script[type="application/json"]')){ try{walk(JSON.parse(s.textContent))}catch(e){} }
localStorage.__chaari_fbr=JSON.stringify(S);
const mine=Object.values(S.stories).filter(s=>/chaari/i.test(s.actor||''));
`stories ${Object.keys(S.stories).length} (chaari ${mine.length}) dash ${Object.keys(S.dash).length} | `+Object.values(S.stories).map(s=>`${s.actor}:${s.vids.join('/')}:${new Date(s.ct*1000).toISOString().slice(0,10)}:${(s.text||'').slice(0,25).replace(/\n/g,' ')}`).join(' || ');
