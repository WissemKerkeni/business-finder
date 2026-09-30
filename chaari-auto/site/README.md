# Chaari Auto — website

One-page French site for Chaari Auto, a car-export business in Bietigheim-Bissingen (Germany) that buys cars in Europe for Tunisians living abroad and exports them to Tunisia (and France, per its bio). Built with Vite + React 19 + Tailwind 4, on the same architecture as `ahmed-auto/site`.
The design follows `../stitch/desktop-final.html` and the Stitch screen `../stitch/desktop-v1.png` ("Plate Black & Tunis Red": near-black #0C0C0D, one Tunisian-red accent #E70013, the white "CHAARI AUTO" plate as wordmark; Archivo Narrow, Geist, Space Mono, all self-hosted through Fontsource).

It is an informational site: a request is a WhatsApp message or a phone call. No payments, accounts, quote calculator or backend. The request form only builds a pre-filled `wa.me` message.

**Live:** https://chaari-auto.vercel.app (Vercel project `chaari-auto`, `prj_cj7fnXN6ezbkYzg7DyGyR39BhPPA`, team `team_ODIYw5HwL1ZT6MkftJt0ZpW3`; first production deploy `dpl_BbSJ71iogepXBsCQzUs4cBtV342e` on 2026-09-30). `SITE_URL` is set in the Vercel production env. Deploy from this folder with `npx vercel deploy --prod --yes`; `.vercelignore` keeps `dist/` out of the upload (Vercel builds from source).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender → dist/
npm run preview    # serve dist/ on http://localhost:4173 (the repo's launch entry uses :4179)
```

**Before deploying:** `.env` must contain `SITE_URL=https://chaari-auto.vercel.app` (or the real domain). It is used for the canonical URL, sitemap, llms.txt and JSON-LD.

## Adding content

Every fact comes from the business's own posts, bio or Google Maps profile. Never add customs, transport, delays, prices, guarantees or savings unless the business states them, and then only in its words.

**A car delivered to a client, or posted as "Export pour la Tunisie"**
1. Put its photos (largest version, readable plates blurred, no faces) in `../_scratch/kept/<car-id>-1.jpg … -N.jpg`. The research helpers `../_scratch/selection.py` + `prep_photos.py` do this for the current cars.
2. Run `python ../_scratch/optimize_photos.py public/photos src/data/photos.json` (WebP 640/1024/1600, hero up to 2000).
3. Add the car to `deliveries` in `src/data/business.ts`: make, model, year, `kind` (`client` only if the post says "Félicitations …"; never show the client's name), post date and URL, the stated specs only, photo count and alt texts.

**A car for sale** (only if the business posts it as "à vendre" / "disponible", from the last ~3–4 months and not sold)
- Add it to `forSale` with `price`/`currency` exactly as published (else `null` → "Prix sur demande") and set `forSaleDate`. The "Véhicules proposés" section, its JSON-LD `Car`/`Offer` and the llms.txt block appear automatically. Remove sold cars.

**A video**
1. Add the clip to `CLIPS` in `../_scratch/selection.py` (Facebook reel id, post date, kept segment without glitch effects, readable plates or faces).
2. `python ../_scratch/make_clips.py clips` (H.264 720p, no audio, faststart, sharpest-frame poster), `python ../_scratch/prep_photos.py`, `python ../_scratch/optimize_photos.py public/photos src/data/photos.json`, `python ../_scratch/site_videos.py`.
3. Add its caption to `videoCaptions` in `business.ts`. Keep the total video weight under ~40 MB.

Then `npm run build`, check with `npm run preview`, and redeploy: `npx vercel deploy --prod --yes`.

## Where things live

| File | Purpose |
| --- | --- |
| `src/data/business.ts` | **Every fact on the site**: contact, hours, the four service steps, form fields and WhatsApp template, delivered cars, cars for sale (empty), video captions, reviews, FAQ, legal placeholders |
| `src/data/photos.json`, `videos.json` | Generated media metadata (sizes, widths; clip file, poster, duration, post URL, upload date) |
| `public/photos/` | Self-hosted WebP (`<id>-<width>.webp`) + `og.jpg`; rear plates were already pixelated by the business, the CHAARI AUTO plate holder is their sign |
| `public/videos/` | 5 clips, 720×1280 H.264, muted (no audio track), 14.8 MB total |
| `src/components/Hero.tsx` | Full-height hero: the Maps photo of a Mercedes GLC Coupé framed on the right inside the 1320px container (equal side margins), dark scrim from the left, Ken Burns zoom, staggered entrance; full-bleed on phones |
| `Steps.tsx` | 01–04 route with an icon per step (horizontal on desktop, vertical on phones). On reveal the line draws, a car drives 01→04, the nodes light up in turn and 04 pulses (CSS in `index.css`, final state without JS or with reduced motion) |
| `RequestForm.tsx` | "Votre demande" → `wa.me` with one line per filled field; required: model (or "ouvert aux suggestions"), country, name |
| `Deliveries.tsx` | "Export pour la Tunisie" gallery (no availability, no price) |
| `ForSale.tsx` | "Véhicules proposés", rendered only when `forSale` is not empty |
| `Videos.tsx` | Portrait tiles, `preload="none"`, one clip plays at a time, pauses when out of view |
| `CarDialog.tsx` | Focus-trapped dialog (Esc, arrows, swipe, thumbnails, counter), spec table, WhatsApp/Call; `#car-<id>` opens it |
| `Sections.tsx` | Audience, Testimonials, FAQ, Contact (click-to-load Google map), CTA, Legal (Impressum / Datenschutz placeholders), Footer, phone ActionBar |
| `src/seo/seo.ts` | Head tags, JSON-LD, robots.txt, sitemap.xml (images + `video:video`), llms.txt |
| `scripts/prerender.mjs` | Renders the app to static HTML after the build |

## Motion

The hero plays a Ken Burns zoom and a staggered entrance (CSS only, so it also runs on the prerendered HTML). Sections reveal on scroll: `html.js` plus a `data-in` attribute set by `useReveal` in `App.tsx`, with a scroll fallback so nothing stays hidden after a jump link, and content visible without JS. The steps route line draws across, the "Pour qui" photo and CTA background parallax (CSS scroll-driven, Chrome and Edge), the gallery cards zoom with a red underline, the video tiles zoom, turn the play ring red and preview the muted clip on hover (mouse only), and the primary buttons shine. Everything is off with `prefers-reduced-motion`.

## Privacy (Germany)

No cookies, no analytics, no third-party requests on load: fonts, photos and videos are self-hosted; the Google map loads only after a click; the form sends nothing to the site. The Impressum and Datenschutz show only verified facts, with no placeholders (user decision). Legal form, representative, register and VAT ID are not published anywhere, so they were left out; add them to `legal` in `business.ts` if the owner provides them.

## SEO / GEO

- Prerendered HTML contains every step, every car, the videos, the reviews and the FAQ.
- JSON-LD `@graph`: `WebSite`; `AutoDealer` (address, geo, hours from Google Maps, WhatsApp/phone `contactPoint`, `areaServed` Tunisie + France as stated, `sameAs` Maps/Facebook/Instagram/TikTok); one `Service` per stated step; one `VideoObject` per clip; `FAQPage`; `Car` + `Offer` only for cars for sale with a published price (none today). Google reviews are shown, not marked up.
- `robots.txt` allows search and AI crawlers; `sitemap.xml` has image and video entries; `llms.txt` lists the steps, the cars (as examples, not for sale) and the videos.

## Owner to confirm

See `../brief.md` §11: meaning of "Export pour la Tunisie" posts, destinations (Algeria?), what "Gestion complète jusqu'à la livraison" includes, FCR, label conflicts (C 180 badge, Velar/RS Q3 caption), Google Maps photo ownership, naming Mohamed Chaari, Impressum details, permission to reuse the reels.
