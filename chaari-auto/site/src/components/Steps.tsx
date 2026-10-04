import type { CSSProperties } from 'react'
import { business as b, steps, wa } from '../data/business'
import { useCopy } from '../data/copy'
import { useLang } from '../i18n'
import { WaIcon, Wrap, btn } from './ui'

// Hairlines per layout: 1 column (phones), 2 columns with the last step full width (sm), 5 columns (lg).
const cellBorders = [
  'border-b sm:border-r lg:border-b-0',
  'border-b lg:border-r lg:border-b-0',
  'border-b sm:border-r lg:border-b-0',
  'border-b lg:border-r lg:border-b-0',
  'sm:col-span-2 lg:col-span-1',
]

/** "Service clé en main", after Stitch option A (screen 10d354fdd52e4ede90db8af0d237f1ac), widened to five steps: the
 *  title and CTAs in a row on top, then five tall columns with huge outlined numbers, a blue bar and the step title.
 *  Hover: column lightens, the number turns blue with a glow, the bar grows. On reveal: the numbers slide up from a
 *  mask and the bars grow, staggered 01 → 05 (final state without JS or with reduced motion). */
export default function Steps() {
  const lang = useLang()
  const t = useCopy()
  return (
    <section id="service" aria-labelledby="service-title" className="border-b border-line bg-ink py-12 md:py-16 lg:py-28">
      <Wrap>
        <div className="steps-a border-y border-line" data-reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-line py-8 lg:flex-row lg:items-end lg:py-12">
            <div>
              <p className="eyebrow mb-4 font-bold text-signal-text">{t.steps.eyebrow}</p>
              <h2 id="service-title" className="font-head text-4xl font-bold uppercase leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-6xl">{t.steps.title}</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine !py-4`}><WaIcon />WhatsApp {b.phone}</a>
              <a href="#demande" className={`${btn.outline} !border-line !py-4 hover:!border-dim hover:!bg-white/5 hover:!text-chalk`}>{t.steps.request}</a>
            </div>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li
                key={s.n}
                style={{ '--i': i } as CSSProperties}
                className={`step-a group flex min-h-[200px] flex-col justify-between border-line py-8 transition-colors duration-200 hover:bg-[#121214] sm:px-6 lg:min-h-[400px] lg:py-12 lg:first:pl-0 ${cellBorders[i]}`}
              >
                <div>
                  <span className="block overflow-hidden pb-1" aria-hidden>
                    <span className="stroke-number step-num block font-mono text-[80px] font-bold leading-[0.85] sm:text-[96px] lg:text-[92px] xl:text-[112px]">{s.n}</span>
                  </span>
                  <span className="step-bar mt-5 mb-6 block lg:mt-6 lg:mb-8 h-[2px] w-10 bg-signal-text transition-[width] duration-200 group-hover:w-16" />
                </div>
                <div>
                  <h3 className="font-head text-2xl font-bold uppercase leading-tight tracking-[-0.01em]">
                    <span className="sr-only">{t.steps.step} {s.n} : </span>{s.title[lang]}
                  </h3>
                  {i === 0 && (
                    <a href="#demande" className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-signal-text hover:text-white">{t.steps.sendLink} →</a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </section>
  )
}
