#!/bin/sh
# Screenshot the built site (preview on :4177): desktop 1440 (hero pinned) + mobile 375 (iframe, 100svh pinned to 812px)
cd "$(dirname "$0")/.."
python - <<'PY'
s = open('site/dist/index.html', encoding='utf-8').read()
open('site/dist/render.html', 'w', encoding='utf-8').write(s)
m = s.replace('</head>', '<style>#top{min-height:812px!important}</style></head>', 1)
open('site/dist/render-mobile.html', 'w', encoding='utf-8').write(m)
open('site/dist/mobile-frame.html', 'w', encoding='utf-8').write(
    '<html><body style="margin:0;background:#333"><iframe src="render-mobile.html" '
    'style="width:375px;height:14000px;border:0;display:block"></iframe></body></html>')
PY
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
W=$(cygpath -w "$PWD/_scratch")
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,8000 --screenshot="$W\site.png" http://localhost:4177/render.html 2>/dev/null
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=500,14000 --screenshot="$W\site-m.png" http://localhost:4177/mobile-frame.html 2>/dev/null
cd _scratch && python - <<'PY'
from PIL import Image
import numpy as np
for name, w in (('site', 1440), ('site-m', 375)):
    im = Image.open(name + '.png').convert('RGB'); im = im.crop((0, 0, w, im.height))
    a = np.asarray(im).astype(int); bg = a[-1].mean(axis=0)
    rows = np.where(np.abs(a - bg).sum(axis=2).max(axis=1) > 30)[0]
    im = im.crop((0, 0, w, rows.max() + 1)); im.save(name + '-full.jpg', quality=82); print(name, im.size)
PY
