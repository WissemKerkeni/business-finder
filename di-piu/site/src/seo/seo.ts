// Build-time SEO / GEO output, generated from src/data/restaurant.ts.
// Used by the Vite plugin in vite.config.ts; nothing here ships to the browser bundle.
import { faq, gallery, menu, photo, photoSrcSet, photos, restaurant as r } from '../data/restaurant.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const title = 'Di Più Monastir — Italian Restaurant: Pizza, Pasta & Grill'
export const description =
  'Di Più is an Italian restaurant in the centre of Monastir, Tunisia: pizza, pasta, ravioli, risotto, grilled meat and fish, mojitos and cheesecakes. ' +
  `Rated ${r.rating.value}★ on Google (${r.rating.count} reviews). Open every day 12:00–00:00. Terrace, takeaway and delivery.`

const shareImage = photo(photos.storefrontNight, 1200)

/** Menu prices like "6.9 · 9.8" list several sizes; the offer uses the first. */
const firstPrice = (p: string) => Number.parseFloat(p.split('·')[0]).toFixed(2)

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
        image: [shareImage, photo(photos.basketWall, 1200), photo(photos.terraceEvening, 1200)],
        telephone: r.phoneE164,
        priceRange: r.priceRange,
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
        sameAs: [r.facebook, r.mapsUrl],
        openingHoursSpecification: r.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: '23:59',
        })),
        hasMenu: {
          '@type': 'Menu',
          '@id': `${url}#menu`,
          name: `${r.name} menu`,
          inLanguage: 'fr',
          hasMenuSection: menu.flatMap((c) => c.groups).map((g) => ({
            '@type': 'MenuSection',
            name: g.title,
            hasMenuItem: g.items.map((i) => ({
              '@type': 'MenuItem',
              name: i.name,
              ...(i.description ? { description: i.description } : {}),
              ...(i.photo ? { image: photo(photos[i.photo], 800) } : {}),
              offers: { '@type': 'Offer', price: firstPrice(i.price), priceCurrency: 'TND' },
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
    meta('name', 'theme-color', '#07090A'),
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
    meta('property', 'og:image:alt', 'Di Più at night: a black storefront with the glowing Di Più Ristorante sign'),
    meta('property', 'og:locale', 'en_US'),
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
    `<link rel="preload" as="image" href="${photo(photos.storefrontNight, 1600)}" imagesrcset="${photoSrcSet(photos.storefrontNight)}" imagesizes="(min-width: 1024px) 42vw, 100vw" fetchpriority="high" referrerpolicy="no-referrer">`,
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
  const images = [photos.storefrontNight, photos.basketWall, photos.sageBar, ...gallery.map((g) => photos[g.id])]
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
    `# ${r.name} — Italian restaurant in Monastir, Tunisia`,
    '',
    `> ${r.summary} Rated ${r.rating.value}/5 on Google from ${r.rating.count} reviews.`,
    '',
    '## Key facts',
    `- Name: ${r.name} (signage: "Di Più · Ristorante")`,
    `- Cuisine: ${r.cuisine.join(', ')}`,
    `- Location: ${r.plusCode} ${r.address.postalCode}, ${r.address.countryName} (${r.landmark})`,
    `- Coordinates: ${r.geo.lat}, ${r.geo.lng}`,
    `- Phone / reservations: ${r.phone}`,
    `- Services: ${r.services.join(', ')}`,
    `- Good to know: ${r.facts.join(', ')}`,
    `- Price: ${r.pricePerPerson}`,
    `- Google rating: ${r.rating.value}/5 (${r.rating.count} reviews)`,
    `- Opening hours: ${r.hours.map((h) => `${h.label} ${h.opens}–${h.closes}`).join('; ')}`,
    '',
    '## Links',
    `- [Website](${siteUrl}/)`,
    `- [Menu](${siteUrl}/#menu)`,
    `- [Google Maps](${r.mapsUrl})`,
    `- [Facebook](${r.facebook})`,
    '',
    '## Menu (prices in Tunisian dinars, TND)',
    ...menu.flatMap((c) => c.groups).flatMap((g) => [
      '',
      `### ${g.title}${g.note ? ` (${g.note})` : ''}`,
      ...g.items.map((i) => `- ${i.name} — ${i.price} TND${i.description ? `: ${i.description}` : ''}`),
    ]),
    '',
    '## Frequently asked questions',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
  ]
  return lines.join('\n')
}
