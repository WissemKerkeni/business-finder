#!/bin/sh
# Screenshot the built site (npm run preview on :4179): desktop 1440 with the hero pinned to 900px,
# and mobile 375 through an iframe (headless Edge cannot go below ~500px). Render copies live in dist/ only.
cd "$(dirname "$0")/.."
python - <<'PY'
s = open('site/dist/index.html', encoding='utf-8').read().replace('loading="lazy"', 'loading="eager"').replace('decoding="async"', 'decoding="sync"')
open('site/dist/render.html', 'w', encoding='utf-8').write(
    s.replace('</head>', '<style>#top{height:900px!important;min-height:0!important;max-height:none!important}</style></head>', 1))
open('site/dist/render-mobile.html', 'w', encoding='utf-8').write(
    s.replace('</head>', '<style>#top{min-height:812px!important;height:812px!important}nav[aria-label="Actions rapides"]{display:none!important}</style></head>', 1))
open('site/dist/mobile-frame.html', 'w', encoding='utf-8').write(
    '<html><body style="margin:0;background:#333"><iframe src="render-mobile.html" style="width:375px;height:15000px;border:0;display:block"></iframe></body></html>')
PY
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
W=$(cygpath -w "$PWD/_scratch")
rm -f _scratch/site.png _scratch/site-m.png
shot() {
  for i in 1 2 3; do
    "$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=40000 --window-size=$2 --screenshot="$W/$1.png" "http://localhost:4179/$3" 2>/dev/null
    for t in $(seq 1 30); do [ -f "_scratch/$1.png" ] && sleep 2 && return 0; sleep 1; done
  done
  echo "FAILED $1"
}
shot site 1440,10000 render.html
shot site-m 500,15000 mobile-frame.html
rm -f site/dist/render.html site/dist/render-mobile.html site/dist/mobile-frame.html
cd _scratch && rm -f site-0*.jpg site-m-0*.jpg
python - <<'PY'
from PIL import Image
import numpy as np
for name, w, step in (('site', 1440, 1300), ('site-m', 375, 1600)):
    im = Image.open(name + '.png').convert('RGB'); im = im.crop((0, 0, w, im.height))
    a = np.asarray(im).astype(int); bg = a[-1].mean(axis=0)
    rows = np.where(np.abs(a - bg).sum(axis=2).max(axis=1) > 30)[0]
    im = im.crop((0, 0, w, rows.max() + 1)); im.save(name + '-full.jpg', quality=82); print(name, im.size)
    for k, y in enumerate(range(0, im.height, step)):
        c = im.crop((0, y, w, min(im.height, y + step)))
        if w > 1000: c = c.resize((c.width * 2 // 3, c.height * 2 // 3))
        c.save(f'{name}-{k:02d}.jpg', quality=80)
PY
