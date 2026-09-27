import { agency as a, gallery, reviews, services, steps, wa } from '../data/agency'
import { Photo, SectionTitle, WaIcon, btnBase } from './ui'

/** The red strip from the agency's posts ("Roulez En Toute Sécurité"). */
export function RedBand() {
  return (
    <aside className="w-full border-y border-signal-dark bg-signal px-4 py-3.5 text-center">
      <p className="font-cond text-sm font-extrabold uppercase tracking-[0.2em] text-white sm:text-base">{a.slogan}</p>
    </aside>
  )
}

/** Three hairline-divided columns, no cards. */
const columns = 'grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0'
const colPad = (i: number) => (i === 0 ? 'md:pr-10' : i === 1 ? 'md:px-10' : 'md:pl-10')

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-white/10 bg-charcoal py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionTitle eyebrow="02 / Prestations" id="services-title" className="mb-12 lg:mb-14">Services</SectionTitle>
        <ul className={columns}>
          {services.map((s, i) => (
            <li key={s.n} className={`py-10 md:py-12 ${colPad(i)}`}>
              <p className="mb-6 font-mono text-3xl font-bold text-signal-text" aria-hidden>{s.n}</p>
              <h3 className="mb-4 font-cond text-3xl font-bold uppercase tracking-tight">{s.title}</h3>
              <p className="text-lg leading-relaxed text-neutral-400">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function HowToBook() {
  return (
    <section id="reserver" aria-labelledby="reserver-title" className="border-b border-white/10 py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionTitle eyebrow="03 / Procédure rapide" id="reserver-title" className="mb-12 lg:mb-14">Comment réserver</SectionTitle>
        <ol className={columns}>
          {steps.map((s, i) => (
            <li key={s.n} className={`py-10 md:py-12 ${colPad(i)}`}>
              <p className="mb-6 font-mono text-5xl font-bold leading-none text-signal-text" aria-hidden>{s.n}</p>
              <h3 className="font-cond text-2xl font-bold uppercase tracking-tight">{s.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section id="excursions" aria-labelledby="excursions-title" className="border-b border-white/10 bg-charcoal py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end lg:mb-12">
          <SectionTitle eyebrow="04 / Destinations" id="excursions-title">Excursions &amp; paysages</SectionTitle>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">Photos de clients · Google</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 lg:gap-8">
          {gallery.map((g, i) => (
            <figure key={g.id} className={`flex flex-col ${i < 2 ? 'md:col-span-12' : ''} ${g.span}`}>
              <div className={`overflow-hidden border border-white/10 bg-deep ${g.aspect}`}>
                <Photo id={g.id} alt={g.alt} sizes={g.sizes} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-neutral-400">{g.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

type Review = (typeof reviews)[number]
const Byline = ({ r }: { r: Review }) => (
  <p className="font-mono text-xs font-bold uppercase tracking-wider text-signal-text">
    — {r.author}{'badge' in r && r.badge ? `, ${r.badge}` : ''} <span className="font-normal text-neutral-500">· {r.when}</span>
  </p>
)

export function Reviews() {
  const shown = reviews.slice(0, 3)
  const more = reviews.slice(3)
  const rating = a.rating.value.toFixed(1).replace('.', ',')
  return (
    <section id="avis" aria-labelledby="avis-title" className="border-b border-white/10 py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <h2 id="avis-title" className="sr-only">Avis Google</h2>
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-center lg:pb-16">
          <div className="flex items-baseline gap-6">
            <span className="font-cond text-[88px] font-extrabold leading-none lg:text-[120px]">{rating}</span>
            <span>
              <span className="mb-2 block text-2xl tracking-widest text-signal" aria-label={`${rating} étoiles sur 5`}>★★★★★</span>
              <span className="font-mono text-sm uppercase tracking-widest text-neutral-400">{a.rating.count} avis Google</span>
            </span>
          </div>
          <dl className="w-full max-w-lg space-y-2 font-mono text-xs text-neutral-400">
            {a.rating.distribution.map((n, i) => (
              <div key={i} className="flex items-center gap-3">
                <dt className="w-8">{5 - i}★</dt>
                <dd className="h-1.5 flex-1 bg-neutral-800"><span className={`block h-full ${i === 0 ? 'bg-signal' : 'bg-neutral-600'}`} style={{ width: `${(n / a.rating.count) * 100}%` }} /></dd>
                <dd className="w-6 text-right text-neutral-300">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="grid grid-cols-1 divide-y divide-white/10 py-10 md:grid-cols-3 md:divide-x md:divide-y-0 lg:py-16">
          {shown.map((r, i) => (
            <li key={r.author} className={`flex flex-col justify-between gap-8 py-8 md:py-0 ${colPad(i)}`}>
              <blockquote className="text-xl italic leading-relaxed text-neutral-200">« {r.text} »</blockquote>
              <Byline r={r} />
            </li>
          ))}
        </ul>
        <details className="border-t border-white/10 py-6">
          <summary className="cursor-pointer font-mono text-xs font-bold uppercase tracking-widest">Plus d’avis ({more.length})</summary>
          <ul className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {more.map((r) => (
              <li key={r.author}>
                <blockquote className="mb-3 italic leading-relaxed text-neutral-300" lang={'lang' in r ? r.lang : undefined}>« {r.text} »</blockquote>
                <Byline r={r} />
              </li>
            ))}
          </ul>
        </details>
        <div className="flex justify-end border-t border-white/10 pt-8">
          <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] underline decoration-signal underline-offset-4 hover:text-signal-text">Voir tous les avis sur Google ↗</a>
        </div>
      </div>
    </section>
  )
}

/** Final call to action on the red band. */
export function Visit() {
  return (
    <section aria-labelledby="cta-title" className="bg-signal px-4 py-16 text-center text-white sm:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center">
        <h2 id="cta-title" className="mb-10 max-w-5xl font-cond text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          Un message, et votre voiture est prête.
        </h2>
        <div className="flex w-full max-w-2xl flex-wrap justify-center gap-4">
          <a href={`tel:${a.phoneE164}`} className={`${btnBase} min-w-[160px] flex-1 bg-white px-8 py-4 text-lg text-black hover:bg-neutral-200`}>Appeler</a>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btnBase} min-w-[160px] flex-1 bg-deep px-8 py-4 text-lg text-white hover:bg-black`}><WaIcon className="h-4 w-4" />WhatsApp</a>
          <a href={a.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${btnBase} min-w-[160px] flex-1 border-2 border-white px-8 py-3.5 text-lg text-white hover:bg-white hover:text-signal`}>Itinéraire</a>
        </div>
      </div>
    </section>
  )
}
