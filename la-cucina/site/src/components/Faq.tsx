import { faq } from '../data/restaurant'
import { Eyebrow } from './ui'

// Plain, self-contained Q&A: the format answer engines quote most readily. Mirrors the FAQPage JSON-LD.
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-sage/20 bg-pine-deep pb-24 text-neon md:pb-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-24 md:grid-cols-12 md:px-12 md:pt-32">
        <div className="md:col-span-4">
          <Eyebrow className="text-sage" rule={false}>
            Domande
          </Eyebrow>
          <h2 id="faq-title" className="mt-3 font-display text-5xl">
            Good to <em>know</em>
          </h2>
        </div>
        <div className="md:col-span-8">
          {faq.map((f, i) => (
            <details key={f.q} className="group border-b border-sage/25 py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl marker:hidden md:text-2xl">
                <h3>{f.q}</h3>
                <span aria-hidden className="font-sans text-2xl text-sage transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-neon/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
