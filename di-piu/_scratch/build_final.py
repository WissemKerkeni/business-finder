"""Build di-piu/stitch/desktop-final.html from the Stitch v3 export.

Replaces the Stitch menu panels with a data-driven renderer (every category gets a
real Google Maps photo; matched dishes get thumbnails) and removes invented copy.
"""
import pathlib, re

root = pathlib.Path(__file__).resolve().parents[1]
src = (root / "stitch" / "desktop-v3.html").read_text(encoding="utf-8")
lines = src.split("\n")

# Lines 278..802 (1-based) = old panels, table strip and tab script.
start = next(i for i, l in enumerate(lines) if 'id="tab-panel-pizza"' in l) - 1
end = next(i for i, l in enumerate(lines) if "<!-- Menu subtext -->" in l)
assert "TAB PANEL: PIZZA" in lines[start], lines[start]

G = "https://lh3.googleusercontent.com/gps-cs-s/"
IMG = {
    "mussels": G + "AHRPTWnyAb2h0icCLqqkx6YnYf6dVS95h0U1NKJMganyS-P0c55RMuS14xBP8GXTQusHnzCx00Y1LNuJrbymomAWcdHUQk2H-cRIBsxFWe177-ix3MBymuqLbFMjgk1sLPiMe3sG4MZx8QaPTgsJ",
    "saladFDM": G + "AHRPTWn3X6IDogaqeWQt96nj8LIWE4zGnCbp6QISjCLHiaS7JWGRwpNFsFcQzrG5JI7YNoS9UC7RuP98MsFxmfqTBhtiNqc79Ga6b7m36XF8dLyWZP8-WvJ6Jd_aZz30xcCUI6p9xmFt0WQNK-Ht",
    "pizzaMojito": G + "AHRPTWmf57ATQufdMT5Lci045HnW9C5_GxpeLY1pkhTb_71_2o-iCMrx2omK2OUiITH4VY2ZhSunGIV6yIJqsb8UqYi3M5tSysfhTvblsRKHSAlM8QrNXWjUgQVOyFrik-FYCWZI28rn5BKsiD0",
    "pizzaBurrata": G + "ANWiy9SElqdWYmiK2ArjBiXJ3nzB4Lu23OkrSoinZBLK2h1-N7A9V4cFesnYK-rgWKO-KBnabZndwtubJUQHJV-S4K7M-SP6SjGvQPOYvl6cHfCF02fNo3iohtD1ZB4YlmRwSf3ScZScq1YlmQGq",
    "spaghettiSeafood": G + "AHRPTWmZz4_SVQ264VVk6qPL6SLFJFSK5j8C_qkDN8_tQ5zVHxK29Kd8G-B3ipw1EAS5OOCs_sVkDcCcNasUIoktdKFvNJI8Ot5hLOcrJGd9Kpz6foiKe0Zn1s25-oX86_iqsK64k5OSpyL0hdwq",
    "tagliatelleFDM": G + "AHRPTWlZCGICcoTnV94kr5szbieKrUEeKsBZn0q1-q_Q1b-Nr-ChVo0B8vwEbrYMMIQfaArWgW0NFcD-jEgU7QWOsmKWsQkOMtThLY6CwbEFijDVYpWYjz6WZBbhHXccfuqSN5w2x0qYqOsuo74",
    "patesDiPiu": G + "AHRPTWkm2Zi9kbam4MsGbADSb2zSqOXPmiXA-B63i-Dpt3sNH0kygna8A5ePB8kCmJ21irU1xS9H1p_QtLBsimx36NpHUCK7v-iqnC630xmXfMgJGMNIaX4DN-vYVwYF-_Du1Gk1ciX9102KdQQ",
    "ravioliSalmon": G + "AHRPTWmKBJp69GLvGJP4Alhw_vo_9JDRxaFBZ3SAf-QI34fxcyFQlF9lTNgU9-R-s0H2uv6roYM-5Rw-Sg597jnb5OZD0-XgW4wOr-TeztDA84KTLr-FBQiaD5XYvg1LFaNMjzYhhPv_CFN88GM",
    "risottoFDM": G + "AHRPTWmkDNj_VMiMK1DWdlVGx5sFJhWCqOsS2vg1bEST9b2j5gF6W4SM_0PCNeo3lY_OiBgkqpMY6YAYGGlbLoM2ot6w5Jk5DNkah8Qa9mkYW5NnR1DrGRxxsKMoUwRc5K7PyGiDgLurMpIYT7-4",
    "platSupreme": G + "AHRPTWlerg6o4p-Q5P3AP3jD7AbkKdEQpitlXMZZnmHxo1OWo-DfS9MJBm2UydkabuCv2gYVgDA0bZonWIiyzr11T1lZUa-TVSj5BBoVIwtzcV90abGKUF6stZZq1G4HEud_dSMOriU_E5buck5s",
    "supremeChamp": G + "AHRPTWkLx7vVthHfGFaq3W9iIjd3J4avHOrxpNFQZp9bypkxEpsy9bydcv_-mBqfVRpx04IdKD15ciPHUAlHgNwbK71fHNy88BZWQvOgWJ6fdFYiLae9TXrELrjrukIujAGV-9k39GiBYC1RFv8",
    "dorade": G + "AHRPTWkumJds7ifbnMb-jJ4bA4uI41nbRKBNxGWy-8pMaJr7_dO5gz6Ko-xd72z8aMAe0w2WbpAy-ZElAjgvNMD8niGJPOkxBVD-MF0E_QquyEcnM8l6DMfWLfyDFI5foyLHF-GsQdsyIqm7xJum",
    "escalope": G + "AHRPTWmrVCZlC7BPUc_3GSRUhsGlXMKhfIPbh4X-j6uCnR7vtwszM3HnUx-Pb4pM8LX6uvjQEhKLuktgq8SxTt0I4YQvcNoNvribEspWukPHMni3TBgzwLBU9Vi6V6V6VCNvpkDrBMnNxvxznfc",
    "cheesecake": G + "AHRPTWn2F9hNLeB1lzBo7vCPIOc7ezDYxYIdeIjcRfF9SKn-1mfvjyRA1iO3EbnuFCbCz4vy21kR-IouiqFbju7VJijo5q3Sk9sp9uIGVTEOWqZsKDrF7Buonal91YL6LZ_NZiPpyxg4DtIK5Cb1",
}

menu_block = r'''<!-- MENU PANELS: rendered from MENU data below (content = restaurant's printed menu) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20" id="menu-panel">
<figure class="lg:col-span-5 lg:sticky lg:top-24">
<div class="w-full aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-sm border border-hairline-dark bg-night">
<img alt="" class="w-full h-full object-cover transition-opacity duration-300" id="menu-photo" referrerpolicy="no-referrer" src=""/>
</div>
<figcaption class="block text-[11px] uppercase tracking-ultra-wide text-mutedtext mt-3" id="menu-caption"></figcaption>
</figure>
<div class="lg:col-span-7" id="menu-lists"></div>
</div>
<!-- "PHOTOGRAPHED AT DI PIÙ" STRIP -->
<div class="pt-12 border-t border-hairline-dark">
<div class="flex items-baseline justify-between mb-6 gap-4">
<span class="text-[11px] uppercase tracking-ultra-wide text-accent font-semibold block">Seen on the table</span>
<span class="text-xs text-mutedtext font-light">Guest photos from Google Maps</span>
</div>
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4" id="menu-strip"></div>
</div>
<script>
const IMG = __IMG__;
const MENU = {
  antipasti: { photo: 'mussels', caption: 'Antipasti & salades · Di Più', sections: [
    { title: 'Antipasti', items: [
      ['Soupe aux lentilles', '', '9.8', null, 'Nouveau'],
      ['Bisque de crevettes', '', '12.8', null, 'Nouveau'],
      ['Mozzarella chaude panée', '', '21.9'],
      ['Calamars dorés', '6 pièces', '24.9'],
      ['Crabes panés', '6 pièces', '25.9', null, 'Nouveau'],
      ['Moules marinières à la crème', '', '27.9'] ]},
    { title: 'Salades', items: [
      ['Italienne', 'laitue, roquette, tomates cerises, œuf, jambon fumé, gruyère', '23.9'],
      ['Burrata', 'laitue, roquette, tomates cerises, burrata, pesto, pignons', '24.9'],
      ['César', 'laitue, roquette, tomates cerises, poulet fumé, croûtons, parmesan, noix', '25.9'],
      ['Fruits de mer', 'laitue, tomates cerises, fruits de mer', '29.5', 'saladFDM'] ]} ]},
  pizza: { photo: 'pizzaMojito', caption: 'Pizza & mojito on the terrace · Di Più', sections: [
    { title: 'Pizze', items: [
      ['Margarita', 'sauce tomate, mozzarella, basilic', '15.9'],
      ['Neptune', 'sauce tomate, mozzarella, thon, basilic, olive', '18.9'],
      ['Poulet', 'sauce blanche, mozzarella, poulet, champignons, poivre', '20.9'],
      ['Végétarienne', 'aubergines et courgettes grillées, champignons frais', '23.9'],
      ['Pepperoni', 'sauce tomate, mozzarella, pepperoni', '24.9'],
      ['Reine', 'sauce tomate, mozzarella, jambon fumé, champignons', '25.9'],
      ['Bresaola', 'bresaola, roquette, parmesan, sauce balsamique', '25.9', null, 'Nouveau'],
      ['5 Fromages', 'mozzarella, gruyère, roquefort, gouda, parmesan', '25.9'],
      ['Campione', 'viande hachée, mozzarella, champignons', '26.9'],
      ['Burrata', 'sauce tomate, mozzarella, burrata, roquette, parmesan, balsamique', '27.9', 'pizzaBurrata'],
      ['Fruits de mer', '', '27.8'],
      ['Saumon', 'sauce blanche ou rosée, mozzarella, saumon fumé, épinards', '29.9'] ]} ]},
  pasta: { photo: 'spaghettiSeafood', caption: 'Pasta · spaghetti, penne, farfalle ou tagliatelle', sections: [
    { title: 'Pasta', note: 'spaghetti, penne, farfalle ou tagliatelle', items: [
      ['Puttanesca', 'thon, câpres, olives, cornichons, piment de Cayenne', '22.8'],
      ['Bolognaise', 'viande hachée, parmesan', '23.8'],
      ['Cléopatra', 'poulet, champignons frais, parmesan', '27.8'],
      ['Carbonara', 'jambon fumé, bacon, parmesan', '27.8'],
      ['4 Fromages', 'gruyère, parmesan, roquefort, cheddar', '29.8'],
      ['Burrata', 'pesto, burrata, pignons, roquette', '30.8'],
      ['Émincé de bœuf champignons', 'émincé de bœuf, champignons, pesto', '33.8'],
      ['Fruits de mer', 'sauce tomate, rosée ou crème, fruits de mer, tomate cerise, poivron, basilic', '37.8', 'tagliatelleFDM'],
      ['Pâtes Di Più', 'pesto, parmesan, pistache, suprême de poulet roulé, ricotta, épinards, crevettes', '38.9', 'patesDiPiu', 'Maison'],
      ['Duo de saumon', 'saumon fumé, pavé de saumon frais, tomates cerises, parmesan', '39.8'],
      ['Pâtes au mérou', '', '39.8'] ]} ]},
  ravioli: { photo: 'ravioliSalmon', caption: 'Ravioli saumon fumé · Di Più', sections: [
    { title: 'Ravioli & Lasagne', items: [
      ['Ravioli épinards, ricotta, champignons', 'crème fraîche, épinards, ricotta, champignons frais, parmesan', '28.8'],
      ['Ravioli bolognaise', 'sauce tomate, viande hachée, parmesan', '30.8'],
      ['Ravioli 4 fromages', 'crème fraîche, gruyère, parmesan, roquefort, cheddar', '31.8'],
      ['Ravioli saumon fumé', 'crème fraîche, saumon fumé, tomates cerises, basilic, parmesan', '35.8', 'ravioliSalmon'],
      ['Lasagnes bolognaise', '', '24.8'],
      ['Lasagnes fruits de mer', '', '31.8'] ]},
    { title: 'Risotto', items: [
      ['Risotto 4 fromages', '', '31.8'],
      ['Risotto poulet champignons', '', '32.8'],
      ['Risotto fruits de mer', '', '39.8', 'risottoFDM'] ]} ]},
  plats: { photo: 'platSupreme', caption: 'Plats · Di Più', sections: [
    { title: 'Volailles', items: [
      ['Escalope de poulet grillée', 'avec assortiments', '23.9'],
      ['Escalope de poulet panée', 'avec assortiments', '24.9', 'escalope'],
      ['Suprême sauce champignons', '', '28.9', 'supremeChamp'],
      ['Suprême farci ricotta épinards', 'avec assortiments', '31.9'] ]},
    { title: 'Viandes', items: [
      ['Émincé de bœuf sauce champignons', '', '38.8'],
      ['Filet de bœuf, 3 sauces', 'poivre, parmesan, champignons', '46.8'],
      ['Côte à l’os grillée, 500 g', 'avec assortiments', '49.9'],
      ['Carré d’agneau, 3 sauces', 'champignons, poivre, parmesan', '49.9'],
      ['Souris d’agneau à la moutarde, 600 g', '', '69.9'] ]},
    { title: 'Poissons', items: [
      ['Loup grillé', 'avec assortiments', '29.8'],
      ['Filet de dorade sauce citron', '', '33.8'],
      ['Crevettes crunchy aux amandes effilées', 'avec assortiments', '37.8'],
      ['Symphonie fruits de mer · pour 2', 'loup grillé, crevettes panées, fruits de mer sautés, calamars dorés, moules à la crème', '119.5'] ]} ]},
  dolci: { photo: 'cheesecake', caption: 'Cheesecake · Di Più', sections: [
    { title: 'Dolci', items: [
      ['Red velvet', '', '8.4'],
      ['Cheesecake', 'noisette, Oreo, spéculoos ou Nutella', '11.8', 'cheesecake'],
      ['Saint-Sébastien', '', '12.8'],
      ['Tiramisu', '', '12.9'],
      ['Sorbet citron', '2 boules', '6.5'],
      ['Glace', '2 boules · 3 boules', '6.9 · 9.8'],
      ['Banana split', '', '14.8'] ]},
    { title: 'Mojitos & caffè', items: [
      ['Mojito Di Più', 'kiwi, banane, concombre, fruit de la passion', '13.9'],
      ['Mojito virgin · blueberry · redberry', '', '8.7 · 9.6 · 9.6'],
      ['Mojito tropical · piña colada', '', '12.6'],
      ['Espresso · cappuccino · américain', '', '3.5 · 3.9 · 3.9'],
      ['Café crème · iced coffee · affogato', '', '4.4 · 7.5 · 8.5'],
      ['Citronnade · jus d’orange · jus de fraise', '', '6.2 · 6.8 · 7.2'] ]} ]}
};
const TABS = [['antipasti','Antipasti & Salades'],['pizza','Pizza'],['pasta','Pasta'],['ravioli','Ravioli & Risotto'],['plats','Plats'],['dolci','Dolci & Drinks']];
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const CAM = '<svg aria-hidden="true" viewBox="0 0 24 24" class="w-3.5 h-3.5 inline-block ml-2 -mt-0.5 text-accent" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
function row([name, desc, price, img, tag]) {
  const badge = tag ? `<span class="ml-2 text-[9px] uppercase tracking-ultra-wide text-night bg-accent px-1.5 py-0.5 rounded-sm align-middle">${tag}</span>` : '';
  const body = `<div class="flex items-baseline justify-between"><span class="font-medium text-[15px] text-white">${esc(name)}${img ? CAM : ''}${badge}</span><span class="leader-line"></span><span class="font-serif text-[15px] font-semibold text-accent whitespace-nowrap">${price} DT</span></div>
    ${desc ? `<p class="text-xs text-mutedtext font-light mt-1">${esc(desc)}</p>` : ''}`;
  if (!img) return `<li class="py-2">${body}</li>`;
  // Dishes with a real photo: the row is a button that shows the photo on the left.
  return `<li><button type="button" class="dish-btn w-full text-left py-2 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent"
    data-img="${img}" data-caption="${esc(name)} · ${price} DT" aria-pressed="false" onclick="showDish(this)">${body}</button></li>`;
}
function setPhoto(img, caption) {
  const photo = document.getElementById('menu-photo');
  photo.style.opacity = 0;
  setTimeout(() => { photo.src = IMG[img] + '=w1000'; photo.alt = caption; photo.style.opacity = 1; }, 150);
  document.getElementById('menu-caption').textContent = caption;
}
function showDish(btn) {
  const wasOn = btn.getAttribute('aria-pressed') === 'true';
  document.querySelectorAll('.dish-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
  if (wasOn) { const m = MENU[currentTab]; setPhoto(m.photo, m.caption); return; }  // second click: back to the category photo
  btn.setAttribute('aria-pressed', 'true');
  setPhoto(btn.dataset.img, btn.dataset.caption);
  // On small screens the photo sits above the list: bring it into view.
  const fig = document.getElementById('menu-photo');
  if (window.innerWidth < 1024 && fig.getBoundingClientRect().top < 0) fig.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
let currentTab = 'pizza';
function showMenu(key) {
  currentTab = key;
  const m = MENU[key];
  setPhoto(m.photo, m.caption);
  const hasPhotos = m.sections.some(s => s.items.some(i => i[3]));
  document.getElementById('menu-lists').innerHTML = (hasPhotos ? `<p class="text-[11px] uppercase tracking-ultra-wide text-mutedtext mb-6">${CAM.replace('ml-2 ', '')} <span class="ml-1">Tap a dish with the camera to see its photo</span></p>` : '') + m.sections.map(s => `
    <div class="mb-10 last:mb-0"><div class="border-b border-hairline-dark pb-3 mb-4 flex items-baseline justify-between gap-4">
      <h3 class="font-serif text-3xl font-normal italic text-white">${esc(s.title)}</h3>
      ${s.note ? `<span class="text-[10px] uppercase tracking-ultra-wide text-accent font-semibold text-right">${esc(s.note)}</span>` : ''}</div>
      <ul class="divide-y divide-white/[0.06]">${s.items.map(row).join('')}</ul></div>`).join('');
  document.querySelectorAll('.menu-tab-btn').forEach(b => {
    const on = b.dataset.tab === key;
    b.setAttribute('aria-selected', on);
    b.className = 'menu-tab-btn px-4 py-2.5 rounded-sm transition-colors cursor-pointer whitespace-nowrap ' +
      (on ? 'bg-accent text-night font-semibold border border-accent' : 'border border-white/30 text-white hover:border-white');
  });
}
const STRIP = [['ravioliSalmon','Ravioli saumon fumé','35.8'],['supremeChamp','Suprême sauce champignons','28.9'],['saladFDM','Salade fruits de mer','29.5'],['cheesecake','Cheesecake','11.8']];
document.getElementById('menu-strip').innerHTML = STRIP.map(([k,n,p]) => `<figure class="group"><div class="w-full aspect-[4/5] overflow-hidden rounded-sm bg-night mb-3"><img src="${IMG[k]}=w600" alt="${n}" referrerpolicy="no-referrer" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></div><figcaption class="text-sm text-white leading-tight">${n}<span class="block font-serif text-accent font-semibold mt-1">${p} DT</span></figcaption></figure>`).join('');
showMenu('pizza');
</script>'''.replace("__IMG__", __import__("json").dumps(IMG))

lines[start:end] = menu_block.split("\n")
html = "\n".join(lines)

# Tab buttons -> data-driven.
html = re.sub(
    r'<button class="menu-tab-btn[^"]*" id="tab-btn-([a-z-]+)" onclick="switchMenuTab\(\'[a-z-]+\'\)" type="button">(.*?)</button>',
    lambda m: (lambda k: '<button class="menu-tab-btn" role="tab" data-tab="%s" onclick="showMenu(\'%s\')" type="button">%s</button>' % (k, k, m.group(2)))(
        {"antipasti": "antipasti", "pizza": "pizza", "pasta": "pasta", "ravioli-risotto": "ravioli",
         "plats": "plats", "dolci-drinks": "dolci"}[m.group(1)]),
    html)

replacements = [
    # Neighbouring restaurant's name must not appear as a section title.
    ('href="#signature">La Cucina</a>', 'href="#signature">I piatti</a>'),
    ('        La cucina\n', '        I piatti\n'),
    # Address: Di Più has no street address on Google, only a plus code.
    ("in a sage-green room one block from Place 3 Août.", "in a sage-green room in the centre of Monastir."),
    ("one block from Place 3 Août</span>", "near Place 3 Août and the marina</span>"),
    ("<span>Place 3 Août, Monastir 5000, Tunisia</span>", "<span>QRCQ+6P, Monastir 5000, Tunisia</span>"),
    # Tab row: centring + overflow scroll clips the first tab on narrow screens.
    ('flex items-center justify-start sm:justify-center overflow-x-auto', 'flex items-center justify-start xl:justify-center overflow-x-auto'),
    # Signature section: keep the feature dish in view instead of leaving a gap.
    ('<article class="lg:col-span-7 flex flex-col group">', '<article class="lg:col-span-7 flex flex-col group lg:sticky lg:top-24">'),
]
for a, b in replacements:
    assert a in html, a
    html = html.replace(a, b)

# Signature section: right-hand dishes become horizontal rows (photo | text) so the
# column matches the feature dish's height instead of leaving a gap on the left.
sig_start = html.index('id="signature"')
sig_end = html.index("</section>", sig_start)
sig = html[sig_start:sig_end]
sig = sig.replace('<article class="flex flex-col group">', '<article class="sig-row group">')
sig = sig.replace('<div class="lg:col-span-5 flex flex-col space-y-10">', '<div class="lg:col-span-5 flex flex-col space-y-8">')
html = html[:sig_start] + sig + html[sig_end:]
html = html.replace("</head>", """<style>
  @media (min-width: 640px) {
    .sig-row { display: grid; grid-template-columns: 44% 1fr; column-gap: 1.5rem; align-content: center; }
    .sig-row > div:first-child { grid-row: span 3; aspect-ratio: 1 / 1; margin-bottom: 0; }
    .sig-row > div:nth-child(2) { align-self: end; }
  }
  .dish-btn { position: relative; }
  .dish-btn::before { content: ''; position: absolute; left: -14px; top: 10px; bottom: 10px; width: 2px; background: transparent; transition: background .2s; }
  .dish-btn:hover::before { background: rgba(139,195,74,.4); }
  .dish-btn[aria-pressed="true"]::before { background: #8BC34A; }
  .dish-btn:hover > div:first-child > span:first-child,
  .dish-btn[aria-pressed="true"] > div:first-child > span:first-child { color: #8BC34A; }
</style>
</head>""", 1)

# ---------------------------------------------------------------------------
# Mobile pass (< lg): immersive hero, nav drawer, sticky tabs, bottom action bar.
# ---------------------------------------------------------------------------
mobile = [
    # Hero: natural height on phones (svh avoids the browser-chrome jump); photo becomes
    # a full-bleed background behind the text instead of a squeezed strip.
    ('<header class="relative h-screen min-h-[660px] max-h-screen bg-night text-white flex flex-col justify-between overflow-hidden" id="hero">',
     '<header class="relative min-h-[100svh] lg:h-screen lg:min-h-[660px] lg:max-h-screen bg-night text-white flex flex-col justify-between overflow-hidden" id="hero">'),
    ('<nav class="w-full shrink-0 border-b border-hairline-dark px-6 md:px-12 py-3.5 md:py-4 z-20 flex items-center justify-between">',
     '<nav class="relative w-full shrink-0 border-b border-hairline-dark px-5 md:px-12 py-3.5 md:py-4 z-30 flex items-center justify-between bg-night/40 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-0">'),
    ('<div class="grid grid-cols-1 lg:grid-cols-12 flex-1 w-full min-h-0">',
     '<div class="relative grid grid-cols-1 lg:grid-cols-12 flex-1 w-full min-h-0">'),
    ('<div class="lg:col-span-7 flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-6 md:py-8 lg:py-10 border-r border-hairline-dark overflow-y-auto lg:overflow-hidden">',
     '<div class="relative z-10 lg:col-span-7 flex flex-col justify-end lg:justify-between px-5 sm:px-12 lg:px-16 pt-40 pb-8 md:py-8 lg:py-10 lg:border-r border-hairline-dark lg:overflow-hidden">'),
    ('<div class="my-auto max-w-2xl py-2">', '<div class="lg:my-auto max-w-2xl py-2">'),
    ('text-[clamp(3.8rem,7.5vw,7.8rem)]', 'text-[clamp(3.4rem,15vw,7.8rem)] lg:text-[clamp(3.8rem,7.5vw,7.8rem)]'),
    ('<div class="flex flex-wrap items-center gap-3.5 pt-1">',
     '<div class="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-3.5 pt-1 text-center">'),
    ('<a class="ml-1 text-xs text-mutedtext hover:text-white tracking-wider flex items-center group transition-colors" href="https://www.google.com/maps',
     '<a class="col-span-2 justify-center sm:justify-start sm:ml-1 py-1 text-xs text-mutedtext hover:text-white tracking-wider flex items-center group transition-colors" href="https://www.google.com/maps'),
    ('<div class="pt-4 lg:pt-5 border-t border-hairline-dark grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 text-xs text-bodytext shrink-0">',
     '<div class="mt-8 lg:mt-0 pt-4 lg:pt-5 border-t border-white/15 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 lg:gap-6 text-xs text-bodytext shrink-0">'),
    ('<div class="flex items-center space-x-2">\n<span class="text-accent text-sm">★</span>',
     '<div class="col-span-2 md:col-span-1 flex items-center space-x-2">\n<span class="text-accent text-sm">★</span>'),
    ('<div class="lg:col-span-5 relative h-full bg-night overflow-hidden">',
     '<div class="absolute inset-0 lg:relative lg:inset-auto lg:col-span-5 h-full bg-night overflow-hidden">'),
    ('<div class="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent lg:hidden pointer-events-none"></div>',
     '<div class="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/20 lg:hidden pointer-events-none"></div>'),
    # Nav: phone pill becomes an icon on phones; add a menu button.
    ('<a class="text-xs tracking-wider font-medium text-white border border-white/40 rounded-sm px-4 py-2 hover:border-white transition-colors" href="tel:+21650074004">\n        +216 50 074 004\n      </a>',
     '<a class="hidden sm:inline-block text-xs tracking-wider font-medium text-white border border-white/40 rounded-sm px-4 py-2 hover:border-white transition-colors" href="tel:+21650074004">\n        +216 50 074 004\n      </a>\n'
     '<button aria-controls="mobile-nav" aria-expanded="false" aria-label="Open menu" class="md:hidden ml-3 w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-1.5" id="nav-toggle" type="button">'
     '<span class="block w-6 h-px bg-white"></span><span class="block w-6 h-px bg-white"></span><span class="block w-4 h-px bg-accent self-end mr-2.5"></span></button>'),
    # Menu tabs stay reachable while scrolling a long category on phones.
    ('<div class="flex items-center justify-start xl:justify-center overflow-x-auto gap-2.5 pb-4 mb-16 border-b border-hairline-dark',
     '<div class="sticky top-0 z-20 -mx-6 px-6 sm:mx-0 sm:px-0 pt-3 lg:pt-0 bg-night-sage lg:static flex items-center justify-start xl:justify-center overflow-x-auto gap-2.5 pb-4 mb-10 lg:mb-16 border-b border-hairline-dark'),
    # Footer: stack cleanly on phones.
    ('<div class="flex items-center space-x-3">\n<span class="font-serif italic text-white font-light text-base">Di Più Ristorante</span>',
     '<div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center">\n<span class="font-serif italic text-white font-light text-base">Di Più Ristorante</span>'),
    ('<span class="text-white/30">·</span>\n<span>QRCQ+6P, Monastir 5000, Tunisia</span>',
     '<span class="hidden sm:inline text-white/30">·</span>\n<span>QRCQ+6P, Monastir 5000, Tunisia</span>'),
    ('<div class="flex items-center space-x-6 text-[11px] tracking-wider uppercase">',
     '<div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] tracking-wider uppercase">'),
    ('<span class="text-white/30">·</span>\n<span class="text-mutedtext normal-case font-light">',
     '<span class="hidden sm:inline text-white/30">·</span>\n<span class="w-full sm:w-auto text-center text-mutedtext normal-case font-light">'),
]
for a, b in mobile:
    assert a in html, a[:90]
    html = html.replace(a, b, 1)
# Hero buttons: keep labels on one line at 375px.
hero_end = html.index("</header>")
html = html[:hero_end].replace("px-6 sm:px-7 py-3 text-xs uppercase tracking-ultra-wide",
                               "px-2 sm:px-7 py-3.5 sm:py-3 text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-ultra-wide whitespace-nowrap") + html[hero_end:]

mobile_chrome = '''<!-- Mobile nav drawer -->
<div aria-hidden="true" class="fixed inset-0 z-50 bg-night/95 backdrop-blur-md flex flex-col px-6 pt-5 pb-10 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden" id="mobile-nav">
<div class="flex items-center justify-between">
<span class="font-serif text-2xl italic text-white">Di Più</span>
<button aria-label="Close menu" class="w-11 h-11 -mr-2 text-3xl leading-none text-white" id="nav-close" type="button">&times;</button>
</div>
<nav class="mt-12 flex flex-col gap-5 font-serif text-4xl text-white">
<a href="#about">About</a><a href="#signature">I piatti</a><a href="#menu">Il menù</a><a href="#gallery">Gallery</a><a href="#reviews">Reviews</a><a href="#visit">Visit</a>
</nav>
<div class="mt-auto border-t border-hairline-dark pt-6 text-sm text-bodytext space-y-1">
<p class="text-[10px] uppercase tracking-ultra-wide text-accent font-semibold">Open daily 12:00 – 00:00</p>
<a class="block text-white text-lg" href="tel:+21650074004">+216 50 074 004</a>
<p class="text-mutedtext">QRCQ+6P, Monastir 5000</p>
</div>
</div>
<!-- Mobile action bar -->
<div class="fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 border-t border-white/10 bg-night/95 backdrop-blur-md text-[11px] uppercase tracking-ultra-wide font-semibold lg:hidden translate-y-full transition-transform duration-300" id="action-bar" style="padding-bottom: env(safe-area-inset-bottom)">
<a class="py-4 text-center text-white border-r border-white/10" href="tel:+21650074004">Call</a>
<a class="py-4 text-center text-white border-r border-white/10" href="https://www.google.com/maps?cid=13172501472462840975" rel="noopener noreferrer" target="_blank">Directions</a>
<a class="py-4 text-center bg-accent text-night" href="tel:+21650074004">Reserve</a>
</div>
<script>
(() => {
  const drawer = document.getElementById('mobile-nav'), toggle = document.getElementById('nav-toggle');
  const setOpen = open => {
    drawer.classList.toggle('opacity-0', !open); drawer.classList.toggle('pointer-events-none', !open);
    drawer.setAttribute('aria-hidden', !open); toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(true));
  document.getElementById('nav-close').addEventListener('click', () => setOpen(false));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  // Action bar appears once the hero (which has its own buttons) scrolls away.
  const bar = document.getElementById('action-bar');
  new IntersectionObserver(([e]) => bar.classList.toggle('translate-y-full', e.isIntersecting))
    .observe(document.getElementById('hero'));
})();
</script>
<style>@media (max-width: 1023px) { body { padding-bottom: 56px; } }</style>
</body>'''
assert html.count("</body>") == 1
html = html.replace("</body>", mobile_chrome)

# Google photo CDN refuses hotlinks with a referrer.
html = re.sub(r'<img (?![^>]*referrerpolicy)', '<img referrerpolicy="no-referrer" ', html)

for bad in ["feu de bois", "artigianali", "Di Più classic", "daily service", "maison<", "La Cucina", "La cucina", "Place 3 Août, Monastir"]:
    assert bad not in html, bad

(root / "stitch" / "desktop-final.html").write_text(html, encoding="utf-8")
print("ok", len(html))
