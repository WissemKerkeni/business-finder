import type { CSSProperties } from 'react'
import { business as b, hero, wa } from '../data/business'
import { Photo, WaIcon, Wrap, btn } from './ui'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

/** Full-height hero. Desktop: the photo is framed on the right, its right edge on the content edge of the 1320px
 *  container (so the right margin matches the left), with a dark scrim fading in from the left under the text.
 *  Phones: full-bleed behind the text. Slow Ken Burns zoom and a staggered entrance (CSS only, so it also runs on the
 *  prerendered HTML; both are off with prefers-reduced-motion). No video: every clip has burnt-in overlays. */
export default function Hero() {
  const rating = b.rating.value.toFixed(1).replace('.', ',')
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-line lg:h-[100vh] lg:max-h-[1000px] lg:min-h-0">
      <div className="absolute inset-0 overflow-hidden lg:top-28 lg:bottom-36 lg:left-[40%] lg:right-[max(3rem,calc((100vw-1320px)/2+3rem))]">
        <Photo id={hero.id} alt={hero.alt} priority sizes="(min-width: 1024px) 50vw, 100vw" className="kenburns h-full w-full object-cover object-[45%_60%]" />
        <div className="absolute inset-0 bg-ink/60 lg:bg-transparent lg:bg-[linear-gradient(90deg,#0C0C0D_0%,#0C0C0DD9_18%,#0C0C0D66_40%,transparent_62%)]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,#0C0C0D,transparent)] lg:hidden" />
      <Wrap className="relative z-10 w-full pt-28 pb-10 lg:pb-12">
        <p className="intro mb-6 inline-block border border-line bg-raised/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#D6D6D2]" style={delay(80)}>
          {b.address.locality} (Allemagne) → Tunisie
        </p>
        <h1 id="hero-title" className="intro mb-6 max-w-[15ch] font-head text-[2.9rem] font-bold uppercase leading-[0.93] tracking-[-0.015em] sm:text-7xl lg:max-w-[16ch] lg:text-[64px] xl:text-[76px]" style={delay(180)}>
          Spécialiste de l’exportation de voitures d’Europe vers la <span className="text-signal-text">Tunisie</span>
        </h1>
        <p className="intro mb-8 max-w-xl text-lg leading-relaxed text-[#E6E6E2] lg:text-xl" style={delay(320)}>{b.intro}</p>
        <div className="intro mb-10 flex flex-wrap gap-3 lg:mb-14" style={delay(440)}>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine`}><WaIcon />WhatsApp {b.phone}</a>
          <a href="#service" className={`${btn.outline} bg-black/30`}>Comment ça marche</a>
        </div>
        <div className="intro grid gap-y-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-dim sm:grid-cols-3 sm:text-xs" style={delay(560)}>
          <a href={b.reviewsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white sm:pr-6">
            <span className="text-signal-text" aria-hidden>★</span> <span className="font-bold text-white">{rating}</span> — {b.rating.count} avis Google
          </a>
          <p className="border-line sm:border-l sm:px-6">{b.address.street}, {b.address.locality}</p>
          <p className="border-line sm:border-l sm:px-6">{b.hoursShort}</p>
        </div>
      </Wrap>
    </section>
  )
}
