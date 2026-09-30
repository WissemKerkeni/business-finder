import type { CSSProperties } from 'react'
import { business as b, steps, wa } from '../data/business'
import { WaIcon, Wrap, btn } from './ui'

// Hairlines per layout: 1 column (phones), 2×2 (sm), 4 columns (lg).
const cellBorders = [
  'border-b sm:border-r lg:border-b-0',
  'border-b lg:border-r lg:border-b-0',
  'border-b sm:border-b-0 sm:border-r',
  '',
]

/** "Service clé en main", Stitch option A (screen 10d354fdd52e4ede90db8af0d237f1ac): title and CTAs in a left column,
 *  four tall columns with huge outlined numbers, a red bar and the step title (verbatim). Hover: column lightens,
 *  the number turns red with a glow, the bar grows. On reveal: the numbers slide up from a mask and the bars grow,
 *  staggered 01 → 04 (final state without JS or with reduced motion). */
export default function Steps() {
  return (
    <section id="service" aria-labelledby="service-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap>
        <div className="steps-a grid border-y border-line lg:grid-cols-12" data-reveal>
          <div className="flex flex-col justify-between border-b border-line py-10 lg:col-span-4 lg:border-r lg:border-b-0 lg:py-12 lg:pr-12">
            <div>
              <p className="eyebrow mb-4 font-bold text-signal-text">Nos services incluent</p>
              <h2 id="service-title" className="max-w-[340px] font-head text-4xl font-bold uppercase leading-[1.02] tracking-[-0.01em] sm:text-5xl">Service clé en main</h2>
            </div>
            <div className="flex flex-col gap-3 pt-10 sm:max-w-sm lg:pt-12">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine !py-4`}><WaIcon />WhatsApp {b.phone}</a>
              <a href="#demande" className={`${btn.outline} !border-line !py-4 hover:!border-dim hover:!bg-white/5 hover:!text-chalk`}>Votre demande</a>
            </div>
          </div>
          <ol className="grid sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.n}
                style={{ '--i': i } as CSSProperties}
                className={`step-a group flex min-h-[260px] flex-col justify-between border-line py-10 transition-colors duration-200 hover:bg-[#121214] sm:px-6 lg:min-h-[420px] lg:py-12 ${cellBorders[i]}`}
              >
                <div>
                  <span className="block overflow-hidden pb-1" aria-hidden>
                    <span className="stroke-number step-num block font-mono text-[96px] font-bold leading-[0.85] sm:text-[104px] lg:text-[84px] xl:text-[118px]">{s.n}</span>
                  </span>
                  <span className="step-bar mt-6 mb-8 block h-[2px] w-10 bg-signal transition-[width] duration-200 group-hover:w-16" />
                </div>
                <h3 className="font-head text-2xl font-bold uppercase leading-tight tracking-[-0.01em]">
                  <span className="sr-only">Étape {s.n} : </span>{s.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </section>
  )
}
