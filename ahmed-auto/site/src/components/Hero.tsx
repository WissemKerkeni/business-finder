import { dealer as d, hero, stockDate, wa } from '../data/dealer'
import { Photo, WaIcon, Wrap, btn } from './ui'

export default function Hero() {
  const rating = d.rating.value.toFixed(1).replace('.', ',')
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink lg:h-[100vh] lg:max-h-[980px] lg:min-h-0 lg:items-center">
      <div className="absolute inset-0 lg:left-[28%]">
        <Photo id={hero.id} alt={hero.alt} priority sizes="(min-width: 1024px) 72vw, 100vw" className="h-full w-full object-cover object-[68%_60%]" />
        <div className="absolute inset-0 bg-ink/65 lg:bg-transparent lg:bg-[linear-gradient(90deg,#0D0D0F_0%,#0D0D0FCC_18%,#0D0D0F33_48%,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#0D0D0F,transparent)]" />
      </div>
      <Wrap className="relative z-10 w-full pt-28 pb-14 lg:py-0">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-2 text-signal-text"><span className="h-2 w-2 bg-signal" />Showroom · Ksibet El Mediouni</p>
          <h1 id="hero-title" className="mb-6 font-wide text-[3.4rem] font-black italic uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-[104px]">AHMED AUTO</h1>
          <p className="mb-7 max-w-xl text-lg leading-relaxed text-neutral-200 lg:text-xl">
            {d.tagline} — voitures neuves et d’occasion, visibles au showroom, Route de Monastir.
          </p>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <a href={d.reviewsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-neutral-300 hover:text-white">
              <span className="font-bold text-white">{rating}</span><span className="text-signal-text" aria-hidden>★★★★★</span><span>· {d.rating.count} avis Google</span>
            </a>
            <span className="border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-neutral-300">Stock publié au {stockDate.fr}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#vehicules" className={btn.red}>Voir les véhicules</a>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.outline} bg-black/30`}><WaIcon />WhatsApp {d.phone}</a>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
