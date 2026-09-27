import { useEffect, useRef, useState } from 'react'
import { agency as a, faq, wa } from '../data/agency'
import { SectionTitle, WaIcon, Wordmark } from './ui'

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-b border-white/10 py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-12">
        <SectionTitle eyebrow="Questions" id="faq-title">Bon à savoir</SectionTitle>
        <div className="border-t border-white/10">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-white/10 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-cond text-xl font-bold uppercase lg:text-2xl">
                {f.q}<span className="font-mono text-signal-text transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-neutral-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
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

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-b border-white/10 bg-charcoal py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionTitle eyebrow="05 / Coordonnées" id="contact-title" className="mb-12 lg:mb-14">Contact &amp; accès</SectionTitle>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div ref={mapRef} className="relative h-[360px] overflow-hidden border border-white/10 bg-deep lg:col-span-7 lg:h-[480px]">
            {showMap ? (
              <iframe
                title={`Carte : ${a.name}, ${a.address.street}, ${a.address.locality}`}
                src={a.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <a href={a.mapsUrl} className="eyebrow absolute inset-0 grid place-items-center text-chalk-dim">Ouvrir la carte</a>
            )}
            <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="absolute right-3 bottom-3 z-10 border border-white/10 bg-black/70 px-3 py-2 font-mono text-xs uppercase tracking-wider hover:text-signal-text">Ouvrir dans Google Maps ↗</a>
          </div>
          <address className="flex flex-col divide-y divide-white/10 not-italic lg:col-span-5">
            <div className="pb-8">
              <p className="eyebrow mb-2 text-signal-text">L’agence</p>
              <p className="mb-2 font-cond text-4xl font-extrabold uppercase tracking-tight">Agence Top Car</p>
              <p className="text-lg text-neutral-300">{a.address.street}, {a.address.locality} {a.address.postalCode}</p>
              <p className="mt-1 font-mono text-xs text-neutral-500">Plus code : {a.plusCode}</p>
            </div>
            <div className="py-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">Horaires d’ouverture</p>
              <dl className="space-y-3 font-mono text-sm">
                {a.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between">
                    <dt className="text-neutral-300">{h.days}</dt>
                    <dd className={h.time === 'Fermé' ? 'font-bold text-signal-text' : 'font-bold text-white'}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="space-y-6 pt-8">
              <div>
                <p className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-400">Téléphone / WhatsApp</p>
                <a href={`tel:${a.phoneE164}`} className="block font-mono text-2xl font-bold hover:text-signal-text">{a.phone}</a>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs uppercase tracking-widest text-neutral-400">E-mail</p>
                <a href={`mailto:${a.email}`} className="block font-mono text-base text-neutral-300 hover:text-white">{a.email}</a>
              </div>
            </div>
          </address>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 text-xs text-neutral-400 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <Wordmark small />
          <span className="hidden text-neutral-600 md:inline" aria-hidden>|</span>
          <span>{a.address.street}, {a.address.locality} {a.address.postalCode}</span>
          <span className="hidden text-neutral-600 md:inline" aria-hidden>|</span>
          <a href={`tel:${a.phoneE164}`} className="font-mono text-neutral-300 hover:text-white">{a.phone}</a>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
          <a href={a.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
          <span className="text-neutral-600" aria-hidden>·</span>
          <span className="text-neutral-500">© 2026 {a.name}</span>
        </div>
      </div>
    </footer>
  )
}

/** Phones and tablets: Call · WhatsApp · Directions, shown once the hero (which has its own request bar) scrolls away. */
export function ActionBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting))
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return (
    <nav
      aria-label="Actions rapides"
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-deep font-cond text-sm font-bold uppercase tracking-wider transition-transform duration-300 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={`tel:${a.phoneE164}`} className="border-r border-white/10 py-4 text-center" tabIndex={visible ? 0 : -1}>Appeler</a>
      <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-signal py-4 text-white" tabIndex={visible ? 0 : -1}><WaIcon />WhatsApp</a>
      <a href={a.directionsUrl} target="_blank" rel="noopener noreferrer" className="border-l border-white/10 py-4 text-center" tabIndex={visible ? 0 : -1}>Itinéraire</a>
    </nav>
  )
}
