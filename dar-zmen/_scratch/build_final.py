"""Build dar-zmen/stitch/desktop-final.html from the latest Stitch export.

Keeps Stitch's hero, house, reviews, visit, CTA and footer. Rebuilds the
signature dishes, menu and gallery from data (printed-menu prices only) and
applies verified copy fixes. Run: python dar-zmen/_scratch/build_final.py [src]
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "stitch" / "desktop-v1.html"
OUT = ROOT / "stitch" / "desktop-final.html"

PHOTOS = {}
for line in (ROOT / "photo-urls.txt").read_text(encoding="utf-8").splitlines():
    if line.strip():
        label, url = line.split(" ", 1)
        PHOTOS[label] = url.strip() + "=w1600"


def img(label, alt, cls="w-full h-full object-cover img-zoom", extra=""):
    return (f'<img src="{PHOTOS[label]}" alt="{html.escape(alt)}" referrerpolicy="no-referrer" '
            f'loading="lazy" class="{cls}" {extra}/>')


# --- Menu: printed menu only (Arabic names as printed). photo = verified dish photo.
MENU = [
    {
        "id": "starters", "tab": "Starters", "ar": "المقبلات",
        "photo": "lentil-soup-and-chorba", "caption": "Soups on the table",
        "groups": [
            ("Soup & salads", [
                ("Barley chorba, bowl", "صحفة شربة شعير", "3"),
                ("Grilled salad (mechouia)", "سلاطة مشوية", "7"),
                ("Tunisian salad", "سلاطة تونسية", "7"),
                ("Mixed salad", "سلاطة متنوعة", "7"),
                ("Rice salad", "سلاطة روز", "6"),
                ("Lentil salad", "سلاطة عدس", "6"),
                ("Lettuce salad", "سلاطة خس", "6"),
            ]),
            ("Ojja", [
                ("Ojja with eggs", "عجة عضم", "7"),
                ("Ojja with merguez", "عجة بالمرقاز", "12"),
                ("Ojja with escalope", "عجة بالسكلوب", "12"),
            ]),
        ],
    },
    {
        "id": "grills", "tab": "Grills & fish", "ar": "المشويات و المقليات",
        "photo": "grilled-fish-platter", "caption": "Grilled fish",
        "groups": [
            ("Chicken & meat", [
                ("Whole roast chicken", "دجاجة مصلية كاملة", "27"),
                ("Whole grilled chicken", "دجاجة مشوية كاملة", "29"),
                ("½ roast chicken", "1/2 دجاجة مصلية", "18"),
                ("½ grilled chicken", "1/2 دجاجة مشوية", "20"),
                ("¼ chicken, grilled or roast", "1/4 دجاج مشوي / مصلي", "13"),
                ("Grilled liver", "صحن كبدة مشوية", "22"),
                ("Breaded escalope", "سكالوب باني", "15"),
                ("Grilled escalope", "اسكلوب مشوي", "15"),
                ("Cordon bleu", "كردون بلو", "17"),
                ("Escalope brochettes", "بروشات سكالوب", "17"),
                ("Grilled merguez", "صحن مرقاز مشوي", "15"),
                ("Grilled lamb cutlets", "كوتلات مشوية", "30"),
                ("Mixed grill", "قرياد ميكس", "32"),
            ]),
            ("Shrimp & fish", [
                ("Shrimp — sautéed, grilled or breaded", "كروفات سوتيه · مشوية · باني", "25"),
                ("Grilled sea bream (warata)", "وراطة مشوية", "20"),
                ("Double warata", "دوبل وراطة", "35"),
                ("Grilled sea bass (karous)", "قاروص مشوي", "20"),
                ("Red mullet (trilia), grilled or breaded", "صحن تريلية مشوية · باني", "15"),
                ("Grilled lambouka", "صحن لمبوكة مشوية", "15"),
                ("Grilled sardines", "صحن سردينة مشوية", "14"),
            ]),
        ],
    },
    {
        "id": "old-days", "tab": "Dishes of the old days", "ar": "أطباقنا الزمنية",
        "photo": "mloukhia-table", "caption": "Mloukhia",
        "groups": [
            (None, [
                ("Mloukhia with beef", "مولخية باللحم البقري", "18.5", "mloukhia-table"),
                ("Lamb kamounia", "كمونية علوش", "19"),
                ("Lamb qalaya", "قلاية علوش", "19"),
                ("Half roast lamb's head", "نصف رأس علوش مصلي", "18"),
                ("Chakchouka with broad beans & merguez", "شكشوكة فول بالمرقاز", "14"),
                ("Minced-meat lasagne", "لازانيا لحم مفروم", "14"),
            ]),
        ],
    },
]
OF_THE_DAY = [
    "Couscous with lamb", "Couscous with beef & vegetables", "Fish couscous",
    "Kouskous farfoucha with grilled fish", "Kamounia", "Jelbana", "Loubya", "Mermez",
    "Nwasser", "Makarouna fella", "Rice jerbi", "Riz fakia", "Madfouna", "Chebtiya",
    "Stuffed calamari", "Spaghetti with shrimp", "Spaghetti with seafood", "Briks",
]


def menu_row(item):
    name, ar, price = item[:3]
    photo = item[3] if len(item) > 3 else None
    cam = ""
    attrs = ""
    if photo:
        attrs = f' data-photo="{PHOTOS[photo]}" data-caption="{html.escape(name)}" role="button" tabindex="0"'
        cam = '<span class="ml-2 align-middle font-mono text-[10px] text-cobalt border border-cobalt/40 px-1.5 py-0.5 tracking-widest">PHOTO</span>'
    return f'''
          <div class="menu-row py-3 flex items-baseline gap-3{' dish-photo cursor-pointer' if photo else ''}"{attrs}>
            <div class="min-w-0">
              <div class="font-serif text-[21px] text-ink leading-snug">{html.escape(name)}{cam}</div>
              <div class="font-arabic text-[15px] text-ink/55 leading-tight text-left" dir="rtl" style="text-align:left">{ar}</div>
            </div>
            <div class="menu-leader"></div>
            <div class="font-mono text-[15px] font-bold text-cobalt shrink-0">{price} DT</div>
          </div>'''


def menu_panel(cat, active):
    groups = ""
    for title, items in cat["groups"]:
        if title:
            groups += f'\n          <div class="pt-8 first:pt-0 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sandstone">{title}</div>'
        groups += '<div class="divide-y divide-[#B8894F]/25">' + "".join(menu_row(i) for i in items) + "</div>"
    return f'''
      <div id="panel-{cat['id']}" role="tabpanel" aria-labelledby="tab-{cat['id']}" class="menu-panel{' active' if active else ''} grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"{'' if active else ' hidden'}>
        <figure class="lg:col-span-5 lg:sticky lg:top-28">
          <div class="img-zoom-container aspect-[4/5] bg-limewash">
            {img(cat['photo'], cat['caption'], extra=f'data-default="{PHOTOS[cat["photo"]]}" data-default-caption="{html.escape(cat["caption"])}"').replace('<img ', '<img data-panel-img ')}
          </div>
          <figcaption data-panel-cap class="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">{cat['caption']}</figcaption>
        </figure>
        <div class="lg:col-span-7">
          <div class="font-arabic text-4xl md:text-5xl text-cobalt mb-8 text-left" dir="rtl" style="text-align:left">{cat['ar']}</div>
          {groups}
        </div>
      </div>'''


def menu_section():
    tabs = ""
    for i, cat in enumerate(MENU + [{"id": "daily", "tab": "Of the day"}]):
        tabs += (f'<button id="tab-{cat["id"]}" role="tab" aria-selected="{"true" if i == 0 else "false"}" aria-controls="panel-{cat["id"]}" '
                 f'data-tab="{cat["id"]}" class="tab-btn{" active" if i == 0 else ""} shrink-0 px-5 py-3 font-mono text-xs uppercase tracking-widest border border-ink/20 text-ink hover:border-cobalt transition-colors">'
                 f'{html.escape(cat["tab"])}</button>\n        ')
    panels = "".join(menu_panel(c, i == 0) for i, c in enumerate(MENU))
    daily = " <span class=\"text-sandstone\">·</span> ".join(html.escape(d) for d in OF_THE_DAY)
    panels += f'''
      <div id="panel-daily" role="tabpanel" aria-labelledby="tab-daily" class="menu-panel grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start" hidden>
        <figure class="lg:col-span-5 lg:sticky lg:top-28">
          <div class="img-zoom-container aspect-[4/5] bg-limewash">{img('counter-dishes-of-the-day', 'Dishes of the day at the counter')}</div>
          <figcaption class="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">The counter</figcaption>
        </figure>
        <div class="lg:col-span-7">
          <div class="font-arabic text-4xl md:text-5xl text-cobalt mb-8 text-left" dir="rtl" style="text-align:left">أكلة اليوم</div>
          <p class="font-serif text-[26px] md:text-[30px] leading-[1.45] text-ink">{daily}</p>
          <p class="mt-8 pt-6 border-t border-[#B8894F]/30 font-mono text-xs uppercase tracking-widest text-ink/60">The pots change through the week — ask at the counter what is cooking today.</p>
        </div>
      </div>'''
    strip = [("spaghetti-nabeul-plate", "Spaghetti"), ("chorba-bowl", "Soup"),
             ("table-spread", "A full table"), ("ojja-oval-nabeul", "From the pot")]
    strip_html = "".join(f'''
          <figure><div class="img-zoom-container aspect-square">{img(p, c)}</div>
            <figcaption class="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60">{c}</figcaption></figure>''' for p, c in strip)
    return f'''<!-- 6) MENU (id=menu) — built from data by build_final.py -->
  <section id="menu" class="py-24 md:py-36 bg-limewashDark border-t border-b border-[#B8894F]/40">
    <div class="max-w-[1440px] mx-auto px-6 md:px-14">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#B8894F]/30">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-sandstone mb-4">03 — The menu</p>
          <h2 class="font-serif text-5xl md:text-7xl leading-[0.95] text-ink">From the <i>printed</i> menu</h2>
        </div>
        <p class="font-mono text-xs uppercase tracking-widest text-ink/60 md:text-right max-w-xs">Prices in Tunisian dinars, as printed in the house menu. Dishes of the day change.</p>
      </div>
      <div role="tablist" aria-label="Menu" class="tabs sticky top-[72px] z-30 bg-limewashDark -mx-6 px-6 md:mx-0 md:px-0 py-5 flex gap-3 overflow-x-auto no-scrollbar border-b border-[#B8894F]/30 mb-12">
        {tabs}
      </div>
      {panels}
      <div class="mt-24 pt-10 border-t border-[#B8894F]/30">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-sandstone mb-6">Seen on the table</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">{strip_html}
        </div>
      </div>
    </div>
  </section>

  '''


def signatures_section():
    def fig(p, n, cap, cls, aspect):
        return f'''
        <figure class="{cls}">
          <div class="img-zoom-container {aspect}">{img(p, cap)}</div>
          <figcaption class="mt-4 flex items-baseline gap-3"><span class="font-mono text-xs text-cobalt">{n}</span><span class="font-serif text-[22px] text-ink">{cap}</span></figcaption>
        </figure>'''
    return f'''<!-- 5) ON THE TABLE — built by build_final.py -->
  <section class="py-24 md:py-36 border-t border-[#B8894F]/30 bg-limewash">
    <div class="max-w-[1440px] mx-auto px-6 md:px-14">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-sandstone mb-4">02 — On the table</p>
          <h2 class="font-serif text-5xl md:text-7xl leading-[0.95] text-ink">Plates from the <i>old days</i></h2>
        </div>
        <p class="font-mono text-xs uppercase tracking-widest text-ink/60">Main dishes come with bread &amp; salad</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {fig('couscous-lamb-chickpeas-nabeul', '01', 'Couscous with lamb &amp; chickpeas', 'md:col-span-6', 'aspect-[4/5]')}
        <div class="md:col-span-6 grid grid-cols-2 gap-8 md:gap-10 content-start">
          {fig('mloukhia-table', '02', 'Mloukhia', 'md:mt-24', 'aspect-[3/4]')}
          {fig('spaghetti-shrimp', '03', 'Spaghetti with shrimp', '', 'aspect-[3/4]')}
          {fig('grilled-fish-platter', '04', 'Grilled fish', 'col-span-2', 'aspect-[16/10]')}
        </div>
      </div>
    </div>
  </section>

  '''


def gallery_section():
    tiles = [
        ("alley-arch-night", "The medina at night", "col-span-2 row-span-3 md:col-span-5 md:row-span-4"),
        ("int-checker-floor-counter", "The checkerboard floor", "md:col-span-4 md:row-span-2"),
        ("int-blue-door-checker", "The blue door", "md:col-span-3 md:row-span-2"),
        ("couscous-and-stew-mergoum", "On the mergoum", "md:col-span-3 md:row-span-2"),
        ("couscous-merguez-green-plate", "Couscous", "md:col-span-4 md:row-span-2"),
        ("alley-lanterns", "Lanterns in the lane", "col-span-2 md:col-span-6 md:row-span-2"),
        ("int-blue-chairs", "Blue iron chairs", "md:col-span-3 md:row-span-2"),
        ("counter-dishes-of-the-day", "Dishes of the day", "md:col-span-3 md:row-span-2"),
    ]
    cells = "".join(f'''
      <figure class="relative img-zoom-container {cls}">{img(p, c)}
        <figcaption class="absolute left-0 bottom-0 px-3 py-2 bg-black/45 font-mono text-[10px] uppercase tracking-[0.2em] text-white">{c}</figcaption>
      </figure>''' for p, c, cls in tiles)
    return f'''<!-- 7) GALLERY — built by build_final.py -->
  <section id="gallery" class="py-24 md:py-36 bg-limewash">
    <div class="max-w-[1440px] mx-auto px-6 md:px-14">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-sandstone mb-4">04 — The house in pictures</p>
      <h2 class="font-serif text-5xl md:text-7xl leading-[0.95] text-ink mb-14">Stone, tile <i>&amp; steam</i></h2>
      <div class="grid grid-cols-2 md:grid-cols-12 auto-rows-[150px] md:auto-rows-[170px] gap-2">{cells}
      </div>
      <p class="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">Photos shared by guests on Google Maps</p>
    </div>
  </section>

  '''


def replace_between(src, start, end, new):
    i, j = src.index(start), src.index(end)
    assert i < j, (start, end)
    return src[:i] + new + src[j:]


def sub(src, old, new, count=1):
    assert old in src, f"missing: {old[:70]!r}"
    return src.replace(old, new, count)


s = SRC.read_text(encoding="utf-8")

s = replace_between(s, "<!-- 5)", "<!-- 6)", signatures_section())
s = replace_between(s, "<!-- 6)", "<!-- 7)", menu_section())
s = replace_between(s, "<!-- 7)", "<!-- 8)", gallery_section())

# Hero
s = sub(s, 'text-xs uppercase tracking-[0.25em] text-sandstone mb-4">\n          TRADITIONAL',
        'text-xs uppercase tracking-[0.25em] text-white/80 mb-4">\n          TRADITIONAL')
s = sub(s, "The house of the old days — couscous, ojja, mloukhia, grilled fish and the dishes of the old days, in the medina of Monastir.",
        "“The house of the old days.” Couscous, ojja, mloukhia and grilled fish, cooked the Tunisian way behind a stone gate in the medina of Monastir.")
s = sub(s, "          Accepts reservations\n", "          Open 24/24 · Reservations\n")
s = sub(s, '<!-- Bottom strip on the hero -->',
        '''<div class="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 pb-4 hidden md:flex justify-end">
      <p class="font-mono text-[11px] tracking-wider text-white/70">The sign over the gate: <span class="font-arabic text-base text-white" dir="rtl">إختصاص أكلة تونسية زمنية</span> — old-time Tunisian food · 24/24</p>
    </div>
    <!-- Bottom strip on the hero -->''')

# House
s = sub(s, "grilled fish from the coast and chorba. Main dishes come with bread and salad, and the tea is on the house.",
        "grilled fish and chorba. Main dishes come with bread and salad, and guests often mention the tea served on the house.")
s = sub(s, '''            <span class="text-right">groups, families, tourists</span>
          </div>''', '''            <span class="text-right">groups, families, tourists</span>
          </div>
          <div class="py-3.5 border-b border-[#B8894F]/30 flex justify-between items-baseline gap-4">
            <span class="text-sandstone uppercase tracking-widest">Hours</span>
            <span class="text-right">24/24 (sign &amp; Google)</span>
          </div>''')

# Mobile hero: extra scrim so the title doesn't fight the sign in the photo
s = sub(s, '<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>',
        '<div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>'
        '\n      <div class="absolute inset-0 bg-black/40 md:hidden"></div>')

# Reviews: curly quotes
for q in ['"So friendly', '"Delicious local', '"Unbelievable big', '"Very good customer']:
    s = sub(s, q, "“" + q[1:])
s = sub(s, "I've ever had.\"", "I’ve ever had.”")
s = sub(s, "a lovely touch.\"", "a lovely touch.”")
s = sub(s, "in Monastir.\"", "in Monastir.”")
s = sub(s, "thanks for the staff\"", "thanks for the staff”")
s = s.replace("&quot;aslema&quot;", "‘aslema’")

# Visit hours
s = re.sub(r"Open 24 hours \(as listed on Google\)", "Open 24/24 — on the sign and on Google", s)
assert "24/24 — on the sign" in s

# CTA buttons: roomier
s = sub(s, 'grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl', 'grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl')
s = s.replace("py-3.5 font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2",
              "py-4 px-6 font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 whitespace-nowrap")

# Footer capital Z (Stitch added lowercase + first-letter:uppercase)
s = sub(s, "font-serif text-lg lowercase first-letter:uppercase text-ink", "font-serif text-lg normal-case tracking-normal text-ink")

# Alt text clean-up
s = s.replace("Grilled fresh fish", "Grilled fish").replace("Grilled fish from the coast", "Grilled fish")

# Header: solid ink after hero, mobile drawer + bottom action bar
s = sub(s, '<header class="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-gradient-to-b from-black/80 via-black/40 to-transparent',
        '<header id="site-header" class="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-gradient-to-b from-black/80 via-black/40 to-transparent')
s = sub(s, '<a href="tel:+21620181878" class="bg-cobalt hover:bg-[#152e70] text-white px-5 py-2.5',
        '<button id="menu-toggle" class="md:hidden mr-3 text-white text-2xl leading-none" aria-label="Open menu" aria-expanded="false">☰</button>\n      <a href="tel:+21620181878" class="hidden sm:flex bg-cobalt hover:bg-[#152e70] text-white px-5 py-2.5')
s = sub(s, "<!-- 2) HERO", '''<div id="drawer" class="fixed inset-0 z-[60] bg-ink text-white hidden flex-col px-8 pt-8 pb-10">
    <div class="flex justify-between items-baseline"><span class="font-serif text-3xl">Dar Zmen <span class="font-arabic text-sandstone text-xl">دار زمان</span></span>
      <button id="drawer-close" class="text-3xl" aria-label="Close menu">×</button></div>
    <nav class="mt-14 flex flex-col gap-6 font-serif text-4xl">
      <a href="#house">The house</a><a href="#menu">Menu</a><a href="#gallery">Gallery</a><a href="#reviews">Reviews</a><a href="#visit">Visit</a></nav>
    <div class="mt-auto font-mono text-xs uppercase tracking-widest text-white/70 space-y-2">
      <p>Open 24/24</p><p><a href="tel:+21620181878">+216 20 181 878</a></p><p>QRFJ+5C Monastir</p></div>
  </div>

  <!-- 2) HERO''')
s = sub(s, "<!-- Subtle Javascript", '''<nav id="action-bar" class="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 bg-ink text-white font-mono text-[11px] uppercase tracking-widest translate-y-full transition-transform duration-300" aria-label="Quick actions">
    <a href="tel:+21620181878" class="py-4 text-center border-r border-white/15">Call</a>
    <a href="https://www.google.com/maps/dir/?api=1&destination=35.77299,10.83103" target="_blank" rel="noopener" class="py-4 text-center border-r border-white/15">Directions</a>
    <a href="tel:+21620181878" class="py-4 text-center bg-cobalt">Reserve</a>
  </nav>

  <!-- Subtle Javascript''')

# Replace Stitch's inline tab script with ours (keeps reveal observer).
s = re.sub(r"function switchTab\(.*?\n    \}\n", "", s, count=1, flags=re.S)
s = sub(s, "</body>", '''<script>
  (function () {
    var tabs = document.querySelectorAll('.tab-btn');
    function activate(btn) {
      tabs.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        var p = document.getElementById('panel-' + b.dataset.tab);
        p.hidden = !on; p.classList.toggle('active', on);
      });
      if (window.innerWidth < 768) btn.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    tabs.forEach(function (b, i) {
      b.addEventListener('click', function () { activate(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); activate(n); }
      });
    });
    document.querySelectorAll('.dish-photo').forEach(function (row) {
      function toggle() {
        var panel = row.closest('.menu-panel');
        var im = panel.querySelector('[data-panel-img]'), cap = panel.querySelector('[data-panel-cap]');
        var showing = row.classList.toggle('is-showing');
        panel.querySelectorAll('.dish-photo').forEach(function (r) { if (r !== row) r.classList.remove('is-showing'); });
        im.src = showing ? row.dataset.photo : im.dataset.default;
        cap.textContent = showing ? row.dataset.caption : im.dataset.default_caption || im.getAttribute('data-default-caption');
      }
      row.addEventListener('click', toggle);
      row.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
    var header = document.getElementById('site-header'), bar = document.getElementById('action-bar');
    function onScroll() {
      var past = window.scrollY > window.innerHeight - 90;
      header.classList.toggle('is-solid', past);
      bar.classList.toggle('translate-y-full', !past);
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var drawer = document.getElementById('drawer'), tog = document.getElementById('menu-toggle');
    function setDrawer(open) { drawer.classList.toggle('hidden', !open); drawer.classList.toggle('flex', open); tog.setAttribute('aria-expanded', open); }
    tog.addEventListener('click', function () { setDrawer(true); });
    document.getElementById('drawer-close').addEventListener('click', function () { setDrawer(false); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  })();
  </script>
</body>''')

s = sub(s, "  </style>", '''    #site-header.is-solid { background: #15171C; }
    /* sandstone is too light for small text on lime-wash: darken it there (AA contrast) */
    .bg-limewash .text-sandstone, .bg-limewashDark .text-sandstone { color: #8A6433; }
    .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }
    .menu-panel[hidden] { display: none !important; }
    .dish-photo.is-showing .font-serif { color: #1D3C8F; }
    .dish-photo:hover .font-serif { color: #1D3C8F; }
    @media (max-width: 767px) { footer { padding-bottom: 5rem; } }
    @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } .img-zoom { transition: none; } }
  </style>''')

# Guards
for banned in ["homemade", "fresh daily", "since 19", "from the coast", "family recipe", "grandm", "La Cucina", "Di Più", "Place 3 Août", "50 074 004", "96 455 150"]:
    assert banned.lower() not in s.lower(), banned
n_img = s.count("<img ")
assert n_img == s.count('referrerpolicy="no-referrer"'), "every img needs referrerpolicy"
OUT.write_text(s, encoding="utf-8")
print(f"wrote {OUT} ({len(s)//1024} KB, {n_img} images)")
