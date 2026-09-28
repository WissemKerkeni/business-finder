"""Build ahmed-auto/stitch/desktop-final.html.

Stitch rendered the approved layout but never saved the screen (no export), so this script
writes the page itself, following that render (stitch/desktop-v1-stitch-render.png): same palette,
type, section order and stock-row layout. Data comes from stock.py (facts from the dealer's posts).
Run: python ahmed-auto/_scratch/build_final.py
"""
import html
import json
import sys
from datetime import date
from pathlib import Path
from urllib.parse import quote

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
from stock import STOCK, STOCK_DATE_FR  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "stitch" / "desktop-final.html"
PHOTOS = ROOT / "stitch" / "photos"

WA = "21653850850"
TEL1, TEL1_TXT = "tel:+21653850850", "53 850 850"
TEL2, TEL2_TXT = "tel:+21694157778", "94 157 778"
EMAIL = "ahmedauto2012@yahoo.fr"
LAT, LNG = "35.6896333", "10.8467775"
MAPS_URL = "https://www.google.com/maps?cid=6322496852364681938"
DIR_URL = f"https://www.google.com/maps/dir/?api=1&destination={LAT},{LNG}"
EMBED = f"https://maps.google.com/maps?q={LAT},{LNG}&z=17&output=embed"
FB_URL = "https://www.facebook.com/profile.php?id=100064048541047"
IG_URL = "https://www.instagram.com/ahmedd_autoo/"
REVIEWS_URL = "https://www.google.com/search?q=AHMED+AUTO+Ksibet+El+Mediouni#lrd=0x1302133e4547a689:0x57be0563a2b8e2d2,1,,,,"

RED = "#C4121E"
BG = "#0D0D0F"
S1 = "#16171A"
S2 = "#1E1F23"
LINE = "white/10"

BANNED = ["garantie", "crédit", "facilité", "reprise", "certifié", "jamais accidenté", "première main",
          "full options", "dédouané", "meilleurs prix", "livraison", "ans d'expérience", "le premier",
          "unique en Tunisie", "strictement neuf", "irréprochable", "Top Car", "Hlila", "La Cucina", "Dar Zmen"]

MAKES = ["Mercedes-Benz", "Volkswagen", "BMW", "Cupra", "Can-Am"]
ENERGY = [("phev", "Hybride rechargeable"), ("diesel", "Diesel")]


def esc(s):
    return html.escape(str(s), quote=True)


def photo(name):
    with Image.open(PHOTOS / f"{name}.jpg") as im:
        return im.size


def img(name, alt, cls, eager=False, sizes=None):
    w, h = photo(name)
    load = 'fetchpriority="high" decoding="async"' if eager else 'loading="lazy" decoding="async"'
    return f'<img src="photos/{name}.jpg" width="{w}" height="{h}" alt="{esc(alt)}" class="{cls}" {load}/>'


def fr_date(d):
    y, m, dd = d.split("-")
    return f"{dd}/{m}/{y}"


def km(v):
    return None if v is None else f"{v:,}".replace(",", " ") + " km"


def spec_line(c):
    parts = [c["year"], km(c["km"]), c["fuel"], f'{c["cv"]} CV' if c["cv"] else None, c["gearbox"], c["power"]]
    if c["id"] == "canam-outlander-max":
        parts = [c["year"], km(c["km"]), "Boîte CVT", "2x4 / 4x4"]
    return [p for p in parts if p]


def disp(model):
    """Uppercase model name but keep the lowercase 'e' of plug-in badges (300e, 530e, 250e)."""
    import re
    return re.sub(r"(\d)E\b", r"\1e", model.upper())


def title(c):
    return f'{c["make"]} {c["model"]}'


def wa_text(c):
    return (f"Bonjour, je suis intéressé(e) par le véhicule {title(c)} {c['version']} ({c['year']}) "
            f"publié le {fr_date(c['date'])} sur votre page. Est-il toujours disponible ? Quel est son prix ?")


def wa_link(text=None):
    return f"https://wa.me/{WA}" + (f"?text={quote(text)}" if text else "")


def alts():
    import csv
    rows = csv.DictReader(open(ROOT / "photo-manifest.csv", encoding="utf-8"))
    return {r["file"][:-4]: r["label"] for r in rows}


ALT = alts()

BTN_RED = f"inline-flex items-center justify-center gap-2 bg-[{RED}] hover:bg-[#A50F19] text-white font-mono text-xs font-bold uppercase tracking-[0.14em] px-5 py-3 transition-colors"
BTN_OUT = "inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-[#F4F4F5] font-mono text-xs font-bold uppercase tracking-[0.14em] px-5 py-3 transition-colors"
LABEL = f"font-mono text-[11px] uppercase tracking-[0.2em] text-[{RED}] font-bold"
H2 = "font-headline font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-[#F4F4F5]"
WRAP = "max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12"

WA_SVG = '<svg aria-hidden="true" viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'


def header():
    links = [("#vehicules", "Véhicules"), ("#acheter", "Comment acheter"), ("#showroom", "Showroom"), ("#avis", "Avis"), ("#acces", "Accès")]
    nav = "\n".join(f'<a class="hover:text-white transition-colors" href="{h}">{t}</a>' for h, t in links)
    return f'''<header id="site-header" class="fixed top-0 inset-x-0 z-50 bg-[{BG}]/85 backdrop-blur-md border-b border-{LINE}">
<div class="{WRAP} h-16 lg:h-20 flex items-center justify-between gap-3 lg:gap-6">
<a href="#top" class="flex flex-col leading-none" aria-label="AHMED AUTO, accueil">
<svg aria-hidden="true" viewBox="0 0 120 14" class="w-24 h-3 mb-0.5"><path d="M2 12 C 20 11, 30 3, 58 2 C 80 1, 98 5, 118 11" fill="none" stroke="{RED}" stroke-width="2.2" stroke-linecap="round"/></svg>
<span class="font-headline font-black italic uppercase tracking-tight whitespace-nowrap text-lg sm:text-xl lg:text-2xl text-[#F4F4F5]">AHMED AUTO</span>
</a>
<nav aria-label="Navigation principale" class="hidden lg:flex items-center gap-9 font-body text-sm text-neutral-300">
{nav}
</nav>
<div class="flex items-center gap-3 lg:gap-5">
<a class="hidden sm:inline-flex font-mono text-sm tracking-wider text-[#F4F4F5] hover:text-[{RED}]" href="{TEL1}">{TEL1_TXT}</a>
<a class="{BTN_RED} !px-3 sm:!px-4 !py-2.5" href="{wa_link()}" target="_blank" rel="noopener" aria-label="WhatsApp">{WA_SVG}<span class="hidden sm:inline">WhatsApp</span></a>
<button id="menu-btn" type="button" class="lg:hidden text-[#F4F4F5] text-3xl leading-none px-1" aria-label="Ouvrir le menu" aria-controls="drawer" aria-expanded="false">☰</button>
</div>
</div>
</header>'''


def hero():
    return f'''<section id="top" class="relative min-h-[100svh] lg:min-h-0 lg:h-[100vh] lg:max-h-[980px] flex items-end lg:items-center overflow-hidden bg-[{BG}]">
<div class="absolute inset-0 lg:left-[28%]">
{img("showroom-1", "Porsche devant l'entrée du showroom AHMED AUTO, Route de Monastir, au crépuscule", "w-full h-full object-cover object-[68%_60%]", eager=True)}
<div class="absolute inset-0 bg-[{BG}]/65 lg:bg-transparent lg:bg-[linear-gradient(90deg,{BG}_0%,{BG}CC_18%,{BG}33_48%,transparent_75%)]"></div>
<div class="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,{BG},transparent)]"></div>
</div>
<div class="relative z-10 {WRAP} w-full pb-14 pt-28 lg:py-0">
<div class="max-w-2xl">
<p class="{LABEL} flex items-center gap-2 mb-5"><span class="w-2 h-2 bg-[{RED}]"></span>Showroom · Ksibet El Mediouni</p>
<h1 class="font-headline font-black italic uppercase text-[3.4rem] sm:text-7xl lg:text-[104px] leading-[0.9] tracking-tight text-[#F4F4F5] mb-6">AHMED AUTO</h1>
<p class="font-body text-lg lg:text-xl text-neutral-200 leading-relaxed max-w-xl mb-7">Vente voitures haute gamme — voitures neuves et d'occasion, visibles au showroom, Route de Monastir.</p>
<div class="flex flex-wrap items-center gap-3 mb-8">
<a href="{REVIEWS_URL}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-mono text-sm text-neutral-300 hover:text-white"><span class="text-white font-bold">4,8</span><span class="text-[{RED}]" aria-hidden="true">★★★★★</span><span>· 12 avis Google</span></a>
<span class="font-mono text-xs uppercase tracking-wider text-neutral-300 border border-white/20 bg-black/40 px-3 py-1.5">Stock publié au {STOCK_DATE_FR}</span>
</div>
<div class="flex flex-wrap gap-3">
<a class="{BTN_RED}" href="#vehicules">Voir les véhicules</a>
<a class="{BTN_OUT} bg-black/30" href="{wa_link()}" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp {TEL1_TXT}</span></a>
</div>
</div>
</div>
</section>'''


def chip(group, key, label, on=False):
    return (f'<button type="button" class="chip shrink-0 whitespace-nowrap border font-mono text-[10.5px] uppercase tracking-[0.1em] px-3 py-2 transition-colors" '
            f'data-group="{group}" data-key="{key}" aria-pressed="{"true" if on else "false"}">{label}</button>')


def stock():
    chips = [chip("make", "all", "Tous", True)] + [chip("make", m, m) for m in MAKES]
    chips += ['<span class="w-px h-6 bg-white/15 shrink-0 mx-1" aria-hidden="true"></span>', chip("energy", "all", "Toutes", True)]
    chips += [chip("energy", k, v) for k, v in ENERGY]
    rows = []
    for c in STOCK:
        spec = " <span class=\"text-neutral-600\">·</span> ".join(esc(p) for p in spec_line(c))
        cover = f'{c["id"]}-01'
        rows.append(f'''<article id="car-{c["id"]}" class="car group grid lg:grid-cols-[1.45fr_1fr] gap-6 lg:gap-12 py-8 lg:py-10 border-b border-{LINE}" data-id="{c["id"]}" data-make="{c["make"]}" data-energy="{c["energy"] or ""}" data-date="{c["date"]}" data-year="{c["yearNum"]}" data-km="{"" if c["km"] is None else c["km"]}">
<button type="button" class="open-car relative block overflow-hidden bg-[{S1}] aspect-[16/10] text-left" data-open="{c["id"]}" aria-label="Voir les photos : {esc(title(c))}">
{img(cover, ALT.get(cover, title(c)), "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]")}
<span class="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-wider bg-black/70 text-white px-2.5 py-1.5">{c["photos"]} photos</span>
</button>
<div class="flex flex-col justify-center">
<p class="font-mono text-[11px] uppercase tracking-[0.18em] text-[{RED}] mb-3">Publié le {fr_date(c["date"])}</p>
<p class="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1">{esc(c["make"])}</p>
<h3 class="font-headline font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[0.95] tracking-tight text-[#F4F4F5] mb-2">{esc(disp(c["model"]))}</h3>
<p class="font-body text-neutral-300 mb-4">{esc(c["version"])}{" · " + esc(c["colour"]) if c["colour"] else ""}</p>
<p class="font-mono text-xs leading-relaxed text-neutral-300 mb-5 tabular-nums">{spec}</p>
<p class="font-mono text-base font-bold text-[{RED}] mb-6">Prix sur demande</p>
<div class="flex flex-wrap gap-3">
<button type="button" class="open-car {BTN_OUT}" data-open="{c["id"]}">Détails</button>
<a class="wa {BTN_RED}" href="{esc(wa_link(wa_text(c)))}" target="_blank" rel="noopener" data-car="{c["id"]}">{WA_SVG}<span>WhatsApp</span></a>
</div>
</div>
</article>''')
    return f'''<section id="vehicules" class="bg-[{BG}] pt-20 lg:pt-28 pb-16">
<div class="{WRAP}">
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
<div>
<p class="{LABEL} mb-3">01 / Stock</p>
<h2 class="{H2}">Véhicules en stock</h2>
</div>
<p class="font-body text-neutral-400 max-w-md">Stock indicatif, publié au {STOCK_DATE_FR}. Contactez-nous pour la disponibilité.</p>
</div>
</div>
<div id="stock-bar" class="sticky top-16 lg:top-20 z-30 bg-[{BG}]/95 backdrop-blur border-y border-{LINE}">
<div class="{WRAP} flex flex-col lg:flex-row lg:items-center gap-3 py-3">
<div id="chips" role="toolbar" aria-label="Filtrer les véhicules" class="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 xl:overflow-visible">
{chr(10).join(chips)}
</div>
<div class="flex items-center justify-between lg:justify-end gap-4 lg:ml-auto shrink-0">
<label class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-neutral-400">Trier
<select id="sort" class="bg-[{S1}] border border-white/20 text-[#F4F4F5] font-mono text-xs uppercase tracking-wider pl-3 pr-8 py-2 focus:outline-none focus:border-[{RED}]">
<option value="date">Plus récents</option><option value="year">Année</option><option value="km">Kilométrage</option>
</select></label>
<p id="count" class="font-mono text-xs uppercase tracking-wider text-neutral-300 border border-white/15 px-3 py-2" aria-live="polite">{len(STOCK)} véhicules</p>
</div>
</div>
</div>
<div class="{WRAP}">
<div id="stock-list">
{chr(10).join(rows)}
</div>
<p id="stock-empty" class="hidden py-12 font-mono text-sm text-neutral-400">Aucun véhicule ne correspond à ces filtres.</p>
</div>
</section>'''


def dialog():
    return f'''<div id="car-dialog" class="fixed inset-0 z-[70] hidden" role="dialog" aria-modal="true" aria-labelledby="cd-title">
<div class="absolute inset-0 bg-black/80" data-dclose></div>
<div class="absolute inset-0 lg:inset-y-6 lg:inset-x-8 xl:inset-x-16 bg-[{S1}] border border-{LINE} overflow-y-auto">
<div class="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 lg:px-8 h-14 bg-[{S1}]/95 backdrop-blur border-b border-{LINE}">
<p class="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">Fiche véhicule</p>
<button type="button" class="text-[#F4F4F5] text-2xl leading-none px-2" data-dclose aria-label="Fermer la fiche">✕</button>
</div>
<div class="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 p-4 lg:p-8">
<div>
<div id="cd-stage" class="relative bg-black aspect-[4/3] overflow-hidden select-none">
<img id="cd-img" alt="" class="w-full h-full object-contain"/>
<button type="button" id="cd-prev" class="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/70 hover:bg-black text-white text-xl" aria-label="Photo précédente">‹</button>
<button type="button" id="cd-next" class="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/70 hover:bg-black text-white text-xl" aria-label="Photo suivante">›</button>
<p id="cd-count" class="absolute bottom-3 right-3 font-mono text-xs bg-black/75 text-white px-2.5 py-1" aria-live="polite">1 / 1</p>
</div>
<div id="cd-thumbs" class="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2"></div>
</div>
<div>
<p id="cd-date" class="font-mono text-[11px] uppercase tracking-[0.18em] text-[{RED}] mb-3"></p>
<p id="cd-make" class="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 mb-1"></p>
<h2 id="cd-title" tabindex="-1" class="font-headline font-extrabold text-3xl lg:text-4xl leading-[0.95] tracking-tight text-[#F4F4F5] mb-2 focus:outline-none"></h2>
<p id="cd-version" class="font-body text-neutral-300 mb-6"></p>
<dl id="cd-specs" class="border-t border-{LINE} mb-6"></dl>
<div id="cd-opts-wrap">
<p class="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-3">Équipements indiqués par le vendeur</p>
<ul id="cd-opts" class="space-y-2 mb-6 font-body text-sm text-neutral-200"></ul>
</div>
<p class="font-mono text-lg font-bold text-[{RED}] mb-5">Prix sur demande</p>
<div class="flex flex-wrap gap-3 mb-5">
<a id="cd-wa" class="{BTN_RED}" href="#" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp</span></a>
<a class="{BTN_OUT}" href="{TEL1}">Appeler {TEL1_TXT}</a>
</div>
<p class="font-mono text-[11px] leading-relaxed text-neutral-500">Informations tirées de l'annonce publiée par AHMED AUTO (<a id="cd-src" class="underline hover:text-neutral-300" href="#" target="_blank" rel="noopener">voir la publication</a>). Disponibilité à confirmer.</p>
</div>
</div>
</div>
</div>'''


def how():
    steps = [("01", "Choisissez un véhicule", "Parcourez le stock publié et ouvrez la fiche du véhicule."),
             ("02", "Écrivez-nous ou appelez", f"Un message WhatsApp ou un appel au {TEL1_TXT} / {TEL2_TXT} pour vérifier la disponibilité et le prix."),
             ("03", "Venez le voir", "Le véhicule est visible au showroom AHMED AUTO, Route de Monastir, Ksibet El Mediouni.")]
    cols = "\n".join(f'''<li class="py-8 lg:py-0 lg:px-10 first:lg:pl-0 border-b lg:border-b-0 lg:border-l first:lg:border-l-0 border-{LINE}">
<p class="font-mono text-5xl text-neutral-600 mb-6 tabular-nums">{n}</p>
<h3 class="font-headline font-bold uppercase text-xl text-[#F4F4F5] mb-3">{t}</h3>
<p class="font-body text-neutral-400 leading-relaxed">{d}</p>
</li>''' for n, t, d in steps)
    return f'''<section id="acheter" class="bg-[{S1}] border-y border-{LINE} py-20 lg:py-28">
<div class="{WRAP}">
<p class="{LABEL} mb-3">02 / Achat</p>
<h2 class="{H2} mb-12">Comment acheter</h2>
<ol class="grid lg:grid-cols-3">
{cols}
</ol>
</div>
</section>'''


def gallery():
    tiles = [("showroom-2", "lg:col-span-7 lg:row-span-2", "aspect-[4/3] lg:aspect-auto lg:h-full"),
             ("showroom-3", "lg:col-span-5", "aspect-[4/3]"),
             ("showroom-4", "lg:col-span-5", "aspect-[4/3]")]
    figs = "\n".join(f'<figure class="{c} overflow-hidden bg-[{S1}] {a}">{img(n, ALT[n], "w-full h-full object-cover")}</figure>' for n, c, a in tiles)
    return f'''<section id="showroom" class="bg-[{BG}] py-20 lg:py-28">
<div class="{WRAP}">
<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
<div><p class="{LABEL} mb-3">03 / Showroom</p><h2 class="{H2}">Le showroom</h2></div>
<p class="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Route de Monastir, Ksibet El Mediouni · Photos Google Maps</p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
{figs}
</div>
</div>
</section>'''


REVIEWS = [
    ("Meilleur prix Meilleur plan Je le recommande Ahmed auto à tous ceux qui recherchent un endroit fiable merci pour votre service", "Anas Seelmen", 5, ""),
    ("Un grand remerciement à ´´Ahmed Auto ‘’ merci pour votre accueil et votre fidélité je le conseille vivement", "Moncef Brik", 5, ""),
    ("Je partage mon experience Avec Ahmed Auto meilleur Showroom vraiment merci beaucoup", "Karim Belhaj", 5, ""),
    ("Un conseil à tous : faites diagnostiquer votre voiture par un mécanicien avant de l’acheter…", "Med Tayeb", 3, "Traduit de l'arabe par Google"),
]


def reviews():
    bars = "\n".join(f'''<div class="flex items-center gap-3 font-mono text-xs text-neutral-400"><span class="w-6">{s}★</span>
<span class="flex-1 h-1.5 bg-white/10"><span class="block h-full bg-[{RED}]" style="width:{n / 12 * 100:.0f}%"></span></span><span class="w-5 text-right tabular-nums">{n}</span></div>'''
                     for s, n in ((5, 11), (4, 0), (3, 1), (2, 0), (1, 0)))
    quotes = "\n".join(f'''<figure class="py-7 border-b border-{LINE} first:pt-0">
<blockquote class="font-body text-lg text-neutral-100 leading-relaxed mb-4">« {esc(q)} »</blockquote>
<figcaption class="font-mono text-xs uppercase tracking-wider text-neutral-400"><span class="text-[{RED}] mr-2" aria-label="{s} étoiles sur 5">{"★" * s}{"☆" * (5 - s)}</span>{a}{" · " + n if n else ""}</figcaption>
</figure>''' for q, a, s, n in REVIEWS)
    return f'''<section id="avis" class="bg-[{S1}] border-y border-{LINE} py-20 lg:py-28">
<div class="{WRAP} grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
<div>
<p class="{LABEL} mb-3">04 / Avis</p>
<h2 class="{H2} mb-8">Avis Google</h2>
<p class="font-headline font-black text-8xl text-[#F4F4F5] leading-none mb-2">4,8</p>
<p class="text-[{RED}] text-xl mb-1" aria-hidden="true">★★★★★</p>
<p class="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-6">12 avis Google</p>
<div class="space-y-2 max-w-xs mb-8">{bars}</div>
<a class="{BTN_OUT}" href="{REVIEWS_URL}" target="_blank" rel="noopener">Voir tous les avis sur Google</a>
</div>
<div>
{quotes}
</div>
</div>
</section>'''


def location():
    return f'''<section id="acces" class="bg-[{BG}] py-20 lg:py-28">
<div class="{WRAP}">
<p class="{LABEL} mb-3">05 / Accès</p>
<h2 class="{H2} mb-10">Nous trouver</h2>
<div class="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12">
<div class="relative bg-[{S1}] border border-{LINE} h-[340px] lg:h-[460px] overflow-hidden">
<iframe title="Carte : AHMED AUTO, Route de Monastir, Ksibet El Mediouni" src="{esc(EMBED)}" class="absolute inset-0 w-full h-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
</div>
<div class="font-body">
<p class="font-headline font-extrabold uppercase text-2xl text-[#F4F4F5] mb-5">AHMED AUTO</p>
<dl class="divide-y divide-white/10 border-y border-{LINE}">
<div class="py-4 grid grid-cols-[7rem_1fr] gap-4"><dt class="font-mono text-[11px] uppercase tracking-wider text-neutral-500 pt-0.5">Adresse</dt><dd class="text-neutral-200">Route de Monastir, Ksibet El Mediouni, Monastir 5031<br/><span class="font-mono text-xs text-neutral-500">Plus code MRQW+VP2</span></dd></div>
<div class="py-4 grid grid-cols-[7rem_1fr] gap-4"><dt class="font-mono text-[11px] uppercase tracking-wider text-neutral-500 pt-0.5">Téléphone</dt><dd class="font-mono text-neutral-200"><a class="hover:text-[{RED}]" href="{TEL1}">{TEL1_TXT}</a><br/><a class="hover:text-[{RED}]" href="{TEL2}">{TEL2_TXT}</a></dd></div>
<div class="py-4 grid grid-cols-[7rem_1fr] gap-4"><dt class="font-mono text-[11px] uppercase tracking-wider text-neutral-500 pt-0.5">E-mail</dt><dd><a class="text-neutral-200 hover:text-[{RED}] break-all" href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
<div class="py-4 grid grid-cols-[7rem_1fr] gap-4"><dt class="font-mono text-[11px] uppercase tracking-wider text-neutral-500 pt-0.5">Horaires</dt><dd class="text-neutral-200">Ouvert tous les jours, selon Google et Facebook.<br/><span class="text-neutral-400 text-sm">Appelez avant de passer pour voir un véhicule.</span></dd></div>
</dl>
<div class="flex flex-wrap gap-3 mt-6">
<a class="{BTN_OUT}" href="{DIR_URL}" target="_blank" rel="noopener">Itinéraire</a>
<a class="{BTN_OUT}" href="{MAPS_URL}" target="_blank" rel="noopener">Google Maps</a>
</div>
</div>
</div>
</div>
</section>'''


def cta_footer():
    return f'''<section class="bg-[{RED}] py-16 lg:py-20">
<div class="{WRAP} flex flex-col lg:flex-row lg:items-center justify-between gap-8">
<h2 class="font-headline font-black italic uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-white">Un véhicule vous intéresse ?</h2>
<div class="flex flex-wrap lg:flex-nowrap gap-3 shrink-0">
<a class="inline-flex items-center justify-center border border-white/60 hover:bg-white hover:text-[{RED}] text-white font-mono text-xs font-bold uppercase tracking-[0.14em] px-6 py-3.5 transition-colors" href="{TEL1}">Appeler</a>
<a class="inline-flex items-center justify-center gap-2 bg-[{BG}] hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-[0.14em] px-6 py-3.5 transition-colors" href="{wa_link()}" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp</span></a>
<a class="inline-flex items-center justify-center border border-white/60 hover:bg-white hover:text-[{RED}] text-white font-mono text-xs font-bold uppercase tracking-[0.14em] px-6 py-3.5 transition-colors" href="{DIR_URL}" target="_blank" rel="noopener">Itinéraire</a>
</div>
</div>
</section>
<footer class="bg-[{BG}] border-t border-{LINE} pt-12 pb-28 lg:pb-12">
<div class="{WRAP} flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-center lg:text-left">
<div>
<p class="font-headline font-black italic uppercase text-2xl text-[#F4F4F5]">AHMED AUTO</p>
<p class="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">Route de Monastir, Ksibet El Mediouni</p>
</div>
<p class="font-mono text-xs text-neutral-400 max-w-md">Stock indicatif, publié au {STOCK_DATE_FR}. Contactez-nous pour la disponibilité.</p>
<div class="flex justify-center gap-6 font-mono text-xs uppercase tracking-wider">
<a class="text-neutral-300 hover:text-white" href="{FB_URL}" target="_blank" rel="noopener">Facebook</a>
<a class="text-neutral-300 hover:text-white" href="{IG_URL}" target="_blank" rel="noopener">Instagram</a>
</div>
</div>
<p class="{WRAP} mt-8 font-mono text-[11px] text-neutral-600 text-center lg:text-left">© 2026 AHMED AUTO</p>
</footer>'''


def mobile_extras():
    links = [("#vehicules", "Véhicules"), ("#acheter", "Comment acheter"), ("#showroom", "Showroom"), ("#avis", "Avis"), ("#acces", "Accès")]
    a = "\n".join(f'<a class="py-3 border-b border-{LINE}" href="{h}" data-close>{t}</a>' for h, t in links)
    return f'''<div id="drawer" class="fixed inset-0 z-[60] hidden lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
<div class="absolute inset-0 bg-black/70" data-close></div>
<nav class="absolute right-0 top-0 h-full w-[84%] max-w-sm bg-[{S1}] border-l border-{LINE} p-6 flex flex-col font-headline font-bold uppercase text-2xl text-[#F4F4F5]">
<button type="button" class="self-end text-3xl leading-none mb-6" data-close aria-label="Fermer le menu">✕</button>
{a}
<p class="mt-8 font-mono text-xs normal-case font-normal text-neutral-400 leading-relaxed">Ouvert tous les jours, selon Google.<br/>Route de Monastir, Ksibet El Mediouni</p>
<a class="mt-4 font-mono text-lg font-normal" href="{TEL1}">{TEL1_TXT}</a>
<a class="mt-1 font-mono text-lg font-normal" href="{TEL2}">{TEL2_TXT}</a>
</nav>
</div>
<nav id="actionbar" aria-label="Actions rapides" class="fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 bg-[{S1}] border-t border-{LINE} font-mono text-xs font-bold uppercase tracking-[0.12em] translate-y-full transition-transform lg:hidden">
<a class="py-4 text-center text-[#F4F4F5] border-r border-{LINE}" href="{TEL1}">Appeler</a>
<a class="py-4 text-center text-white bg-[{RED}]" href="{wa_link()}" target="_blank" rel="noopener">WhatsApp</a>
<a class="py-4 text-center text-[#F4F4F5] border-l border-{LINE}" href="{DIR_URL}" target="_blank" rel="noopener">Itinéraire</a>
</nav>'''


def data_json():
    cars = {}
    for c in STOCK:
        specs = [("Année / mise en circulation", c["year"]), ("Kilométrage", km(c["km"])), ("Énergie", c["fuel"]),
                 ("Puissance fiscale", f'{c["cv"]} CV' if c["cv"] else None), ("Puissance", c["power"]),
                 ("Boîte", c["gearbox"]), ("Couleur", c["colour"]), ("Type", c["type"])] + list(c["extra"])
        cars[c["id"]] = {
            "title": disp(c["model"]), "make": c["make"], "version": c["version"] + (" · " + c["colour"] if c["colour"] else ""),
            "date": "Publié le " + fr_date(c["date"]), "url": c["url"], "wa": wa_link(wa_text(c)),
            "specs": [[k, v] for k, v in specs if v], "options": c["options"],
            "photos": [{"src": f'photos/{c["id"]}-{n:02d}.jpg', "alt": ALT.get(f'{c["id"]}-{n:02d}', title(c))} for n in range(1, c["photos"] + 1)],
        }
    return json.dumps(cars, ensure_ascii=False).replace("</", "<\\/")


SCRIPT = r'''<script>
(() => {
  const RED = '__RED__';
  const CARS = JSON.parse(document.getElementById('cars-data').textContent);
  // ---------- Stock filters + sort ----------
  const list = document.getElementById('stock-list');
  const rows = [...list.querySelectorAll('.car')];
  const chips = [...document.querySelectorAll('#chips .chip')];
  const state = { make: 'all', energy: 'all', sort: 'date' };
  const paint = () => chips.forEach(c => {
    const on = state[c.dataset.group] === c.dataset.key;
    c.setAttribute('aria-pressed', on);
    c.style.background = on ? RED : 'transparent'; c.style.borderColor = on ? RED : 'rgba(255,255,255,.2)';
    c.style.color = on ? '#fff' : '#d4d4d4';
  });
  const apply = () => {
    const key = { date: r => r.dataset.date, year: r => +r.dataset.year, km: r => r.dataset.km === '' ? Infinity : +r.dataset.km };
    const k = key[state.sort];
    const sorted = rows.slice().sort((a, b) => {
      const x = k(a), y = k(b);
      if (state.sort === 'km') return x - y;
      return x < y ? 1 : x > y ? -1 : 0;
    });
    let n = 0;
    sorted.forEach(r => {
      const show = (state.make === 'all' || r.dataset.make === state.make) && (state.energy === 'all' || r.dataset.energy === state.energy);
      r.hidden = !show; if (show) n++; list.appendChild(r);
    });
    document.getElementById('count').textContent = n + (n > 1 ? ' véhicules' : ' véhicule');
    document.getElementById('stock-empty').classList.toggle('hidden', n > 0);
    paint();
  };
  chips.forEach(c => c.addEventListener('click', () => { state[c.dataset.group] = c.dataset.key; apply(); }));
  document.getElementById('sort').addEventListener('change', e => { state.sort = e.target.value; apply(); });
  apply();

  // ---------- Car dialog ----------
  const dlg = document.getElementById('car-dialog');
  const $ = id => document.getElementById(id);
  let cur = null, idx = 0, lastFocus = null;
  const show = i => {
    const p = cur.photos; idx = (i + p.length) % p.length;
    $('cd-img').src = p[idx].src; $('cd-img').alt = p[idx].alt;
    $('cd-count').textContent = (idx + 1) + ' / ' + p.length;
    [...$('cd-thumbs').children].forEach((t, k) => { t.style.outline = k === idx ? '2px solid ' + RED : 'none'; t.setAttribute('aria-current', k === idx); });
  };
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const open = (id, push = true) => {
    cur = CARS[id]; if (!cur) return;
    lastFocus = document.activeElement;
    $('cd-date').textContent = cur.date; $('cd-make').textContent = cur.make;
    $('cd-title').textContent = cur.title; $('cd-version').textContent = cur.version;
    $('cd-specs').innerHTML = cur.specs.map(([k, v]) => '<div class="grid grid-cols-2 gap-4 py-2.5 border-b border-white/10"><dt class="font-mono text-[11px] uppercase tracking-wider text-neutral-500">' + esc(k) + '</dt><dd class="font-mono text-sm text-neutral-100 text-right">' + esc(v) + '</dd></div>').join('');
    $('cd-opts').innerHTML = cur.options.map(o => '<li class="flex gap-3"><span class="mt-2 w-1.5 h-1.5 shrink-0" style="background:' + RED + '"></span><span>' + esc(o) + '</span></li>').join('');
    $('cd-opts-wrap').hidden = !cur.options.length;
    $('cd-wa').href = cur.wa; $('cd-src').href = cur.url;
    $('cd-thumbs').innerHTML = cur.photos.map((p, k) => '<button type="button" class="aspect-[4/3] overflow-hidden bg-black" aria-label="Photo ' + (k + 1) + '"><img src="' + p.src + '" alt="" loading="lazy" class="w-full h-full object-cover"/></button>').join('');
    [...$('cd-thumbs').children].forEach((t, k) => t.addEventListener('click', () => show(k)));
    show(0);
    dlg.classList.remove('hidden'); document.body.style.overflow = 'hidden';
    $('cd-title').focus();
    if (push) history.replaceState(null, '', '#car-' + id);
  };
  const close = () => {
    if (dlg.classList.contains('hidden')) return;
    dlg.classList.add('hidden'); document.body.style.overflow = '';
    history.replaceState(null, '', location.pathname + location.search + '#vehicules');
    if (lastFocus) lastFocus.focus();
  };
  document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => open(b.dataset.open)));
  dlg.querySelectorAll('[data-dclose]').forEach(b => b.addEventListener('click', close));
  $('cd-prev').addEventListener('click', () => show(idx - 1));
  $('cd-next').addEventListener('click', () => show(idx + 1));
  dlg.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') {
      const f = [...dlg.querySelectorAll('button, a[href], [tabindex="-1"]')].filter(el => el.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let x0 = null;
  $('cd-stage').addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  $('cd-stage').addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
  const fromHash = () => { const m = location.hash.match(/^#car-(.+)$/); if (m && CARS[m[1]]) open(m[1], false); else close(); };
  window.addEventListener('hashchange', fromHash); fromHash();

  // ---------- Drawer ----------
  const drawer = $('drawer'), mb = $('menu-btn');
  mb.addEventListener('click', () => { drawer.classList.remove('hidden'); mb.setAttribute('aria-expanded', 'true'); });
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => { drawer.classList.add('hidden'); mb.setAttribute('aria-expanded', 'false'); }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.classList.contains('hidden')) { drawer.classList.add('hidden'); mb.focus(); } });
  // ---------- Action bar after the hero ----------
  const bar = $('actionbar');
  const hero = $('top');
  const onScroll = () => bar.classList.toggle('translate-y-full', hero.getBoundingClientRect().bottom > 0);
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
})();
</script>'''


HEAD = f'''<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>AHMED AUTO — Showroom voitures, Ksibet El Mediouni (Monastir)</title>
<meta name="description" content="AHMED AUTO, showroom de voitures neuves et d'occasion, Route de Monastir à Ksibet El Mediouni. Stock publié au {STOCK_DATE_FR} : Mercedes-Benz, BMW, Volkswagen, Cupra, Can-Am. Contact WhatsApp {TEL1_TXT}."/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Anybody:ital,wdth,wght@0,100..150,600..900;1,100..150,600..900&amp;family=Hanken+Grotesk:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;700&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {{ theme: {{ extend: {{ fontFamily: {{
  headline: ["Anybody", "sans-serif"], body: ["'Hanken Grotesk'", "sans-serif"], mono: ["'JetBrains Mono'", "monospace"] }} }} }} }};
</script>
<style>
  body {{ background:{BG}; color:#F4F4F5; font-family:'Hanken Grotesk',sans-serif; -webkit-font-smoothing:antialiased; }}
  .font-headline {{ font-stretch:130%; font-variation-settings:'wdth' 130; }}
  .font-mono {{ font-variant-numeric:tabular-nums; }}
  [hidden] {{ display:none!important; }}
  #chips::-webkit-scrollbar {{ display:none; }} #chips {{ scrollbar-width:none; }}
  html {{ scroll-padding-top:9rem; }}
  a:focus-visible, button:focus-visible, select:focus-visible {{ outline:2px solid {RED}; outline-offset:2px; }}
  select {{ appearance:none; background-image:linear-gradient(45deg,transparent 50%,#9A9DA3 50%),linear-gradient(135deg,#9A9DA3 50%,transparent 50%); background-position:calc(100% - 14px) 50%,calc(100% - 9px) 50%; background-size:5px 5px; background-repeat:no-repeat; }}
</style>
</head>
<body class="min-h-screen selection:bg-[{RED}] selection:text-white">'''


def build():
    body = "\n".join([header(), "<main>", hero(), stock(), how(), gallery(), reviews(), location(), "</main>", cta_footer(), dialog(), mobile_extras()])
    s = (HEAD + "\n" + body + f'\n<script type="application/json" id="cars-data">{data_json()}</script>\n'
         + SCRIPT.replace("__RED__", RED) + "\n</body>\n</html>\n")
    low = s.lower()
    for b in BANNED:
        assert b.lower() not in low, f"banned phrase: {b}"
    assert s.count('<article id="car-') == len(STOCK)
    for c in STOCK:
        for n in range(1, c["photos"] + 1):
            assert (PHOTOS / f'{c["id"]}-{n:02d}.jpg').exists(), c["id"]
    OUT.write_text(s, encoding="utf-8")
    print("wrote", OUT, len(s), "bytes;", s.count("<img"), "static imgs;", len(STOCK), "cars")


if __name__ == "__main__":
    build()
