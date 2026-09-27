// Build-time SEO / GEO output, generated from src/data/agency.ts.
// Used by the Vite plugin in vite.config.ts; nothing here ships to the browser bundle.
import { agency as a, carName, faq, fleet, gallery, photos, reviews, services, specLine, type PhotoKey } from '../data/agency.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (siteUrl: string, id: PhotoKey, w = 1600) => {
  const ws = photos[id].widths
  return `${siteUrl}/photos/${id}-${ws.filter((x) => x <= w).pop() ?? ws[0]}.webp`
}
const ratingFr = a.rating.value.toFixed(1).replace('.', ',')

export const title = 'Top Car Mahdia — Location de voitures, transferts aéroport & excursions'
export const description =
  `Top Car, agence de location de voitures à Mahdia (avenue Taher Sfar) : citadines, berlines, SUV, van 9 places et utilitaires, ` +
  `transferts aéroport et excursions avec chauffeur. Noté ${ratingFr}★ sur Google (${a.rating.count} avis). Demande sur WhatsApp au ${a.phone}.`

export function jsonLd(siteUrl: string) {
  const url = `${siteUrl}/`
  const bizId = `${url}#agency`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: a.name,
        inLanguage: 'fr',
        about: { '@id': bizId },
      },
      {
        '@type': 'AutoRental',
        '@id': bizId,
        name: a.name,
        alternateName: ['Top Car', 'Top cars mahdia', 'Top Car - Mahdia'],
        description: a.summary,
        slogan: a.slogan,
        url,
        image: [`${siteUrl}/photos/og.jpg`, abs(siteUrl, 'eljemArches'), abs(siteUrl, 'capMahdia')],
        logo: `${siteUrl}/favicon.svg`,
        telephone: a.phoneE164,
        email: a.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: a.address.street,
          addressLocality: a.address.locality,
          postalCode: a.address.postalCode,
          addressRegion: a.address.region,
          addressCountry: a.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: a.geo.lat, longitude: a.geo.lng },
        hasMap: a.mapsUrl,
        areaServed: [{ '@type': 'City', name: 'Mahdia' }, { '@type': 'Country', name: 'Tunisie' }],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => `https://schema.org/${d}`),
          opens: '09:00',
          closes: '19:00',
        },
        contactPoint: { '@type': 'ContactPoint', telephone: a.phoneE164, contactType: 'reservations', availableLanguage: ['fr', 'ar'] },
        sameAs: [a.mapsUrl, a.facebook],
        // No prices are published, so no makesOffer. Services and fleet are described as a catalog without prices.
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services et flotte',
          itemListElement: [
            ...services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })),
            ...fleet.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Car', name: carName(c), description: specLine(c) } })),
          ],
        },
        // Ratings and reviews come from Google, so they are shown on the page but not marked up:
        // Google treats a business's own review markup as "self-serving" and ignores it.
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }
}

export function headTags(siteUrl: string) {
  const url = `${siteUrl}/`
  const meta = (attr: 'name' | 'property', key: string, content: string) => `<meta ${attr}="${key}" content="${esc(content)}">`
  const og = `${siteUrl}/photos/og.jpg`
  return [
    `<title>${esc(title)}</title>`,
    meta('name', 'description', description),
    meta('name', 'keywords', 'location voiture Mahdia, rent car Mahdia, Top Car Mahdia, transfert aéroport Mahdia, transfert Monastir Mahdia, excursion El Jem chauffeur, location van 9 places Mahdia, location utilitaire Mahdia'),
    `<link rel="canonical" href="${url}">`,
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    meta('name', 'theme-color', '#141517'),
    // Local signals
    meta('name', 'geo.region', a.address.regionCode),
    meta('name', 'geo.placename', a.address.locality),
    meta('name', 'geo.position', `${a.geo.lat};${a.geo.lng}`),
    meta('name', 'ICBM', `${a.geo.lat}, ${a.geo.lng}`),
    // Open Graph / social
    meta('property', 'og:type', 'business.business'),
    meta('property', 'og:site_name', a.name),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', og),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', 'L’amphithéâtre d’El Jem vu à travers le pare-brise, pendant une excursion Top Car'),
    meta('property', 'og:locale', 'fr_FR'),
    meta('property', 'business:contact_data:street_address', a.address.street),
    meta('property', 'business:contact_data:locality', a.address.locality),
    meta('property', 'business:contact_data:postal_code', a.address.postalCode),
    meta('property', 'business:contact_data:country_name', a.address.countryName),
    meta('property', 'business:contact_data:phone_number', a.phoneIntl),
    meta('property', 'business:contact_data:email', a.email),
    meta('property', 'place:location:latitude', String(a.geo.lat)),
    meta('property', 'place:location:longitude', String(a.geo.lng)),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', og),
    // Machine-readable summary for AI assistants and answer engines
    `<link rel="alternate" type="text/markdown" href="${siteUrl}/llms.txt" title="Résumé pour les LLM">`,
    `<link rel="preload" as="image" href="/photos/hero-1600.webp" imagesrcset="${photos.hero.widths.map((w) => `/photos/hero-${w}.webp ${w}w`).join(', ')}" imagesizes="(min-width: 1024px) 62vw, 100vw" fetchpriority="high">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function robotsTxt(siteUrl: string) {
  // Search and AI crawlers are all welcome; being cited by answer engines is the point of GEO.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']
  return ['User-agent: *', 'Allow: /', '', ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n')
}

export function sitemapXml(siteUrl: string, lastmod: string) {
  const images: PhotoKey[] = ['hero', ...gallery.map((g) => g.id)]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
${[...new Set(images)].map((id) => `    <image:image><image:loc>${esc(abs(siteUrl, id))}</image:loc></image:image>`).join('\n')}
  </url>
  <url>
    <loc>${siteUrl}/llms.txt</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
}

/** llms.txt (https://llmstxt.org): a plain-markdown fact sheet that AI assistants can quote directly. */
export function llmsTxt(siteUrl: string) {
  return [
    `# ${a.name} — location de voitures, transferts et excursions à Mahdia, Tunisie`,
    '',
    `> ${a.summary} Noté ${a.rating.value}/5 sur Google (${a.rating.count} avis).`,
    '',
    '## Informations clés',
    `- Nom : ${a.name} (aussi « Top Car » ; « Top cars mahdia » sur Google)`,
    `- Adresse : ${a.address.street}, ${a.address.locality} ${a.address.postalCode}, ${a.address.countryName} (${a.plusCode})`,
    `- Coordonnées GPS : ${a.geo.lat}, ${a.geo.lng}`,
    `- Téléphone / WhatsApp : ${a.phoneIntl}`,
    `- E-mail : ${a.email}`,
    `- Horaires : ${a.hours.map((h) => `${h.days} ${h.time}`).join(' ; ')} (selon Google)`,
    `- Réservation : par WhatsApp ou téléphone ; pas de réservation ni de paiement en ligne`,
    `- Prix : sur demande (aucun tarif publié)`,
    `- Note Google : ${a.rating.value}/5 (${a.rating.count} avis)`,
    '',
    '## Services',
    ...services.map((s) => `- ${s.title} : ${s.text}`),
    '',
    '## Flotte (modèles présentés par l’agence, prix sur demande)',
    ...fleet.map((c) => `- ${carName(c)} — ${specLine(c)}`),
    '',
    '## Avis Google (extraits)',
    ...reviews.map((r) => `- « ${r.text} » — ${r.author}`),
    '',
    '## Liens',
    `- [Site web](${siteUrl}/)`,
    `- [Flotte](${siteUrl}/#flotte)`,
    `- [WhatsApp](https://wa.me/${a.whatsapp})`,
    `- [Google Maps](${a.mapsUrl})`,
    `- [Itinéraire](${a.directionsUrl})`,
    `- [Facebook](${a.facebook})`,
    '',
    '## Questions fréquentes',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
  ].join('\n')
}
