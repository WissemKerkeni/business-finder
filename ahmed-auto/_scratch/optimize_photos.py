"""Kept photos (_scratch/kept, plates already blurred by prep_photos.py) -> site/public/photos/<key>-<w>.webp + og.jpg,
and site/src/data/photos.json. Long side capped at 1600 (hero 2400); widths 640/1024/1600(/2400). Quality 82. Never upscales."""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
KEPT = ROOT / '_scratch' / 'kept'
OUT = ROOT / 'site' / 'public' / 'photos'
HERO = 'showroom-1'
SKIP = {'logo', 'showroom-exterior'}  # logo is a reference only; façade panorama fails the quality gate
OUT.mkdir(parents=True, exist_ok=True)
for p in OUT.iterdir():
    p.unlink()
meta = {}
for f in sorted(KEPT.glob('*.jpg')):
    key = f.stem
    if key in SKIP:
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    hero = key == HERO
    cap = 2400 if hero else 1600
    im.thumbnail((cap, cap), Image.LANCZOS)
    targets = [640, 1024, 1600, 2400] if hero else [640, 1024, 1600]
    widths = [x for x in targets if x <= im.width] or [im.width]
    if im.width not in widths and im.width < targets[-1]:
        widths.append(im.width)
    for x in widths:
        r = im.resize((x, round(im.height * x / im.width)), Image.LANCZOS) if x != im.width else im
        r.save(OUT / f'{key}-{x}.webp', 'WEBP', quality=82, method=6)
    meta[key] = {'w': im.width, 'h': im.height, 'widths': sorted(widths)}
    if hero:
        ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.6, 0.55)).save(OUT / 'og.jpg', quality=82, optimize=True)
(ROOT / 'site' / 'src' / 'data' / 'photos.json').write_text(json.dumps(meta, indent=1))
tot = sum(p.stat().st_size for p in OUT.iterdir())
print(len(meta), 'photos,', len(list(OUT.iterdir())), 'files,', tot // 1024, 'KB; hero:',
      {p.name: p.stat().st_size // 1024 for p in OUT.glob(HERO + '-*')})
