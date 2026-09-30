import { carMeta, carPhoto, carTitle, deliveries } from '../data/business'
import { Photo, SectionTitle, Wrap, rd } from './ui'

/** "Export pour la Tunisie": cars the business posted. Portfolio only: no availability wording, no price. */
export default function Deliveries({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="voitures" aria-labelledby="voitures-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap>
        <SectionTitle eyebrow="Instagram · Facebook · Google Maps" id="voitures-title" className="mb-12">Export pour la Tunisie</SectionTitle>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {deliveries.map((c, i) => (
            <article key={c.id} id={`car-${c.id}`} className="group relative border-b border-line pb-6" data-reveal style={rd(i % 3)}>
              <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-signal transition-[width] duration-500 group-hover:w-full" aria-hidden />
              <button type="button" onClick={() => onOpen(c.id)} aria-label={`Voir les photos : ${carTitle(c)}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-raised text-left">
                <Photo id={carPhoto(c, 1)} alt={c.alts[0]} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                {c.kind === 'client' && <span className="absolute top-3 left-3 bg-signal px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">Voiture d’un client</span>}
                <span className="absolute right-3 bottom-3 bg-black/70 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-white">{c.photos} {c.photos > 1 ? 'photos' : 'photo'}</span>
              </button>
              <p className="mt-5 mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">{carMeta(c)}</p>
              <h3 className="mb-3 font-head text-2xl font-bold uppercase leading-tight">{carTitle(c)}</h3>
              <button type="button" onClick={() => onOpen(c.id)} className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#D6D6D2] hover:text-signal-text">Voir les photos →</button>
            </article>
          ))}
        </div>
      </Wrap>
    </section>
  )
}
