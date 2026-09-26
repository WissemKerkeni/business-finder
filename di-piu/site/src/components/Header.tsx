import { useEffect, useState } from 'react'
import { restaurant as r } from '../data/restaurant'

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#piatti', label: 'I piatti' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav aria-label="Main" className="relative z-30 flex w-full shrink-0 items-center justify-between border-b border-line bg-night/40 px-5 py-3.5 backdrop-blur-sm md:px-12 md:py-4 lg:bg-transparent lg:backdrop-blur-none">
        <a href="#top" className="flex flex-col" aria-label={`${r.name}, back to top`}>
          <span className="font-serif text-2xl md:text-3xl font-light italic leading-tight text-white">{r.name}</span>
          <span className="-mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-leaf">Ristorante</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 eyebrow font-normal text-muted">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="transition-colors hover:text-white">{l.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center">
          <a href={`tel:${r.phoneE164}`} className="hidden sm:inline-block rounded-sm border border-white/40 px-4 py-2 text-xs font-medium tracking-wider text-white transition-colors hover:border-white">
            {r.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden -mr-2 ml-3 flex h-11 w-11 flex-col items-center justify-center gap-1.5"
          >
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-4 self-end mr-2.5 bg-leaf" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-night/95 px-6 pt-5 pb-10 backdrop-blur-md transition-opacity duration-300 md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl italic text-white">{r.name}</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 h-11 w-11 text-3xl leading-none text-white" tabIndex={open ? 0 : -1}>
            &times;
          </button>
        </div>
        <ul className="mt-12 flex flex-col gap-5 font-serif text-4xl text-white">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</a></li>
          ))}
        </ul>
        <div className="mt-auto space-y-1 border-t border-line pt-6 text-sm">
          <p className="eyebrow text-[10px] text-leaf">Open daily 12:00 – 00:00</p>
          <a href={`tel:${r.phoneE164}`} className="block text-lg text-white" tabIndex={open ? 0 : -1}>{r.phone}</a>
          <p className="text-muted">{r.plusCode} {r.address.postalCode}</p>
        </div>
      </div>
    </>
  )
}
