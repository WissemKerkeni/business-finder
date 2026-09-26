# La Cucina Monastir — website

One-page site for La Cucina (Italian restaurant, Place 3 Août, Monastir), built with Vite + React 19 + Tailwind 4.
The design follows the approved Stitch screens in `../stitch/`.

**Live:** https://la-cucina-monastir.vercel.app (Vercel project `la-cucina`; `SITE_URL` is set in the project's production env). `la-cucina.vercel.app` is taken by another Vercel account.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender → dist/
npm run preview    # serve dist/ on http://localhost:4173
npx vercel deploy --prod   # deploy (project is linked in .vercel/)
```

**Before deploying:** copy `.env.example` to `.env` and set `SITE_URL` to the real domain. It is used for the canonical URL, sitemap, llms.txt and JSON-LD. The build warns if it is missing.

`dist/` is plain static files, so it can be hosted on Netlify, Vercel, Cloudflare Pages, GitHub Pages or any web server.

## Where things live

| File | Purpose |
| --- | --- |
| `src/data/restaurant.ts` | **Every fact on the site**: menu, prices, hours, reviews, photos, FAQ. Edit here only. |
| `src/components/*` | Page sections |
| `src/seo/seo.ts` | Head tags, JSON-LD, robots.txt, sitemap.xml, llms.txt (all generated from the data file) |
| `vite.config.ts` | `la-cucina-seo` plugin: injects head tags, emits robots/sitemap/llms (also served in dev) |
| `scripts/prerender.mjs` | Renders the app to static HTML after the build |

## SEO

- **Prerendered HTML.** The full page, including every menu section (51 items), reviews and FAQ, is in `index.html`. React then hydrates it for the tabs and mobile nav.
- **Head tags:** title, meta description, canonical, robots (`max-image-preview:large`), Open Graph (`restaurant.restaurant` with contact info), Twitter card, theme colour.
- **Local signals:** `geo.region` TN-52, `geo.placename`, `geo.position`/`ICBM`. Coordinates are decoded from Google plus code `8F7GQRCQ+5Q`.
- **JSON-LD `@graph`:** `WebSite`; `Restaurant` with address, geo, telephone, price range, cuisine, `openingHoursSpecification`, `hasMap`, `sameAs` and the full `hasMenu` (sections → items → TND offers); and `FAQPage`.
  - Google rating and reviews are shown on the page but are **not** marked up. Google treats a business's own review markup as "self-serving" and ignores it for rich results.
  - Friday is left out of the hours markup until the owner confirms it. Google lists it as "Open 24 hours", which looks like an error.
- `sitemap.xml` (with image entries) and `robots.txt`.
- **Semantics and accessibility:** one `h1`, a section per `h2`, `<address>`, `<time>`, `<dl>` facts, ARIA tabs, skip link, and descriptive alt text on every photo.
- **Performance:** preloaded hero image (`fetchpriority=high`), responsive `srcset` for every photo, lazy-loaded images and map, about 80 kB of gzipped JS.

## GEO (generative engine optimisation)

The goal is for ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews to find, trust and quote the facts correctly.

- **`/llms.txt`:** a markdown fact sheet with key facts, links, the full menu with prices, and the FAQ. It is linked from `<head>` (`rel="alternate" type="text/markdown"`) and from the footer.
- **`robots.txt` explicitly allows AI crawlers:** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended and CCBot.
- **Visible FAQ written as self-contained, citable answers:** where it is, hours, delivery, price, house-made pasta, rating, and how to book. It mirrors the `FAQPage` JSON-LD.
- **Consistent facts (name, address, phone):** one data file feeds the page, the JSON-LD and llms.txt, so the facts never disagree. Keep the Google Business Profile, Instagram and Facebook consistent with it too.
- **Only verified facts** from the Google Maps profile. Nothing is invented, because answer engines penalise contradictions.

## Known limitations / next steps

- **Photos are hot-linked from Google's CDN** (`lh3.googleusercontent.com`). The CDN only serves them without a Referer header, so every `<img>` uses `referrerPolicy="no-referrer"`. For reliability and rights, get the owner's originals and host them in `public/` (ideally as AVIF/WebP).
- **French and Arabic versions** would widen local reach. Add routes such as `/fr/`, plus `hreflang`.
- **Owner to confirm:** Friday hours; the price of the Gorgonzola pasta (currently omitted); whether table reservations are formally accepted.
- **After launch:** submit the sitemap in Google Search Console and Bing Webmaster Tools, and link the site from the Google Business Profile.
