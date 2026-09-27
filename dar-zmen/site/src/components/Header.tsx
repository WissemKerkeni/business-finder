import { useEffect, useState } from 'react'
import { restaurant as r } from '../data/restaurant'

export const navLinks = [
  { href: '#house', label: 'The house' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

/** Fixed header: transparent over the hero, solid ink once the hero scrolls away. */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight - 100)
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
        aria-label="Main"
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 text-white transition-colors duration-300 md:px-14 md:py-5 ${solid ? 'bg-ink' : 'bg-gradient-to-b from-black/70 to-transparent'}`}
      >
        <a href="#top" className="flex items-baseline gap-3" aria-label={`${r.name}, back to top`}>
          <span className="font-serif text-2xl md:text-3xl">{r.name}</span>
          <span lang="ar" className="font-arabic text-base text-sandstone md:text-lg">{r.nameAr}</span>
        </a>
        <ul className="eyebrow hidden items-center gap-8 text-white/85 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="transition-colors hover:text-sandstone">{l.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center">
          <a href={`tel:${r.phoneE164}`} className="eyebrow hidden bg-cobalt px-5 py-3 text-white transition-colors hover:bg-cobalt-dark sm:inline-block">
            Call {r.phone.replace('+216 ', '')}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 ml-3 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-6 bg-white" />
            <span className="mr-2.5 block h-px w-4 self-end bg-sandstone" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-ink px-6 pt-5 pb-10 text-white transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl">{r.name} <span lang="ar" className="font-arabic text-lg text-sandstone">{r.nameAr}</span></span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="-mr-2 h-11 w-11 text-3xl leading-none" tabIndex={open ? 0 : -1}>
            &times;
          </button>
        </div>
        <ul className="mt-12 flex flex-col gap-5 font-serif text-4xl">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</a></li>
          ))}
        </ul>
        <div className="mt-auto space-y-2 border-t border-white/15 pt-6 font-mono text-xs uppercase tracking-widest text-white/70">
          <p className="text-sandstone">Open 24/24</p>
          <a href={`tel:${r.phoneE164}`} className="block text-base text-white" tabIndex={open ? 0 : -1}>{r.phone}</a>
          <p>{r.plusCode}</p>
        </div>
      </div>
    </>
  )
}
