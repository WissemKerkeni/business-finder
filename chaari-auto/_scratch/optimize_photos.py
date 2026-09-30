"""_scratch/kept/*.jpg -> <out>/<key>-<w>.webp (+ og.jpg) and <out>/../photos.json-like meta (path given).
Long side capped at 1600 (hero 2400); widths 640/1024/1600(/2400). Quality 82. Never upscales.
usage: python optimize_photos.py <outdir> <meta.json>"""
import json, sys
from pathlib import Path
from PIL import Image, ImageOps
KEPT=Path(__file__).resolve().parent/'kept'; OUT=Path(sys.argv[1]); META=Path(sys.argv[2])
HERO={'hero'}
OUT.mkdir(parents=True,exist_ok=True)
for p in OUT.glob('*.webp'): p.unlink()
meta={}
for f in sorted(KEPT.glob('*.jpg')):
    key=f.stem; im=ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    hero=key in HERO; cap=2000 if hero else 1600; q=74 if hero else 82
    im.thumbnail((cap,cap),Image.LANCZOS)
    targets=[640,1024,1600,2000] if hero else [640,1024,1600]
    widths=[x for x in targets if x<=im.width] or [im.width]
    if im.width not in widths and im.width<targets[-1]: widths.append(im.width)
    for x in widths:
        r=im.resize((x,round(im.height*x/im.width)),Image.LANCZOS) if x!=im.width else im
        r.save(OUT/f'{key}-{x}.webp','WEBP',quality=q,method=6)
    meta[key]={'w':im.width,'h':im.height,'widths':sorted(widths)}
    if key=='cta':
        ImageOps.fit(im,(1200,630),Image.LANCZOS,centering=(0.35,0.5)).save(OUT/'og.jpg',quality=82,optimize=True)
META.write_text(json.dumps(meta,indent=1))
tot=sum(p.stat().st_size for p in OUT.iterdir())
print(len(meta),'photos,',len(list(OUT.iterdir())),'files,',tot//1024,'KB; hero:',{p.name:p.stat().st_size//1024 for p in OUT.glob('hero-*')})
