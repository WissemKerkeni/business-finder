// Build-time SEO / GEO output, generated from src/data/business.ts, for the French page (/) and the English page (/en/).
// Used by the Vite plugin in vite.config.ts (dev, robots/sitemap/llms) and by scripts/prerender.mjs (head of each page);
// nothing here ships to the browser bundle.
import {
  business as b, carName, carPhoto, deliveries, destinations, faq, forSale, forSaleDate, hero, markets, photos,
  reviews, services, shipping, steps, videoCaption, videoOrder, type PhotoKey,
} from '../data/business.ts'
import { fmtDate, fmtRating, homePath, langs, type Lang } from '../i18n.tsx'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (siteUrl: string, id: PhotoKey, w = 1600) => {
  const ws = photos[id].widths
  return `${siteUrl}/photos/${id}-${ws.filter((x) => x <= w).pop() ?? ws[0]}.webp`
}
const isoDuration = (s: number) => `PT${Math.round(s)}S`
const pageUrl = (siteUrl: string, l: Lang) => `${siteUrl}${homePath(l)}`

// Titles and descriptions carry the searches the owner wants to be found for, in each language:
// export voiture / car export, Europe, Allemagne / Germany, Tunisie / Tunisia, entretien / maintenance, Stuttgart.
export const title: Record<Lang, string> = {
  fr: 'Chaari Auto — Export de voitures d’Europe vers la Tunisie et l’international | Stuttgart',
  en: 'Chaari Auto — Car export from Europe to Tunisia & worldwide | Stuttgart, Germany',
}
export const description: Record<Lang, string> = {
  fr: `Chaari Auto, région de Stuttgart (Allemagne) : ${b.experienceYears} ans d’expérience dans l’export de voitures d’Europe vers la Tunisie, la France, le Canada, ` +
    `les pays du Golfe et d’Afrique. Achat sur Mobile.de, démarches, carte grise, assurance, expédition depuis Gênes, entretien automobile. ` +
    `${fmtRating(b.rating.value, 'fr')}★ sur Google (${b.rating.count} avis).`,
  en: `Chaari Auto, Stuttgart region (Germany): ${b.experienceYears} years exporting cars from Europe to Tunisia, France, Canada, the Gulf and Africa. ` +
    `Buy on Mobile.de, paperwork, registration, insurance, shipping from Genoa, car maintenance. ` +
    `${fmtRating(b.rating.value, 'en')}★ on Google (${b.rating.count} reviews).`,
}
export const summary: Record<Lang, string> = {
  fr: `Chaari Auto est une entreprise d’export de voitures basée dans la région de Stuttgart (Lindenstraße 16, Bietigheim-Bissingen, Allemagne), ` +
    `avec ${b.experienceYears} ans d’expérience. Spécialiste de l’exportation de voitures d’Europe vers l’international : Tunisie, France, Canada, ` +
    `pays du Golfe et pays africains. Services : export de voitures (achat sur Mobile.de ou dans son stock, démarches administratives, ` +
    `carte grise au nom du propriétaire, assurance internationale avec couverture Tunisie, gestion jusqu’à la livraison), entretien automobile ` +
    `et expédition internationale depuis le port de Gênes (Italie). Contact par WhatsApp ou téléphone.`,
  en: `Chaari Auto is a car export business based in the Stuttgart region (Lindenstraße 16, Bietigheim-Bissingen, Germany) with ` +
    `${b.experienceYears} years of experience. It specialises in exporting cars from Europe to international destinations: Tunisia, France, ` +
    `Canada, the Gulf countries and African countries. Services: car export (purchase on Mobile.de or from its stock, administrative procedures, ` +
    `registration in the owner’s name, international insurance including Tunisia, management through to delivery), car maintenance, and ` +
    `international shipping from the port of Genoa (Italy). Contact by WhatsApp or phone.`,
}

const areaServed = (l: Lang) => [
  { '@type': 'Country', name: l === 'fr' ? 'Tunisie' : 'Tunisia' },
  { '@type': 'Country', name: 'France' },
  { '@type': 'Country', name: 'Canada' },
  ...['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'].map((name) => ({ '@type': 'Country', name })),
  { '@type': 'Continent', name: l === 'fr' ? 'Afrique' : 'Africa' },
]

export function jsonLd(siteUrl: string, l: Lang) {
  const url = pageUrl(siteUrl, l)
  const root = `${siteUrl}/`
  const bizId = `${root}#business`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // name / alternateName: the site name Google shows above the result instead of the bare domain.
      { '@type': 'WebSite', '@id': `${root}#website`, url: root, name: b.name, alternateName: ['CHAARI AUTO', 'Chaari Auto Export'], inLanguage: ['fr', 'en'], publisher: { '@id': bizId }, about: { '@id': bizId } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title[l], description: description[l], inLanguage: l, isPartOf: { '@id': `${root}#website` }, about: { '@id': bizId } },
      {
        // AutoDealer for the export business, AutoRepair for the maintenance service.
        '@type': ['AutoDealer', 'AutoRepair'],
        '@id': bizId,
        name: b.name,
        // Names customers use ("Auto Chaari Export" in a Google review), so brand searches find this entity.
        alternateName: ['CHAARI AUTO', 'Chaari Auto Export', 'Auto Chaari Export'],
        description: summary[l],
        slogan: b.tagline[l],
        url: root,
        image: [`${siteUrl}/photos/og.jpg`, abs(siteUrl, hero.id), ...deliveries.slice(0, 3).map((c) => abs(siteUrl, carPhoto(c, 1)))],
        logo: `${siteUrl}/logo/logo.png`,
        telephone: b.phoneE164,
        email: b.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: b.address.street,
          postalCode: b.address.postalCode,
          addressLocality: b.address.locality,
          addressRegion: 'Baden-Württemberg',
          addressCountry: b.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
        hasMap: b.mapsUrl,
        areaServed: areaServed(l),
        knowsAbout: l === 'fr'
          ? ['Export de voitures', 'Export de voitures d’Allemagne vers la Tunisie', 'Entretien automobile', 'Expédition internationale de véhicules', 'Mobile.de']
          : ['Car export', 'Car export from Germany to Tunisia', 'Car maintenance', 'International vehicle shipping', 'Mobile.de'],
        openingHoursSpecification: b.hours.filter((h) => h.opens).map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.schema.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: h.closes,
        })),
        contactPoint: [{ '@type': 'ContactPoint', telephone: b.phoneE164, contactType: 'customer service', availableLanguage: ['fr', 'en'], description: 'WhatsApp' }],
        // The Google Maps CID link ties this site to the Business Profile (knowledge panel).
        sameAs: [b.mapsUrl, `https://maps.google.com/?cid=${b.mapsCid}`, b.facebook, b.instagram, b.tiktok],
        // Google ratings and reviews are shown on the page but not marked up (Google ignores self-serving review markup).
      },
      ...services.map((s) => ({
        '@type': 'Service',
        '@id': `${root}#service-${s.key}`,
        name: s.title[l],
        description: s.text[l],
        provider: { '@id': bizId },
        areaServed: areaServed(l),
      })),
      {
        '@type': 'HowTo',
        '@id': `${url}#process`,
        name: l === 'fr' ? 'Acheter et exporter votre voiture avec Chaari Auto' : 'Buying and exporting your car with Chaari Auto',
        inLanguage: l,
        step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title[l], text: s.title[l] })),
      },
      // Cars for sale (none published today). An Offer only when a price is published, in its currency.
      ...forSale.map((c) => ({
        '@type': 'Car',
        '@id': `${root}#car-${c.id}`,
        name: `${carName(c)} ${c.year}`,
        brand: { '@type': 'Brand', name: c.make },
        model: c.model,
        vehicleModelDate: c.year,
        image: abs(siteUrl, carPhoto(c, 1)),
        ...(c.price !== null && c.currency ? { offers: { '@type': 'Offer', price: c.price, priceCurrency: c.currency, seller: { '@id': bizId } } } : {}),
      })),
      ...videoOrder.map((v) => ({
        '@type': 'VideoObject',
        '@id': `${root}#video-${v.id}`,
        name: `${videoCaption(v, l)} — Chaari Auto`,
        description: l === 'fr'
          ? `Extrait sans le son d’une vidéo publiée par Chaari Auto sur Facebook le ${fmtDate(v.uploadDate, l)} : ${videoCaption(v, l)}, « Export pour la Tunisie ».`
          : `Muted excerpt of a video posted by Chaari Auto on Facebook on ${fmtDate(v.uploadDate, l)}: ${videoCaption(v, l)}, “Export pour la Tunisie”.`,
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
        inLanguage: l,
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q[l], acceptedAnswer: { '@type': 'Answer', text: f.a[l] } })),
      },
    ],
  }
}

export function headTags(siteUrl: string, l: Lang) {
  const url = pageUrl(siteUrl, l)
  const meta = (attr: 'name' | 'property', key: string, content: string) => `<meta ${attr}="${key}" content="${esc(content)}">`
  const og = `${siteUrl}/photos/og.jpg`
  const locale = { fr: 'fr_FR', en: 'en_US' }
  return [
    `<title>${esc(title[l])}</title>`,
    meta('name', 'description', description[l]),
    `<link rel="canonical" href="${url}">`,
    ...langs.map((x) => `<link rel="alternate" hreflang="${x}" href="${pageUrl(siteUrl, x)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(siteUrl, 'fr')}">`,
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    meta('name', 'theme-color', '#0C0C0D'),
    meta('name', 'geo.region', b.address.regionCode),
    meta('name', 'geo.placename', `${b.address.locality}, Stuttgart`),
    meta('name', 'geo.position', `${b.geo.lat};${b.geo.lng}`),
    meta('name', 'ICBM', `${b.geo.lat}, ${b.geo.lng}`),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', b.name),
    meta('property', 'og:title', title[l]),
    meta('property', 'og:description', description[l]),
    meta('property', 'og:url', url),
    meta('property', 'og:image', og),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', l === 'fr' ? 'Cupra Formentor gris avec la plaque CHAARI AUTO' : 'Grey Cupra Formentor with the CHAARI AUTO plate'),
    meta('property', 'og:locale', locale[l]),
    meta('property', 'og:locale:alternate', locale[l === 'fr' ? 'en' : 'fr']),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title[l]),
    meta('name', 'twitter:description', description[l]),
    meta('name', 'twitter:image', og),
    `<link rel="alternate" type="text/markdown" href="${siteUrl}/llms.txt" title="llms.txt">`,
    `<link rel="preload" as="image" href="/photos/${hero.id}-1024.webp" imagesrcset="${photos[hero.id].widths.map((w) => `/photos/${hero.id}-${w}.webp ${w}w`).join(', ')}" imagesizes="(min-width: 1024px) 50vw, 100vw" fetchpriority="high">`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(siteUrl, l)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function robotsTxt(siteUrl: string) {
  // Search and AI crawlers are all welcome; being cited by answer engines is the point of GEO.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']
  return ['User-agent: *', 'Allow: /', '', ...aiBots.flatMap((x) => [`User-agent: ${x}`, 'Allow: /', '']), `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n')
}

export function sitemapXml(siteUrl: string, lastmod: string) {
  const images: { id: PhotoKey; caption: string }[] = [
    { id: hero.id, caption: hero.alt.fr },
    ...deliveries.map((c) => ({ id: carPhoto(c, 1), caption: c.alts[0] })),
  ]
  const alternates = [...langs.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${pageUrl(siteUrl, x)}"/>`), `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(siteUrl, 'fr')}"/>`].join('\n')
  const videoEntries = videoOrder.map((v) => `    <video:video>
      <video:thumbnail_loc>${esc(abs(siteUrl, v.poster, 1024))}</video:thumbnail_loc>
      <video:title>${esc(`${videoCaption(v, 'fr')} — Chaari Auto`)}</video:title>
      <video:description>${esc(`Extrait sans le son d’une vidéo publiée par Chaari Auto sur Facebook le ${fmtDate(v.uploadDate, 'fr')}.`)}</video:description>
      <video:content_loc>${siteUrl}${v.file}</video:content_loc>
      <video:duration>${Math.round(v.duration)}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${pageUrl(siteUrl, 'fr')}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
${images.map((i) => `    <image:image><image:loc>${esc(abs(siteUrl, i.id))}</image:loc><image:caption>${esc(i.caption)}</image:caption></image:image>`).join('\n')}
${videoEntries.join('\n')}
  </url>
  <url>
    <loc>${pageUrl(siteUrl, 'en')}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>
  <url>
    <loc>${siteUrl}/llms.txt</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
}

/** llms.txt (https://llmstxt.org): a plain-markdown fact sheet that AI assistants can quote directly. French first, then English. */
export function llmsTxt(siteUrl: string) {
  const fr: Lang = 'fr', en: Lang = 'en'
  return [
    `# ${b.name} — export de voitures d’Europe vers l’international (région de Stuttgart, Allemagne)`,
    '',
    `> ${summary.fr} Noté ${b.rating.value}/5 sur Google (${b.rating.count} avis).`,
    '',
    `English version of the site: ${pageUrl(siteUrl, en)}`,
    '',
    '## Informations clés',
    `- Nom : ${b.name}`,
    `- Adresse : ${b.address.street}, ${b.address.postalCode} ${b.address.locality}, ${b.address.countryName.fr} (région de Stuttgart)`,
    `- Coordonnées GPS : ${b.geo.lat}, ${b.geo.lng}`,
    `- WhatsApp / téléphone : ${b.phone}`,
    `- E-mail : ${b.email}`,
    `- Horaires : ${b.hours.map((h) => `${h.days.fr} ${h.time.fr}`).join(' ; ')}`,
    `- Expérience : ${b.experienceYears} ans`,
    `- Destinations : ${destinations.map((d) => d.fr).join(', ')}`,
    `- Expédition internationale : depuis le port de ${shipping.port.fr}`,
    `- Clientèle (répartition approximative) : ${markets.map((m) => `${m.name.fr} ${m.share} %`).join(', ')}`,
    '- Demande : par WhatsApp ou téléphone (le formulaire du site accepte un lien d’annonce Mobile.de) ; pas de vente, de paiement ni de réservation en ligne',
    '- Tarifs : non publiés',
    `- Note Google : ${b.rating.value}/5 (${b.rating.count} avis)`,
    '',
    '## Services',
    ...services.map((s) => `- ${s.title.fr} : ${s.text.fr}`),
    '',
    '## Comment ça marche',
    ...steps.map((s) => `${Number(s.n)}. ${s.title.fr}`),
    '',
    ...(forSale.length
      ? [`## Véhicules proposés (publiés au ${fmtDate(forSaleDate.iso, fr)}, disponibilité à confirmer)`, ...forSale.map((c) => `- ${carName(c)} ${c.year} — publié le ${fmtDate(c.date, fr)} — ${siteUrl}/#car-${c.id}`), '']
      : []),
    '## Voitures publiées « Export pour la Tunisie » (exemples, non proposées à la vente sur ce site)',
    ...deliveries.map((c) => `- ${carName(c)}${c.year ? ` ${c.year}` : ''}${c.kind === 'client' ? ' (voiture d’un client)' : ''}${c.specs.length ? ` — ${c.specs.map(([, v]) => v).join(', ')}` : ''} — ${c.date ? `publié le ${fmtDate(c.date, fr)} sur ${c.source}` : 'photo du profil Google Maps'} — ${siteUrl}/#car-${c.id}`),
    '',
    '## Vidéos (extraits sans le son, publiées sur Facebook)',
    ...videoOrder.map((v) => `- ${videoCaption(v, fr)} — ${fmtDate(v.uploadDate, fr)} — ${v.postUrl}`),
    '',
    '## Avis Google (extraits)',
    ...reviews.map((r) => `- « ${r.text.fr} » — ${r.author} (5/5)`),
    '',
    '## Liens',
    `- [Site web](${pageUrl(siteUrl, fr)}) · [English](${pageUrl(siteUrl, en)})`,
    `- [WhatsApp](https://wa.me/${b.whatsapp})`,
    `- [Google Maps](${b.mapsUrl})`,
    `- [Facebook](${b.facebook})`,
    `- [Instagram](${b.instagram})`,
    `- [TikTok](${b.tiktok})`,
    '',
    '## Questions fréquentes',
    ...faq.flatMap((f) => ['', `### ${f.q.fr}`, f.a.fr]),
    '',
    '---',
    '',
    `## English summary`,
    '',
    `> ${summary.en} Rated ${b.rating.value}/5 on Google (${b.rating.count} reviews).`,
    '',
    `- Address: ${b.address.street}, ${b.address.postalCode} ${b.address.locality}, ${b.address.countryName.en} (Stuttgart region)`,
    `- WhatsApp / phone: ${b.phone} · Email: ${b.email}`,
    `- Hours: ${b.hours.map((h) => `${h.days.en} ${h.time.en}`).join('; ')}`,
    `- Destinations: ${destinations.map((d) => d.en).join(', ')}; international shipping from ${shipping.port.en}`,
    `- Customers (approximate split): ${markets.map((m) => `${m.name.en} ${m.share}%`).join(', ')}`,
    '',
    '### How it works',
    ...steps.map((s) => `${Number(s.n)}. ${s.title.en}`),
    '',
    '### FAQ',
    ...faq.flatMap((f) => ['', `#### ${f.q.en}`, f.a.en]),
    '',
  ].join('\n')
}
