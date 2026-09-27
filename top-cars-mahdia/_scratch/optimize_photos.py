"""Originals (_scratch/photos-raw) -> site/public/photos/<id>-<w>.webp (+ og.jpg) and src/data/photos.json.
Same crops as prep_photos.py. Long side capped at 1600 (hero 2400); widths 640/1024/1600(/2400) up to that. Quality 82. Never upscales."""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / '_scratch' / 'photos-raw'
OUT = ROOT / 'site' / 'public' / 'photos'
SRC = {
    'hero':          ('maps_10.jpg', (0, 0.34, 1, 0.93), True),
    'eljemArches':   ('maps_03.jpg', None, False),
    'capMahdia':     ('maps_07.jpg', None, False),
    'terrasse':      ('maps_04.jpg', (0, 0.1, 1, 0.85), False),
    'musee':         ('maps_05.jpg', (0, 0.15, 1, 0.9), False),
    'rueDromadaire': ('maps_08.jpg', None, False),
}
OUT.mkdir(parents=True, exist_ok=True)
for p in OUT.iterdir():
    p.unlink()
meta = {}
for key, (f, crop, hero) in SRC.items():
    im = ImageOps.exif_transpose(Image.open(RAW / f)).convert('RGB')
    w, h = im.size
    if crop:
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    cap = 2400 if hero else 1600  # max long side
    im.thumbnail((cap, cap), Image.LANCZOS)
    widths = [x for x in ([640, 1024, 1600, 2400] if hero else [640, 1024, 1600]) if x <= im.width] or [im.width]
    if im.width not in widths and im.width < (2400 if hero else 1600):
        widths.append(im.width)
    for x in widths:
        r = im.resize((x, round(im.height * x / im.width)), Image.LANCZOS) if x != im.width else im
        r.save(OUT / f'{key}-{x}.webp', 'WEBP', quality=82, method=6)
    meta[key] = {'w': im.width, 'h': im.height, 'widths': sorted(widths)}
    if hero:
        og = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.4))
        og.save(OUT / 'og.jpg', quality=82, optimize=True)
(ROOT / 'site' / 'src' / 'data' / 'photos.json').write_text(json.dumps(meta, indent=2))
tot = sum(p.stat().st_size for p in OUT.iterdir())
print(len(meta), 'photos,', len(list(OUT.iterdir())), 'files,', tot // 1024, 'KB total; hero sizes:',
      {p.name: p.stat().st_size // 1024 for p in OUT.glob('hero-*')})
