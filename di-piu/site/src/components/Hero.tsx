import Header from './Header'
import { Photo, btn } from './ui'
import { restaurant as r } from '../data/restaurant'

export default function Hero() {
  return (
    <header id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-white lg:h-screen lg:min-h-[660px] lg:max-h-[1000px]">
      <Header />
      <div className="relative grid flex-1 grid-cols-1 min-h-0 lg:grid-cols-12">
        {/* Phones: the storefront fills the screen behind the text. Desktop: right-hand column. */}
        <div className="absolute inset-0 overflow-hidden lg:relative lg:inset-auto lg:order-2 lg:col-span-5">
          <Photo
            id="storefrontNight"
            alt="Di Più at night: a black storefront with the glowing Di Più Ristorante sign above a glass entrance"
            className="h-full w-full object-cover object-center"
            sizes="(min-width: 1024px) 42vw, 100vw"
            priority
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/20 lg:hidden" />
        </div>

        <div className="relative z-10 flex flex-col justify-end px-5 pt-40 pb-8 sm:px-12 md:py-8 lg:order-1 lg:col-span-7 lg:justify-between lg:border-r lg:border-line lg:px-16 lg:py-10">
          <div className="max-w-2xl py-2 lg:my-auto">
            <p className="eyebrow mb-4 flex items-center gap-3 text-leaf lg:mb-5">
              <span aria-hidden className="h-px w-6 bg-leaf" />
              Ristorante italiano · Monastir
            </p>
            <h1 className="mb-5 font-serif text-[clamp(3.4rem,15vw,7.8rem)] font-light leading-[0.92] tracking-tight text-white lg:mb-6 lg:text-[clamp(3.8rem,7.5vw,7.8rem)]">
              <span className="sr-only">{r.name} — </span>Un po' <span className="italic text-leaf">di più.</span>
            </h1>
            <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-body sm:text-base lg:mb-8 lg:text-lg">
              Pizza, pasta, risotto and grilled fish, served generously in a sage-green room in the centre of Monastir.
            </p>
            <div className="grid grid-cols-2 items-center gap-3 text-center sm:flex sm:flex-wrap sm:gap-3.5">
              <a href="#menu" className={btn.outline}>View the menu</a>
              <a href={`tel:${r.phoneE164}`} className={btn.solid}>Reserve a table</a>
              <a
                href={r.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-2 flex items-center justify-center py-1 text-xs tracking-wider text-muted transition-colors hover:text-white sm:ml-1 sm:justify-start"
              >
                Get directions <span aria-hidden className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/15 pt-4 text-xs md:grid-cols-3 lg:mt-0 lg:gap-6 lg:border-line lg:pt-5">
            <div className="col-span-2 flex items-center gap-2 md:col-span-1">
              <dt className="sr-only">Google rating</dt>
              <dd className="flex items-center gap-2">
                <span aria-hidden className="text-sm text-leaf">★</span>
                <span className="font-semibold text-white">{r.rating.value}</span>
                <span aria-hidden className="text-muted">·</span>
                <span className="text-muted">{r.rating.count} Google reviews</span>
              </dd>
            </div>
            <div className="md:border-l md:border-line md:pl-6">
              <dt className="eyebrow mb-0.5 text-[10px] text-leaf">Hours</dt>
              <dd className="text-white">Open daily <time dateTime="12:00">12:00</time> – <time dateTime="00:00">00:00</time></dd>
            </div>
            <div className="md:border-l md:border-line md:pl-6">
              <dt className="eyebrow mb-0.5 text-[10px] text-leaf">Service</dt>
              <dd className="text-white">{r.services.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  )
}
