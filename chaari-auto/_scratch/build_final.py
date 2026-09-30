"""Build chaari-auto/stitch/desktop-final.html.

Follows the Stitch screen (stitch/desktop-v1.html / .png): palette, type, section order, plate wordmark, 01–04 route,
form, gallery + detail panel, portrait video row. Stitch's AI images and invented copy are replaced by the real media
(the site's site/public/photos/*.webp and site/public/videos/*.mp4, no duplicate copy) and the facts in cars.py.
Run: python chaari-auto/_scratch/build_final.py
"""
import html
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).parent))
from cars import *  # noqa: E402,F403

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "stitch" / "desktop-final.html"
# The static page uses the site's optimised media (no duplicate copy under stitch/).
META = json.loads((ROOT / "site" / "src" / "data" / "photos.json").read_text())
P, V = "../site/public/photos/", "../site/public/videos/"

RED, BG, S1, LINE = "#E70013", "#0C0C0D", "#151517", "#2A2A2E"
WRAP = "max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12"
LABEL = f"font-mono text-[11px] uppercase tracking-[0.18em] text-[{RED}]"
H2 = "font-headline font-bold uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.01em] text-[#F4F4F2]"
BTN_RED = f"inline-flex items-center justify-center gap-2 bg-[{RED}] hover:bg-[#C40010] text-white font-mono text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 rounded-[3px] transition-colors"
BTN_OUT = "inline-flex items-center justify-center gap-2 border border-[#F4F4F2]/70 hover:bg-[#F4F4F2] hover:text-[#0C0C0D] text-[#F4F4F2] font-mono text-xs font-bold uppercase tracking-[0.12em] px-5 py-3.5 rounded-[3px] transition-colors"
PLATE = "inline-flex items-center px-3 py-1 bg-[#F7F7F5] text-[#0C0C0D] border border-[#0C0C0D] outline outline-1 outline-[#F7F7F5] font-headline font-bold tracking-[0.12em] rounded-[3px] select-none"
WA_SVG = '<svg aria-hidden="true" viewBox="0 0 24 24" class="w-4 h-4 fill-current shrink-0"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>'
PLAY_SVG = '<svg aria-hidden="true" viewBox="0 0 24 24" class="w-6 h-6 fill-current"><path d="M8 5v14l11-7z"/></svg>'


def esc(s):
    return html.escape(str(s), quote=True)


def fr_date(d):
    y, m, dd = d.split("-")
    return f"{dd}/{m}/{y}"


def srcset(key):
    m = META[key]
    return ", ".join(f"{P}{key}-{w}.webp {w}w" for w in m["widths"])


def img(key, alt, cls, sizes="100vw", eager=False, extra=""):
    m = META[key]
    src = f'{P}{key}-{m["widths"][-1] if m["widths"][-1] <= 1600 else 1600}.webp'
    load = 'fetchpriority="high" decoding="sync"' if eager else 'loading="lazy" decoding="async"'
    return (f'<img src="{src}" srcset="{srcset(key)}" sizes="{sizes}" width="{m["w"]}" height="{m["h"]}" alt="{esc(alt)}" '
            f'class="{cls}" {load} {extra}/>')


def wa_link(text=None):
    return f"https://wa.me/{WA}" + (f"?text={quote(text)}" if text else "")


def title(c):
    return f'{c["make"]} {c["model"]}'


def car_wa(c):
    return (f"Bonjour Chaari Auto, j'ai vu la {title(c)} ({c['year']}) publiée le {fr_date(c['date'])} sur votre page. "
            "Je cherche une voiture de ce type, pouvez-vous me renseigner ?")


NAV = [("#service", "Le service"), ("#demande", "Votre demande"), ("#voitures", "Export pour la Tunisie"),
       ("#videos", "Vidéos"), ("#avis", "Avis"), ("#contact", "Contact")]


def header():
    nav = "\n".join(f'<a class="text-[#A3A3A8] hover:text-white transition-colors" href="{h}">{t}</a>' for h, t in NAV)
    return f'''<header id="site-header" class="fixed top-0 inset-x-0 z-50 bg-[{BG}]/85 backdrop-blur-md border-b border-[{LINE}]">
<div class="{WRAP} h-16 lg:h-20 flex items-center justify-between gap-4">
<a href="#top" class="{PLATE} text-sm sm:text-base" aria-label="Chaari Auto, accueil">CHAARI AUTO</a>
<nav aria-label="Navigation principale" class="hidden xl:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[0.12em]">
{nav}
</nav>
<div class="flex items-center gap-2 sm:gap-3">
<a class="{BTN_RED} !px-3 sm:!px-4 !py-2.5" href="{wa_link()}" target="_blank" rel="noopener" aria-label="WhatsApp {PHONE}">{WA_SVG}<span class="hidden sm:inline">WhatsApp</span></a>
<button id="menu-btn" type="button" class="xl:hidden text-[#F4F4F2] text-3xl leading-none px-1" aria-label="Ouvrir le menu" aria-controls="drawer" aria-expanded="false">☰</button>
</div>
</div>
</header>'''


def hero():
    return f'''<section id="top" class="relative min-h-[100svh] lg:min-h-0 lg:h-[100vh] lg:max-h-[1000px] flex items-end overflow-hidden border-b border-[{LINE}]">
<div class="absolute inset-0 lg:top-28 lg:bottom-36 lg:left-[55%] lg:right-[max(3rem,calc((100vw-1320px)/2+3rem))]">
{img("hero", "Mercedes GLC Coupé noir vu de trois quarts avant, avec la plaque CHAARI AUTO", "w-full h-full object-cover object-[45%_60%]", "(min-width:1024px) 42vw, 100vw", eager=True)}
<div class="absolute inset-0 bg-[{BG}]/55 lg:hidden"></div>
</div>
<div class="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,{BG},transparent)] lg:hidden"></div>
<div class="relative z-10 {WRAP} w-full pt-28 pb-10 lg:pb-12">
<p class="inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[#D6D6D2] bg-[{S1}]/80 border border-[{LINE}] px-3 py-1 mb-6">Bietigheim-Bissingen (Allemagne) → Tunisie</p>
<h1 class="font-headline font-bold uppercase text-[2.9rem] sm:text-7xl lg:text-[60px] xl:text-[70px] leading-[0.93] tracking-[-0.015em] text-[#F4F4F2] max-w-[15ch] lg:max-w-[16ch] mb-6">Spécialiste de l'exportation de voitures d'Europe vers la Tunisie</h1>
<p class="font-body text-lg lg:text-xl text-[#E6E6E2] leading-relaxed max-w-xl lg:max-w-[46%] mb-8">{esc(INTRO)}</p>
<div class="flex flex-wrap gap-3 mb-10 lg:mb-14">
<a class="{BTN_RED}" href="{wa_link()}" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp {PHONE}</span></a>
<a class="{BTN_OUT} bg-black/30" href="#service">Comment ça marche</a>
</div>
<div class="grid sm:grid-cols-3 border-t border-[{LINE}] pt-5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-[#A3A3A8] gap-y-2">
<a href="{REVIEWS_URL}" target="_blank" rel="noopener" class="sm:pr-6 hover:text-white"><span class="text-[{RED}]" aria-hidden="true">★</span> <span class="text-white font-bold">{RATING}</span> — {REVIEWS_N} avis Google</a>
<p class="sm:px-6 sm:border-l border-[{LINE}]">Lindenstraße 16, Bietigheim-Bissingen</p>
<p class="sm:px-6 sm:border-l border-[{LINE}]">{HOURS_SHORT}</p>
</div>
</div>
</section>'''


def steps():
    items = "\n".join(f'''<li class="relative pl-14 lg:pl-0 pb-10 lg:pb-0 lg:pr-8">
<span class="absolute left-[18px] top-12 bottom-0 w-px bg-[{LINE}] lg:hidden" aria-hidden="true"></span>
<p class="absolute left-0 lg:static font-mono font-bold text-[34px] lg:text-5xl leading-none text-[#F4F4F2] tabular-nums lg:mb-6">{n}<span class="hidden lg:inline-block w-6 h-[3px] bg-[{RED}] ml-2 align-middle" aria-hidden="true"></span></p>
<h3 class="font-headline font-bold uppercase text-2xl lg:text-[26px] leading-tight text-[#F4F4F2] pt-1 lg:pt-0 max-w-[16ch]">{esc(t)}</h3>
</li>''' for n, t in STEPS)
    return f'''<section id="service" class="bg-[{BG}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP}">
<p class="{LABEL} mb-3">Nos services incluent</p>
<h2 class="{H2} mb-14 lg:mb-20">Service clé en main</h2>
<div class="relative">
<span class="hidden lg:block absolute left-0 right-0 top-[22px] h-px bg-[{LINE}]" aria-hidden="true"></span>
<ol class="relative grid lg:grid-cols-4 [&>li>p]:lg:bg-[{BG}] [&>li>p]:lg:pr-3 [&>li>p]:lg:inline-block">
{items}
</ol>
</div>
<p class="mt-12 font-mono text-[11px] uppercase tracking-[0.1em] text-[#77777C]">Les étapes telles que Chaari Auto les présente sur Instagram, Facebook et Google.</p>
</div>
</section>'''


def audience():
    return f'''<section class="bg-[{BG}] border-b border-[{LINE}]">
<div class="grid lg:grid-cols-2">
<div class="{WRAP} lg:max-w-none lg:mx-0 lg:pl-[max(3rem,calc((100vw-1320px)/2+3rem))] lg:pr-16 py-20 lg:py-28 flex flex-col justify-center">
<p class="{LABEL} mb-3">Pour qui</p>
<h2 class="{H2} mb-8">Pour les Tunisiens résidant à l'étranger</h2>
<p class="font-body text-lg text-[#C9C9C5] leading-relaxed max-w-xl mb-8">Export de voitures de l'Europe vers la Tunisie et la France : Chaari Auto s'occupe de l'achat de votre voiture, du dossier d'exportation, de la carte grise et de l'assurance, et gère tout jusqu'à la livraison.</p>
<a class="{BTN_OUT} self-start" href="#demande">Décrire la voiture que je cherche</a>
</div>
<figure class="relative min-h-[420px] lg:min-h-[640px] overflow-hidden bg-[{S1}]">
{img("mercedes-gle53-2026-1", "Mercedes GLE 53 AMG noir vu de face, avec la plaque CHAARI AUTO", "absolute inset-0 w-full h-full object-cover object-[50%_45%]", "(min-width:1024px) 50vw, 100vw")}
<figcaption class="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-wider bg-black/70 text-white px-2.5 py-1.5">Mercedes GLE 53 AMG · publié le 12/02/2026</figcaption>
</figure>
</div>
</section>'''


def field(fid, label, inp, span=""):
    return f'''<div class="{span}"><label for="{fid}" class="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#A3A3A8] mb-2">{label}</label>{inp}</div>'''


INPUT = f"w-full bg-[{S1}] border border-[{LINE}] rounded-[3px] px-4 py-3.5 text-base text-[#F4F4F2] placeholder:text-[#6E6E73] focus:outline-none focus:border-[{RED}]"


def request_form():
    sel = lambda fid, opts: f'<select id="{fid}" name="{fid}" class="{INPUT} pr-10">' + "".join(f"<option>{o}</option>" for o in opts) + "</select>"
    return f'''<section id="demande" class="bg-[{BG}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP} grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
<div>
<p class="{LABEL} mb-3">WhatsApp</p>
<h2 class="{H2} mb-6">Votre demande</h2>
<p class="font-body text-[#C9C9C5] leading-relaxed max-w-md mb-6">Décrivez la voiture que vous cherchez : le bouton ouvre WhatsApp avec votre message pré-rempli. Rien n'est enregistré sur ce site.</p>
<p class="font-mono text-xs uppercase tracking-wider text-[#A3A3A8]">Ou directement : <a class="text-white hover:text-[{RED}]" href="{wa_link()}" target="_blank" rel="noopener">{PHONE}</a></p>
</div>
<form id="req" class="grid sm:grid-cols-2 gap-x-6 gap-y-5" novalidate>
{field("f-model", "Marque et modèle souhaités *", f'<input id="f-model" name="model" class="{INPUT}" required autocomplete="off" placeholder="ex. Mercedes GLC, VW Tiguan…"/>', "sm:col-span-2")}
<label class="sm:col-span-2 -mt-2 flex items-center gap-3 font-body text-sm text-[#C9C9C5]"><input id="f-open" type="checkbox" class="w-5 h-5 accent-[{RED}]"/>Je suis ouvert(e) aux suggestions</label>
{field("f-year", "Année (de – à)", f'<input id="f-year" name="year" class="{INPUT}" inputmode="numeric" placeholder="ex. 2021 – 2024"/>')}
{field("f-budget", "Budget", f'<input id="f-budget" name="budget" class="{INPUT}" placeholder="Montant et devise"/>')}
{field("f-fuel", "Carburant", sel("f-fuel", ["Peu importe", "Essence", "Diesel", "Hybride", "Électrique"]))}
{field("f-gear", "Boîte", sel("f-gear", ["Peu importe", "Automatique", "Manuelle"]))}
{field("f-country", "Pays de résidence *", f'<input id="f-country" name="country" class="{INPUT}" required autocomplete="country-name" placeholder="ex. France, Allemagne, Italie…"/>')}
{field("f-city", "Livraison à (ville)", f'<input id="f-city" name="city" class="{INPUT}" placeholder="ex. Tunis, Sfax, Sousse…"/>')}
{field("f-name", "Votre nom *", f'<input id="f-name" name="name" class="{INPUT}" required autocomplete="name"/>', "sm:col-span-2")}
<div class="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
<button type="submit" class="{BTN_RED} !py-4 !px-6 text-sm">{WA_SVG}<span>Envoyer sur WhatsApp</span></button>
<p class="font-mono text-[11px] uppercase tracking-wider text-[#77777C]">* obligatoire</p>
</div>
<p id="req-err" class="sm:col-span-2 hidden font-body text-sm text-[#FF6B75]" role="alert"></p>
</form>
</div>
</section>'''


def gallery():
    items = []
    for c in CARS:
        k = f'{c["id"]}-1'
        tag = f'<span class="absolute top-3 left-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] bg-[{RED}] text-white px-2 py-1">Voiture d\'un client</span>' if c["kind"] == "client" else ""
        items.append(f'''<article id="car-{c["id"]}" class="group border-b border-[{LINE}] pb-6">
<button type="button" class="open-car relative block w-full overflow-hidden bg-[{S1}] aspect-[4/3] text-left" data-open="{c["id"]}" aria-label="Voir les photos : {esc(title(c))} {c["year"]}">
{img(k, c["alt"][0], "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw")}
{tag}<span class="absolute bottom-3 right-3 font-mono text-[11px] uppercase tracking-wider bg-black/70 text-white px-2 py-1">{c["n"]} photos</span>
</button>
<p class="font-mono text-[11px] uppercase tracking-[0.12em] text-[#A3A3A8] mt-5 mb-1.5">Publié le {fr_date(c["date"])} · {c["source"]}</p>
<h3 class="font-headline font-bold uppercase text-2xl text-[#F4F4F2] leading-tight mb-3">{esc(title(c))} · {c["year"]}</h3>
<button type="button" class="open-car font-mono text-[11px] uppercase tracking-[0.12em] text-[#D6D6D2] hover:text-[{RED}]" data-open="{c["id"]}">Voir les photos →</button>
</article>''')
    return f'''<section id="voitures" class="bg-[{BG}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP}">
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-12">
<div><p class="{LABEL} mb-3">Instagram · Facebook</p><h2 class="{H2}">Export pour la Tunisie</h2></div>
<p class="font-body text-[#A3A3A8] max-w-md">Quelques voitures publiées par Chaari Auto sur Instagram et Facebook, avec la date de publication.</p>
</div>
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
{chr(10).join(items)}
</div>
</div>
</section>'''


def dialog():
    return f'''<div id="car-dialog" class="fixed inset-0 z-[70] hidden" role="dialog" aria-modal="true" aria-labelledby="cd-title">
<div class="absolute inset-0 bg-black/85" data-dclose></div>
<div class="absolute inset-0 lg:inset-y-8 lg:inset-x-10 xl:inset-x-20 bg-[{S1}] border border-[{LINE}] overflow-y-auto lg:flex lg:flex-col lg:overflow-hidden">
<div class="sticky top-0 z-10 shrink-0 flex items-center justify-between gap-4 px-4 lg:px-8 h-14 bg-[{S1}]/95 backdrop-blur border-b border-[{LINE}]">
<p class="font-mono text-[11px] uppercase tracking-[0.18em] text-[{RED}]">Détail du véhicule</p>
<button type="button" class="text-[#F4F4F2] text-2xl leading-none px-2" data-dclose aria-label="Fermer">✕</button>
</div>
<div class="grid lg:grid-cols-[1.55fr_1fr] lg:grid-rows-[minmax(0,1fr)] lg:flex-1 lg:min-h-0 gap-8 lg:gap-12 p-4 lg:p-8">
<div class="lg:flex lg:flex-col lg:min-h-0">
<div id="cd-stage" class="relative bg-black aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0 overflow-hidden select-none">
<img id="cd-img" alt="" class="w-full h-full object-contain"/>
<button type="button" id="cd-prev" class="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 border border-[{LINE}] bg-black/70 hover:bg-black text-white text-xl" aria-label="Photo précédente">‹</button>
<button type="button" id="cd-next" class="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 border border-[{LINE}] bg-black/70 hover:bg-black text-white text-xl" aria-label="Photo suivante">›</button>
<p id="cd-count" class="absolute bottom-3 right-3 font-mono text-xs bg-black/75 text-white px-2.5 py-1" aria-live="polite">1 / 1</p>
</div>
<div id="cd-thumbs" class="mt-3 shrink-0 grid grid-cols-6 gap-2"></div>
</div>
<div class="lg:min-h-0 lg:overflow-y-auto lg:pr-1">
<p id="cd-tag" class="hidden mb-3"><span class="font-mono text-[10px] font-bold uppercase tracking-[0.12em] bg-[{RED}] text-white px-2 py-1">Voiture d'un client</span></p>
<h2 id="cd-title" tabindex="-1" class="font-headline font-bold uppercase text-3xl lg:text-5xl leading-[0.95] text-[#F4F4F2] mb-6 focus:outline-none"></h2>
<dl id="cd-specs" class="border-t border-[{LINE}] mb-7"></dl>
<div class="flex flex-wrap gap-3 mb-6">
<a id="cd-wa" class="{BTN_RED}" href="#" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp</span></a>
<a class="{BTN_OUT}" href="{TEL}">Appeler</a>
</div>
<p class="font-mono text-[11px] leading-relaxed text-[#77777C]">Informations tirées de la publication de Chaari Auto (<a id="cd-src" class="underline hover:text-white" href="#" target="_blank" rel="noopener">voir la publication</a>).</p>
</div>
</div>
</div>
</div>'''


def videos():
    tiles = []
    for cid, name, year, vid, date in CLIPS:
        p = META[f"poster-{cid}"]
        cap = f"{name} · Modèle {year}"
        tiles.append(f'''<figure class="vtile shrink-0 w-[68vw] sm:w-[260px] lg:w-auto snap-start">
<div class="relative aspect-[9/16] bg-[{S1}] overflow-hidden">
<video class="clip w-full h-full object-cover" src="{V}{cid}.mp4" poster="{P}poster-{cid}-640.webp" preload="none" muted playsinline loop width="720" height="1280" aria-label="Vidéo : {esc(cap)}, publiée par Chaari Auto sur Facebook le {fr_date(date)}"></video>
<button type="button" class="play absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/0 transition-colors" aria-label="Lire la vidéo : {esc(cap)}">
<span class="w-14 h-14 rounded-full border border-white/70 bg-black/55 text-white flex items-center justify-center">{PLAY_SVG}</span></button>
</div>
<figcaption class="pt-3">
<p class="font-mono text-[11px] uppercase tracking-[0.1em] text-[#F4F4F2]">{esc(cap)}</p>
<p class="font-mono text-[11px] uppercase tracking-[0.1em] text-[#77777C] mt-1">Facebook · {fr_date(date)} · <a class="underline hover:text-white" href="https://www.facebook.com/reel/{vid}" target="_blank" rel="noopener">Voir sur Facebook</a></p>
</figcaption>
</figure>''')
    return f'''<section id="videos" class="bg-[{BG}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP}">
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
<div><p class="{LABEL} mb-3">Instagram · Facebook</p><h2 class="{H2}">En vidéo</h2></div>
<p class="font-body text-[#A3A3A8] max-w-md">Extraits de vidéos publiées par Chaari Auto, sans le son. La vidéo complète est sur Facebook.</p>
</div>
<div class="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none]">
{chr(10).join(tiles)}
</div>
</div>
</section>'''


def reviews():
    quotes = "\n".join(f'''<figure class="py-8 lg:py-0 lg:px-8 first:lg:pl-0 border-b lg:border-b-0 lg:border-l first:lg:border-l-0 border-[{LINE}] flex flex-col">
<blockquote class="font-body text-lg text-[#E6E6E2] leading-relaxed mb-6 flex-1">« {esc(q)} »</blockquote>
<figcaption class="border-t border-[{LINE}] pt-4"><p class="font-mono text-xs font-bold uppercase tracking-wider text-[#F4F4F2]">{esc(a)}</p>
<p class="font-mono text-[11px] uppercase tracking-wider text-[#77777C] mt-1"><span class="text-[{RED}]" aria-label="5 étoiles sur 5">★★★★★</span> Avis Google</p></figcaption>
</figure>''' for q, a in REVIEWS[:4])
    return f'''<section id="avis" class="bg-[{S1}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP}">
<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-8 border-b border-[{LINE}]">
<div><p class="{LABEL} mb-3">Google</p><h2 class="{H2}">Avis clients</h2></div>
<a href="{REVIEWS_URL}" target="_blank" rel="noopener" class="flex items-baseline gap-3 hover:opacity-90"><span class="font-headline font-bold text-7xl text-[#F4F4F2] leading-none">{RATING}</span><span class="font-mono text-xs uppercase tracking-wider text-[#A3A3A8]"><span class="text-[{RED}]">★</span> {REVIEWS_N} avis Google</span></a>
</div>
<div class="grid lg:grid-cols-4">
{quotes}
</div>
<a class="inline-block mt-10 font-mono text-xs uppercase tracking-[0.12em] text-[#D6D6D2] hover:text-[{RED}]" href="{REVIEWS_URL}" target="_blank" rel="noopener">Tous les avis sur Google →</a>
</div>
</section>'''


def faq():
    items = "\n".join(f'''<details class="group border-b border-[{LINE}]"{" open" if i == 0 else ""}>
<summary class="flex items-center justify-between gap-6 py-6 cursor-pointer list-none font-headline font-bold uppercase text-xl lg:text-2xl text-[#F4F4F2]">{esc(q)}<span class="font-mono text-[{RED}] text-xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span></summary>
<p class="font-body text-[#C9C9C5] leading-relaxed pb-6 max-w-2xl">{esc(a)}</p>
</details>''' for i, (q, a) in enumerate(FAQ))
    return f'''<section id="faq" class="bg-[{BG}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP} grid lg:grid-cols-[1fr_2fr] gap-10">
<div><p class="{LABEL} mb-3">FAQ</p><h2 class="{H2}">Questions fréquentes</h2></div>
<div class="border-t border-[{LINE}]">
{items}
</div>
</div>
</section>'''


def contact():
    rows = [("WhatsApp", f'<a class="hover:text-[{RED}]" href="{wa_link()}" target="_blank" rel="noopener">{PHONE}</a>'),
            ("Téléphone", f'<a class="hover:text-[{RED}]" href="{TEL}">{PHONE}</a>'),
            ("E-mail", f'<a class="hover:text-[{RED}] break-all" href="mailto:{EMAIL}">{EMAIL}</a>'),
            ("Adresse", esc(ADDRESS)),
            ("Horaires", "<br/>".join(f"{d} · {h}" for d, h in HOURS)),
            ("Réseaux", f'<a class="hover:text-[{RED}]" href="{FB_URL}" target="_blank" rel="noopener">Facebook</a> · <a class="hover:text-[{RED}]" href="{IG_URL}" target="_blank" rel="noopener">Instagram</a> · <a class="hover:text-[{RED}]" href="{TT_URL}" target="_blank" rel="noopener">TikTok</a>')]
    dl = "\n".join(f'<div class="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 py-4 border-b border-[{LINE}]"><dt class="font-mono text-[11px] uppercase tracking-wider text-[#77777C] pt-0.5">{k}</dt><dd class="font-mono text-sm text-[#F4F4F2] leading-relaxed">{v}</dd></div>' for k, v in rows)
    return f'''<section id="contact" class="bg-[{BG}] py-20 lg:py-28 border-b border-[{LINE}]">
<div class="{WRAP} grid lg:grid-cols-2 gap-10 lg:gap-16">
<div>
<p class="{LABEL} mb-3">Contact</p>
<h2 class="{H2} mb-8">Contact</h2>
<dl class="border-t border-[{LINE}]">
{dl}
</dl>
</div>
<div class="flex flex-col">
<div id="map" class="relative flex-1 min-h-[360px] bg-[{S1}] border border-[{LINE}] overflow-hidden">
<div id="map-ph" class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
<span class="w-4 h-4 bg-[{RED}] outline outline-4 outline-[{RED}]/25" aria-hidden="true"></span>
<p class="font-mono text-xs uppercase tracking-wider text-[#F4F4F2]">Lindenstraße 16 · 74321 Bietigheim-Bissingen</p>
<p class="font-mono text-[11px] text-[#77777C]">{LAT}° N, {LNG}° E</p>
<button id="map-load" type="button" class="{BTN_OUT} mt-2">Afficher la carte (Google Maps)</button>
<p class="font-body text-xs text-[#77777C] max-w-xs">La carte est chargée depuis Google seulement si vous cliquez.</p>
</div>
</div>
<div class="flex flex-wrap gap-3 mt-4">
<a class="{BTN_OUT}" href="{DIR_URL}" target="_blank" rel="noopener">Itinéraire</a>
<a class="{BTN_OUT}" href="{MAPS_URL}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a>
</div>
</div>
</div>
</section>'''


def cta():
    return f'''<section class="relative overflow-hidden border-b border-[{LINE}]">
{img("cta", "Cupra Formentor gris avec la plaque CHAARI AUTO", "absolute inset-0 w-full h-full object-cover object-[30%_55%]", "100vw")}
<div class="absolute inset-0 bg-[{BG}]/75"></div>
<div class="relative {WRAP} py-24 lg:py-36 text-center flex flex-col items-center">
<p class="{PLATE} text-base mb-8" aria-hidden="true">CHAARI AUTO</p>
<h2 class="font-headline font-bold uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.92] text-[#F4F4F2] max-w-4xl mb-10">Votre prochaine voiture, depuis l'Europe</h2>
<div class="flex flex-wrap justify-center gap-3">
<a class="{BTN_RED}" href="{wa_link()}" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp</span></a>
<a class="{BTN_OUT} bg-black/30" href="{TEL}">Appeler {PHONE}</a>
</div>
</div>
</section>'''


def legal():
    ph = '<span class="text-[#FFB020]">[À compléter par le propriétaire]</span>'
    return f'''<section id="mentions-legales" class="bg-[{BG}] py-16 lg:py-20 border-b border-[{LINE}]">
<div class="{WRAP} grid lg:grid-cols-2 gap-10 lg:gap-16 font-body text-sm text-[#A3A3A8] leading-relaxed">
<div>
<h2 class="font-headline font-bold uppercase text-2xl text-[#F4F4F2] mb-4">Mentions légales / Impressum</h2>
<p class="mb-3"><strong class="text-[#D6D6D2]">Angaben gemäß § 5 DDG</strong><br/>Chaari Auto · Forme juridique / Rechtsform : {ph}<br/>Lindenstraße 16, 74321 Bietigheim-Bissingen, Deutschland</p>
<p class="mb-3">Vertreten durch / Représenté par : {ph}<br/>Telefon : {PHONE} · E-Mail : {EMAIL}</p>
<p class="mb-3">Registereintrag / Registre : {ph}<br/>USt-IdNr. : {ph}</p>
<p>Verantwortlich für den Inhalt : {ph}</p>
</div>
<div>
<h2 id="datenschutz" class="font-headline font-bold uppercase text-2xl text-[#F4F4F2] mb-4">Datenschutz</h2>
<p class="mb-3">Responsable / Verantwortlicher : {ph}, Lindenstraße 16, 74321 Bietigheim-Bissingen, {EMAIL}.</p>
<p class="mb-3">Ce site n'utilise ni cookies ni outil de mesure d'audience. Le formulaire « Votre demande » n'envoie rien à ce site : il ouvre WhatsApp avec votre message, que vous choisissez d'envoyer ou non (WhatsApp Ireland Ltd.).</p>
<p class="mb-3">La carte Google Maps n'est chargée qu'après votre clic (Google Ireland Ltd.). Les vidéos et photos sont hébergées sur ce site.</p>
<p>Hébergement, durée de conservation et droits des personnes : {ph}</p>
</div>
</div>
</section>'''


def footer():
    return f'''<footer class="bg-[{BG}] pt-12 pb-28 lg:pb-12">
<div class="{WRAP} flex flex-col lg:flex-row lg:items-center justify-between gap-6">
<div class="flex flex-col sm:flex-row sm:items-center gap-4">
<a href="#top" class="{PLATE} text-sm self-start">CHAARI AUTO</a>
<p class="font-body text-sm text-[#A3A3A8]">Export de voitures de l'Europe vers la Tunisie et la France</p>
</div>
<nav aria-label="Liens du pied de page" class="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-[#A3A3A8]">
<a class="hover:text-white" href="#mentions-legales">Mentions légales / Impressum</a>
<a class="hover:text-white" href="#datenschutz">Datenschutz</a>
<a class="hover:text-white" href="{FB_URL}" target="_blank" rel="noopener">Facebook</a>
<a class="hover:text-white" href="{IG_URL}" target="_blank" rel="noopener">Instagram</a>
<a class="hover:text-white" href="{TT_URL}" target="_blank" rel="noopener">TikTok</a>
</nav>
<p class="font-mono text-[11px] text-[#77777C]">© 2026 Chaari Auto</p>
</div>
</footer>'''


def mobile_extras():
    a = "\n".join(f'<a class="py-3 border-b border-[{LINE}]" href="{h}" data-close>{t}</a>' for h, t in NAV)
    return f'''<div id="drawer" class="fixed inset-0 z-[60] hidden" role="dialog" aria-modal="true" aria-label="Menu">
<div class="absolute inset-0 bg-black/70" data-close></div>
<nav class="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-[{S1}] border-l border-[{LINE}] p-6 flex flex-col font-headline font-bold uppercase text-2xl text-[#F4F4F2] overflow-y-auto">
<button type="button" class="self-end text-3xl leading-none mb-6" data-close aria-label="Fermer le menu">✕</button>
{a}
<a class="mt-8 {BTN_RED} !text-sm" href="{wa_link()}" target="_blank" rel="noopener">{WA_SVG}<span>WhatsApp {PHONE}</span></a>
<p class="mt-5 font-mono text-xs normal-case font-normal text-[#A3A3A8] leading-relaxed">{HOURS_SHORT}<br/>{esc(ADDRESS)}</p>
</nav>
</div>
<nav id="actionbar" aria-label="Actions rapides" class="fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 bg-[{S1}] border-t border-[{LINE}] font-mono text-xs font-bold uppercase tracking-[0.12em] translate-y-full transition-transform lg:hidden">
<a class="py-4 flex items-center justify-center gap-2 text-white bg-[{RED}]" href="{wa_link()}" target="_blank" rel="noopener">{WA_SVG}WhatsApp</a>
<a class="py-4 text-center text-[#F4F4F2]" href="{TEL}">Appeler</a>
</nav>'''


def data_json():
    cars = {}
    for c in CARS:
        specs = [("Modèle", title(c)), ("Année", f"Modèle {c['year']}")] + c["specs"] + [("Publié le", fr_date(c["date"])), ("Source", c["source"])]
        cars[c["id"]] = {"title": f"{title(c)} · {c['year']}", "client": c["kind"] == "client", "url": c["url"], "wa": wa_link(car_wa(c)),
                         "specs": specs,
                         "photos": [{"src": f"{P}{c['id']}-{n}-{min(META[f'{c['id']}-{n}']['widths'][-1], 1600)}.webp",
                                     "thumb": f"{P}{c['id']}-{n}-640.webp", "alt": c["alt"][n - 1]} for n in range(1, c["n"] + 1)]}
    return json.dumps(cars, ensure_ascii=False).replace("</", "<\\/")


SCRIPT = r'''<script>
(() => {
  const RED = '__RED__', WA = '__WA__';
  const $ = id => document.getElementById(id);
  const CARS = JSON.parse($('cars-data').textContent);
  // ---------- Request form -> wa.me ----------
  const form = $('req'), open_ = $('f-open'), model = $('f-model');
  open_.addEventListener('change', () => { model.required = !open_.checked; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('req-err'); err.classList.add('hidden');
    const bad = [...form.querySelectorAll('[required]')].find(i => !i.value.trim());
    if (bad) { err.textContent = 'Merci de remplir : ' + bad.labels[0].textContent.replace(' *', '') + '.'; err.classList.remove('hidden'); bad.focus(); return; }
    const v = id => $(id).value.trim(); const s = id => { const x = $(id).value; return x === 'Peu importe' ? '' : x; };
    const lines = ['Bonjour Chaari Auto, je souhaite importer une voiture en Tunisie.'];
    const add = (k, x) => { if (x) lines.push(k + ' : ' + x); };
    add('Modèle', v('f-model') || (open_.checked ? 'ouvert(e) aux suggestions' : ''));
    if (v('f-model') && open_.checked) lines.push('Ouvert(e) aux suggestions');
    add('Année', v('f-year')); add('Carburant', s('f-fuel')); add('Boîte', s('f-gear')); add('Budget', v('f-budget'));
    add('Je réside en', v('f-country')); add('Livraison à', v('f-city')); add('Nom', v('f-name'));
    const url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n'));
    form.dataset.wa = url;
    window.open(url, '_blank', 'noopener');
  });
  // ---------- Car dialog ----------
  const dlg = $('car-dialog');
  let cur = null, idx = 0, lastFocus = null;
  const show = i => {
    const p = cur.photos; idx = (i + p.length) % p.length;
    $('cd-img').src = p[idx].src; $('cd-img').alt = p[idx].alt;
    $('cd-count').textContent = (idx + 1) + ' / ' + p.length;
    [...$('cd-thumbs').children].forEach((t, k) => { t.style.outline = k === idx ? '2px solid ' + RED : 'none'; t.setAttribute('aria-current', k === idx); });
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const open = (id, push = true) => {
    cur = CARS[id]; if (!cur) return;
    if (dlg.classList.contains('hidden')) lastFocus = document.activeElement;
    $('cd-title').textContent = cur.title; $('cd-tag').classList.toggle('hidden', !cur.client);
    $('cd-specs').innerHTML = cur.specs.map(([k, v]) => '<div class="grid grid-cols-2 gap-4 py-3 border-b border-[#2A2A2E]"><dt class="font-mono text-[11px] uppercase tracking-wider text-[#77777C]">' + esc(k) + '</dt><dd class="font-mono text-sm text-[#F4F4F2] text-right">' + esc(v) + '</dd></div>').join('');
    $('cd-wa').href = cur.wa; $('cd-src').href = cur.url;
    $('cd-thumbs').innerHTML = cur.photos.map((p, k) => '<button type="button" class="aspect-[4/3] lg:aspect-auto lg:h-[clamp(56px,11vh,110px)] overflow-hidden bg-black" aria-label="Photo ' + (k + 1) + '"><img src="' + p.thumb + '" alt="" loading="lazy" class="w-full h-full object-cover"/></button>').join('');
    [...$('cd-thumbs').children].forEach((t, k) => t.addEventListener('click', () => show(k)));
    show(0);
    dlg.classList.remove('hidden'); document.body.style.overflow = 'hidden';
    $('cd-title').focus();
    if (push) history.replaceState(null, '', '#car-' + id);
  };
  const close = () => {
    if (dlg.classList.contains('hidden')) return;
    dlg.classList.add('hidden'); document.body.style.overflow = '';
    history.replaceState(null, '', location.pathname + location.search + '#voitures');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
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
  // ---------- Videos: one plays at a time, pause when out of view ----------
  const clips = [...document.querySelectorAll('video.clip')];
  const stopOthers = v => clips.forEach(o => { if (o !== v && !o.paused) o.pause(); });
  document.querySelectorAll('.vtile').forEach(t => {
    const v = t.querySelector('video'), b = t.querySelector('.play');
    b.addEventListener('click', () => { stopOthers(v); v.controls = true; b.hidden = true; v.play(); });
    v.addEventListener('play', () => stopOthers(v));
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (!en.isIntersecting && !en.target.paused) en.target.pause(); }), { threshold: 0.25 });
    clips.forEach(v => io.observe(v));
  }
  // ---------- Click-to-load map ----------
  $('map-load').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = '__EMBED__'; f.title = 'Carte : Chaari Auto, Lindenstraße 16, Bietigheim-Bissingen';
    f.className = 'absolute inset-0 w-full h-full border-0'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
    $('map-ph').replaceWith(f);
  });
  // ---------- Drawer ----------
  const drawer = $('drawer'), mb = $('menu-btn');
  mb.addEventListener('click', () => { drawer.classList.remove('hidden'); mb.setAttribute('aria-expanded', 'true'); drawer.querySelector('[data-close]:not(.absolute)')?.focus(); });
  const shut = () => { drawer.classList.add('hidden'); mb.setAttribute('aria-expanded', 'false'); };
  drawer.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', shut));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.classList.contains('hidden')) { shut(); mb.focus(); } });
  // ---------- Action bar after the hero ----------
  const bar = $('actionbar'), hero = $('top');
  const onScroll = () => bar.classList.toggle('translate-y-full', hero.getBoundingClientRect().bottom > 0);
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
})();
</script>'''

HEAD = f'''<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Chaari Auto — Export de voitures d'Europe vers la Tunisie</title>
<meta name="description" content="Chaari Auto, spécialiste de l'exportation de voitures d'Europe vers la Tunisie. Service clé en main pour les Tunisiens résidant à l'étranger : achat, dossier d'exportation, carte grise et assurance, gestion jusqu'à la livraison. WhatsApp {PHONE}."/>
<link rel="preload" as="image" href="{P}hero-1024.webp" imagesrcset="{srcset("hero")}" imagesizes="(min-width:1024px) 42vw, 100vw"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&amp;family=Geist:wght@400;500;600&amp;family=Space+Mono:wght@400;700&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {{ theme: {{ extend: {{ fontFamily: {{
  headline: ["'Archivo Narrow'", "sans-serif"], body: ["Geist", "sans-serif"], mono: ["'Space Mono'", "monospace"] }} }} }} }};
</script>
<style>
  body {{ background:{BG}; color:#F4F4F2; font-family:Geist,sans-serif; -webkit-font-smoothing:antialiased; }}
  .font-mono {{ font-variant-numeric:tabular-nums; }}
  [hidden] {{ display:none!important; }}
  html {{ scroll-padding-top:5.5rem; }}
  summary::-webkit-details-marker {{ display:none; }}
  a:focus-visible, button:focus-visible, select:focus-visible, input:focus-visible, summary:focus-visible {{ outline:2px solid {RED}; outline-offset:2px; }}
  select {{ appearance:none; background-image:linear-gradient(45deg,transparent 50%,#A3A3A8 50%),linear-gradient(135deg,#A3A3A8 50%,transparent 50%); background-position:calc(100% - 18px) 50%,calc(100% - 13px) 50%; background-size:5px 5px; background-repeat:no-repeat; }}
  @media (prefers-reduced-motion: reduce) {{ html {{ scroll-behavior:auto; }} * {{ transition:none!important; }} }}
</style>
</head>
<body class="min-h-screen selection:bg-[{RED}] selection:text-white">'''


def build():
    body = "\n".join([header(), "<main>", hero(), steps(), audience(), request_form(), gallery(), videos(), reviews(), faq(), contact(), cta(),
                      legal(), "</main>", footer(), dialog(), mobile_extras()])
    s = (HEAD + "\n" + body + f'\n<script type="application/json" id="cars-data">{data_json()}</script>\n'
         + SCRIPT.replace("__RED__", RED).replace("__WA__", WA).replace("__EMBED__", EMBED) + "\n</body>\n</html>\n")
    text = re.sub(r"<script.*?</script>", " ", s, flags=re.S)
    text = html.unescape(re.sub(r"<[^>]+>", " ", text)).lower()
    for b in BANNED:
        assert not re.search(b, text), f"banned phrase: {b} -> {re.search(b, text).group(0)}"
    assert s.count('<article id="car-') == len(CARS)
    for key in re.findall(r'photos/([\w-]+?)-\d+\.webp', s):
        assert key in META, key
    for cid, *_ in CLIPS:
        assert (ROOT / "site" / "public" / "videos" / f"{cid}.mp4").exists(), cid
    OUT.write_text(s, encoding="utf-8")
    print("wrote", OUT, len(s), "bytes;", s.count("<img"), "imgs;", len(CARS), "cars;", len(CLIPS), "clips")


if __name__ == "__main__":
    build()
