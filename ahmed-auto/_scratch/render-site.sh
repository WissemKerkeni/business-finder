#!/bin/sh
# Screenshot the built site (npm run preview on :4178): desktop 1440 with the hero pinned to 900px,
# and mobile 375 through an iframe (headless Edge cannot go below ~500px). Render copies live in dist/ only.
cd "$(dirname "$0")/.."
python - <<'PY'
s = open('site/dist/index.html', encoding='utf-8').read()
open('site/dist/render.html', 'w', encoding='utf-8').write(
    s.replace('</head>', '<style>#top{height:900px!important;min-height:0!important;max-height:none!important}</style></head>', 1))
open('site/dist/render-mobile.html', 'w', encoding='utf-8').write(
    s.replace('</head>', '<style>#top{min-height:812px!important;height:auto!important}nav[aria-label="Actions rapides"]{display:none!important}</style></head>', 1))
open('site/dist/mobile-frame.html', 'w', encoding='utf-8').write(
    '<html><body style="margin:0;background:#333"><iframe src="render-mobile.html" style="width:375px;height:14000px;border:0;display:block"></iframe></body></html>')
PY
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
W=$(cygpath -w "$PWD/_scratch")
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=20000 --window-size=1440,9000 --screenshot="$W\site.png" http://localhost:4178/render.html 2>/dev/null
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=20000 --window-size=500,14000 --screenshot="$W\site-m.png" http://localhost:4178/mobile-frame.html 2>/dev/null
rm -f site/dist/render.html site/dist/render-mobile.html site/dist/mobile-frame.html
cd _scratch && rm -f site-0*.jpg
python - <<'PY'
from PIL import Image
import numpy as np
for name, w in (('site', 1440), ('site-m', 375)):
    im = Image.open(name + '.png').convert('RGB'); im = im.crop((0, 0, w, im.height))
    a = np.asarray(im).astype(int); bg = a[-1].mean(axis=0)
    rows = np.where(np.abs(a - bg).sum(axis=2).max(axis=1) > 30)[0]
    im = im.crop((0, 0, w, rows.max() + 1)); im.save(name + '-full.jpg', quality=82); print(name, im.size)
    if name == 'site':
        for k, y in enumerate(range(0, im.height, 1300)):
            c = im.crop((0, y, w, min(im.height, y + 1300))); c.resize((c.width * 2 // 3, c.height * 2 // 3)).save(f'site-{k:02d}.jpg', quality=80)
PY
