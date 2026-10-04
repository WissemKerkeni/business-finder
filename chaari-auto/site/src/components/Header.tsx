import { useEffect, useRef, useState } from 'react'
import { business as b, wa } from '../data/business'
import { useCopy } from '../data/copy'
import { homePath, langs, useLang } from '../i18n'
import { LogoLockup, WaIcon, btn } from './ui'

/** FR | EN: plain links to the other prerendered page (/ and /en/), so each language has its own URL for Google. */
export function LangSwitch({ className = '' }: { className?: string }) {
  const lang = useLang()
  const t = useCopy()
  return (
    <div className={`flex items-center rounded-[3px] border border-line font-mono text-[11px] font-bold uppercase tracking-[0.12em] ${className}`}>
      {langs.map((l) => l === lang
        ? <span key={l} aria-current="true" className="bg-chalk px-2.5 py-2 text-ink">{l}</span>
        : <a key={l} href={homePath(l)} hrefLang={l} lang={l} aria-label={t.switchTo} className="px-2.5 py-2 text-dim transition-colors hover:text-white">{l}</a>)}
    </div>
  )
}

/** Fixed header (72px on phones, 96px on desktop) with the logo lockup, and the ☰ drawer (below xl, where the links don't fit). */
export default function Header() {
  const lang = useLang()
  const t = useCopy()
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
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8 lg:h-24 lg:px-12">
          <a href="#top" aria-label={`${b.name}, ${t.nav.home}`} className="shrink-0"><LogoLockup priority sizes="(min-width: 1024px) 70px, 55px" className="text-[17px] sm:text-[20px] lg:text-[26px]" /></a>
          <nav aria-label={t.nav.main} className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.12em] xl:flex">
            {t.nav.links.map((l) => <a key={l.href} href={l.href} className="whitespace-nowrap text-dim transition-colors hover:text-white">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch className="hidden sm:flex" />
            <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${b.phone}`} className={`${btn.red} !px-3 !py-2.5 sm:!px-4`}>
              <WaIcon /><span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.open}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
            >
              <span className="block h-0.5 w-6 bg-chalk" />
              <span className="block h-0.5 w-6 bg-chalk" />
              <span className="mr-2 block h-0.5 w-4 self-end bg-signal-text" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-raised px-6 pt-5 pb-10 transition-opacity duration-300 xl:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <LogoLockup sizes="55px" className="text-[17px]" />
          <button ref={closeBtn} type="button" onClick={() => { setOpen(false); menuBtn.current?.focus() }} aria-label={t.nav.close} className="-mr-2 h-11 w-11 text-3xl leading-none" tabIndex={open ? 0 : -1}>&times;</button>
        </div>
        <ul className="mt-10 flex flex-col font-head text-2xl font-bold uppercase">
          {t.nav.drawer.map((l) => (
            <li key={l.href} className="border-b border-line py-3">
              <a href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={btn.red} tabIndex={open ? 0 : -1}><WaIcon />WhatsApp {b.phone}</a>
          <LangSwitch />
        </div>
        <div className="mt-auto space-y-2 pt-8 font-mono text-xs text-dim">
          <p className="text-signal-text">{b.hoursShort[lang]}</p>
          <p>{b.address.street}, {b.address.postalCode} {b.address.locality}</p>
        </div>
      </div>
    </>
  )
}
