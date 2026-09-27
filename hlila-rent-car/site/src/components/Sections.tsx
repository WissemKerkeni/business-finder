import { agency as a, delivery, gallery, reviews, steps, wa } from '../data/agency'
import { Photo, SectionTitle, WaIcon, btn } from './ui'

export function HowToBook() {
  return (
    <section id="reserver" aria-labelledby="reserver-title" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionTitle eyebrow="Procédure" id="reserver-title" className="mb-10 lg:mb-14">Comment réserver</SectionTitle>
        <ol className="grid grid-cols-1 border border-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className={`flex flex-col gap-4 p-8 lg:p-10 ${i ? 'border-t border-line md:border-t-0 md:border-l' : ''}`}>
              <span className="font-mono text-5xl font-bold text-swoosh-text" aria-hidden>{s.n}</span>
              <h3 className="font-cond text-2xl font-bold uppercase lg:text-3xl">{s.title}</h3>
              <p className="text-sm leading-relaxed text-chalk-dim lg:mt-auto">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Delivery() {
  const quote = reviews.find((r) => r.author === 'Aymen Zaier')!
  return (
    <section id="livraison" aria-labelledby="livraison-title" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionTitle eyebrow="Services" id="livraison-title" className="mb-10 lg:mb-14">Livraison</SectionTitle>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="aspect-[4/3] overflow-hidden bg-graphite">
            <Photo id="mgzsStreet" alt="MG ZS noir de Hlila Rent Car dans une rue de Monastir" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
          </div>
          <div>
            <dl className="border-t border-line">
              {delivery.map((d) => (
                <div key={d.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[11rem_1fr]">
                  <dt className="eyebrow pt-0.5 text-swoosh-text">{d.label}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
            <figure className="mt-10 border border-line bg-graphite p-6">
              <blockquote className="text-sm italic">« J’ai récupéré la voiture à l’aéroport et je l’ai déposé à l’aéroport. »</blockquote>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-chalk-dim">— {quote.author}, avis Google</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section aria-labelledby="galerie-title" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionTitle eyebrow="En images" id="galerie-title" className="mb-10 lg:mb-14">Galerie</SectionTitle>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:auto-rows-[280px] lg:grid-cols-12">
          {gallery.map((g, i) => (
            <figure key={g.id} className={`zoom overflow-hidden bg-graphite ${i === 0 ? 'col-span-2 aspect-[16/10] lg:aspect-auto' : 'aspect-square lg:aspect-auto'} ${g.span}`}>
              <Photo id={g.id} alt={g.alt} sizes={i === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'} className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Reviews() {
  const shown = reviews.slice(0, 3)
  const more = reviews.slice(3)
  return (
    <section id="avis" aria-labelledby="avis-title" className="bg-sand py-20 text-asphalt lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-asphalt/20 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-3 text-asphalt/70">Témoignages</p>
            <h2 id="avis-title" className="sr-only">Avis Google</h2>
            <div className="flex items-end gap-4">
              <span className="font-cond text-8xl leading-none font-black">5,0</span>
              <span className="pb-2">
                <span className="block text-2xl tracking-wider text-swoosh" aria-label="5 étoiles sur 5">★★★★★</span>
                <span className="font-mono text-sm font-bold">{a.rating.count} avis Google</span>
              </span>
            </div>
          </div>
          <dl className="w-full max-w-sm space-y-1.5 font-mono text-[11px]">
            {a.rating.distribution.map((n, i) => (
              <div key={i} className="flex items-center gap-3">
                <dt className="w-6">{5 - i}★</dt>
                <dd className="h-1.5 flex-1 bg-asphalt/15"><span className="block h-full bg-asphalt" style={{ width: `${(n / a.rating.count) * 100}%` }} /></dd>
                <dd className="w-6 text-right">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3">
          {shown.map((r, i) => (
            <li key={r.author} className={`flex flex-col justify-between gap-8 py-8 md:px-8 ${i ? 'border-t border-asphalt/20 md:border-t-0 md:border-l' : 'md:pl-0'}`}>
              <blockquote className="italic leading-relaxed">« {r.text} »</blockquote>
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider">— {r.author}{r.badge ? `, ${r.badge}` : ''} <span className="font-normal text-asphalt/60">· {r.when}</span></p>
            </li>
          ))}
        </ul>
        <details className="border-t border-asphalt/20 py-6">
          <summary className="cursor-pointer font-mono text-xs font-bold uppercase tracking-widest">Plus d’avis ({more.length})</summary>
          <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {more.map((r) => (
              <li key={r.author}>
                <blockquote className="text-sm italic leading-relaxed">« {r.text} »</blockquote>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wider">— {r.author}{r.badge ? `, ${r.badge}` : ''} <span className="font-normal text-asphalt/60">· {r.when}</span></p>
              </li>
            ))}
          </ul>
        </details>
        <div className="flex justify-end border-t border-asphalt/20 pt-6">
          <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-bold uppercase tracking-widest hover:text-swoosh-dark">Voir tous les avis sur Google →</a>
        </div>
      </div>
    </section>
  )
}

export function Visit() {
  return (
    <section aria-labelledby="cta-title" className="border-b border-line bg-graphite py-24 text-center lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <h2 id="cta-title" className="font-cond text-[clamp(3rem,8vw,6rem)] leading-[0.95] font-black uppercase tracking-tight">Prêt à prendre la route ?</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`tel:${a.phoneE164}`} className={btn.outline}>Appeler</a>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={btn.red}><WaIcon />WhatsApp</a>
          <a href={a.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>Itinéraire</a>
        </div>
      </div>
    </section>
  )
}
