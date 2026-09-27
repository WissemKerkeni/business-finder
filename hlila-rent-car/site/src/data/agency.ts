// Single source of truth for every fact on the site. Sources: Google Maps profile, the agency's
// Facebook page and Instagram (@hlila_rentcar_monastir). See ../../brief.md for dates and conflicts.
import photoMeta from './photos.json' with { type: 'json' }

export type PhotoKey = keyof typeof photoMeta

export const photos = photoMeta as Record<PhotoKey, { w: number; h: number; widths: number[] }>

export const photoSrc = (id: PhotoKey, w?: number) => {
  const ws = photos[id].widths
  const best = w ? ws.filter((x) => x <= w).pop() ?? ws[0] : ws[ws.length - 1]
  return `/photos/${id}-${best}.webp`
}
export const photoSrcSet = (id: PhotoKey) => photos[id].widths.map((w) => `/photos/${id}-${w}.webp ${w}w`).join(', ')

export const agency = {
  name: 'Hlila Rent Car',
  tagline: 'Location de voitures',
  owner: 'Aymen Hlila',
  summary:
    'Hlila Rent Car est une agence de location de voitures à Monastir (Tunisie) : citadines, berlines et SUV en boîte manuelle ou automatique, livraison à l’aéroport et transferts sur toute la Tunisie sur demande.',
  whatsapp: '21624200450',
  phone: '+216 24 200 450',
  phoneE164: '+21624200450',
  phone2: '+216 58 900 450',
  phone2E164: '+21658900450',
  email: 'hlilarentcar@gmail.com',
  address: {
    street: 'Derrière la municipalité',
    locality: 'Monastir',
    postalCode: '5000',
    region: 'Monastir',
    regionCode: 'TN-52',
    country: 'TN',
    countryName: 'Tunisie',
  },
  plusCode: 'QRFM+F9 Monastir',
  geo: { lat: 35.7737102, lng: 10.8334399 },
  hoursText: 'Ouvert tous les jours, 24h/24',
  rating: { value: 5.0, count: 34, distribution: [34, 0, 0, 0, 0] },
  mapsUrl: 'https://www.google.com/maps?cid=7663601000825115734',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=35.7737102,10.8334399&z=17&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=35.7737102,10.8334399',
  facebook: 'https://www.facebook.com/people/Hlila-Rent-Car/61561616923566/',
  instagram: 'https://www.instagram.com/hlila_rentcar_monastir/',
  instagramHandle: '@hlila_rentcar_monastir',
}

export const wa = (text?: string) =>
  `https://wa.me/${agency.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export type Category = 'suv' | 'city' | 'sedan'

export type Car = {
  model: string
  category: Category
  /** Only what the agency stated (Nov 2024 flyers). */
  transmission?: 'Automatique' | 'Manuelle' | 'Automatique ou manuelle'
  bodyLabel: string
  photos: { id: PhotoKey; alt: string }[]
}

/** Current lineup = Instagram carousel of 12 Feb 2026. No prices are published: every car is "prix sur demande". */
export const fleet: Car[] = [
  { model: 'MG ZS', category: 'suv', transmission: 'Automatique', bodyLabel: 'SUV', photos: [
    { id: 'mgzs', alt: 'MG ZS noir sous l’abri de l’agence Hlila Rent Car' },
    { id: 'mgzsStreet', alt: 'MG ZS noir dans une rue de Monastir' },
    { id: 'mgzsRear', alt: 'MG ZS noir, vue arrière, centre de Monastir' },
  ] },
  { model: 'MG5', category: 'sedan', transmission: 'Automatique ou manuelle', bodyLabel: 'Berline', photos: [
    { id: 'mg5', alt: 'MG5 grise sous l’abri de l’agence' },
  ] },
  { model: 'Seat Arona', category: 'suv', transmission: 'Automatique', bodyLabel: 'SUV', photos: [
    { id: 'arona', alt: 'Seat Arona blanc de Hlila Rent Car' },
  ] },
  { model: 'Seat Ibiza', category: 'city', transmission: 'Automatique ou manuelle', bodyLabel: 'Citadine', photos: [
    { id: 'ibiza', alt: 'Seat Ibiza blanche, vue avant' },
    { id: 'ibizaDuo', alt: 'Seat Ibiza noire et blanche avec l’autocollant Hlila' },
    { id: 'ibizaBlack', alt: 'Seat Ibiza noire' },
  ] },
  { model: 'Skoda Fabia', category: 'city', transmission: 'Manuelle', bodyLabel: 'Citadine', photos: [
    { id: 'fabia', alt: 'Deux Skoda Fabia blanches' },
    { id: 'fabiaBlack', alt: 'Deux Skoda Fabia noires' },
    { id: 'fabiaTrio', alt: 'Skoda Fabia grise, noire et bleue' },
  ] },
  { model: 'Mahindra XUV300', category: 'suv', bodyLabel: 'SUV', photos: [
    { id: 'xuv300', alt: 'Mahindra XUV300 blanc, vue avant' },
    { id: 'xuv300Palms', alt: 'Mahindra XUV300 blanc sous les palmiers' },
  ] },
  { model: 'Hyundai i20', category: 'city', transmission: 'Manuelle', bodyLabel: 'Citadine', photos: [
    { id: 'i20', alt: 'Hyundai i20 noire, vue avant' },
    { id: 'i20Trio', alt: 'Hyundai i20 rouge et blanche' },
  ] },
  { model: 'Hyundai i10', category: 'city', transmission: 'Manuelle', bodyLabel: 'Citadine', photos: [
    { id: 'i10', alt: 'Hyundai Grand i10 blanche' },
  ] },
  { model: 'Skoda Kushaq', category: 'suv', transmission: 'Automatique', bodyLabel: 'SUV', photos: [] },
  { model: 'Skoda Scala', category: 'city', bodyLabel: 'Compacte', photos: [] },
]

export const specLine = (c: Car) =>
  [c.bodyLabel, c.transmission && (c.transmission.includes(' ou ') ? c.transmission : `Boîte ${c.transmission.toLowerCase()}`)]
    .filter(Boolean)
    .join(' · ')

export const isAuto = (c: Car) => c.transmission?.startsWith('Automatique') ?? false

export const filters = [
  { key: 'all', label: 'Tous' },
  { key: 'suv', label: 'SUV' },
  { key: 'city', label: 'Citadines & compactes' },
  { key: 'sedan', label: 'Berline' },
  { key: 'auto', label: 'Automatique' },
] as const
export type FilterKey = (typeof filters)[number]['key']

export const matches = (c: Car, f: FilterKey) => f === 'all' || (f === 'auto' ? isAuto(c) : c.category === f)

/** Pick-up options for the request bar: only what the agency states. */
export const pickups = [
  { value: 'agence', label: 'Agence — Monastir', phrase: 'l’agence de Monastir' },
  { value: 'aeroport', label: 'Aéroport', phrase: 'l’aéroport' },
  { value: 'autre', label: 'Autre adresse', phrase: '' },
]

export const steps = [
  { n: '01', title: 'Choisissez une voiture', text: 'Parcourez la flotte ou indiquez simplement vos dates.' },
  { n: '02', title: 'Envoyez votre demande', text: 'Le bouton ouvre WhatsApp avec votre message prêt à envoyer.' },
  { n: '03', title: 'Confirmez les détails', text: 'L’agence vous répond pour la disponibilité, le prix et la remise des clés.' },
]

export const delivery = [
  { label: 'Agence', text: 'Monastir, derrière la municipalité' },
  { label: 'Aéroport', text: 'Livraison et restitution à l’aéroport sur demande' },
  { label: 'Toute la Tunisie', text: 'Transferts sur demande' },
]

export const gallery: { id: PhotoKey; alt: string; span: string }[] = [
  { id: 'fabiaTrio', alt: 'Skoda Fabia de la flotte Hlila Rent Car', span: 'lg:col-span-8 lg:row-span-2' },
  { id: 'mgzsRear', alt: 'MG ZS noir devant les arcades du centre de Monastir', span: 'lg:col-span-4' },
  { id: 'interior', alt: 'Intérieur MG avec toit panoramique', span: 'lg:col-span-4' },
  { id: 'xuv300Palms', alt: 'Mahindra XUV300 blanc sous les palmiers', span: 'lg:col-span-4' },
  { id: 'ibizaDuo', alt: 'Seat Ibiza avec l’autocollant Hlila Rent Car', span: 'lg:col-span-4' },
  { id: 'i20Trio', alt: 'Hyundai i20 rouge et blanche', span: 'lg:col-span-4' },
]

/** Verbatim Google reviews (all 5★). */
export const reviews = [
  { author: 'Hamza Gaddour', when: 'il y a 4 semaines', text: 'J’ai réservé la voiture 1 semaine à l’avance et je l’est trouvé devant l’aéroport à l’heure ! Je suis très satisfait du véhicule très propre moderne et le chef d’agence était très professionnel.' },
  { author: 'Younes Bouzguenda', when: 'il y a 10 mois', text: 'Service impeccable ! Le véhicule était propre, récent et conforme à la réservation. Le personnel a été très professionnel et rapide aussi bien lors de la prise en charge que du retour.' },
  { author: 'Houssem Benmahmoud', badge: 'Local Guide', when: 'il y a un an', text: 'Service impeccable chez Hlila Rent Car ! Merci à Aymen pour sa communication claire, sa disponibilité et son professionnalisme. Je recommande vivement !' },
  { author: 'Aymen Zaier', badge: 'Local Guide', when: 'il y a 11 mois', text: 'Très bon service , j’ai récupéré la voiture à l’aéroport et je l’ai déposé à l’aéroport. Aucun problème particulier. Le personnel est très aimable et arrangeant…' },
  { author: 'damien verrier', when: 'il y a 10 mois', text: 'Accueil chaleureux professionnel compétent nous recommandons vivement' },
  { author: 'Marwa Belaazi', when: 'il y a 8 mois', text: 'Une agence professionnelle avec des prix raisonnables👏' },
]

/** Written only from published facts. */
export const faq = [
  { q: 'Comment réserver une voiture chez Hlila Rent Car ?', a: `Envoyez votre demande sur WhatsApp au ${agency.phone} avec le modèle, les dates et le lieu de prise en charge. L’agence vous répond pour la disponibilité et le prix.` },
  { q: 'Quels sont les prix de location ?', a: 'Les prix ne sont pas publiés en ligne : ils sont donnés sur demande, selon le modèle, les dates et la durée (location courte ou longue durée).' },
  { q: 'Peut-on récupérer la voiture à l’aéroport ?', a: 'Oui, l’agence propose la livraison et la restitution à l’aéroport sur demande. Précisez-le dans votre message.' },
  { q: 'Y a-t-il des voitures automatiques ?', a: 'Oui : MG ZS, Seat Arona et Skoda Kushaq en boîte automatique, MG5 et Seat Ibiza en automatique ou manuelle.' },
  { q: 'Où se trouve l’agence ?', a: `À Monastir, derrière la municipalité (${agency.plusCode}). Téléphone : ${agency.phone} ou ${agency.phone2}.` },
]
