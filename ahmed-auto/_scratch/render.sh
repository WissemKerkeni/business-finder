#!/bin/sh
# Render copies of stitch/desktop-final.html (hero pinned, map eager) -> headless Edge screenshots:
# desktop 1440, mobile 375 (iframe), stock filter state, open car panel. Then trim and slice.
cd "$(dirname "$0")/.."
python - <<'PY'
s = open('stitch/desktop-final.html', encoding='utf-8').read()
s = s.replace('loading="lazy" referrerpolicy', 'loading="eager" referrerpolicy').replace('loading="lazy"', 'loading="eager"')
pin = '#top{min-height:0!important;height:900px!important;max-height:none!important}\n</style>'
open('stitch/render.html', 'w', encoding='utf-8').write(s.replace('</style>', pin, 1))
f = s.replace('</style>', pin, 1).replace("apply();\n\n  // ---------- Car dialog", "state.make='Mercedes-Benz'; apply();\n\n  // ---------- Car dialog")
open('stitch/render-filter.html', 'w', encoding='utf-8').write(f)
p = s.replace('</style>', pin, 1).replace("window.addEventListener('hashchange', fromHash); fromHash();", "open('cupra-formentor', false);")
open('stitch/render-panel.html', 'w', encoding='utf-8').write(p)
m = s.replace('</style>', '#top{min-height:812px!important;height:auto!important}\n#actionbar{display:none!important}\n</style>', 1)
open('stitch/render-mobile.html', 'w', encoding='utf-8').write(m)
open('stitch/mobile-frame.html', 'w', encoding='utf-8').write(
    '<html><body style="margin:0;background:#333"><iframe src="render-mobile.html" '
    'style="width:375px;height:14000px;border:0;display:block"></iframe></body></html>')
PY
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
W=$(cygpath -w "$PWD/_scratch")
B=http://localhost:4184/stitch
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,9000 --screenshot="$W\final.png" $B/render.html 2>/dev/null
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,2400 --screenshot="$W\filter.png" $B/render-filter.html 2>/dev/null
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,900 --screenshot="$W\panel.png" $B/render-panel.html 2>/dev/null
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=500,14000 --screenshot="$W\mobile.png" $B/mobile-frame.html 2>/dev/null
cd _scratch && rm -f final-*.jpg mobile-*.jpg
python - <<'PY'
from PIL import Image
import numpy as np
for name, w, step, scale in (('final', 1440, 1300, 2/3), ('mobile', 375, 1500, 1), ('filter', 1440, 99999, 2/3), ('panel', 1440, 99999, 2/3)):
    im = Image.open(name + '.png').convert('RGB'); im = im.crop((0, 0, w, im.height))
    a = np.asarray(im).astype(int); bg = a[-1].mean(axis=0)
    rows = np.where(np.abs(a - bg).sum(axis=2).max(axis=1) > 30)[0]
    H = (rows.max() + 1) if len(rows) else im.height; im = im.crop((0, 0, w, H)); im.save(name + '-full.jpg', quality=82); print(name, im.size)
    if step > 90000: continue
    for k, y in enumerate(range(0, H, step)):
        c = im.crop((0, y, w, min(H, y + step))); c = c.resize((int(c.width * scale), int(c.height * scale)))
        c.save(f'{name}-{k:02d}.jpg', quality=80)
PY
