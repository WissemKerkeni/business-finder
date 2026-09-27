"""Build hlila-rent-car/stitch/desktop-final.html from the latest Stitch export.

Keeps Stitch's header, hero, how-to-book, delivery, reviews, contact, CTA and
footer. Rebuilds the fleet and gallery from data, points every image at the
local photos (with width/height), wires the request bar / filters / photo
cycling to WhatsApp, and adds the mobile pass (drawer, sticky chips, bottom
action bar). Run: python hlila-rent-car/_scratch/build_final.py [src]
"""
import html
import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "stitch" / "desktop-v1.html"
OUT = ROOT / "stitch" / "desktop-final.html"
PHOTOS = ROOT / "stitch" / "photos"

WA = "21624200450"
MAPS_URL = "https://www.google.com/maps?cid=7663601000825115734"
DIR_URL = "https://www.google.com/maps/dir/?api=1&destination=35.7737102,10.8334399"
FB_URL = "https://www.facebook.com/people/Hlila-Rent-Car/61561616923566/"
IG_URL = "https://www.instagram.com/hlila_rentcar_monastir/"

# --- Fleet: Feb 2026 IG lineup; transmissions from the Nov 2024 flyers only.
# cats: suv / city / sedan ; auto=True if an automatic version is stated.
FLEET = [
    {"model": "MG ZS", "cats": ["suv"], "auto": True, "spec": "SUV · Boîte automatique",
     "photos": [("maps_05", "MG ZS noir sous l'abri de l'agence Hlila Rent Car"),
                ("fb_09", "MG ZS noir dans une rue de Monastir"),
                ("maps_09", "MG ZS noir, vue arrière, centre de Monastir")]},
    {"model": "MG5", "cats": ["sedan"], "auto": True, "spec": "Berline · Automatique ou manuelle",
     "photos": [("maps_02", "MG5 gris sous l'abri de l'agence")]},
    {"model": "Seat Arona", "cats": ["suv"], "auto": True, "spec": "SUV · Boîte automatique",
     "photos": [("ig_arona", "Seat Arona blanc de Hlila Rent Car")]},
    {"model": "Seat Ibiza", "cats": ["city"], "auto": True, "spec": "Citadine · Automatique ou manuelle",
     "photos": [("fb_06", "Seat Ibiza blanche, vue avant"),
                ("fb_04", "Seat Ibiza noire et blanche avec l'autocollant Hlila"),
                ("fb_13", "Seat Ibiza noire")]},
    {"model": "Skoda Fabia", "cats": ["city"], "auto": False, "spec": "Citadine · Boîte manuelle",
     "photos": [("fb_07", "Deux Skoda Fabia blanches"),
                ("fb_11", "Deux Skoda Fabia noires"),
                ("fb_01", "Skoda Fabia grise, noire et bleue")]},
    {"model": "Mahindra XUV300", "cats": ["suv"], "auto": False, "spec": "SUV",
     "photos": [("ig_xuv300", "Mahindra XUV300 blanc, vue avant"),
                ("ig_xuv300_2", "Mahindra XUV300 blanc sous les palmiers")]},
    {"model": "Hyundai i20", "cats": ["city"], "auto": False, "spec": "Citadine · Boîte manuelle",
     "photos": [("fb_15", "Hyundai i20 noire, vue avant"),
                ("fb_10", "Hyundai i20 rouge et blanche")]},
    {"model": "Hyundai i10", "cats": ["city"], "auto": False, "spec": "Citadine · Boîte manuelle",
     "photos": [("maps_10", "Hyundai Grand i10 blanche")]},
    {"model": "Skoda Kushaq", "cats": ["suv"], "auto": True, "spec": "SUV · Boîte automatique", "photos": []},
    {"model": "Skoda Scala", "cats": ["city"], "auto": False, "spec": "Compacte", "photos": []},
]

CHIPS = [("all", "Tous"), ("suv", "SUV"), ("city", "Citadines & compactes"),
         ("sedan", "Berline"), ("auto", "Automatique")]

# 12-col editorial grid: (photo, alt, col-span, row-span)
GALLERY = [
    ("fb_01", "Skoda Fabia de la flotte Hlila Rent Car", "lg:col-span-8", "lg:row-span-2"),
    ("maps_09", "MG ZS noir devant les arcades du centre de Monastir", "lg:col-span-4", ""),
    ("fb_14", "Intérieur MG avec toit panoramique", "lg:col-span-4", ""),
    ("ig_xuv300_2", "Mahindra XUV300 blanc sous les palmiers", "lg:col-span-4", ""),
    ("fb_04", "Seat Ibiza avec l'autocollant Hlila Rent Car", "lg:col-span-4", ""),
    ("fb_10", "Hyundai i20 rouge et blanche", "lg:col-span-4", ""),
]

BANNED = ["kilométrage illimité", "assurance tous risques", "sans caution", "livraison gratuite",
          "ans d'expérience", "véhicules neufs", "voitures neuves", "IMMERSION", "stitch-placeholder",
          "https://facebook.com\"", "href=\"https://maps.google.com\""]

WA_SVG = re.search(r'<svg class="w-3\.5 h-3\.5 fill-current" viewbox="0 0 24 24">\s*<path[^>]*></path>\s*</svg>',
                   SRC.read_text(encoding="utf-8")).group(0)


def size(name):
    with Image.open(PHOTOS / f"{name}.jpg") as im:
        return im.size


def img(name, alt, cls, eager=False, extra=""):
    w, h = size(name)
    load = 'fetchpriority="high"' if eager else 'loading="lazy" decoding="async"'
    return (f'<img src="photos/{name}.jpg" width="{w}" height="{h}" alt="{html.escape(alt)}" '
            f'class="{cls}" {load} {extra}/>')


def wa_link(text):
    from urllib.parse import quote
    return f"https://wa.me/{WA}?text={quote(text)}"


def fleet_html():
    chips = "".join(
        f'<button type="button" data-filter="{k}" aria-pressed="{"true" if k == "all" else "false"}" '
        f'class="chip shrink-0 hairline-all px-4 py-2 rounded-sm-custom whitespace-nowrap transition-colors">{v}</button>'
        for k, v in CHIPS)
    rows = []
    for car in FLEET:
        tags = " ".join(car["cats"] + (["auto"] if car["auto"] else []))
        msg = f"Bonjour, je voudrais louer la {car['model']}. Pouvez-vous m'indiquer la disponibilité et le prix ?"
        btn = (f'<a class="hairline-all hover:bg-swoosh hover:border-swoosh text-chalk font-mono text-xs uppercase '
               f'tracking-wider px-5 py-2.5 rounded-sm-custom inline-flex items-center gap-2.5 transition-colors" '
               f'href="{html.escape(wa_link(msg))}" rel="noopener" target="_blank" data-car="{car["model"]}">'
               f'{WA_SVG}<span>Demander cette voiture</span></a>')
        if not car["photos"]:
            rows.append(f'''<div class="car hairline-b py-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] lg:grid-cols-[260px_1fr_auto_auto] items-center gap-3 lg:gap-8" data-tags="{tags}">
<h3 class="font-condensed font-black text-3xl tracking-tight uppercase text-chalk">{car["model"]}</h3>
<p class="font-mono text-xs text-chalk-dim uppercase tracking-widest">{car["spec"]}</p>
<span class="font-mono text-xs text-chalk-dim/70 uppercase tracking-wider">Prix et photo sur demande</span>
<div>{btn}</div>
</div>''')
            continue
        first, *rest = car["photos"]
        n = len(car["photos"])
        imgs = img(first[0], first[1], "car-img w-full h-full object-cover")
        data = json.dumps([{"src": f"photos/{p}.jpg", "alt": a, "w": size(p)[0], "h": size(p)[1]} for p, a in car["photos"]],
                          ensure_ascii=False)
        counter = (f'<span class="counter absolute bottom-3 right-3 bg-asphalt/80 backdrop-blur font-mono text-[11px] '
                   f'px-2.5 py-1 text-chalk hairline-all pointer-events-none">1/{n}</span>') if n > 1 else ""
        photo = (f'<button type="button" class="cycle block w-full aspect-[16/10] bg-asphalt-light overflow-hidden relative" '
                 f"data-photos='{html.escape(data, quote=True)}' aria-label=\"Photo suivante — {car['model']}\">{imgs}{counter}</button>"
                 if n > 1 else f'<div class="aspect-[16/10] bg-asphalt-light overflow-hidden">{imgs}</div>')
        rows.append(f'''<div class="car hairline-b py-8 lg:py-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10" data-tags="{tags}">
<div class="w-full lg:w-[55%] relative">{photo}</div>
<div class="w-full lg:w-[45%] flex flex-col justify-center">
<h3 class="font-condensed font-black text-4xl lg:text-5xl tracking-tight uppercase text-chalk mb-3">{car["model"]}</h3>
<p class="font-mono text-xs text-chalk-dim uppercase tracking-widest mb-6">{car["spec"]}</p>
<div class="hairline-b w-full mb-6"></div>
<div class="flex flex-wrap items-center justify-between gap-4">
<span class="font-mono font-bold text-sm tracking-wider text-swoosh">PRIX SUR DEMANDE</span>
{btn}
</div>
</div>
</div>''')
    return f'''<section class="w-full py-20 lg:py-24 hairline-b" id="flotte">
<div class="max-w-[1440px] mx-auto px-4 sm:px-8">
<div class="flex flex-col lg:flex-row lg:items-end justify-between mb-6 lg:mb-12 gap-6">
<div>
<span class="font-mono text-xs uppercase tracking-[0.25em] text-swoosh font-bold block mb-2">SÉLECTION</span>
<h2 class="font-condensed font-black text-5xl lg:text-6xl tracking-tight uppercase text-chalk">LA FLOTTE</h2>
<p class="font-body text-chalk-dim text-base mt-2">{len(FLEET)} modèles. Prix sur demande — réponse sur WhatsApp.</p>
</div>
</div>
<div id="chips" role="toolbar" aria-label="Filtrer la flotte" class="sticky top-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 bg-asphalt/95 backdrop-blur flex gap-2 overflow-x-auto text-xs font-mono uppercase tracking-wider mb-2 lg:mb-6 lg:static lg:bg-transparent lg:backdrop-blur-none lg:px-0 lg:mx-0">
{chips}
</div>
<div class="hairline-t" id="fleet-list">
{chr(10).join(rows)}
</div>
<p id="fleet-empty" class="hidden py-10 font-mono text-sm text-chalk-dim">Aucun modèle dans cette catégorie.</p>
</div>
</section>'''


def gallery_html():
    tiles = "\n".join(
        f'<figure class="{c} {r} overflow-hidden bg-asphalt-light min-h-[240px]">'
        f'{img(p, a, "w-full h-full object-cover hover:scale-105 transition-transform duration-500")}</figure>'
        for p, a, c, r in GALLERY)
    return f'''<section class="w-full py-20 lg:py-24 hairline-b">
<div class="max-w-[1440px] mx-auto px-4 sm:px-8">
<span class="font-mono text-xs uppercase tracking-[0.25em] text-swoosh font-bold block mb-2">EN IMAGES</span>
<h2 class="font-condensed font-black text-5xl lg:text-6xl tracking-tight uppercase text-chalk mb-10 lg:mb-12">GALERIE</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[280px] gap-3">
{tiles}
</div>
</div>
</section>'''


def replace_section(s, start_pat, new):
    m = re.search(start_pat, s)
    assert m, start_pat
    end = s.index("</section>", m.start()) + len("</section>")
    return s[:m.start()] + new + s[end:]


MOBILE_EXTRAS = f'''
<!-- Mobile drawer -->
<div id="drawer" class="fixed inset-0 z-[60] hidden lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
<div class="absolute inset-0 bg-asphalt/80" data-close></div>
<nav class="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-asphalt hairline-l p-6 flex flex-col gap-1 font-mono uppercase tracking-widest text-sm">
<button type="button" class="self-end text-chalk text-2xl mb-6" data-close aria-label="Fermer">✕</button>
<a class="py-3 hairline-b" href="#flotte" data-close>Flotte</a>
<a class="py-3 hairline-b" href="#reserver" data-close>Réserver</a>
<a class="py-3 hairline-b" href="#livraison" data-close>Livraison</a>
<a class="py-3 hairline-b" href="#avis" data-close>Avis</a>
<a class="py-3 hairline-b" href="#contact" data-close>Contact</a>
<p class="mt-8 text-[11px] text-chalk-dim normal-case tracking-normal">Ouvert tous les jours, 24h/24<br/>Derrière la municipalité, Monastir</p>
<a class="mt-4 text-chalk" href="tel:+21624200450">+216 24 200 450</a>
<a class="mt-2 text-chalk" href="tel:+21658900450">+216 58 900 450</a>
</nav>
</div>
<!-- Mobile bottom action bar -->
<nav id="actionbar" aria-label="Actions rapides" class="fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 bg-asphalt hairline-t font-mono text-[11px] uppercase tracking-wider translate-y-full transition-transform lg:hidden">
<a class="py-4 text-center text-chalk hairline-r" href="tel:+21624200450">Appeler</a>
<a class="py-4 text-center text-chalk bg-swoosh" href="https://wa.me/{WA}" target="_blank" rel="noopener">WhatsApp</a>
<a class="py-4 text-center text-chalk hairline-l" href="{DIR_URL}" target="_blank" rel="noopener">Itinéraire</a>
</nav>
'''

SCRIPT = f'''
<script>
(() => {{
  const WA = "{WA}";
  // Fleet filters
  const chips = [...document.querySelectorAll('#chips .chip')];
  const cars = [...document.querySelectorAll('#fleet-list .car')];
  const setChip = (k) => {{
    chips.forEach(c => {{ const on = c.dataset.filter === k; c.setAttribute('aria-pressed', on);
      c.classList.toggle('bg-swoosh', on); c.classList.toggle('border-swoosh', on); c.classList.toggle('text-chalk', on);
      c.classList.toggle('font-bold', on); c.classList.toggle('text-chalk-dim', !on); }});
    let n = 0;
    cars.forEach(el => {{ const show = k === 'all' || el.dataset.tags.split(' ').includes(k); el.hidden = !show; if (show) n++; }});
    document.getElementById('fleet-empty').classList.toggle('hidden', n > 0);
  }};
  chips.forEach(c => c.addEventListener('click', () => setChip(c.dataset.filter)));
  setChip('all');
  // Photo cycling
  document.querySelectorAll('.cycle').forEach(btn => {{
    const list = JSON.parse(btn.dataset.photos); let i = 0;
    const im = btn.querySelector('img'); const ct = btn.querySelector('.counter');
    btn.addEventListener('click', () => {{ i = (i + 1) % list.length; const p = list[i];
      im.src = p.src; im.alt = p.alt; im.width = p.w; im.height = p.h; if (ct) ct.textContent = (i + 1) + '/' + list.length; }});
  }});
  // Request bar -> WhatsApp
  const f = document.getElementById('request');
  const fmt = (v) => v ? v.split('-').reverse().join('/') : '';
  const out = document.getElementById('rq-error');
  const build = () => {{
    const lieuSel = f.lieu.value; const autre = f.autre.value.trim();
    const LIEUX = {{ 'Agence — Monastir': "l'agence de Monastir", 'Aéroport': "l'aéroport" }};
    const lieu = lieuSel === 'Autre adresse' ? (autre || 'une autre adresse') : (LIEUX[lieuSel] || lieuSel);
    const car = f.car.value === 'Toutes' ? 'une voiture' : 'la ' + f.car.value;
    let t = 'Bonjour, je voudrais louer ' + car;
    if (f.from.value) t += ' du ' + fmt(f.from.value);
    if (f.to.value) t += ' au ' + fmt(f.to.value);
    t += ', prise en charge à ' + lieu + '.';
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);
  }};
  f.lieu.addEventListener('change', () => document.getElementById('autre-wrap').classList.toggle('hidden', f.lieu.value !== 'Autre adresse'));
  f.from.addEventListener('change', () => {{ f.to.min = f.from.value; }});
  f.addEventListener('submit', (e) => {{
    e.preventDefault();
    if (f.from.value && f.to.value && f.to.value <= f.from.value) {{
      out.textContent = 'La date de retour doit être après la date de départ.'; out.classList.remove('hidden'); f.to.focus(); return;
    }}
    out.classList.add('hidden');
    const url = build(); f.dataset.last = url; window.open(url, '_blank', 'noopener');
  }});
  const today = new Date().toISOString().slice(0, 10); f.from.min = today; f.to.min = today;
  // Drawer
  const drawer = document.getElementById('drawer');
  document.getElementById('menu-btn').addEventListener('click', () => drawer.classList.remove('hidden'));
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => drawer.classList.add('hidden')));
  // Action bar after hero
  const bar = document.getElementById('actionbar'); const hero = document.getElementById('top');
  new IntersectionObserver(([e]) => bar.classList.toggle('translate-y-full', e.isIntersecting)).observe(hero);
}})();
</script>
'''


def build():
    s = SRC.read_text(encoding="utf-8")

    # Head / meta
    s = re.sub(r"<title>.*?</title>", "<title>Hlila Rent Car — Location de voitures à Monastir</title>\n"
               '<meta name="description" content="Hlila Rent Car, location de voitures à Monastir : citadines, berlines et SUV en boîte manuelle ou automatique. Demande sur WhatsApp au +216 24 200 450."/>',
               s, flags=re.S)
    s = s.replace("mx-auto px-8", "mx-auto px-4 sm:px-8")
    s = s.replace("</style>", "  [hidden]{display:none!important}\n    #chips::-webkit-scrollbar{display:none}\n  </style>", 1)

    # Header: responsive nav + drawer button
    s = s.replace('<nav class="flex items-center space-x-8 text-xs',
                  '<nav class="hidden lg:flex items-center space-x-8 text-xs')
    s = s.replace('<div class="flex items-center space-x-6">\n<a class="font-mono text-sm',
                  '<div class="flex items-center gap-4 lg:gap-6">\n<a class="hidden sm:inline font-mono text-sm')
    s = s.replace("</div>\n</div>\n</header>",
                  '<button id="menu-btn" type="button" class="lg:hidden text-chalk text-2xl leading-none" aria-label="Ouvrir le menu">☰</button>\n'
                  "</div>\n</div>\n</header>", 1)

    # Hero: real photo, mobile full-bleed
    s = s.replace('<section class="relative h-[900px] w-full flex flex-col justify-end overflow-hidden hairline-b">',
                  '<section id="top" class="relative min-h-[100svh] lg:min-h-0 lg:h-[900px] w-full flex flex-col justify-end overflow-hidden hairline-b pt-28">')
    s = re.sub(r'<img alt="White MG ZS[^>]*/>',
               img("maps_06", "MG ZS blanc, MG5 gris et MG ZS noir alignés sous l'abri de Hlila Rent Car à Monastir",
                   "w-full h-full object-cover object-center", eager=True), s)
    s = s.replace('class="font-condensed font-black text-6xl md:text-7xl lg:text-8xl',
                  'class="font-condensed font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl')

    # Request bar: named fields, 'Autre adresse' text field, validation message
    s = s.replace('<form class="grid grid-cols-1 md:grid-cols-5 gap-3 items-end" onsubmit="event.preventDefault(); window.open(\'https://wa.me/21624200450\', \'_blank\');">',
                  '<form id="request" novalidate class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">')
    sel = 'class="bg-asphalt-light hairline-all text-chalk text-xs font-mono py-2.5 px-3 rounded-sm-custom focus:outline-none focus:border-swoosh cursor-pointer"'
    s = s.replace(f'<select {sel}>\n<option>Agence — Monastir</option>',
                  f'<select name="lieu" aria-label="Lieu de prise en charge" {sel}>\n<option>Agence — Monastir</option>', 1)
    s = s.replace(f'<select {sel}>\n<option>Toutes</option>',
                  f'<select name="car" aria-label="Voiture" {sel}>\n<option>Toutes</option>', 1)
    inp = 'class="bg-asphalt-light hairline-all text-chalk text-xs font-mono py-2 px-3 rounded-sm-custom focus:outline-none focus:border-swoosh" type="date"/>'
    s = s.replace(f'<input {inp}', f'<input name="from" aria-label="Date de départ" style="color-scheme:dark" {inp}', 1)
    s = s.replace(f'<input {inp}', f'<input name="to" aria-label="Date de retour" style="color-scheme:dark" {inp}', 1)
    s = s.replace('<button class="bg-swoosh hover:bg-swoosh-hover text-chalk font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-sm-custom h-[42px]',
                  '<div id="autre-wrap" class="hidden flex flex-col sm:col-span-2 lg:col-span-5 order-last">'
                  '<label class="font-mono text-[10px] uppercase tracking-wider text-chalk-dim mb-1.5" for="autre">Adresse de prise en charge</label>'
                  '<input id="autre" name="autre" type="text" placeholder="Hôtel, adresse…" class="bg-asphalt-light hairline-all text-chalk text-xs font-mono py-2.5 px-3 rounded-sm-custom focus:outline-none focus:border-swoosh"/></div>\n'
                  '<button class="sm:col-span-2 lg:col-span-1 bg-swoosh hover:bg-swoosh-hover text-chalk font-mono text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-sm-custom h-[42px]', 1)
    s = s.replace("rien n'est envoyé ailleurs.\n        </p>",
                  "rien n'est envoyé ailleurs.\n        </p>\n<p id=\"rq-error\" role=\"alert\" class=\"hidden font-mono text-[11px] text-swoosh mt-2\"></p>", 1)

    # Fleet + gallery rebuilt from data
    s = replace_section(s, r'<section class="w-full py-24 hairline-b" id="flotte">', fleet_html())
    g0 = s.rindex("<section", 0, s.index("IMMERSION"))
    g1 = s.index("</section>", g0) + len("</section>")
    s = s[:g0] + gallery_html() + s[g1:]

    # Delivery photo
    s = re.sub(r'<img alt="Black MG ZS on a Monastir street[^>]*/>',
               img("fb_09", "MG ZS noir de Hlila Rent Car dans une rue de Monastir", "w-full h-full object-cover"), s)

    # Links
    s = s.replace('href="https://facebook.com"', f'href="{FB_URL}"')
    s = s.replace('href="https://instagram.com/hlila_rentcar_monastir"', f'href="{IG_URL}"')
    s = s.replace('href="https://maps.google.com"', f'href="{MAPS_URL}"')
    s = re.sub(r'href="https://maps\.google\.com/\?q=35\.77371[^"]*"', f'href="{html.escape(DIR_URL)}"', s)
    s = s.replace('<footer class="w-full py-12 bg-asphalt">', '<footer class="w-full py-12 pb-24 lg:pb-12 bg-asphalt">')
    # Footer: stack cleanly on mobile
    s = s.replace('<div class="flex items-center space-x-6">\n<div>\n<span class="font-condensed font-black italic text-xl',
                  '<div class="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">\n<div>\n<span class="whitespace-nowrap font-condensed font-black italic text-xl')
    s = s.replace('<div class="flex items-center space-x-6 font-mono text-xs tracking-wider uppercase text-chalk-dim">',
                  '<div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 font-mono text-xs tracking-wider uppercase text-chalk-dim">')

    # Mobile extras + behaviour
    s = s.replace("</body>", MOBILE_EXTRAS + SCRIPT + "</body>")

    for b in BANNED:
        assert b not in s, f"banned/leftover: {b}"
    assert "photos/maps_06.jpg" in s and s.count('class="car ') == len(FLEET)
    OUT.write_text(s, encoding="utf-8")
    print("wrote", OUT, len(s), "bytes;", s.count("<img"), "imgs")


if __name__ == "__main__":
    build()
