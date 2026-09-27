import { Photo, SectionTitle } from './ui'
import { restaurant as r } from '../data/restaurant'

const facts: [string, string][] = [
  ['Plus code', r.plusCode],
  ['Phone', r.phone],
  ['Price', '10–20 DT per person'],
  ['Good for', 'groups, families, tourists'],
  ['Hours', '24/24 (sign & Google)'],
]

export default function About() {
  return (
    <section id="house" aria-labelledby="house-title" className="px-5 py-24 md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionTitle eyebrow="01 — The house" id="house-title" className="mb-8">
            Dar zmen means <i>{r.meaning}.</i>
          </SectionTitle>
          <p className="mb-10 max-w-[60ch] text-lg font-light leading-relaxed text-ink/85">
            Behind a stone gateway in the old walls of Monastir, Dar Zmen serves the Tunisian dishes people grew up with:
            couscous, ojja, mloukhia, kamounia, grilled fish and chorba. Main dishes come with bread and salad, and guests
            often mention the tea served on the house.
          </p>
          <dl className="border-t border-line font-mono text-xs">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <dt className="uppercase tracking-widest text-sandstone-ink">{k}</dt>
                <dd className="text-right">{k === 'Phone' ? <a href={`tel:${r.phoneE164}`} className="hover:text-cobalt">{v}</a> : v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-7 lg:pl-10">
          <figure className="zoom ml-auto w-full overflow-hidden sm:w-[85%]">
            <div className="aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
              <Photo id="diningRoom" alt="The dining room: turquoise wooden chairs, Tunisian tile-print tablecloths, copper pots and line drawings of old utensils on white walls" className="h-full w-full object-cover" sizes="(min-width: 1024px) 45vw, 90vw" />
            </div>
            <figcaption className="eyebrow mt-3 text-right text-[10px] text-ink/60">The dining room</figcaption>
          </figure>
          <figure className="zoom -mt-24 w-[62%] overflow-hidden border-8 border-limewash sm:absolute sm:bottom-10 sm:left-0 sm:mt-0 sm:w-[48%] lg:left-0">
            <div className="aspect-[4/3] overflow-hidden">
              <Photo id="vaultedCounter" alt="The counter under a vaulted brick ceiling, with copper pans and a glass display of the day’s dishes" className="h-full w-full object-cover" sizes="(min-width: 1024px) 28vw, 60vw" />
            </div>
            <figcaption className="eyebrow mt-2 text-[10px] text-ink/60">The counter</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
