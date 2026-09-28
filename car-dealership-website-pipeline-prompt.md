# Car dealership website pipeline: research → Stitch → static HTML → Vite + React → deploy

Paste everything below the line into a new session as-is. The session asks for the dealership name and fills in the rest from `sahel-website-leads.csv` (rows with `Type` = `Car dealership`).
It follows the same flow as `car-rental-website-pipeline-prompt.md`. The code architecture comes from `top-cars-mahdia/site/` (the latest car site); the stock of cars for sale replaces the rental fleet.

---

Build a website proposal for a car dealership from my leads list: research, then design in Stitch, then approve a static HTML version, then build a Vite + React site, then deploy it. It is an informational site for showing the owner: a showroom of the cars they have published for sale. An enquiry is a WhatsApp message or a phone call, not an online sale: no payments, no accounts, no reservations, no backend.

## Phase 0: Pick the dealership from `sahel-website-leads.csv`

1. **Ask me** which dealership to work on, then wait for my answer. Don't start anything else first. With the question, list the rows whose `Type` is `Car dealership` (name, city, rating, review count) so I can pick one. If I name a business of another type (e.g. an `Auto repair / service` garage that also sells cars), check its Google profile and Facebook for cars for sale, and ask me before using this pipeline for it.
2. **Look it up** in `D:\workspace\business-finder\sahel-website-leads.csv` by the `Business` column. Match without regard to case, accents or extra spaces (e.g. "ahmed auto" matches "AHMED AUTO").
   - No match: show me the closest names and ask again.
   - Several matches: list them with their city and address, and ask me which one.
3. **Fill the placeholders** used in the rest of this prompt from that row:
   - `[NAME]`: `Business`
   - `[CITY]`: `City`
   - `[MAPS_URL]`: `Google Maps`
   - `[FB_URL]`: `Facebook` (may be empty)
   - `[IG_URL]`: `Instagram` (may be empty, or a handle or a note instead of a URL)
   - `[SLUG]`: the name in lowercase ASCII, accents removed, words joined with hyphens (e.g. AHMED AUTO → `ahmed-auto`, Kamel Auto → `kamel-auto`). It is both the folder name and the Vercel project name.
4. **Keep the rest of the row** as leads for Phase 1: address, phone, secondary phone, website status, rating, review count, reason and verification sources. The CSV is only a starting point. Check every value against the Google profile. If they disagree, use Google and list the difference for the owner.
5. **Find the social pages.** If `Facebook` or `Instagram` is empty or not a real profile URL, search Google for `[NAME] [CITY] facebook` / `instagram` and the phone number. Only accept a page whose name, phone or address matches the Google profile. Ask me to confirm a page you found this way. Dealers often also list on marketplaces (Tayara, Automobile.tn, Facebook Marketplace); note any listing you find under the same phone, but use it only as a secondary source and say so.
6. **If `Google Maps` is empty**, search Google Maps for `[NAME] [CITY]` in the built-in browser, and ask me to confirm the profile before going on.
7. **Confirm with me** in one short message before starting Phase 1: the name, city, Maps link, Facebook and Instagram links, slug and the planned URL `https://[SLUG].vercel.app`.
8. **If `[SLUG]/` already exists**, stop and ask me whether to continue that work or start over.

## Ground rules (apply to every phase)

- **Git:** work on `main` in `D:\workspace\business-finder`. No worktrees, no feature branches. All files go under `[SLUG]/`. Don't touch other businesses' folders, and don't touch my own uncommitted files.
- **Facts only.** Every car, year, mileage, price, spec, service, hour, review and photo label must come from the Google profile or the dealer's own Facebook/Instagram posts (or a marketplace listing under the dealer's phone, marked as such).
  - Never invent: warranty/"garantie", financing/"facilité de paiement"/"crédit", trade-in/"reprise", "certified", "inspected", "accident-free"/"jamais accidentée", "first owner"/"première main", "full options", "dédouanée", "carte grise prête", import origin (Germany, France, FCR…), "best prices", stock size, years in business, "delivery everywhere", or similar claims. Stitch adds this kind of copy on its own, so audit every generated screen for it. A claim may appear only if the dealer states it, and then only on the car or page where they state it.
  - Mileage, year, fuel, gearbox, engine, fiscal horsepower (CV), colour and options: only as stated in the post. Don't read mileage off a dashboard photo unless the caption confirms it. Never fill a spec from the manufacturer's catalogue.
  - Prices: use only prices the dealer has published, in TND, with the post date for each, and list them for the owner to confirm. If no price is published (common: "prix en inbox"), show "Prix sur demande" and route to WhatsApp. Never estimate or convert.
  - If something is missing, design around the gap.
  - If two sources disagree (e.g. two prices or mileages for the same car), use the most recent source and list the conflict for the owner.
- **Stock goes stale.** Dealer stock sells. Only put cars from the last ~3–4 months on the site by default, and never a car the post, a comment by the page, or an edited caption marks as sold ("vendue", "vendu", "sold", ✅). Older unsold cars go in the brief as "status unknown" for the owner. The site states the stock date ("Stock publié au [date]") so it never looks like a live inventory.
- **Don't mix businesses.** After every phase, grep `[SLUG]/` for other clients' names, addresses, phones and handles (e.g. "La Cucina", "Di Più", "Dar Zmen", "Hlila", "Top Car", other dealers and garages from the CSV, "96 455 150").
- **Photos:** real photos only, from Google Maps and the dealer's Facebook and Instagram (and marketplace listings under the dealer's phone). No stock photos, no AI images, no manufacturer press photos. Rules in the "Photos: high quality only" section below.
- **Number plates:** blur or crop any readable number plate before a photo goes on the site (keep the untouched original in `photos-raw/`). Don't blur the dealer's own branded plate holder or sign.
- **Logins:** never sign in to Facebook or Instagram and never type credentials. If a login wall blocks the photos, stop and ask me: I can sign in myself in the browser pane, or tell you to use Claude in Chrome with my existing session.
- **Checkpoints:** stop at each **⏸ CHECKPOINT**, show previews, and wait for my approval.
- **Progress updates:** give a short status line during long waits (Stitch generations take about 8–12 minutes).

## Photos: high quality only

Facebook and Instagram CDN URLs are signed and expire (the `oe=` parameter), so these photos are **downloaded**, never hot-linked. Download Google Maps photos too, so every image on the site is self-hosted.

1. **Always take the largest version available.** Never save a thumbnail, a grid tile or a screenshot.
   - **Google Maps:** take the tile's `lh3.googleusercontent.com` URL and replace the size suffix (`=w…-h…-k-no`, `=s…`) with `=s0` for the original. If `=s0` fails, use `=w2400`.
   - **Facebook:** open each photo in the photo viewer (`/photo/?fbid=…` or the post's photo), and take the `src` of the full-size `<img>` in the viewer (the largest `scontent…fbcdn.net` image on the page, check `naturalWidth`). Use the URL exactly as given: don't edit its size or signature parameters, that breaks the signature. Walk the Photos tab and the album pages, not just the feed. Dealer posts are usually multi-photo: step through every photo of each car post.
   - **Instagram:** open each post (`/p/<code>/`), read the `<img>` `srcset` and take the largest candidate (usually 1080w). Step through every carousel slide. For reels, take the cover only if it is sharp.
   - Download with the browser's own `fetch` → blob, or with `curl` plus the browser's user agent, straight after collecting the URL (before it expires). Save originals to `[SLUG]/_scratch/photos-raw/`, grouped per car (`<car-id>-01.jpg`, `-02.jpg`, …).
2. **Quality gate.** After downloading, check each file with PIL and reject it if:
   - the long side is under 1080px (under 1600px wide for the hero)
   - it is blurry, heavily compressed, or has visible JPEG blocking
   - it is a screenshot, a collage, a promo flyer with text over the car, or has a watermark or a social-media frame (flyers still go in the brief as a price/spec source, just not on the site)
   - it shows customers' faces the dealer didn't obviously pose for (handover photos with a posing buyer are fine only if clearly posted as such; prefer ones without faces)
   - Never upscale an image to pass the gate. If a car has no photo that passes, leave the car out of the site (keep it in the brief) and say so.
3. **Record** every kept photo in `[SLUG]/photo-manifest.csv`: file name, car id, source (Maps/FB/IG/marketplace), source post URL, post date, original width × height, label, plate blurred (yes/no), and where it is used.
4. **Labels.** Label a photo with a make and model only if the post caption names it or the badge and shape clearly show it. Check each label against the image, and check that every photo in a car's set is the same car (colour, rims, plate, background).
5. **Optimise for the site** in Phase 4: convert to WebP (and keep a JPEG fallback only if needed), max 2400px on the long side for the hero and 1600px for everything else, quality around 82, and generate `srcset` sizes (640/1024/1600/2400). Keep the untouched originals in `_scratch/photos-raw/` (not committed).

## Phase 1: Research → `[SLUG]/brief.md` + `[SLUG]/photo-manifest.csv`

1. **Maps profile.** In the built-in browser, open [MAPS_URL] with `&hl=en`. Record:
   - name, category, rating and review count, star distribution
   - phone, address or plus code, coordinates
   - hours (expand the weekly table)
   - the About tab: services, payments, accessibility
   - owner photos and the Updates tab (dealers often post arrivals there)
2. **Facebook.** Open [FB_URL]. Record the About/Intro details (phones, WhatsApp, email, address, hours, "page created" date only as a fact, not as "years of experience"). Then walk the posts back about 12 months and collect, per car:
   - make, model, version/trim, year (or first registration), mileage, fuel, gearbox, engine size, fiscal horsepower (CV), colour, stated options, stated condition, only what the post says
   - price in TND and whether it is fixed or "à débattre", or "prix en inbox"
   - post date, post URL, and any sold marker
   - what the dealer says about themselves: new vs. used, import, brands they specialise in, services (paperwork, financing, trade-in, after-sales), only as stated
   - languages used in the posts (French, Arabic, English), which decide the site's language
3. **Instagram.** Open [IG_URL] and do the same: bio, highlights (often "Stock", "Vendues", "Contact"), posts and captions. Match IG cars to FB cars so the same car isn't listed twice.
4. **Photos.** Collect and download photos by the "Photos: high quality only" rules: the showroom or lot, the exterior and sign, and for each car in stock its best set (front 3/4 first, then side, rear 3/4, interior, dashboard). Keep the URL list in one script, because reloading the page loses in-page variables.
5. **Reviews.** Take 8–10 verbatim Google reviews with author, stars and Local Guide badge. Mark truncation with "…". Facebook recommendations can be quoted too, marked as Facebook, never mixed into the Google rating.
6. **Contact sheet.** Build one of the kept photos grouped per car (serve it from `[SLUG]/_scratch/` over a `[SLUG]-static` http-server entry in `.claude/launch.json`). Show the pixel size under each one. Verify that each set is one car and each label matches. Choose:
   - the hero (the showroom/lot if it is recognisable and sharp, otherwise the strongest car shot)
   - the cover photo per car, and gallery shots of the showroom
7. **Brief.** Write `brief.md` with these sections: facts, visual identity (logo colours, signage, the colours and style of their posts), stock table (id, make, model, version, year, mileage, fuel, gearbox, CV, price, price type, post date, status: on site / status unknown / sold, photos, source), dealer services as stated, reviews, photo labels, and conflicts or stale items for the owner.

## Phase 2: Stitch design (desktop)

1. **Design system.** `create_project`, then a design system (`create_design_system` + `update_design_system`) derived from the dealer's real identity: palette taken from the logo, sign and posts, plus fonts and designMd rules.
   - Default direction: a premium automotive showroom. A dark near-black or deep brand-coloured base, a clean grotesk or wide sans for headlines, tabular figures for prices and specs, and ONE vivid brand accent for prices, labels, active states and the primary button (WhatsApp).
   - Large car photography, strong horizontals, hairline rules, spec lists laid out like a data sheet. No cards, shadows, gradients or rounded boxes; no generic classifieds look.
   - Language: follow the dealer's own posts (usually French first). If the posts mix languages, ask me.
2. **Generate** a single DESKTOP screen with `generate_screen_from_text`. The prompt lists every section with exact copy, prices and image paths:
   - hero: name, one factual line (city, what they sell: e.g. "Véhicules d'occasion à Ksibet el Mediouni", only as stated), rating row, the stock date, and two buttons (See the cars · WhatsApp)
   - stock: filter chips by make, fuel or gearbox (only values that exist) and a sort (newest post, price, year, mileage; price sort puts "Prix sur demande" last). One row per car: large cover photo, make + model + version, year, the key spec line (year · km · fuel · gearbox, only stated specs), the price in TND or "Prix sur demande", and "Details" + "WhatsApp" buttons
   - car detail: a panel/modal per car with the photo carousel, the full stated spec sheet as a two-column table, the post date, and WhatsApp/Call buttons
   - how to buy: three plain steps that describe the enquiry flow (choose a car, send a WhatsApp or call, visit to see it), no promises
   - dealer services: only the stated ones (financing, trade-in, paperwork…), otherwise leave the section out
   - showroom gallery, Google reviews (rating, distribution, quotes)
   - location with a real `maps.google.com/maps?q=LAT,LNG&z=17&output=embed` iframe, hours, phones
   - final CTA (Call · WhatsApp · Directions), footer with Facebook and Instagram links and the line "Stock indicatif, publié au [date]. Contactez-nous pour la disponibilité."
3. **Timeouts.** The call almost always times out while generation continues. Don't retry. Wait in the background (Bash `sleep` with `run_in_background`, or `Monitor`), then poll `list_screens`.
4. **Review.** Download the HTML and the screenshot (`=w1280`) into `[SLUG]/stitch/`. Slice the PNG into roughly 960px pieces with PIL and read each piece; the browser pane is too narrow for desktop review.
5. **Critique** against this checklist:
   - invented copy (see the banned claims list), invented cars, specs, mileages or prices
   - a sold or stale car shown as available
   - wrong address or another business's data
   - hero fits one viewport, with the buttons and rating row above the fold
   - generic grids, classifieds look, stock-looking images or empty gaps
   - readable number plates
   - filters or sort that don't work
   - fake map
   - weak contrast
6. **Refine.** Send one `edit_screens` pass per round of fixes and review it again. Save screen and design-system IDs to memory.

## Phase 3: Final static HTML → `[SLUG]/stitch/desktop-final.html`

1. **Build script.** Write `[SLUG]/_scratch/build_final.py`. It turns the latest Stitch export into the final file, so changes stay repeatable:
   - text fixes, asserting that banned phrases are gone
   - every image pointing at the local downloaded (plate-blurred) files, with `width`/`height` set
   - a data-driven stock list: every "on site" car from the brief
2. **Stock.**
   - Filter chips, where the active chip has an accent fill; "Tous" is the default. Filters and sort combine. A result counter ("7 véhicules").
   - Each car row: the large cover photo on the left, the model, spec line and price on the right, a "Détails" button that opens the car panel, and a WhatsApp button that opens `https://wa.me/<number>?text=…` pre-filled in the site's language, e.g. "Bonjour, je suis intéressé(e) par la [make model year] ([price] TND) publiée le [date]. Est-elle toujours disponible ?"
   - Car panel: keyboard-accessible dialog (focus trap, Esc closes, focus returns), photo carousel with arrows, swipe and a counter, the spec table, and the same WhatsApp/Call buttons. Each car has a URL hash (`#car-<id>`) so a link opens its panel.
3. **Mobile pass (< lg):**
   - the hero photo full-bleed behind the text, `min-h-[100svh]`
   - a ☰ drawer with the links, hours and phone
   - stock filter chips `sticky top-0` and horizontally scrollable, not centred while they overflow; sort in a compact select
   - car rows stacked (photo on top); the car panel full-screen
   - a fixed bottom Call · WhatsApp · Directions bar that appears after the hero
   - a stacked footer
   - no horizontal overflow at 375px
4. **Verify:**
   - Desktop: headless Edge (`msedge --headless=new --screenshot --window-size=1440,H`) on a render copy with the hero height pinned.
   - Mobile: a 375px iframe wrapper (headless Edge can't go below about 500px wide), with `100svh`/`h-screen` pinned to 812px in the render copy.
   - Interaction: in the browser pane, click every filter and sort option, open every car panel and step through its photos, open a `#car-<id>` link directly, and check the generated `wa.me` link text (don't open WhatsApp). Check no console errors, probe that every image loads, and check `scrollWidth == 375` in mobile emulation.
5. **⏸ CHECKPOINT:** send me the full-page desktop preview, the mobile preview, a stock-filter preview and one open car panel (SendUserFile), with the list of owner-to-confirm items.

## Phase 4: Vite + React site → `[SLUG]/site/`

1. **Architecture.** Mirror `top-cars-mahdia/site/`: Vite + React 19 + Tailwind 4 + TypeScript.
   - `src/data/dealer.ts` is the single source of truth: photos (with sizes and alt text), facts, the stock date, stock (id, make, model, version, year, mileage, fuel, gearbox, engine, CV, colour, options, price, price type, post date, post URL, photos), stated services, gallery, reviews, and an FAQ written only from facts.
   - Photos live in `public/photos/` as optimised, plate-blurred WebP with `srcset` sizes (see "Photos: high quality only"). The hero is preloaded; everything else is `loading="lazy"`.
   - Components: Hero (with Header and drawer), Stock (filter chips as an ARIA toolbar and sort; all cars rendered, filtered ones `hidden`, so the prerendered HTML contains the full stock), CarDialog (carousel + spec table, hash routing), HowToBuy, Services, Gallery, Reviews, Faq, Location (lazy map iframe), Visit, Footer, ActionBar.
   - `src/seo/seo.ts` plus the Vite plugin produce: head tags, OG `business.business`, geo meta, JSON-LD `@graph` (WebSite, `AutoDealer` with address, geo, hours, phone, `sameAs` Facebook/Instagram; one `Car` per on-site car with brand, model, `vehicleModelDate`, `mileageFromOdometer` (KMT), `fuelType`, `vehicleTransmission` only where stated, and an `Offer` in TND with `availability` only when a price is published; FAQPage; no self-serving review markup), `robots.txt` allowing AI crawlers, `sitemap.xml` with images, and `llms.txt` listing the stock with its date.
   - `scripts/prerender.mjs` prerenders the page to static HTML. The `README.md` follows the same layout and explains how to update the stock (edit `dealer.ts`, add photos, bump the stock date, rebuild, redeploy).
2. **Build.** Put `SITE_URL=https://[SLUG].vercel.app` in `.env` (gitignored), then run `npm install` and `npm run build`. The type check, SSR build and prerender must all pass.
3. **Preview.** Add a `[SLUG]-preview` entry to `.claude/launch.json` and run it. Verify:
   - no console or hydration errors
   - the prerendered HTML contains every on-site car and no sold car
   - filters, sort, the car panel, the carousel, hash links and the `wa.me` text work
   - all images load, and the served files are the optimised ones (check sizes in the network panel; the hero under about 400 KB)
   - no readable plate in any served photo
   - desktop at 1440 and 375px mobile screenshots (same techniques as Phase 3)
4. **⏸ CHECKPOINT:** show the desktop and mobile screenshots and wait for approval.

## Phase 5: Commit, push, deploy

1. **Commit.** Stage only `[SLUG]/` and `.claude/launch.json`. Ignore `_scratch/*` except the build scripts; never commit `_scratch/photos-raw/`. No `.env`, `node_modules` or `dist`. Commit on `main`, then `git push origin main`.
2. **Vercel.** The site always lives on the dealer-name subdomain `https://[SLUG].vercel.app` (e.g. AHMED AUTO → `https://ahmed-auto.vercel.app`). Never add the city or any other suffix to the project name. In `[SLUG]/site`:
   - `npx vercel link --yes --project [SLUG]`
   - `printf 'https://[SLUG].vercel.app' | npx vercel env add SITE_URL production`
   - `npx vercel deploy --prod --yes`
   - `npx vercel inspect <url>` to confirm "Ready" and that the alias is exactly `[SLUG].vercel.app`.
   - If `[SLUG].vercel.app` is already taken by another account, stop and ask me which name to use. Don't pick one yourself. Then update `SITE_URL` in `.env` and on Vercel, and rebuild so the canonical URL, sitemap and `llms.txt` match.
3. **Live checks:**
   - `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/favicon.svg` all return 200
   - the canonical URL is the live URL
   - the stock is in the HTML, and a `#car-<id>` link opens its panel
   - in the browser, all images load and the console is clean
4. **Record.** Save the deployment details (project, URL, IDs) to memory and the README.

## Final report (short)

The live URL; what was built; what was verified, and how; and a list of the items the owner needs to confirm: which cars are still available, prices and their dates, mileages and specs, the WhatsApp number, stated services (financing, trade-in…), photo matches, missing hours, and so on.
