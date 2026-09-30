// Single source of truth for every fact on the site. Sources: the business's own Instagram (@chaari.auto), Facebook
// page (facebook.com/Hydrographiques), TikTok bio and Google Maps profile. See ../../brief.md for evidence, dates and
// the owner-to-confirm list. Copy only what the business states. Never add customs, transport, delays, prices or
// guarantees: the business does not state them.
import photoMeta from './photos.json' with { type: 'json' }
import videoMeta from './videos.json' with { type: 'json' }

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
  // Verbatim from the business's captions and Google Maps description.
  tagline: 'Spécialiste de l’exportation de voitures d’Europe vers la Tunisie.',
  intro: 'Tunisiens résidant à l’étranger, nous vous proposons un service clé en main pour acheter votre voiture de rêve sans aucune difficulté !',
  // Facebook / Instagram bio: "Export de voiture de l'europe vers la Tunisie et la France". TikTok also lists Algeria (owner to confirm).
  destinations: 'la Tunisie et la France',
  audience: 'Tunisiens résidant à l’étranger',
  whatsapp: '491778629077',
  phone: '+49 177 8629077',
  phoneE164: '+491778629077',
  email: 'chaariauto@gmail.com',
  address: {
    street: 'Lindenstraße 16',
    postalCode: '74321',
    locality: 'Bietigheim-Bissingen',
    country: 'DE',
    countryName: 'Allemagne',
    regionCode: 'DE-BW',
  },
  geo: { lat: 48.9455807, lng: 9.0985454 },
  plusCode: 'W3WX+6C Bietigheim-Bissingen',
  // Google Maps, 2026-09-29.
  hours: [
    { days: 'Lundi – vendredi', time: '9h – 18h', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: 'Samedi', time: '9h – 14h', schema: ['Saturday'], opens: '09:00', closes: '14:00' },
    { days: 'Dimanche', time: 'Fermé', schema: [], opens: '', closes: '' },
  ],
  hoursShort: 'Lun–Ven 9h–18h · Sam 9h–14h',
  rating: { value: 5.0, count: 89 },
  mapsUrl: 'https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b',
  reviewsUrl: 'https://www.google.com/search?q=CHAARI+AUTO+Bietigheim-Bissingen&hl=fr#lrd=0x4799d534da3bde8b:0xef513e9a96efbc1b,1,,,,',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=CHAARI%20AUTO%2C%20Lindenstra%C3%9Fe%2016%2C%2074321%20Bietigheim-Bissingen&z=16&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=48.9455807,9.0985454',
  facebook: 'https://www.facebook.com/Hydrographiques',
  instagram: 'https://www.instagram.com/chaari.auto/',
  tiktok: 'https://www.tiktok.com/@chaari.auto',
}

export const wa = (text?: string) => `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** The service steps, verbatim ("Nos services incluent : …" on every caption and on Google Maps). */
export const steps = [
  { n: '01', title: 'Achat de votre voiture' },
  { n: '02', title: 'Préparation du dossier d’exportation' },
  { n: '03', title: 'Carte grise et assurance' },
  { n: '04', title: 'Gestion complète jusqu’à la livraison' },
]

// Hero: Google Maps photo of a black Mercedes GLC Coupé with the CHAARI AUTO plate (owner to confirm the Maps photos are theirs).
export const hero = { id: 'hero' as PhotoKey, alt: 'Mercedes GLC Coupé noir vu de trois quarts avant, avec la plaque CHAARI AUTO' }
export const cta = { id: 'cta' as PhotoKey, alt: 'Cupra Formentor gris avec la plaque CHAARI AUTO' }

// ---------- Request form (no backend: builds a WhatsApp message) ----------
export const form = {
  fuels: ['Peu importe', 'Essence', 'Diesel', 'Hybride', 'Électrique'],
  gearboxes: ['Peu importe', 'Automatique', 'Manuelle'],
  greeting: 'Bonjour Chaari Auto, je souhaite importer une voiture en Tunisie.',
}
export type Request = { model: string; open: boolean; year: string; fuel: string; gearbox: string; budget: string; country: string; city: string; name: string }
export function requestMessage(r: Request) {
  const lines = [form.greeting]
  const add = (k: string, v: string) => { if (v.trim()) lines.push(`${k} : ${v.trim()}`) }
  add('Modèle', r.model || (r.open ? 'ouvert(e) aux suggestions' : ''))
  if (r.model.trim() && r.open) lines.push('Ouvert(e) aux suggestions')
  add('Année', r.year)
  add('Carburant', r.fuel === 'Peu importe' ? '' : r.fuel)
  add('Boîte', r.gearbox === 'Peu importe' ? '' : r.gearbox)
  add('Budget', r.budget)
  add('Je réside en', r.country)
  add('Livraison à', r.city)
  add('Nom', r.name)
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
  specs: [string, string][] // only what the post states
  photos: number // photos/<id>-1 … -N
  alts: string[]
  schema: { bodyType?: string }
}

export const deliveries: Car[] = [
  {
    id: 'mercedes-c-noire-2024', make: 'Mercedes', model: 'C AMG', year: '2024', kind: 'client', date: '2026-02-19', source: 'Instagram',
    url: 'https://www.instagram.com/reel/DU89Uu-Ci5J/', specs: [['Équipement', 'Toutes options']], photos: 5, schema: { bodyType: 'Berline' },
    alts: ['Mercedes Classe C noire vue de trois quarts avant', 'Mercedes Classe C noire vue de profil arrière', 'Mercedes Classe C noire vue arrière', 'Poste de conduite de la Mercedes Classe C', 'Contre-porte de la Mercedes Classe C'],
  },
  {
    id: 'mercedes-gle53-2026', make: 'Mercedes', model: 'GLE 53 AMG', year: '2026', kind: 'export', date: '2026-02-12', source: 'Instagram',
    url: 'https://www.instagram.com/p/DUq2W_rCtjm/', specs: [['Kilométrage', 'Zéro kilométrage'], ['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Mercedes GLE 53 AMG noir vue de face, plaque CHAARI AUTO', 'Mercedes GLE 53 AMG noir vue de trois quarts avant', 'Mercedes GLE 53 AMG noir vue de profil', 'Mercedes GLE 53 AMG noir vue arrière', 'Poste de conduite du Mercedes GLE 53 AMG', 'Sièges avant du Mercedes GLE 53 AMG'],
  },
  {
    id: 'mercedes-glb-2024', make: 'Mercedes', model: 'GLB AMG', year: '2024', kind: 'export', date: '2026-01-30', source: 'Instagram',
    url: 'https://www.instagram.com/p/DUJWgVeCp7R/', specs: [['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Mercedes GLB gris argent vue de face, plaque CHAARI AUTO', 'Mercedes GLB gris argent vue de trois quarts avant', 'Mercedes GLB gris argent vue de profil arrière', 'Mercedes GLB gris argent vue arrière', 'Poste de conduite du Mercedes GLB', 'Sièges avant du Mercedes GLB'],
  },
  {
    id: 'vw-tiguan-2022', make: 'Volkswagen', model: 'Tiguan', year: '2022', kind: 'export', date: '2026-01-20', source: 'Instagram',
    url: 'https://www.instagram.com/p/DTvZu5rClVV/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options']], photos: 5, schema: { bodyType: 'SUV' },
    alts: ['Volkswagen Tiguan gris argent vue de face, plaque CHAARI AUTO', 'Volkswagen Tiguan gris argent vue de trois quarts avant', 'Volkswagen Tiguan gris argent vue de profil', 'Volkswagen Tiguan gris argent vue arrière', 'Poste de conduite du Volkswagen Tiguan'],
  },
  {
    id: 'toyota-rav4-2021', make: 'Toyota', model: 'RAV 4', year: '2021', kind: 'client', date: '2026-01-10', source: 'Instagram',
    url: 'https://www.instagram.com/p/DTV9iGUiqtD/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Toyota RAV 4 noir vue de face, plaque CHAARI AUTO', 'Toyota RAV 4 noir vue de trois quarts avant', 'Toyota RAV 4 noir vue de trois quarts arrière', 'Toyota RAV 4 noir vue arrière', 'Sièges avant du Toyota RAV 4', 'Console centrale du Toyota RAV 4'],
  },
  {
    id: 'audi-q3-sportback-2023', make: 'Audi', model: 'Q3 Sportback S-line', year: '2023', kind: 'export', date: '2025-12-24', source: 'Instagram',
    url: 'https://www.instagram.com/p/DSpdZnOii7j/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options']], photos: 6, schema: { bodyType: 'SUV' },
    alts: ['Audi Q3 Sportback noire vue de face, plaque CHAARI AUTO', 'Audi Q3 Sportback noire vue de trois quarts avant', 'Audi Q3 Sportback noire vue de trois quarts arrière', 'Audi Q3 Sportback noire vue arrière', 'Tableau de bord de l’Audi Q3 Sportback', 'Sièges avant de l’Audi Q3 Sportback'],
  },
  {
    id: 'mercedes-glc220d-coupe-2021', make: 'Mercedes', model: 'GLC 220 Coupé AMG', year: '2021', kind: 'export', date: '2025-12-20', source: 'Instagram',
    url: 'https://www.instagram.com/p/DSfeYHEioEu/', specs: [['Kilométrage', 'Faible kilométrage'], ['Équipement', 'Toutes options'], ['Finition', 'AMG line']], photos: 6, schema: { bodyType: 'SUV coupé' },
    alts: ['Mercedes GLC Coupé gris mat vue de face, plaque CHAARI AUTO', 'Mercedes GLC Coupé gris mat vue de trois quarts avant', 'Mercedes GLC Coupé gris mat vue de profil', 'Mercedes GLC Coupé gris mat vue de trois quarts arrière', 'Mercedes GLC Coupé gris mat vue arrière', 'Poste de conduite du Mercedes GLC Coupé'],
  },
  {
    id: 'maps-range-rover-sport', make: 'Range Rover', model: 'Sport', year: null, kind: 'maps', date: null, source: 'Google Maps',
    url: 'https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b', specs: [], photos: 1, schema: { bodyType: 'SUV' },
    alts: ['Range Rover Sport vert vu de profil'],
  },
  {
    id: 'maps-mercedes-cla', make: 'Mercedes', model: 'CLA', year: null, kind: 'maps', date: null, source: 'Google Maps',
    url: 'https://www.google.com/maps/place/CHAARI+AUTO/@48.9455807,9.0985454,17z/data=!4m6!3m5!1s0x4799d534da3bde8b:0xef513e9a96efbc1b', specs: [], photos: 1, schema: { bodyType: 'Coupé 4 portes' },
    alts: ['Mercedes CLA gris mat vue de trois quarts arrière'],
  },
]

/** Cars offered for sale. The business has never posted one ("à vendre"/"disponible"), so this stays empty and
 *  the ForSale section is not rendered. If one is added: only cars from the last ~3–4 months, never a sold one,
 *  price only as published (else null → "Prix sur demande"), and bump `forSaleDate`. */
export type SaleCar = Car & { price: number | null; currency: 'EUR' | 'TND' | null }
export const forSale: SaleCar[] = []
export const forSaleDate = { iso: '', fr: '' }

export const carName = (c: Car) => `${c.make} ${c.model}`
export const carTitle = (c: Car) => (c.year ? `${carName(c)} · ${c.year}` : carName(c))
export const carPhoto = (c: Car, n: number) => `${c.id}-${n}` as PhotoKey
export const frDate = (iso: string | null) => (iso ? iso.split('-').reverse().join('/') : '')
export const specSheet = (c: Car): [string, string][] => [
  ['Modèle', carName(c)],
  ...(c.year ? [['Année', `Modèle ${c.year}`] as [string, string]] : []),
  ...c.specs,
  ...(c.date ? [['Publié le', frDate(c.date)] as [string, string]] : []),
  ['Source', c.kind === 'maps' ? 'Photo du profil Google Maps' : c.source],
]
export const waCar = (c: Car) =>
  wa(c.kind === 'maps'
    ? `Bonjour Chaari Auto, j’ai vu la photo de la ${carName(c)} sur votre profil Google Maps. Je cherche une voiture de ce type, pouvez-vous me renseigner ?`
    : `Bonjour Chaari Auto, j’ai vu la ${carName(c)} (${c.year}) publiée le ${frDate(c.date)} sur votre page. Je cherche une voiture de ce type, pouvez-vous me renseigner ?`)
/** "Publié le 12/02/2026 · Instagram", or "Photo · Google Maps" when the photo has no date. */
export const carMeta = (c: Car) => (c.date ? `Publié le ${frDate(c.date)} · ${c.source}` : `Photo · ${c.source}`)

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
export const videoCaption = (v: Video) => `${videoCaptions[v.carId].name} · Modèle ${videoCaptions[v.carId].year}`
/** Newest first is how the owner posts; the row reads oldest → newest like the Stitch design. */
export const videoOrder = [...videos].sort((a, b) => a.uploadDate.localeCompare(b.uploadDate))

// ---------- Google reviews (verbatim excerpts, all 5 stars) ----------
export const reviews = [
  { text: 'Du premier contact jusqu’à la livraison, tout s’est déroulé de manière fluide et professionnelle. Mr Mohamed Chaari a été à l’écoute, transparent et de très bon conseil.', author: 'mohamed walha' },
  { text: 'La communication a toujours été claire, les documents d’export parfaitement préparés, et la voiture était strictement conforme à la description.', author: 'nourelesslem badra' },
  { text: 'Ils m’ont apporté une aide précieuse dans la préparation de l’ensemble du dossier, rendant des démarches parfois complexes beaucoup plus simples et accessibles.', author: 'Trigui Kawthar' },
  { text: 'Retour d’expérience suite à deux opérations d’acquisition de voitures Mercedes depuis l’Allemagne (2023 et 2025): Mohamed est professionnel et honnête, il assure un accompagnement et un service parfait.', author: 'Kais KAMMOUN' },
]

export const faq = [
  { q: 'Quels services sont inclus ?', a: 'Achat de votre voiture, préparation du dossier d’exportation, carte grise et assurance, et gestion complète jusqu’à la livraison.' },
  { q: 'À qui s’adresse le service ?', a: 'Aux Tunisiens résidant à l’étranger.' },
  { q: 'Vers quels pays exportez-vous ?', a: 'De l’Europe vers la Tunisie et la France.' },
  { q: 'Où êtes-vous situés ?', a: 'Lindenstraße 16, 74321 Bietigheim-Bissingen, Allemagne.' },
  { q: 'Comment faire une demande ?', a: 'Sur WhatsApp au +49 177 8629077, par téléphone, ou avec le formulaire de cette page, qui prépare votre message WhatsApp.' },
  { q: 'Quels sont vos horaires ?', a: 'Du lundi au vendredi de 9h à 18h, le samedi de 9h à 14h. Fermé le dimanche.' },
]

/** Impressum / Datenschutz: nothing here may be invented. Placeholders stay until the owner provides the details. */
export const TODO = 'À compléter par le propriétaire'
export const legal = {
  legalForm: TODO,
  representedBy: TODO,
  register: TODO,
  vatId: TODO,
  responsible: TODO,
  hosting: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA',
  retention: TODO,
}
