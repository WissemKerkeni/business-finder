import { agency as a } from '../data/agency'
import RequestBar from './RequestBar'
import { Photo } from './ui'

/**
 * Desktop: 900px, the photo fills the right 62% (the amphitheatre sits mid-frame) and fades into
 * charcoal under the headline; the request bar is docked along the bottom.
 * Phones: full-bleed photo behind the text, request bar stacked under the headline.
 */
export default function Hero() {
  const rating = a.rating.value.toFixed(1).replace('.', ',')
  return (
    <header id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-deep pt-20 lg:h-[900px] lg:min-h-0 lg:justify-between">
      <div className="absolute inset-0 -z-10 lg:left-auto lg:w-[62%]">
        <Photo id="hero" priority sizes="(min-width: 1024px) 62vw, 100vw" alt="L’amphithéâtre d’El Jem vu à travers le pare-brise, pendant une excursion avec chauffeur" className="h-full w-full object-cover object-[50%_40%]" />
        <div className="absolute inset-0 bg-deep/70 lg:bg-transparent lg:bg-[linear-gradient(90deg,#141517_0%,rgba(20,21,23,.3)_25%,transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 pt-10 sm:px-8 lg:px-12 lg:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 inline-flex items-center gap-2 text-signal-text"><span className="h-2 w-2 bg-signal" aria-hidden />Mahdia · Tunisie</p>
          <h1 className="mb-6 font-cond text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-[76px]">
            Location de voitures, transferts &amp; excursions
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-chalk/90 lg:text-xl">
            Agence Top Car, avenue Taher Sfar à Mahdia. Voitures, vans et utilitaires, avec ou sans chauffeur.
          </p>
          <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-sm tracking-wide text-neutral-300 backdrop-blur-sm hover:border-white/30">
            <span className="font-bold text-white">{rating}</span>
            <span className="text-signal" aria-label={`${rating} étoiles sur 5`}>★★★★★</span>
            <span className="text-neutral-400" aria-hidden>·</span>
            <span>{a.rating.count} avis Google</span>
          </a>
        </div>
      </div>

      <div className="mt-10 w-full border-y border-white/15 bg-charcoal lg:mt-0">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8 lg:px-12">
          <RequestBar />
        </div>
      </div>
    </header>
  )
}
