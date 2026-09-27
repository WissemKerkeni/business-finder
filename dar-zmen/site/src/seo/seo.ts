// Build-time SEO / GEO output, generated from src/data/restaurant.ts.
// Used by the Vite plugin in vite.config.ts; nothing here ships to the browser bundle.
import { dishesOfTheDay, faq, gallery, menu, photo, photoSrcSet, photos, restaurant as r } from '../data/restaurant.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const title = 'Dar Zmen Monastir — Traditional Tunisian Restaurant in the Medina, Open 24/24'
export const description =
  'Dar Zmen (دار زمان) is a traditional Tunisian restaurant in the medina of Monastir: couscous, ojja, mloukhia, kamounia, grilled fish and chorba. ' +
  `Open 24/24. Rated ${r.rating.value}★ on Google (${r.rating.count} reviews). Dine-in, takeaway and delivery, TND 10–20 per person.`

const shareImage = photo(photos.gate, 1200)

export function jsonLd(siteUrl: string) {
  const url = `${siteUrl}/`
  const restaurantId = `${url}#restaurant`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: `${r.name} Monastir`,
        inLanguage: 'en',
        about: { '@id': restaurantId },
      },
      {
        '@type': 'Restaurant',
        '@id': restaurantId,
        name: r.name,
        alternateName: r.alternateName,
        description: r.summary,
        slogan: `${r.name} — ${r.meaning}`,
        url,
        image: [shareImage, photo(photos.diningRoom, 1200), photo(photos.couscousNabeul, 1200)],
        telephone: r.phoneE164,
        priceRange: r.priceRange,
        currenciesAccepted: 'TND',
        servesCuisine: r.cuisine,
        acceptsReservations: true,
        address: {
          '@type': 'PostalAddress',
          streetAddress: r.address.street,
          addressLocality: r.address.locality,
          postalCode: r.address.postalCode,
          addressRegion: r.address.region,
          addressCountry: r.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: r.geo.lat, longitude: r.geo.lng },
        hasMap: r.mapsUrl,
        sameAs: [r.mapsUrl],
        amenityFeature: [
          ...r.services.map((s) => ({ '@type': 'LocationFeatureSpecification', name: s, value: true })),
          { '@type': 'LocationFeatureSpecification', name: 'Free parking', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Halal food', value: true },
        ],
        openingHoursSpecification: r.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: h.closes,
        })),
        hasMenu: {
          '@type': 'Menu',
          '@id': `${url}#menu`,
          name: `${r.name} menu`,
          inLanguage: ['ar', 'en'],
          hasMenuSection: [
            ...menu.flatMap((c) => c.groups).map((g) => ({
              '@type': 'MenuSection',
              name: g.title,
              hasMenuItem: g.items.map((i) => ({
                '@type': 'MenuItem',
                name: i.name,
                alternateName: i.ar,
                ...(i.photo ? { image: photo(photos[i.photo], 800) } : {}),
                offers: { '@type': 'Offer', price: Number(i.price).toFixed(2), priceCurrency: 'TND' },
              })),
            })),
            {
              '@type': 'MenuSection',
              name: 'Dishes of the day (rotating)',
              hasMenuItem: dishesOfTheDay.map((name) => ({ '@type': 'MenuItem', name })),
            },
          ],
        },
        // Ratings and reviews come from Google, so they are shown on the page but not marked up:
        // Google treats a business's own review markup as "self-serving" and ignores it.
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }
}

export function headTags(siteUrl: string) {
  const url = `${siteUrl}/`
  const meta = (attr: 'name' | 'property', key: string, content: string) =>
    `<meta ${attr}="${key}" content="${esc(content)}">`
  return [
    `<title>${esc(title)}</title>`,
    meta('name', 'description', description),
    meta('name', 'keywords', 'Dar Zmen, دار زمان, restaurant Monastir, Tunisian food Monastir, couscous Monastir, medina Monastir restaurant, ojja, mloukhia, open 24 hours Monastir'),
    `<link rel="canonical" href="${url}">`,
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    meta('name', 'theme-color', '#15171C'),
    // Google Search Console ownership (HTML-tag method)
    meta('name', 'google-site-verification', 'BxC7Pzcc0thkpie9OR38pOv2gAkHXDST6njeZCD2aL0'),
    // Local signals
    meta('name', 'geo.region', r.address.regionCode),
    meta('name', 'geo.placename', r.address.locality),
    meta('name', 'geo.position', `${r.geo.lat};${r.geo.lng}`),
    meta('name', 'ICBM', `${r.geo.lat}, ${r.geo.lng}`),
    // Open Graph / social
    meta('property', 'og:type', 'restaurant.restaurant'),
    meta('property', 'og:site_name', `${r.name} Monastir`),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', shareImage),
    meta('property', 'og:image:alt', 'The stone gateway in the medina walls of Monastir with the Dar Zmen (دار زمان) sign'),
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'og:locale:alternate', 'ar_TN'),
    meta('property', 'restaurant:contact_info:locality', r.address.locality),
    meta('property', 'restaurant:contact_info:postal_code', r.address.postalCode),
    meta('property', 'restaurant:contact_info:country_name', r.address.countryName),
    meta('property', 'restaurant:contact_info:phone_number', r.phone),
    meta('property', 'place:location:latitude', String(r.geo.lat)),
    meta('property', 'place:location:longitude', String(r.geo.lng)),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', shareImage),
    // Machine-readable summary for AI assistants and answer engines
    `<link rel="alternate" type="text/markdown" href="${siteUrl}/llms.txt" title="LLM-friendly summary">`,
    `<link rel="preload" as="image" href="${photo(photos.gate, 1600)}" imagesrcset="${photoSrcSet(photos.gate)}" imagesizes="100vw" fetchpriority="high" referrerpolicy="no-referrer">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function robotsTxt(siteUrl: string) {
  // Search and AI crawlers are all welcome; being cited by answer engines is the point of GEO.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']
  return [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
}

export function sitemapXml(siteUrl: string, lastmod: string) {
  const images = [photos.gate, photos.diningRoom, photos.couscousNabeul, ...gallery.map((g) => photos[g.id])]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
${[...new Set(images)].map((id) => `    <image:image><image:loc>${esc(photo(id, 1600))}</image:loc></image:image>`).join('\n')}
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
  const lines = [
    `# ${r.name} (${r.nameAr}) — traditional Tunisian restaurant in the medina of Monastir, Tunisia`,
    '',
    `> ${r.summary} Rated ${r.rating.value}/5 on Google from ${r.rating.count} reviews.`,
    '',
    '## Key facts',
    `- Name: ${r.name} (Arabic: ${r.nameAr}; "dar zmen" means "${r.meaning}")`,
    `- Sign over the entrance: "${r.nameAr} — ${r.signLine}" (${r.signLineEn}), 24/24`,
    `- Cuisine: ${r.cuisine.join(', ')}`,
    `- Location: ${r.plusCode} ${r.address.postalCode}, ${r.address.countryName} (${r.landmark})`,
    `- Coordinates: ${r.geo.lat}, ${r.geo.lng}`,
    `- Phone / reservations: ${r.phone}`,
    `- Opening hours: ${r.hoursText}`,
    `- Services: ${r.services.join(', ')} (delivery via Glovo)`,
    `- Good to know: ${r.facts.join(', ')}`,
    `- Parking: ${r.parking}`,
    `- Price: ${r.pricePerPerson}`,
    `- Google rating: ${r.rating.value}/5 (${r.rating.count} reviews)`,
    '',
    '## Links',
    `- [Website](${siteUrl}/)`,
    `- [Menu](${siteUrl}/#menu)`,
    `- [Google Maps](${r.mapsUrl})`,
    `- [Directions](${r.directionsUrl})`,
    '',
    '## Menu (from the printed menu; prices in Tunisian dinars, TND)',
    ...menu.flatMap((c) => c.groups).flatMap((g) => [
      '',
      `### ${g.title}`,
      ...g.items.map((i) => `- ${i.name} (${i.ar}) — ${i.price} TND`),
    ]),
    '',
    '### Dishes of the day (rotating, ask at the counter)',
    ...dishesOfTheDay.map((d) => `- ${d}`),
    '',
    '## Frequently asked questions',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
  ]
  return lines.join('\n')
}
