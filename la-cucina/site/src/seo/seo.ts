// Build-time SEO / GEO output, generated from src/data/restaurant.ts.
// Used by the Vite plugin in vite.config.ts; nothing here ships to the browser bundle.
import { faq, gallery, menu, photo, photoSrcSet, photos, restaurant as r } from '../data/restaurant.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const title = 'La Cucina Monastir — Italian Pizza & Pasta on Place 3 Août'
export const description =
  'La Cucina is an Italian restaurant on Place 3 Août, Monastir, Tunisia: pizza, pasta, house-made ravioli, paella and lasagne. ' +
  `Rated ${r.rating.value}★ on Google (${r.rating.count} reviews). Dine-in, takeaway and delivery, ${r.pricePerPerson}.`

const shareImage = photo(photos.storefrontNight, 1200)

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
        url,
        image: [shareImage, photo(photos.facadeDay, 1200), photo(photos.interiorDolceVita, 1200)],
        telephone: r.phoneE164,
        priceRange: r.priceRange,
        servesCuisine: r.cuisine,
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
        sameAs: [r.instagram, r.facebook, r.mapsUrl],
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
          inLanguage: 'fr',
          hasMenuSection: menu.map((s) => ({
            '@type': 'MenuSection',
            name: s.title,
            hasMenuItem: s.items.map((i) => ({
              '@type': 'MenuItem',
              name: i.name,
              ...(i.description ? { description: i.description } : {}),
              offers: { '@type': 'Offer', price: i.price.toFixed(2), priceCurrency: 'TND' },
            })),
          })),
        },
        // Ratings and reviews come from Google, so they are shown on the page but not marked up.
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
    `<link rel="canonical" href="${url}">`,
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    meta('name', 'theme-color', '#10231F'),
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
    meta('property', 'og:image:alt', 'La Cucina at night: a green wooden storefront with a neon CUCINA sign'),
    meta('property', 'og:locale', 'en_US'),
    meta('property', 'restaurant:contact_info:street_address', r.address.street),
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
    // Machine-readable summaries for AI assistants and answer engines
    `<link rel="alternate" type="text/markdown" href="${siteUrl}/llms.txt" title="LLM-friendly summary">`,
    `<link rel="preload" as="image" href="${photo(photos.storefrontNight, 1600)}" imagesrcset="${photoSrcSet(photos.storefrontNight)}" imagesizes="100vw" fetchpriority="high" referrerpolicy="no-referrer">`,
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
  const images = [photos.storefrontNight, photos.facadeDay, ...gallery.map((g) => g.id)]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
${images.map((id) => `    <image:image><image:loc>${esc(photo(id, 1600))}</image:loc></image:image>`).join('\n')}
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
    `# ${r.name} — Italian restaurant in Monastir, Tunisia`,
    '',
    `> ${r.summary} Rated ${r.rating.value}/5 on Google from ${r.rating.count} reviews.`,
    '',
    '## Key facts',
    `- Name: ${r.name} (signage: "CUCINA · RISTORANTE")`,
    `- Cuisine: ${r.cuisine.join(', ')}`,
    `- Address: ${r.address.street}, ${r.address.locality} ${r.address.postalCode}, ${r.address.countryName}`,
    `- Coordinates: ${r.geo.lat}, ${r.geo.lng} (plus code ${r.plusCode})`,
    `- Phone / reservations: ${r.phone}`,
    `- Services: ${r.services.join(', ')}`,
    `- Price: ${r.pricePerPerson}`,
    `- Google rating: ${r.rating.value}/5 (${r.rating.count} reviews)`,
    `- Opening hours: ${r.hours.map((h) => `${h.label} ${h.opens}–${h.closes}`).join('; ')}; Friday: ${r.fridayNote.toLowerCase()}`,
    '',
    '## Links',
    `- [Website](${siteUrl}/)`,
    `- [Menu](${siteUrl}/#menu)`,
    `- [Google Maps](${r.mapsUrl})`,
    `- [Instagram ${r.instagramHandle}](${r.instagram})`,
    `- [Facebook](${r.facebook})`,
    '',
    '## Menu (prices in Tunisian dinars, TND)',
    ...menu.flatMap((s) => [
      '',
      `### ${s.title}`,
      ...s.items.map((i) => `- ${i.name}${i.note ? ` (${i.note})` : ''} — ${i.price} TND${i.description ? `: ${i.description}` : ''}`),
    ]),
    '',
    '## Frequently asked questions',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
  ]
  return lines.join('\n')
}
