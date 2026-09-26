import { Eyebrow, Photo } from './ui'
import { restaurant as r } from '../data/restaurant'

const actions = [
  { label: 'Call', detail: r.phone, href: `tel:${r.phoneE164}` },
  { label: 'WhatsApp', detail: '50 074 004', href: r.whatsapp, external: true },
  { label: 'Get directions', detail: 'Google Maps', href: r.mapsUrl, external: true },
  { label: 'Reserve a table', detail: 'by phone', href: `tel:${r.phoneE164}`, primary: true },
]

export default function Visit() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-night px-5 pt-28 pb-16 sm:px-12 lg:px-16">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-25 lg:block">
        <Photo id="logoSign" alt="" className="h-full w-full object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Eyebrow className="mb-3">Benvenuti</Eyebrow>
        <h2 id="cta-title" className="font-serif text-6xl font-light text-white sm:text-8xl">Visit us.</h2>
        <p className="mt-4 font-serif text-2xl italic text-muted">A table, and a little more.</p>
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => (
            <li key={a.label}>
              <a
                href={a.href}
                {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`flex flex-col items-center gap-1.5 rounded-sm border px-4 py-6 text-center transition-colors ${a.primary ? 'border-leaf bg-leaf text-night hover:bg-[#9ccf5e]' : 'border-line text-white hover:border-white/50'}`}
              >
                <span className={`eyebrow text-[10px] ${a.primary ? 'text-night/70' : 'text-muted'}`}>{a.label}</span>
                <span className="text-lg font-medium">{a.detail}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
