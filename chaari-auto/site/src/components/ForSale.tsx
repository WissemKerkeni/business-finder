import { carPhoto, carTitle, forSale, forSaleDate, frDate, wa, type SaleCar } from '../data/business'
import { Photo, SectionTitle, WaIcon, Wrap, btn } from './ui'

const price = (c: SaleCar) =>
  c.price === null || !c.currency ? 'Prix sur demande' : `${c.price.toLocaleString('fr-FR')} ${c.currency === 'EUR' ? '€' : 'DT'}`

/** "Véhicules proposés": only rendered when the business has posted cars for sale ("à vendre" / "disponible").
 *  Today the list is empty, so nothing renders. Newest post first; "Prix sur demande" when no price is published. */
export default function ForSale({ onOpen }: { onOpen: (id: string) => void }) {
  if (forSale.length === 0) return null
  const cars = [...forSale].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  return (
    <section id="vehicules" aria-labelledby="sale-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap>
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="À vendre" id="sale-title">Véhicules proposés</SectionTitle>
          <p className="max-w-md text-dim">Véhicules publiés au {forSaleDate.fr}. Contactez-nous pour la disponibilité.</p>
        </div>
        <p className="mb-6 font-mono text-xs uppercase tracking-wider text-dim" aria-live="polite">{cars.length} {cars.length > 1 ? 'véhicules' : 'véhicule'}</p>
        {cars.map((c) => (
          <article key={c.id} id={`car-${c.id}`} className="grid gap-6 border-b border-line py-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <button type="button" onClick={() => onOpen(c.id)} className="relative block aspect-[16/10] overflow-hidden bg-raised" aria-label={`Détails : ${carTitle(c)}`}>
              <Photo id={carPhoto(c, 1)} alt={c.alts[0]} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover" />
            </button>
            <div className="flex flex-col justify-center">
              <p className="eyebrow mb-3 text-signal-text">Publié le {frDate(c.date)}</p>
              <h3 className="mb-3 font-head text-4xl font-bold uppercase leading-[0.95]">{carTitle(c)}</h3>
              <p className="mb-5 font-mono text-xs text-chalk-2">{c.specs.map(([, v]) => v).join(' · ')}</p>
              <p className="mb-6 font-mono text-base font-bold text-signal-text">{price(c)}</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => onOpen(c.id)} className={btn.outline}>Détails</button>
                <a href={wa(`Bonjour, je suis intéressé(e) par la ${carTitle(c)} (${price(c)}) publiée le ${frDate(c.date)}. Est-elle toujours disponible ?`)} target="_blank" rel="noopener noreferrer" className={btn.red}><WaIcon />WhatsApp</a>
              </div>
            </div>
          </article>
        ))}
      </Wrap>
    </section>
  )
}
