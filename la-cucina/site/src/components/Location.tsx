import { restaurant as r } from '../data/restaurant'
import { Eyebrow, btn } from './ui'

export default function Location() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-sage/20 bg-pine-dark py-24 text-neon md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow className="text-sage" rule={false}>
            Trovarci
          </Eyebrow>
          <h2 id="visit-title" className="mt-3 font-display text-5xl">
            Place 3 Août, <em>Monastir</em>
          </h2>

          <dl className="mt-10">
            <div className="border-b border-sage/25 pb-5">
              <dt className="eyebrow text-sage">Address</dt>
              <dd className="mt-2 text-lg">
                <address className="not-italic">
                  {r.address.street}, {r.address.locality} {r.address.postalCode}, {r.address.countryName}
                </address>
              </dd>
            </div>
            <div className="border-b border-sage/25 py-5">
              <dt className="eyebrow text-sage">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${r.phoneE164}`} className="font-display text-3xl hover:underline">
                  {r.phone}
                </a>
              </dd>
            </div>
            <div className="border-b border-sage/25 py-5">
              <dt className="eyebrow text-sage">Opening hours</dt>
              <dd className="mt-3 space-y-2">
                {r.hours.map((h) => (
                  <p key={h.label} className="flex justify-between gap-4">
                    <span>{h.label}</span>
                    <span className="font-label text-sm">
                      <time>{h.opens}</time> – <time>{h.closes}</time>
                    </span>
                  </p>
                ))}
                <p className="flex justify-between gap-4 italic text-neon/70">
                  <span>Friday</span>
                  <span>{r.fridayNote}</span>
                </p>
              </dd>
            </div>
          </dl>
          <a href={r.mapsUrl} target="_blank" rel="noopener" className={`${btn.solid} mt-8 w-full`}>
            Open in Google Maps
          </a>
        </div>

        <div className="overflow-hidden rounded border border-sage/25 lg:col-span-7">
          <iframe
            title={`Map showing ${r.name} on Place 3 Août, Monastir`}
            src={r.mapsEmbedUrl}
            className="h-80 w-full grayscale-[35%] lg:h-full lg:min-h-[480px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
