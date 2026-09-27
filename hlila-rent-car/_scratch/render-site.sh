#!/bin/sh
# Render desktop (1440) + mobile (375 iframe) screenshots of stitch/render*.html and slice them
E="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
W=$(cygpath -w "$PWD")
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=1440,11500 --screenshot="$W\site.png" http://localhost:4176/render.html 2>/dev/null
"$E" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 --window-size=500,16000 --screenshot="$W\site-m.png" http://localhost:4176/mobile-frame.html 2>/dev/null
rm -f site-*.jpg site-m-*.jpg
python - <<'PY'
from PIL import Image
import numpy as np
for name,w,step,scale in (('site',1440,1300,2/3),('site-m',375,1500,1)):
    im=Image.open(name+'.png').convert('RGB').crop((0,0,w,Image.open(name+'.png').height))
    a=np.asarray(im); bg=a[-1].mean(axis=0); diff=np.abs(a-bg).sum(axis=2).max(axis=1); rows=np.where(diff>30)[0]
    H=rows.max()+1; im=im.crop((0,0,w,H)); im.save(name+'-full.jpg',quality=82); print(name,im.size)
    for k,y in enumerate(range(0,H,step)):
        c=im.crop((0,y,w,min(H,y+step))); c=c.resize((int(c.width*scale),int(c.height*scale))); c.save(f'{name}-{k:02d}.jpg',quality=80)
PY
