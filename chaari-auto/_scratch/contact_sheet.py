# Contact sheet -> _scratch/contact.html (served by chaari-auto-static at /_scratch/contact.html)
import html
from PIL import Image
from selection import CARS, OTHER, CLIPS
from probe import probe
h=['<!doctype html><meta charset=utf-8><title>Chaari Auto contact sheet</title><style>body{font:13px system-ui;background:#111;color:#eee;margin:16px}h2{margin:28px 0 8px;font-size:16px}.row{display:flex;gap:8px;flex-wrap:wrap}figure{margin:0;width:220px}img,video{width:220px;height:293px;object-fit:cover;background:#222;display:block}figcaption{font-size:11px;color:#aaa;padding:3px 0}.hero img{width:460px;height:auto}.k{color:#e70013;font-weight:700}</style>',
   '<h1>Chaari Auto — contact sheet</h1><p>Hero (desktop) = Maps owner-02 Cupra Formentor · hero (mobile) = Maps owner-17 GLC. Videos: own overlays kept (user decision), audio removed.</p>']
h.append('<h2>Hero / atmosphere (Google Maps, model label only)</h2><div class="row hero">')
for f,use,label in OTHER:
    w,hh=Image.open(f'photos-raw/{f}.jpg').size
    h.append(f'<figure><img src="photos-raw/{f}.jpg" loading=lazy><figcaption><span class=k>{use}</span> · {label} · {w}×{hh}</figcaption></figure>')
h.append('</div><h2>Clips (FB 1080p source → 720p H.264, muted)</h2><div class=row>')
for cid,car,vid,date,a,b,cap in CLIPS:
    p=probe(f'clips/{cid}.mp4')
    h.append(f'<figure><video src="clips/{cid}.mp4" poster="clips/{cid}-poster.jpg" controls muted preload=none></video><figcaption>{html.escape(cap)} · publié {date}<br>{p["w"]}×{p["h"]} · {p["dur"]}s · {p["mb"]} MB · seg {a}–{b}s</figcaption></figure>')
h.append('</div>')
for cid,c in CARS.items():
    h.append(f'<h2>{html.escape(c["label"])} <small>({cid} · {c["kind"]} · publié {c["date"]})</small></h2><div class=row>')
    for p in c['photos']:
        w,hh=Image.open(f'photos-raw/{p[0]}.jpg').size
        h.append(f'<figure><img src="photos-raw/{p[0]}.jpg" loading=lazy><figcaption>{p[0]} · {w}×{hh}</figcaption></figure>')
    h.append('</div>')
open('contact.html','w',encoding='utf-8').write('\n'.join(h)); print('ok')
