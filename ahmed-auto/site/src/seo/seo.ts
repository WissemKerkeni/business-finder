// Build-time SEO / GEO output, generated from src/data/dealer.ts.
// Used by the Vite plugin in vite.config.ts; nothing here ships to the browser bundle.
import { carAlt, carName, carPhoto, dealer as d, faq, gallery, hero, photos, reviews, specLine, stock, stockDate, type Car, type PhotoKey } from '../data/dealer.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (siteUrl: string, id: PhotoKey, w = 1600) => {
  const ws = photos[id].widths
  return `${siteUrl}/photos/${id}-${ws.filter((x) => x <= w).pop() ?? ws[0]}.webp`
}
const ratingFr = d.rating.value.toFixed(1).replace('.', ',')
const makesList = [...new Set(stock.map((c) => c.make))].join(', ')

export const title = 'AHMED AUTO — Showroom voitures neuves et d’occasion, Ksibet El Mediouni (Monastir)'
export const description =
  `AHMED AUTO, showroom de voitures neuves et d’occasion Route de Monastir à Ksibet El Mediouni. Stock publié au ${stockDate.fr} : ${makesList}. ` +
  `Prix sur demande, contact WhatsApp ${d.phone}. Noté ${ratingFr}★ sur Google (${d.rating.count} avis).`

/** "07-2023" / "09/2025" / "12/2022" / "09/08/2026" → ISO date (YYYY-MM or YYYY-MM-DD). */
const isoReg = (y: string) => {
  const p = y.split(/[-/]/)
  return p.length === 3 ? `${p[2]}-${p[1]}-${p[0]}` : `${p[1]}-${p[0]}`
}

function carLd(siteUrl: string, c: Car) {
  const s = c.schema ?? {}
  return {
    '@type': s.vehicleType ?? 'Car',
    '@id': `${siteUrl}/#car-${c.id}`,
    url: `${siteUrl}/#car-${c.id}`,
    name: `${carName(c)} ${c.version}`,
    brand: { '@type': 'Brand', name: c.make },
    model: c.model,
    dateVehicleFirstRegistered: isoReg(c.year),
    ...(c.km !== null ? { mileageFromOdometer: { '@type': 'QuantitativeValue', value: c.km, unitCode: 'KMT' } } : {}),
    ...(s.fuelType ? { fuelType: s.fuelType } : {}),
    ...(s.transmission ? { vehicleTransmission: s.transmission } : {}),
    ...(s.bodyType ? { bodyType: s.bodyType } : {}),
    ...(c.colour ? { color: c.colour } : {}),
    ...(c.km === 0 ? { itemCondition: 'https://schema.org/NewCondition' } : {}),
    image: abs(siteUrl, carPhoto(c, 1)),
    description: specLine(c).join(' · '),
    // No price is published, so no Offer (and no availability claim).
  }
}

export function jsonLd(siteUrl: string) {
  const url = `${siteUrl}/`
  const bizId = `${url}#dealer`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${url}#website`, url, name: d.name, inLanguage: 'fr', about: { '@id': bizId } },
      {
        '@type': 'AutoDealer',
        '@id': bizId,
        name: d.name,
        alternateName: ['Ahmed Auto', 'AHMED AUTO Ksibet El Mediouni'],
        description: d.summary,
        slogan: d.tagline,
        url,
        image: [`${siteUrl}/photos/og.jpg`, ...gallery.map((g) => abs(siteUrl, g.id))],
        logo: `${siteUrl}/favicon.svg`,
        telephone: d.phoneE164,
        email: d.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: d.address.street,
          addressLocality: d.address.locality,
          postalCode: d.address.postalCode,
          addressRegion: d.address.region,
          addressCountry: d.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: d.geo.lat, longitude: d.geo.lng },
        hasMap: d.mapsUrl,
        areaServed: [{ '@type': 'City', name: 'Ksibet El Mediouni' }, { '@type': 'AdministrativeArea', name: 'Monastir' }],
        // Google: "Open 24 hours" every day (owner to confirm).
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((x) => `https://schema.org/${x}`),
          opens: '00:00',
          closes: '23:59',
        },
        contactPoint: [
          { '@type': 'ContactPoint', telephone: d.phoneE164, contactType: 'sales', availableLanguage: ['fr', 'ar'] },
          { '@type': 'ContactPoint', telephone: d.phone2E164, contactType: 'sales', availableLanguage: ['fr', 'ar'] },
        ],
        sameAs: [d.mapsUrl, d.facebook, d.instagram],
        // Ratings and reviews come from Google, so they are shown on the page but not marked up
        // (Google ignores a business's own review markup as "self-serving").
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#stock`,
        name: `Stock publié au ${stockDate.fr}`,
        numberOfItems: stock.length,
        itemListElement: stock.map((c, i) => ({ '@type': 'ListItem', position: i + 1, item: carLd(siteUrl, c) })),
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
    meta('name', 'keywords', 'AHMED AUTO, showroom voiture Monastir, voiture occasion Ksibet El Mediouni, vente voiture Monastir, Mercedes occasion Monastir, BMW occasion Tunisie, hybride rechargeable occasion Tunisie'),
    `<link rel="canonical" href="${url}">`,
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    meta('name', 'theme-color', '#0D0D0F'),
    // Local signals
    meta('name', 'geo.region', d.address.regionCode),
    meta('name', 'geo.placename', d.address.locality),
    meta('name', 'geo.position', `${d.geo.lat};${d.geo.lng}`),
    meta('name', 'ICBM', `${d.geo.lat}, ${d.geo.lng}`),
    // Open Graph / social
    meta('property', 'og:type', 'business.business'),
    meta('property', 'og:site_name', d.name),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', og),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', hero.alt),
    meta('property', 'og:locale', 'fr_FR'),
    meta('property', 'business:contact_data:street_address', d.address.street),
    meta('property', 'business:contact_data:locality', d.address.locality),
    meta('property', 'business:contact_data:postal_code', d.address.postalCode),
    meta('property', 'business:contact_data:country_name', d.address.countryName),
    meta('property', 'business:contact_data:phone_number', d.phoneIntl),
    meta('property', 'business:contact_data:email', d.email),
    meta('property', 'place:location:latitude', String(d.geo.lat)),
    meta('property', 'place:location:longitude', String(d.geo.lng)),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', og),
    // Machine-readable summary for AI assistants and answer engines
    `<link rel="alternate" type="text/markdown" href="${siteUrl}/llms.txt" title="Résumé pour les LLM">`,
    `<link rel="preload" as="image" href="${`/photos/${hero.id}-1600.webp`}" imagesrcset="${photos[hero.id].widths.map((w) => `/photos/${hero.id}-${w}.webp ${w}w`).join(', ')}" imagesizes="(min-width: 1024px) 72vw, 100vw" fetchpriority="high">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function robotsTxt(siteUrl: string) {
  // Search and AI crawlers are all welcome; being cited by answer engines is the point of GEO.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']
  return ['User-agent: *', 'Allow: /', '', ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']), `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n')
}

export function sitemapXml(siteUrl: string, lastmod: string) {
  const images: { id: PhotoKey; caption: string }[] = [
    { id: hero.id, caption: hero.alt },
    ...stock.map((c) => ({ id: carPhoto(c, 1), caption: carAlt(c, 1) })),
    ...gallery.map((g) => ({ id: g.id, caption: g.alt })),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
${images.map((i) => `    <image:image><image:loc>${esc(abs(siteUrl, i.id))}</image:loc><image:caption>${esc(i.caption)}</image:caption></image:image>`).join('\n')}
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
    `# ${d.name} — showroom de voitures neuves et d’occasion à Ksibet El Mediouni (Monastir, Tunisie)`,
    '',
    `> ${d.summary} Noté ${d.rating.value}/5 sur Google (${d.rating.count} avis).`,
    '',
    '## Informations clés',
    `- Nom : ${d.name}`,
    `- Adresse : ${d.address.street}, ${d.address.locality}, ${d.address.region} ${d.address.postalCode}, ${d.address.countryName} (${d.plusCode})`,
    `- Coordonnées GPS : ${d.geo.lat}, ${d.geo.lng}`,
    `- Téléphone / WhatsApp : ${d.phoneIntl} ; téléphone : +216 ${d.phone2}`,
    `- E-mail : ${d.email}`,
    `- Horaires : ${d.hoursText.toLowerCase()} (à confirmer par téléphone)`,
    '- Achat : pas de vente ni de réservation en ligne ; contact par WhatsApp ou téléphone, puis visite au showroom',
    '- Prix : sur demande (aucun prix publié)',
    `- Note Google : ${d.rating.value}/5 (${d.rating.count} avis)`,
    '',
    `## Stock publié au ${stockDate.fr} (indicatif, disponibilité à confirmer)`,
    ...stock.map((c) => `- ${carName(c)} ${c.version}${c.colour ? `, ${c.colour}` : ''} — ${specLine(c).join(' · ')} — publié le ${c.date.split('-').reverse().join('/')} — prix sur demande — ${siteUrl}/#car-${c.id}`),
    '',
    '## Avis Google (extraits)',
    ...reviews.map((r) => `- « ${r.text} » — ${r.author} (${r.stars}/5)`),
    '',
    '## Liens',
    `- [Site web](${siteUrl}/)`,
    `- [Stock](${siteUrl}/#vehicules)`,
    `- [WhatsApp](https://wa.me/${d.whatsapp})`,
    `- [Google Maps](${d.mapsUrl})`,
    `- [Itinéraire](${d.directionsUrl})`,
    `- [Facebook](${d.facebook})`,
    `- [Instagram](${d.instagram})`,
    '',
    '## Questions fréquentes',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
  ].join('\n')
}
