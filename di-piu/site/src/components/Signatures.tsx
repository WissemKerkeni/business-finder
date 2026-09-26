import { Photo, Price, SectionTitle } from './ui'
import { signatures } from '../data/restaurant'

export default function Signatures() {
  const [feature, ...rest] = signatures
  return (
    <section id="piatti" aria-labelledby="piatti-title" className="border-b border-line bg-night px-5 py-24 sm:px-12 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="From the menu" className="mb-16 border-b border-line pb-8"><span id="piatti-title">I piatti</span></SectionTitle>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:sticky lg:top-8 lg:col-span-7">
            <Photo id={feature.photo} alt={feature.name} className="aspect-[16/11] w-full rounded-sm object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
            <div className="mt-6 border-t border-line pt-5">
              {feature.label && <p className="eyebrow mb-1 text-[10px] text-leaf">{feature.label}</p>}
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-3xl font-light italic text-white sm:text-4xl">{feature.name}</h3>
                <Price value={feature.price} className="text-xl" />
              </div>
              {feature.description && <p className="mt-2.5 text-sm font-light leading-relaxed text-body">{feature.description}</p>}
            </div>
          </article>
          <div className="flex flex-col gap-10 sm:gap-8 lg:col-span-5">
            {rest.map((d) => (
              <article key={d.name} className="grid grid-cols-1 gap-4 sm:grid-cols-[44%_1fr] sm:items-center sm:gap-6">
                <Photo id={d.photo} alt={d.name} className="aspect-[16/10] w-full rounded-sm object-cover sm:aspect-square" sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw" />
                <div className="border-t border-line pt-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-2xl font-light italic text-white">{d.name}</h3>
                    <Price value={d.price} />
                  </div>
                  {d.description && <p className="mt-1.5 text-xs font-light leading-relaxed text-muted">{d.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
