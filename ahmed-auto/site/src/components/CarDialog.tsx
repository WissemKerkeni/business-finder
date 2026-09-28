import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { carAlt, carPhoto, dealer as d, displayModel, frDate, photoSrc, specSheet, waCar, type Car } from '../data/dealer'
import { WaIcon, btn } from './ui'

/** Car sheet: keyboard-accessible dialog (focus trap, Esc, arrows), photo carousel with swipe and counter, spec table. */
export default function CarDialog({ car, onClose }: { car: Car | null; onClose: () => void }) {
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
  const photoIds = Array.from({ length: n }, (_, i) => carPhoto(car, i + 1))

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-labelledby="cd-title" onKeyDown={onKey}>
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div ref={panel} className="absolute inset-0 overflow-y-auto border border-white/10 bg-graphite lg:inset-x-8 lg:inset-y-6 xl:inset-x-16">
        <div className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-white/10 bg-graphite/95 px-4 backdrop-blur lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">Fiche véhicule</p>
          <button type="button" onClick={onClose} aria-label="Fermer la fiche" className="px-2 text-2xl leading-none">✕</button>
        </div>
        <div className="grid gap-8 p-4 lg:grid-cols-[1.5fr_1fr] lg:gap-12 lg:p-8">
          <div>
            <div
              className="relative aspect-[4/3] select-none overflow-hidden bg-black"
              onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
              onTouchEnd={(e) => {
                if (x0.current === null) return
                const dx = e.changedTouches[0].clientX - x0.current
                if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1))
                x0.current = null
              }}
            >
              <img src={photoSrc(photoIds[idx], 1600)} alt={carAlt(car, idx + 1)} className="h-full w-full object-contain" />
              <button type="button" onClick={() => go(idx - 1)} aria-label="Photo précédente" className="absolute top-1/2 left-2 h-11 w-11 -translate-y-1/2 bg-black/70 text-xl text-white hover:bg-black">‹</button>
              <button type="button" onClick={() => go(idx + 1)} aria-label="Photo suivante" className="absolute top-1/2 right-2 h-11 w-11 -translate-y-1/2 bg-black/70 text-xl text-white hover:bg-black">›</button>
              <p className="absolute right-3 bottom-3 bg-black/75 px-2.5 py-1 font-mono text-xs text-white" aria-live="polite">{idx + 1} / {n}</p>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {photoIds.map((id, k) => (
                <button key={id} type="button" onClick={() => go(k)} aria-label={`Photo ${k + 1}`} aria-current={k === idx} className={`aspect-[4/3] overflow-hidden bg-black ${k === idx ? 'outline-2 outline-signal' : ''}`}>
                  <img src={photoSrc(id, 640)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-signal-text">Publié le {frDate(car.date)}</p>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">{car.make}</p>
            <h2 id="cd-title" ref={titleRef} tabIndex={-1} className="mb-2 font-wide text-3xl font-extrabold leading-[0.95] tracking-tight focus:outline-none lg:text-4xl">{displayModel(car.model)}</h2>
            <p className="mb-6 text-neutral-300">{car.version}{car.colour ? ` · ${car.colour}` : ''}</p>
            <dl className="mb-6 border-t border-white/10">
              {specSheet(car).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 border-b border-white/10 py-2.5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">{k}</dt>
                  <dd className="text-right font-mono text-sm text-neutral-100">{v}</dd>
                </div>
              ))}
            </dl>
            {car.options.length > 0 && (
              <>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400">Équipements indiqués par le vendeur</p>
                <ul className="mb-6 space-y-2 text-sm text-neutral-200">
                  {car.options.map((o) => <li key={o} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />{o}</li>)}
                </ul>
              </>
            )}
            <p className="mb-5 font-mono text-lg font-bold text-signal-text">Prix sur demande</p>
            <div className="mb-5 flex flex-wrap gap-3">
              <a href={waCar(car)} target="_blank" rel="noopener noreferrer" className={btn.red}><WaIcon />WhatsApp</a>
              <a href={`tel:${d.phoneE164}`} className={btn.outline}>Appeler {d.phone}</a>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-neutral-500">
              Informations tirées de l’annonce publiée par AHMED AUTO sur {car.source} (<a href={car.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-300">voir la publication</a>). Disponibilité à confirmer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
