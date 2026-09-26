# Di Più Monastir — website

One-page site for Di Più (Italian restaurant, Monastir), built with Vite + React 19 + Tailwind 4.
The design follows the approved Stitch screen and `../stitch/desktop-final.html` ("Night & Leaf": near-black, white serif type, logo-leaf green).

**Live:** https://di-piu-monastir.vercel.app (Vercel project `di-piu-monastir`; `SITE_URL` is set in the project's production env).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender → dist/
npm run preview    # serve dist/ on http://localhost:4173
npx vercel deploy --prod   # deploy (project is linked in .vercel/)
```

**Before deploying:** copy `.env.example` to `.env` and set `SITE_URL` to the real domain. It is used for the canonical URL, sitemap, llms.txt and JSON-LD. The build warns if it is missing.

## Where things live

| File | Purpose |
| --- | --- |
| `src/data/restaurant.ts` | **Every fact on the site**: menu (68 items), prices, hours, reviews, photos, FAQ. Edit here only. |
| `src/components/*` | Page sections. `Menu.tsx` has the tabs and the tap-a-dish photo viewer; `Header.tsx` the mobile drawer; `ActionBar.tsx` the phone Call / Directions / Reserve bar |
| `src/seo/seo.ts` | Head tags, JSON-LD, robots.txt, sitemap.xml, llms.txt (all generated from the data file) |
| `vite.config.ts` | `di-piu-seo` plugin: injects head tags, emits robots/sitemap/llms (also served in dev) |
| `scripts/prerender.mjs` | Renders the app to static HTML after the build |

## Menu photos

Dishes with a `photo` in the data file get a camera icon, and tapping one shows its photo in the large frame. Only photos that Google labels as that dish, or that clearly show it, are linked:
- **Google's dish labels:** ravioli saumon, risotto fruits de mer, tagliatelle fruits de mer, suprême/poulet crème champignons, salade fruits de mer, cheesecake.
- **Visual matches:** pizza burrata, escalope panée and Pâtes Di Più. Confirm Pâtes Di Più with the owner.
- The photo Google labels "Filet de dorade" mostly shows a beetroot penne, so it is deliberately not linked.

## SEO / GEO

- **Prerendered HTML** includes all six menu panels (inactive ones are `hidden`), reviews and FAQ. React hydrates for the tabs, drawer and action bar.
- **JSON-LD `@graph`:** `WebSite`; `Restaurant` with geo, telephone, price range, cuisine, `acceptsReservations`, `openingHoursSpecification`, `hasMap`, `sameAs` and the full `hasMenu` (TND offers, with images where available); and `FAQPage`. Google ratings are shown but not marked up, because Google ignores self-serving review markup.
- **`/llms.txt`** fact sheet. **`robots.txt`** allows search and AI crawlers. **`sitemap.xml`** has image entries.
- **Local signals** (`geo.*`, ICBM), Open Graph `restaurant.restaurant`, Twitter card, preloaded hero image, responsive `srcset`, and a lazy-loaded map.

## Known limitations / owner to confirm

- **Photos are hot-linked** from Google's CDN, with `referrerPolicy="no-referrer"`. Get the owner's originals and host them in `public/`.
- **No street address** on Google, only plus code QRCQ+6P, so the site uses that.
- **To confirm with the owner:**
  - WhatsApp on +216 50 074 004.
  - Neptune pizza price: 18.9 on the printed menu vs 15.9 on Google.
  - Pavé de saumon: the price wasn't legible, so it's omitted.
  - That the Pâtes Di Più photo shows that dish.
- **After launch:** submit the sitemap in Google Search Console, and link the site from the Google Business Profile.
