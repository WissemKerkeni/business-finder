import { Photo } from './ui'
import { restaurant as r } from '../data/restaurant'

const cta = 'eyebrow flex items-center justify-center gap-2 whitespace-nowrap px-4 py-4 transition-colors'

export default function Visit() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden px-5 py-32 text-white md:py-44">
      <div className="absolute inset-0">
        <Photo id="lanterns" alt="" className="h-full w-full object-cover" sizes="100vw" />
        <div aria-hidden className="absolute inset-0 bg-black/80" />
      </div>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 id="cta-title" className="font-serif text-6xl md:text-8xl">Visit us.</h2>
        <p lang="ar" className="font-arabic mt-2 mb-10 text-3xl text-sandstone md:text-4xl">مرحبا بيكم</p>
        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          <a href={`tel:${r.phoneE164}`} className={`${cta} border border-white/40 hover:border-white hover:bg-white/10`}>Call <span aria-hidden>→</span></a>
          <a href={r.whatsapp} target="_blank" rel="noopener noreferrer" className={`${cta} border border-white/40 hover:border-white hover:bg-white/10`}>WhatsApp <span aria-hidden>↗</span></a>
          <a href={r.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${cta} border border-white/40 hover:border-white hover:bg-white/10`}>Directions <span aria-hidden>↗</span></a>
          <a href={`tel:${r.phoneE164}`} className={`${cta} bg-cobalt hover:bg-cobalt-dark`}>Reserve a table <span aria-hidden>→</span></a>
        </div>
        <p className="eyebrow mt-8 text-[10px] text-white/60">Open 24/24 · {r.plusCode}</p>
      </div>
    </section>
  )
}
