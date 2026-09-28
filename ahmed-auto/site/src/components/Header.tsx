import { useEffect, useState } from 'react'
import { dealer as d, wa } from '../data/dealer'
import { WaIcon, Wordmark, btn } from './ui'

export const navLinks = [
  { href: '#vehicules', label: 'Véhicules' },
  { href: '#acheter', label: 'Comment acheter' },
  { href: '#showroom', label: 'Showroom' },
  { href: '#avis', label: 'Avis' },
  { href: '#acces', label: 'Accès' },
]

/** Fixed header (64px on phones, 80px on desktop) and the phone drawer. */
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-8 lg:h-20 lg:gap-6 lg:px-12">
          <a href="#top" aria-label={`${d.name}, retour en haut`}><Wordmark /></a>
          <nav aria-label="Navigation principale" className="hidden items-center gap-9 text-sm text-neutral-300 lg:flex">
            {navLinks.map((l) => <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">
            <a href={`tel:${d.phoneE164}`} className="hidden font-mono text-sm tracking-wider hover:text-signal-text sm:inline">{d.phone}</a>
            <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`${btn.red} !px-3 !py-2.5 sm:!px-4`}>
              <WaIcon /><span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
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
        className={`fixed inset-0 z-[60] flex flex-col bg-graphite px-6 pt-5 pb-10 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between">
          <Wordmark className="text-lg" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="-mr-2 h-11 w-11 text-3xl leading-none" tabIndex={open ? 0 : -1}>&times;</button>
        </div>
        <ul className="mt-10 flex flex-col font-wide text-2xl font-extrabold uppercase">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-white/10 py-3">
              <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-2 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-widest text-chalk-dim">
          <p className="text-signal-text">{d.hoursText}</p>
          <p>{d.address.street}, {d.address.locality}</p>
          <a href={`tel:${d.phoneE164}`} className="block text-base text-chalk" tabIndex={open ? 0 : -1}>{d.phone}</a>
          <a href={`tel:${d.phone2E164}`} className="block text-base text-chalk" tabIndex={open ? 0 : -1}>{d.phone2}</a>
        </div>
      </div>
    </>
  )
}
