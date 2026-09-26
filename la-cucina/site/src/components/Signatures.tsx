import { signatures } from '../data/restaurant'
import { Eyebrow, Photo, Price } from './ui'

// Asymmetric editorial grid: wide/narrow on the first row, narrow/wide on the second.
const layout = ['md:col-span-7', 'md:col-span-5 md:mt-24', 'md:col-span-5', 'md:col-span-7 md:mt-24']
const aspect = ['aspect-[4/3]', 'aspect-square', 'aspect-[4/5]', 'aspect-[4/3]']

export default function Signatures() {
  return (
    <section id="signatures" aria-labelledby="signatures-title" className="border-t border-sage/40 bg-brick py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="flex flex-col justify-between gap-4 border-b border-sage/60 pb-8 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-pine/70" rule={false}>
              Specialità della casa
            </Eyebrow>
            <h2 id="signatures-title" className="mt-3 font-display text-5xl md:text-6xl">
              Signature <em>Creations</em>
            </h2>
          </div>
          <p className="eyebrow text-pine/60">4 dishes from the menu</p>
        </div>

        <ul className="mt-14 grid gap-14 md:grid-cols-12 md:gap-x-12">
          {signatures.map((d, i) => (
            <li key={d.name} className={layout[i]}>
              <article>
                <Photo id={d.photo} alt={d.name} sizes="(min-width: 768px) 55vw, 100vw" className={`${aspect[i]} w-full rounded object-cover`} />
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-sage/60 pb-3">
                  <h3 className="font-display text-3xl">
                    <em>{d.italic}</em> {d.rest}
                  </h3>
                  <Price value={d.price} className="text-lg" />
                </div>
                {d.description && <p className="mt-3 text-pine/75">{d.description}</p>}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
