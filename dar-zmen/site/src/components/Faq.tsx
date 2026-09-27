import { SectionTitle } from './ui'
import { faq } from '../data/restaurant'

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-5 py-24 md:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12">
        <SectionTitle eyebrow="06 — Good to know" id="faq-title" className="lg:col-span-4">Questions, <i>answered</i></SectionTitle>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-xl sm:text-2xl">{f.q}</h3>
                <span aria-hidden className="text-2xl text-cobalt transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl font-light leading-relaxed text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
