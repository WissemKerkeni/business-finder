import { photos, restaurant as r } from '../data/restaurant'
import { Eyebrow, Photo } from './ui'

const facts = [
  ['Price', r.pricePerPerson],
  ['Service', 'Dine-in, takeaway, delivery'],
  ['Find us', `${r.address.street}, ${r.address.locality} ${r.address.postalCode}`],
] as const

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-brick py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-12">
        <figure>
          <Photo
            id={photos.facadeDay}
            alt="The green La Cucina house on Place 3 Août by day"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5] w-full rounded object-cover"
          />
          <figcaption className="eyebrow mt-3 flex justify-between text-pine/60">
            <span>Place 3 Août</span>
            <span>Monastir {r.address.postalCode}</span>
          </figcaption>
        </figure>
        <div>
          <Eyebrow className="text-pine/70">Il Ristorante</Eyebrow>
          <h2 id="about-title" className="mt-5 font-display text-4xl leading-tight md:text-5xl">
            A small green house on Place 3&nbsp;Août with a big <em>Italian kitchen.</em>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-pine/85">
            Pizza, pasta made the way Italians make it, house-made ravioli, paella and lasagne, served in a room of white brick, sage panels
            and red gingham, under the neon that says <em className="font-display">La Dolce Vita</em>.
          </p>
          <dl className="mt-10 border-t border-sage/60">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-sage/60 py-4">
                <dt className="eyebrow text-pine/60">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
