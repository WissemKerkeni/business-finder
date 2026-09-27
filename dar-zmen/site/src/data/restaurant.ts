// Single source of truth for every fact on the site, the JSON-LD, llms.txt and the sitemap.
// Source: Google Maps business profile, the sign over the entrance, and a photo of the printed
// Arabic menu (read 2026-09-26). See ../../../brief.md. Do not add unverified claims.

const CDN = 'https://lh3.googleusercontent.com/'

/** Google-hosted photo; `=wN` asks the CDN for an N-pixel-wide rendition. */
export const photo = (id: string, width = 1600) => `${CDN}${id}=w${width}`

/** srcset shared by <img> and the hero <link rel="preload"> so the browser reuses the preloaded file. */
export const photoSrcSet = (id: string) => [480, 800, 1200, 1600, 2400].map((w) => `${photo(id, w)} ${w}w`).join(', ')

// Guest and owner photos from the Google Maps profile. Labels were checked against each image.
export const photos = {
  gate: 'gps-cs-s/ANWiy9Q6MjCnjnE8pRQLnHxTMbW4lOcNqV3hDzmjf-yS4m7zfK171WDYgMn28dETh0AKkTnlVKIMGFTQYCqQ1pFdNg231tRmxeAP59YN2ENgUnPiNZIMl50vSleTfM55WSRO7sv5ZrFCCuNa5S8T',
  archNight: 'gps-cs-s/ANWiy9ReGqp1RPh3Z5izSHilQpK7XyUZTcSx-7L8aP4vqVbUzAOSVs2gcS1sBVB03fNPjkYUFJtqh47G4aTgduI-s-tSE9cMrdOcRa7jpSoyXeZwBKBIQDK3HgrvE_dOtT-zCYTGTFhWC_CE63B3',
  lanterns: 'gps-cs-s/ANWiy9SrDp-9ZqHwq0crhyuCT6eqAKkLgOlTpkSz4Uo-q7A37iv-_ZpzUs12mqa1IvD90x0WTsXbRMrwlw543ZffyoOIQBa6yeEl8ApqWZE6yTmKaYNkraUflZ7s7Jj77ETC7GUqIhoQuGFVO_fI',
  diningRoom: 'grass-cs/AABkmLcN9p85OfEAhBzPYh70HUA2qrQYyih93xE7hLF-LpN6kS4V70BvHu-LrZZK8PcBBkH-noYfjUUzEH0qOwt8Be44BVs4s7Xzgynv_tSihegKqxMSLcZ43be03I2Kohg4nYog8SVF',
  checkerFloor: 'gps-cs-s/ANWiy9QY4uOxVdiUnnOsfL9HFg5R01YW-4rrwL_wbvaTWDe9j78hfGwYjAGaaFAF5BEXrIJNo5Kzc4nSPZXc89mIVwaep2zPD6ihoC6_WY9SMtkulvSokULdIiidUTmgjbETihdDITU-C1Ew-ZHl',
  blueChairs: 'gps-cs-s/ANWiy9SJMfVW4krue9RB2jw4pU_D793_Kome6L7pO8wxUCi00KmiHcty0LErdtW29_RkGI51ModpdFy_RIGb72XWegURiU4hYH9INNpvEh4u7AN4wtx1GUx0lIzKDUp1Wk0gi23oG04rphvPi8r8',
  blueDoor: 'gps-cs-s/ANWiy9QTHCjw1fnYyhnmMqTZOdsuMfruPmqt68H0Bup_fDzuu00wNePK98Q4nOubiX0THk0gsKj0poym65sNddoc1Kq5dmz4ord1wvxv-AZhXKparPTkE5m5T_y9bgTdd3RknZdF87TTw_EPELQ',
  vaultedCounter: 'gps-cs-s/ANWiy9SOfucvWZjBnNkDKExpG1IdZJRXeiTkvhilFVVFnBfxUJnoBluFSu5NAgL9OIGBi4ELj2_jVXpo8aUGENPfIFNPYqj4QkxFnlD5PCF0_PaqPEtc1lfr70LtfjIHpA5yf2VEfYdZzBLN0MVK',
  dishesOfTheDay: 'gps-cs-s/AHRPTWndBBWKHd1cU-ITKJIJwMRvROB67ZWqsyPy_wSvDCwqwTyVyxMyk3gB1g2U2W5_-Qz9rGdQxx8spuGm9v7S44dCMt7jlirxMqU-lamLXImgpd1Vu5YITxQQrUVptAUQpcju_Bt9',
  couscousNabeul: 'gps-cs-s/ANWiy9Rxo8luRJNGO2Qw-tzkSJbUaHsj4TmJQOYktdkQvRi2DMW13UAh2tbyhx6rHtlpDfPDEigCQ3eAxy2juqE7OsD3OXX_4ZBui1aUJM6ZtMvLv3iORPuLVTA5YXIgrpFB-w7oh8_K8s8dmOeR',
  couscousMerguez: 'gps-cs-s/ANWiy9Tv_mDxk-Ja0i4i_HdPrF-fnnMOV5Xl3M7WGLKngIeYJPdWOJFb-em2_Et1IEN3hjdqdTQlQs31WBQBZTbQjK60CNbxWMK6nPYSNB1ZB58fPKhh6Y-pP5255l7ysvE5UhmZZ2AGmpiw0Uvt',
  couscousMergoum: 'gps-cs-s/ANWiy9SnCKKH6RXNJb3oSypkSDCEhIwfZZSeYtpGqdP-S7y7XJtGXNMvFiGY29pCMhHZx9Yq1BmTVtWux1iw2dSuKHkKYkYtIUyvRlegX4UTGBVafP0IPbzmr0Eh_9BdyEGPJMFt0ItVH_Wlr3DM',
  mloukhia: 'gps-cs-s/ANWiy9RpQHI6_7tTtVz6sWNlPVVW3F1MR0tXdgHaR7n9Gvy1khUzYXywkAKfGgBp78oNvEGkRputfMBzfFCGLX6RXoCSnGwzQjo5zUDer0nmvThGUj0bf3HzczVIoj0fKZwORbQsBOk2aeiDYYs',
  grilledFish: 'gps-cs-s/ANWiy9Qah_6ofwh9BuqF-xFxw2seldAaAbf2yHZEQOLx4urgPwIreC5f7Uo5qHJkqXrwKgGS4a8Yp2qykEwPkonC94Sfm4azJQXnLdopJPOXzbP6pOBx21BScOT6vF0YOGfW8uvwRAN1LtFbYILf',
  spaghettiShrimp: 'gps-cs-s/ANWiy9TpSGdTrEekLz5559-5gOtsBOKYa0DVcYfEse44TMvVsUq8dVQAKPHU9f-68QQMgjiWYwQmXuuNtzxxHhs3v1P803gORc-QQjzCiD5iPvUoxRePbViOTqn8pRvX27zNYzlwLzZTng3QRpXj',
  spaghettiNabeul: 'gps-cs-s/ANWiy9Rs3QMmznYl7it2YFBVJehvlQbwM9Qlkz-Zoex2F56881S_INFM-LxfRXIg7EUTNsSYe135wGxuVs17wEQp2ELo9nremZhxVWqQ8edY-hCHinhBOt3k8U1A1pXu9WhAGNY5CL3wcQ',
  ojjaOval: 'gps-cs-s/ANWiy9RXFckc-bhpZ8O5xtEE_Yao2mMahyF1onKQFkUAHn0XV3ZPXI7_5ejhdEXqk3JLSg0PjEOqLagE9lttYjz4DBdyOODXzhfrbDKuhWrYDH0gZDtzBq51fy7qrVHZo4l-ZT1rCCh3',
  soups: 'gps-cs-s/AHRPTWmfMDUqcpVTJPEwquW9N77q_eLRCig0-98MMrXDOEEhNLqFLH9jjoPWvb-xL4XHlkT1gjs6FE0j21ZI7jDeJ0SvahQJisr_wNNjHIRYPA_g_v5xM5qilvUxteOZuSKCq5ACk8FoAJGCso2o',
  chorba: 'gps-cs-s/ANWiy9R61R-7ppAIKjgX_RQnkNEOj0nfgi3JGvKL2NgU2RyqeQMlv2vVjZq_ddkzRhmJdN--Qovq1tw6N762uONwu0t3qCOi1Rtlji6AFVS9DgCsuwpyIxzZuYZtrqvP6yWc60KZ6XhFg0j9hmQ5',
  tableSpread: 'gps-cs-s/AHRPTWm4ZJydYHmhRv6S62g1o-hmOpEz1H0d3VX1PqOE8neWHSYUZkMjIkpItIn6U6Fwsz8CqKYF89zQAeHdBK0vR9SbKZtr-Clx4fSgzSgLXGqI0-Kh014U3hJ8LE93USbehO0Obkj7hVHwc0tM',
} as const
export type PhotoKey = keyof typeof photos

export const restaurant = {
  name: 'Dar Zmen',
  nameAr: 'دار زمان',
  alternateName: ['مطعم دار زمان', 'Restaurant Dar Zmen', 'Dar Zamen'],
  meaning: 'the house of the old days',
  signLine: 'إختصاص أكلة تونسية زمنية',
  signLineEn: 'old-time Tunisian food',
  summary:
    'Traditional Tunisian restaurant in the medina of Monastir, Tunisia, serving couscous, ojja, mloukhia, kamounia, grilled fish and chicken, and chorba. Open 24/24. Dine-in, takeaway and delivery.',
  cuisine: ['Tunisian', 'Traditional Tunisian', 'Mediterranean', 'Grill', 'Seafood'],
  priceRange: 'TND 10–20',
  pricePerPerson: 'TND 10–20 per person',
  services: ['Dine-in', 'Takeaway', 'Delivery'],
  phone: '+216 20 181 878',
  phoneE164: '+21620181878',
  whatsapp: 'https://wa.me/21620181878',
  address: {
    // Google lists no street address for Dar Zmen, only the plus code.
    street: 'QRFJ+5C',
    locality: 'Monastir',
    postalCode: '5000',
    region: 'Monastir Governorate',
    regionCode: 'TN-52',
    country: 'TN',
    countryName: 'Tunisia',
  },
  landmark: 'in the medina (old town), near the post office and the fish market',
  geo: { lat: 35.7729882, lng: 10.8310309 },
  plusCode: 'QRFJ+5C Monastir',
  mapsUrl: 'https://www.google.com/maps?cid=8740625965181019232',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=35.7729882,10.8310309',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=35.7729882,10.8310309&z=17&output=embed',
  // Google: "Open 24 hours"; the sign over the gate reads "24/24".
  hours: [
    { label: 'Every day, 24 hours', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  ],
  hoursText: 'Open 24/24, every day',
  rating: { value: 4.1, count: 174, distribution: [115, 19, 9, 3, 28] as const },
  facts: [
    'Accepts reservations',
    'Main dishes come with bread & salad',
    'Good for groups & kids',
    'Halal',
    'Late-night food',
    'Free parking nearby',
  ],
  parking: 'Free street parking and a free parking lot',
} as const

export type MenuItem = { name: string; ar: string; price: string; photo?: PhotoKey }
export type MenuGroup = { title: string; items: MenuItem[] }
export type MenuCategory = { id: string; label: string; ar: string; photo: PhotoKey; caption: string; groups: MenuGroup[] }

// From the restaurant's printed Arabic menu (photo on Google Maps). Prices in Tunisian dinars.
// Google's structured menu carries Glovo delivery prices (~18% higher) and is not used.
export const menu: MenuCategory[] = [
  {
    id: 'starters', label: 'Starters', ar: 'المقبلات', photo: 'soups', caption: 'Soups on the table',
    groups: [
      { title: 'Soup & salads', items: [
        { name: 'Barley chorba, bowl', ar: 'صحفة شربة شعير', price: '3' },
        { name: 'Grilled salad (mechouia)', ar: 'سلاطة مشوية', price: '7' },
        { name: 'Tunisian salad', ar: 'سلاطة تونسية', price: '7' },
        { name: 'Mixed salad', ar: 'سلاطة متنوعة', price: '7' },
        { name: 'Rice salad', ar: 'سلاطة روز', price: '6' },
        { name: 'Lentil salad', ar: 'سلاطة عدس', price: '6' },
        { name: 'Lettuce salad', ar: 'سلاطة خس', price: '6' },
      ]},
      { title: 'Ojja', items: [
        { name: 'Ojja with eggs', ar: 'عجة عضم', price: '7' },
        { name: 'Ojja with merguez', ar: 'عجة بالمرقاز', price: '12' },
        { name: 'Ojja with escalope', ar: 'عجة بالسكلوب', price: '12' },
      ]},
    ],
  },
  {
    id: 'grills', label: 'Grills & fish', ar: 'المشويات و المقليات', photo: 'grilledFish', caption: 'Grilled fish',
    groups: [
      { title: 'Chicken & meat', items: [
        { name: 'Whole roast chicken', ar: 'دجاجة مصلية كاملة', price: '27' },
        { name: 'Whole grilled chicken', ar: 'دجاجة مشوية كاملة', price: '29' },
        { name: '½ roast chicken', ar: '½ دجاجة مصلية', price: '18' },
        { name: '½ grilled chicken', ar: '½ دجاجة مشوية', price: '20' },
        { name: '¼ chicken, grilled or roast', ar: '¼ دجاج مشوي / مصلي', price: '13' },
        { name: 'Grilled liver', ar: 'صحن كبدة مشوية', price: '22' },
        { name: 'Breaded escalope', ar: 'سكالوب باني', price: '15' },
        { name: 'Grilled escalope', ar: 'اسكلوب مشوي', price: '15' },
        { name: 'Cordon bleu', ar: 'كردون بلو', price: '17' },
        { name: 'Escalope brochettes', ar: 'بروشات سكالوب', price: '17' },
        { name: 'Grilled merguez', ar: 'صحن مرقاز مشوي', price: '15' },
        { name: 'Grilled lamb cutlets', ar: 'كوتلات مشوية', price: '30' },
        { name: 'Mixed grill', ar: 'قرياد ميكس', price: '32' },
      ]},
      { title: 'Shrimp & fish', items: [
        { name: 'Shrimp — sautéed, grilled or breaded', ar: 'كروفات سوتيه · مشوية · باني', price: '25' },
        { name: 'Grilled sea bream (warata)', ar: 'وراطة مشوية', price: '20' },
        { name: 'Double warata', ar: 'دوبل وراطة', price: '35' },
        { name: 'Grilled sea bass (karous)', ar: 'قاروص مشوي', price: '20' },
        { name: 'Red mullet (trilia), grilled or breaded', ar: 'صحن تريلية مشوية · باني', price: '15' },
        { name: 'Grilled lambouka', ar: 'صحن لمبوكة مشوية', price: '15' },
        { name: 'Grilled sardines', ar: 'صحن سردينة مشوية', price: '14' },
      ]},
    ],
  },
  {
    id: 'old-days', label: 'Dishes of the old days', ar: 'أطباقنا الزمنية', photo: 'mloukhia', caption: 'Mloukhia',
    groups: [
      { title: 'Our dishes of the old days', items: [
        { name: 'Mloukhia with beef', ar: 'مولخية باللحم البقري', price: '18.5', photo: 'mloukhia' },
        { name: 'Lamb kamounia', ar: 'كمونية علوش', price: '19' },
        { name: 'Lamb qalaya', ar: 'قلاية علوش', price: '19' },
        { name: 'Half roast lamb’s head', ar: 'نصف رأس علوش مصلي', price: '18' },
        { name: 'Chakchouka with broad beans & merguez', ar: 'شكشوكة فول بالمرقاز', price: '14' },
        { name: 'Minced-meat lasagne', ar: 'لازانيا لحم مفروم', price: '14' },
      ]},
    ],
  },
]

// Rotating pots from the restaurant's own Google/Glovo menu; shown without prices.
export const dishesOfTheDay = [
  'Couscous with lamb', 'Couscous with beef & vegetables', 'Fish couscous', 'Kouskous farfoucha with grilled fish',
  'Kamounia', 'Jelbana', 'Loubya', 'Mermez', 'Nwasser', 'Makarouna fella', 'Rice jerbi', 'Riz fakia',
  'Madfouna', 'Chebtiya', 'Stuffed calamari', 'Spaghetti with shrimp', 'Spaghetti with seafood', 'Briks',
]

export const signatures: { name: string; photo: PhotoKey; alt: string }[] = [
  { name: 'Couscous with lamb & chickpeas', photo: 'couscousNabeul', alt: 'Couscous topped with lamb, chickpeas, raisins, a boiled egg and a green pepper on a blue-and-white Nabeul plate' },
  { name: 'Mloukhia', photo: 'mloukhia', alt: 'A bowl of dark mloukhia on a tiled table, with a plate of fish and chips behind' },
  { name: 'Spaghetti with shrimp', photo: 'spaghettiShrimp', alt: 'Spaghetti in red sauce topped with large grilled shrimp and a green pepper' },
  { name: 'Grilled fish', photo: 'grilledFish', alt: 'A platter of grilled fish with chopped onion, parsley, chips and rice salad' },
]

export const seenOnTheTable: { name: string; photo: PhotoKey }[] = [
  { name: 'Spaghetti', photo: 'spaghettiNabeul' },
  { name: 'Soup', photo: 'chorba' },
  { name: 'A full table', photo: 'tableSpread' },
  { name: 'From the pot', photo: 'ojjaOval' },
]

export const gallery: { id: PhotoKey; alt: string; caption: string; span: string }[] = [
  { id: 'archNight', caption: 'The medina at night', span: 'col-span-2 row-span-3 md:col-span-5 md:row-span-4', alt: 'A horseshoe arch in the medina at night, strung with lights and woven lampshades, opening onto a lane of tables' },
  { id: 'checkerFloor', caption: 'The checkerboard floor', span: 'md:col-span-4 md:row-span-2', alt: 'The dining room with a black-and-white checkerboard floor, blue iron chairs and the glass counter' },
  { id: 'blueDoor', caption: 'The blue door', span: 'md:col-span-3 md:row-span-2', alt: 'A blue door at the end of the dining room, with tiled walls and a checkerboard floor' },
  { id: 'couscousMergoum', caption: 'On the mergoum', span: 'md:col-span-3 md:row-span-2', alt: 'Couscous and a vegetable stew on a striped red, yellow and blue mergoum tablecloth' },
  { id: 'couscousMerguez', caption: 'Couscous', span: 'md:col-span-4 md:row-span-2', alt: 'Couscous with merguez, pepper and a bay leaf on a green and yellow glazed plate' },
  { id: 'lanterns', caption: 'Lanterns in the lane', span: 'col-span-2 md:col-span-6 md:row-span-2', alt: 'A medina lane under woven lanterns, with a painted coffee-cup mural on the wall' },
  { id: 'blueChairs', caption: 'Blue iron chairs', span: 'md:col-span-3 md:row-span-2', alt: 'Blue wrought-iron chairs and a red tablecloth in the dining room' },
  { id: 'dishesOfTheDay', caption: 'Dishes of the day', span: 'md:col-span-3 md:row-span-2', alt: 'Trays of the day’s dishes in the glass counter: rice, couscous and grilled chicken' },
]

// Verbatim Google reviews ("…" marks Google's truncation). Names as shown on Google.
export const featuredReview = {
  quote: 'So friendly, they gave us a lot of food on the house (Just say ‘aslema’ and you become family). And the food is to die for. Best Salata mechouia I’ve ever had.',
  author: 'Eric Huang', stars: 5, note: 'Translated by Google',
}
export const reviews = [
  { quote: 'Delicious local Tunisian food in a relaxed setting. The shrimp spaghetti is a must-try: super flavourful! Most main dishes come with bread and salad, which is a lovely touch.', author: 'Hei Lee', badge: 'Local Guide' },
  { quote: 'Unbelievable big shrimps, very fresh and well grilled fish, big portion, boss was friendly… Highly recommended if you find yourself in Monastir.', author: 'Yuheng Zhang', badge: 'Local Guide' },
  { quote: 'Very good customer service thank you so much we had free tea and soup everything was delicious great food and quality thanks for the staff', author: 'Jazz' },
]

// Answers use only facts from the Google profile, the sign and the printed menu.
export const faq = [
  { q: 'Where is Dar Zmen in Monastir?', a: 'Dar Zmen is in the medina (old town) of Monastir, Tunisia, behind a stone gateway in the old walls, near the post office and the fish market. Plus code: QRFJ+5C Monastir.' },
  { q: 'What are Dar Zmen’s opening hours?', a: 'Dar Zmen is open 24 hours a day, every day. Google lists it as “Open 24 hours” and the sign over the gate reads 24/24.' },
  { q: 'What kind of food does Dar Zmen serve?', a: 'Traditional Tunisian food. The printed menu has salads, barley chorba and ojja; grilled chicken, meat, shrimp and fish; and “dishes of the old days” such as mloukhia, lamb kamounia and qalaya. Couscous and other stews change as dishes of the day.' },
  { q: 'How much does a meal cost at Dar Zmen?', a: 'Google users report TND 10–20 per person. On the printed menu, salads cost 6–7 DT, a bowl of chorba 3 DT, and grilled fish plates start at 14 DT.' },
  { q: 'Can I book a table?', a: 'Yes. Dar Zmen accepts reservations by phone on +216 20 181 878.' },
  { q: 'Does Dar Zmen offer takeaway or delivery?', a: 'Yes: dine-in, takeaway and delivery (Dar Zmen is on Glovo).' },
  { q: 'How is Dar Zmen rated?', a: 'Dar Zmen is rated 4.1 out of 5 on Google from 174 reviews.' },
]
