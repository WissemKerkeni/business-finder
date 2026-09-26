import { useEffect, useState } from 'react'
import { restaurant as r } from '../data/restaurant'

const links = [
  ['#about', 'About'],
  ['#signatures', 'Signatures'],
  ['#menu', 'Menu'],
  ['#gallery', 'Gallery'],
  ['#reviews', 'Reviews'],
  ['#visit', 'Visit'],
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-sage/20 bg-pine-dark/95 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-12">
        <a href="#top" className="font-label text-lg font-medium tracking-[0.35em] text-neon" aria-label={`${r.name}, back to top`}>
          CUCINA
        </a>
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="eyebrow text-neon/80 transition-colors hover:text-neon">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`tel:${r.phoneE164}`}
          className="eyebrow hidden rounded border border-sage/40 px-4 py-2 text-neon transition-colors hover:bg-sage/10 lg:inline-block"
        >
          {r.phone}
        </a>
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-px w-6 bg-neon transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-neon transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </nav>
      <ul id="mobile-nav" hidden={!open} className="border-t border-sage/20 px-5 pb-6 lg:hidden">
        {links.map(([href, label]) => (
          <li key={href} className="border-b border-sage/15">
            <a href={href} onClick={() => setOpen(false)} className="eyebrow block py-4 text-neon">
              {label}
            </a>
          </li>
        ))}
        <li>
          <a href={`tel:${r.phoneE164}`} className="eyebrow mt-5 block rounded bg-neon py-4 text-center text-pine-dark">
            Call {r.phone}
          </a>
        </li>
      </ul>
    </header>
  )
}
