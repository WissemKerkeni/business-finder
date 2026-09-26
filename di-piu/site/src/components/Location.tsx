import { useEffect, useRef, useState } from 'react'
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

  return (
    <section id="visit" aria-labelledby="visit-title" className="border-b border-line bg-night-2 px-5 py-24 sm:px-12 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Posizione" className="mb-14"><span id="visit-title">Find Di Più in Monastir</span></SectionTitle>
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div ref={mapRef} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line bg-night lg:aspect-auto lg:min-h-[420px]">
            {showMap ? (
              <iframe
                title={`Map showing ${r.name} in Monastir`}
                src={r.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full grayscale invert-[0.9] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a href={r.mapsUrl} className="absolute inset-0 grid place-items-center text-sm text-muted">Open the map</a>
            )}
          </div>
          <div className="rounded-sm border border-line bg-night p-6 sm:p-8">
            <address className="not-italic">
              <dl className="divide-y divide-line text-sm">
                <div className="grid grid-cols-1 gap-1 pb-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow text-[10px] text-leaf">Find us</dt>
                  <dd className="text-white">{r.plusCode} {r.address.postalCode}<span className="mt-1 block text-xs text-muted">{r.landmark}</span></dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow text-[10px] text-leaf">Call</dt>
                  <dd><a href={`tel:${r.phoneE164}`} className="text-white hover:text-leaf">{r.phone}</a></dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow text-[10px] text-leaf">Hours</dt>
                  <dd className="text-white">Every day, <time dateTime="12:00">12:00</time> – <time dateTime="00:00">00:00</time></dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="eyebrow text-[10px] text-leaf">Good to know</dt>
                  <dd className="text-white">{r.facts.join(' · ')}</dd>
                </div>
              </dl>
            </address>
            <a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${btn.solid} mt-4 w-full sm:w-auto`}>Open in Google Maps</a>
          </div>
        </div>
      </div>
    </section>
  )
}
