"""Originals (_scratch/photos-raw) -> site/public/photos/<id>-<w>.webp (+ og.jpg) and src/data/photos.json.
Same crops as prep_photos.py. Widths 640/1024/1600, plus 2400 for the hero. Quality 82. Never upscales."""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / '_scratch' / 'photos-raw'
OUT = ROOT / 'site' / 'public' / 'photos'
SRC = {
    'hero':        ('maps_06.jpg', (0, 0.3, 1, 1), True),
    'mgzs':        ('maps_05.jpg', (0, 0.3, 1, 0.95), False),
    'mgzsStreet':  ('fb_09_387230.jpg', (0, 0.2, 1, 0.9), False),
    'mgzsRear':    ('maps_09.jpg', None, False),
    'mg5':         ('maps_02.jpg', (0, 0.25, 0.62, 1), False),
    'arona':       ('ig_C_XmGiyMPct_01.webp', None, False),
    'ibiza':       ('fb_06_387230.jpg', (0, 0.3, 1, 1), False),
    'ibizaDuo':    ('fb_04_387230.jpg', (0, 0.35, 1, 1), False),
    'ibizaBlack':  ('fb_13_387230.jpg', None, False),
    'fabia':       ('fb_07_387230.jpg', (0, 0.28, 1, 0.62), False),
    'fabiaBlack':  ('fb_11_387230.jpg', (0, 0.5, 1, 0.82), False),
    'fabiaTrio':   ('fb_01_387230.jpg', (0, 0.15, 1, 0.85), False),
    'xuv300':      ('ig_DIyXF4nMYNj_01.webp', None, False),
    'xuv300Palms': ('ig_DIyXF4nMYNj_03.webp', None, False),
    'i20':         ('fb_15_387230.jpg', (0, 0.12, 1, 0.8), False),
    'i20Trio':     ('fb_10_387230.jpg', (0.2, 0, 1, 1), False),
    'i10':         ('maps_10.jpg', (0.35, 0.2, 1, 1), False),
    'interior':    ('fb_14_387230.jpg', None, False),
}
meta = {}
for key, (f, crop, hero) in SRC.items():
    im = ImageOps.exif_transpose(Image.open(RAW / f)).convert('RGB')
    w, h = im.size
    if crop:
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    widths = [x for x in ([640, 1024, 1600, 2400] if hero else [640, 1024, 1600]) if x <= im.width] or [im.width]
    if im.width not in widths and im.width < (2400 if hero else 1600):
        widths.append(im.width)
    for x in widths:
        r = im.resize((x, round(im.height * x / im.width)), Image.LANCZOS) if x != im.width else im
        r.save(OUT / f'{key}-{x}.webp', 'WEBP', quality=82, method=6)
    meta[key] = {'w': im.width, 'h': im.height, 'widths': sorted(widths)}
    if hero:
        og = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
        og.save(OUT / 'og.jpg', quality=82, optimize=True)
(ROOT / 'site' / 'src' / 'data' / 'photos.json').write_text(json.dumps(meta, indent=2))
tot = sum(p.stat().st_size for p in OUT.iterdir())
print(len(meta), 'photos,', len(list(OUT.iterdir())), 'files,', tot // 1024, 'KB total; hero sizes:',
      {p.name: p.stat().st_size // 1024 for p in OUT.glob('hero-*')})
