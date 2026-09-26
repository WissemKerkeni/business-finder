// Single source of truth for every fact on the site, the JSON-LD, llms.txt and the sitemap.
// Source: Google Maps business profile (read 2026-09-26). See ../../brief.md. Do not add unverified claims.

const PHOTO_BASE = 'https://lh3.googleusercontent.com/gps-cs-s/'

/** Google-hosted photo; `=wN` asks the CDN for an N-pixel-wide rendition. */
export const photo = (id: string, width = 1600) => `${PHOTO_BASE}${id}=w${width}`

/** srcset shared by <img> and the hero <link rel="preload"> so the browser reuses the preloaded file. */
export const photoSrcSet = (id: string) => [480, 800, 1200, 1600, 2400].map((w) => `${photo(id, w)} ${w}w`).join(', ')

export const photos = {
  storefrontNight: 'ANWiy9TV6VXWZv7UMh7Y6Nqor6Nt98w5yNjbM4Ntan-vvS4x18-AA0D2rgRX3VGSH1FN2jDb50QKB8YOovOhV47sV0MjAxdsjc5GnV2KaFAy19GrZYhuw7Qstj8J0yuRJykuB7un068900sc1Rxh',
  facadeDay: 'ANWiy9R4biBd0BFCsAPyuzpshSdWF_KcNBoqZTnHDmm1CEoy977AWZYBvXezPrAwM3udSlx-u840wEvCXNxbsoGntMvrysMJNYu3T7-xs-yLiukylsCT_wDN0PMdqHR2YqNCSIz62uWkWml4-YXO',
  facadeDay2: 'ANWiy9Ty3vNqnaqOWdovXyH8KrVpW8BdDkbxLRY2LpmxvldDNzsUv1ZepUN1mxqlN704wTf81Nqq1B8e7NkSZATzNfwve9NtHGzl54Ravl8QH4Lohl6eh_SmJqjxaQhPGgmti3AQvPOBPw',
  spaghettiPoulpe: 'ANWiy9RDksB2S95u7s7rvgxwCKD4KiUto3trmPsL_M1IDTvCiJIZJfOZDAHtW51zCf-qVaHQh4X3dvTwkVg8osGSdcWAgfSRwS9QOkIKyHqOduNUcbYjgzdr9IPDTwjSkqQwrJcL-7hFng',
  pizzaFruitsDeMer: 'AHRPTWnpk44pfasWrwzIxRGMFFCdBp3eE3ilEOaq7tdeTst1nA8Z7mgUS8ue9oljC8WT-54AWYJaIB6MIAFBzqsdtXHEENXqdUpvQjxuH6pSKB8cuHpsloi_7AznvO77aJrLCKtgEjCZ8fAyszsw',
  paella: 'ANWiy9SytTM6qjajU14V_Av6YgHgrxht-qTPfIOBfeaPCCprZvRPWDy2qHofboij1sbM6PzdD1yS6CW8o54zoiZMqR7K7d2NpRhhKm0_B_rbD6rCzXcLDv-bI_z4u4LsO-2ZQSF2rJ0',
  lasagne: 'ANWiy9RrQRvL1WYKi1Yp5JwVYoe3hVMKK635lx5XnfMz2fZmEBFwV9o4cqYSJHaJ3C9fSuAcxfcdZzxVW7I2A2Gbnq5RH2Ig06m2IXsBmn0Z-SXLiTRq2p9etTVNWGnIDgyROtg6GQTEZbucOZi6',
  interiorDolceVita: 'ANWiy9RGkEGx0wfMzTj094-TcGuVSGGB9kHOdY3tkN_jCBXgC9p9M7fXambyoNFpDxJIL7bzhk3jdSAJ56GlOlLcSDQ3vlSbbnHZjJra83dCeYJsRuY1E0F4xvIc8nPhY-_AW_jbwqsf',
  interiorGingham: 'AHRPTWkzKDQs91Hb4IFFD4b6Qs910bOE0k-iLhKUzul6B57_xBx0NDJsaYFx-1CXB-_VgkOhbdqmyaCbdE2FxEqClm49mgD8jlC83gxwwnQW3IeUEnsTk2mDTV_QjCfICpXE05-xMFwFXn564dQ',
  openKitchen: 'ANWiy9TqfafQQA6U3teskhphTYRGYf4x4-E1BvF6hkPFGodBQTN4-rGgozDLzvOlwIxeQfnaB_Yb60HeqMYX00-bwiqsxYZvLPkbTRsQkx4dKJ4cfZFrLgv5LPcg_tj3qkuuNWp6nBboxAalSHol',
  chefPaella: 'ANWiy9RFeST2pw-qLsutGe4S27-rearoUIaCdQ3wNyZBX2-mvkgXKOy-abdZC8xlMs6DRdMWgfqPC0xusrNkvpDKMu21zz4z2rRQViNbicT4WX4TDa1LQIqbJPT4Cd-bIbunGgR0Cn9gbMYxp7Jk',
  interiorEntrance: 'ANWiy9TNer2qSx74Mpvq6X6zUfcLjNQ8Mb-fIwCIuVW5KhbyqRUaOrT9Uqj8wCWKhFITsnkQh-t_yffJfHRwAzkrohlT5WUIcLxTHbov4sMdfyegz54XF-P82LbaJUh3pPlPrxuzg4gW9w',
  interiorWindow: 'AHRPTWlyGBivJI55qG5vs1uQxbsvMTWaziuLmHUe1xzUySn11wFe2DinfRLijKX_6srEdYAB_coFRl_fmJj2kUH3G0fprUTKcm4SFrKxe0JG1Ho7f3tcyF0NwdJ3D1YoexeTYPRz025_f3qrG4Za',
  whitePizza: 'AHRPTWkosC7wrCqp0-ko9pfld2w-X7WBG2sxc2k1Rpx9HZ-CTjyScpyTkTn1k4JDXmjF4VbTuK2UvXTZqwNep3DBFoJmWoRDamGM3B30KdGb79r-qiUvhjFpX5179dewZ4gPu9Rih_ijwg',
  spaghettiBolognaise: 'ANWiy9RI5AfaU22Bv9qazrhIb7qwiEx0IbHCUHB1Vq5YkKkbJjFO0nCYIARmE4E7PXHBzqT7CjRKR-ZE90iuEzuRE6lywop5cTpniMte3PF1RMeV0JS4HUY54v7cUg2dWkaZM4uYvBI',
  seafoodPasta: 'ANWiy9Qz4P0-zaUEkVfOqAPn4BPtvEOuGDAC7jHmJE7mjXbLgmkqRkieYCO3JRDBZOB0wZQwHoEeWB8GmUUOcss3_RPDKUoKEi3b6vOz2Hn-nyXNhjIKgWLmaYlC2cCPsLhQIWo2fqF2BjKuQ6Yt',
  penne: 'AHRPTWma6qcLoUZlLF16Q1ng_moswzUPYqVn1h2156G-sLR71g5BdXrZfYQDrbP_07IGQ0y015BYchmfY5DZak9V7q7sVevCZs4tM1tOyfYoAt5ij690CTsj81VyzL28lzMerL_WgoY',
  tagliatelle: 'AHRPTWn-TsDGP7ABSC4rUovg9SHorrrbeLPwgQr8nREqeQy3dzXlxrHooV7hNJBg5jWHCrUYodhOAXZHwnVFY_l5ssb5nUWAi0sjtqRBrjoNuV7Kbc6Iv6svnClMXza3aFjjQIQbB_SwRB6-ACo',
} as const

export const restaurant = {
  name: 'La Cucina',
  alternateName: 'La Cucina Ristorante Monastir',
  tagline: 'Pasta e Amore.',
  summary:
    'Italian restaurant on Place 3 Août in Monastir, Tunisia, serving pizza, pasta, house-made ravioli, paella, risotto and lasagne. Dine-in, takeaway and delivery.',
  cuisine: ['Italian', 'Pizza', 'Pasta', 'Seafood'],
  priceRange: 'TND 20–30',
  pricePerPerson: 'TND 20–30 per person',
  services: ['Dine-in', 'Takeaway', 'Delivery'],
  phone: '+216 96 455 150',
  phoneE164: '+21696455150',
  whatsapp: 'https://wa.me/21696455150',
  address: {
    street: 'Place 3 Août',
    locality: 'Monastir',
    postalCode: '5000',
    region: 'Monastir Governorate',
    regionCode: 'TN-52',
    country: 'TN',
    countryName: 'Tunisia',
  },
  // Decoded from Google plus code 8F7GQRCQ+5Q ("QRCQ+5Q Monastir").
  geo: { lat: 35.7704375, lng: 10.8394375 },
  plusCode: 'QRCQ+5Q Monastir',
  mapsUrl: 'https://www.google.com/maps?cid=10450448928807487105',
  mapsEmbedUrl: 'https://www.google.com/maps?q=35.7704375,10.8394375&z=17&output=embed',
  instagram: 'https://www.instagram.com/lacucinaa23',
  instagramHandle: '@lacucinaa23',
  facebook: 'https://www.facebook.com/61551104882964/',
  rating: { value: 4.4, count: 799 },
  // Friday is listed as "Open 24 hours" on Google, which is likely a data error, so it is left out until the owner confirms.
  hours: [
    { label: 'Monday – Thursday', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '11:00', closes: '00:00' },
    { label: 'Saturday – Sunday', days: ['Saturday', 'Sunday'], opens: '11:00', closes: '00:30' },
  ],
  fridayNote: 'Please call ahead',
} as const

export type MenuItem = { name: string; price: number; description?: string; note?: string; signature?: boolean }
export type MenuSection = { id: string; title: string; items: MenuItem[] }

// Prices in TND. "Gorgonzola" pasta is on the menu but its price was not captured, so it is omitted.
export const menu: MenuSection[] = [
  {
    id: 'pizza',
    title: 'Pizza',
    items: [
      { name: 'Margherita', price: 15 },
      { name: 'Végétarienne', price: 18 },
      { name: 'Sicilienne', price: 18 },
      { name: 'Thon', price: 19 },
      { name: 'Pepperoni', price: 19 },
      { name: 'Regina', price: 19 },
      { name: '4 Saisons', price: 20 },
      { name: 'Diavola', price: 21 },
      { name: 'Campione', price: 23 },
      { name: 'Al Pollo', price: 23 },
      { name: 'Saumon', price: 28 },
      { name: 'Fruits de Mer', price: 28, description: 'Sauce tomate, mozzarella, fruits de mer' },
      { name: '5 Fromages', price: 30 },
      { name: 'CUCINA', price: 32, description: 'Pesto, mozzarella, ricotta, crevettes, pistache, parmesan', signature: true },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta',
    items: [
      { name: "Penne all'Arrabbiata", price: 22 },
      { name: 'Pesto Rossa', price: 24 },
      { name: 'Pesto', price: 24 },
      { name: 'Ravioli Poulet', price: 28, note: 'maison' },
      { name: 'Alfredo', price: 27 },
      { name: 'Spaghetti alla Carbonara', price: 27 },
      { name: 'Alfredo Rossa', price: 28 },
      { name: 'Bolognaise', price: 25 },
      { name: 'Ravioli Pesta', price: 28 },
      { name: 'Ravioli Fruits de Mer', price: 30 },
      { name: 'Bresaola', price: 28 },
      { name: '5 Fromages', price: 28 },
      { name: 'Tagliatelle au Saumon', price: 32 },
      { name: 'Spaghetti au Poulpe', price: 34, description: 'Sauce tomate, poulpe' },
      { name: 'Tunisienne', price: 25, description: 'Poisson du jour, piment' },
      { name: 'Spaghetti Fruits de Mer', price: 36 },
      { name: 'Spaghetti Frutti di Mare', price: 37 },
      { name: 'CUCINA', price: 40, description: 'Sauce du chef, parmesan, aneth, crevettes, basilic', signature: true },
    ],
  },
  {
    id: 'al-forno',
    title: 'Al Forno',
    items: [
      { name: 'Lasagne Bolognaise', price: 20 },
      { name: 'Cannelloni Ricotta-Épinards', price: 22 },
      { name: 'Cannelloni Viande Hachée', price: 25 },
      { name: 'Gratin Poulet Champignon', price: 27 },
      { name: 'Gratin Fruits de Mer', price: 30 },
    ],
  },
  {
    id: 'mare',
    title: 'Paella & Risotto',
    items: [
      { name: 'Paella', price: 35, description: "Sauce tomate, huile d'olive, oignon, poivron, persil, petits pois, fruits de mer" },
      { name: 'Risotto Fruits de Mer', price: 30 },
      { name: 'Saltati Fruits de Mer', price: 40, description: "Sautés à l'ail, huile d'olive" },
    ],
  },
  {
    id: 'salades',
    title: 'Salades',
    items: [
      { name: 'Niçoise', price: 22, description: 'Laitue, oignon, olives, tomate cerise, thon, œuf dur' },
      { name: 'César', price: 24, description: 'Laitue, maïs, croûtons, poulet, tomate cerise' },
      { name: 'Fruits de Mer', price: 30, description: 'Vinaigrette, laitue, oignon, tomate cerise, fruits de mer' },
    ],
  },
  {
    id: 'dolce',
    title: 'Panuozzo & Dolce',
    items: [
      { name: 'Panuozzo CUCINA', price: 17 },
      { name: 'Tiramisu', price: 13 },
    ],
  },
  {
    id: 'boissons',
    title: 'Boissons',
    items: [
      { name: 'Eau 1L', price: 4 },
      { name: 'Soda', price: 3 },
      { name: 'Espresso', price: 3 },
      { name: 'Espresso Longo', price: 3 },
      { name: 'Citronnade', price: 4 },
      { name: "Jus d'orange", price: 5 },
    ],
  },
]

export const signatures = [
  { name: 'Spaghetti au Poulpe', italic: 'Spaghetti', rest: 'au Poulpe', description: 'Sauce tomate, poulpe', price: 34, photo: photos.spaghettiPoulpe },
  { name: 'Pizza Fruits de Mer', italic: 'Pizza', rest: 'Fruits de Mer', description: 'Sauce tomate, mozzarella, fruits de mer', price: 28, photo: photos.pizzaFruitsDeMer },
  { name: 'Paella', italic: 'Paella', rest: '', description: "Sauce tomate, huile d'olive, oignon, poivron, persil, petits pois, fruits de mer", price: 35, photo: photos.paella },
  { name: 'Lasagne Bolognaise', italic: 'Lasagne', rest: 'Bolognaise', description: '', price: 20, photo: photos.lasagne },
] as const

export const gallery = [
  { id: photos.interiorDolceVita, alt: 'Dining room at La Cucina with the "La Dolce Vita" neon sign', aspect: 'aspect-[4/3]' },
  { id: photos.chefPaella, alt: 'Chef at La Cucina serving a seafood paella', aspect: 'aspect-[3/4]' },
  { id: photos.whitePizza, alt: 'White pizza with basil', aspect: 'aspect-square' },
  { id: photos.penne, alt: 'Penne in tomato sauce', aspect: 'aspect-[4/3]' },
  { id: photos.interiorGingham, alt: 'Red gingham tables in front of the open kitchen', aspect: 'aspect-[3/4]' },
  { id: photos.interiorEntrance, alt: 'Dining room seen from the entrance', aspect: 'aspect-[4/3]' },
  { id: photos.spaghettiBolognaise, alt: 'Spaghetti bolognaise', aspect: 'aspect-[3/4]' },
  { id: photos.tagliatelle, alt: 'Tagliatelle', aspect: 'aspect-[3/4]' },
  { id: photos.openKitchen, alt: 'Open kitchen behind framed Italian posters', aspect: 'aspect-square' },
  { id: photos.interiorWindow, alt: 'Sage-green dining room by the window', aspect: 'aspect-[4/3]' },
  { id: photos.seafoodPasta, alt: 'Seafood pasta with mussels and prawns', aspect: 'aspect-square' },
  { id: photos.facadeDay2, alt: 'The green La Cucina house on Place 3 Août by day', aspect: 'aspect-[4/3]' },
] as const

// Verbatim Google reviews (5★ each).
export const reviews = [
  { author: 'Margo Kargo', text: 'We ordered few pizzas, and our family is from Italy - everyone said it was Napolitan pizza level (dough,sauce, ingredients), delicious!' },
  { author: 'ramzi hamdi', text: "Wanna taste the best Pizza in the whole Sahel ? That's the place to be." },
  { author: 'Ismail Nouira', text: "The staff is friendly, and the food is simply perfect. It's one of those restaurants where everything feels authentic and uniquely Italian…" },
  { author: 'Farabi', text: 'The tastiest pizza i have ever had in tunisia . The ingredients are fresh and of high quality.' },
  { author: 'Firas Atigui', text: 'One plate away from Italy 🇮🇹❤️' },
] as const

const hoursSentence = `${restaurant.hours.map((h) => `${h.label} ${h.opens}–${h.closes}`).join(', ')}. For Friday, please call ${restaurant.phone}.`

// Answers use only the facts above; they feed both the visible FAQ and the FAQPage JSON-LD.
export const faq = [
  {
    q: 'Where is La Cucina in Monastir?',
    a: `La Cucina is on Place 3 Août, Monastir 5000, Tunisia (plus code ${restaurant.plusCode}). It is a small green wooden house with a neon CUCINA sign.`,
  },
  { q: 'What are La Cucina’s opening hours?', a: `Open ${hoursSentence}` },
  {
    q: 'Does La Cucina offer takeaway and delivery?',
    a: `Yes. La Cucina offers dine-in, takeaway and delivery. Call ${restaurant.phone} for details.`,
  },
  {
    q: 'How much does a meal at La Cucina cost?',
    a: 'Guests report spending TND 20–30 per person. Pizzas range from 15 DT (Margherita) to 32 DT, and pasta dishes from 22 DT to 40 DT.',
  },
  { q: 'Does La Cucina make its own pasta?', a: 'The menu marks the chicken ravioli (Ravioli Poulet) as house-made — “maison”.' },
  {
    q: 'How is La Cucina rated?',
    a: `La Cucina is rated ${restaurant.rating.value} out of 5 on Google from ${restaurant.rating.count} reviews.`,
  },
  { q: 'How do I reserve a table?', a: `Call La Cucina on ${restaurant.phone}.` },
] as const
