// Single source of truth for every fact on the site. Sources: the Google Maps profile and the agency's
// Facebook page "Top Car - Mahdia". See ../../brief.md for evidence, dates and conflicts.
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
  name: 'Top Car Mahdia',
  shortName: 'Top Car',
  tagline: 'Location de voiture',
  summary:
    'Top Car est une agence de location de voitures à Mahdia (Tunisie), avenue Taher Sfar : citadines, berlines, SUV, vans et utilitaires, avec ou sans chauffeur, ainsi que des transferts aéroport et des excursions avec chauffeur.',
  whatsapp: '21650202203',
  phone: '50 202 203',
  phoneIntl: '+216 50 202 203',
  phoneE164: '+21650202203',
  email: 'topcarmahdia@gmail.com',
  address: {
    street: 'Avenue Taher Sfar',
    locality: 'Mahdia',
    postalCode: '5111',
    region: 'Mahdia',
    regionCode: 'TN-53',
    country: 'TN',
    countryName: 'Tunisie',
  },
  plusCode: 'G352+FC Mahdia',
  geo: { lat: 35.5086681, lng: 11.0510304 },
  hours: [
    { days: 'Lundi – Samedi', time: '09:00 – 19:00' },
    { days: 'Dimanche', time: 'Fermé' },
  ],
  hoursText: 'Lun – Sam 09:00 – 19:00 · Dim fermé',
  rating: { value: 4.8, count: 54, distribution: [51, 0, 0, 0, 3] },
  mapsUrl: 'https://www.google.com/maps?cid=2909918206863715188',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=35.5086681,11.0510304&z=17&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=35.5086681,11.0510304',
  facebook: 'https://www.facebook.com/people/Top-Car-Mahdia/100092415699639/',
  slogan: 'Roulez en toute sécurité — Top Car, c’est sûr.',
}

export const wa = (text?: string) =>
  `https://wa.me/${agency.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export type Category = 'city' | 'sedan' | 'van' | 'util'

export type Car = {
  model: string
  /** Extra models grouped on one row. */
  sub?: string
  category: Category
  bodyLabel: string
  /** Only what is published: seats come from Google reviews ("van 9 places"), nothing else is stated. */
  seats?: string
}

/**
 * Models shown in the agency's own Facebook posts (2023–2025). No transmission, fuel or price is
 * published, and every car visual on the page is a promo flyer, so the fleet has no photos.
 */
export const fleet: Car[] = [
  { model: 'Kia Picanto', category: 'city', bodyLabel: 'Citadine' },
  { model: 'Fiat 500', category: 'city', bodyLabel: 'Citadine' },
  { model: 'Kia Rio', category: 'city', bodyLabel: 'Citadine' },
  { model: 'MG 5', category: 'sedan', bodyLabel: 'Berline' },
  { model: 'MG ZS', category: 'sedan', bodyLabel: 'SUV' },
  { model: 'Peugeot Expert / Traveller', category: 'van', bodyLabel: 'Van', seats: 'jusqu’à 9 places' },
  { model: 'Utilitaires', sub: 'Citroën Berlingo, Jumpy', category: 'util', bodyLabel: 'Utilitaire' },
]

export const carName = (c: Car) => (c.sub ? `${c.model} (${c.sub})` : c.model)
export const specLine = (c: Car) => [c.bodyLabel, c.seats].filter(Boolean).join(' · ')

export const filters = [
  { key: 'all', label: 'Tous' },
  { key: 'city', label: 'Citadines' },
  { key: 'sedan', label: 'Berlines & SUV' },
  { key: 'van', label: 'Vans' },
  { key: 'util', label: 'Utilitaires' },
] as const
export type FilterKey = (typeof filters)[number]['key']

export const matches = (c: Car, f: FilterKey) => f === 'all' || c.category === f

/** Services the agency states on Facebook ("Location avec chauffeur · Transport aéroport · Excursions"). */
export const services = [
  { value: 'location', n: '01', title: 'Location de voitures', text: 'Citadines, berlines, SUV et utilitaires, à réserver par simple message.' },
  { value: 'transfert', n: '02', title: 'Transferts aéroport', text: 'Accueil à l’aéroport et trajet jusqu’à votre hôtel, avec chauffeur.' },
  { value: 'excursion', n: '03', title: 'Excursions avec chauffeur', text: 'Journées à El Jem, Kairouan, Sousse, Sidi Bou Saïd ou Tunis, au départ de Mahdia.' },
] as const
export type ServiceKey = (typeof services)[number]['value']

export const serviceOptions: { value: ServiceKey; label: string }[] = [
  { value: 'location', label: 'Location de voiture' },
  { value: 'transfert', label: 'Transfert aéroport' },
  { value: 'excursion', label: 'Excursion avec chauffeur' },
]

/** Pick-up suggestions: the agency for everything; the airport only for transfers (no self-drive delivery is stated). */
export const pickupSuggestions = (s: ServiceKey) =>
  ['Agence Top Car, av. Taher Sfar, Mahdia', ...(s === 'transfert' ? ['Aéroport Monastir Habib Bourguiba'] : [])]

export const steps = [
  { n: '1', title: 'Choisissez un véhicule ou un service' },
  { n: '2', title: 'Envoyez votre demande sur WhatsApp' },
  { n: '3', title: 'L’agence confirme les détails avec vous' },
]

/** Real customer photos from the Google Maps profile (excursions). */
export const gallery: { id: PhotoKey; alt: string; span: string; aspect: string; sizes: string }[] = [
  { id: 'eljemArches', alt: 'Arcades de l’amphithéâtre d’El Jem', span: 'lg:col-span-7', aspect: 'aspect-[16/10]', sizes: '(min-width: 1024px) 55vw, 100vw' },
  { id: 'capMahdia', alt: 'Le cap de Mahdia, bord de mer et porte en ruine', span: 'lg:col-span-5', aspect: 'aspect-[16/10] lg:aspect-auto lg:h-[calc(100%-2rem)]', sizes: '(min-width: 1024px) 40vw, 100vw' },
  { id: 'terrasse', alt: 'Terrasse de café vue mer aux parasols bleus', span: 'md:col-span-4', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 33vw, 100vw' },
  { id: 'musee', alt: 'Galerie de musée aux arcades blanches et statues', span: 'md:col-span-4', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 33vw, 100vw' },
  { id: 'rueDromadaire', alt: 'Scène de rue avec dromadaire, en excursion', span: 'md:col-span-4', aspect: 'aspect-[4/3]', sizes: '(min-width: 768px) 33vw, 100vw' },
]

/** Verbatim Google reviews (all 5★). "…" marks a cut. */
export const reviews = [
  { author: 'H B', badge: 'Local Guide', when: 'il y a un an', text: 'Service irréprochable du début à la fin. Le chauffeur était parfaitement ponctuel, présent à l’aéroport à notre arrivée, ce qui nous a permis de démarrer notre séjour sans stress. Le véhicule était très propre, climatisé et extrêmement confortable…' },
  { author: 'martial remacle', when: 'il y a un an', text: '…aux véhicules de simples berlines en montant de catégorie jusqu’au van 9 places en super état et toujours nettes, et au patron toujours joignable qui respire le professionnalisme…' },
  { author: 'marie-aude martin', when: 'il y a un an', text: 'Super agence! Tout s’est bien passé pour notre transfert sfax/ Mahdia et notre journée à Kairouan et el jem. Notre chauffeur Sadok était toujours à l’heure et très gentil…' },
  { author: 'ZRELLI SLIM', when: 'il y a 4 mois', text: 'Excellent service … Toujours disponibles, très réactifs et à l’écoute. … Rapport qualité/prix au top 👌' },
  { author: 'DAHROUCH CIRINE', when: 'il y a un an', text: 'Agence très sérieuse. Ils sont hyper disponibles, je recommande à tous les voyageurs pour les excursions ils sont top. Ils se sont également occupé de notre transfert de l’aéroport à l’hôtel. Ponctuels et très sympa.' },
  { author: 'Ines Sfaxi', when: 'il y a un an', text: 'Super services, ils s’occupent du tous ! transferts domicile /hôtel Mahdia , des transferts privés dans la région , agence professionnelle…' },
  { author: 'Марія Дорош', when: 'il y a 3 mois', lang: 'en', text: 'We rented a 9-passenger vehicle for our group. The service was excellent. The vehicle was also clean, in good working order, and comfortable.' },
  { author: 'Mohammed Alamgir', badge: 'Local Guide', when: 'il y a un mois', lang: 'en', text: 'A really good and trustworthy company. Great communication from the beginning. Car was excellent, service was brilliant and whole experience was made very easy.' },
  { author: 'Filip Radojicic', when: 'il y a un an', lang: 'en', text: '…The driving was impeccable. The car is clean, well maintained, with AC, well suited for long trips like this (almost 3h one-way).' },
]

/** Written only from published facts. */
export const faq = [
  { q: 'Comment réserver chez Top Car ?', a: `Envoyez votre demande sur WhatsApp au ${agency.phone} (ou appelez) avec le service, le véhicule, les dates et le lieu de prise en charge. L’agence vous répond pour la disponibilité et le prix.` },
  { q: 'Quels sont les prix ?', a: 'Les tarifs ne sont pas publiés en ligne : ils sont donnés sur demande, selon le véhicule, le service et les dates.' },
  { q: 'Proposez-vous des transferts depuis l’aéroport ?', a: 'Oui, l’agence propose le transport aéroport avec chauffeur jusqu’à votre hôtel. Indiquez l’aéroport, la date et l’heure de votre vol dans votre message.' },
  { q: 'Quelles excursions peut-on faire avec chauffeur ?', a: 'Au départ de Mahdia, les clients de l’agence ont visité El Jem, Kairouan, Sousse, Sidi Bou Saïd, Tunis, Hammamet et Monastir. Le programme se définit avec l’agence.' },
  { q: 'Avez-vous des véhicules pour les groupes ?', a: 'Oui : un van Peugeot jusqu’à 9 places, ainsi que des utilitaires pour le transport de marchandises.' },
  { q: 'Où se trouve l’agence et quand est-elle ouverte ?', a: `Avenue Taher Sfar, Mahdia 5111 (${agency.plusCode}). Ouverte du lundi au samedi de 9 h à 19 h, fermée le dimanche.` },
]
