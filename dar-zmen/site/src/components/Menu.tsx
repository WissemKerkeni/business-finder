import { useRef, useState, type KeyboardEvent } from 'react'
import { Ar, Photo, Price, SectionTitle } from './ui'
import { dishesOfTheDay, menu, seenOnTheTable, type MenuItem, type PhotoKey } from '../data/restaurant'

const tabs = [...menu.map((c) => ({ id: c.id, label: c.label })), { id: 'daily', label: 'Of the day' }]

export default function Menu() {
  const [active, setActive] = useState(tabs[0].id)
  const [dish, setDish] = useState<string | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const figureRef = useRef<HTMLElement>(null)

  const category = menu.find((c) => c.id === active)
  const selected = dish && category ? category.groups.flatMap((g) => g.items).find((i) => i.name === dish && i.photo) : undefined
  const shown: { photo: PhotoKey; caption: string } = selected
    ? { photo: selected.photo!, caption: `${selected.name} · ${selected.price} DT` }
    : category
      ? { photo: category.photo, caption: category.caption }
      : { photo: 'dishesOfTheDay', caption: 'The counter' }

  const selectTab = (id: string) => {
    setActive(id)
    setDish(null)
  }
  const onTabKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = (i + d + tabs.length) % tabs.length
    selectTab(tabs[next].id)
    tabRefs.current[next]?.focus()
  }
  const showDish = (item: MenuItem) => {
    setDish((cur) => (cur === item.name ? null : item.name)) // second tap: back to the category photo
    const fig = figureRef.current
    if (fig && window.innerWidth < 1024 && fig.getBoundingClientRect().top < 0) fig.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="border-y border-line bg-sand px-5 py-24 md:px-14 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
          <SectionTitle eyebrow="03 — The menu" id="menu-title">From the <i>printed</i> menu</SectionTitle>
          <p className="eyebrow max-w-xs text-ink/60 md:text-right">Prices in Tunisian dinars, as printed in the house menu. Dishes of the day change.</p>
        </div>

        {/* Sticky under the fixed header so the tabs stay reachable in long categories. */}
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar sticky top-[68px] z-30 -mx-5 mb-12 flex gap-2.5 overflow-x-auto border-b border-line bg-sand px-5 py-4 md:top-[76px] md:mx-0 md:px-0">
          {tabs.map((t, i) => {
            const on = t.id === active
            return (
              <button
                key={t.id}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => selectTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`eyebrow shrink-0 whitespace-nowrap border px-5 py-3 transition-colors ${on ? 'border-cobalt bg-cobalt text-white' : 'border-ink/25 text-ink hover:border-cobalt'}`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <figure ref={figureRef} className="scroll-mt-40 lg:sticky lg:top-44 lg:col-span-5">
            <div className="aspect-[16/11] w-full overflow-hidden bg-limewash lg:aspect-[4/5]">
              <Photo key={shown.photo} id={shown.photo} alt={shown.caption} className="h-full w-full object-cover animate-[fade_.35s_ease]" sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
            <figcaption aria-live="polite" className="eyebrow mt-3 text-[10px] text-ink/60">{shown.caption}</figcaption>
          </figure>

          <div className="lg:col-span-7">
            {menu.map((c) => (
              <div key={c.id} role="tabpanel" id={`panel-${c.id}`} aria-labelledby={`tab-${c.id}`} hidden={c.id !== active}>
                <Ar className="mb-8 text-4xl text-cobalt md:text-5xl">{c.ar}</Ar>
                {c.groups.some((g) => g.items.some((i) => i.photo)) && (
                  <p className="eyebrow mb-6 text-[10px] text-ink/60">Tap a dish marked “photo” to see it</p>
                )}
                {c.groups.map((g) => (
                  <div key={g.title} className="mb-10 last:mb-0">
                    <h3 className="eyebrow mb-2 text-sandstone-ink">{g.title}</h3>
                    <ul className="divide-y divide-line">
                      {g.items.map((item) => (
                        <li key={item.name}>
                          {item.photo ? (
                            <button type="button" className="dish-btn w-full cursor-pointer py-3 text-left" aria-pressed={dish === item.name} onClick={() => showDish(item)}>
                              <Row item={item} />
                            </button>
                          ) : (
                            <div className="py-3"><Row item={item} /></div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            <div role="tabpanel" id="panel-daily" aria-labelledby="tab-daily" hidden={active !== 'daily'}>
              <Ar className="mb-8 text-4xl text-cobalt md:text-5xl">أكلة اليوم</Ar>
              <h3 className="sr-only">Dishes of the day</h3>
              <ul className="font-serif text-2xl leading-[1.5] text-ink md:text-[28px]">
                {dishesOfTheDay.map((d, i) => (
                  <li key={d} className="inline">{d}{i < dishesOfTheDay.length - 1 && <span aria-hidden className="text-sandstone"> · </span>}</li>
                ))}
              </ul>
              <p className="eyebrow mt-8 border-t border-line pt-6 text-ink/60">The pots change through the week — ask at the counter what is cooking today.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-line pt-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <p className="eyebrow text-sandstone-ink">Seen on the table</p>
            <p className="text-xs font-light text-ink/60">Guest photos from Google Maps</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {seenOnTheTable.map((d) => (
              <li key={d.name}>
                <figure>
                  <div className="zoom aspect-square overflow-hidden">
                    <Photo id={d.photo} alt={d.name} className="h-full w-full object-cover" sizes="(min-width: 768px) 22vw, 50vw" />
                  </div>
                  <figcaption className="eyebrow mt-2 text-[10px] text-ink/60">{d.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-12 border-t border-line pt-6 text-center text-xs italic text-ink/60">Menu from the restaurant’s printed card; prices may change.</p>
        </div>
      </div>
    </section>
  )
}

function Row({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-baseline gap-2">
      <div className="min-w-0">
        <span className="dish-name font-serif text-xl leading-snug text-ink md:text-[21px]">
          {item.name}
          {item.photo && <span className="ml-2 border border-cobalt/40 px-1.5 py-0.5 align-middle font-mono text-[9px] tracking-widest text-cobalt">PHOTO</span>}
        </span>
        <Ar className="text-[15px] leading-tight text-ink/55">{item.ar}</Ar>
      </div>
      <span aria-hidden className="leader" />
      <Price value={item.price} className="text-sm md:text-[15px]" />
    </div>
  )
}
