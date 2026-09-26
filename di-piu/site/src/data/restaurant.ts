// Single source of truth for every fact on the site, the JSON-LD, llms.txt and the sitemap.
// Source: Google Maps business profile + photos of the printed menu (read 2026-09-26). See ../../brief.md.
// Do not add unverified claims.

const PHOTO_BASE = 'https://lh3.googleusercontent.com/gps-cs-s/'

/** Google-hosted photo; `=wN` asks the CDN for an N-pixel-wide rendition. */
export const photo = (id: string, width = 1600) => `${PHOTO_BASE}${id}=w${width}`

/** srcset shared by <img> and the hero <link rel="preload"> so the browser reuses the preloaded file. */
export const photoSrcSet = (id: string) => [480, 800, 1200, 1600, 2400].map((w) => `${photo(id, w)} ${w}w`).join(', ')

export const photos = {
  storefrontNight: 'ANWiy9QUo7BTJUrRV0OzhySGNPdv3MTxs-ToMECBG70ok4cp00MGKV-s_T5S8CTEq5qk1swD8LKchYdgKkskosafqOEPqh7xzYQHsI_yZuQRSi8tIwSPOFMRF7vYSGueXTUpX6h9SHtYGIJOagt4',
  logoSign: 'ANWiy9Sabc1FBO9tBAh26rRXqFHPcqzjyu2fcW5h5Vd-MAprF26or1O57Syq1Lmu-gMZSqir817OU-bGcxBjJMn6xVPZjHeGS1zRurXxON9gKHsJ4axcTMILOZWajQ5M2fGCrkspKbtOuzxpD54',
  basketWall: 'ANWiy9QyBhvr4Zje7L9i-ziaxgunexnraoUhwVTVBewvibYP0Sx1tj7Ub0O4qSeIItd1JfKrHzlrloZOINAKz9gg-2tnYB2XJcJ4wHy_91GE37FBGDp_wN5D6q_8rhQSJsz5zoiZqoQMIy-A7AU',
  sageBar: 'ANWiy9Sm8kd4-3SfH-bEHL7s7K-ro-rlb86xIOhsKmPcROkdG5sp8t2lipgcU-kp_Q-nFyf5uXFsYd6vUaWqs0KMrHVGEETLvv-J_j09Do7wQxsYR3598NBObruWxV5KNX-qzlAubvQ4R1T0AMs',
  terraceEvening: 'ANWiy9TL_TDIJB-olMThOkgitNztnqq8vCLNtWPOxbahaBkXsTP1741pYVJUdewpy4RsIEC518YgJVvD3dWdYdiw7XDHBFp6Sh5swPKOH_lLXXwlmc1wtkJM3gu3uLFPxb1-mi58eJ5GnAkymZ5E',
  ciaoPendants: 'ANWiy9T6R-QStlooYphTjkGvw7XwhEzm-PENJlgAo9GsTlFbBEKKFKZkJhj5EoU8MIDazTXQrNQ8KM0f5FRvM-GbaMHu0t6mox3liuZzi6HuSINI0a6MdXyyxCP6VX4TOJJrvGYRUJ51hgBFf91P',
  sageShelves: 'ANWiy9SgZgwLOXdK22CQGDZL5rGFtnslh2RMTJh1XdxaQQ85b1GvdASHjuk2cy3fbkbpcI40_Lw_AuJhzT7Yx7CLGl1Z0ReKe7lJo6Cap3ciMclgj7FBvRLDwpwi7-hwfCYJA6L0YmeTVrUHG_XD',
  ciaoWall: 'ANWiy9QNFl34MgfumdTtYjqjyRci5vUb3DcI-A6rwBeFxxIrrCa1IIrCuNroDi7EYNIRh-7xcpqFdO_BtzEmWhY756WgjYxpnm-B_kKXFTAf29g17F3ZH0LDjrgoE1HFybeYN2MFE6wmfz9-w4L9',
  boothGlow: 'ANWiy9TQbTz5YOKwTgZZeNLWJ6LcvbI9pB43ZdGFrPx2ClD83CLsJfuLNoySbt8w23Lt6s9FaGJLggTVaCdlkkfIUx4T7Sne2HfBtl47skvpFIqOzA_G2Mran9_1U9bWT4uyLPkakpxXW-iO9aU',
  // Dishes. Labels come from Google's own dish tags unless noted as a visual match.
  patesDiPiu: 'AHRPTWkm2Zi9kbam4MsGbADSb2zSqOXPmiXA-B63i-Dpt3sNH0kygna8A5ePB8kCmJ21irU1xS9H1p_QtLBsimx36NpHUCK7v-iqnC630xmXfMgJGMNIaX4DN-vYVwYF-_Du1Gk1ciX9102KdQQ', // visual match (pistachio, rolled chicken)
  pizzaBurrata: 'ANWiy9SElqdWYmiK2ArjBiXJ3nzB4Lu23OkrSoinZBLK2h1-N7A9V4cFesnYK-rgWKO-KBnabZndwtubJUQHJV-S4K7M-SP6SjGvQPOYvl6cHfCF02fNo3iohtD1ZB4YlmRwSf3ScZScq1YlmQGq', // visual match
  pizzaMojito: 'AHRPTWmf57ATQufdMT5Lci045HnW9C5_GxpeLY1pkhTb_71_2o-iCMrx2omK2OUiITH4VY2ZhSunGIV6yIJqsb8UqYi3M5tSysfhTvblsRKHSAlM8QrNXWjUgQVOyFrik-FYCWZI28rn5BKsiD0',
  tagliatelleFruitsDeMer: 'AHRPTWlZCGICcoTnV94kr5szbieKrUEeKsBZn0q1-q_Q1b-Nr-ChVo0B8vwEbrYMMIQfaArWgW0NFcD-jEgU7QWOsmKWsQkOMtThLY6CwbEFijDVYpWYjz6WZBbhHXccfuqSN5w2x0qYqOsuo74',
  spaghettiSeafood: 'AHRPTWmZz4_SVQ264VVk6qPL6SLFJFSK5j8C_qkDN8_tQ5zVHxK29Kd8G-B3ipw1EAS5OOCs_sVkDcCcNasUIoktdKFvNJI8Ot5hLOcrJGd9Kpz6foiKe0Zn1s25-oX86_iqsK64k5OSpyL0hdwq',
  risottoFruitsDeMer: 'AHRPTWmkDNj_VMiMK1DWdlVGx5sFJhWCqOsS2vg1bEST9b2j5gF6W4SM_0PCNeo3lY_OiBgkqpMY6YAYGGlbLoM2ot6w5Jk5DNkah8Qa9mkYW5NnR1DrGRxxsKMoUwRc5K7PyGiDgLurMpIYT7-4',
  ravioliSaumon: 'AHRPTWmKBJp69GLvGJP4Alhw_vo_9JDRxaFBZ3SAf-QI34fxcyFQlF9lTNgU9-R-s0H2uv6roYM-5Rw-Sg597jnb5OZD0-XgW4wOr-TeztDA84KTLr-FBQiaD5XYvg1LFaNMjzYhhPv_CFN88GM',
  saladeFruitsDeMer: 'AHRPTWn3X6IDogaqeWQt96nj8LIWE4zGnCbp6QISjCLHiaS7JWGRwpNFsFcQzrG5JI7YNoS9UC7RuP98MsFxmfqTBhtiNqc79Ga6b7m36XF8dLyWZP8-WvJ6Jd_aZz30xcCUI6p9xmFt0WQNK-Ht',
  musselsBowl: 'AHRPTWnyAb2h0icCLqqkx6YnYf6dVS95h0U1NKJMganyS-P0c55RMuS14xBP8GXTQusHnzCx00Y1LNuJrbymomAWcdHUQk2H-cRIBsxFWe177-ix3MBymuqLbFMjgk1sLPiMe3sG4MZx8QaPTgsJ',
  supremeChampignons: 'AHRPTWkLx7vVthHfGFaq3W9iIjd3J4avHOrxpNFQZp9bypkxEpsy9bydcv_-mBqfVRpx04IdKD15ciPHUAlHgNwbK71fHNy88BZWQvOgWJ6fdFYiLae9TXrELrjrukIujAGV-9k39GiBYC1RFv8',
  platSupreme: 'AHRPTWlerg6o4p-Q5P3AP3jD7AbkKdEQpitlXMZZnmHxo1OWo-DfS9MJBm2UydkabuCv2gYVgDA0bZonWIiyzr11T1lZUa-TVSj5BBoVIwtzcV90abGKUF6stZZq1G4HEud_dSMOriU_E5buck5s',
  escalopePanee: 'AHRPTWmrVCZlC7BPUc_3GSRUhsGlXMKhfIPbh4X-j6uCnR7vtwszM3HnUx-Pb4pM8LX6uvjQEhKLuktgq8SxTt0I4YQvcNoNvribEspWukPHMni3TBgzwLBU9Vi6V6V6VCNvpkDrBMnNxvxznfc', // visual match
  cheesecake: 'AHRPTWn2F9hNLeB1lzBo7vCPIOc7ezDYxYIdeIjcRfF9SKn-1mfvjyRA1iO3EbnuFCbCz4vy21kR-IouiqFbju7VJijo5q3Sk9sp9uIGVTEOWqZsKDrF7Buonal91YL6LZ_NZiPpyxg4DtIK5Cb1',
} as const
export type PhotoKey = keyof typeof photos

export const restaurant = {
  name: 'Di Più',
  alternateName: 'Di Più Ristorante Monastir',
  tagline: "Un po' di più.",
  summary:
    'Italian restaurant in the centre of Monastir, Tunisia, serving pizza, pasta, ravioli, risotto, grilled meat and fish, mojitos and cheesecakes. Dine-in, terrace, takeaway and delivery.',
  cuisine: ['Italian', 'Pizza', 'Pasta', 'Seafood'],
  priceRange: 'TND 20–40',
  pricePerPerson: 'TND 20–40 per person',
  services: ['Dine-in', 'Terrace', 'Takeaway', 'Delivery'],
  phone: '+216 50 074 004',
  phoneE164: '+21650074004',
  whatsapp: 'https://wa.me/21650074004',
  address: {
    // Google lists no street address for Di Più, only the plus code.
    street: 'QRCQ+6P',
    locality: 'Monastir',
    postalCode: '5000',
    region: 'Monastir Governorate',
    regionCode: 'TN-52',
    country: 'TN',
    countryName: 'Tunisia',
  },
  landmark: 'near Place 3 Août and the marina',
  geo: { lat: 35.7706018, lng: 10.8392555 },
  plusCode: 'QRCQ+6P Monastir',
  mapsUrl: 'https://www.google.com/maps?cid=13172501472462840975',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=35.7706018,10.8392555&z=17&output=embed',
  facebook: 'https://www.facebook.com/dipiu.monastir/',
  // Google: "Open · Closes 12 AM", Monday–Sunday 12 PM–12 AM.
  hours: [
    { label: 'Every day', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '12:00', closes: '00:00' },
  ],
  rating: { value: 4.5, count: 423, distribution: [332, 43, 16, 7, 25] as const },
  facts: [
    'Terrace seating',
    'Free parking nearby',
    'Card payments',
    'Kids welcome',
    'Vegetarian options',
    'Accepts reservations',
  ],
} as const

export type MenuItem = {
  name: string
  price: string
  description?: string
  photo?: PhotoKey
  tag?: 'Nouveau' | 'Maison'
}
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }
export type MenuCategory = { id: string; label: string; photo: PhotoKey; caption: string; groups: MenuGroup[] }

// From the restaurant's printed menu (photos on Google Maps). Prices in Tunisian dinars.
export const menu: MenuCategory[] = [
  {
    id: 'antipasti', label: 'Antipasti & Salades', photo: 'musselsBowl', caption: 'Antipasti & salades · Di Più',
    groups: [
      { title: 'Antipasti', items: [
        { name: 'Soupe aux lentilles', price: '9.8', tag: 'Nouveau' },
        { name: 'Bisque de crevettes', price: '12.8', tag: 'Nouveau' },
        { name: 'Mozzarella chaude panée', price: '21.9' },
        { name: 'Calamars dorés', description: '6 pièces', price: '24.9' },
        { name: 'Crabes panés', description: '6 pièces', price: '25.9', tag: 'Nouveau' },
        { name: 'Moules marinières à la crème', price: '27.9' },
      ]},
      { title: 'Salades', items: [
        { name: 'Italienne', description: 'laitue, roquette, tomates cerises, œuf, jambon fumé, gruyère', price: '23.9' },
        { name: 'Burrata', description: 'laitue, roquette, tomates cerises, burrata, pesto, pignons', price: '24.9' },
        { name: 'César', description: 'laitue, roquette, tomates cerises, poulet fumé, croûtons, parmesan, noix', price: '25.9' },
        { name: 'Fruits de mer', description: 'laitue, tomates cerises, fruits de mer', price: '29.5', photo: 'saladeFruitsDeMer' },
      ]},
    ],
  },
  {
    id: 'pizza', label: 'Pizza', photo: 'pizzaMojito', caption: 'Pizza & mojito on the terrace · Di Più',
    groups: [
      { title: 'Pizze', items: [
        { name: 'Margarita', description: 'sauce tomate, mozzarella, basilic', price: '15.9' },
        { name: 'Neptune', description: 'sauce tomate, mozzarella, thon, basilic, olive', price: '18.9' },
        { name: 'Poulet', description: 'sauce blanche, mozzarella, poulet, champignons, poivre', price: '20.9' },
        { name: 'Végétarienne', description: 'sauce tomate, mozzarella, aubergines et courgettes grillées, champignons frais', price: '23.9' },
        { name: 'Pepperoni', description: 'sauce tomate, mozzarella, pepperoni', price: '24.9' },
        { name: 'Reine', description: 'sauce tomate, mozzarella, jambon fumé, champignons', price: '25.9' },
        { name: 'Bresaola', description: 'sauce tomate, mozzarella, bresaola, roquette, parmesan, sauce balsamique', price: '25.9', tag: 'Nouveau' },
        { name: '5 Fromages', description: 'mozzarella, gruyère, roquefort, gouda, parmesan', price: '25.9' },
        { name: 'Campione', description: 'viande hachée, mozzarella, champignons', price: '26.9' },
        { name: 'Burrata', description: 'sauce tomate, mozzarella, burrata, roquette, parmesan, sauce balsamique', price: '27.9', photo: 'pizzaBurrata' },
        { name: 'Fruits de mer', price: '27.8' },
        { name: 'Saumon', description: 'sauce blanche ou rosée, mozzarella, saumon fumé, épinards', price: '29.9' },
      ]},
    ],
  },
  {
    id: 'pasta', label: 'Pasta', photo: 'spaghettiSeafood', caption: 'Pasta · spaghetti, penne, farfalle ou tagliatelle',
    groups: [
      { title: 'Pasta', note: 'spaghetti, penne, farfalle ou tagliatelle', items: [
        { name: 'Puttanesca', description: 'thon, câpres, olives, cornichons, piment de Cayenne', price: '22.8' },
        { name: 'Bolognaise', description: 'viande hachée, parmesan', price: '23.8' },
        { name: 'Cléopatra', description: 'poulet, champignons frais, parmesan', price: '27.8' },
        { name: 'Carbonara', description: 'jambon fumé, bacon, parmesan', price: '27.8' },
        { name: '4 Fromages', description: 'gruyère, parmesan, roquefort, cheddar', price: '29.8' },
        { name: 'Burrata', description: 'pesto, burrata, pignons, roquette', price: '30.8' },
        { name: 'Émincé de bœuf champignons', description: 'émincé de bœuf, champignons, pesto', price: '33.8' },
        { name: 'Fruits de mer', description: 'sauce tomate, rosée ou crème, fruits de mer, tomate cerise, poivron, basilic', price: '37.8', photo: 'tagliatelleFruitsDeMer' },
        { name: 'Pâtes Di Più', description: 'pesto, parmesan, pistache, suprême de poulet roulé, ricotta, épinards, crevettes', price: '38.9', photo: 'patesDiPiu', tag: 'Maison' },
        { name: 'Duo de saumon', description: 'saumon fumé, pavé de saumon frais, tomates cerises, parmesan', price: '39.8' },
        { name: 'Pâtes au mérou', price: '39.8' },
      ]},
    ],
  },
  {
    id: 'ravioli', label: 'Ravioli & Risotto', photo: 'ravioliSaumon', caption: 'Ravioli saumon fumé · Di Più',
    groups: [
      { title: 'Ravioli & Lasagne', items: [
        { name: 'Ravioli épinards, ricotta, champignons', description: 'crème fraîche, épinards, ricotta, champignons frais, parmesan', price: '28.8' },
        { name: 'Ravioli bolognaise', description: 'sauce tomate, viande hachée, parmesan', price: '30.8' },
        { name: 'Ravioli 4 fromages', description: 'crème fraîche, gruyère, parmesan, roquefort, cheddar', price: '31.8' },
        { name: 'Ravioli saumon fumé', description: 'crème fraîche, saumon fumé, tomates cerises, basilic, parmesan', price: '35.8', photo: 'ravioliSaumon' },
        { name: 'Lasagnes bolognaise', price: '24.8' },
        { name: 'Lasagnes fruits de mer', price: '31.8' },
      ]},
      { title: 'Risotto', items: [
        { name: 'Risotto 4 fromages', price: '31.8' },
        { name: 'Risotto poulet champignons', price: '32.8' },
        { name: 'Risotto fruits de mer', price: '39.8', photo: 'risottoFruitsDeMer' },
      ]},
    ],
  },
  {
    id: 'plats', label: 'Plats', photo: 'platSupreme', caption: 'Plats · Di Più',
    groups: [
      { title: 'Volailles', items: [
        { name: 'Escalope de poulet grillée', description: 'avec assortiments', price: '23.9' },
        { name: 'Escalope de poulet panée', description: 'avec assortiments', price: '24.9', photo: 'escalopePanee' },
        { name: 'Suprême sauce champignons', price: '28.9', photo: 'supremeChampignons' },
        { name: 'Suprême farci ricotta épinards', description: 'avec assortiments', price: '31.9' },
      ]},
      { title: 'Viandes', items: [
        { name: 'Émincé de bœuf sauce champignons', price: '38.8' },
        { name: 'Filet de bœuf, 3 sauces', description: 'poivre, parmesan, champignons', price: '46.8' },
        { name: 'Côte à l’os grillée, 500 g', description: 'avec assortiments', price: '49.9' },
        { name: 'Carré d’agneau, 3 sauces', description: 'champignons, poivre, parmesan', price: '49.9' },
        { name: 'Souris d’agneau à la moutarde, 600 g', price: '69.9' },
      ]},
      { title: 'Poissons', items: [
        { name: 'Loup grillé', description: 'avec assortiments', price: '29.8' },
        { name: 'Filet de dorade sauce citron', price: '33.8' },
        { name: 'Crevettes crunchy aux amandes effilées', description: 'avec assortiments', price: '37.8' },
        { name: 'Symphonie fruits de mer · pour 2', description: 'loup grillé, crevettes panées, fruits de mer sautés, calamars dorés, moules à la crème', price: '119.5' },
      ]},
    ],
  },
  {
    id: 'dolci', label: 'Dolci & Drinks', photo: 'cheesecake', caption: 'Cheesecake · Di Più',
    groups: [
      { title: 'Dolci', items: [
        { name: 'Red velvet', price: '8.4' },
        { name: 'Cheesecake', description: 'noisette, Oreo, spéculoos ou Nutella', price: '11.8', photo: 'cheesecake' },
        { name: 'Saint-Sébastien', price: '12.8' },
        { name: 'Tiramisu', price: '12.9' },
        { name: 'Sorbet citron', description: '2 boules', price: '6.5' },
        { name: 'Glace', description: '2 boules · 3 boules', price: '6.9 · 9.8' },
        { name: 'Banana split', price: '14.8' },
      ]},
      { title: 'Mojitos & caffè', items: [
        { name: 'Mojito Di Più', description: 'kiwi, banane, concombre, fruit de la passion', price: '13.9' },
        { name: 'Mojito virgin · blueberry · redberry', price: '8.7 · 9.6 · 9.6' },
        { name: 'Mojito tropical · piña colada', price: '12.6' },
        { name: 'Espresso · cappuccino · américain', price: '3.5 · 3.9 · 3.9' },
        { name: 'Café crème · iced coffee · affogato', price: '4.4 · 7.5 · 8.5' },
        { name: 'Citronnade · jus d’orange · jus de fraise', price: '6.2 · 6.8 · 7.2' },
      ]},
    ],
  },
]

export const signatures: { name: string; description?: string; price: string; photo: PhotoKey; label?: string }[] = [
  { name: 'Pâtes Di Più', description: 'pesto, parmesan, pistachio, rolled chicken supreme, ricotta, spinach, shrimp', price: '38.9', photo: 'patesDiPiu', label: 'The house pasta' },
  { name: 'Pizza Burrata', description: 'tomato, mozzarella, burrata, rocket, parmesan, balsamic', price: '27.9', photo: 'pizzaBurrata' },
  { name: 'Pâtes Fruits de Mer', description: 'tomato, rosé or cream sauce, seafood, cherry tomato, pepper, basil', price: '37.8', photo: 'tagliatelleFruitsDeMer' },
  { name: 'Risotto Fruits de Mer', price: '39.8', photo: 'risottoFruitsDeMer' },
]

export const seenOnTheTable: { name: string; price: string; photo: PhotoKey }[] = [
  { name: 'Ravioli saumon fumé', price: '35.8', photo: 'ravioliSaumon' },
  { name: 'Suprême sauce champignons', price: '28.9', photo: 'supremeChampignons' },
  { name: 'Salade fruits de mer', price: '29.5', photo: 'saladeFruitsDeMer' },
  { name: 'Cheesecake', price: '11.8', photo: 'cheesecake' },
]

export const gallery: { id: PhotoKey; alt: string; wide?: boolean }[] = [
  { id: 'terraceEvening', alt: 'The Di Più terrace in the evening: a planted green wall, oak slats and rattan pendant lamps under black parasols', wide: true },
  { id: 'ciaoPendants', alt: 'Dining room with rattan pendants and leaf-print wallpaper with CIAO signs' },
  { id: 'pizzaMojito', alt: 'A pizza with rocket and a mint mojito on a terrace table' },
  { id: 'sageShelves', alt: 'The sage-green bar and shelves under the glowing Di Più logo' },
  { id: 'ravioliSaumon', alt: 'Ravioli with smoked salmon and cream sauce' },
  { id: 'ciaoWall', alt: 'Leaf-print wallpaper with black-and-white CIAO signs', wide: true },
  { id: 'cheesecake', alt: 'A slice of chocolate cheesecake on a green plate' },
  { id: 'boothGlow', alt: 'Charcoal banquette under a softly lit wall of woven baskets' },
]

// Verbatim Google reviews ("…" marks Google's truncation). Names as shown on Google.
export const reviews = [
  { quote: 'Food was out of this world, so good we had to come back twice! … Restaurant itself is lovely, very stylish and fresh with a nice atmosphere.', author: 'Jessica B' },
  { quote: 'The place is so calm with relaxing music, I loved the vibe there… the quantity of the seafood is so generous and it tastes so good', author: 'Jasmine', badge: 'Local Guide' },
  { quote: 'I have revisited this place several times, and I can confidently testify that their prices are fair, the portions are generous…', author: 'Fa', badge: 'Local Guide' },
  { quote: 'Presentation is amazing and the food is very delicious. The staff were very welcoming and warm.', author: 'Wannes Sonia' },
]

// Answers use only facts from the Google profile and the printed menu.
export const faq = [
  { q: 'Where is Di Più in Monastir?', a: 'Di Più is in the centre of Monastir (plus code QRCQ+6P, Monastir 5000), near Place 3 Août and the marina. Open it in Google Maps for directions.' },
  { q: 'What are Di Più’s opening hours?', a: 'Di Più is open every day from 12:00 to midnight.' },
  { q: 'Can I book a table?', a: 'Yes. Di Più accepts reservations by phone on +216 50 074 004.' },
  { q: 'What kind of food does Di Più serve?', a: 'Italian food: pizza, pasta (spaghetti, penne, farfalle or tagliatelle), ravioli, lasagne and risotto, plus grilled chicken, beef, lamb and fish, salads, desserts, mojitos and coffee.' },
  { q: 'How much does a meal cost?', a: 'Google users report TND 20–40 per person. Pizzas start at 15.9 DT and pasta at 22.8 DT.' },
  { q: 'Does Di Più offer takeaway, delivery or outdoor seating?', a: 'Yes: dine-in, a terrace, takeaway and delivery.' },
  { q: 'How is Di Più rated?', a: 'Di Più is rated 4.5 out of 5 on Google from 423 reviews.' },
]
