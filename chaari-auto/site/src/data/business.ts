// Single source of truth for every fact on the site, in French and English. Sources: the business's own Instagram
// (@chaari.auto), Facebook page (facebook.com/Hydrographiques), TikTok bio, Google Maps profile, and the owner's notes of
// 2026-10-04 (12 years of experience, Stuttgart positioning, car maintenance, shipping from Genoa, destinations, market
// shares, the new service steps). See ../../brief.md for evidence. Copy only what the business states: never add
// customs, delays, prices or guarantees it has not confirmed.
import photoMeta from './photos.json' with { type: 'json' }
import videoMeta from './videos.json' with { type: 'json' }
import { fmtDate, type L, type Lang } from '../i18n.tsx'

export type PhotoKey = keyof typeof photoMeta

export const photos = photoMeta as Record<PhotoKey, { w: number; h: number; widths: number[] }>

export const photoSrc = (id: PhotoKey, w?: number) => {
  const ws = photos[id].widths
  const best = w ? ws.filter((x) => x <= w).pop() ?? ws[0] : ws[ws.length - 1]
  return `/photos/${id}-${best}.webp`
}
export const photoSrcSet = (id: PhotoKey) => photos[id].widths.map((w) => `/photos/${id}-${w}.webp ${w}w`).join(', ')

export const business = {
  name: 'Chaari Auto',
  wordmark: 'CHAARI AUTO',
  // Owner's positioning (2026-10-04).
  tagline: {
    fr: 'Spécialiste de l’exportation de voitures d’Europe vers l’international.',
    en: 'Specialist in exporting cars from Europe to international destinations.',
  } as L,
  // Verbatim from the business's captions and Google Maps description (French); English translation.
  intro: {
    fr: 'Tunisiens résidant à l’étranger, nous vous proposons un service clé en main pour acheter votre voiture de rêve sans aucune difficulté !',
    en: 'Tunisians living abroad: we offer a turnkey service to buy your dream car without any hassle!',
  } as L,
  // Owner's notes: 12 years of experience (as of 2026).
  experienceYears: 12,
  // Bietigheim-Bissingen is in the Stuttgart region (Verband Region Stuttgart), 20 km north of the city.
  region: { fr: 'Région de Stuttgart, Allemagne', en: 'Stuttgart region, Germany' } as L,
  whatsapp: '491778629077',
  phone: '+49 177 8629077',
  phoneE164: '+491778629077',
  email: 'chaariauto@gmail.com',
  address: {
    street: 'Lindenstraße 16',
    postalCode: '74321',
    locality: 'Bietigheim-Bissingen',
    country: 'DE',
    countryName: { fr: 'Allemagne', en: 'Germany' } as L,
    regionCode: 'DE-BW',
  },
  geo: { lat: 48.9455807, lng: 9.0985454 },
  plusCode: 'W3WX+6C Bietigheim-Bissingen',
  // Google Maps, 2026-09-29.
  hours: [
    { days: { fr: 'Lundi – vendredi', en: 'Monday – Friday' } as L, time: { fr: '9h – 18h', en: '9 am – 6 pm' } as L, schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: { fr: 'Samedi', en: 'Saturday' } as L, time: { fr: '9h – 14h', en: '9 am – 2 pm' } as L, schema: ['Saturday'], opens: '09:00', closes: '14:00' },
    { days: { fr: 'Dimanche', en: 'Sunday' } as L, time: { fr: 'Fermé', en: 'Closed' } as L, schema: [], opens: '', closes: '' },
  ],
  hoursShort: { fr: 'Lun–Ven 9h–18h · Sam 9h–14h', en: 'Mon–Fri 9 am–6 pm · Sat 9 am–2 pm' } as L,
  rating: { value: 5.0, count: 89 },
  mapsUrl: 'https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b',
  // Google Maps customer ID (CID) of the Business Profile = 0xef513e9a96efbc1b from the place URL, in decimal.
  mapsCid: '17244633281856519195',
  reviewsUrl: 'https://www.google.com/search?q=CHAARI+AUTO+Bietigheim-Bissingen&hl=fr#lrd=0x4799d534da3bde8b:0xef513e9a96efbc1b,1,,,,',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=CHAARI%20AUTO%2C%20Lindenstra%C3%9Fe%2016%2C%2074321%20Bietigheim-Bissingen&z=16&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=48.9455807,9.0985454',
  facebook: 'https://www.facebook.com/Hydrographiques',
  instagram: 'https://www.instagram.com/chaari.auto/',
  tiktok: 'https://www.tiktok.com/@chaari.auto',
  mobileDe: 'https://www.mobile.de/',
}

/** Logo: the car from the owner's artwork (../../brand/logo-source.webp, built by scripts/make-logo.mjs), without its
 *  wordmark; the site sets CHAARI AUTO beside it as text (owner's choice, 2026-10-04). */
export const logo = {
  mark: '/logo/mark-96.webp',
  markSet: '/logo/mark-96.webp 122w, /logo/mark-192.webp 244w, /logo/mark-384.webp 488w',
  markW: 122,
  markH: 96,
}

export const wa = (text?: string) => `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** The positioning shown at the top of the page (owner's notes). */
export const positioning: { key: string; text: L }[] = [
  { key: 'stuttgart', text: { fr: 'Basé dans la région de Stuttgart, Allemagne', en: 'Based in the Stuttgart region, Germany' } },
  { key: 'export', text: { fr: 'Export international, dont la Tunisie', en: 'International export, including Tunisia' } },
  { key: 'maintenance', text: { fr: 'Entretien automobile', en: 'Car maintenance' } },
  { key: 'shipping', text: { fr: 'Expédition internationale de véhicules', en: 'International vehicle shipping' } },
]

/** The process, as the owner wants it (2026-10-04): steps 01–04 are theirs; 05 is the business's original last step. */
export const steps: { n: string; title: L }[] = [
  { n: '01', title: { fr: 'Choisissez votre voiture sur Mobile.de ou dans notre stock disponible', en: 'Choose your car on Mobile.de or from our available stock' } },
  { n: '02', title: { fr: 'Toutes les démarches administratives nécessaires', en: 'All the necessary administrative procedures' } },
  { n: '03', title: { fr: 'Carte grise au nom du propriétaire', en: 'Registration document (carte grise) in the owner’s name' } },
  { n: '04', title: { fr: 'Assurance internationale, couverture Tunisie incluse', en: 'International insurance, including cover for Tunisia' } },
  { n: '05', title: { fr: 'Gestion complète jusqu’à la livraison', en: 'Full management through to delivery' } },
]

/** "Nos services": the three lines of business. */
export const services: { key: string; title: L; text: L }[] = [
  {
    key: 'export',
    title: { fr: 'Export de voitures', en: 'Car export' },
    text: {
      fr: 'Achat de votre voiture en Europe et export vers la France, les pays du Golfe, les pays africains, le Canada et la Tunisie.',
      en: 'We buy your car in Europe and export it to France, the Gulf countries, African countries, Canada and Tunisia.',
    },
  },
  {
    key: 'maintenance',
    title: { fr: 'Entretien automobile', en: 'Car maintenance' },
    text: {
      fr: 'Un service d’entretien pour votre voiture. Écrivez-nous sur WhatsApp pour prendre rendez-vous.',
      en: 'A maintenance service for your car. Message us on WhatsApp to book.',
    },
  },
  {
    key: 'shipping',
    title: { fr: 'Expédition internationale', en: 'International shipping' },
    text: {
      fr: 'Expédition de votre véhicule depuis le port de Gênes (Italie) vers les destinations internationales.',
      en: 'Your vehicle shipped from the port of Genoa (Italy) to international destinations.',
    },
  },
]

/** Shipping and delivery. The two delays are left empty until the owner confirms them per destination and method
 *  (owner's notes: "delivery to Paris within 3 hours (if operationally accurate)", "from 24 hours" for the Gulf "should
 *  be verified before publishing"). Set e.g. gulfFrom: { fr: '24 heures', en: '24 hours' } to publish it. */
export const shipping = {
  port: { fr: 'Gênes, Italie', en: 'Genoa, Italy' } as L,
  parisWithin: null as L | null,
  gulfFrom: null as L | null,
}

/** Main customer markets, approximate shares from the owner (message of 2026-10-04: "à peu près 75% France, 10% Golf,
 *  5% Afrique 5%, rest 5%"; the unnamed 5 % is read as Canada, the one market of the first list it does not name).
 *  Order = largest first. */
export type MarketKey = 'tunisia' | 'france' | 'canada' | 'gulf' | 'africa'
export const markets: { key: MarketKey; share: number; name: L }[] = [
  { key: 'france', share: 75, name: { fr: 'France', en: 'France' } },
  { key: 'gulf', share: 10, name: { fr: 'Pays du Golfe', en: 'Gulf countries' } },
  { key: 'africa', share: 5, name: { fr: 'Pays africains', en: 'African countries' } },
  { key: 'canada', share: 5, name: { fr: 'Canada', en: 'Canada' } },
  { key: 'tunisia', share: 5, name: { fr: 'Tunisie et autres pays', en: 'Tunisia and other countries' } },
]
export const destinations: L[] = [
  { fr: 'France', en: 'France' },
  { fr: 'Pays du Golfe', en: 'Gulf countries' },
  { fr: 'Pays africains', en: 'African countries' },
  { fr: 'Canada', en: 'Canada' },
  { fr: 'Tunisie', en: 'Tunisia' },
]

// Hero: Google Maps photo of a black Mercedes GLC Coupé with the CHAARI AUTO plate (owner to confirm the Maps photos are theirs).
export const hero = { id: 'hero' as PhotoKey, alt: { fr: 'Mercedes GLC Coupé noir vu de trois quarts avant, avec la plaque CHAARI AUTO', en: 'Black Mercedes GLC Coupé, front three-quarter view, with the CHAARI AUTO plate' } as L }
export const cta = { id: 'cta' as PhotoKey, alt: { fr: 'Cupra Formentor gris avec la plaque CHAARI AUTO', en: 'Grey Cupra Formentor with the CHAARI AUTO plate' } as L }

// ---------- Request form (no backend: builds a WhatsApp message) ----------
export const form = {
  fuels: [
    { fr: 'Peu importe', en: 'Any' }, { fr: 'Essence', en: 'Petrol' }, { fr: 'Diesel', en: 'Diesel' },
    { fr: 'Hybride', en: 'Hybrid' }, { fr: 'Électrique', en: 'Electric' },
  ] as L[],
  gearboxes: [{ fr: 'Peu importe', en: 'Any' }, { fr: 'Automatique', en: 'Automatic' }, { fr: 'Manuelle', en: 'Manual' }] as L[],
  greeting: { fr: 'Bonjour Chaari Auto, je cherche une voiture en Europe.', en: 'Hello Chaari Auto, I am looking for a car in Europe.' } as L,
}
/** fuel and gearbox are indexes into form.fuels / form.gearboxes (0 = any). */
export type Request = { link: string; model: string; open: boolean; year: string; fuel: number; gearbox: number; budget: string; country: string; city: string; name: string }
export function requestMessage(r: Request, l: Lang) {
  const fr = l === 'fr'
  const lines = [form.greeting[l]]
  const sep = fr ? ' : ' : ': '
  const add = (k: string, v: string) => { if (v.trim()) lines.push(`${k}${sep}${v.trim()}`) }
  add(fr ? 'Annonce Mobile.de' : 'Mobile.de listing', r.link)
  add(fr ? 'Modèle' : 'Model', r.model || (r.open && !r.link.trim() ? (fr ? 'ouvert(e) aux suggestions' : 'open to suggestions') : ''))
  if (r.open && (r.model.trim() || r.link.trim())) lines.push(fr ? 'Ouvert(e) aux suggestions' : 'Open to suggestions')
  add(fr ? 'Année' : 'Year', r.year)
  add(fr ? 'Carburant' : 'Fuel', r.fuel ? form.fuels[r.fuel][l] : '')
  add(fr ? 'Boîte' : 'Gearbox', r.gearbox ? form.gearboxes[r.gearbox][l] : '')
  add('Budget', r.budget)
  add(fr ? 'Je réside en' : 'I live in', r.country)
  add(fr ? 'Livraison à' : 'Delivery to', r.city)
  add(fr ? 'Nom' : 'Name', r.name)
  return lines.join('\n')
}

// ---------- Delivered / exported cars ("Export pour la Tunisie") ----------
// kind 'client': the post says "Félicitations <client>" (the client's name is never shown).
// kind 'export': "Export pour la Tunisie", status unknown (owner to confirm). Never shown as available, no price.
// kind 'maps': a photo on the business's Google Maps profile, no caption and no date → model only (from the badge), no year.
export type Car = {
  id: string
  make: string
  model: string
  year: string | null
  kind: 'client' | 'export' | 'maps'
  date: string | null // post date, ISO (null for Google Maps photos)
  source: 'Instagram' | 'Facebook' | 'Google Maps'
  url: string
  specs: [string, string][] // only what the post states (French; see `terms` for English)
  photos: number // photos/<id>-1 … -N
  alts: string[]
  altsEn: string[]
  schema: { bodyType?: string }
}

export const deliveries: Car[] = [
  {
    id: 'mercedes-c-noire-2024', make: 'Mercedes', model: 'C AMG', year: '2024', kind: 'client', date: '2026-02-19', source: 'Instagram',
    url: 'https://www.instagram.com/reel/DU89Uu-Ci5J/', specs: [['Équipement', 'Toutes options']], photos: 5, schema: { bodyType: 'Berline' },
    alts: ['Mercedes Classe C noire vue de trois quarts avant', 'Mercedes Classe C noire vue de profil arrière', 'Mercedes Classe C noire vue arrière', 'Poste de conduite de la Mercedes Classe C', 'Contre-porte de la Mercedes Classe C'],
    altsEn: ['Black Mercedes C-Class, front three-quarter view', 'Black Mercedes C-Class, rear side view', 'Black Mercedes C-Class, rear view', 'Mercedes C-Class cockpit', 'Mercedes C-Class door panel'],
  },
  {
    id: 'mercedes-gle53-2026', make: 'Mercedes', model: 'GLE 53 AMG', year: '2026', kind: 'export', date: '2026-02-12', source: 'Instagram',
    url: 'https://www.instagram.com/p/DUq2W_rCtjm/', specs: [['Kilométrage', 'Zéro kilométrage'], ['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Mercedes GLE 53 AMG noir vue de face, plaque CHAARI AUTO', 'Mercedes GLE 53 AMG noir vue de trois quarts avant', 'Mercedes GLE 53 AMG noir vue de profil', 'Mercedes GLE 53 AMG noir vue arrière', 'Poste de conduite du Mercedes GLE 53 AMG', 'Sièges avant du Mercedes GLE 53 AMG'],
    altsEn: ['Black Mercedes GLE 53 AMG, front view, CHAARI AUTO plate', 'Black Mercedes GLE 53 AMG, front three-quarter view', 'Black Mercedes GLE 53 AMG, side view', 'Black Mercedes GLE 53 AMG, rear view', 'Mercedes GLE 53 AMG cockpit', 'Mercedes GLE 53 AMG front seats'],
  },
  {
    id: 'mercedes-glb-2024', make: 'Mercedes', model: 'GLB AMG', year: '2024', kind: 'export', date: '2026-01-30', source: 'Instagram',
    url: 'https://www.instagram.com/p/DUJWgVeCp7R/', specs: [['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Mercedes GLB gris argent vue de face, plaque CHAARI AUTO', 'Mercedes GLB gris argent vue de trois quarts avant', 'Mercedes GLB gris argent vue de profil arrière', 'Mercedes GLB gris argent vue arrière', 'Poste de conduite du Mercedes GLB', 'Sièges avant du Mercedes GLB'],
    altsEn: ['Silver Mercedes GLB, front view, CHAARI AUTO plate', 'Silver Mercedes GLB, front three-quarter view', 'Silver Mercedes GLB, rear side view', 'Silver Mercedes GLB, rear view', 'Mercedes GLB cockpit', 'Mercedes GLB front seats'],
  },
  {
    id: 'vw-tiguan-2022', make: 'Volkswagen', model: 'Tiguan', year: '2022', kind: 'export', date: '2026-01-20', source: 'Instagram',
    url: 'https://www.instagram.com/p/DTvZu5rClVV/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options']], photos: 5, schema: { bodyType: 'SUV' },
    alts: ['Volkswagen Tiguan gris argent vue de face, plaque CHAARI AUTO', 'Volkswagen Tiguan gris argent vue de trois quarts avant', 'Volkswagen Tiguan gris argent vue de profil', 'Volkswagen Tiguan gris argent vue arrière', 'Poste de conduite du Volkswagen Tiguan'],
    altsEn: ['Silver Volkswagen Tiguan, front view, CHAARI AUTO plate', 'Silver Volkswagen Tiguan, front three-quarter view', 'Silver Volkswagen Tiguan, side view', 'Silver Volkswagen Tiguan, rear view', 'Volkswagen Tiguan cockpit'],
  },
  {
    id: 'toyota-rav4-2021', make: 'Toyota', model: 'RAV 4', year: '2021', kind: 'client', date: '2026-01-10', source: 'Instagram',
    url: 'https://www.instagram.com/p/DTV9iGUiqtD/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Toyota RAV 4 noir vue de face, plaque CHAARI AUTO', 'Toyota RAV 4 noir vue de trois quarts avant', 'Toyota RAV 4 noir vue de trois quarts arrière', 'Toyota RAV 4 noir vue arrière', 'Sièges avant du Toyota RAV 4', 'Console centrale du Toyota RAV 4'],
    altsEn: ['Black Toyota RAV 4, front view, CHAARI AUTO plate', 'Black Toyota RAV 4, front three-quarter view', 'Black Toyota RAV 4, rear three-quarter view', 'Black Toyota RAV 4, rear view', 'Toyota RAV 4 front seats', 'Toyota RAV 4 centre console'],
  },
  {
    id: 'audi-q3-sportback-2023', make: 'Audi', model: 'Q3 Sportback S-line', year: '2023', kind: 'export', date: '2025-12-24', source: 'Instagram',
    url: 'https://www.instagram.com/p/DSpdZnOii7j/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Audi Q3 Sportback noire vue de face, plaque CHAARI AUTO', 'Audi Q3 Sportback noire vue de trois quarts avant', 'Audi Q3 Sportback noire vue de trois quarts arrière', 'Audi Q3 Sportback noire vue arrière', 'Tableau de bord de l’Audi Q3 Sportback', 'Sièges avant de l’Audi Q3 Sportback'],
    altsEn: ['Black Audi Q3 Sportback, front view, CHAARI AUTO plate', 'Black Audi Q3 Sportback, front three-quarter view', 'Black Audi Q3 Sportback, rear three-quarter view', 'Black Audi Q3 Sportback, rear view', 'Audi Q3 Sportback dashboard', 'Audi Q3 Sportback front seats'],
  },
  {
    id: 'mercedes-glc220d-coupe-2021', make: 'Mercedes', model: 'GLC 220 Coupé AMG', year: '2021', kind: 'export', date: '2025-12-20', source: 'Instagram',
    url: 'https://www.instagram.com/p/DSfeYHEioEu/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options'], ['Finition', 'AMG line']], photos: 6, schema: { bodyType: 'SUV coupé' },
    alts: ['Mercedes GLC Coupé gris mat vue de face, plaque CHAARI AUTO', 'Mercedes GLC Coupé gris mat vue de trois quarts avant', 'Mercedes GLC Coupé gris mat vue de profil', 'Mercedes GLC Coupé gris mat vue de trois quarts arrière', 'Mercedes GLC Coupé gris mat vue arrière', 'Poste de conduite du Mercedes GLC Coupé'],
    altsEn: ['Matte grey Mercedes GLC Coupé, front view, CHAARI AUTO plate', 'Matte grey Mercedes GLC Coupé, front three-quarter view', 'Matte grey Mercedes GLC Coupé, side view', 'Matte grey Mercedes GLC Coupé, rear three-quarter view', 'Matte grey Mercedes GLC Coupé, rear view', 'Mercedes GLC Coupé cockpit'],
  },
  {
    id: 'maps-range-rover-sport', make: 'Range Rover', model: 'Sport', year: null, kind: 'maps', date: null, source: 'Google Maps',
    url: 'https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b', specs: [], photos: 1, schema: { bodyType: 'SUV' },
    alts: ['Range Rover Sport vert vu de profil'],
    altsEn: ['Green Range Rover Sport, side view'],
  },
  {
    id: 'maps-mercedes-cla', make: 'Mercedes', model: 'CLA', year: null, kind: 'maps', date: null, source: 'Google Maps',
    url: 'https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b', specs: [], photos: 1, schema: { bodyType: 'Coupé 4 portes' },
    alts: ['Mercedes CLA gris mat vue de trois quarts arrière'],
    altsEn: ['Matte grey Mercedes CLA, rear three-quarter view'],
  },
]

/** Cars offered for sale. The business has never posted one ("à vendre"/"disponible"), so this stays empty and
 *  the ForSale section is not rendered. If one is added: only cars from the last ~3–4 months, never a sold one,
 *  price only as published (else null → "Prix sur demande"), and bump `forSaleDate`. */
export type SaleCar = Car & { price: number | null; currency: 'EUR' | 'TND' | null }
export const forSale: SaleCar[] = []
export const forSaleDate = { iso: '' }

/** English for the few spec words the posts use. */
const terms: Record<string, string> = {
  Kilométrage: 'Mileage', 'Zéro kilométrage': 'Zero mileage', 'Faible kilométrage': 'Low mileage',
  Équipement: 'Equipment', 'Toutes options': 'Fully loaded', Finition: 'Trim',
}
export const term = (s: string, l: Lang) => (l === 'en' ? terms[s] ?? s : s)

export const carName = (c: Car) => `${c.make} ${c.model}`
export const carTitle = (c: Car) => (c.year ? `${carName(c)} · ${c.year}` : carName(c))
export const carPhoto = (c: Car, n: number) => `${c.id}-${n}` as PhotoKey
export const carAlts = (c: Car, l: Lang) => (l === 'en' ? c.altsEn : c.alts)
export const specSheet = (c: Car, l: Lang): [string, string][] => {
  const fr = l === 'fr'
  return [
    [fr ? 'Modèle' : 'Model', carName(c)],
    ...(c.year ? [[fr ? 'Année' : 'Year', fr ? `Modèle ${c.year}` : `${c.year} model`] as [string, string]] : []),
    ...c.specs.map(([k, v]) => [term(k, l), term(v, l)] as [string, string]),
    ...(c.date ? [[fr ? 'Publié le' : 'Posted on', fmtDate(c.date, l)] as [string, string]] : []),
    ['Source', c.kind === 'maps' ? (fr ? 'Photo du profil Google Maps' : 'Photo from the Google Maps profile') : c.source],
  ]
}
export const waCar = (c: Car, l: Lang) =>
  wa(l === 'fr'
    ? c.kind === 'maps'
      ? `Bonjour Chaari Auto, j’ai vu la photo de la ${carName(c)} sur votre profil Google Maps. Je cherche une voiture de ce type, pouvez-vous me renseigner ?`
      : `Bonjour Chaari Auto, j’ai vu la ${carName(c)} (${c.year}) publiée le ${fmtDate(c.date, l)} sur votre page. Je cherche une voiture de ce type, pouvez-vous me renseigner ?`
    : c.kind === 'maps'
      ? `Hello Chaari Auto, I saw the photo of the ${carName(c)} on your Google Maps profile. I am looking for a car like this, can you help me?`
      : `Hello Chaari Auto, I saw the ${carName(c)} (${c.year}) you posted on ${fmtDate(c.date, l)}. I am looking for a car like this, can you help me?`)
/** "Publié le 12/02/2026 · Instagram", or "Photo · Google Maps" when the photo has no date. */
export const carMeta = (c: Car, l: Lang) => (c.date ? `${l === 'fr' ? 'Publié le' : 'Posted'} ${fmtDate(c.date, l)} · ${c.source}` : `Photo · ${c.source}`)

// ---------- Videos (FB reels, trimmed, audio removed, the business's own overlays kept) ----------
export type Video = { id: string; file: string; poster: PhotoKey; w: number; h: number; duration: number; carId: string; postUrl: string; uploadDate: string; segment: number[] }
export const videos: Video[] = videoMeta.map((v) => ({ ...v, poster: v.poster as PhotoKey }))
const videoCaptions: Record<string, { name: string; year: string }> = {
  'mercedes-gle-2023': { name: 'Mercedes GLE AMG', year: '2023' },
  'jeep-renegade-2024': { name: 'Jeep Renegade', year: '2024' },
  'bmw-xm-2026': { name: 'BMW XM', year: '2026' },
  'audi-q5-2024': { name: 'Audi Q5 S-line', year: '2024' },
  'suzuki-across-2026': { name: 'Suzuki Across', year: '2026' },
}
export const videoCaption = (v: Video, l: Lang) => {
  const c = videoCaptions[v.carId]
  return l === 'fr' ? `${c.name} · Modèle ${c.year}` : `${c.name} · ${c.year} model`
}
/** Newest first is how the owner posts; the row reads oldest → newest like the Stitch design. */
export const videoOrder = [...videos].sort((a, b) => a.uploadDate.localeCompare(b.uploadDate))

// ---------- Google reviews (verbatim French excerpts, all 5 stars; English = our translation, labelled as such) ----------
export const reviews: { text: L; author: string }[] = [
  {
    text: {
      fr: 'Du premier contact jusqu’à la livraison, tout s’est déroulé de manière fluide et professionnelle. Mr Mohamed Chaari a été à l’écoute, transparent et de très bon conseil.',
      en: 'From the first contact to delivery, everything went smoothly and professionally. Mr Mohamed Chaari listened, was transparent and gave very good advice.',
    },
    author: 'mohamed walha',
  },
  {
    text: {
      fr: 'La communication a toujours été claire, les documents d’export parfaitement préparés, et la voiture était strictement conforme à la description.',
      en: 'Communication was always clear, the export documents were perfectly prepared, and the car matched the description exactly.',
    },
    author: 'nourelesslem badra',
  },
  {
    text: {
      fr: 'Ils m’ont apporté une aide précieuse dans la préparation de l’ensemble du dossier, rendant des démarches parfois complexes beaucoup plus simples et accessibles.',
      en: 'They gave me invaluable help preparing the whole file, making sometimes complex procedures much simpler and easier.',
    },
    author: 'Trigui Kawthar',
  },
  {
    text: {
      fr: 'Retour d’expérience suite à deux opérations d’acquisition de voitures Mercedes depuis l’Allemagne (2023 et 2025): Mohamed est professionnel et honnête, il assure un accompagnement et un service parfait.',
      en: 'Feedback after buying two Mercedes cars from Germany (2023 and 2025): Mohamed is professional and honest, and provides perfect support and service.',
    },
    author: 'Kais KAMMOUN',
  },
]

export const faq: { q: L; a: L }[] = [
  {
    q: { fr: 'Quels services proposez-vous ?', en: 'What services do you offer?' },
    a: {
      fr: 'L’export de voitures d’Europe vers l’international (dont la Tunisie), l’entretien automobile et l’expédition internationale de véhicules depuis le port de Gênes (Italie).',
      en: 'Car export from Europe to international destinations (including Tunisia), car maintenance, and international vehicle shipping from the port of Genoa (Italy).',
    },
  },
  {
    q: { fr: 'Comment se passe l’achat ?', en: 'How does buying work?' },
    a: {
      fr: 'Vous choisissez votre voiture sur Mobile.de ou dans notre stock disponible. Nous effectuons toutes les démarches administratives nécessaires, la carte grise au nom du propriétaire et l’assurance internationale (couverture Tunisie incluse), et nous gérons tout jusqu’à la livraison.',
      en: 'You choose your car on Mobile.de or from our available stock. We handle all the necessary administrative procedures, the registration document in the owner’s name and international insurance (including cover for Tunisia), and we manage everything through to delivery.',
    },
  },
  {
    q: { fr: 'Puis-je vous envoyer une annonce Mobile.de ?', en: 'Can I send you a Mobile.de listing?' },
    a: {
      fr: 'Oui : collez le lien dans le formulaire « Votre demande » ou envoyez-le sur WhatsApp au +49 177 8629077.',
      en: 'Yes: paste the link into the “Your request” form or send it on WhatsApp to +49 177 8629077.',
    },
  },
  {
    q: { fr: 'Vers quels pays exportez-vous ?', en: 'Which countries do you export to?' },
    a: {
      fr: 'La France, les pays du Golfe, les pays africains, le Canada et la Tunisie. L’expédition internationale part du port de Gênes (Italie).',
      en: 'France, the Gulf countries, African countries, Canada and Tunisia. International shipping leaves from the port of Genoa (Italy).',
    },
  },
  {
    q: { fr: 'Depuis combien de temps exercez-vous ?', en: 'How long have you been doing this?' },
    a: { fr: 'Chaari Auto a 12 ans d’expérience dans l’export de voitures.', en: 'Chaari Auto has 12 years of experience in car export.' },
  },
  {
    q: { fr: 'Où êtes-vous situés ?', en: 'Where are you based?' },
    a: {
      fr: 'Dans la région de Stuttgart : Lindenstraße 16, 74321 Bietigheim-Bissingen, Allemagne.',
      en: 'In the Stuttgart region: Lindenstraße 16, 74321 Bietigheim-Bissingen, Germany.',
    },
  },
  {
    q: { fr: 'Comment faire une demande ?', en: 'How do I make a request?' },
    a: {
      fr: 'Sur WhatsApp au +49 177 8629077, par téléphone, ou avec le formulaire de cette page, qui prépare votre message WhatsApp.',
      en: 'On WhatsApp at +49 177 8629077, by phone, or with the form on this page, which prepares your WhatsApp message.',
    },
  },
  {
    q: { fr: 'Quels sont vos horaires ?', en: 'What are your opening hours?' },
    a: {
      fr: 'Du lundi au vendredi de 9h à 18h, le samedi de 9h à 14h. Fermé le dimanche.',
      en: 'Monday to Friday 9 am – 6 pm, Saturday 9 am – 2 pm. Closed on Sunday.',
    },
  },
]

/** Impressum / Datenschutz: only verified facts (business name, address, phone, email from its own profiles) and
 *  facts about this site (hosting, no cookies, no stored data). Nothing is invented and there are no placeholders
 *  (user decision 2026-09-30). Details the owner could add later (legal form, representative, register, VAT ID)
 *  are listed in ../../brief.md §10. */
export const legal = {
  hosting: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA',
  authority: 'Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg',
}
