import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionTitle, btn } from './ui'
import { restaurant as r } from '../data/restaurant'

export default function Location() {
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
    ['Where', <>{r.plusCode}, {r.address.countryName}<span className="mt-1 block text-ink/60">{r.landmark}</span></>],
    ['Phone', <a href={`tel:${r.phoneE164}`} className="hover:text-cobalt">{r.phone}</a>],
    ['Hours', 'Open 24/24 — on the sign and on Google'],
    ['Services', 'Dine-in · Takeaway · Delivery on Glovo'],
    ['Parking', r.parking],
  ]

  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-line px-5 py-24 md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow="07 — Find us" id="visit-title" className="mb-10">Through the gate, <i>in the medina.</i></SectionTitle>
          <address className="not-italic">
            <dl className="border-t border-line font-mono text-xs">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="uppercase tracking-widest text-sandstone-ink">{k}</dt>
                  <dd className="sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </address>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
            <a href={r.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.solid}>Get directions <span aria-hidden>↗</span></a>
            <a href={`tel:${r.phoneE164}`} className={btn.outlineDark}>Call <span aria-hidden>→</span></a>
          </div>
        </div>
        <div ref={mapRef} className="relative aspect-[4/3] overflow-hidden border border-line bg-sand lg:aspect-auto lg:min-h-[520px]">
          {showMap ? (
            <iframe
              title={`Map showing ${r.name} in the medina of Monastir`}
              src={r.mapsEmbedUrl}
              className="absolute inset-0 h-full w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <a href={r.mapsUrl} className="eyebrow absolute inset-0 grid place-items-center text-ink/60">Open the map</a>
          )}
        </div>
      </div>
    </section>
  )
}
