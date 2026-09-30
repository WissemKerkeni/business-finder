// Instagram capture hook: run on https://www.instagram.com/chaari.auto/ (logged in).
// Captures every media object (code + taken_at) from fetch/XHR responses into window.__ig.
window.__ig=window.__ig||{};
window.__walk=function(o){ if(!o||typeof o!=='object')return; if(Array.isArray(o)){o.forEach(__walk);return;}
 if(o.code&&o.taken_at&&(o.image_versions2||o.carousel_media||o.video_versions)){ const prev=__ig[o.code]; if(!prev||JSON.stringify(o).length>JSON.stringify(prev).length) __ig[o.code]=o; }
 for(const k in o) __walk(o[k]); };
window.__parseText=t=>{ for(const s of t.split('\n')){ try{__walk(JSON.parse(s))}catch(e){} } };
if(!window.__hooked){ window.__hooked=1;
 const of=window.fetch; window.fetch=async function(...a){ const r=await of.apply(this,a); try{ r.clone().text().then(__parseText).catch(()=>{}) }catch(e){} return r; };
 const os=XMLHttpRequest.prototype.send; XMLHttpRequest.prototype.send=function(...a){ this.addEventListener('load',()=>{ try{ if(typeof this.responseText==='string') __parseText(this.responseText) }catch(e){} }); return os.apply(this,a); }; }
// Compact a media object to what we need.
window.__slim=m=>{ const img=x=>{const c=(x.image_versions2?.candidates||[]).sort((a,b)=>b.width-a.width)[0];return c?{u:c.url,w:c.width,h:c.height}:null};
 const vid=x=>{const v=(x.video_versions||[]).sort((a,b)=>(b.width*b.height)-(a.width*a.height))[0];return v?{u:v.url,w:v.width,h:v.height}:null};
 const items=m.carousel_media?m.carousel_media:[m];
 return {code:m.code,t:m.taken_at,type:m.media_type,product:m.product_type,user:m.user?.username,caption:m.caption?.text||'',dur:m.video_duration||null,
  media:items.map(x=>({img:img(x),vid:vid(x),dur:x.video_duration||null,dash:!!x.video_dash_manifest}))}; };
window.__save=async name=>{ const out=Object.values(__ig).map(__slim).sort((a,b)=>b.t-a.t);
 const r=await fetch('http://127.0.0.1:8765/save?name='+name,{method:'POST',body:JSON.stringify(out,null,1)}); return out.length+' posts -> '+await r.text(); };
'hook ready';
