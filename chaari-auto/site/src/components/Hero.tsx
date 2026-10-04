import type { CSSProperties } from 'react'
import { business as b, hero, positioning, wa } from '../data/business'
import { useCopy } from '../data/copy'
import { fmtRating, useLang } from '../i18n'
import { LogoLockup, Photo, Stars, WaIcon, Wrap, btn } from './ui'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

const icons: Record<string, string> = {
  // pin, globe, wrench, ship (24px, stroke)
  stuttgart: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  export: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  maintenance: 'M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z',
  shipping: 'M3 17l1.5 3h15l1.5-3M5 17V11h14v6M8 11V7h8v4M12 7V3M2 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1',
}

/** Full-height hero. Phones and tablets: the logo (car + CHAARI AUTO) sits large in the empty top of the photo, the text
 *  at the bottom (desktop has the logo in the header only).
 *  Desktop: the photo is framed on the right inside the 1320px container, a dark
 *  scrim fades in from the left under the text. Then: positioning title, the business's intro sentence, the 12 years +
 *  Google reviews block (links to the reviews), CTAs and the four lines of business.
 *  Ken Burns zoom and a staggered entrance (CSS only, so it runs on the prerendered HTML; off with reduced motion). */
export default function Hero() {
  const lang = useLang()
  const t = useCopy()
  const rating = fmtRating(b.rating.value, lang)
  const edge = 'lg:right-[max(3rem,calc((100vw-1320px)/2+3rem))]'
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-line lg:min-h-[max(100vh,820px)]">
      <div className={`absolute inset-0 overflow-hidden lg:top-32 lg:bottom-44 lg:left-[42%] ${edge}`}>
        <Photo id={hero.id} alt={hero.alt[lang]} priority sizes="(min-width: 1024px) 50vw, 100vw" className="kenburns h-full w-full object-cover object-[45%_60%]" />
        <div className="absolute inset-0 bg-ink/55 lg:bg-transparent lg:bg-[linear-gradient(90deg,#0C0C0D_0%,#0C0C0DD9_18%,#0C0C0D66_40%,transparent_62%)]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,#0C0C0D_35%,transparent)] lg:hidden" />

      <div className="intro relative z-10 mx-auto mt-[108px] sm:mt-32 lg:hidden" style={delay(0)}>
        <LogoLockup priority sizes="(min-width: 640px) 100px, 80px" className="text-[clamp(20px,7.6vw,30px)] shadow-[0_18px_50px_-12px_rgba(0,0,0,.8)] sm:text-[36px]" />
      </div>

      <Wrap className="relative z-10 mt-auto w-full pt-10 pb-10 lg:pt-36 lg:pb-12">
        <p className="intro mb-5 inline-block border border-line bg-raised/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#D6D6D2]" style={delay(80)}>
          {t.hero.eyebrow}
        </p>
        <h1 id="hero-title" className="intro mb-5 max-w-[17ch] font-head text-[2.6rem] font-bold uppercase leading-[0.95] tracking-[-0.015em] sm:text-6xl lg:max-w-[18ch] lg:text-[56px] xl:text-[66px]" style={delay(180)}>
          {t.hero.titleBefore}<span className="text-signal-text">{t.hero.titleAccent}</span>{t.hero.titleAfter}
        </h1>
        <p className="intro mb-5 max-w-xl text-lg leading-relaxed text-[#E6E6E2] lg:text-xl" style={delay(300)}>{b.intro[lang]}</p>

        <a href={b.reviewsUrl} target="_blank" rel="noopener noreferrer" className="intro group mb-7 flex max-w-xl items-center gap-4 rounded-[4px] border border-signal/60 bg-signal/20 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-signal/30 sm:gap-5 sm:px-5" style={delay(400)}>
          <span className="font-head text-[3.4rem] font-bold leading-none text-white sm:text-6xl">{b.experienceYears}</span>
          <span className="min-w-0">
            <span className="block font-head text-lg font-bold uppercase leading-tight sm:text-xl">{t.hero.years} {t.hero.satisfied}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#D6D6D2] sm:text-xs">
              <Stars className="text-sm tracking-[0.1em]" /> <span className="font-bold text-white">{t.hero.reviews(rating, b.rating.count)}</span>
              <span className="text-signal-text underline-offset-4 group-hover:underline">{t.hero.readReviews} →</span>
            </span>
          </span>
        </a>

        <div className="intro mb-10 flex flex-wrap gap-3 lg:mb-12" style={delay(500)}>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine`}><WaIcon />WhatsApp {b.phone}</a>
          <a href="#service" className={`${btn.outline} bg-black/30`}>{t.hero.how}</a>
        </div>

        <ul aria-label={t.hero.positioning} className="intro grid gap-x-6 gap-y-3 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-4" style={delay(600)}>
          {positioning.map((p) => (
            <li key={p.key} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-chalk-2 sm:text-xs">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-none stroke-signal-text" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={icons[p.key]} /></svg>
              {p.text[lang]}
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  )
}
