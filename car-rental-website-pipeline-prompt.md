# Car rental website pipeline: research → Stitch → static HTML → Vite + React → deploy

Paste everything below the line into a new session as-is. The session asks for the agency name and fills in the rest from `sahel-website-leads.csv` (rows with `Type` = `Car rental`).
It follows the same flow as `restaurant-website-pipeline-prompt.md`. The code architecture comes from `di-piu/site/`; the fleet replaces the menu.

---

Build a website proposal for a car rental agency from my leads list: research, then design in Stitch, then approve a static HTML version, then build a Vite + React site, then deploy it. It is an informational site for showing the owner. Booking is a WhatsApp request, not a booking engine: no payments, no accounts, no backend.

## Phase 0: Pick the agency from `sahel-website-leads.csv`

1. **Ask me** which agency to work on, then wait for my answer. Don't start anything else first. With the question, list the rows whose `Type` is `Car rental` (name, city, rating, review count) so I can pick one.
2. **Look it up** in `D:\workspace\business-finder\sahel-website-leads.csv` by the `Business` column. Match without regard to case, accents or extra spaces (e.g. "hlila rent car" matches "Hlila rent car").
   - No match: show me the closest names and ask again.
   - Several matches: list them with their city and address, and ask me which one.
3. **Fill the placeholders** used in the rest of this prompt from that row:
   - `[NAME]`: `Business`
   - `[CITY]`: `City`
   - `[MAPS_URL]`: `Google Maps`
   - `[FB_URL]`: `Facebook` (may be empty)
   - `[IG_URL]`: `Instagram` (may be empty, or a handle or a note instead of a URL)
   - `[SLUG]`: the name in lowercase ASCII, accents removed, words joined with hyphens (e.g. Hlila rent car → `hlila-rent-car`, TESLA-RENT-CAR → `tesla-rent-car`). It is both the folder name and the Vercel project name.
4. **Keep the rest of the row** as leads for Phase 1: address, phone, secondary phone, website status, rating, review count, reason and verification sources. The CSV is only a starting point. Check every value against the Google profile. If they disagree, use Google and list the difference for the owner.
5. **Find the social pages.** If `Facebook` or `Instagram` is empty or not a real profile URL, search Google for `[NAME] [CITY] facebook` / `instagram` and the phone number. Only accept a page whose name, phone or address matches the Google profile. Ask me to confirm a page you found this way.
6. **If `Google Maps` is empty**, search Google Maps for `[NAME] [CITY]` in the built-in browser, and ask me to confirm the profile before going on.
7. **Confirm with me** in one short message before starting Phase 1: the name, city, Maps link, Facebook and Instagram links, slug and the planned URL `https://[SLUG].vercel.app`.
8. **If `[SLUG]/` already exists**, stop and ask me whether to continue that work or start over.

## Ground rules (apply to every phase)

- **Git:** work on `main` in `D:\workspace\business-finder`. No worktrees, no feature branches. All files go under `[SLUG]/`. Don't touch other businesses' folders, and don't touch my own uncommitted files.
- **Facts only.** Every car model, price, condition, service, hour, review and photo label must come from the Google profile or the agency's own Facebook/Instagram posts.
  - Never invent: fleet size, "brand-new cars", "unlimited mileage", "full insurance", "free delivery", "24/7", "airport delivery", "no deposit", minimum age, years in business, or similar claims. Stitch adds this kind of copy on its own, so audit every generated screen for it.
  - Prices: use only prices the agency has published, note the post date for each, and list them for the owner to confirm (social-media prices go stale). If no prices are published, show "Price on request" and route to WhatsApp. Never estimate.
  - If something is missing, design around the gap.
  - If two sources disagree (e.g. a phone on Google vs. on Facebook, or two prices for the same car), use the most recent source and list the conflict for the owner.
- **Don't mix businesses.** After every phase, grep `[SLUG]/` for other clients' names, addresses, phones and handles (e.g. "La Cucina", "Di Più", "Dar Zmen", other rental agencies from the CSV, "96 455 150").
- **Photos:** real photos only, from Google Maps and the agency's Facebook and Instagram. No stock photos, no AI images, no manufacturer press photos. Rules in the "Photos: high quality only" section below.
- **Logins:** never sign in to Facebook or Instagram and never type credentials. If a login wall blocks the photos, stop and ask me: I can sign in myself in the browser pane, or tell you to use Claude in Chrome with my existing session.
- **Checkpoints:** stop at each **⏸ CHECKPOINT**, show previews, and wait for my approval.
- **Progress updates:** give a short status line during long waits (Stitch generations take about 8–12 minutes).

## Photos: high quality only

Facebook and Instagram CDN URLs are signed and expire (the `oe=` parameter), so these photos are **downloaded**, never hot-linked. Download Google Maps photos too, so every image on the site is self-hosted.

1. **Always take the largest version available.** Never save a thumbnail, a grid tile or a screenshot.
   - **Google Maps:** take the tile's `lh3.googleusercontent.com` URL and replace the size suffix (`=w…-h…-k-no`, `=s…`) with `=s0` for the original. If `=s0` fails, use `=w2400`.
   - **Facebook:** open each photo in the photo viewer (`/photo/?fbid=…` or the post's photo), and take the `src` of the full-size `<img>` in the viewer (the largest `scontent…fbcdn.net` image on the page, check `naturalWidth`). Use the URL exactly as given: don't edit its size or signature parameters, that breaks the signature. Walk the Photos tab and the album pages, not just the feed.
   - **Instagram:** open each post (`/p/<code>/`), read the `<img>` `srcset` and take the largest candidate (usually 1080w). Step through every carousel slide. For reels, take the cover only if it is sharp.
   - Download with the browser's own `fetch` → blob, or with `curl` plus the browser's user agent, straight after collecting the URL (before it expires). Save originals to `[SLUG]/_scratch/photos-raw/`.
2. **Quality gate.** After downloading, check each file with PIL and reject it if:
   - the long side is under 1080px (under 1600px wide for the hero)
   - it is blurry, heavily compressed, or has visible JPEG blocking
   - it is a screenshot, a collage, a promo flyer with text over the car, or has a watermark or a social-media frame (price flyers still go in the brief as a price source, just not on the site)
   - it shows customers' faces the agency didn't obviously pose for
   - Never upscale an image to pass the gate. If a slot has no photo that passes, design around it and say so.
3. **Record** every kept photo in `[SLUG]/photo-manifest.csv`: file name, source (Maps/FB/IG), source post URL, post date, original width × height, label, and where it is used.
4. **Labels.** Label a photo with a car model only if the post caption names it or the badge and shape clearly show it. Check each label against the image.
5. **Optimise for the site** in Phase 4: convert to WebP (and keep a JPEG fallback only if needed), max 2400px on the long side for the hero and 1600px for everything else, quality around 82, and generate `srcset` sizes (640/1024/1600/2400). Keep the untouched originals in `_scratch/photos-raw/` (not committed).

## Phase 1: Research → `[SLUG]/brief.md` + `[SLUG]/photo-manifest.csv`

1. **Maps profile.** In the built-in browser, open [MAPS_URL] with `&hl=en`. Record:
   - name, category, rating and review count, star distribution
   - phone, address or plus code, coordinates
   - hours (expand the weekly table)
   - the About tab: services, payments, accessibility, anything about delivery or airports
   - owner photos and the Updates tab (agencies often post offers there)
2. **Facebook.** Open [FB_URL]. Record the About/Intro details (phones, WhatsApp, email, address, hours, "page created" date only as a fact, not as "years of experience"). Then walk the posts back about 12 months and collect:
   - every car model the agency shows, with transmission, fuel, seats or any other spec it states
   - every published price with its duration (per day, per week, per month), season and post date
   - rental conditions it states: deposit, age, licence, documents, mileage, insurance, fuel policy
   - delivery or pickup locations it offers (e.g. airport, hotel, city), only if stated
   - languages used in the posts (French, Arabic, English), which decide the site's language
3. **Instagram.** Open [IG_URL] and do the same: bio, highlights (often "Prices", "Cars", "Contact"), posts and captions.
4. **Photos.** Collect and download photos by the "Photos: high quality only" rules: the exterior and sign of the agency, the office, every car in the fleet (front 3/4 view first), and any delivery or handover shots. Keep the URL list in one script, because reloading the page loses in-page variables.
5. **Reviews.** Take 8–10 verbatim Google reviews with author, stars and Local Guide badge. Mark truncation with "…". Facebook recommendations can be quoted too, marked as Facebook, never mixed into the Google rating.
6. **Contact sheet.** Build one of the kept photos (serve it from `[SLUG]/_scratch/` over a `[SLUG]-static` http-server entry in `.claude/launch.json`). Show the pixel size under each one. Verify that each labelled photo shows what its label says. Choose:
   - the hero (the strongest, sharpest car or fleet shot, or the agency front if it is recognisable)
   - one photo per car model for the fleet, and gallery shots
7. **Brief.** Write `brief.md` with these sections: facts, visual identity (logo colours, signage, the colours and style of their posts), fleet table (model, category, transmission, fuel, seats, price, price date, photo, source), rental conditions, delivery locations, reviews, photo labels, and conflicts or stale items for the owner.

## Phase 2: Stitch design (desktop)

1. **Design system.** `create_project`, then a design system (`create_design_system` + `update_design_system`) derived from the agency's real identity: palette taken from the logo, sign and posts, plus fonts and designMd rules.
   - Default direction: confident and automotive. A dark near-black or deep brand-coloured base, clean grotesk or wide sans headlines, ONE vivid brand accent for prices, labels, active states and the primary button (WhatsApp).
   - Large car photography, strong horizontals, hairline rules, spec lists in a tabular rhythm. No cards, shadows, gradients or rounded boxes; no generic car-rental template look.
   - Language: follow the agency's own posts (usually French first). If the posts mix languages, ask me.
2. **Generate** a single DESKTOP screen with `generate_screen_from_text`. The prompt lists every section with exact copy, prices and image paths:
   - hero: name, one factual line (city, what they rent), rating row, and a **quick request bar** (pickup location, pickup date, return date, car) whose button opens WhatsApp with a pre-filled message
   - fleet: filter chips by category or transmission (only categories that exist), one row per car with a large photo, model, spec line (transmission · fuel · seats, only stated specs) and the price with its unit or "Price on request", plus a "Request this car" WhatsApp button
   - how to book: three plain steps that describe the WhatsApp flow (choose a car, send a request, confirm the details), no promises
   - conditions: only the stated ones (documents, deposit, age, mileage, insurance), otherwise leave the section out
   - delivery / pickup locations, only if stated
   - gallery, Google reviews (rating, distribution, quotes)
   - location with a real `maps.google.com/maps?q=LAT,LNG&z=17&output=embed` iframe, hours, phones
   - final CTA (Call · WhatsApp · Directions), footer with Facebook and Instagram links
3. **Timeouts.** The call almost always times out while generation continues. Don't retry. Wait in the background (Bash `sleep` with `run_in_background`, or `Monitor`), then poll `list_screens`.
4. **Review.** Download the HTML and the screenshot (`=w1280`) into `[SLUG]/stitch/`. Slice the PNG into roughly 960px pieces with PIL and read each piece; the browser pane is too narrow for desktop review.
5. **Critique** against this checklist:
   - invented copy (see the banned claims list), invented cars or prices
   - wrong address or another business's data
   - hero fits one viewport, with the request bar and rating row above the fold
   - generic grids, stock-looking images or empty gaps
   - filters that don't work
   - fake map
   - weak contrast
6. **Refine.** Send one `edit_screens` pass per round of fixes and review it again. Save screen and design-system IDs to memory.

## Phase 3: Final static HTML → `[SLUG]/stitch/desktop-final.html`

1. **Build script.** Write `[SLUG]/_scratch/build_final.py`. It turns the latest Stitch export into the final file, so changes stay repeatable:
   - text fixes, asserting that banned phrases are gone
   - every image pointing at the local downloaded files, with `width`/`height` set
   - a data-driven fleet: every car from the brief
2. **Fleet.**
   - Filter chips, where the active chip has an accent fill; "All" is the default.
   - Each car row: the large photo on the left, the model, spec line and price on the right, and a "Request this car" button that opens `https://wa.me/<number>?text=…` with the model pre-filled.
   - Cars with several photos get a small counter; tapping the photo cycles through them.
3. **Request bar.** Pickup location (only stated locations, else a free text field), dates, car (from the fleet). The button builds the WhatsApp message in the site's language, e.g. "Bonjour, je voudrais louer [car] du [date] au [date], prise en charge à [lieu]." Nothing is sent anywhere else. Validate that the return date is after the pickup date.
4. **Mobile pass (< lg):**
   - the hero photo full-bleed behind the text, `min-h-[100svh]`, with the request bar stacked below the headline
   - a ☰ drawer with the links, hours and phone
   - fleet filter chips `sticky top-0` and horizontally scrollable, not centred while they overflow
   - a fixed bottom Call · WhatsApp · Directions bar that appears after the hero
   - a stacked footer
   - no horizontal overflow at 375px
5. **Verify:**
   - Desktop: headless Edge (`msedge --headless=new --screenshot --window-size=1440,H`) on a render copy with the hero height pinned.
   - Mobile: a 375px iframe wrapper (headless Edge can't go below about 500px wide), with `100svh`/`h-screen` pinned to 812px in the render copy.
   - Interaction: in the browser pane, click every filter and car, fill the request bar and check the generated `wa.me` link text (don't open WhatsApp), check no console errors, probe that every image loads, and check `scrollWidth == 375` in mobile emulation.
6. **⏸ CHECKPOINT:** send me the full-page desktop preview, the mobile preview and the fleet-filter preview (SendUserFile), with the list of owner-to-confirm items.

## Phase 4: Vite + React site → `[SLUG]/site/`

1. **Architecture.** Mirror `di-piu/site/`: Vite + React 19 + Tailwind 4 + TypeScript.
   - `src/data/agency.ts` is the single source of truth: photos (with sizes and alt text), facts, fleet (model, category, transmission, fuel, seats, price, price unit, price date, photos), conditions, delivery locations, gallery, reviews, and an FAQ written only from facts.
   - Photos live in `public/photos/` as optimised WebP with `srcset` sizes (see "Photos: high quality only"). The hero is preloaded; everything else is `loading="lazy"`.
   - Components: Hero (with Header, drawer and RequestBar), Fleet (filter chips as an ARIA toolbar; all cars rendered, filtered ones `hidden`, so the prerendered HTML contains the full fleet), HowToBook, Conditions, Delivery, Gallery, Reviews, Faq, Location (lazy map iframe), Visit, Footer, ActionBar.
   - `src/seo/seo.ts` plus the Vite plugin produce: head tags, OG `business.business`, geo meta, JSON-LD `@graph` (WebSite, `AutoRental` with address, geo, hours, phone, `sameAs` Facebook/Instagram, and `makesOffer` only for published prices in TND, FAQPage; no self-serving review markup), `robots.txt` allowing AI crawlers, `sitemap.xml` with images, and `llms.txt`.
   - `scripts/prerender.mjs` prerenders the page to static HTML. The `README.md` follows the same layout.
2. **Build.** Put `SITE_URL=https://[SLUG].vercel.app` in `.env` (gitignored), then run `npm install` and `npm run build`. The type check, SSR build and prerender must all pass.
3. **Preview.** Add a `[SLUG]-preview` entry to `.claude/launch.json` and run it. Verify:
   - no console or hydration errors
   - the prerendered HTML contains every car
   - filters, photo cycling and the request bar work, and the `wa.me` text is right
   - all images load, and the served files are the optimised ones (check sizes in the network panel; the hero under about 400 KB)
   - desktop at 1440 and 375px mobile screenshots (same techniques as Phase 3)
4. **⏸ CHECKPOINT:** show the desktop and mobile screenshots and wait for approval.

## Phase 5: Commit, push, deploy

1. **Commit.** Stage only `[SLUG]/` and `.claude/launch.json`. Ignore `_scratch/*` except the build scripts; never commit `_scratch/photos-raw/`. No `.env`, `node_modules` or `dist`. Commit on `main`, then `git push origin main`.
2. **Vercel.** The site always lives on the agency-name subdomain `https://[SLUG].vercel.app` (e.g. Hlila rent car → `https://hlila-rent-car.vercel.app`). Never add the city or any other suffix to the project name. In `[SLUG]/site`:
   - `npx vercel link --yes --project [SLUG]`
   - `printf 'https://[SLUG].vercel.app' | npx vercel env add SITE_URL production`
   - `npx vercel deploy --prod --yes`
   - `npx vercel inspect <url>` to confirm "Ready" and that the alias is exactly `[SLUG].vercel.app`.
   - If `[SLUG].vercel.app` is already taken by another account, stop and ask me which name to use. Don't pick one yourself. Then update `SITE_URL` in `.env` and on Vercel, and rebuild so the canonical URL, sitemap and `llms.txt` match.
3. **Live checks:**
   - `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/favicon.svg` all return 200
   - the canonical URL is the live URL
   - the fleet is in the HTML
   - in the browser, all images load and the console is clean
4. **Record.** Save the deployment details (project, URL, IDs) to memory and the README.

## Final report (short)

The live URL; what was built; what was verified, and how; and a list of the items the owner needs to confirm: prices and their dates, the WhatsApp number, car models and specs, conditions, delivery locations, photo matches, missing hours, and so on.
