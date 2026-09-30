// Facebook capture hook (run on the page, logged in; SPA navigation keeps it alive).
// window.__fbv: video objects by id (HD/SD urls, size, length); window.__fbp: stories with text + time; window.__fbi: photos by id.
window.__fbv=window.__fbv||{}; window.__fbp=window.__fbp||{}; window.__fbi=window.__fbi||{};
window.__fwalk=function(o,ctx){ if(!o||typeof o!=='object')return; if(Array.isArray(o)){o.forEach(x=>__fwalk(x,ctx));return;}
 if(o.browser_native_hd_url||o.playable_url_quality_hd||o.browser_native_sd_url||o.playable_url){
  const id=o.id||o.videoId||o.video_id; if(id){ const p=__fbv[id]||{}; __fbv[id]=Object.assign(p,{id,hd:o.browser_native_hd_url||o.playable_url_quality_hd||p.hd||null,sd:o.browser_native_sd_url||o.playable_url||p.sd||null,
   w:o.width||o.original_width||p.w,h:o.height||o.original_height||p.h,len:o.length_in_second||o.playable_duration_in_ms/1000||p.len,t:o.publish_time||o.creation_time||p.t,url:o.permalink_url||o.url||p.url,story:ctx&&ctx.story||p.story}); } }
 let c=ctx;
 if((o.creation_time||o.publish_time)&&(o.message||o.comet_sections||o.post_id)){
  const id=o.post_id||o.id; const txt=o.message?.text||o.comet_sections?.content?.story?.message?.text||'';
  if(id){ const p=__fbp[id]||{}; __fbp[id]=Object.assign(p,{id,t:o.creation_time||o.publish_time||p.t,text:txt||p.text||'',url:o.url||o.permalink_url||p.url}); c={story:id}; } }
 if(o.__typename==='Photo'&&o.id&&(o.image||o.viewer_image||o.photo_image)){ const im=o.viewer_image||o.image||o.photo_image; const p=__fbi[o.id]||{};
  if(!p.w||im.width>p.w) __fbi[o.id]=Object.assign(p,{id:o.id,u:im.uri,w:im.width,h:im.height,story:c&&c.story||p.story}); }
 for(const k in o) __fwalk(o[k],c); };
window.__fparse=t=>{ for(const s of t.split('\n')){ try{__fwalk(JSON.parse(s),null)}catch(e){} } };
if(!window.__fhooked){ window.__fhooked=1;
 const of=window.fetch; window.fetch=async function(...a){ const r=await of.apply(this,a); try{ r.clone().text().then(__fparse).catch(()=>{}) }catch(e){} return r; };
 const os=XMLHttpRequest.prototype.send; XMLHttpRequest.prototype.send=function(...a){ this.addEventListener('load',()=>{ try{ if(typeof this.responseText==='string') __fparse(this.responseText) }catch(e){} }); return os.apply(this,a); }; }
for(const s of document.querySelectorAll('script[type="application/json"]')){ try{__fwalk(JSON.parse(s.textContent),null)}catch(e){} }
window.__fstat=()=>`videos ${Object.keys(__fbv).length} (hd ${Object.values(__fbv).filter(v=>v.hd).length}) posts ${Object.keys(__fbp).length} photos ${Object.keys(__fbi).length}`;
window.__fstore=()=>{ localStorage.__chaari_fb=JSON.stringify({v:__fbv,p:__fbp,i:__fbi}); return localStorage.__chaari_fb.length; };
__fstat();
