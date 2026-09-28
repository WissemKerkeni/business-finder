import { useMemo, useState } from 'react'
import { carAlt, carName, carPhoto, displayModel, energies, frDate, makes, specLine, stock, stockDate, waCar, type Car, type Energy } from '../data/dealer'
import { Photo, WaIcon, Wrap, btn } from './ui'

type Sort = 'date' | 'year' | 'km'
const sorters: Record<Sort, (a: Car, b: Car) => number> = {
  date: (a, b) => b.date.localeCompare(a.date),
  year: (a, b) => b.yearNum - a.yearNum,
  km: (a, b) => (a.km ?? Infinity) - (b.km ?? Infinity),
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-[4px] border px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.1em] transition-colors ${on ? 'border-signal bg-signal text-white' : 'border-white/20 text-neutral-300 hover:border-white/50'}`}
    >
      {children}
    </button>
  )
}

/** Stock list. Every car is always rendered (filtered ones get `hidden`), so the prerendered HTML contains the full stock. */
export default function Stock({ onOpen }: { onOpen: (id: string) => void }) {
  const [make, setMake] = useState('all')
  const [energy, setEnergy] = useState<'all' | Energy>('all')
  const [sort, setSort] = useState<Sort>('date')
  const sorted = useMemo(() => [...stock].sort(sorters[sort]), [sort])
  const shown = (c: Car) => (make === 'all' || c.make === make) && (energy === 'all' || c.energy === energy)
  const n = stock.filter(shown).length

  return (
    <section id="vehicules" aria-labelledby="stock-title" className="bg-ink pt-20 pb-16 lg:pt-28">
      <Wrap className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow mb-3 text-signal-text">01 / Stock</p>
          <h2 id="stock-title" className="font-wide text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">Véhicules en stock</h2>
        </div>
        <p className="max-w-md text-neutral-400">Stock indicatif, publié au {stockDate.fr}. Contactez-nous pour la disponibilité.</p>
      </Wrap>

      <div className="sticky top-16 z-30 border-y border-white/10 bg-ink/95 backdrop-blur lg:top-20">
        <Wrap className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <div role="toolbar" aria-label="Filtrer les véhicules" className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 xl:overflow-visible">
            <Chip on={make === 'all'} onClick={() => setMake('all')}>Tous</Chip>
            {makes.map((m) => <Chip key={m} on={make === m} onClick={() => setMake(m)}>{m}</Chip>)}
            <span className="mx-1 h-6 w-px shrink-0 bg-white/15" aria-hidden />
            <Chip on={energy === 'all'} onClick={() => setEnergy('all')}>Toutes</Chip>
            {energies.map((e) => <Chip key={e.key} on={energy === e.key} onClick={() => setEnergy(e.key)}>{e.label}</Chip>)}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 lg:ml-auto lg:justify-end">
            <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Trier
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="select-arrow rounded-[4px] border border-white/20 bg-graphite py-2 pr-8 pl-3 font-mono text-xs uppercase tracking-wider text-chalk focus:border-signal focus:outline-none">
                <option value="date">Plus récents</option>
                <option value="year">Année</option>
                <option value="km">Kilométrage</option>
              </select>
            </label>
            <p className="border border-white/15 px-3 py-2 font-mono text-xs uppercase tracking-wider text-neutral-300" aria-live="polite">{n} {n > 1 ? 'véhicules' : 'véhicule'}</p>
          </div>
        </Wrap>
      </div>

      <Wrap>
        <div>
          {sorted.map((c) => (
            <article key={c.id} id={`car-${c.id}`} hidden={!shown(c)} className="group grid gap-6 border-b border-white/10 py-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12 lg:py-10">
              <button type="button" onClick={() => onOpen(c.id)} aria-label={`Voir les photos : ${carName(c)}`} className="relative block aspect-[16/10] overflow-hidden bg-graphite text-left">
                <Photo id={carPhoto(c, 1)} alt={carAlt(c, 1)} sizes="(min-width: 1024px) 58vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute bottom-3 left-3 bg-black/70 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white">{c.photos} photos</span>
              </button>
              <div className="flex flex-col justify-center">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-signal-text">Publié le {frDate(c.date)}</p>
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">{c.make}</p>
                <h3 className="mb-2 font-wide text-3xl font-extrabold leading-[0.95] tracking-tight sm:text-4xl lg:text-[44px]">{displayModel(c.model)}</h3>
                <p className="mb-4 text-neutral-300">{c.version}{c.colour ? ` · ${c.colour}` : ''}</p>
                <p className="tnum mb-5 font-mono text-xs leading-relaxed text-neutral-300">
                  {specLine(c).map((p, i) => <span key={p}>{i > 0 && <span className="text-neutral-600"> · </span>}{p}</span>)}
                </p>
                <p className="mb-6 font-mono text-base font-bold text-signal-text">Prix sur demande</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => onOpen(c.id)} className={btn.outline}>Détails</button>
                  <a href={waCar(c)} target="_blank" rel="noopener noreferrer" className={btn.red}><WaIcon />WhatsApp</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {n === 0 && <p className="py-12 font-mono text-sm text-neutral-400">Aucun véhicule ne correspond à ces filtres.</p>}
      </Wrap>
    </section>
  )
}
