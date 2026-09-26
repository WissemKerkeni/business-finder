# La Cucina — Stitch plan (ready to run)

## Concept: "Pasta e Amore, after dark"
The site is built around the restaurant's real night-time identity: a small pine-green wooden house on Place 3 Août lit by a warm-white neon CUCINA sign, with white-brick walls, sage panels, red gingham tables and neon lines reading "Pasta e Amore" and "La Dolce Vita". The page opens at night (dark pine) and moves into daylight (brick-white) for the menu, as a visit would.

## Design system (create_design_system)
- displayName: La Cucina — Pine & Neon
- colorMode: LIGHT · roundness: ROUND_FOUR · colorVariant: FIDELITY
- customColor / overridePrimaryColor: #1F4A43 (façade pine)
- overrideSecondaryColor: #8FB0A6 (interior sage)
- overrideTertiaryColor: #B8322A (gingham tomato — used sparingly for prices and small marks)
- overrideNeutralColor: #F2F1EC (white brick)
- headlineFont: BODONI_MODA · bodyFont: HANKEN_GROTESK · labelFont: MONTSERRAT
- designMd:
  - Dark sections: #10231F background, #F6ECD2 neon-warm text.
  - Labels: Montserrat, uppercase, 0.28em tracking, 11–12px (echoes the thin, wide CUCINA logotype).
  - Headlines: Bodoni Moda, large (72–120px hero), tight leading, italic for Italian words.
  - Few cards, no gradients except a photo-darkening scrim, hairline 1px rules in sage, 4px radius max.
  - Photography edge to edge; real Google Maps photos only.

## Screen 1 prompt (DESKTOP)
Premium one-page website for **La Cucina**, an Italian restaurant (pizza & pasta) at Place 3 Août, Monastir, Tunisia. Informational only; no ordering. Use ONLY the facts, text and image URLs below; do not invent dishes, prices, awards, history or reviews.

Sections, in order:
1. **Hero (dark, full-bleed)**: image p01 (night storefront, neon CUCINA sign) with a subtle dark scrim. Thin top nav: CUCINA wordmark (wide-tracked light caps) · Menu · Gallery · Reviews · Visit. Eyebrow "RISTORANTE · MONASTIR". Headline in Bodoni: "Pasta e Amore." Subline: "Italian pizza, fresh pasta and paella on Place 3 Août, Monastir." Meta row: "★ 4.4 · 799 Google reviews · Dine-in · Takeaway · Delivery". Buttons: "View Menu" (solid neon-warm on pine) and "Get Directions" (outline).
2. **About (split)**: left, the daytime façade p07; right, short copy: "A small green house on Place 3 Août with a big Italian kitchen. Pizza, pasta made the way Italians make it, house-made ravioli, paella and lasagne, served in a room of white brick, sage panels and red gingham, under the neon that says La Dolce Vita." Small facts list: "Price · TND 20–30 per person", "Service · Dine-in, takeaway, delivery", "Find us · Place 3 Août, Monastir 5000".
3. **Signature dishes (editorial, asymmetric)**: 4 large photos with name + menu description + price:
   - Spaghetti au Poulpe — Sauce tomate, poulpe — 34 DT (p13)
   - Pizza Fruits de Mer — Sauce tomate, mozzarella, fruits de mer — 28 DT (p23)
   - Paella — Sauce tomate, huile d'olive, oignon, poivron, persil, petits pois, fruits de mer — 35 DT (p10)
   - Lasagne Bolognaise — 20 DT (p14)
4. **Menu (light, two columns, printed-menu feel with dotted leaders)**: tabs Pizza / Pasta / Paella & Risotto / Salades / Dolce & Boissons. Show the full Pizza list and Pasta list (items and prices from brief.md), prices in DT.
5. **Gallery (immersive masonry, dark)**: p15, p24, p04, p06, p11, p18, p25, p16, p05, p28, p26, p09.
6. **Google Reviews**: big "4.4" with stars, "799 reviews on Google", and 5 verbatim quotes with names (Margo Kargo, ramzi hamdi, Ismail Nouira, Farabi, Firas Atigui) plus "Read all reviews on Google" link.
7. **Location**: map-style panel linking to Google Maps; Address "Place 3 Août, Monastir 5000"; Phone "+216 96 455 150"; Hours "Mon–Thu 11:00–00:00 · Sat–Sun 11:00–00:30 · Friday: please call".
8. **Final CTA (dark, neon)**: "Visit Us" with buttons Call · WhatsApp · Get Directions · Reserve a Table (reserve = call). Footer: Instagram @lacucinaa23, Facebook.

Image URLs: see photo-urls.txt (line N = pN), append "=w1600".

## Review → refine checklist
- Hero text legible over neon photo; logo not duplicated awkwardly with the sign in the photo.
- No invented copy (check every price against brief.md).
- Menu readable at mobile width; tabs work as a horizontal scroll.
- Reduce any cards, shadows and rounded boxes Stitch adds; keep hairline rules.
- Generate MOBILE screen after desktop is approved.

## Run log (2026-09-26)
- Stitch project: `projects/2212525032641683303` ("La Cucina — Monastir"); design system `assets/13987101429141300396` (La Cucina — Pine & Neon).
- Desktop screen `2efa8f2442bd40c293a147e83a5a06a6` → `stitch/desktop-v1.html` (raw) → refined → `stitch/desktop-v2.html` (current).
  Refine: lighter directional hero scrim (neon visible); removed invented copy (dish blurb, lasagne description, "freshly prepared", "Napolitan style", "Fatta in casa", gallery blurb, Local Guide/Google Review tags, map coords/chip, "Walk-ins welcome"); unboxed menu and reviews; masonry gallery with accurate alt text; real Facebook link; no box-shadows.
- Mobile screen `f1046b60e206466d8fbb52da3209884e` → `stitch/mobile-v1.html` (clean on first pass; palette approved by user).
- Open: Friday hours still "please call" (confirm with owner); Gorgonzola pasta left off the menu (no price captured).
