import { useEffect, useState, type ReactNode } from 'react'
import { business as b, cta, faq, legal, reviews, TODO, wa } from '../data/business'
import { Photo, Plate, SectionTitle, Stars, WaIcon, Wrap, btn, rd } from './ui'

/** "Pour qui", as in the Stitch design: text on the left, the photo framed on the right inside the container
 *  (same margin on both sides). The photo is the real GLE 53 AMG with the CHAARI AUTO plate. */
export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow="Pour qui" id="audience-title" className="mb-8">Pour les {b.audience}</SectionTitle>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-chalk-2" data-reveal style={rd(1)}>
            Export de voitures de l’Europe vers {b.destinations} : Chaari Auto s’occupe de l’achat de votre voiture, du dossier d’exportation, de la carte grise et de l’assurance, et gère tout jusqu’à la livraison.
          </p>
          <a href="#demande" className={btn.outline} data-reveal style={rd(2)}>Décrire la voiture que je cherche</a>
        </div>
        <figure className="relative aspect-[4/5] overflow-hidden bg-raised sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-[640px] lg:w-full" data-reveal style={rd(1)}>
          <Photo id="mercedes-gle53-2026-1" alt="Mercedes GLE 53 AMG noir vu de face, avec la plaque CHAARI AUTO" sizes="(min-width: 1024px) 45vw, 100vw" className="parallax h-full w-full object-cover object-[50%_50%]" />
          <figcaption className="absolute bottom-4 left-4 bg-black/70 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white">Mercedes GLE 53 AMG · publié le 12/02/2026</figcaption>
        </figure>
      </Wrap>
    </section>
  )
}

export function Testimonials() {
  const rating = b.rating.value.toFixed(1).replace('.', ',')
  return (
    <section id="avis" aria-labelledby="avis-title" className="border-b border-line bg-raised py-20 lg:py-28">
      <Wrap>
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-end">
          <SectionTitle eyebrow="Google" id="avis-title">Avis clients</SectionTitle>
          <a href={b.reviewsUrl} target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-3 hover:opacity-90">
            <span className="font-head text-7xl font-bold leading-none">{rating}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-dim"><span className="text-signal-text">★</span> {b.rating.count} avis Google</span>
          </a>
        </div>
        <div className="grid lg:grid-cols-4">
          {reviews.map((r, i) => (
            <figure key={r.author} data-reveal style={rd(i, 120)} className="flex flex-col border-b border-line py-8 lg:border-b-0 lg:border-l lg:px-8 lg:py-0 lg:first:border-l-0 lg:first:pl-0">
              <blockquote className="mb-6 flex-1 text-lg leading-relaxed text-[#E6E6E2]">« {r.text} »</blockquote>
              <figcaption className="border-t border-line pt-4">
                <p className="font-mono text-xs font-bold uppercase tracking-wider">{r.author}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute"><Stars /> Avis Google</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <a href={b.reviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block font-mono text-xs uppercase tracking-[0.12em] text-[#D6D6D2] hover:text-signal-text">Tous les avis sur Google →</a>
      </Wrap>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <SectionTitle eyebrow="FAQ" id="faq-title">Questions fréquentes</SectionTitle>
        <div className="border-t border-line" data-reveal>
          {faq.map((f, i) => (
            <details key={f.q} className="group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-head text-xl font-bold uppercase lg:text-2xl">
                {f.q}<span className="font-mono text-xl text-signal-text transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-chalk-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

export function Contact() {
  // Click-to-load map: nothing is requested from Google until the visitor asks for the map.
  const [map, setMap] = useState(false)
  const rows: [string, ReactNode][] = [
    ['WhatsApp', <a href={wa()} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">{b.phone}</a>],
    ['Téléphone', <a href={`tel:${b.phoneE164}`} className="hover:text-signal-text">{b.phone}</a>],
    ['E-mail', <a href={`mailto:${b.email}`} className="break-all hover:text-signal-text">{b.email}</a>],
    ['Adresse', <>{b.address.street}, {b.address.postalCode} {b.address.locality}, {b.address.countryName}</>],
    ['Horaires', <>{b.hours.map((h) => <span key={h.days} className="block">{h.days} · {h.time}</span>)}</>],
    ['Réseaux', <>
      <a href={b.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">Facebook</a> · <a href={b.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">Instagram</a> · <a href={b.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-signal-text">TikTok</a>
    </>],
  ]
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle eyebrow="Contact" id="contact-title" className="mb-8">Nous contacter</SectionTitle>
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
              <iframe title={`Carte : ${b.name}, ${b.address.street}, ${b.address.locality}`} src={b.mapsEmbedUrl} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="h-4 w-4 bg-signal outline outline-4 outline-signal/25" aria-hidden />
                <p className="font-mono text-xs uppercase tracking-wider">{b.address.street} · {b.address.postalCode} {b.address.locality}</p>
                <p className="font-mono text-[11px] text-mute">{b.geo.lat}° N, {b.geo.lng}° E</p>
                <button type="button" onClick={() => setMap(true)} className={`${btn.outline} mt-2`}>Afficher la carte (Google Maps)</button>
                <p className="max-w-xs text-xs text-mute">La carte est chargée depuis Google seulement si vous cliquez.</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={b.directionsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>Itinéraire</a>
            <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className={btn.outline}>Ouvrir dans Google Maps</a>
          </div>
        </div>
      </Wrap>
    </section>
  )
}

export function Cta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-b border-line">
      <Photo id={cta.id} alt={cta.alt} className="parallax absolute inset-0 h-full w-full object-cover object-[30%_55%]" />
      <div className="absolute inset-0 bg-ink/75" />
      <Wrap className="relative flex flex-col items-center py-24 text-center lg:py-36">
        <span aria-hidden className="mb-8" data-reveal><Plate /></span>
        <h2 id="cta-title" data-reveal style={rd(1)} className="mb-10 max-w-4xl font-head text-5xl font-bold uppercase leading-[0.92] sm:text-6xl lg:text-8xl">Votre prochaine voiture, depuis l’Europe</h2>
        <div className="flex flex-wrap justify-center gap-3" data-reveal style={rd(2)}>
          <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn.red} btn-shine`}><WaIcon />WhatsApp</a>
          <a href={`tel:${b.phoneE164}`} className={`${btn.outline} bg-black/30`}>Appeler {b.phone}</a>
        </div>
      </Wrap>
    </section>
  )
}

const Todo = ({ v }: { v: string }) => (v === TODO ? <span className="text-[#FFB020]">[{TODO}]</span> : <>{v}</>)

/** Impressum and Datenschutz (the business is in Germany). Unknown details stay as visible placeholders: never invented. */
export function Legal() {
  return (
    <section id="mentions-legales" aria-labelledby="legal-title" className="border-b border-line bg-ink py-16 lg:py-20">
      <Wrap className="grid gap-10 text-sm leading-relaxed text-dim lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="legal-title" className="mb-4 font-head text-2xl font-bold uppercase text-chalk">Mentions légales / Impressum</h2>
          <p className="mb-3"><strong className="text-[#D6D6D2]">Angaben gemäß § 5 DDG</strong><br />{b.name} · Forme juridique / Rechtsform : <Todo v={legal.legalForm} /><br />{b.address.street}, {b.address.postalCode} {b.address.locality}, Deutschland</p>
          <p className="mb-3">Vertreten durch / Représenté par : <Todo v={legal.representedBy} /><br />Telefon : {b.phone} · E-Mail : {b.email}</p>
          <p className="mb-3">Registereintrag / Registre : <Todo v={legal.register} /><br />USt-IdNr. : <Todo v={legal.vatId} /></p>
          <p>Verantwortlich für den Inhalt : <Todo v={legal.responsible} /></p>
        </div>
        <div>
          <h2 id="datenschutz" className="mb-4 font-head text-2xl font-bold uppercase text-chalk">Datenschutz</h2>
          <p className="mb-3">Responsable / Verantwortlicher : <Todo v={legal.responsible} />, {b.address.street}, {b.address.postalCode} {b.address.locality}, {b.email}.</p>
          <p className="mb-3">Ce site n’utilise ni cookies ni outil de mesure d’audience. Les polices, les photos et les vidéos sont hébergées sur ce site. Le formulaire « Votre demande » n’envoie rien à ce site : il ouvre WhatsApp avec votre message, que vous choisissez d’envoyer ou non (WhatsApp Ireland Ltd.).</p>
          <p className="mb-3">La carte Google Maps n’est chargée qu’après votre clic (Google Ireland Ltd.).</p>
          <p>Hébergement : <Todo v={legal.hosting} />. Durée de conservation et droits des personnes : <Todo v={legal.retention} /></p>
        </div>
      </Wrap>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink pt-12 pb-12">
      <Wrap className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href="#top" className="self-start" aria-label={`${b.name}, retour en haut`}><Plate className="text-sm" /></a>
          <p className="text-sm text-dim">Export de voitures de l’Europe vers {b.destinations}</p>
        </div>
        <nav aria-label="Liens du pied de page" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
          <a href="#mentions-legales" className="hover:text-white">Mentions légales / Impressum</a>
          <a href="#datenschutz" className="hover:text-white">Datenschutz</a>
          <a href={b.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
          <a href={b.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          <a href={b.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
        </nav>
        <p className="font-mono text-[11px] text-mute">© 2026 {b.name}</p>
      </Wrap>
    </footer>
  )
}

/** Fixed WhatsApp · Call bar on phones, shown once the hero has scrolled away. */
export function ActionBar() {
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
    <nav aria-label="Actions rapides" className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-line bg-raised pb-[env(safe-area-inset-bottom)] font-mono text-xs font-bold uppercase tracking-[0.12em] transition-transform lg:hidden ${show ? '' : 'translate-y-full'}`}>
      <a href={wa()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-signal py-4 text-white" tabIndex={show ? 0 : -1}><WaIcon />WhatsApp</a>
      <a href={`tel:${b.phoneE164}`} className="py-4 text-center" tabIndex={show ? 0 : -1}>Appeler</a>
    </nav>
  )
}
