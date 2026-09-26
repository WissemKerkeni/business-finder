import { Eyebrow, Photo } from './ui'
import { restaurant as r } from '../data/restaurant'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-line bg-night-2 px-5 py-24 sm:px-12 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Eyebrow className="mb-3">L’identità</Eyebrow>
        <h2 id="about-title" className="mb-16 font-serif text-4xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          Di più — <span className="italic text-leaf">Italian for more.</span>
        </h2>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-lg font-light leading-relaxed text-body">
              A calm, modern trattoria in the centre of Monastir: sage walls, oak slats and rattan lamps inside, a planted
              green-wall terrace outside. The kitchen covers the Italian classics — pizza, pasta your way (spaghetti, penne,
              farfalle or tagliatelle), ravioli, risotto — plus grilled meat and fish, mojitos and cheesecakes.
            </p>
            <dl className="mt-10 divide-y divide-line rounded-sm border border-line bg-night px-6 py-2 text-sm">
              {[
                ['Price', r.pricePerPerson],
                ['Good for', 'Families, groups, a quiet dinner for two'],
                ['Reservations', <>Accepted by phone (<a href={`tel:${r.phoneE164}`} className="underline underline-offset-4">{r.phone}</a>)</>],
              ].map(([k, v]) => (
                <div key={k as string} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="eyebrow text-[10px] text-leaf">{k}</dt>
                  <dd className="text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-12 items-start gap-5 lg:col-span-7">
            <figure className="col-span-12 sm:col-span-7">
              <Photo id="basketWall" alt="Charcoal banquette under a wall of woven baskets, with rattan pendant lamps and oak slats" className="aspect-[4/5] w-full rounded-sm object-cover" sizes="(min-width: 1024px) 34vw, (min-width: 640px) 58vw, 100vw" />
              <figcaption className="eyebrow mt-3 text-[10px] font-normal text-muted">The dining room · woven pendants & oak</figcaption>
            </figure>
            <figure className="col-span-12 sm:col-span-5 sm:mt-24">
              <Photo id="sageBar" alt="The sage-green bar and shelves under the glowing Di Più logo" className="aspect-[4/5] w-full rounded-sm object-cover" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 42vw, 100vw" />
              <figcaption className="eyebrow mt-3 text-[10px] font-normal text-muted">The sage counter & the Di Più sign</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
