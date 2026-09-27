import { useState } from 'react'
import { filters, fleet, matches, specLine, wa, type Car, type FilterKey } from '../data/agency'
import { Photo, SectionTitle, WaIcon, btn } from './ui'

const requestText = (c: Car) => `Bonjour, je voudrais louer la ${c.model}. Pouvez-vous m’indiquer la disponibilité et le prix ?`

function CarPhoto({ car }: { car: Car }) {
  const [i, setI] = useState(0)
  const n = car.photos.length
  const p = car.photos[i]
  const img = <Photo id={p.id} alt={p.alt} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover" />
  if (n === 1) return <div className="aspect-[16/10] overflow-hidden bg-graphite">{img}</div>
  return (
    <button
      type="button"
      onClick={() => setI((i + 1) % n)}
      aria-label={`${car.model} : photo suivante (${i + 1} sur ${n})`}
      className="relative block aspect-[16/10] w-full overflow-hidden bg-graphite"
    >
      {img}
      <span className="pointer-events-none absolute right-3 bottom-3 border border-line bg-asphalt/80 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
        {i + 1}/{n}
      </span>
    </button>
  )
}

function CarRow({ car, hidden }: { car: Car; hidden: boolean }) {
  const cta = (
    <a href={wa(requestText(car))} target="_blank" rel="noopener noreferrer" className={`${btn.outlineRed} px-5 py-2.5`}>
      <WaIcon />Demander cette voiture
    </a>
  )
  if (!car.photos.length)
    return (
      <li hidden={hidden} className="grid grid-cols-1 items-center gap-3 border-b border-line py-6 sm:grid-cols-[1fr_auto] lg:grid-cols-[260px_1fr_auto_auto] lg:gap-8">
        <h3 className="font-cond text-3xl font-black uppercase tracking-tight">{car.model}</h3>
        <p className="font-mono text-xs uppercase tracking-widest text-chalk-dim">{specLine(car)}</p>
        <p className="font-mono text-xs uppercase tracking-wider text-chalk-dim">Prix et photo sur demande</p>
        <div>{cta}</div>
      </li>
    )
  return (
    <li hidden={hidden} className="flex flex-col items-center gap-6 border-b border-line py-8 lg:flex-row lg:gap-10 lg:py-10">
      <div className="w-full lg:w-[55%]"><CarPhoto car={car} /></div>
      <div className="w-full lg:w-[45%]">
        <h3 className="mb-3 font-cond text-4xl font-black uppercase tracking-tight lg:text-5xl">{car.model}</h3>
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-chalk-dim">{specLine(car)}</p>
        <div className="mb-6 border-b border-line" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-sm font-bold tracking-wider text-swoosh-text">PRIX SUR DEMANDE</p>
          {cta}
        </div>
      </div>
    </li>
  )
}

export default function Fleet() {
  const [f, setF] = useState<FilterKey>('all')
  return (
    <section id="flotte" aria-labelledby="flotte-title" className="border-b border-line py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <SectionTitle eyebrow="Sélection" id="flotte-title">La flotte</SectionTitle>
        <p className="mt-2 text-chalk-dim">{fleet.length} modèles. Prix sur demande — réponse sur WhatsApp.</p>
        <div
          role="toolbar"
          aria-label="Filtrer la flotte"
          className="no-scrollbar sticky top-[72px] z-30 -mx-4 mt-6 flex gap-2 overflow-x-auto bg-asphalt/95 px-4 py-3 font-mono text-xs uppercase tracking-wider backdrop-blur sm:mx-0 sm:px-0 lg:static lg:mb-6 lg:bg-transparent lg:backdrop-blur-none"
        >
          {filters.map((x) => (
            <button
              key={x.key}
              type="button"
              aria-pressed={f === x.key}
              onClick={() => setF(x.key)}
              className={`shrink-0 whitespace-nowrap rounded-[4px] border px-4 py-2 transition-colors ${f === x.key ? 'border-swoosh bg-swoosh font-bold text-white' : 'border-line text-chalk-dim hover:border-chalk hover:text-chalk'}`}
            >
              {x.label}
            </button>
          ))}
        </div>
        {/* Every car is rendered (filtered ones are `hidden`) so the prerendered HTML lists the whole fleet. */}
        <ul className="border-t border-line">
          {fleet.map((c) => <CarRow key={c.model} car={c} hidden={!matches(c, f)} />)}
        </ul>
      </div>
    </section>
  )
}
