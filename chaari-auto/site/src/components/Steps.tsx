import type { CSSProperties, ReactNode } from 'react'
import { steps } from '../data/business'
import { SectionTitle, Wrap } from './ui'

const I = (d: ReactNode) => (
  <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
)
// One line icon per stated step (car · export file · registration card + insurance · keys handed over).
const icons = [
  I(<><path d="M5 16l1.5-5.2A2 2 0 0 1 8.4 9.3h7.2a2 2 0 0 1 1.9 1.5L19 16" /><path d="M4 16h16v3H4z" /><circle cx="7.5" cy="19" r="1.3" /><circle cx="16.5" cy="19" r="1.3" /><path d="M9 6.5h6" /></>),
  I(<><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M9.5 12h6M9.5 15h6M9.5 18h4" /></>),
  I(<><rect x="3" y="6" width="12" height="9" rx="1.5" /><path d="M6 10h6M6 12.5h4" /><path d="M17.5 10.5l3 1.2v3.1c0 2-1.3 3.6-3 4.2-1.7-.6-3-2.2-3-4.2v-.6" /></>),
  I(<><circle cx="8" cy="15" r="4" /><path d="M11 12l8-8M16 7l2 2M14 9l2 2" /></>),
]

/** The four stated services as a route (titles verbatim). On reveal: the line draws, a small car drives from 01 to 04,
 *  each node lights up in turn and the last one pulses. Horizontal on desktop, vertical on phones. Reduced motion: static. */
export default function Steps() {
  return (
    <section id="service" aria-labelledby="service-title" className="relative overflow-hidden border-b border-line bg-ink py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(231,0,19,0.10),transparent)]" />
      <Wrap className="relative">
        <SectionTitle eyebrow="Nos services incluent" id="service-title" className="mb-14 lg:mb-20">Service clé en main</SectionTitle>
        <ol className="route relative grid gap-y-12 lg:grid-cols-4 lg:gap-y-0" data-reveal>
          {/* desktop track: from the centre of node 01 to the centre of node 04 */}
          <span aria-hidden className="absolute top-7 left-7 hidden h-[2px] bg-line lg:block lg:right-[calc(25%-1.75rem)]">
            <span className="route-fill absolute inset-0 origin-left bg-signal" />
            <span className="route-car absolute -top-[13px] left-0 -ml-3 text-signal-text">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M5 16l1.5-5.2A2 2 0 0 1 8.4 9.3h7.2a2 2 0 0 1 1.9 1.5L19 16v3h-2.2a1.8 1.8 0 0 1-3.6 0h-2.4a1.8 1.8 0 0 1-3.6 0H5z" /></svg>
            </span>
          </span>
          {/* phone track */}
          <span aria-hidden className="absolute top-7 bottom-7 left-7 w-[2px] bg-line lg:hidden">
            <span className="route-fill-v absolute inset-0 origin-top bg-signal" />
          </span>
          {steps.map((s, i) => (
            <li key={s.n} className="step group relative pl-20 lg:pr-8 lg:pl-0" style={{ '--i': i } as CSSProperties}>
              <span className="step-node tnum absolute top-0 left-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-line bg-ink font-mono text-lg font-bold text-dim transition-transform duration-300 group-hover:scale-110 lg:relative">
                {s.n}
              </span>
              <div className="step-body lg:mt-8">
                <span className="step-icon mb-4 inline-flex h-12 w-12 items-center justify-center border border-line text-chalk-2 transition-colors duration-300 group-hover:border-signal group-hover:text-signal-text">
                  {icons[i]}
                </span>
                <h3 className="max-w-[16ch] font-head text-2xl font-bold uppercase leading-tight lg:text-[26px]">
                  <span className="bg-[linear-gradient(#E70013,#E70013)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{s.title}</span>
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  )
}
