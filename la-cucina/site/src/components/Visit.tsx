import { restaurant as r } from '../data/restaurant'
import { Eyebrow, btn } from './ui'

export default function Visit() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-sage/20 bg-pine-deep py-28 text-center text-neon md:py-36">
      <div className="mx-auto max-w-3xl px-5">
        <Eyebrow className="justify-center text-sage" rule={false}>
          Prenotazioni &amp; Visita
        </Eyebrow>
        <h2 id="cta-title" className="neon-glow mt-5 font-display text-7xl italic md:text-9xl">
          Visit Us
        </h2>
        <p className="mt-8 text-lg text-neon/80 md:text-xl">
          Reservations by phone:{' '}
          <a href={`tel:${r.phoneE164}`} className="underline decoration-sage underline-offset-4">
            {r.phone}
          </a>
        </p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:justify-center">
          <a href={`tel:${r.phoneE164}`} className={btn.solid}>
            Call Now
          </a>
          <a href={r.whatsapp} target="_blank" rel="noopener" className={btn.outline}>
            WhatsApp
          </a>
          <a href={r.mapsUrl} target="_blank" rel="noopener" className={btn.outline}>
            Get Directions
          </a>
          <a href={`tel:${r.phoneE164}`} className={`${btn.outline} border-tomato/80`}>
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  )
}
