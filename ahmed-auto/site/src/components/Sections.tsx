import { useEffect, useRef, useState } from 'react'
import { dealer as d, faq, gallery, reviews, steps, stockDate, wa } from '../data/dealer'
import { Photo, SectionTitle, Stars, WaIcon, Wordmark, Wrap, btn } from './ui'

export function HowToBuy() {
  return (
    <section id="acheter" aria-labelledby="buy-title" className="border-y border-white/10 bg-graphite py-20 lg:py-28">
      <Wrap>
        <SectionTitle eyebrow="02 / Achat" id="buy-title" className="mb-12">Comment acheter</SectionTitle>
        <ol className="grid lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-b border-white/10 py-8 lg:border-b-0 lg:border-l lg:px-10 lg:py-0 lg:first:border-l-0 lg:first:pl-0">
              <p className="tnum mb-6 font-mono text-5xl text-neutral-600">{s.n}</p>
              <h3 className="mb-3 font-wide text-xl font-bold uppercase">{s.title}</h3>
              <p className="leading-relaxed text-neutral-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  )
}

export function Gallery() {
  const [a, b, c] = gallery
  return (
    <section id="showroom" aria-labelledby="showroom-title" className="bg-ink py-20 lg:py-28">
      <Wrap>
        <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="03 / Showroom" id="showroom-title">Le showroom</SectionTitle>
          <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">Route de Monastir, Ksibet El Mediouni · Photos Google Maps</p>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <figure className="aspect-[4/3] overflow-hidden bg-graphite lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:h-full">
            <Photo id={a.id} alt={a.alt} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover" />
          </figure>
          {[b, c].map((g) => (
            <figure key={g.id} className="aspect-[4/3] overflow-hidden bg-graphite lg:col-span-5">
              <Photo id={g.id} alt={g.alt} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

export function Reviews() {
  const r = d.rating
  return (
    <section id="avis" aria-labelledby="reviews-title" className="border-y border-white/10 bg-graphite py-20 lg:py-28">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          <SectionTitle eyebrow="04 / Avis" id="reviews-title" className="mb-8">Avis Google</SectionTitle>
          <p className="mb-2 font-wide text-8xl font-black leading-none">{r.value.toFixed(1).replace('.', ',')}</p>
          <p className="mb-1 text-xl text-signal-text" aria-hidden>★★★★★</p>
          <p className="mb-6 font-mono text-xs uppercase tracking-wider text-neutral-400">{r.count} avis Google</p>
          <div className="mb-8 max-w-xs space-y-2">
            {r.distribution.map(([s, n]) => (
              <div key={s} className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                <span className="w-6">{s}★</span>
                <span className="h-1.5 flex-1 bg-white/10"><span className="block h-full bg-signal" style={{ width: `${(n / r.count) * 100}%` }} /></span>
                <span className="tnum w-5 text-right">{n}</span>
              </div>
            ))}
          </div>
          <a href={d.reviewsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>Voir tous les avis sur Google</a>
        </div>
        <div>
          {reviews.map((q) => (
            <figure key={q.author} className="border-b border-white/10 py-7 first:pt-0">
              <blockquote className="mb-4 text-lg leading-relaxed text-neutral-100">« {q.text} »</blockquote>
              <figcaption className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                <Stars n={q.stars} className="mr-2" />{q.author}{q.note ? ` · ${q.note}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-ink py-20 lg:py-24">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionTitle eyebrow="Questions" id="faq-title">Bon à savoir</SectionTitle>
        <div className="border-t border-white/10">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-white/10 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-wide text-lg font-bold uppercase lg:text-xl">
                {f.q}<span className="font-mono text-signal-text transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-neutral-400">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

export function Location() {
  // Load the Google Maps iframe only when it scrolls near the viewport.
  const mapRef = useRef<HTMLDivElement>(null)
  const [showMap, setShowMap] = useState(false)
  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShowMap(true), io.disconnect()), { rootMargin: '400px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const row = 'grid grid-cols-[7rem_1fr] gap-4 py-4'
  const dt = 'pt-0.5 font-mono text-[11px] uppercase tracking-wider text-neutral-500'

  return (
    <section id="acces" aria-labelledby="access-title" className="border-t border-white/10 bg-ink py-20 lg:py-28">
      <Wrap>
        <SectionTitle eyebrow="05 / Accès" id="access-title" className="mb-10">Nous trouver</SectionTitle>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div ref={mapRef} className="relative h-[340px] overflow-hidden border border-white/10 bg-graphite lg:h-[460px]">
            {showMap ? (
              <iframe title={`Carte : ${d.name}, ${d.address.street}, ${d.address.locality}`} src={d.mapsEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <a href={d.mapsUrl} className="eyebrow absolute inset-0 grid place-items-center text-chalk-dim">Ouvrir la carte</a>
            )}
            <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className="absolute right-3 bottom-3 z-10 border border-white/10 bg-black/70 px-3 py-2 font-mono text-xs uppercase tracking-wider hover:text-signal-text">Ouvrir dans Google Maps ↗</a>
          </div>
          <address className="not-italic">
            <p className="mb-5 font-wide text-2xl font-extrabold uppercase">{d.name}</p>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              <div className={row}><dt className={dt}>Adresse</dt><dd className="text-neutral-200">{d.address.street}, {d.address.locality}, {d.address.region} {d.address.postalCode}<br /><span className="font-mono text-xs text-neutral-500">Plus code {d.plusCode}</span></dd></div>
              <div className={row}><dt className={dt}>Téléphone</dt><dd className="font-mono text-neutral-200"><a href={`tel:${d.phoneE164}`} className="hover:text-signal-text">{d.phone}</a><br /><a href={`tel:${d.phone2E164}`} className="hover:text-signal-text">{d.phone2}</a></dd></div>
              <div className={row}><dt className={dt}>E-mail</dt><dd><a href={`mailto:${d.email}`} className="break-all text-neutral-200 hover:text-signal-text">{d.email}</a></dd></div>
              <div className={row}><dt className={dt}>Horaires</dt><dd className="text-neutral-200">{d.hoursText}.<br /><span className="text-sm text-neutral-400">{d.hoursNote}</span></dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={d.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>Itinéraire</a>
              <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>Google Maps</a>
            </div>
          </address>
        </div>
      </Wrap>
    </section>
  )
}

export function Visit() {
  const b = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors'
  return (
    <section aria-labelledby="visit-title" className="bg-signal py-16 lg:py-20">
      <Wrap className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <h2 id="visit-title" className="font-wide text-4xl font-black italic uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">Un véhicule vous intéresse ?</h2>
        <div className="flex shrink-0 flex-wrap gap-3 lg:flex-nowrap">
          <a href={`tel:${d.phoneE164}`} className={`${b} border border-white/60 text-white hover:bg-white hover:text-signal`}>Appeler</a>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${b} bg-ink text-white hover:bg-black`}><WaIcon />WhatsApp</a>
          <a href={d.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${b} border border-white/60 text-white hover:bg-white hover:text-signal`}>Itinéraire</a>
        </div>
      </Wrap>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-12 pb-12">
      <Wrap className="flex flex-col justify-between gap-6 text-center lg:flex-row lg:items-center lg:text-left">
        <div className="flex flex-col items-center gap-1 lg:items-start">
          <Wordmark className="text-2xl" />
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-neutral-500">{d.address.street}, {d.address.locality}</p>
        </div>
        <p className="max-w-md font-mono text-xs text-neutral-400">Stock indicatif, publié au {stockDate.fr}. Contactez-nous pour la disponibilité.</p>
        <div className="flex justify-center gap-6 font-mono text-xs uppercase tracking-wider">
          <a href={d.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white">Facebook</a>
          <a href={d.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white">Instagram</a>
        </div>
      </Wrap>
      <Wrap className="mt-8"><p className="text-center font-mono text-[11px] text-neutral-600 lg:text-left">© 2026 {d.name}</p></Wrap>
    </footer>
  )
}

/** Phones and tablets: Call · WhatsApp · Directions, shown once the hero scrolls away. */
export function ActionBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const onScroll = () => setVisible(hero.getBoundingClientRect().bottom <= 0)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    onScroll()
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
  }, [])
  return (
    <nav
      aria-label="Actions rapides"
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-graphite font-mono text-xs font-bold uppercase tracking-[0.12em] transition-transform duration-300 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={`tel:${d.phoneE164}`} className="border-r border-white/10 py-4 text-center" tabIndex={visible ? 0 : -1}>Appeler</a>
      <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-signal py-4 text-white" tabIndex={visible ? 0 : -1}><WaIcon className="h-3.5 w-3.5" />WhatsApp</a>
      <a href={d.directionsUrl} target="_blank" rel="noopener noreferrer" className="border-l border-white/10 py-4 text-center" tabIndex={visible ? 0 : -1}>Itinéraire</a>
    </nav>
  )
}
