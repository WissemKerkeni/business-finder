import { useRef, useState, type KeyboardEvent } from 'react'
import { menu } from '../data/restaurant'
import { Eyebrow, Price } from './ui'

// Every section is rendered into the prerendered HTML (inactive ones are `hidden`),
// so search engines and AI crawlers read the complete menu without running JS.
export default function Menu() {
  const [active, setActive] = useState(menu[0].id)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? menu.length - 1 : null
    if (next === null) return
    e.preventDefault()
    const idx = (next + menu.length) % menu.length
    setActive(menu[idx].id)
    tabs.current[idx]?.focus()
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="border-t border-sage/40 bg-brick py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-12">
        <header className="text-center">
          <Eyebrow className="justify-center text-pine/70" rule={false}>
            La Carta
          </Eyebrow>
          <h2 id="menu-title" className="mt-3 font-display text-5xl md:text-6xl">
            Il <em>Menu</em>
          </h2>
          <p className="mt-4 text-sm text-pine/70">Prices in Tunisian dinars (DT).</p>
        </header>

        <div role="tablist" aria-label="Menu sections" className="no-scrollbar -mx-5 mt-12 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {menu.map((s, i) => {
            const selected = s.id === active
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`eyebrow shrink-0 rounded border px-5 py-3 transition-colors ${
                  selected ? 'border-pine bg-pine text-neon' : 'border-sage/70 text-pine/80 hover:border-pine'
                }`}
              >
                {s.title}
              </button>
            )
          })}
        </div>

        <div className="mt-6 border-t border-sage/60 pt-12">
          {menu.map((s) => (
            <div key={s.id} role="tabpanel" id={`panel-${s.id}`} aria-labelledby={`tab-${s.id}`} hidden={s.id !== active} tabIndex={0}>
              <h3 className="eyebrow border-b border-pine pb-4 text-sm">{s.title}</h3>
              <ul className="mt-8 gap-x-16 md:columns-2">
                {s.items.map((item) => (
                  <li key={item.name} className={`mb-5 break-inside-avoid ${item.signature ? 'border-t border-sage/60 pt-5' : ''}`}>
                    <div className="flex items-baseline gap-3">
                      <span className={`font-display ${item.signature ? 'text-2xl font-semibold' : 'text-xl'}`}>
                        {item.name}
                        {item.note && <em className="ml-2 font-sans text-xs text-pine/60">({item.note})</em>}
                        {item.signature && <span className="eyebrow ml-3 text-[10px] text-tomato">Signature</span>}
                      </span>
                      <span aria-hidden className="leader" />
                      <Price value={item.price} className="text-sm" />
                    </div>
                    {item.description && <p className="mt-1 text-sm italic text-pine/65">{item.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
