import { photos, restaurant as r } from '../data/restaurant'
import { Eyebrow, Photo, btn } from './ui'

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-end overflow-hidden bg-pine-dark pb-16 pt-32 md:pb-20">
      <Photo
        id={photos.storefrontNight}
        alt="La Cucina at night: a green wooden house on Place 3 Août with a glowing neon CUCINA sign"
        className="absolute inset-x-0 top-0 h-[58%] w-full object-cover object-[55%_30%] md:inset-0 md:h-full md:object-center"
        priority
      />
      {/* Desktop: directional scrim, dark behind the text (bottom-left) and clear over the neon sign (top-right). */}
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'radial-gradient(circle at 18% 85%, rgb(16 35 31 / 0.95) 0%, rgb(16 35 31 / 0.75) 35%, rgb(16 35 31 / 0.3) 60%, rgb(16 35 31 / 0) 80%)',
        }}
      />
      {/* Mobile: photo on top (sign visible), fading into the dark panel that holds the text. */}
      <div aria-hidden className="absolute inset-x-0 top-[28%] h-[30%] bg-gradient-to-b from-transparent to-pine-dark md:hidden" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-12">
        <Eyebrow className="text-sage">Ristorante · Monastir</Eyebrow>
        <h1 id="hero-title" className="mt-5 font-display text-6xl italic leading-[0.95] text-neon sm:text-7xl md:text-8xl lg:text-9xl">
          Pasta e<br />
          Amore.
          <span className="sr-only"> {r.name}, an Italian restaurant in Monastir</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg text-neon/90 md:text-xl">Italian pizza, fresh pasta and paella on Place 3&nbsp;Août, Monastir.</p>
        <p className="font-label mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-neon/80">
          <span className="font-semibold text-tomato">★ {r.rating.value}</span>
          <span aria-hidden>·</span>
          <span>{r.rating.count} Google reviews</span>
          {r.services.map((s) => (
            <span key={s} className="contents">
              <span aria-hidden>·</span>
              <span>{s}</span>
            </span>
          ))}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#menu" className={btn.solid}>
            View Menu
          </a>
          <a href={r.mapsUrl} target="_blank" rel="noopener" className={btn.outline}>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}
