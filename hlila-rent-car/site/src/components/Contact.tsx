import { useEffect, useRef, useState, type ReactNode } from 'react'
import { agency as a, faq, wa } from '../data/agency'
import { SectionTitle, WaIcon, Wordmark } from './ui'

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-4 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <SectionTitle eyebrow="Questions" id="faq-title">Bon à savoir</SectionTitle>
        <div className="border-t border-line">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-cond text-xl font-bold uppercase lg:text-2xl">
                {f.q}<span className="font-mono text-swoosh-text transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-chalk-dim">{f.a}</p>
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

  const rows: [string, ReactNode][] = [
    ['Adresse', <>{a.address.street}, {a.address.locality} {a.address.postalCode}</>],
    ['Horaires', a.hoursText],
    ['Téléphone / WhatsApp', <a href={`tel:${a.phoneE164}`} className="hover:text-swoosh-text">{a.phone}</a>],
    ['Téléphone', <a href={`tel:${a.phone2E164}`} className="hover:text-swoosh-text">{a.phone2}</a>],
    ['E-mail', <a href={`mailto:${a.email}`} className="hover:text-swoosh-text">{a.email}</a>],
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionTitle eyebrow="Coordonnées" id="contact-title" className="mb-10 lg:mb-14">Contact</SectionTitle>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div ref={mapRef} className="relative aspect-[4/3] overflow-hidden border border-line bg-graphite">
            {showMap ? (
              <iframe
                title={`Carte : ${a.name}, ${a.address.street}, Monastir`}
                src={a.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_contrast(0.85)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a href={a.mapsUrl} className="eyebrow absolute inset-0 grid place-items-center text-chalk-dim">Ouvrir la carte</a>
            )}
          </div>
          <address className="not-italic">
            <dl className="border-t border-line">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 border-b border-line py-5 sm:grid-cols-[13rem_1fr] sm:gap-4">
                  <dt className="eyebrow text-swoosh-text">{k}</dt>
                  <dd className="font-mono text-sm sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-mono text-[11px] text-chalk-dim">Plus code : {a.plusCode}</p>
          </address>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-4 text-center sm:px-8 md:flex-row md:text-left">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <Wordmark small />
          <span className="font-mono text-sm text-chalk-dim">{a.name} · Monastir</span>
        </div>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-chalk-dim">
          <li><a href={a.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-swoosh-text">Facebook</a></li>
          <li><a href={a.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-swoosh-text">Instagram ({a.instagramHandle})</a></li>
        </ul>
        <p className="font-mono text-xs text-chalk-dim">© 2026 {a.name}</p>
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
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-asphalt font-mono text-[11px] uppercase tracking-wider transition-transform duration-300 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={`tel:${a.phoneE164}`} className="border-r border-line py-4 text-center" tabIndex={visible ? 0 : -1}>Appeler</a>
      <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-swoosh py-4 text-white" tabIndex={visible ? 0 : -1}><WaIcon />WhatsApp</a>
      <a href={a.directionsUrl} target="_blank" rel="noopener noreferrer" className="border-l border-line py-4 text-center" tabIndex={visible ? 0 : -1}>Itinéraire</a>
    </nav>
  )
}
