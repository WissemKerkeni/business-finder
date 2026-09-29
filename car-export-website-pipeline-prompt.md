# Car export website pipeline: research → Stitch → static HTML → Vite + React → deploy

Paste everything below the line into a new session as-is, then give the business name (and its bio, if you have it). The session finds the rest by itself: export agents are usually not in `sahel-website-leads.csv`.
It is for businesses that buy cars in Europe (often Germany) and export them to Tunisia for their clients, mostly Tunisians living abroad (TRE), e.g. "Chaari Auto". It follows the same flow as `car-dealership-website-pipeline-prompt.md`. The code architecture comes from `ahmed-auto/site/` (the latest car site). A step-by-step turnkey service replaces the showroom stock; cars delivered to clients (and cars offered for sale, if the business posts any) replace the stock list. These businesses post a lot of video (Reels, TikTok, Facebook videos: purchases, loading, arrivals, handovers), so real videos are part of the site, not only photos.

---

Build a website proposal for a car export business (cars bought in Europe and exported to Tunisia for the client): research, then design in Stitch, then approve a static HTML version, then build a Vite + React site, then deploy it. It is an informational site for showing the owner: what the service covers, how it works, the cars they have delivered, and how to contact them. A request is a WhatsApp message or a phone call, not an online order: no payments, no accounts, no quote calculator, no backend.

## Phase 0: Identify the business

1. **Ask me** which business to work on, then wait for my answer. Don't start anything else first. Ask for the name, and for its bio or any link or phone number I have (a Facebook/Instagram bio usually holds the services and the WhatsApp number).
2. **Check `D:\workspace\business-finder\sahel-website-leads.csv`** by the `Business` column (match without regard to case, accents or extra spaces). If there is a row, use it as leads for the steps below. If there isn't (the usual case), research from scratch.
3. **Find the profiles.** Search Google for `[NAME]` with "export voiture Tunisie", "facebook", "instagram", "tiktok", and the phone number(s) from the bio in every format (e.g. `+49 177 8629077`, `0049 177 8629077`, `01778629077`, `491778629077`). Look for:
   - the Facebook page and Instagram account (the main sources for this kind of business), and TikTok (videos and facts, see "Photos and videos")
   - a Google Maps profile. It may be in Europe (e.g. Germany) or in Tunisia, or not exist at all
   - a listing on a European marketplace (mobile.de, AutoScout24, Kleinanzeigen) or a Tunisian one (Tayara, Automobile.tn) under the same phone, as a secondary source only
   - Only accept a profile whose name, phone or logo matches the bio. Ask me to confirm every profile you found this way.
4. **Fill the placeholders** used in the rest of this prompt:
   - `[NAME]`: the business name as the business writes it (without emoji or flags)
   - `[BIO]`: the bio text, verbatim (my paste, or the Facebook/Instagram bio)
   - `[FB_URL]`, `[IG_URL]`, `[TIKTOK_URL]`, `[MAPS_URL]`: the confirmed profiles (any may be empty)
   - `[WHATSAPP]`: the WhatsApp number in E.164 without `+` (e.g. `+49 177 8629077` → `491778629077`), and any other phone
   - `[SLUG]`: the name in lowercase ASCII, accents removed, words joined with hyphens (e.g. Chaari Auto → `chaari-auto`). It is both the folder name and the Vercel project name.
5. **Confirm with me** in one short message before starting Phase 1: the name, the profiles found, the phones, where the business says it is based (only as stated), the slug and the planned URL `https://[SLUG].vercel.app`.
6. **If `[SLUG]/` already exists**, stop and ask me whether to continue that work or start over.

## Ground rules (apply to every phase)

- **Git:** work on `main` in `D:\workspace\business-finder`. No worktrees, no feature branches. All files go under `[SLUG]/`. Don't touch other businesses' folders, and don't touch my own uncommitted files.
- **Facts only.** Every service, step, country, car, price, delay, review, photo label and video caption must come from the business's own bio, posts and profiles (or a marketplace listing under its phone, marked as such).
  - The services are exactly the ones the business lists (for Chaari Auto: buying the car, preparing the export file, registration ("carte grise") and insurance, full handling until delivery). Describe each step with their words and don't add sub-steps they don't state.
  - Never invent: customs clearance ("dédouanement") included, customs or tax regimes (FCR, "une voiture par famille", reduced duties), savings ("économisez", "moins cher qu'en Tunisie"), all-in prices ("prix tout compris", "sans frais cachés"), delivery times ("livraison en 15 jours"), shipping routes or ports (Genoa, Marseille, La Goulette, Radès…), transport method (ferry, truck, container), countries sourced beyond what they state, "garantie", "contrôle technique"/"TÜV", "véhicule inspecté", "accident-free", "first owner", financing, trade-in, "agréé", "certified", company registration, years in business, number of cars delivered, "best prices", or similar claims. Stitch adds this kind of copy on its own, so audit every generated screen for it. A claim may appear only if the business states it, and only as they state it.
  - **No legal or customs advice.** The site never explains Tunisian customs, tax or registration rules, even correct ones, unless the business itself states them. Questions of that kind route to WhatsApp.
  - **Location.** Say where the business is based only if it states it. A German phone number or a 🇩🇪 flag is not an address: at most write what they write (e.g. "Voitures d'Europe vers la Tunisie"), and list "Where exactly are you based?" for the owner. Never show a map without a confirmed public address.
  - Car facts (make, model, version, year, mileage, fuel, gearbox, engine, power, colour, options): only as stated in the post. Don't read mileage off a dashboard photo unless the caption confirms it. Never fill a spec from the manufacturer's catalogue.
  - Prices: only prices the business has published, in the currency it used (usually EUR, sometimes TND), with the post date for each, and whether they include the export service. Never convert currencies or estimate. With no published price, show "Prix sur demande" and route to WhatsApp.
  - If something is missing, design around the gap.
  - If two sources disagree (e.g. two phones or two prices for the same car), use the most recent source and list the conflict for the owner.
- **Delivered cars vs. cars for sale.** Keep them apart, both in the brief and on the site:
  - **Réalisations / livraisons:** cars the posts show bought for, or delivered to, a client. These are a portfolio, never offered as available, and they carry no price unless the post gives one.
  - **Véhicules proposés:** cars the business offers for sale, only if it posts them with a clear "à vendre"/"disponible". Same freshness rules as a dealer: only cars from the last ~3–4 months, never one marked sold, and the site states the date ("Véhicules publiés au [date]"). If the business doesn't post cars for sale, leave this section out.
- **Clients' privacy.** Delivery posts often show the client with the car. Prefer photos and video clips without faces (or trim the clip to the part without them). Use one with a face only if the business posted it clearly as a posed handover photo, and list those photos and clips for the owner to confirm the client's consent. Never put a client's name on the site unless the post names them with their agreement (e.g. a review they wrote themselves).
- **Don't mix businesses.** After every phase, grep `[SLUG]/` for other clients' names, addresses, phones and handles (e.g. "La Cucina", "Di Più", "Dar Zmen", "Hlila", "Top Car", "AHMED AUTO", "53 850 850", "96 455 150", other businesses from the CSV).
- **Photos and videos:** real media only, from the business's Facebook, Instagram, TikTok and Google Maps (and marketplace listings under its phone). No stock photos or footage, no AI images or video, no manufacturer press media, no flags or map illustrations pretending to be photos. Rules in the "Photos and videos: high quality only" section below.
- **Number plates:** blur or crop any readable number plate (European, export/"Ausfuhr" and Tunisian "TU"/"RS" plates alike) before a photo or video clip goes on the site. Keep the untouched original in `photos-raw/` or `videos-raw/`. Don't blur the business's own branded plate holder or sign.
- **Logins:** never sign in to Facebook, Instagram or TikTok and never type credentials. If a login wall blocks the photos, stop and ask me: I can sign in myself in the browser pane, or tell you to use Claude in Chrome with my existing session.
- **Legal page.** A business based in Germany needs an Impressum and a privacy notice ("Datenschutzerklärung"). Add a "Mentions légales / Impressum" page or section with clearly marked placeholders ("À compléter par le propriétaire"), and never fill it with invented company, address or registration details. List it for the owner.
- **Checkpoints:** stop at each **⏸ CHECKPOINT**, show previews, and wait for my approval.
- **Progress updates:** give a short status line during long waits (Stitch generations take about 8–12 minutes).

## Photos and videos: high quality only

Facebook and Instagram CDN URLs are signed and expire (the `oe=` parameter), so these photos are **downloaded**, never hot-linked. Download Google Maps photos too, so every image on the site is self-hosted.

1. **Always take the largest version available.** Never save a thumbnail, a grid tile or a screenshot.
   - **Google Maps:** take the tile's `lh3.googleusercontent.com` URL and replace the size suffix (`=w…-h…-k-no`, `=s…`) with `=s0` for the original. If `=s0` fails, use `=w2400`.
   - **Facebook:** open each photo in the photo viewer (`/photo/?fbid=…` or the post's photo), and take the `src` of the full-size `<img>` in the viewer (the largest `scontent…fbcdn.net` image on the page, check `naturalWidth`). Use the URL exactly as given: don't edit its size or signature parameters, that breaks the signature. Walk the Photos tab and the album pages, not just the feed. Step through every photo of each multi-photo post.
   - **Instagram:** open each post (`/p/<code>/`), read the `<img>` `srcset` and take the largest candidate (usually 1080w). Step through every carousel slide. For reels, take the cover only if it is sharp.
   - **Video frames:** a still taken from a video may be used as a photo only if the video is at least 1080px on its long side and the frame passes the quality gate (pick it with OpenCV: the sharpest frame by Laplacian variance, not a motion-blurred one). Record it in the manifest as a frame, with its video and timestamp.
   - Download with the browser's own `fetch` → blob, or with `curl` plus the browser's user agent, straight after collecting the URL (before it expires). Save originals to `[SLUG]/_scratch/photos-raw/`, grouped per car (`<car-id>-01.jpg`, `-02.jpg`, …) and per subject (`logo-`, `team-`, `transport-`…).
2. **Quality gate.** After downloading, check each file with PIL and reject it if:
   - the long side is under 1080px (under 1600px wide for the hero)
   - it is blurry, heavily compressed, or has visible JPEG blocking
   - it is a screenshot, a collage, a promo flyer with text over the car, or has a watermark or a social-media frame (flyers still go in the brief as a source of facts, just not on the site)
   - it shows faces against the "Clients' privacy" rule
   - Never upscale an image to pass the gate. If a car has no photo that passes, leave it out of the site (keep it in the brief) and say so.
3. **Record** every kept photo in `[SLUG]/photo-manifest.csv`: file name, car id or subject, kind (delivered / for sale / other), source (Maps/FB/IG/marketplace), source post URL, post date, original width × height, label, plate blurred (yes/no), face (none / posed client, consent to confirm), and where it is used.
4. **Labels.** Label a photo with a make and model only if the post caption names it or the badge and shape clearly show it. Label a place (e.g. "livraison à Sfax", "au départ d'Allemagne") only if the caption says it. Check each label against the image, and check that every photo in a car's set is the same car (colour, rims, plate, background).
5. **Optimise photos for the site** in Phase 4: convert to WebP (and keep a JPEG fallback only if needed), max 2400px on the long side for the hero and 1600px for everything else, quality around 82, and generate `srcset` sizes (640/1024/1600/2400). Keep the untouched originals in `_scratch/photos-raw/` (not committed).

### Videos

6. **Tools.** Check for `ffmpeg`/`ffprobe` first. If they are missing, ask me before installing anything (the options: `pip install imageio-ffmpeg`, which ships its own ffmpeg binary, or `winget install Gyan.FFmpeg`). OpenCV (`cv2`) is already installed for frame checks. Don't install downloaders such as `yt-dlp` without asking me.
7. **Always take the best original.** Never screen-record, and never save a preview or a watermarked version.
   - **Instagram (Reels and video posts):** open the post (`/p/<code>/` or `/reel/<code>/`) and read the media JSON the page loads (a `fetch`/XHR hook installed before the page's own requests, or the embedded JSON): take the largest `video_versions` entry (a progressive MP4). If only DASH is available (separate video and audio representations), download the highest video representation and mux it with ffmpeg (the audio is dropped anyway, see Sound).
   - **Facebook:** open the video or reel page and read `browser_native_hd_url` (or `playable_url_quality_hd`), falling back to the SD one only if HD is missing, from the page's embedded JSON or network responses. Use the URL exactly as given: it is signed and expires.
   - **TikTok:** read `playAddr` (not `downloadAddr`, which carries the TikTok watermark) from the page's `__UNIVERSAL_DATA_FOR_REHYDRATION__` JSON, and download it with the browser's own `fetch` (it needs the page's cookies and referer). If only a watermarked file is reachable, use the video as a source of facts only.
   - The same video is often posted on several platforms: download the highest-resolution copy only.
   - Download straight after collecting the URL (before it expires) with the browser's `fetch` → blob, or with `curl` plus the browser's user agent. Save originals to `[SLUG]/_scratch/videos-raw/` (`<car-id>-v01.mp4`, `delivery-v01.mp4`, …).
8. **Quality gate.** Check each file with `ffprobe` and reject it if:
   - it is under 720px on its short side (1080 × 1920 or 1920 × 1080 is typical for a good source), or the bitrate is so low that it shows blocking
   - it is shaky or out of focus for most of its length, or a slideshow of photos
   - it has burnt-in platform watermarks, large text overlays or a social-media frame (trim past a short intro/outro title card instead of rejecting the whole clip, if the rest is clean)
   - it shows faces or plates you can't blur or trim out (see below)
   - Never upscale a video to pass the gate.
9. **Plates and faces in video.** Prefer trimming to a segment where no plate is readable and no client's face is visible. If a plate stays readable across the clip, blur it with ffmpeg (`boxblur` or `gblur` on the plate's region, per segment as it moves) and check frames from every second of the output; if you can't blur it reliably, don't use the clip. Keep the originals in `videos-raw/`.
10. **Sound.** Remove the audio track from every clip on the site: social videos usually carry licensed music the business has no right to republish, and autoplay requires muted video anyway. Link each clip to its original post ("Voir la vidéo sur Instagram") for anyone who wants the sound.
11. **Record** every kept clip in `[SLUG]/video-manifest.csv`: file name, car id or subject, kind (delivered / for sale / other), source (FB/IG/TikTok), source post URL, post date, original resolution, duration, fps, the kept segment (in → out), plates blurred (yes/no), faces (none / posed client, consent to confirm), caption facts, and where it is used.
12. **Optimise videos for the site** in Phase 4 with ffmpeg:
   - H.264 MP4 (`-c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an`), 720p on the short side (1080p only for the hero, and only if the source is 1080p), max 30 fps.
   - Hero loop: 6–12 s, under about 3 MB. Other clips: up to about 30 s, under about 8 MB each. Keep the total video weight under about 40 MB; if it doesn't fit, use fewer clips.
   - A poster for each clip: its sharpest frame, as a WebP with the same `srcset` sizes as the photos.
   - Keep portrait clips portrait (9:16); don't crop a portrait clip to landscape unless the subject survives the crop.

## Phase 1: Research → `[SLUG]/brief.md` + `[SLUG]/photo-manifest.csv` + `[SLUG]/video-manifest.csv`

1. **Bio.** Save `[BIO]` verbatim in the brief. It is the primary source for the services, the target audience and the contact.
2. **Facebook.** Open [FB_URL]. Record the About/Intro details (phones, WhatsApp, email, address, hours, "page created" date only as a fact, not as "years of experience"). Then walk the posts back about 12 months and collect:
   - every service and step the business describes, with its own wording, and anything it says about countries, documents, registration, insurance, transport, delays and prices, only as stated
   - per car: kind (delivered or for sale), make, model, version, year, mileage, fuel, gearbox, engine, power, colour, stated options, price and currency, where the post says it was bought and delivered, post date, post URL, and any sold marker
   - every video: what it shows (purchase in Europe, loading, arrival, handover…), only as the caption or the video itself states it, with its length, resolution and post URL
   - client testimonials the business posted (screenshots of messages are a fact source only, not a site photo) and Facebook recommendations
   - the languages used in the posts (French, Arabic, German…), which decide the site's language
3. **Instagram and TikTok.** Open [IG_URL] and [TIKTOK_URL] and do the same: bio, highlights (often "Livraisons", "Clients", "Contact"), posts, Reels, TikTok videos and captions. Match cars across platforms so the same car isn't listed twice.
4. **Google Maps.** If [MAPS_URL] exists, open it with `&hl=en`. Record name, category, rating and review count, star distribution, phone, address, coordinates, hours, the About tab, owner photos and the Updates tab. Take 8–10 verbatim reviews with author, stars and Local Guide badge, and mark truncation with "…". If there is no Maps profile, the site shows no Google rating: quote only testimonials the business published or Facebook recommendations, marked by source.
5. **Photos and videos.** Collect and download them by the "Photos and videos: high quality only" rules: the logo, the business's own place or team if shown, and for each delivered car and each car for sale its best photo set (front 3/4 first, then side, rear 3/4, interior). Then the best videos: aim for 4–8 clean clips that together show the service (a car bought or collected in Europe, preparation or loading, arrival, handover in Tunisia), each only as its caption states. Keep the URL lists in one script, because reloading the page loses in-page variables.
6. **Contact sheet.** Build one of the kept photos grouped per car, plus a poster frame, duration and resolution per kept video (with the clip playable on click) (serve it from `[SLUG]/_scratch/` over a `[SLUG]-static` http-server entry in `.claude/launch.json`). Show the pixel size under each one. Verify that each set is one car and each label matches. Choose:
   - the hero: a short muted video loop if a clean, steady clip that works full-bleed exists (a car ready to leave, or a delivery in Tunisia, as the caption states), with its poster; otherwise the strongest sharp car photo
   - the clips for the "En vidéo" section, and which clip belongs to which car
   - the cover photo per car, and the order of the "Réalisations" gallery
7. **Brief.** Write `brief.md` with these sections: facts (name, phones, WhatsApp, where based as stated, profiles), bio verbatim, visual identity (logo colours, the colours and style of their posts), services and steps (their wording, with the source of each), cars table (id, kind, make, model, version, year, mileage, fuel, gearbox, power, price + currency, post date, status: on site / status unknown / sold, faces, photos, source), videos (what each shows, segment kept, plates/faces), testimonials and reviews, photo labels, legal page items, and conflicts or open questions for the owner.

## Phase 2: Stitch design (desktop)

1. **Design system.** `create_project`, then a design system (`create_design_system` + `update_design_system`) derived from the business's real identity: palette taken from the logo and posts, plus fonts and designMd rules.
   - Default direction: a premium automotive editorial look that feels trustworthy for someone ordering a car from a distance. A dark near-black or deep brand-coloured base, a clean grotesk or wide sans for headlines, tabular figures for steps, specs and prices, and ONE vivid brand accent for the step numbers, labels, active states and the primary button (WhatsApp).
   - Large car photography and video, strong horizontals, hairline rules, a numbered step sequence that reads like a route (Europe → Tunisia) without maps or flags as decoration. No cards, shadows, gradients or rounded boxes; no generic "import agency" look, no stock ship or container imagery.
   - Language: follow the business's own posts (usually French first). If the posts mix languages (e.g. French and Arabic, or German for clients in Germany), ask me.
2. **Generate** a single DESKTOP screen with `generate_screen_from_text`. The prompt lists every section with exact copy, prices and image paths:
   - hero: the hero video (Stitch can't render video: use its poster image in Stitch; the real `<video>` goes in in Phase 3), name, one factual line from the bio (e.g. "Voitures d'Europe exportées vers la Tunisie, service clé en main pour les Tunisiens résidant à l'étranger", only as stated), a trust row made only of facts (Google rating if any, number of posts is NOT a fact to show), and two buttons (Comment ça marche · WhatsApp)
   - the service, step by step: one numbered step per stated service (e.g. 01 Achat de votre voiture · 02 Dossier d'exportation · 03 Carte grise et assurance · 04 Livraison), each with the business's own short wording and nothing added
   - for whom: the audience as the bio states it (e.g. Tunisiens résidant à l'étranger), one short paragraph, no promises
   - "Votre demande": a request form with no backend that builds a pre-filled WhatsApp message: desired make/model, year range, fuel, gearbox, budget (free text, the client's own currency), the client's country of residence, delivery city in Tunisia, name. Nothing is stored or sent anywhere except by the client opening WhatsApp
   - réalisations: the delivered cars as a large-photo gallery, each with make + model + year and the stated place/date only, no price unless posted
   - en vidéo: the chosen clips as a row of portrait (9:16) or landscape tiles with their poster, a play icon, and a caption made only of stated facts (e.g. "Livraison d'une Golf 8 à Sousse", if the caption says so), each linking to its original post
   - véhicules proposés (only if the business posts cars for sale): one row per car with cover photo, make + model + version, the stated spec line, the price in its published currency or "Prix sur demande", and "Détails" + "WhatsApp" buttons
   - car detail: a panel/modal per car with the photo carousel (and the car's video, if it has one), the full stated spec sheet as a two-column table, the post date, and WhatsApp/Call buttons
   - testimonials (by source: Google, Facebook, or the business's own posts), and an FAQ written only from stated facts
   - contact: WhatsApp and phone(s), the profiles, hours only if stated; a map only if a public address is confirmed
   - final CTA (WhatsApp · Call), footer with the social links, the "Mentions légales / Impressum" link, and, if cars for sale are shown, "Véhicules publiés au [date]. Contactez-nous pour la disponibilité."
3. **Timeouts.** The call almost always times out while generation continues. Don't retry. Wait in the background (Bash `sleep` with `run_in_background`, or `Monitor`), then poll `list_screens`.
4. **Review.** Download the HTML and the screenshot (`=w1280`) into `[SLUG]/stitch/`. Slice the PNG into roughly 960px pieces with PIL and read each piece; the browser pane is too narrow for desktop review.
5. **Critique** against this checklist:
   - invented copy (see the banned claims list), invented steps, countries, delays, prices or customs claims
   - a delivered car shown as available, or a sold or stale car shown as for sale
   - a location, map or address that isn't confirmed; another business's data
   - hero fits one viewport, with the buttons above the fold
   - the step sequence reads clearly in order and uses the business's own words
   - generic grids, import-agency clichés (ships, containers, globes, flags), stock-looking images or empty gaps
   - readable number plates, unconsented faces (in photos and in video posters)
   - a form that looks like it submits to a server
   - weak contrast
6. **Refine.** Send one `edit_screens` pass per round of fixes and review it again. Save screen and design-system IDs to memory.

## Phase 3: Final static HTML → `[SLUG]/stitch/desktop-final.html`

1. **Build script.** Write `[SLUG]/_scratch/build_final.py`. It turns the latest Stitch export into the final file, so changes stay repeatable:
   - text fixes, asserting that banned phrases are gone
   - every image pointing at the local downloaded (plate-blurred) files, with `width`/`height` set
   - the hero poster and the video tiles replaced by real `<video>` elements pointing at the local optimised clips
   - data-driven steps, delivered cars and cars for sale, from the brief
2. **Request form.** Labelled fields, native validation for the required ones (make/model or "open to suggestions", country of residence, name). "Envoyer sur WhatsApp" opens `https://wa.me/[WHATSAPP]?text=…` with every filled field on its own line, in the site's language, e.g. "Bonjour [NAME], je souhaite importer une voiture en Tunisie. Modèle : … / Année : … / Carburant : … / Budget : … / Je réside en : … / Livraison à : … / Nom : …". Empty fields are left out of the message. No `fetch`, no storage, no analytics on the form.
3. **Cars.**
   - Réalisations: a gallery of the delivered cars; a click opens the car panel (read-only: no availability wording, no price unless posted).
   - Véhicules proposés (if any): filter chips only for values that exist, sort (newest post, price, year, mileage; "Prix sur demande" last), a result counter, and per row a "Détails" button and a WhatsApp button pre-filled with "Bonjour, je suis intéressé(e) par la [make model year] ([price]) publiée le [date]. Est-elle toujours disponible ?"
   - Car panel: keyboard-accessible dialog (focus trap, Esc closes, focus returns), photo carousel with arrows, swipe and a counter, the spec table, and WhatsApp/Call buttons. Each car has a URL hash (`#car-<id>`) so a link opens its panel.
4. **Videos.**
   - Hero: `<video autoplay muted loop playsinline preload="metadata" poster="…">` behind the text, with a visible pause button (WCAG 2.2.2). With `prefers-reduced-motion: reduce`, don't autoplay: show the poster and a play button.
   - "En vidéo" tiles: `preload="none"` with the poster; a click plays the clip inline (muted, with native controls) or opens it in a dialog with the same focus rules as the car panel. Only one clip plays at a time, and a clip pauses when it scrolls out of view (IntersectionObserver).
   - Every clip has a text caption or `aria-label` from stated facts, and a link to its original post.
   - No video autoplays except the hero loop, and the hero loop never loads a file over about 3 MB.
5. **Mobile pass (< lg):**
   - the hero video (or photo) full-bleed behind the text, `min-h-[100svh]`
   - a ☰ drawer with the links and the WhatsApp number
   - the steps stacked as a vertical numbered line
   - the video tiles as a horizontally scrollable row of portrait clips
   - the form in one column with large touch targets
   - filter chips (if any) `sticky top-0` and horizontally scrollable, not centred while they overflow
   - car rows stacked (photo on top); the car panel full-screen
   - a fixed bottom WhatsApp · Call bar that appears after the hero
   - a stacked footer
   - no horizontal overflow at 375px
6. **Verify:**
   - Desktop: headless Edge (`msedge --headless=new --screenshot --window-size=1440,H`) on a render copy with the hero height pinned.
   - Mobile: a 375px iframe wrapper (headless Edge can't go below about 500px wide), with `100svh`/`h-screen` pinned to 812px in the render copy. Screenshots show the posters; that's expected.
   - Interaction: in the browser pane, fill the request form and check the generated `wa.me` link text (don't open WhatsApp), try it with empty required fields, click every filter and sort option, open every car panel and step through its photos, open a `#car-<id>` link directly, play and pause every clip (check only one plays at a time, and the hero pause button works). Check no console errors, probe that every image and video loads (`readyState` ≥ 2 after play), and check `scrollWidth == 375` in mobile emulation.
7. **⏸ CHECKPOINT:** send me the full-page desktop preview, the mobile preview, the filled request form with its WhatsApp text, one open car panel, and the optimised clips themselves (SendUserFile), with the list of owner-to-confirm items.

## Phase 4: Vite + React site → `[SLUG]/site/`

1. **Architecture.** Mirror `ahmed-auto/site/`: Vite + React 19 + Tailwind 4 + TypeScript.
   - `src/data/business.ts` is the single source of truth: photos (with sizes and alt text, via `photos.json`), videos (file, poster, width × height, duration, caption, post URL, upload date, car id, via `videos.json`), facts, the bio, the service steps (with their source), the request-form fields and the WhatsApp message template, delivered cars, cars for sale with their publication date (id, make, model, version, year, mileage, fuel, gearbox, engine, power, colour, options, price, currency, price type, post date, post URL, photos), testimonials, an FAQ written only from facts, and the legal-page placeholders.
   - Photos live in `public/photos/` as optimised, plate-blurred WebP with `srcset` sizes (see "Photos: high quality only"). The hero is preloaded; everything else is `loading="lazy"`.
   - Videos live in `public/videos/` as the optimised, muted, plate-blurred MP4s with their WebP posters (see "Videos"). Only the hero poster is preloaded, never a video file.
   - Components: Hero (with Header, drawer, the video loop and its pause button), Steps, Audience, RequestForm, Deliveries, Videos (tiles + player, one plays at a time), ForSale (only rendered when there are cars for sale; all cars rendered, filtered ones `hidden`, so the prerendered HTML contains them all), CarDialog (carousel + spec table, hash routing), Testimonials, Faq, Contact (map only with a confirmed address), Legal (Impressum and privacy placeholders), Footer, ActionBar.
   - `src/seo/seo.ts` plus the Vite plugin produce: head tags, OG `website`, JSON-LD `@graph` (WebSite; `Organization` with name, logo, `contactPoint` (WhatsApp/phone), `areaServed` only as stated, `sameAs` Facebook/Instagram/TikTok; use `AutoDealer`/`LocalBusiness` with `address` and `geo` only if a public address is confirmed; one `Service` per stated step; one `Car` per car for sale with an `Offer` in its published currency only when a price is published; one `VideoObject` per clip (name and description from stated facts, `thumbnailUrl`, `contentUrl`, `uploadDate` = post date, `duration`); FAQPage; no self-serving review markup), `robots.txt` allowing AI crawlers, `sitemap.xml` with images and videos (`video:video` entries), and `llms.txt` describing the service steps and, if any, the cars for sale with their date.
   - `scripts/prerender.mjs` prerenders the page to static HTML. The `README.md` follows the same layout and explains how to add a delivered car, a car for sale or a video (edit `business.ts`, add photos or run the video script, bump the date, rebuild, redeploy).
2. **Build.** Put `SITE_URL=https://[SLUG].vercel.app` in `.env` (gitignored), then run `npm install` and `npm run build`. The type check, SSR build and prerender must all pass.
3. **Preview.** Add a `[SLUG]-preview` entry to `.claude/launch.json` and run it. Verify:
   - no console or hydration errors
   - the prerendered HTML contains every step, every delivered car and every on-site car for sale, and no sold car
   - the request form builds the right `wa.me` text; filters, sort, the car panel, the carousel and hash links work
   - all images load, and the served files are the optimised ones (check sizes in the network panel; the hero under about 400 KB)
   - every clip plays, is served as `video/mp4` and answers range requests (206), has no audio track, and stays within its size budget
   - no readable plate and no unconsented face in any served photo, poster or clip
   - desktop at 1440 and 375px mobile screenshots (same techniques as Phase 3)
4. **⏸ CHECKPOINT:** show the desktop and mobile screenshots and wait for approval.

## Phase 5: Commit, push, deploy

1. **Commit.** Stage only `[SLUG]/` and `.claude/launch.json`. Ignore `_scratch/*` except the build scripts; never commit `_scratch/photos-raw/` or `_scratch/videos-raw/`. The optimised clips in `site/public/videos/` are committed; check the total stays under about 40 MB. No `.env`, `node_modules` or `dist`. Commit on `main`, then `git push origin main`.
2. **Vercel.** The site always lives on the business-name subdomain `https://[SLUG].vercel.app` (e.g. Chaari Auto → `https://chaari-auto.vercel.app`). Never add a city, country or any other suffix to the project name. In `[SLUG]/site`:
   - `npx vercel link --yes --project [SLUG]`
   - `printf 'https://[SLUG].vercel.app' | npx vercel env add SITE_URL production`
   - `npx vercel deploy --prod --yes`
   - `npx vercel inspect <url>` to confirm "Ready" and that the alias is exactly `[SLUG].vercel.app`.
   - If `[SLUG].vercel.app` is already taken by another account, stop and ask me which name to use. Don't pick one yourself. Then update `SITE_URL` in `.env` and on Vercel, and rebuild so the canonical URL, sitemap and `llms.txt` match.
3. **Live checks:**
   - `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/favicon.svg` all return 200
   - the canonical URL is the live URL
   - the steps and the cars are in the HTML, and a `#car-<id>` link opens its panel
   - in the browser, all images load, every clip plays (and the hero loop autoplays muted), and the console is clean
4. **Record.** Save the deployment details (project, URL, IDs) to memory and the README.

## Final report (short)

The live URL; what was built; what was verified, and how; and a list of the items the owner needs to confirm: where the business is based and its legal details (Impressum, privacy notice), the WhatsApp number and other phones, the wording of each service step, what the service includes and doesn't (customs, transport, delays), prices and their currency and dates, which cars are still for sale, clients' consent for photos and clips with faces, permission to reuse their videos (music removed), photo matches, and so on.
