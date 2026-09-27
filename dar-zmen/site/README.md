# Dar Zmen Monastir — website

One-page site for Dar Zmen (دار زمان), a traditional Tunisian restaurant in the medina of Monastir. Built with Vite + React 19 + Tailwind 4, on the same architecture as `di-piu/site`.
The design follows the Stitch concept and `../stitch/desktop-final.html` ("Lime-wash & Cobalt": lime-wash white, ink, cobalt tile blue, sandstone; EB Garamond, Work Sans and Space Mono, with Amiri for Arabic).

**Live:** https://dar-zmen-monastir.vercel.app (Vercel project `dar-zmen-monastir`; `dar-zmen.vercel.app` belongs to another account).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender → dist/
npm run preview    # serve dist/ on http://localhost:4173
```

**Before deploying:** `.env` must contain `SITE_URL=https://dar-zmen-monastir.vercel.app`, or the real domain if that changes. It is used for the canonical URL, sitemap, llms.txt and JSON-LD.

## Where things live

| File | Purpose |
| --- | --- |
| `src/data/restaurant.ts` | **Every fact on the site**: menu (36 printed entries + 18 rotating dishes), prices, hours, reviews, photos, FAQ. Edit here only. |
| `src/components/*` | Page sections. `Menu.tsx` holds the tabs and the tap-a-dish photo viewer, `Header.tsx` the fixed header and mobile drawer, and `ActionBar.tsx` the phone Call / Directions / Reserve bar. |
| `src/seo/seo.ts` | Head tags, JSON-LD, robots.txt, sitemap.xml and llms.txt, all generated from the data file |
| `vite.config.ts` | `dar-zmen-seo` plugin: injects the head tags and emits robots/sitemap/llms (also served in dev) |
| `scripts/prerender.mjs` | Renders the app to static HTML after the build |

## Responsive

- **Phones (< 768px):**
  - Full-screen hero with an extra scrim.
  - ☰ drawer with the links, hours and phone.
  - Menu tabs stick under the header and scroll sideways.
  - The menu photo sits above the list.
  - The gallery uses a 2-column grid.
  - A fixed Call · Directions · Reserve bar appears once the hero scrolls away.
  - Checked visually at 375px.
- **Tablet and desktop:**
  - 12-column editorial grid.
  - Sticky menu photo.
  - Gallery mosaic with explicit spans, so it has no holes.
  - Header turns solid ink after the hero.

## SEO / GEO

- **Prerendered HTML:** includes all four menu panels (inactive ones are `hidden`), the reviews and the FAQ. React hydrates the page for the tabs, drawer and action bar.
- **JSON-LD `@graph`:**
  - `WebSite`.
  - `Restaurant`: Arabic and Latin names, geo, telephone, price range, cuisine, `acceptsReservations`, 24/7 `openingHoursSpecification`, `amenityFeature`, `hasMap`, and a full `hasMenu` with TND offers and the Arabic `alternateName` of every dish.
  - `FAQPage`.
  - Google ratings are shown on the page but not marked up, because Google ignores a business's own review markup.
- **Crawler files:**
  - `/llms.txt`: a fact sheet with the full menu in English and Arabic.
  - `robots.txt`: explicitly allows search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…).
  - `sitemap.xml`: includes image entries.
- **Local signals:**
  - `geo.region` TN-52, `geo.position` and ICBM.
  - Open Graph `restaurant.restaurant` with contact-info tags, `og:locale:alternate` ar_TN, and a Twitter card.
  - `lang="ar"` on Arabic text.
  - Preloaded hero image, responsive `srcset`, lazy map.

## Known limitations / owner to confirm

- **Photos:** hot-linked from Google's CDN with `referrerPolicy="no-referrer"`. Get the owner's originals and host them in `public/`.
- **Address:** Google has no street address, only plus code QRFJ+5C, so the site uses that.
- **To confirm with the owner:**
  - Is +216 20 181 878 on WhatsApp?
  - What is "عجة شفرات" (20 DT)? It is omitted from the site.
  - Does the printed menu have more pages (couscous, drinks, desserts)?
  - The 24/24 hours.
- **Menu prices:** the Glovo prices on Google's menu are ~18% higher than the printed card; the site uses the printed card.
- **After launch:** submit the sitemap in Google Search Console, and add the website link to the Google Business Profile.
