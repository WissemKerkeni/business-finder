import { useRef, useState, type KeyboardEvent } from 'react'
import { CameraIcon, Photo, Price, SectionTitle } from './ui'
import { menu, seenOnTheTable, type MenuItem, type PhotoKey } from '../data/restaurant'

type Shown = { photo: PhotoKey; caption: string }

export default function Menu() {
  const [active, setActive] = useState(menu[1].id) // Pizza first, as on the printed card
  const [dish, setDish] = useState<string | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const figureRef = useRef<HTMLElement>(null)

  const category = menu.find((c) => c.id === active)!
  const selected = dish ? category.groups.flatMap((g) => g.items).find((i) => i.name === dish && i.photo) : undefined
  const shown: Shown = selected
    ? { photo: selected.photo!, caption: `${selected.name} · ${selected.price} DT` }
    : { photo: category.photo, caption: category.caption }

  const selectTab = (id: string) => {
    setActive(id)
    setDish(null)
  }
  const onTabKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = (i + d + menu.length) % menu.length
    selectTab(menu[next].id)
    tabRefs.current[next]?.focus()
  }
  const showDish = (item: MenuItem) => {
    setDish((cur) => (cur === item.name ? null : item.name)) // second click: back to the category photo
    // On phones the photo sits above the list: bring it into view.
    const fig = figureRef.current
    if (fig && window.innerWidth < 1024 && fig.getBoundingClientRect().top < 0) fig.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="border-b border-line bg-night-2 px-5 py-24 sm:px-12 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionTitle eyebrow="La carta" className="[&>p]:justify-center"><span id="menu-title">Il menù</span></SectionTitle>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted">Prices in Tunisian dinars</p>
        </div>

        {/* Tabs stay reachable while scrolling a long category on phones. */}
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar sticky top-0 z-20 -mx-5 mb-10 flex items-center gap-2.5 overflow-x-auto border-b border-line bg-night-2 px-5 pt-3 pb-4 sm:mx-0 sm:px-0 lg:static lg:mb-16 lg:pt-0 xl:justify-center">
          {menu.map((c, i) => {
            const on = c.id === active
            return (
              <button
                key={c.id}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={on}
                aria-controls={`panel-${c.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => selectTab(c.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`eyebrow shrink-0 whitespace-nowrap rounded-sm border px-4 py-2.5 font-normal tracking-[0.14em] transition-colors ${on ? 'border-leaf bg-leaf font-semibold text-night' : 'border-white/30 text-white hover:border-white'}`}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        <div className="mb-20 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <figure ref={figureRef} className="scroll-mt-20 lg:sticky lg:top-8 lg:col-span-5">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-sm border border-line bg-night lg:aspect-[4/5]">
              <Photo key={shown.photo} id={shown.photo} alt={shown.caption} className="h-full w-full object-cover animate-[fade_.35s_ease]" sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
            <figcaption aria-live="polite" className="eyebrow mt-3 text-[11px] font-normal text-muted">{shown.caption}</figcaption>
          </figure>

          <div className="lg:col-span-7">
            {menu.map((c) => (
              <div key={c.id} role="tabpanel" id={`panel-${c.id}`} aria-labelledby={`tab-${c.id}`} hidden={c.id !== active}>
                {c.groups.some((g) => g.items.some((i) => i.photo)) && (
                  <p className="eyebrow mb-6 flex items-center gap-2 text-[11px] font-normal text-muted">
                    <CameraIcon /> Tap a dish with the camera to see its photo
                  </p>
                )}
                {c.groups.map((g) => (
                  <div key={g.title} className="mb-10 last:mb-0">
                    <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                      <h3 className="font-serif text-3xl italic text-white">{g.title}</h3>
                      {g.note && <span className="eyebrow text-right text-[10px] text-leaf">{g.note}</span>}
                    </div>
                    <ul className="divide-y divide-white/[0.06]">
                      {g.items.map((item) => (
                        <li key={item.name}>
                          {item.photo ? (
                            <button type="button" className="dish-btn w-full cursor-pointer py-2 text-left" aria-pressed={dish === item.name} onClick={() => showDish(item)}>
                              <Row item={item} />
                            </button>
                          ) : (
                            <div className="py-2"><Row item={item} /></div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <p className="eyebrow text-leaf">Seen on the table</p>
            <p className="text-xs font-light text-muted">Guest photos from Google Maps</p>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {seenOnTheTable.map((d) => (
              <li key={d.name}>
                <figure className="group">
                  <div className="mb-3 aspect-[4/5] overflow-hidden rounded-sm bg-night">
                    <Photo id={d.photo} alt={d.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 22vw, 50vw" />
                  </div>
                  <figcaption className="text-sm leading-tight text-white">{d.name}<Price value={d.price} className="mt-1 block text-sm" /></figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-14 border-t border-line pt-6 text-center text-xs italic text-muted">Menu from the restaurant’s printed card; prices may change.</p>
        </div>
      </div>
    </section>
  )
}

function Row({ item }: { item: MenuItem }) {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="dish-name text-[15px] font-medium text-white transition-colors">
          {item.name}
          {item.photo && <CameraIcon className="ml-2 -mt-0.5" />}
          {item.tag && <span className="ml-2 rounded-sm bg-leaf px-1.5 py-0.5 align-middle text-[9px] uppercase tracking-[0.22em] text-night">{item.tag}</span>}
        </span>
        <span aria-hidden className="leader" />
        <Price value={item.price} className="text-[15px]" />
      </div>
      {item.description && <p className="mt-1 text-xs font-light text-muted">{item.description}</p>}
    </>
  )
}
