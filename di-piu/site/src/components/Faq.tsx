import { SectionTitle } from './ui'
import { faq } from '../data/restaurant'

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b border-line bg-night px-5 py-24 sm:px-12 sm:py-28 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <SectionTitle eyebrow="Domande" className="lg:col-span-4"><span id="faq-title">Good to know</span></SectionTitle>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-white [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-xl sm:text-2xl">{f.q}</h3>
                <span aria-hidden className="text-2xl text-leaf transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
