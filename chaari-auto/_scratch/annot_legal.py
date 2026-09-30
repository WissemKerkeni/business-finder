"""Annotated screenshot of the Impressum / Datenschutz section: numbered arrows on each missing field + French legend.
Writes site/dist/annot.html (temporary; delete after the screenshot). Run with the chaari-auto-preview server up,
then screenshot http://localhost:4179/annot.html with headless Edge (see the command in the session notes)."""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(ROOT, 'site/dist/index.html'), encoding='utf-8').read()

# (target kind, key, French explanation). kind: ph = n-th placeholder span, text = text in the section, head = heading id
ITEMS = [
    ('ph', 0, "Nom exact de l’entreprise tel qu’enregistré (ex. « Chaari Auto, Inh. … » ou « Chaari Auto GmbH ») et forme juridique : entreprise individuelle, GbR, UG, GmbH…"),
    ('range', ['Lindenstraße 16', 'Deutschland'], "Confirmer que Lindenstraße 16, 74321 Bietigheim-Bissingen est bien l’adresse officielle de l’entreprise (adresse pour le courrier officiel)."),
    ('ph', 1, "Nom complet du propriétaire ou du gérant (Inhaber / Geschäftsführer)."),
    ('range', ['Telefon', 'chaariauto@gmail.com'], "Garder +49 177 8629077 et chaariauto@gmail.com comme contacts officiels ?"),
    ('ph', 2, "Inscription au registre du commerce : tribunal (Amtsgericht) et numéro HRA / HRB, ou « aucune inscription »."),
    ('ph', 3, "Numéro de TVA intracommunautaire (USt-IdNr.) ou Wirtschafts-IdNr., ou « aucun »."),
    ('ph', 4, "Personne responsable du contenu du site, si ce n’est pas le propriétaire."),
    ('range', ['Responsable / Verantwortlicher', 'chaariauto@gmail.com'], "Responsable de la protection des données (RGPD / DSGVO) : nom et contact."),
    ('ph', 6, "Combien de temps gardez-vous les demandes reçues par WhatsApp et par e-mail ?"),
    ('head', 'datenschutz', "Avez-vous déjà votre propre déclaration de confidentialité, ou un modèle fourni par un avocat ?"),
    ('head', 'legal-title', "Autorisation d’activité ou autorité de contrôle (ex. § 34 GewO), si nécessaire. Et langue souhaitée : allemand seul, ou allemand + français comme aujourd’hui ?"),
]

CSS = """<style>
#top,#main>section:not(#mentions-legales),header,footer,nav[aria-label="Actions rapides"],a[href="#main"]{display:none!important}
html.js [data-reveal]{opacity:1!important;transform:none!important}
body{background:#0C0C0D;padding:0 0 40px}
#mentions-legales{position:relative;padding-right:40px!important;padding-top:64px!important;padding-bottom:56px!important;border-bottom:1px solid #2A2A2E}
.an-badge{position:absolute;width:30px;height:30px;border-radius:50%;background:#E70013;color:#fff;font:700 15px 'Space Mono',monospace;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(231,0,19,.25);z-index:5}
.an-hl{position:absolute;border:2px solid #E70013;border-radius:4px;z-index:4;pointer-events:none}
#an-legend{max-width:1320px;margin:0 auto;padding:40px 48px 0}
#an-legend h3{font:700 30px 'Archivo Narrow',sans-serif;text-transform:uppercase;color:#F4F4F2;margin:0 0 6px}
#an-legend p.sub{font:15px Geist,sans-serif;color:#A3A3A8;margin:0 0 24px;max-width:900px}
#an-legend ol{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:14px 40px}
#an-legend li{display:flex;gap:14px;align-items:flex-start;font:16px/1.5 Geist,sans-serif;color:#E6E6E2;border-top:1px solid #2A2A2E;padding-top:14px}
#an-legend li b{flex:none;width:30px;height:30px;border-radius:50%;background:#E70013;color:#fff;font:700 15px 'Space Mono',monospace;display:flex;align-items:center;justify-content:center}
#an-banner{max-width:1320px;margin:0 auto;padding:36px 48px 0;font:700 13px 'Space Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#FF4D58}
</style></head>"""

JS = """<script>setTimeout(() => {
const ITEMS = __ITEMS__;
const sec = document.getElementById('mentions-legales');
const ban = document.createElement('div'); ban.id = 'an-banner';
ban.textContent = 'Chaari Auto · Mentions légales / Datenschutz · informations à fournir par le client';
sec.parentElement.insertBefore(ban, sec);
const S = sec.getBoundingClientRect(); // measured after the banner is inserted
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('style', 'position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;z-index:4;pointer-events:none');
svg.innerHTML = '<defs><marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#E70013"/></marker></defs>';
sec.appendChild(svg);
const phs = [...sec.querySelectorAll('span')].filter((e) => e.textContent.includes('compléter'));
const textRect = (needle) => { const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) { const i = n.data.indexOf(needle); if (i >= 0) { const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + needle.length); return r.getBoundingClientRect(); } } };
// A range from the first text node containing `start` to the first later one containing `end` (JSX splits lines into nodes).
const spanRect = ([start, end]) => { const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT); let n, a = null;
  while ((n = w.nextNode())) { if (!a) { const i = n.data.indexOf(start); if (i >= 0) a = [n, i]; }
    if (a) { const j = n.data.indexOf(end); if (j >= 0) { const r = document.createRange(); r.setStart(a[0], a[1]); r.setEnd(n, j + end.length); return r.getBoundingClientRect(); } } } };
// Badges sit in a column just right of each text column, so they never cover text.
const cols = [...sec.firstElementChild.children].map((c) => c.getBoundingClientRect().right - S.left);
const used = {};
ITEMS.forEach(([kind, key], k) => {
  let r;
  if (kind === 'ph') r = phs[key].getBoundingClientRect();
  else if (kind === 'range') r = spanRect(key);
  else { const rr = document.createRange(); rr.selectNodeContents(document.getElementById(key)); r = rr.getBoundingClientRect(); }
  const x0 = r.left - S.left, y0 = r.top - S.top, w = r.width, h = r.height;
  const hl = document.createElement('div'); hl.className = 'an-hl';
  hl.style.cssText = `left:${x0 - 4}px;top:${y0 - 3}px;width:${w + 8}px;height:${h + 6}px`; sec.appendChild(hl);
  const col = x0 < S.width / 2 ? 0 : 1; const row = col + ':' + Math.round(y0); const off = used[row] || 0; used[row] = off + 1;
  const bx = Math.max(x0 + w + 40, cols[col] + 14) + off * 40, by = y0 + h / 2 - 15;
  const b = document.createElement('div'); b.className = 'an-badge'; b.textContent = k + 1;
  b.style.left = bx + 'px'; b.style.top = by + 'px'; sec.appendChild(b);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', bx - 2); line.setAttribute('y1', by + 15); line.setAttribute('x2', x0 + w + 10); line.setAttribute('y2', y0 + h / 2);
  line.setAttribute('stroke', '#E70013'); line.setAttribute('stroke-width', '2.5'); line.setAttribute('marker-end', 'url(#ah)');
  svg.appendChild(line);
});
const lg = document.createElement('div'); lg.id = 'an-legend';
lg.innerHTML = '<h3>Questions pour le client</h3><p class="sub">Aucune de ces informations n’a été trouvée dans les sources publiques (registre du commerce via Northdata, Facebook, Instagram, TikTok, Google Maps, recherche web). Merci de nous les transmettre : nous ne pouvons rien inventer.</p><ol>'
  + ITEMS.map((it, k) => '<li><b>' + (k + 1) + '</b><span>' + it[2] + '</span></li>').join('') + '</ol>';
sec.parentElement.insertBefore(lg, sec.nextSibling);
}, 1200)</script></body>"""

page = s.replace('</head>', CSS, 1).replace('</body>', JS.replace('__ITEMS__', json.dumps(ITEMS, ensure_ascii=False)))
open(os.path.join(ROOT, 'site/dist/annot.html'), 'w', encoding='utf-8').write(page)
print('wrote site/dist/annot.html')
