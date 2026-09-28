// Single source of truth for every fact on the site. Sources: the Google Maps profile, the dealer's Facebook
// page and Instagram @ahmedd_autoo. See ../../brief.md for evidence, dates and the owner-to-confirm list.
// Stock: copy the dealer's own post only. A value that is not in the post stays null. Never estimate.
import photoMeta from './photos.json' with { type: 'json' }

export type PhotoKey = keyof typeof photoMeta

export const photos = photoMeta as Record<PhotoKey, { w: number; h: number; widths: number[] }>

export const photoSrc = (id: PhotoKey, w?: number) => {
  const ws = photos[id].widths
  const best = w ? ws.filter((x) => x <= w).pop() ?? ws[0] : ws[ws.length - 1]
  return `/photos/${id}-${best}.webp`
}
export const photoSrcSet = (id: PhotoKey) => photos[id].widths.map((w) => `/photos/${id}-${w}.webp ${w}w`).join(', ')

export const dealer = {
  name: 'AHMED AUTO',
  tagline: 'Vente voitures haute gamme',
  summary:
    'AHMED AUTO est un showroom de voitures neuves et d’occasion à Ksibet El Mediouni (Monastir, Tunisie), Route de Monastir. Les véhicules publiés par le showroom y sont visibles sur place ; contact par WhatsApp ou téléphone.',
  whatsapp: '21653850850',
  phone: '53 850 850',
  phoneIntl: '+216 53 850 850',
  phoneE164: '+21653850850',
  phone2: '94 157 778',
  phone2E164: '+21694157778',
  email: 'ahmedauto2012@yahoo.fr',
  address: {
    street: 'Route de Monastir',
    locality: 'Ksibet El Mediouni',
    postalCode: '5031',
    region: 'Monastir',
    regionCode: 'TN-52',
    country: 'TN',
    countryName: 'Tunisie',
  },
  plusCode: 'MRQW+VP2 Ksibet El Médiouni',
  geo: { lat: 35.6896333, lng: 10.8467775 },
  // Google: "Open 24 hours" every day; Facebook: "Always open". Real hours to be confirmed by the owner.
  hoursText: 'Ouvert tous les jours, selon Google et Facebook',
  hoursNote: 'Appelez avant de passer pour voir un véhicule.',
  rating: { value: 4.8, count: 12, distribution: [[5, 11], [4, 0], [3, 1], [2, 0], [1, 0]] as const },
  mapsUrl: 'https://www.google.com/maps?cid=6322496852364681938',
  reviewsUrl: 'https://www.google.com/search?q=AHMED+AUTO+Ksibet+El+Mediouni#lrd=0x1302133e4547a689:0x57be0563a2b8e2d2,1,,,,',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=35.6896333,10.8467775&z=17&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=35.6896333,10.8467775',
  facebook: 'https://www.facebook.com/profile.php?id=100064048541047',
  instagram: 'https://www.instagram.com/ahmedd_autoo/',
}

/** The stock is a snapshot of the dealer's posts, never a live inventory. Bump this when the stock changes. */
export const stockDate = { iso: '2026-09-27', fr: '27 septembre 2026' }

export type Energy = 'phev' | 'diesel'

export type Car = {
  id: string
  make: string
  model: string
  version: string
  year: string // as written in the post (month/year or date of first registration)
  yearNum: number
  km: number | null
  fuel: string | null
  energy: Energy | null
  gearbox: string | null
  cv: number | null // fiscal horsepower
  power: string | null
  colour: string | null
  type: string
  date: string // post date, ISO
  source: 'Facebook' | 'Instagram'
  url: string
  extra: [string, string][]
  options: string[]
  photos: number // photos/<id>-01 … -NN
  schema?: { fuelType?: string; transmission?: string; bodyType?: string; vehicleType?: 'Car' | 'Vehicle' }
}

export const stock: Car[] = [
  {
    id: 'cupra-formentor', make: 'Cupra', model: 'Formentor', version: 'e-Hybrid',
    year: '07-2023', yearNum: 2023, km: 100000, fuel: 'Essence hybride rechargeable', energy: 'phev',
    gearbox: null, cv: 8, power: null, colour: 'Gris Nardo', type: 'SUV',
    date: '2026-09-27', source: 'Facebook',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0KZfzmsXycSkLRRH8sBXzqgKDrh9nrPUncPcmjJ2gRetqAEz4SkgBL8gkgmbVKAdvl&id=100064048541047',
    extra: [['Jantes', 'Alliage Design Bronze R19']],
    options: [
      'Rappels bronze sur les jantes, le logo et les sorties d’échappement',
      'Sièges baquets sport électriques à mémoire, cuir perforé, chauffants',
      'Toit panoramique ouvrant', 'Éclairage d’ambiance LED « Smart Ambient Light »',
      'Cockpit digital configurable, écran tactile 12", navigation 3D',
      'Apple CarPlay & Android Auto sans fil', 'Système audio premium',
      'Caméra de recul, radars avant/arrière, Park Assist',
      'Régulateur adaptatif (ACC), Lane Assist, angles morts, Front Assist',
      'Accès et démarrage sans clé (Keyless Advanced)', 'Coffre électrique mains libres (Virtual Pedal)',
      'Recharge sans fil smartphone', 'Projecteurs Full LED',
    ],
    photos: 8, schema: { fuelType: 'Plug-in hybrid (petrol)', bodyType: 'SUV' },
  },
  {
    id: 'mercedes-glc300e-coupe', make: 'Mercedes-Benz', model: 'GLC 300e Coupé', version: '4MATIC',
    year: '09/2025', yearNum: 2025, km: 36000, fuel: 'Essence + électrique (hybride rechargeable)', energy: 'phev',
    gearbox: 'Automatique 9G-Tronic', cv: 11, power: null, colour: null, type: 'SUV coupé',
    date: '2026-09-27', source: 'Facebook',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid027A5z1Ggo9os6qDDawjV8YX85hVeg5f45UdQwefD4AVY1Atnu6d6U8hi3Zs2Rm9oZl&id=100064048541047',
    extra: [['Transmission', '4MATIC'], ['Intérieur', 'Cuir Nappa camel']],
    options: [
      'Sièges électriques mémorisés, chauffants et massants', 'Affichage tête haute (HUD)', 'Projecteurs Digital Light',
      'Toit panoramique ouvrant', 'Audio Burmester® 4D-Surround', 'Éclairage d’ambiance multicolore', 'Boule d’attelage électrique',
      'Pack Assistance Plus : régulateur adaptatif, maintien de voie, angles morts, freinage d’urgence',
      'Caméras 540° avec Park Assist et détection de trafic arrière', 'MBUX, navigation premium avec réalité augmentée',
      'Apple CarPlay / Android Auto', 'Recharge sans fil smartphone',
    ],
    photos: 8, schema: { fuelType: 'Plug-in hybrid (petrol)', transmission: 'Automatic', bodyType: 'SUV coupé' },
  },
  {
    id: 'bmw-530e', make: 'BMW', model: '530e', version: 'G30 LCI Restylée · Luxury Line',
    year: '05-2023', yearNum: 2023, km: 59000, fuel: 'Essence hybride rechargeable', energy: 'phev',
    gearbox: null, cv: 10, power: null, colour: null, type: 'Berline',
    date: '2026-09-25', source: 'Facebook',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid022G96iLNmPqg1kbXij5hymz7ggqMSi944q9MeBNG7CBHCM3UFNxEnA7FA5wGsR9zZl&id=100064048541047',
    extra: [['Intérieur', 'Cuir Dakota marron']],
    options: [
      'Sièges électriques mémorisés et massants', 'Tableau de bord Sensatec', 'Coffre électrique', 'Affichage tête haute (HUD)',
      'BMW Live Cockpit Navigation Pro (double écran 12,3"), BMW OS 7.0', 'Apple CarPlay & Android Auto sans fil',
      'Éclairage d’ambiance', 'Toit ouvrant', 'Projecteurs BMW Digital Light', 'Caméra de recul, Park Assist avec Cross Traffic',
      'Maintien de voie, angles morts, freinage d’urgence actif', 'Commande vocale, kit mains libres, recharge sans fil, Wi-Fi embarqué',
    ],
    photos: 7, schema: { fuelType: 'Plug-in hybrid (petrol)', bodyType: 'Sedan' },
  },
  {
    id: 'mercedes-a250e', make: 'Mercedes-Benz', model: 'Classe A 250e', version: 'AMG-Line · Fin Série',
    year: '12/2022', yearNum: 2022, km: 92000, fuel: 'Essence hybride rechargeable', energy: 'phev',
    gearbox: null, cv: 8, power: null, colour: null, type: 'Compacte',
    date: '2026-09-11', source: 'Facebook',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02Ya6VigLwMhrLhyVLCz4tbQWrQ3v3zcKv5KW6mHUCHbLEW3uJUPuRC6QJDR6uqiTcl&id=100064048541047',
    extra: [['Finition', 'Pack AMG-Line Premium Plus & Pack Night'], ['Jantes', 'AMG R19']],
    options: [
      'Sièges cuir + Alcantara, électriques, mémorisés et massants', 'Boule d’attelage', 'Écran Superscreen MBUX, réalité augmentée',
      'Toit panoramique ouvrant', 'Éclairage d’ambiance 64 couleurs', 'Audio 4D-Surround', 'Projecteurs Digital Light Multi-Beam',
      'Caméra 360°, Park Assist avec Cross Traffic', 'Pack Assistance à la conduite Plus', 'Commande vocale « Hey Mercedes »',
      'Coffre électrique, recharge sans fil, Wi-Fi embarqué',
    ],
    photos: 8, schema: { fuelType: 'Plug-in hybrid (petrol)', bodyType: 'Hatchback' },
  },
  {
    id: 'vw-tiguan-gte', make: 'Volkswagen', model: 'Tiguan R-Line GTE', version: 'Pack R-Line & Pack Night',
    year: '09/2021', yearNum: 2021, km: 75000, fuel: '1.4 TSI essence + électrique (hybride rechargeable)', energy: 'phev',
    gearbox: null, cv: 8, power: '245 ch DIN cumulés', colour: 'Blanc Nacré', type: 'SUV',
    date: '2026-09-07', source: 'Facebook',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0319GWRVXNft1vbDQ1MSSYHpbRxVWpAgeBxK4Ncs4qc16G1LUBRP5thWCw4mLWg17Sl&id=100064048541047',
    extra: [['Jantes', 'Alliage R-Line']],
    options: [
      'Vitres arrière surteintées, becquet R-Line', 'Digital Cockpit Pro, écran tactile', 'Sièges baquets électriques à mémoire',
      'Volant sport cuir à méplat avec palettes', 'Climatisation bi-zone', 'Démarrage sans clé (Keyless Go)',
      'Éclairage d’ambiance multicolore', 'Projecteurs IQ.LIGHT Matrix LED', 'Park Pilot avec caméra de recul et radars avant/arrière',
      'Régulateur adaptatif (ACC), Lane Assist, freinage d’urgence', 'Apple CarPlay / Android Auto sans fil, recharge par induction',
    ],
    photos: 7, schema: { fuelType: 'Plug-in hybrid (petrol)', bodyType: 'SUV' },
  },
  {
    id: 'canam-outlander-max', make: 'Can-Am', model: 'Outlander MAX XT', version: 'Quad 1000cc · biplace',
    year: '09/08/2026', yearNum: 2026, km: 0, fuel: null, energy: null,
    gearbox: 'Automatique CVT', cv: null, power: null, colour: 'Noir / Gris Nardo', type: 'Quad',
    date: '2026-08-26', source: 'Facebook',
    url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02oyyoyWrG4iw9A7rJGLGHNnNXepRvhttFsbsP79D2QyPuSzGVZRFCrVUK4q8J4i5ml&id=100064048541047',
    extra: [['Moteur', 'Rotax 1000cc'], ['Transmission', '2x4 / 4x4, blocage auto du différentiel avant']],
    options: [
      'Treuil Can-Am', 'Pare-chocs avant XT', 'Coffres rigides avant et arrière Can-Am', 'Jantes aluminium noires, pneus tout-terrain',
      'Siège passager surélevé (version MAX)', 'Direction assistée DPS 3 modes', 'Frein moteur intelligent (iEB)',
      'Écran numérique multifonctions', 'Signature lumineuse Full LED', 'Boule d’attelage',
    ],
    photos: 7, schema: { transmission: 'Automatic', vehicleType: 'Vehicle' },
  },
  {
    id: 'vw-golf-8', make: 'Volkswagen', model: 'Golf 8', version: 'Diesel',
    year: '01-2022', yearNum: 2022, km: null, fuel: 'Diesel', energy: 'diesel',
    gearbox: null, cv: 6, power: null, colour: null, type: 'Compacte',
    date: '2026-08-08', source: 'Instagram',
    url: 'https://www.instagram.com/p/Dbxo7Eajsmv/',
    extra: [], options: [],
    photos: 8, schema: { fuelType: 'Diesel', bodyType: 'Hatchback' },
  },
]

export const makes = ['Mercedes-Benz', 'Volkswagen', 'BMW', 'Cupra', 'Can-Am']
export const energies: { key: Energy; label: string }[] = [
  { key: 'phev', label: 'Hybride rechargeable' },
  { key: 'diesel', label: 'Diesel' },
]

// ---------- helpers ----------
export const frDate = (iso: string) => iso.split('-').reverse().join('/')
export const fmtKm = (km: number | null) => (km === null ? null : `${km.toLocaleString('fr-FR').replace(/ | /g, ' ')} km`)
/** Uppercase for display but keep the lowercase "e" of plug-in badges (300e, 530e, 250e). */
export const displayModel = (m: string) => m.toUpperCase().replace(/(\d)E\b/g, '$1e')
export const carName = (c: Car) => `${c.make} ${c.model}`
export const carPhoto = (c: Car, n: number) => `${c.id}-${String(n).padStart(2, '0')}` as PhotoKey
export const specLine = (c: Car) =>
  c.id === 'canam-outlander-max'
    ? [c.year, fmtKm(c.km), 'Boîte CVT', '2x4 / 4x4']
    : ([c.year, fmtKm(c.km), c.fuel, c.cv ? `${c.cv} CV` : null, c.gearbox, c.power].filter(Boolean) as string[])
export const specSheet = (c: Car) =>
  ([
    ['Année / mise en circulation', c.year],
    ['Kilométrage', fmtKm(c.km)],
    ['Énergie', c.fuel],
    ['Puissance fiscale', c.cv ? `${c.cv} CV` : null],
    ['Puissance', c.power],
    ['Boîte', c.gearbox],
    ['Couleur', c.colour],
    ['Type', c.type],
    ...c.extra,
  ] as [string, string | null][]).filter((r): r is [string, string] => !!r[1])

export const wa = (text?: string) => `https://wa.me/${dealer.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const waCar = (c: Car) =>
  wa(`Bonjour, je suis intéressé(e) par le véhicule ${carName(c)} ${c.version} (${c.year}) publié le ${frDate(c.date)} sur votre page. Est-il toujours disponible ? Quel est son prix ?`)

// ---------- photo alt text (from ../../photo-manifest.csv) ----------
const altBase: Record<string, string[]> = {
  'cupra-formentor': ['Cupra Formentor e-Hybrid gris Nardo, vue avant trois-quarts', 'Cupra Formentor, avant', 'Cupra Formentor, profil avant', 'Cupra Formentor, arrière trois-quarts', 'Cupra Formentor, arrière', 'Cupra Formentor, poste de conduite', 'Cupra Formentor, sièges baquets', 'Cupra Formentor, jante bronze R19'],
  'mercedes-glc300e-coupe': ['Mercedes-Benz GLC 300e Coupé 4MATIC, vue avant trois-quarts', 'GLC 300e Coupé, avant', 'GLC 300e Coupé, arrière trois-quarts', 'GLC 300e Coupé, arrière', 'GLC 300e Coupé, planche de bord', 'GLC 300e Coupé, sièges cuir Nappa camel', 'GLC 300e Coupé, éclairage d’ambiance', 'GLC 300e Coupé, monogramme arrière'],
  'bmw-530e': ['BMW 530e Luxury Line, vue avant trois-quarts', 'BMW 530e, avant', 'BMW 530e, arrière trois-quarts', 'BMW 530e, arrière', 'BMW 530e, poste de conduite cuir marron', 'BMW 530e, console centrale', 'BMW 530e, contre-porte'],
  'mercedes-a250e': ['Mercedes-Benz A250e AMG-Line, vue avant trois-quarts', 'A250e, profil avant', 'A250e, avant', 'A250e, face avant', 'A250e, arrière trois-quarts', 'A250e, arrière', 'A250e, poste de conduite', 'A250e, éclairage d’ambiance'],
  'vw-tiguan-gte': ['Volkswagen Tiguan R-Line GTE blanc nacré, vue avant trois-quarts', 'Tiguan R-Line GTE, avant', 'Tiguan R-Line GTE, feux IQ.LIGHT', 'Tiguan R-Line GTE, arrière trois-quarts', 'Tiguan R-Line GTE, feux arrière', 'Tiguan R-Line GTE, volant et cockpit digital', 'Tiguan R-Line GTE, caméra de recul'],
  'canam-outlander-max': ['Can-Am Outlander MAX XT, avant avec treuil', 'Can-Am Outlander MAX XT, arrière avec coffre', 'Can-Am Outlander MAX XT, coffre arrière', 'Can-Am Outlander MAX XT, treuil', 'Can-Am Outlander MAX XT, écran', 'Can-Am Outlander MAX XT, commandes au guidon', 'Can-Am Outlander MAX XT, coffre avant'],
  'vw-golf-8': ['Volkswagen Golf 8 Diesel, vue avant trois-quarts', 'Golf 8, avant', 'Golf 8, profil avant', 'Golf 8, arrière trois-quarts', 'Golf 8, arrière', 'Golf 8, poste de conduite', 'Golf 8, cockpit digital', 'Golf 8, caméra de recul'],
}
export const carAlt = (c: Car, n: number) => altBase[c.id]?.[n - 1] ?? carName(c)

export const hero = { id: 'showroom-1' as PhotoKey, alt: 'Porsche devant l’entrée du showroom AHMED AUTO, Route de Monastir, au crépuscule' }

export const gallery: { id: PhotoKey; alt: string }[] = [
  { id: 'showroom-2', alt: 'Mercedes-Benz exposée au showroom AHMED AUTO' },
  { id: 'showroom-3', alt: 'Mercedes-Benz exposée au showroom AHMED AUTO' },
  { id: 'showroom-4', alt: 'Volkswagen exposée au showroom AHMED AUTO' },
]

export const steps = [
  { n: '01', title: 'Choisissez un véhicule', text: 'Parcourez le stock publié et ouvrez la fiche du véhicule.' },
  { n: '02', title: 'Écrivez-nous ou appelez', text: `Un message WhatsApp ou un appel au ${dealer.phone} / ${dealer.phone2} pour vérifier la disponibilité et le prix.` },
  { n: '03', title: 'Venez le voir', text: 'Le véhicule est visible au showroom AHMED AUTO, Route de Monastir, Ksibet El Mediouni.' },
]

// Verbatim Google reviews (see brief.md). The critical 3★ review is shown too.
export const reviews = [
  { text: 'Meilleur prix Meilleur plan Je le recommande Ahmed auto à tous ceux qui recherchent un endroit fiable merci pour votre service', author: 'Anas Seelmen', stars: 5, note: '' },
  { text: 'Un grand remerciement à ´´Ahmed Auto ‘’ merci pour votre accueil et votre fidélité je le conseille vivement', author: 'Moncef Brik', stars: 5, note: '' },
  { text: 'Je partage mon experience Avec Ahmed Auto meilleur Showroom vraiment merci beaucoup', author: 'Karim Belhaj', stars: 5, note: '' },
  { text: 'Un conseil à tous : faites diagnostiquer votre voiture par un mécanicien avant de l’acheter…', author: 'Med Tayeb', stars: 3, note: 'Traduit de l’arabe par Google' },
]

// FAQ written only from facts in the brief.
export const faq = [
  {
    q: 'Où se trouve AHMED AUTO ?',
    a: `Route de Monastir, Ksibet El Mediouni (Monastir ${dealer.address.postalCode}, Tunisie). Plus code : ${dealer.plusCode}.`,
  },
  {
    q: 'Les prix sont-ils affichés ?',
    a: 'Non. Les prix ne sont pas publiés : ils sont communiqués sur demande, par WhatsApp ou par téléphone.',
  },
  {
    q: 'Le stock affiché est-il à jour ?',
    a: `C’est un stock indicatif, repris des publications du showroom au ${stockDate.fr}. Un véhicule peut être vendu entre-temps : contactez-nous pour vérifier sa disponibilité.`,
  },
  {
    q: 'Comment voir un véhicule ?',
    a: `Envoyez un message WhatsApp ou appelez le ${dealer.phone} ou le ${dealer.phone2}, puis passez au showroom. Aucune vente ni réservation en ligne.`,
  },
  {
    q: 'Quelles sont les heures d’ouverture ?',
    a: 'Google et Facebook indiquent que le showroom est ouvert tous les jours. Appelez avant de passer pour vous assurer que le véhicule est visible.',
  },
]
