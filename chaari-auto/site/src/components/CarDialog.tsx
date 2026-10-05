import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { business as b, carAlts, carPhoto, carTitle, photoSrc, specSheet, waCar, type Car } from '../data/business'
import { useCopy } from '../data/copy'
import { useLang } from '../i18n'
import { WaIcon, btn } from './ui'

/** Car panel (fits the viewport on desktop: the photo flexes, the spec column scrolls if needed): keyboard-accessible dialog (focus trap, Esc, arrows), photo carousel with swipe, thumbnails and counter,
 *  the stated spec table and WhatsApp / Call. Read-only: no availability wording, no price. */
export default function CarDialog({ car, onClose }: { car: Car | null; onClose: () => void }) {
  const lang = useLang()
  const t = useCopy().cars
  const [idx, setIdx] = useState(0)
  const panel = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lastFocus = useRef<Element | null>(null)
  const x0 = useRef<number | null>(null)
  const n = car?.photos ?? 1
  const go = (i: number) => setIdx(((i % n) + n) % n)

  useEffect(() => {
    if (!car) return
    setIdx(0)
    lastFocus.current = document.activeElement
    document.body.style.overflow = 'hidden'
    titleRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus()
    }
  }, [car])

  if (!car) return null

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose() }
    else if (e.key === 'ArrowLeft') go(idx - 1)
    else if (e.key === 'ArrowRight') go(idx + 1)
    else if (e.key === 'Tab' && panel.current) {
      const f = [...panel.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex="-1"]')].filter((el) => el.offsetParent !== null)
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }
  const ids = Array.from({ length: n }, (_, i) => carPhoto(car, i + 1))

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="cd-title" onKeyDown={onKey}>
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />
      <div ref={panel} className="absolute inset-0 overflow-y-auto border border-line bg-raised lg:inset-x-10 lg:inset-y-8 lg:flex lg:flex-col lg:overflow-hidden xl:inset-x-20">
        <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line bg-raised/95 px-4 backdrop-blur lg:px-8">
          <p className="eyebrow text-signal-text">{t.detail}</p>
          <button type="button" onClick={onClose} aria-label={t.close} className="px-2 text-2xl leading-none">✕</button>
        </div>
        <div className="grid gap-8 p-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[1.55fr_1fr] lg:grid-rows-[minmax(0,1fr)] lg:gap-12 lg:p-8">
          <div className="lg:flex lg:min-h-0 lg:flex-col">
            <div
              className="relative aspect-[4/3] select-none overflow-hidden bg-black lg:aspect-auto lg:min-h-0 lg:flex-1"
              onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                if (x0.current === null) return
                const dx = e.changedTouches[0].clientX - x0.current
                if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1))
                x0.current = null
              }}
            >
              <img src={photoSrc(ids[idx], 1600)} alt={carAlts(car, lang)[idx]} className="h-full w-full object-contain" />
              {n > 1 && <>
              <button type="button" onClick={() => go(idx - 1)} aria-label={t.prev} className="absolute top-1/2 left-2 h-11 w-11 -translate-y-1/2 border border-line bg-black/70 text-xl text-white hover:bg-black">‹</button>
              <button type="button" onClick={() => go(idx + 1)} aria-label={t.next} className="absolute top-1/2 right-2 h-11 w-11 -translate-y-1/2 border border-line bg-black/70 text-xl text-white hover:bg-black">›</button>
              <p className="absolute right-3 bottom-3 bg-black/75 px-2.5 py-1 font-mono text-xs text-white" aria-live="polite">{idx + 1} / {n}</p>
              </>}
            </div>
            {n > 1 && <div className="mt-3 grid shrink-0 grid-cols-6 gap-2">
              {ids.map((id, k) => (
                <button key={id} type="button" onClick={() => go(k)} aria-label={`${t.photo} ${k + 1}`} aria-current={k === idx} className={`aspect-[4/3] overflow-hidden bg-black lg:aspect-auto lg:h-[clamp(56px,11vh,110px)] ${k === idx ? 'outline-2 outline-signal-text' : ''}`}>
                  <img src={photoSrc(id, 640)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>}
          </div>
          <div className="lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            {car.kind === 'client' && <p className="mb-3"><span className="bg-signal px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">{t.client}</span></p>}
            <h2 id="cd-title" ref={titleRef} tabIndex={-1} className="mb-6 font-head text-3xl font-bold uppercase leading-[0.95] focus:outline-none lg:text-5xl">{carTitle(car)}</h2>
            <dl className="mb-7 border-t border-line">
              {specSheet(car, lang).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 border-b border-line py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-mute">{k}</dt>
                  <dd className="text-right font-mono text-sm">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mb-6 flex flex-wrap gap-3">
              <a href={waCar(car, lang)} target="_blank" rel="noopener noreferrer" className={btn.red}><WaIcon />WhatsApp</a>
              <a href={`tel:${b.phoneE164}`} className={btn.outline}>{t.call}</a>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-mute">
              {car.kind === 'owner'
                ? t.fromOwner
                : car.kind === 'maps'
                ? <>{t.fromMaps[0]}<a href={car.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{t.fromMaps[1]}</a>{t.fromMaps[2]}</>
                : <>{t.fromPost(car.source)[0]}<a href={car.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{t.fromPost(car.source)[1]}</a>{t.fromPost(car.source)[2]}</>}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
