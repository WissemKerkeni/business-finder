import { useState, type CSSProperties } from 'react'
import { destinations, markets, shipping, wa, type MarketKey } from '../data/business'
import { useCopy } from '../data/copy'
import { useLang } from '../i18n'
import mapData from '../data/map.json' with { type: 'json' }
import { SectionTitle, WaIcon, Wrap, btn, rd } from './ui'

type Pt = [number, number]
const P = mapData.points as Record<'stuttgart' | 'genoa' | MarketKey, Pt>
const { w: W, h: H } = mapData

/** Bubble area ∝ share (10 % → r 7 in map units; France at 75 % → r 19). */
const radius = (share: number) => 7 * Math.sqrt(share / 10)
/** A curved route from a to b, bowed upward by a share of its length. */
function arc([x1, y1]: Pt, [x2, y2]: Pt, bow = 0.28) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.hypot(dx, dy)
  // Normal pointing up (negative y) so every route arcs over the map.
  let nx = -dy / len, ny = dx / len
  if (ny > 0) { nx = -nx; ny = -ny }
  return `M${x1} ${y1} Q${mx + nx * len * bow} ${my + ny * len * bow} ${x2} ${y2}`
}
const pct = ([x, y]: Pt): CSSProperties => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` })

// Where each label sits around its point. Europe is crowded: Stuttgart above-right, France and Tunisia to the left,
// the port to the right; the Gulf label above Dubai.
const labelPos: Record<MarketKey, string> = {
  canada: '-translate-x-1/2 -translate-y-[160%]',
  france: '-translate-x-[calc(100%+18px)] -translate-y-1/2',
  tunisia: '-translate-x-[calc(100%+22px)] -translate-y-[20%]',
  gulf: '-translate-x-[88%] -translate-y-[175%]',
  africa: '-translate-x-1/2 translate-y-[70%]',
}

/** "International": where the cars go. A static base map (scripts/make-map.mjs, every market region in one tone) with
 *  routes from Stuttgart and bubbles sized by each market's share, linked to the share list: hovering or focusing a row
 *  highlights its route and bubble, and the other way round. Then the port of Genoa, France and the Gulf message. */
export default function International() {
  const lang = useLang()
  const t = useCopy()
  const [active, setActive] = useState<MarketKey | null>(null)
  const dim = (k: MarketKey) => (active && active !== k ? 'opacity-25' : 'opacity-100')
  const hover = (k: MarketKey) => ({ onMouseEnter: () => setActive(k), onMouseLeave: () => setActive(null), onFocus: () => setActive(k), onBlur: () => setActive(null) })

  return (
    <section id="international" aria-labelledby="intl-title" className="border-b border-line bg-raised py-12 md:py-16 lg:py-28">
      <Wrap>
        <div className="mb-8 grid gap-6 lg:mb-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionTitle eyebrow={t.intl.eyebrow} id="intl-title">{t.intl.title}</SectionTitle>
          <p className="max-w-xl text-lg leading-relaxed text-chalk-2" data-reveal style={rd(1)}>{t.intl.lead}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.75fr_1fr] lg:gap-12">
          <figure className="market-map relative -mx-4 sm:mx-0" data-reveal>
            <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
              <img src="/map/markets.svg" alt={t.intl.mapAlt} width={W} height={H} loading="lazy" className="absolute inset-0 h-full w-full" />
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
                <path d={`M${P.stuttgart.join(' ')} L${P.genoa.join(' ')}`} className="fill-none stroke-chalk/60" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                {markets.map((m, i) => (
                  <path key={m.key} d={arc(P.stuttgart, P[m.key], m.key === 'france' ? 0.6 : 0.28)} pathLength={1} style={{ '--i': i } as CSSProperties}
                    className={`arc fill-none stroke-signal-text transition-opacity duration-200 ${dim(m.key)}`} strokeWidth={active === m.key ? 2.5 : 1.5} strokeOpacity={active === m.key ? 1 : 0.6} vectorEffect="non-scaling-stroke" />
                ))}
                {markets.map((m, i) => (
                  <circle key={m.key} cx={P[m.key][0]} cy={P[m.key][1]} r={radius(m.share)} style={{ '--i': i } as CSSProperties}
                    className={`bubble fill-signal-text stroke-raised transition-opacity duration-200 ${dim(m.key)}`} fillOpacity={active === m.key ? 1 : 0.8} strokeWidth="2" vectorEffect="non-scaling-stroke"
                    onMouseEnter={() => setActive(m.key)} onMouseLeave={() => setActive(null)} />
                ))}
                <rect x={P.genoa[0] - 3.5} y={P.genoa[1] - 3.5} width="7" height="7" className="fill-chalk stroke-raised" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <circle cx={P.stuttgart[0]} cy={P.stuttgart[1]} r="6" className="hub-pulse fill-none stroke-white" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <circle cx={P.stuttgart[0]} cy={P.stuttgart[1]} r="5" className="fill-white stroke-signal" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              </svg>
              {/* Labels in HTML so they stay crisp and readable at any map size. */}
              <span className="pointer-events-none absolute -translate-x-[15%] -translate-y-[185%] bg-white px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-ink sm:text-[11px]" style={pct(P.stuttgart)}>{t.intl.hub}</span>
              <span className="pointer-events-none absolute translate-x-[14px] -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.08em] text-chalk sm:text-[11px]" style={pct(P.genoa)}>⚓ {t.intl.port}</span>
              {markets.map((m) => (
                <span key={m.key} className={`pointer-events-none absolute whitespace-nowrap rounded-[3px] border border-line bg-ink/90 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-opacity duration-200 sm:px-2 sm:py-1 sm:text-[11px] ${labelPos[m.key]} ${dim(m.key)}`} style={pct(P[m.key])}>
                  <b className="text-white">{m.share} %</b><span className="hidden text-chalk-2 md:inline"> · {m.name[lang]}</span>
                </span>
              ))}
            </div>
          </figure>

          <div data-reveal style={rd(1)}>
            <h3 className="mb-1 font-head text-2xl font-bold uppercase">{t.intl.marketsTitle}</h3>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">{t.intl.marketsNote}</p>
            <ul className="share-list border-t border-line" data-reveal>
              {markets.map((m, i) => (
                <li key={m.key} tabIndex={0} {...hover(m.key)} style={{ '--i': i } as CSSProperties}
                  className={`cursor-default border-b border-line py-4 outline-offset-0 transition-colors ${active === m.key ? 'bg-white/[.04]' : ''}`}>
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <span className="text-chalk">{m.name[lang]}</span>
                    <span className="font-head text-2xl font-bold tnum">{m.share} %</span>
                  </div>
                  <div className="h-1.5 bg-line">
                    <div className="share-bar h-full rounded-r-[4px] bg-signal-text" style={{ width: `${(m.share / markets[0].share) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-mute">{t.intl.destinations}</p>
            <ul className="flex flex-wrap gap-2">
              {destinations.map((d) => <li key={d.fr} className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-chalk-2">{d[lang]}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-px lg:mt-14 border border-line bg-line lg:grid-cols-3">
          <div className="bg-raised p-6 lg:p-8" data-reveal>
            <p className="eyebrow mb-3 text-signal-text">⚓ {shipping.port[lang]}</p>
            <h3 className="mb-3 font-head text-2xl font-bold uppercase">{t.intl.portTitle}</h3>
            <p className="leading-relaxed text-chalk-2">{t.intl.portText}</p>
          </div>
          <div className="bg-raised p-6 lg:p-8" data-reveal style={rd(1)}>
            <p className="eyebrow mb-3 text-signal-text">France · Paris</p>
            <h3 className="mb-3 font-head text-2xl font-bold uppercase">{t.intl.franceTitle}</h3>
            <p className="leading-relaxed text-chalk-2">{t.intl.franceText(shipping.parisWithin?.[lang] ?? null)}</p>
          </div>
          <div className="relative overflow-hidden bg-signal p-6 lg:p-8" data-reveal style={rd(2)}>
            <p className="eyebrow mb-3 text-white/80">{t.intl.gulfEyebrow}</p>
            <p className="mb-6 font-head text-2xl font-bold uppercase leading-tight text-white">{t.intl.gulfText(shipping.gulfFrom?.[lang] ?? null)}</p>
            <a href={wa(t.intl.gulfWa)} target="_blank" rel="noopener noreferrer" className={`${btn.outline} !whitespace-normal !border-white text-center !text-white hover:!bg-white hover:!text-signal`}><WaIcon />{t.intl.gulfCta}</a>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
