import { useEffect, useState } from 'react'
import { agency as a, wa } from '../data/agency'
import { WaIcon, Wordmark, btn } from './ui'

export const navLinks = [
  { href: '#flotte', label: 'Flotte' },
  { href: '#reserver', label: 'Réserver' },
  { href: '#livraison', label: 'Livraison' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]

/** Fixed header: translucent over the hero, solid asphalt once the hero scrolls away. */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 120)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav
        aria-label="Navigation principale"
        className={`fixed inset-x-0 top-0 z-50 border-b border-line/70 backdrop-blur-md transition-colors duration-300 ${solid ? 'bg-asphalt' : 'bg-asphalt/40'}`}
      >
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 py-3 sm:px-8">
          <a href="#top" aria-label={`${a.name}, retour en haut`}><Wordmark /></a>
          <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="transition-colors hover:text-swoosh-text">{l.label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-4 lg:gap-6">
            <a href={`tel:${a.phoneE164}`} className="hidden font-mono text-sm tracking-wider hover:text-swoosh-text sm:inline">{a.phone}</a>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} px-4 py-2.5`}><WaIcon />WhatsApp</a>
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
              <span className="mr-2 block h-0.5 w-4 self-end bg-swoosh" />
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-asphalt px-6 pt-5 pb-10 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between">
          <Wordmark small />
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="-mr-2 h-11 w-11 text-3xl leading-none" tabIndex={open ? 0 : -1}>&times;</button>
        </div>
        <ul className="mt-10 flex flex-col font-cond text-4xl font-black uppercase">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-line py-3">
              <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-2 border-t border-line pt-6 font-mono text-xs uppercase tracking-widest text-chalk-dim">
          <p className="text-swoosh-text">{a.hoursText}</p>
          <p>{a.address.street}, {a.address.locality}</p>
          <a href={`tel:${a.phoneE164}`} className="block text-base text-chalk" tabIndex={open ? 0 : -1}>{a.phone}</a>
          <a href={`tel:${a.phone2E164}`} className="block text-base text-chalk" tabIndex={open ? 0 : -1}>{a.phone2}</a>
        </div>
      </div>
    </>
  )
}
