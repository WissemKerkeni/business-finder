import { steps } from '../data/business'
import { SectionTitle, Wrap, rd } from './ui'

/** The four stated services as a numbered route: one horizontal line on desktop, a vertical line on phones. */
export default function Steps() {
  return (
    <section id="service" aria-labelledby="service-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap>
        <SectionTitle eyebrow="Nos services incluent" id="service-title" className="mb-14 lg:mb-20">Service clé en main</SectionTitle>
        <div className="relative" data-reveal>
          <span className="route-line absolute top-[22px] right-0 left-0 hidden h-px bg-signal/60 lg:block" aria-hidden />
          <ol className="relative grid lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.n} className="relative pb-10 pl-14 lg:pr-8 lg:pb-0 lg:pl-0" data-reveal style={rd(i + 1, 180)}>
                {i < steps.length - 1 && <span className="absolute top-12 bottom-0 left-[18px] w-px bg-line lg:hidden" aria-hidden />}
                <p className="tnum absolute left-0 font-mono text-[34px] font-bold leading-none lg:static lg:mb-6 lg:inline-block lg:bg-ink lg:pr-3 lg:text-5xl">
                  {s.n}<span className="ml-2 hidden h-[3px] w-6 bg-signal align-middle lg:inline-block" aria-hidden />
                </p>
                <h3 className="max-w-[16ch] pt-1 font-head text-2xl font-bold uppercase leading-tight lg:pt-0 lg:text-[26px]">{s.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </section>
  )
}
