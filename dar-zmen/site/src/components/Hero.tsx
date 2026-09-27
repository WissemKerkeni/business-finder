import Header from './Header'
import { Photo, btn } from './ui'
import { restaurant as r } from '../data/restaurant'

export default function Hero() {
  return (
    <header id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white md:min-h-[720px] lg:h-screen lg:max-h-[1000px]">
      <Header />
      <div className="absolute inset-0">
        <Photo
          id="gate"
          alt="The stone gateway in the medina walls of Monastir, with the black Dar Zmen sign reading دار زمان and 24/24 above the arch"
          className="h-full w-full object-cover object-[center_35%]"
          sizes="100vw"
          priority
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
        <div aria-hidden className="absolute inset-0 bg-black/35 md:hidden" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pt-32 pb-8 md:px-14 md:pb-12">
        <p className="eyebrow mb-4 text-white/80">Traditional Tunisian kitchen · Medina of Monastir</p>
        <h1 className="mb-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <span className="font-serif text-[clamp(4rem,14vw,8.5rem)] leading-[0.9] tracking-tight">{r.name}</span>
          <span lang="ar" className="font-arabic text-[clamp(2.4rem,7vw,4.5rem)] leading-none text-sandstone">{r.nameAr}</span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
          “The house of the old days.” Couscous, ojja, mloukhia and grilled fish, cooked the Tunisian way behind a stone gate in the medina of Monastir.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
          <a href="#menu" className={btn.solid}>View the menu <span aria-hidden>↓</span></a>
          <a href={r.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.outlineLight}>Get directions <span aria-hidden>↗</span></a>
        </div>
        <p className="mt-8 hidden justify-end font-mono text-[11px] tracking-wider text-white/70 md:flex">
          The sign over the gate:&nbsp;<span lang="ar" className="font-arabic text-base text-white">{r.signLine}</span>&nbsp;— {r.signLineEn} · 24/24
        </p>
      </div>

      <dl className="relative z-10 border-t border-white/20 bg-black/45 backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 font-mono text-[11px] tracking-wider text-white/90 md:grid-cols-4 md:px-14 md:text-xs">
          {[
            ['Google rating', <><span aria-hidden className="text-sandstone">★ </span>{r.rating.value} · {r.rating.count} Google reviews</>],
            ['Services', r.services.join(' · ')],
            ['Price', `${r.priceRange.replace('TND ', '')} DT per person`],
            ['Hours', 'Open 24/24 · Reservations'],
          ].map(([dt, dd], i) => (
            <div key={i} className={`px-5 py-3.5 md:px-6 md:py-4 ${i % 2 === 0 ? 'border-r border-white/15' : ''} ${i < 2 ? 'border-b border-white/15 md:border-b-0' : ''} md:border-r md:last:border-r-0 md:first:pl-0`}>
              <dt className="sr-only">{dt as string}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </div>
      </dl>
      <div aria-hidden className="checkerboard relative z-10" />
    </header>
  )
}
