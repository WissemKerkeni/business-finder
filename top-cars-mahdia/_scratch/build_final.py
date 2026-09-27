"""Build top-cars-mahdia/stitch/desktop-final.html from the latest Stitch export.

Keeps Stitch's header, red band, services, how-to-book, reviews, contact
details, CTA and footer. Rebuilds the hero (real photo + responsive request
bar), the fleet and the gallery from data, replaces the fake map with a real
Google Maps embed, fixes invented labels, and adds the mobile pass (drawer,
sticky chips, bottom action bar). Run: python top-cars-mahdia/_scratch/build_final.py [src]
"""
import html
import re
import sys
from pathlib import Path
from urllib.parse import quote

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "stitch" / "desktop-v1.html"
OUT = ROOT / "stitch" / "desktop-final.html"
PHOTOS = ROOT / "stitch" / "photos"

WA = "21650202203"
TEL = "tel:+21650202203"
LAT, LNG = "35.5086681", "11.0510304"
MAPS_URL = "https://www.google.com/maps?cid=2909918206863715188"
DIR_URL = f"https://www.google.com/maps/dir/?api=1&destination={LAT},{LNG}"
EMBED = f"https://maps.google.com/maps?q={LAT},{LNG}&z=17&output=embed"
FB_URL = "https://www.facebook.com/people/Top-Car-Mahdia/100092415699639/"

# --- Fleet: every model shown in the agency's own Facebook posts (see brief.md).
# No transmission / fuel / price is published; seats only for the van (Google reviews).
FLEET = [
    {"model": "Kia Picanto", "cat": "city", "spec": "Citadine"},
    {"model": "Fiat 500", "cat": "city", "spec": "Citadine"},
    {"model": "Kia Rio", "cat": "city", "spec": "Citadine"},
    {"model": "MG 5", "cat": "sedan", "spec": "Berline"},
    {"model": "MG ZS", "cat": "sedan", "spec": "SUV"},
    {"model": "Peugeot Expert / Traveller", "cat": "van", "spec": "Van · jusqu'à 9 places"},
    {"model": "Utilitaires", "sub": "Citroën Berlingo, Jumpy", "cat": "util", "spec": "Utilitaire"},
]
CHIPS = [("all", "Tous"), ("city", "Citadines"), ("sedan", "Berlines & SUV"), ("van", "Vans"), ("util", "Utilitaires")]

# (photo, alt/caption, wrapper col classes, aspect classes)
GALLERY = [
    ("eljem_arches", "Arcades de l'amphithéâtre d'El Jem", "col-span-12 lg:col-span-7", "aspect-[16/10]"),
    ("cap_mahdia", "Le cap de Mahdia, bord de mer et porte en ruine", "col-span-12 lg:col-span-5", "aspect-[16/10] lg:aspect-auto lg:h-[calc(100%-2rem)]"),
    ("terrasse", "Terrasse de café vue mer aux parasols bleus", "col-span-12 md:col-span-4", "aspect-[4/3]"),
    ("musee", "Galerie de musée aux arcades blanches et statues", "col-span-12 md:col-span-4", "aspect-[4/3]"),
    ("rue_dromadaire", "Scène de rue avec dromadaire, en excursion", "col-span-12 md:col-span-4", "aspect-[4/3]"),
]

BANNED = ["kilométrage illimité", "assurance tous risques", "sans caution", "livraison gratuite", "24h/24", "24/7",
          "ans d'expérience", "véhicules neufs", "voitures neuves", "Bardo", "LOCALISATION GPS", "35.5047",
          "AGENCE COMMERCIALE", "aida-public", 'href="https://facebook.com"', "maps.google.com/?q="]


def size(name):
    with Image.open(PHOTOS / f"{name}.jpg") as im:
        return im.size


def img(name, alt, cls, eager=False):
    w, h = size(name)
    load = 'fetchpriority="high"' if eager else 'loading="lazy" decoding="async"'
    return (f'<img src="photos/{name}.jpg" width="{w}" height="{h}" alt="{html.escape(alt)}" '
            f'class="{cls}" {load}/>')


def wa_link(text):
    return f"https://wa.me/{WA}?text={quote(text)}"


def replace_block(s, start, end, new):
    i = s.index(start)
    j = s.index(end, i) + len(end)
    return s[:i] + new + s[j:]


LABEL = "font-mono text-[11px] uppercase tracking-wider text-[#9AA0A6] mb-1"
FIELD = "bg-transparent border-none text-[#F2F2F0] focus:ring-0 p-0 w-full"


def hero_html():
    opts = "".join(f'<option class="bg-[#1E1F22] text-white" value="{c["model"] if "sub" not in c else c["model"] + " (" + c["sub"] + ")"}">'
                   f'{c["model"]}</option>' for c in FLEET)
    return f'''<section id="top" class="relative w-full min-h-[100svh] lg:min-h-0 lg:h-[900px] overflow-hidden pt-20 bg-[#141517] flex flex-col justify-end lg:justify-between">
<div class="absolute inset-0 lg:left-auto lg:w-[62%] z-0">
{img("hero_eljem", "L'amphithéâtre d'El Jem vu à travers le pare-brise, pendant une excursion avec chauffeur", "w-full h-full object-cover object-[50%_40%]", eager=True)}
<div class="absolute inset-0 bg-[#141517]/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#141517] lg:via-[#141517]/30 lg:via-25% lg:to-transparent pointer-events-none"></div>
<div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#141517] to-transparent pointer-events-none"></div>
</div>
<div class="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full pt-10 lg:pt-16">
<div class="max-w-3xl">
<div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#E3202B] mb-4 font-bold">
<span class="w-2 h-2 bg-[#E3202B]"></span><span>MAHDIA · TUNISIE</span>
</div>
<h1 class="font-headline font-extrabold uppercase text-5xl sm:text-6xl lg:text-[76px] leading-[0.92] tracking-tight text-[#F2F2F0] mb-6">
LOCATION DE VOITURES, TRANSFERTS &amp; EXCURSIONS
</h1>
<p class="font-body text-lg lg:text-xl text-[#F2F2F0]/90 font-normal leading-relaxed max-w-xl mb-8">
Agence Top Car, avenue Taher Sfar à Mahdia. Voitures, vans et utilitaires, avec ou sans chauffeur.
</p>
<a href="{MAPS_URL}" target="_blank" rel="noopener" class="inline-flex items-center gap-3 font-mono text-sm tracking-wide text-neutral-300 py-1.5 px-3 bg-black/40 border border-white/10 backdrop-blur-sm hover:border-white/30">
<span class="text-white font-bold">4,8</span><span class="text-[#E3202B]" aria-hidden="true">★★★★★</span>
<span class="text-neutral-400">·</span><span>54 avis Google</span>
</a>
</div>
</div>
<div class="relative z-20 w-full bg-[#1E1F22] border-t border-b border-white/15 mt-10 lg:mt-0">
<div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-5">
<form id="request" novalidate class="flex flex-col gap-2">
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1fr_1fr_1.3fr_auto] border border-white/15 bg-[#141517] divide-y lg:divide-y-0 lg:divide-x divide-white/15">
<div class="px-4 py-3 flex flex-col justify-center">
<label class="{LABEL}" for="svc">Service</label>
<select class="{FIELD} font-headline font-bold text-base cursor-pointer pr-6" id="svc" name="svc">
<option class="bg-[#1E1F22] text-white" value="location">Location de voiture</option>
<option class="bg-[#1E1F22] text-white" value="transfert">Transfert aéroport</option>
<option class="bg-[#1E1F22] text-white" value="excursion">Excursion avec chauffeur</option>
</select>
</div>
<div class="px-4 py-3 flex flex-col justify-center">
<label class="{LABEL}" for="loc">Lieu de prise en charge</label>
<input class="{FIELD} font-body text-sm placeholder-neutral-500 leading-tight" id="loc" name="loc" list="lieux" placeholder="Agence, hôtel, aéroport…" type="text" autocomplete="off"/>
<datalist id="lieux"><option value="Agence Top Car, av. Taher Sfar, Mahdia"></option></datalist>
</div>
<div class="px-4 py-3 flex flex-col justify-center">
<label class="{LABEL}" for="d1">Du</label>
<input class="{FIELD} font-mono text-sm" style="color-scheme:dark" id="d1" name="d1" type="date"/>
</div>
<div class="px-4 py-3 flex flex-col justify-center">
<label class="{LABEL}" for="d2">Au</label>
<input class="{FIELD} font-mono text-sm" style="color-scheme:dark" id="d2" name="d2" type="date"/>
</div>
<div class="px-4 py-3 flex flex-col justify-center">
<label class="{LABEL}" for="veh">Véhicule</label>
<select class="{FIELD} font-headline font-bold text-base cursor-pointer pr-6" id="veh" name="veh">
<option class="bg-[#1E1F22] text-white" value="">Tous types</option>{opts}
</select>
</div>
<div class="p-2 flex items-stretch sm:col-span-2 lg:col-span-1">
<button class="w-full bg-[#E3202B] hover:bg-red-700 text-white font-headline uppercase font-bold tracking-wider px-5 py-3 text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer" style="border-radius: 4px;" type="submit">
<span>Envoyer sur WhatsApp</span><span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
</button>
</div>
</div>
<p class="font-mono text-xs text-neutral-400 pl-1">Votre demande s'ouvre dans WhatsApp. Réponse de l'agence par message.</p>
<p id="rq-error" role="alert" class="hidden font-mono text-xs text-[#E3202B] pl-1"></p>
</form>
</div>
</div>
</section>'''


def fleet_html():
    chips = "\n".join(
        f'<button type="button" data-filter="{k}" aria-pressed="{"true" if k == "all" else "false"}" '
        f'class="chip shrink-0 border border-white/20 font-mono text-xs uppercase tracking-wider px-5 py-2 transition-colors cursor-pointer whitespace-nowrap" style="border-radius: 4px;">{v}</button>'
        for k, v in CHIPS)
    rows = []
    for n, car in enumerate(FLEET, 1):
        name = car["model"] + (f' ({car["sub"]})' if "sub" in car else "")
        msg = f"Bonjour, je voudrais des informations sur : {name}. Pouvez-vous m'indiquer la disponibilité et le prix ?"
        sub = (f'<span class="block font-mono text-xs uppercase tracking-wider text-neutral-400 mt-1">{car["sub"]}</span>'
               if "sub" in car else "")
        rows.append(f'''<div class="car group py-6 lg:py-7 grid grid-cols-[auto_1fr] lg:grid-cols-[4rem_1fr_12rem_12rem_14rem] items-center gap-x-5 lg:gap-x-6 gap-y-3 hover:bg-[#1E1F22]/50 transition-colors px-0 lg:px-4" data-tags="{car["cat"]}">
<span class="font-mono text-sm tracking-widest text-neutral-500 group-hover:text-[#E3202B] transition-colors">{n:02d}</span>
<h3 class="font-headline font-extrabold uppercase text-4xl lg:text-5xl tracking-tight text-[#F2F2F0] leading-none">{car["model"]}{sub}</h3>
<span class="col-start-2 lg:col-start-auto font-mono text-xs uppercase tracking-wider text-neutral-400">{car["spec"]}</span>
<span class="col-start-2 lg:col-start-auto lg:text-right font-mono text-xs uppercase tracking-widest text-[#E3202B] font-bold">Prix sur demande</span>
<div class="col-start-2 lg:col-start-auto lg:text-right">
<a class="inline-block border border-white/25 hover:border-white hover:bg-white hover:text-black text-neutral-200 font-mono text-xs uppercase tracking-wider px-4 py-2.5 transition-all" href="{html.escape(wa_link(msg))}" data-car="{html.escape(name)}" rel="noopener" style="border-radius: 4px;" target="_blank">Demander ce véhicule</a>
</div>
</div>''')
    return f'''<section class="w-full bg-[#141517] py-20 lg:py-24 px-4 sm:px-8 lg:px-12 border-b border-white/10" id="flotte">
<div class="max-w-[1440px] mx-auto">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 lg:pb-12 border-b border-white/10">
<div>
<span class="font-mono text-xs uppercase tracking-[0.2em] text-[#E3202B] font-bold block mb-2">01 / PARC AUTOMOBILE</span>
<h2 class="font-headline uppercase font-extrabold text-6xl md:text-8xl tracking-tight text-[#F2F2F0] leading-none">LA FLOTTE</h2>
</div>
<p class="font-body text-base md:text-lg text-neutral-400 max-w-md pb-1">Les modèles présentés par l'agence. Disponibilités et tarifs sur demande.</p>
</div>
<div id="chips" role="toolbar" aria-label="Filtrer la flotte" class="sticky top-20 lg:static z-30 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[#141517]/95 backdrop-blur lg:bg-transparent lg:backdrop-blur-none flex items-center gap-3 py-4 lg:py-8 overflow-x-auto border-b border-white/10">
{chips}
</div>
<div id="fleet-list" class="divide-y divide-white/10 font-body">
{chr(10).join(rows)}
</div>
<p id="fleet-empty" class="hidden py-10 font-mono text-sm text-neutral-400">Aucun modèle dans cette catégorie.</p>
</div>
</section>'''


def gallery_html():
    tiles = "\n".join(f'''<figure class="{c} flex flex-col">
<div class="overflow-hidden bg-[#141517] border border-white/10 {a}">{img(p, alt, "w-full h-full object-cover")}</div>
<figcaption class="font-mono text-xs text-neutral-400 mt-3 block tracking-wider uppercase">{alt}</figcaption>
</figure>''' for p, alt, c, a in GALLERY)
    return f'''<section class="w-full bg-[#1E1F22] py-20 lg:py-24 px-4 sm:px-8 lg:px-12 border-b border-white/10" id="excursions">
<div class="max-w-[1440px] mx-auto">
<div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 lg:mb-12 border-b border-white/10 pb-6">
<div>
<span class="font-mono text-xs uppercase tracking-[0.2em] text-[#E3202B] font-bold block mb-2">04 / DESTINATIONS</span>
<h2 class="font-headline uppercase font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#F2F2F0] leading-none">EXCURSIONS &amp; PAYSAGES</h2>
</div>
<span class="font-mono text-xs uppercase tracking-widest text-neutral-400">Photos de clients · Google</span>
</div>
<div class="grid grid-cols-12 gap-6 lg:gap-8">
{tiles}
</div>
</div>
</section>'''


MAP_HTML = f'''<div class="lg:col-span-7 bg-[#141517] border border-white/10 h-[360px] lg:h-[480px] relative overflow-hidden">
<iframe title="Carte : Top Car, avenue Taher Sfar, Mahdia" src="{html.escape(EMBED)}" class="absolute inset-0 w-full h-full border-0 grayscale-[30%]" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
<a class="absolute bottom-3 right-3 z-10 font-mono text-xs uppercase tracking-wider text-white bg-black/70 px-3 py-2 border border-white/10 hover:text-[#E3202B] inline-flex items-center gap-1.5" href="{MAPS_URL}" rel="noopener" target="_blank">
<span>Ouvrir dans Google Maps</span><span class="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span></a>
</div>'''

MOBILE_EXTRAS = f'''
<!-- Mobile drawer -->
<div id="drawer" class="fixed inset-0 z-[60] hidden lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
<div class="absolute inset-0 bg-black/70" data-close></div>
<nav class="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-[#141517] border-l border-white/10 p-6 flex flex-col font-headline uppercase font-bold tracking-wider text-2xl">
<button type="button" class="self-end text-[#F2F2F0] text-3xl mb-6 leading-none" data-close aria-label="Fermer">✕</button>
<a class="py-3 border-b border-white/10" href="#flotte" data-close>Flotte</a>
<a class="py-3 border-b border-white/10" href="#services" data-close>Services</a>
<a class="py-3 border-b border-white/10" href="#excursions" data-close>Excursions</a>
<a class="py-3 border-b border-white/10" href="#avis" data-close>Avis</a>
<a class="py-3 border-b border-white/10" href="#contact" data-close>Contact</a>
<p class="mt-8 font-mono text-xs text-neutral-400 normal-case tracking-normal font-normal leading-relaxed">Lun – Sam 09:00 – 19:00 · Dim fermé<br/>Avenue Taher Sfar, Mahdia 5111</p>
<a class="mt-4 font-mono text-lg text-[#F2F2F0]" href="{TEL}">50 202 203</a>
</nav>
</div>
<!-- Mobile bottom action bar -->
<nav id="actionbar" aria-label="Actions rapides" class="fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 bg-[#141517] border-t border-white/10 font-headline uppercase font-bold tracking-wider text-sm translate-y-full transition-transform lg:hidden">
<a class="py-4 text-center text-[#F2F2F0] border-r border-white/10" href="{TEL}">Appeler</a>
<a class="py-4 text-center text-white bg-[#E3202B]" href="https://wa.me/{WA}" target="_blank" rel="noopener">WhatsApp</a>
<a class="py-4 text-center text-[#F2F2F0] border-l border-white/10" href="{DIR_URL}" target="_blank" rel="noopener">Itinéraire</a>
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
      c.classList.toggle('bg-[#E3202B]', on); c.classList.toggle('border-[#E3202B]', on); c.classList.toggle('text-white', on);
      c.classList.toggle('text-neutral-300', !on); }});
    let n = 0;
    cars.forEach(el => {{ const show = k === 'all' || el.dataset.tags === k; el.hidden = !show; if (show) n++; }});
    document.getElementById('fleet-empty').classList.toggle('hidden', n > 0);
  }};
  chips.forEach(c => c.addEventListener('click', () => setChip(c.dataset.filter)));
  setChip('all');
  // Request bar -> WhatsApp
  const f = document.getElementById('request'); const err = document.getElementById('rq-error');
  const fmt = (v) => v ? v.split('-').reverse().join('/') : '';
  const build = () => {{
    const svc = f.svc.value, loc = f.loc.value.trim(), d1 = fmt(f.d1.value), d2 = fmt(f.d2.value);
    const veh = f.veh.value;
    let t;
    if (svc === 'location') {{
      t = 'Bonjour, je voudrais louer ' + (veh ? 'le véhicule suivant : ' + veh : 'une voiture');
      if (d1) t += ' du ' + d1; if (d2) t += ' au ' + d2;
      if (loc) t += ', prise en charge à ' + loc; t += '.';
    }} else if (svc === 'transfert') {{
      t = 'Bonjour, je voudrais réserver un transfert aéroport';
      if (d1) t += ' le ' + d1; if (d2) t += ' (retour le ' + d2 + ')';
      if (loc) t += ', prise en charge à ' + loc; if (veh) t += ', véhicule : ' + veh; t += '.';
    }} else {{
      t = 'Bonjour, je voudrais réserver une excursion avec chauffeur';
      if (d1 && d2 && d2 !== d1) t += ' du ' + d1 + ' au ' + d2; else if (d1) t += ' le ' + d1;
      if (loc) t += ', départ de ' + loc; if (veh) t += ', véhicule : ' + veh; t += '.';
    }}
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t);
  }};
  // Airport pickup is only stated for transfers, so only suggest it there
  const dl = document.getElementById('lieux');
  const setLieux = () => {{ dl.innerHTML = '<option value="Agence Top Car, av. Taher Sfar, Mahdia"></option>' +
    (f.svc.value === 'transfert' ? '<option value="Aéroport Monastir Habib Bourguiba"></option>' : ''); }};
  f.svc.addEventListener('change', setLieux); setLieux();
  f.d1.addEventListener('change', () => {{ f.d2.min = f.d1.value; }});
  f.addEventListener('submit', (e) => {{
    e.preventDefault();
    const bad = f.d1.value && f.d2.value && (f.svc.value === 'location' ? f.d2.value <= f.d1.value : f.d2.value < f.d1.value);
    if (bad) {{ err.textContent = 'La date de retour doit être après la date de départ.'; err.classList.remove('hidden'); f.d2.focus(); return; }}
    err.classList.add('hidden');
    const url = build(); f.dataset.last = url; window.open(url, '_blank', 'noopener');
  }});
  const today = new Date().toISOString().slice(0, 10); f.d1.min = today; f.d2.min = today;
  // Drawer
  const drawer = document.getElementById('drawer');
  document.getElementById('menu-btn').addEventListener('click', () => drawer.classList.remove('hidden'));
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => drawer.classList.add('hidden')));
  // Action bar after hero
  const bar = document.getElementById('actionbar');
  new IntersectionObserver(([e]) => bar.classList.toggle('translate-y-full', e.isIntersecting)).observe(document.getElementById('top'));
}})();
</script>
'''


def build():
    s = SRC.read_text(encoding="utf-8")

    # Head
    s = s.replace("<title>Top Car Mahdia — Location de Voitures, Transferts &amp; Excursions</title>",
                  "<title>Top Car Mahdia — Location de voitures, transferts &amp; excursions</title>\n"
                  '<meta name="description" content="Top Car, agence de location de voitures à Mahdia (avenue Taher Sfar) : citadines, berlines, SUV, vans et utilitaires, transferts aéroport et excursions avec chauffeur. Demande sur WhatsApp au 50 202 203."/>')
    # Icon font: load once, never flash the ligature text
    s = s.replace("&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap", "&amp;display=swap", 1)
    s = s.replace("Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap", "Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=block")
    s = s.replace("</style>", "  [hidden]{display:none!important}\n    #chips::-webkit-scrollbar{display:none}\n    html{scroll-padding-top:5rem}\n  </style>", 1)

    # Header: gutters, mobile menu button
    s = s.replace('<div class="max-w-[1440px] mx-auto h-20 px-12 flex items-center justify-between">',
                  '<div class="max-w-[1440px] mx-auto h-20 px-4 sm:px-8 lg:px-12 flex items-center justify-between">')
    s = s.replace('<nav class="hidden md:flex items-center gap-10', '<nav class="hidden lg:flex items-center gap-10')
    s = s.replace('<div class="flex items-center gap-6">\n<a class="font-mono text-sm tracking-wider',
                  '<div class="flex items-center gap-4 lg:gap-6">\n<a class="hidden sm:flex font-mono text-sm tracking-wider')
    s = s.replace('text-[#F2F2F0] hover:text-[#E3202B] transition-colors flex items-center gap-2" href="tel:50202203">',
                  'text-[#F2F2F0] hover:text-[#E3202B] transition-colors items-center gap-2" href="tel:50202203">')
    s = s.replace('</a>\n</div>\n</div>\n</header>',
                  '</a>\n<button id="menu-btn" type="button" class="lg:hidden text-[#F2F2F0] text-3xl leading-none" aria-label="Ouvrir le menu">☰</button>\n</div>\n</div>\n</header>', 1)
    s = s.replace('px-6 py-2.5 text-sm transition-all duration-150 active:scale-[0.99] flex items-center gap-2" href="https://wa.me/21650202203"',
                  'px-4 lg:px-6 py-2.5 text-sm transition-all duration-150 active:scale-[0.99] flex items-center gap-2" href="https://wa.me/21650202203"')

    # Hero, fleet, gallery rebuilt
    s = replace_block(s, '<section class="relative w-full h-[900px]', "</section>", hero_html())
    s = replace_block(s, '<section class="w-full bg-[#141517] py-24 px-12 border-b border-white/10" id="flotte">', "</section>", fleet_html())
    s = replace_block(s, '<section class="w-full bg-[#1E1F22] py-24 px-12 border-b border-white/10" id="excursions">', "</section>", gallery_html())

    # Real map; label fixes
    s = replace_block(s, '<div class="lg:col-span-7 bg-[#141517] border border-white/10 h-[480px]', "</svg>\n</div>", "<!--MAP-->")
    s = replace_block(s, "<!--MAP-->", "</a>\n</div>\n</div>", MAP_HTML)
    s = s.replace(">AGENCE COMMERCIALE<", ">L'AGENCE<")
    s = s.replace('<span class="text-neutral-300">Lundi – Samedi :</span>', '<span class="text-neutral-300">Lundi – Samedi</span>')
    s = s.replace("<span>Dimanche :</span>", "<span>Dimanche</span>")

    # Gutters and section headings on small screens
    s = s.replace("py-24 px-12", "py-20 lg:py-24 px-4 sm:px-8 lg:px-12")
    s = s.replace("text-white py-20 px-12 text-center", "text-white py-16 lg:py-20 px-4 sm:px-8 lg:px-12 text-center")
    s = s.replace('text-6xl tracking-tight text-[#F2F2F0]">', 'text-5xl lg:text-6xl tracking-tight text-[#F2F2F0]">')
    s = s.replace('text-7xl tracking-tight text-[#F2F2F0]">CONTACT', 'text-5xl lg:text-7xl tracking-tight text-[#F2F2F0]">CONTACT')
    s = s.replace('<span class="font-headline font-extrabold text-[120px]', '<span class="font-headline font-extrabold text-[88px] lg:text-[120px]')
    s = s.replace('text-5xl md:text-7xl lg:text-8xl tracking-tight mb-10', 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-10')

    # Links
    s = s.replace('href="tel:50202203"', f'href="{TEL}"')
    s = s.replace('href="https://maps.google.com/?q=Top+Car+Mahdia" rel="noopener noreferrer" target="_blank">\n<span>Voir tous',
                  f'href="{MAPS_URL}" rel="noopener noreferrer" target="_blank">\n<span>Voir tous')
    s = s.replace('href="https://maps.google.com/?q=Top+Car+Mahdia" rel="noopener noreferrer" style="border-radius: 4px;" target="_blank">',
                  f'href="{DIR_URL}" rel="noopener noreferrer" style="border-radius: 4px;" target="_blank">')
    s = s.replace('href="https://facebook.com"', f'href="{FB_URL}"')

    # Footer: stack on mobile, room for the action bar
    s = s.replace('<footer class="w-full bg-[#141517] py-12 px-12', '<footer class="w-full bg-[#141517] py-12 pb-24 lg:pb-12 px-4 sm:px-8 lg:px-12')
    s = s.replace('<div class="flex flex-wrap items-center gap-6">\n<span class="font-headline italic',
                  '<div class="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">\n<span class="font-headline italic')
    s = s.replace('<span class="text-neutral-500">|</span>', '<span class="hidden md:inline text-neutral-500">|</span>')

    s = s.replace("</body>", MOBILE_EXTRAS + SCRIPT + "</body>")

    for b in BANNED:
        assert b not in s, f"banned/leftover: {b}"
    assert s.count('class="car group') == len(FLEET)
    assert "photos/hero_eljem.jpg" in s and EMBED.split("&")[0] in s.replace("&amp;", "&")
    OUT.write_text(s, encoding="utf-8")
    print("wrote", OUT, len(s), "bytes;", s.count("<img"), "imgs")


if __name__ == "__main__":
    build()
