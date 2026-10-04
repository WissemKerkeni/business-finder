# Chaari Auto — website

One-page bilingual site (French at `/`, English at `/en/`) for Chaari Auto, a car-export business in the Stuttgart region (Bietigheim-Bissingen, Germany) with 12 years of experience: car export from Europe to Tunisia, France, Canada, the Gulf and Africa, car maintenance, and international shipping from the port of Genoa. Built with Vite + React 19 + Tailwind 4, on the same architecture as `ahmed-auto/site`.
The layout follows `../stitch/desktop-final.html` (near-black #0C0C0D; Archivo Narrow, Geist, Space Mono, self-hosted through Fontsource). Since the owner's notes of 2026-10-04 the accent is the **logo blue** `#0A5CAA` (text on dark: `#5BA4F0`) instead of the Tunisian red, and the logo is the car from the owner's artwork (`../brand/logo-source.webp`, without its own wordmark) with "CHAARI AUTO" set beside it in the original plate lettering, on one white plate (`LogoLockup` in `ui.tsx`): in the header, footer and CTA, and large in the hero on phones and tablets (in the empty top of the photo; hidden on desktop, where the header logo is enough).

It is an informational site: a request is a WhatsApp message or a phone call. No payments, accounts, quote calculator or backend. The request form only builds a pre-filled `wa.me` message.

**Live:** https://chaari-auto.com (also https://chaari-auto.vercel.app; `www.chaari-auto.com` 308-redirects to the apex; DNS at OVH: apex `A 216.198.79.1`, `www` `CNAME cname.vercel-dns.com.`) (Vercel project `chaari-auto`, `prj_cj7fnXN6ezbkYzg7DyGyR39BhPPA`, team `team_ODIYw5HwL1ZT6MkftJt0ZpW3`; first production deploy `dpl_BbSJ71iogepXBsCQzUs4cBtV342e` on 2026-09-30). `SITE_URL=https://chaari-auto.com` is set in the Vercel production env (changed 2026-10-02). Deploy from this folder with `npx vercel deploy --prod --yes`; `.vercelignore` keeps `dist/` out of the upload (Vercel builds from source).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender → dist/
npm run preview    # serve dist/ on http://localhost:4173 (the repo's launch entry uses :4179)
```

**Before deploying:** `.env` must contain `SITE_URL=https://chaari-auto.com`. It is used for the canonical URL, sitemap, llms.txt and JSON-LD.

## Adding content

Every fact comes from the business's own posts, bio or Google Maps profile. Never add customs, transport, delays, prices, guarantees or savings unless the business states them, and then only in its words.

**A car delivered to a client, or posted as "Export pour la Tunisie"**
1. Put its photos (largest version, readable plates blurred, no faces) in `../_scratch/kept/<car-id>-1.jpg … -N.jpg`. The research helpers `../_scratch/selection.py` + `prep_photos.py` do this for the current cars.
2. Run `python ../_scratch/optimize_photos.py public/photos src/data/photos.json` (WebP 640/1024/1600, hero up to 2000).
3. Add the car to `deliveries` in `src/data/business.ts`: make, model, year, `kind` (`client` only if the post says "Félicitations …"; never show the client's name), post date and URL, the stated specs only, photo count and alt texts.

**A car for sale** (only if the business posts it as "à vendre" / "disponible", from the last ~3–4 months and not sold)
- Add it to `forSale` with `price`/`currency` exactly as published (else `null` → "Prix sur demande") and set `forSaleDate`. The "Véhicules proposés" section, its JSON-LD `Car`/`Offer` and the llms.txt block appear automatically. Remove sold cars.

**Logo or market map**
- Logo: replace `../brand/logo-source.webp` and run `npm run logo` (the crop boxes are measured on the current file; re-measure for a new one). Writes the car at 96/192/384 px high to `public/logo/`, `logo/logo.png` (JSON-LD), `favicon.ico` (16/32/48) and the PNG favicons (Google Search needs a square icon in a multiple of 48 px, and asks for `/favicon.ico`), and the apple-touch icon.
- Market map: `npm run map` writes `public/map/markets.svg` (Natural Earth 1:110m, every market region in one tone) and `src/data/map.json` (projected city positions). Shares and names are `markets` in `business.ts`.

**A video**
1. Add the clip to `CLIPS` in `../_scratch/selection.py` (Facebook reel id, post date, kept segment without glitch effects, readable plates or faces).
2. `python ../_scratch/make_clips.py clips` (H.264 720p, no audio, faststart, sharpest-frame poster), `python ../_scratch/prep_photos.py`, `python ../_scratch/optimize_photos.py public/photos src/data/photos.json`, `python ../_scratch/site_videos.py`.
3. Add its caption to `videoCaptions` in `business.ts`. Keep the total video weight under ~40 MB.

Then `npm run build`, check with `npm run preview`, and redeploy: `npx vercel deploy --prod --yes`.

## Where things live

| File | Purpose |
| --- | --- |
| `src/data/business.ts` | **Every fact on the site, in French and English**: contact, hours, positioning, the five steps, services, shipping (Genoa; the Paris and Gulf delays stay `null` until confirmed), market shares, form fields and WhatsApp template, delivered cars (with English alt texts), cars for sale (empty), video captions, reviews (English = our translation, labelled), FAQ, legal |
| `src/data/copy.ts` | Interface wording, `fr` and `en` (same shape, type-checked) |
| `src/i18n.tsx` | `Lang`, the language context (taken from the URL), date and rating formats |
| `src/data/photos.json`, `videos.json` | Generated media metadata (sizes, widths; clip file, poster, duration, post URL, upload date) |
| `public/photos/` | Self-hosted WebP (`<id>-<width>.webp`) + `og.jpg`; rear plates were already pixelated by the business, the CHAARI AUTO plate holder is their sign |
| `public/videos/` | 5 clips, 720×1280 H.264, muted (no audio track), 14.8 MB total |
| `src/components/Header.tsx` | Logo lockup, nav, FR/EN switch (plain links to `/` and `/en/`; also in the drawer and footer), WhatsApp, drawer |
| `Hero.tsx` | Full-height hero: large logo (phones/tablets only), the international positioning title, the business's intro sentence, the 12 years + Google rating block (links to the reviews), CTAs, the four positioning lines (Stuttgart, export incl. Tunisia, maintenance, shipping) |
| `Steps.tsx` | "Service clé en main", after Stitch option A: title row, then five columns with huge outlined numbers (the owner's four steps + "Gestion complète jusqu’à la livraison") |
| `International.tsx` | Market map (routes from Stuttgart, bubbles sized by share, linked to the share list on hover/focus), destinations, port of Genoa, France delivery, Gulf message |
| `RequestForm.tsx` | "Votre demande" → `wa.me` with one line per filled field; Mobile.de link field first; required: the link or a model (or "ouvert aux suggestions"), country, name |
| `Deliveries.tsx` | "Export pour la Tunisie" gallery (no availability, no price) |
| `ForSale.tsx` | "Véhicules proposés", rendered only when `forSale` is not empty |
| `Videos.tsx` | Portrait tiles, `preload="none"`, one clip plays at a time, pauses when out of view |
| `CarDialog.tsx` | Focus-trapped dialog (Esc, arrows, swipe, thumbnails, counter), spec table, WhatsApp/Call; `#car-<id>` opens it |
| `Sections.tsx` | Services, Testimonials (large type, 2×2), FAQ, Contact (click-to-load Google map), CTA, Legal (Impressum / Datenschutz), Footer, phone ActionBar |
| `src/seo/seo.ts` | Head tags per language (title, description, canonical, hreflang, og:locale), JSON-LD, robots.txt, sitemap.xml (both pages with `xhtml:link` alternates, images, `video:video`), llms.txt (French + English summary) |
| `scripts/prerender.mjs` | Renders `dist/index.html` (fr) and `dist/en/index.html` (en) after the build |

## Motion

The hero plays a Ken Burns zoom and a staggered entrance (CSS only, so it also runs on the prerendered HTML). Sections reveal on scroll: `html.js` plus a `data-in` attribute set by `useReveal` in `App.tsx`, with a scroll fallback so nothing stays hidden after a jump link, and content visible without JS. The steps route line draws across, the "Nos services" photo and CTA background parallax (CSS scroll-driven, Chrome and Edge), the market map draws its routes from Stuttgart and pops the share bubbles while the share bars grow, the gallery cards zoom with a blue underline, the video tiles zoom, turn the play ring blue and preview the muted clip on hover (mouse only), and the primary buttons shine. Everything is off with `prefers-reduced-motion`.

## Privacy (Germany)

No cookies, no analytics, no third-party requests on load: fonts, photos and videos are self-hosted; the Google map loads only after a click; the form sends nothing to the site. The Impressum and Datenschutz show only verified facts, with no placeholders (user decision). Legal form, representative, register and VAT ID are not published anywhere, so they were left out; add them to `legal` in `business.ts` if the owner provides them.

## SEO / GEO

- Two prerendered pages, `/` (fr, x-default) and `/en/`, each with its own title, description, canonical and hreflang; every step, car, video, review and FAQ is in the HTML.
- Titles, descriptions and copy carry the searches the owner wants (export voiture / car export, Europe, Allemagne / Germany, Tunisie / Tunisia, entretien / maintenance, Stuttgart). Ranking above similar businesses depends mostly on the Google Business Profile (its website field still points to facebook.com on 2026-10-04; categories, description, services, review replies) and on Search Console.
- JSON-LD `@graph`: `WebSite`, `WebPage` (per language); `AutoDealer` + `AutoRepair` (address, geo, hours, logo, `areaServed` Tunisia, France, Canada, the six Gulf states, Africa, `knowsAbout`, `sameAs`); one `Service` per line of business; `HowTo` with the five steps; one `VideoObject` per clip; `FAQPage`; `Car` + `Offer` only for cars for sale with a published price (none today). Google reviews are shown, not marked up.
- `robots.txt` allows search and AI crawlers; `sitemap.xml` has image and video entries; `llms.txt` lists the steps, the cars (as examples, not for sale) and the videos.

## Owner to confirm

- **Delays** from the owner's notes, not published until confirmed: "delivery to Paris within 3 hours" (the Stuttgart region is ~620 km from Paris by road) and Gulf shipping "from 24 hours" (depends on destination and method). Set `shipping.parisWithin` / `shipping.gulfFrom` in `business.ts` to publish them.
- "Our available stock" (step 01): the site has no stock list; add cars to `forSale` when there are some.
- Car maintenance: what it covers and where it is done (the site only says "a maintenance service, book on WhatsApp").

See `../brief.md` §11: meaning of "Export pour la Tunisie" posts, destinations (Algeria?), what "Gestion complète jusqu'à la livraison" includes, FCR, label conflicts (C 180 badge, Velar/RS Q3 caption), Google Maps photo ownership, naming Mohamed Chaari, Impressum details, permission to reuse the reels.
