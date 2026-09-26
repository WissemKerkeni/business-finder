# Restaurant website pipeline: research → Stitch → static HTML → Vite + React → deploy

Fill in the placeholders, then paste everything below the line into a new session.
Worked examples in this repo: `di-piu/` (latest, use it as the reference) and `la-cucina/`.

- `[NAME]`: restaurant name, e.g. Di Più
- `[MAPS_URL]`: Google Maps link, e.g. https://www.google.com/maps?cid=…
- `[CITY]`: e.g. Monastir
- `[SLUG]`: folder / Vercel project name, e.g. `di-piu` → Vercel `di-piu-monastir`

---

Build a website proposal for **[NAME]** ([CITY]) from its Google Maps profile [MAPS_URL]: research, then design in Stitch, then approve a static HTML version, then build a Vite + React site, then deploy it. It is an informational site for showing the owner, not an ordering system.

## Ground rules (apply to every phase)

- **Git:** work on `main` in `D:\workspace\business-finder`. No worktrees, no feature branches. All files go under `[SLUG]/`. Don't touch other restaurants' folders, and don't touch my own uncommitted files.
- **Facts only.** Every name, price, hour, service, review and photo label must come from the Google profile or the restaurant's own printed menu.
  - Never invent history, awards, chef names, "wood-fired", "homemade/maison", "fresh daily" or similar copy. Stitch adds this kind of copy on its own, so audit every generated screen for it.
  - If something is missing, design around the gap.
  - If two sources disagree (e.g. a Google price vs. the printed-menu price), use the printed menu and list the conflict for the owner.
- **Don't mix restaurants.** After every phase, grep `[SLUG]/` for other restaurants' names, addresses, phones and handles (e.g. "La Cucina", "Place 3 Août", "96 455 150"). Italian words that match another client's name must not be used as section titles either.
- **Photos:** only real Google Maps photos, hot-linked from `lh3.googleusercontent.com` with `referrerpolicy="no-referrer"`.
  - Label a photo as a dish only if Google tags it that way or it clearly shows that dish.
  - Check the label against the image: a "dorade" photo whose focus is a beetroot penne does not get the dorade label.
- **Checkpoints:** stop at each **⏸ CHECKPOINT**, show previews, and wait for my approval.
- **Progress updates:** give a short status line during long waits (Stitch generations take about 8–12 minutes).

## Phase 1: Research → `[SLUG]/brief.md` + `[SLUG]/photo-urls.txt`

1. **Maps profile.** In the built-in browser, open [MAPS_URL] with `&hl=en`. Record:
   - name, category, rating and review count, star distribution
   - price per person, phone, address or plus code, coordinates
   - hours (expand the weekly table)
   - the About tab: services, highlights, atmosphere, reservations, payments, parking
   - the Menu tab, including every sub-tab with its prices
2. **Photos.** Open "See photos" and walk every category tab (All, Food & drink, Vibe, By owner, Menu, dish tabs). Collect URLs from the tiles' `background-image`. Keep the list in one script, because reloading the page loses in-page variables.
3. **Printed menu.** Show each menu-page photo full-screen (`object-fit: contain`) and read every category and price. This is usually far more complete than Google's structured menu.
4. **Reviews.** Take 8–10 verbatim reviews with author, stars and Local Guide badge. Mark truncation with "…".
5. **Contact sheet.** Build one of the candidate photos (serve it from `[SLUG]/_scratch/` over the `[SLUG]-static` http-server entry in `.claude/launch.json`). Verify that each labelled URL shows what its label says. Choose:
   - the hero (the strongest recognisable exterior or sign)
   - interiors, dishes and gallery shots
6. **Brief.** Write `brief.md` with these sections: facts, visual identity (colours and materials seen in the photos, signage, the printed menu's style), full menu, reviews, photo labels, and conflicts for the owner.

## Phase 2: Stitch design (desktop)

1. **Design system.** `create_project`, then a design system (`create_design_system` + `update_design_system`) derived from the restaurant's real identity: palette taken from the façade, logo, walls and menu, plus fonts and designMd rules.
   - Default direction: high contrast. Near-black background, white serif headlines, ONE vivid brand accent for prices, labels, active states and the primary button.
   - Editorial layout, large photography, hairline rules. No cards, shadows, gradients or rounded boxes.
2. **Generate** a single DESKTOP screen with `generate_screen_from_text`. The prompt lists every section with exact copy, prices and image URLs:
   - hero, about, signature dishes, menu, gallery
   - Google reviews (rating, distribution, quotes)
   - location with a real `maps.google.com/maps?q=LAT,LNG&z=17&output=embed` iframe
   - final CTA (Call · WhatsApp · Directions · Reserve), footer
3. **Timeouts.** The call almost always times out while generation continues. Don't retry. Wait in the background (Bash `sleep` with `run_in_background`, or `Monitor`), then poll `list_screens`.
4. **Review.** Download the HTML and the screenshot (`=w1280`) into `[SLUG]/stitch/`. Slice the PNG into roughly 960px pieces with PIL and read each piece; the browser pane is too narrow for desktop review.
5. **Critique** against this checklist:
   - invented copy
   - wrong address or another restaurant's data
   - hero fits one viewport, with the rating/hours row above the fold
   - generic grids or empty gaps
   - menu tabs that don't work
   - fake map
   - weak contrast
6. **Refine.** Send one `edit_screens` pass per round of fixes and review it again. Save screen and design-system IDs to memory.

## Phase 3: Final static HTML → `[SLUG]/stitch/desktop-final.html`

1. **Build script.** Write `[SLUG]/_scratch/build_final.py`. It turns the latest Stitch export into the final file, so changes stay repeatable:
   - text fixes, asserting that banned phrases are gone
   - `referrerpolicy` on every image
   - a data-driven menu: all categories and items from the printed menu
2. **Menu.**
   - Tabs, where the active tab has an accent fill.
   - Each category shows a large real photo on the left and the list on the right, with dotted leaders and prices in the accent colour.
   - Dishes that have a verified photo get a small camera icon. Tapping one swaps the large photo and caption to that dish; tapping again goes back to the category photo.
   - No thumbnails in the list. A "Seen on the table" strip of 4 verified dish photos sits under the menu.
3. **Mobile pass (< lg):**
   - the hero photo full-bleed behind the text, `min-h-[100svh]`
   - hero buttons on one line
   - a ☰ drawer with the links, hours and phone
   - menu tabs `sticky top-0` and horizontally scrollable, not centred while they overflow
   - a fixed bottom Call · Directions · Reserve bar that appears after the hero
   - a stacked footer
   - no horizontal overflow at 375px
4. **Verify:**
   - Desktop: headless Edge (`msedge --headless=new --screenshot --window-size=1440,H`) on a render copy with the hero height pinned.
   - Mobile: a 375px iframe wrapper (headless Edge can't go below about 500px wide), with `100svh`/`h-screen` pinned to 812px in the render copy.
   - Interaction: in the browser pane, click every tab and dish, check no console errors, probe that every image loads, and check `scrollWidth == 375` in mobile emulation.
5. **⏸ CHECKPOINT:** send me the full-page desktop preview, the mobile preview and the menu-click preview (SendUserFile), with the list of owner-to-confirm items.

## Phase 4: Vite + React site → `[SLUG]/site/`

1. **Architecture.** Mirror `di-piu/site/` exactly: Vite + React 19 + Tailwind 4 + TypeScript.
   - `src/data/restaurant.ts` is the single source of truth: photos, facts, menu with an optional `photo`/`tag` per item, signatures, gallery with accurate alt text, reviews, and an FAQ written only from facts.
   - Components: Hero (with Header and drawer), About, Signatures, Menu (ARIA tabs with arrow keys; all panels rendered, inactive ones `hidden`, so the prerendered HTML contains the full menu), Gallery, Reviews, Faq, Location (lazy map iframe), Visit, Footer, ActionBar.
   - `src/seo/seo.ts` plus the Vite plugin produce: head tags, OG `restaurant.restaurant`, geo meta, JSON-LD `@graph` (WebSite, Restaurant with `hasMenu` in TND, FAQPage; no self-serving review markup), `robots.txt` allowing AI crawlers, `sitemap.xml` with images, and `llms.txt`.
   - `scripts/prerender.mjs` prerenders the page to static HTML. The `README.md` follows the same layout.
2. **Build.** Put `SITE_URL=https://[SLUG]-[city].vercel.app` in `.env` (gitignored), then run `npm install` and `npm run build`. The type check, SSR build and prerender must all pass.
3. **Preview.** Add a `[SLUG]-preview` entry to `.claude/launch.json` and run it. Verify:
   - no console or hydration errors
   - the prerendered HTML contains every panel and item
   - tabs and dish clicks work
   - all images load
   - desktop at 1440 and 375px mobile screenshots (same techniques as Phase 3)
4. **⏸ CHECKPOINT:** show the desktop and mobile screenshots and wait for approval.

## Phase 5: Commit, push, deploy

1. **Commit.** Stage only `[SLUG]/` and `.claude/launch.json`. Ignore `_scratch/*` except the build scripts. No `.env`, `node_modules` or `dist`. Commit on `main`, then `git push origin main`.
2. **Vercel.** In `[SLUG]/site`:
   - `npx vercel link --yes --project [SLUG]-[city]`
   - `printf 'https://…' | npx vercel env add SITE_URL production`
   - `npx vercel deploy --prod --yes`
   - `npx vercel inspect <url>` to confirm "Ready" and the alias. If the name is taken by another account, choose another name and tell me.
3. **Live checks:**
   - `/`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/favicon.svg` all return 200
   - the canonical URL is the live URL
   - the menu is in the HTML
   - in the browser, all images load and the console is clean
4. **Record.** Save the deployment details (project, URL, IDs) to memory and the README.

## Final report (short)

The live URL; what was built; what was verified, and how; and a list of the items the owner needs to confirm: conflicting prices, WhatsApp, photo matches, missing hours, and so on.
