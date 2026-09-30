// Build-time SEO / GEO output, generated from src/data/business.ts.
// Used by the Vite plugin in vite.config.ts; nothing here ships to the browser bundle.
import {
  business as b, carName, carPhoto, deliveries, faq, forSale, forSaleDate, frDate, hero, photos, reviews, steps,
  videoCaption, videoOrder, type PhotoKey,
} from '../data/business.ts'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (siteUrl: string, id: PhotoKey, w = 1600) => {
  const ws = photos[id].widths
  return `${siteUrl}/photos/${id}-${ws.filter((x) => x <= w).pop() ?? ws[0]}.webp`
}
const ratingFr = b.rating.value.toFixed(1).replace('.', ',')
const isoDuration = (s: number) => `PT${Math.round(s)}S`

export const title = 'Chaari Auto — Export de voitures d’Europe vers la Tunisie, service clé en main'
export const description =
  `Chaari Auto (Bietigheim-Bissingen, Allemagne), spécialiste de l’exportation de voitures d’Europe vers la Tunisie. ` +
  `Service clé en main pour les Tunisiens résidant à l’étranger : achat de votre voiture, dossier d’exportation, carte grise et assurance, ` +
  `gestion complète jusqu’à la livraison. WhatsApp ${b.phone}. Noté ${ratingFr}★ sur Google (${b.rating.count} avis).`
export const summary =
  'Chaari Auto est une entreprise d’exportation de voitures basée Lindenstraße 16 à Bietigheim-Bissingen (Allemagne). ' +
  'Elle propose aux Tunisiens résidant à l’étranger un service clé en main : achat de la voiture, préparation du dossier d’exportation, ' +
  'carte grise et assurance, et gestion complète jusqu’à la livraison. Export de l’Europe vers la Tunisie et la France. Contact par WhatsApp ou téléphone.'

export function jsonLd(siteUrl: string) {
  const url = `${siteUrl}/`
  const bizId = `${url}#business`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${url}#website`, url, name: b.name, inLanguage: 'fr', about: { '@id': bizId } },
      {
        '@type': 'AutoDealer',
        '@id': bizId,
        name: b.name,
        alternateName: 'CHAARI AUTO',
        description: summary,
        slogan: b.tagline,
        url,
        image: [`${siteUrl}/photos/og.jpg`, abs(siteUrl, hero.id), ...deliveries.slice(0, 3).map((c) => abs(siteUrl, carPhoto(c, 1)))],
        logo: `${siteUrl}/favicon.svg`,
        telephone: b.phoneE164,
        email: b.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: b.address.street,
          postalCode: b.address.postalCode,
          addressLocality: b.address.locality,
          addressCountry: b.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
        hasMap: b.mapsUrl,
        // As stated in the business's bio: "Export de voiture de l'europe vers la Tunisie et la France".
        areaServed: [{ '@type': 'Country', name: 'Tunisie' }, { '@type': 'Country', name: 'France' }],
        openingHoursSpecification: b.hours.filter((h) => h.opens).map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.schema.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: h.closes,
        })),
        contactPoint: [{ '@type': 'ContactPoint', telephone: b.phoneE164, contactType: 'customer service', availableLanguage: ['fr'], description: 'WhatsApp et téléphone' }],
        sameAs: [b.mapsUrl, b.facebook, b.instagram, b.tiktok],
        // Google ratings and reviews are shown on the page but not marked up (Google ignores self-serving review markup).
      },
      ...steps.map((s) => ({
        '@type': 'Service',
        '@id': `${url}#service-${s.n}`,
        name: s.title,
        serviceType: 'Export de voitures d’Europe vers la Tunisie',
        provider: { '@id': bizId },
        audience: { '@type': 'Audience', audienceType: b.audience },
        areaServed: [{ '@type': 'Country', name: 'Tunisie' }, { '@type': 'Country', name: 'France' }],
      })),
      // Cars for sale (none published today). An Offer only when a price is published, in its currency.
      ...forSale.map((c) => ({
        '@type': 'Car',
        '@id': `${url}#car-${c.id}`,
        name: `${carName(c)} ${c.year}`,
        brand: { '@type': 'Brand', name: c.make },
        model: c.model,
        vehicleModelDate: c.year,
        image: abs(siteUrl, carPhoto(c, 1)),
        ...(c.price !== null && c.currency ? { offers: { '@type': 'Offer', price: c.price, priceCurrency: c.currency, seller: { '@id': bizId } } } : {}),
      })),
      ...videoOrder.map((v) => ({
        '@type': 'VideoObject',
        '@id': `${url}#video-${v.id}`,
        name: `${videoCaption(v)} — Chaari Auto`,
        description: `Extrait sans le son d’une vidéo publiée par Chaari Auto sur Facebook le ${frDate(v.uploadDate)} : ${videoCaption(v)}, « Export pour la Tunisie ».`,
        thumbnailUrl: abs(siteUrl, v.poster, 1024),
        contentUrl: `${siteUrl}${v.file}`,
        uploadDate: v.uploadDate,
        duration: isoDuration(v.duration),
        width: v.w,
        height: v.h,
        isBasedOn: v.postUrl,
        publisher: { '@id': bizId },
      })),
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
    `<link rel="canonical" href="${url}">`,
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    meta('name', 'theme-color', '#0C0C0D'),
    meta('name', 'geo.region', b.address.regionCode),
    meta('name', 'geo.placename', b.address.locality),
    meta('name', 'geo.position', `${b.geo.lat};${b.geo.lng}`),
    meta('name', 'ICBM', `${b.geo.lat}, ${b.geo.lng}`),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', b.name),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', og),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', 'Cupra Formentor gris avec la plaque CHAARI AUTO'),
    meta('property', 'og:locale', 'fr_FR'),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', og),
    `<link rel="alternate" type="text/markdown" href="${siteUrl}/llms.txt" title="Résumé pour les LLM">`,
    `<link rel="preload" as="image" href="/photos/${hero.id}-1024.webp" imagesrcset="${photos[hero.id].widths.map((w) => `/photos/${hero.id}-${w}.webp ${w}w`).join(', ')}" imagesizes="(min-width: 1024px) 50vw, 100vw" fetchpriority="high">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function robotsTxt(siteUrl: string) {
  // Search and AI crawlers are all welcome; being cited by answer engines is the point of GEO.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']
  return ['User-agent: *', 'Allow: /', '', ...aiBots.flatMap((x) => [`User-agent: ${x}`, 'Allow: /', '']), `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n')
}

export function sitemapXml(siteUrl: string, lastmod: string) {
  const images: { id: PhotoKey; caption: string }[] = [
    { id: hero.id, caption: hero.alt },
    ...deliveries.map((c) => ({ id: carPhoto(c, 1), caption: c.alts[0] })),
  ]
  const videoEntries = videoOrder.map((v) => `    <video:video>
      <video:thumbnail_loc>${esc(abs(siteUrl, v.poster, 1024))}</video:thumbnail_loc>
      <video:title>${esc(`${videoCaption(v)} — Chaari Auto`)}</video:title>
      <video:description>${esc(`Extrait sans le son d’une vidéo publiée par Chaari Auto sur Facebook le ${frDate(v.uploadDate)}.`)}</video:description>
      <video:content_loc>${siteUrl}${v.file}</video:content_loc>
      <video:duration>${Math.round(v.duration)}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
${images.map((i) => `    <image:image><image:loc>${esc(abs(siteUrl, i.id))}</image:loc><image:caption>${esc(i.caption)}</image:caption></image:image>`).join('\n')}
${videoEntries.join('\n')}
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
    `# ${b.name} — export de voitures d’Europe vers la Tunisie (Bietigheim-Bissingen, Allemagne)`,
    '',
    `> ${summary} Noté ${b.rating.value}/5 sur Google (${b.rating.count} avis).`,
    '',
    '## Informations clés',
    `- Nom : ${b.name}`,
    `- Adresse : ${b.address.street}, ${b.address.postalCode} ${b.address.locality}, ${b.address.countryName}`,
    `- Coordonnées GPS : ${b.geo.lat}, ${b.geo.lng}`,
    `- WhatsApp / téléphone : ${b.phone}`,
    `- E-mail : ${b.email}`,
    `- Horaires : ${b.hours.map((h) => `${h.days} ${h.time}`).join(' ; ')}`,
    `- Public : ${b.audience}`,
    `- Export : de l’Europe vers ${b.destinations}`,
    '- Demande : par WhatsApp ou téléphone ; pas de vente, de paiement ni de réservation en ligne',
    '- Tarifs : non publiés',
    `- Note Google : ${b.rating.value}/5 (${b.rating.count} avis)`,
    '',
    '## Le service (étapes indiquées par Chaari Auto)',
    ...steps.map((s) => `${Number(s.n)}. ${s.title}`),
    '',
    ...(forSale.length
      ? [`## Véhicules proposés (publiés au ${forSaleDate.fr}, disponibilité à confirmer)`, ...forSale.map((c) => `- ${carName(c)} ${c.year} — publié le ${frDate(c.date)} — ${siteUrl}/#car-${c.id}`), '']
      : []),
    '## Voitures publiées « Export pour la Tunisie » (exemples, non proposées à la vente sur ce site)',
    ...deliveries.map((c) => `- ${carName(c)}${c.year ? ` ${c.year}` : ''}${c.kind === 'client' ? ' (voiture d’un client)' : ''}${c.specs.length ? ` — ${c.specs.map(([, v]) => v).join(', ')}` : ''} — ${c.date ? `publié le ${frDate(c.date)} sur ${c.source}` : 'photo du profil Google Maps'} — ${siteUrl}/#car-${c.id}`),
    '',
    '## Vidéos (extraits sans le son, publiées sur Facebook)',
    ...videoOrder.map((v) => `- ${videoCaption(v)} — ${frDate(v.uploadDate)} — ${v.postUrl}`),
    '',
    '## Avis Google (extraits)',
    ...reviews.map((r) => `- « ${r.text} » — ${r.author} (5/5)`),
    '',
    '## Liens',
    `- [Site web](${siteUrl}/)`,
    `- [WhatsApp](https://wa.me/${b.whatsapp})`,
    `- [Google Maps](${b.mapsUrl})`,
    `- [Facebook](${b.facebook})`,
    `- [Instagram](${b.instagram})`,
    `- [TikTok](${b.tiktok})`,
    '',
    '## Questions fréquentes',
    ...faq.flatMap((f) => ['', `### ${f.q}`, f.a]),
    '',
  ].join('\n')
}
