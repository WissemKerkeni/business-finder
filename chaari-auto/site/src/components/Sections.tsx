import { useEffect, useState, type ReactNode } from 'react'
import { business as b, cta, faq, legal, reviews, services, wa } from '../data/business'
import { useCopy } from '../data/copy'
import { fmtRating, useLang } from '../i18n'
import { LangSwitch } from './Header'
import { LogoLockup, Photo, SectionTitle, Stars, WaIcon, Wrap, btn, rd } from './ui'

/** "Nos services": the three lines of business on the left, the photo framed on the right inside the container
 *  (same margin on both sides). The photo is the real GLE 53 AMG with the CHAARI AUTO plate. */
export function Services() {
  const lang = useLang()
  const t = useCopy().services
  return (
    <section id="services" aria-labelledby="services-title" className="border-b border-line bg-ink py-12 md:py-16 lg:py-28">
      <Wrap className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow={t.eyebrow} id="services-title" className="mb-6">{t.title}</SectionTitle>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-chalk-2" data-reveal style={rd(1)}>{t.lead}</p>
          <ol className="mb-8 border-t border-line">
            {services.map((s, i) => (
              <li key={s.key} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5" data-reveal style={rd(i + 1)}>
                <span className="pt-1 font-mono text-sm font-bold text-signal-text">0{i + 1}</span>
                <div>
                  <h3 className="mb-1.5 font-head text-2xl font-bold uppercase leading-tight">{s.title[lang]}</h3>
                  <p className="leading-relaxed text-chalk-2">{s.text[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href="#demande" className={btn.outline} data-reveal style={rd(2)}>{t.cta}</a>
        </div>
        <figure className="relative aspect-[4/5] overflow-hidden bg-raised sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-[680px] lg:w-full" data-reveal style={rd(1)}>
          <Photo id="mercedes-gle53-2026-1" alt={t.photoAlt} sizes="(min-width: 1024px) 45vw, 100vw" className="parallax h-full w-full object-cover object-[50%_50%]" />
          <figcaption className="absolute bottom-4 left-4 bg-black/70 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white">{t.caption}</figcaption>
        </figure>
      </Wrap>
    </section>
  )
}

/** Google reviews, large and easy to read: the rating and the 12 years on top, four reviews in a 2×2 grid.
 *  English page: our translation, labelled as such (the originals are in French). */
export function Testimonials() {
  const lang = useLang()
  const t = useCopy()
  const rating = fmtRating(b.rating.value, lang)
  return (
    <section id="avis" aria-labelledby="avis-title" className="border-b border-line bg-raised py-12 md:py-16 lg:py-28">
      <Wrap>
        <div className="mb-2 flex flex-col justify-between gap-6 border-b border-line pb-6 lg:mb-4 lg:flex-row lg:items-end lg:pb-8">
          <SectionTitle eyebrow={t.reviews.eyebrow} id="avis-title">{t.reviews.title}</SectionTitle>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4 sm:gap-x-10">
            <a href={b.reviewsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-end gap-4">
              <span className="font-head text-6xl font-bold leading-[0.8] sm:text-7xl lg:text-8xl">{rating}</span>
              <span className="pb-1">
                <Stars className="block text-xl tracking-[0.08em] lg:text-2xl" />
                <span className="font-mono text-xs uppercase tracking-wider text-dim group-hover:text-white">{t.reviews.count(b.rating.count)}</span>
              </span>
            </a>
            <p className="flex items-end gap-3 border-l border-line pl-6 sm:pl-10">
              <span className="font-head text-6xl font-bold leading-[0.8] text-signal-text sm:text-7xl lg:text-8xl">{b.experienceYears}</span>
              <span className="max-w-[10rem] pb-1 font-mono text-xs uppercase leading-snug tracking-wider text-dim">{t.hero.years}</span>
            </p>
          </div>
        </div>
        <div className="grid gap-x-12 md:grid-cols-2">
          {reviews.map((r, i) => (
            <figure key={r.author} data-reveal style={rd(i % 2, 120)} className="flex flex-col border-b border-line py-6 lg:py-8 md:[&:nth-last-child(-n+2)]:border-b-0">
              <blockquote className="mb-4 flex-1 text-[17px] leading-[1.6] text-[#EDEDEA] sm:text-lg lg:text-xl lg:leading-[1.55]"><span aria-hidden className="mr-1 font-head text-[1.4em] leading-none text-signal-text">“</span>{r.text[lang]}</blockquote>
              <figcaption className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[13px] font-bold uppercase tracking-wider">{r.author}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-mute">
                  <Stars /> {t.reviews.google}{t.reviews.translated && <> · {t.reviews.translated}</>}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <a href={b.reviewsUrl} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine mt-6 lg:mt-10`}>{t.reviews.all} ({b.rating.count}) →</a>
      </Wrap>
    </section>
  )
}

export function Faq() {
  const lang = useLang()
  const t = useCopy().faq
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b border-line bg-ink py-12 md:py-16 lg:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <SectionTitle eyebrow={t.eyebrow} id="faq-title">{t.title}</SectionTitle>
        <div className="border-t border-line" data-reveal>
          {faq.map((f, i) => (
            <details key={f.q.fr} className="group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-head text-xl font-bold uppercase lg:text-2xl">
                {f.q[lang]}<span className="font-mono text-xl text-signal-text transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-chalk-2">{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

export function Contact() {
  const lang = useLang()
  const t = useCopy().contact
  // Click-to-load map: nothing is requested from Google until the visitor asks for the map.
  const [map, setMap] = useState(false)
  const rows: [string, ReactNode][] = [
    ['WhatsApp', <a href={wa()} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">{b.phone}</a>],
    [t.phone, <a href={`tel:${b.phoneE164}`} className="hover:text-signal-text">{b.phone}</a>],
    [t.email, <a href={`mailto:${b.email}`} className="break-all hover:text-signal-text">{b.email}</a>],
    [t.address, <>{b.address.street}, {b.address.postalCode} {b.address.locality}, {b.address.countryName[lang]} <span className="block text-dim">{b.region[lang]}</span></>],
    [t.hours, <>{b.hours.map((h) => <span key={h.days.fr} className="block">{h.days[lang]} · {h.time[lang]}</span>)}</>],
    [t.social, <>
      <a href={b.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">Facebook</a> · <a href={b.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">Instagram</a> · <a href={b.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">TikTok</a>
    </>],
  ]
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-b border-line bg-ink py-12 md:py-16 lg:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow={t.eyebrow} id="contact-title" className="mb-8">{t.title}</SectionTitle>
          <dl className="border-t border-line" data-reveal>
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-wider text-mute">{k}</dt>
                <dd className="font-mono text-sm leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col" data-reveal style={rd(2)}>
          <div className="relative min-h-[360px] flex-1 overflow-hidden border border-line bg-raised">
            {map ? (
              <iframe title={`${t.mapTitle} : ${b.name}, ${b.address.street}, ${b.address.locality}`} src={b.mapsEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="h-4 w-4 bg-signal outline outline-4 outline-signal/25" aria-hidden />
                <p className="font-mono text-xs uppercase tracking-wider">{b.address.street} · {b.address.postalCode} {b.address.locality}</p>
                <p className="font-mono text-[11px] text-mute">{b.geo.lat}° N, {b.geo.lng}° E</p>
                <button type="button" onClick={() => setMap(true)} className={`${btn.outline} mt-2`}>{t.showMap}</button>
                <p className="max-w-xs text-xs text-mute">{t.mapNote}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={b.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>{t.directions}</a>
            <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>{t.openMaps}</a>
          </div>
        </div>
      </Wrap>
    </section>
  )
}

export function Cta() {
  const lang = useLang()
  const t = useCopy().cta
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-b border-line">
      <Photo id={cta.id} alt={cta.alt[lang]} className="parallax absolute inset-0 h-full w-full object-cover object-[30%_55%]" />
      <div className="absolute inset-0 bg-ink/75" />
      <Wrap className="relative flex flex-col items-center py-16 text-center md:py-20 lg:py-32">
        <span aria-hidden className="mb-10" data-reveal><LogoLockup sizes="95px" className="text-[clamp(20px,7.6vw,30px)] sm:text-[36px]" /></span>
        <h2 id="cta-title" data-reveal style={rd(1)} className="mb-10 max-w-4xl font-head text-5xl font-bold uppercase leading-[0.92] sm:text-6xl lg:text-8xl">{t.title}</h2>
        <div className="flex flex-wrap justify-center gap-3" data-reveal style={rd(2)}>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine`}><WaIcon />WhatsApp</a>
          <a href={`tel:${b.phoneE164}`} className={`${btn.outline} bg-black/30`}>{t.call} {b.phone}</a>
        </div>
      </Wrap>
    </section>
  )
}

/** Impressum and Datenschutz (the business is in Germany): verified facts only, no placeholders. */
export function Legal() {
  const t = useCopy().legal
  const h3 = 'mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#D6D6D2]'
  return (
    <section id="mentions-legales" aria-labelledby="legal-title" className="border-b border-line bg-ink py-10 md:py-12 lg:py-20">
      <Wrap className="grid gap-10 text-sm leading-relaxed text-dim lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="legal-title" className="mb-5 font-head text-2xl font-bold uppercase text-chalk">{t.title}</h2>
          <p className="mb-4">
            <span className={`${h3} block`}>Angaben gemäß § 5 DDG</span>
            {b.name}<br />{b.address.street}<br />{b.address.postalCode} {b.address.locality}<br />Deutschland
          </p>
          <p>
            <span className={`${h3} block`}>{t.contact}</span>
            Telefon / WhatsApp : <a href={`tel:${b.phoneE164}`} className="hover:text-white">{b.phone}</a><br />
            E-Mail : <a href={`mailto:${b.email}`} className="hover:text-white">{b.email}</a>
          </p>
        </div>
        <div>
          <h2 id="datenschutz" className="mb-5 font-head text-2xl font-bold uppercase text-chalk">Datenschutz</h2>
          <p className="mb-3">
            <span className={`${h3} block`}>{t.controller}</span>
            {b.name}, {b.address.street}, {b.address.postalCode} {b.address.locality}, Deutschland · {b.email}
          </p>
          <p className="mb-3">{t.p1}</p>
          <p className="mb-3">{t.p2}</p>
          <p className="mb-3">{t.p3(legal.hosting)}</p>
          <p>{t.p4(b.email, legal.authority)}</p>
        </div>
      </Wrap>
    </section>
  )
}

export function Footer() {
  const c = useCopy()
  const t = c.footer
  return (
    <footer className="bg-ink pt-12 pb-12">
      <Wrap className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href="#top" className="self-start" aria-label={`${b.name}, ${c.nav.home}`}><LogoLockup className="text-[20px]" /></a>
          <p className="text-sm text-dim">{t.line}</p>
        </div>
        <nav aria-label={t.nav} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
          <a href="#mentions-legales" className="hover:text-white">{t.legal}</a>
          <a href="#datenschutz" className="hover:text-white">Datenschutz</a>
          <a href={b.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
          <a href={b.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          <a href={b.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
        </nav>
        <div className="flex items-center gap-4">
          <LangSwitch />
          <p className="font-mono text-[11px] text-mute">© 2026 {b.name}</p>
        </div>
      </Wrap>
    </footer>
  )
}

/** Fixed WhatsApp · Call bar on phones, shown once the hero has scrolled away. */
export function ActionBar() {
  const t = useCopy().bar
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    const on = () => setShow(!!hero && hero.getBoundingClientRect().bottom <= 0)
    on()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
  return (
    <nav aria-label={t.label} className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-line bg-raised pb-[env(safe-area-inset-bottom)] font-mono text-xs font-bold uppercase tracking-[0.12em] transition-transform lg:hidden ${show ? '' : 'translate-y-full'}`}>
      <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-signal py-4 text-white" tabIndex={show ? 0 : -1}><WaIcon />WhatsApp</a>
      <a href={`tel:${b.phoneE164}`} className="py-4 text-center" tabIndex={show ? 0 : -1}>{t.call}</a>
    </nav>
  )
}
