import { useEffect, useRef, useState } from 'react'
import { business as b, wa } from '../data/business'
import { Plate, WaIcon, btn } from './ui'

export const navLinks = [
  { href: '#service', label: 'Le service' },
  { href: '#demande', label: 'Votre demande' },
  { href: '#voitures', label: 'Export pour la Tunisie' },
  { href: '#videos', label: 'Vidéos' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]

/** Fixed header (64px on phones, 80px on desktop) and the ☰ drawer (below xl, where the links don't fit). */
export default function Header() {
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus() }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8 lg:h-20 lg:px-12">
          <a href="#top" aria-label={`${b.name}, retour en haut`}><Plate /></a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-8 font-mono text-[12px] uppercase tracking-[0.12em] xl:flex">
            {navLinks.map((l) => <a key={l.href} href={l.href} className="text-dim transition-colors hover:text-white">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${b.phone}`} className={`${btn.red} !px-3 !py-2.5 sm:!px-4`}>
              <WaIcon /><span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
            >
              <span className="block h-0.5 w-6 bg-chalk" />
              <span className="block h-0.5 w-6 bg-chalk" />
              <span className="mr-2 block h-0.5 w-4 self-end bg-signal" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-raised px-6 pt-5 pb-10 transition-opacity duration-300 xl:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between">
          <Plate className="text-sm" />
          <button ref={closeBtn} type="button" onClick={() => { setOpen(false); menuBtn.current?.focus() }} aria-label="Fermer le menu" className="-mr-2 h-11 w-11 text-3xl leading-none" tabIndex={open ? 0 : -1}>&times;</button>
        </div>
        <ul className="mt-10 flex flex-col font-head text-2xl font-bold uppercase">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-line py-3">
              <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} mt-8`} tabIndex={open ? 0 : -1}><WaIcon />WhatsApp {b.phone}</a>
        <div className="mt-auto space-y-2 pt-8 font-mono text-xs text-dim">
          <p className="text-signal-text">{b.hoursShort}</p>
          <p>{b.address.street}, {b.address.postalCode} {b.address.locality}</p>
        </div>
      </div>
    </>
  )
}
