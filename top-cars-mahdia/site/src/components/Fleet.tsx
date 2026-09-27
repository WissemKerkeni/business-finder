import { useState } from 'react'
import { carName, filters, fleet, matches, specLine, wa, type Car, type FilterKey } from '../data/agency'
import { SectionTitle, WaIcon, btn } from './ui'

const requestText = (c: Car) => `Bonjour, je voudrais des informations sur : ${carName(c)}. Pouvez-vous m’indiquer la disponibilité et le prix ?`

/** Typographic row: no car photos exist that pass the quality rules (see brief.md), so the model name carries the row. */
function CarRow({ car, n, hidden }: { car: Car; n: number; hidden: boolean }) {
  return (
    <li hidden={hidden} className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 border-b border-white/10 py-6 transition-colors hover:bg-charcoal/50 lg:grid-cols-[4rem_1fr_12rem_12rem_15rem] lg:gap-x-6 lg:px-4 lg:py-7">
      <span className="font-mono text-sm tracking-widest text-neutral-500 transition-colors group-hover:text-signal-text" aria-hidden>{String(n).padStart(2, '0')}</span>
      <h3 className="font-cond text-4xl font-extrabold uppercase leading-none tracking-tight lg:text-5xl">
        {car.model}
        {car.sub && <span className="mt-1 block font-mono text-xs font-normal uppercase tracking-wider text-neutral-400">{car.sub}</span>}
      </h3>
      <p className="col-start-2 font-mono text-xs uppercase tracking-wider text-neutral-400 lg:col-start-auto">{specLine(car)}</p>
      <p className="col-start-2 font-mono text-xs font-bold uppercase tracking-widest text-signal-text lg:col-start-auto lg:text-right">Prix sur demande</p>
      <div className="col-start-2 lg:col-start-auto lg:text-right">
        <a href={wa(requestText(car))} target="_blank" rel="noopener noreferrer" className={btn.small}><WaIcon />Demander ce véhicule</a>
      </div>
    </li>
  )
}

export default function Fleet() {
  const [f, setF] = useState<FilterKey>('all')
  const shown = fleet.filter((c) => matches(c, f)).length
  return (
    <section id="flotte" aria-labelledby="flotte-title" className="border-b border-white/10 py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end lg:pb-12">
          <SectionTitle eyebrow="01 / Parc automobile" id="flotte-title">La flotte</SectionTitle>
          <p className="max-w-md pb-1 text-base text-neutral-400 md:text-lg">Les modèles présentés par l’agence. Disponibilités et tarifs sur demande.</p>
        </div>
        <div
          role="toolbar"
          aria-label="Filtrer la flotte"
          className="no-scrollbar sticky top-20 z-30 -mx-4 flex gap-3 overflow-x-auto border-b border-white/10 bg-deep/95 px-4 py-4 backdrop-blur sm:mx-0 sm:px-0 lg:static lg:bg-transparent lg:py-8 lg:backdrop-blur-none"
        >
          {filters.map((x) => (
            <button
              key={x.key}
              type="button"
              aria-pressed={f === x.key}
              onClick={() => setF(x.key)}
              className={`shrink-0 whitespace-nowrap rounded-[4px] border px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${f === x.key ? 'border-signal bg-signal text-white' : 'border-white/20 text-neutral-300 hover:border-white hover:text-white'}`}
            >
              {x.label}
            </button>
          ))}
        </div>
        {/* Every car is rendered (filtered ones are `hidden`) so the prerendered HTML lists the whole fleet. */}
        <ul aria-live="polite">
          {fleet.map((c, i) => <CarRow key={c.model} car={c} n={i + 1} hidden={!matches(c, f)} />)}
        </ul>
        {shown === 0 && <p className="py-10 font-mono text-sm text-neutral-400">Aucun modèle dans cette catégorie.</p>}
      </div>
    </section>
  )
}
