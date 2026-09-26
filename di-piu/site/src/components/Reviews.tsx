import { restaurant as r, reviews } from '../data/restaurant'

export default function Reviews() {
  const max = Math.max(...r.rating.distribution)
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-b border-black/10 bg-sage px-5 py-24 text-night sm:px-12 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 lg:border-r lg:border-black/15 lg:pr-12">
          <div className="flex items-center justify-between">
            <h2 id="reviews-title" className="eyebrow text-night/70">What guests say</h2>
            <span className="rounded-sm bg-black/10 px-2 py-1 text-[11px] font-medium">Google</span>
          </div>
          <p className="mt-4 flex items-end gap-3">
            <span className="font-serif text-8xl font-light leading-none">{r.rating.value}</span>
            <span aria-hidden className="mb-2 text-xl tracking-tight">★★★★★</span>
          </p>
          <p className="mt-3 text-sm">{r.rating.count} reviews on Google</p>
          <dl className="mt-8 space-y-2 text-xs">
            {r.rating.distribution.map((n, i) => (
              <div key={i} className="flex items-center gap-3">
                <dt className="w-6">{5 - i}★</dt>
                <dd className="flex flex-1 items-center gap-3">
                  <span className="h-px flex-1 bg-black/15"><span className="block h-[2px] -translate-y-[0.5px] bg-night" style={{ width: `${(n / max) * 100}%` }} /></span>
                  <span className="w-7 text-right text-night/70">{n}</span>
                </dd>
              </div>
            ))}
          </dl>
          <a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow mt-10 inline-block border-b border-night pb-1">
            Read all reviews on Google →
          </a>
        </div>
        <ul className="divide-y divide-black/15 lg:col-span-8">
          {reviews.map((rv) => (
            <li key={rv.author} className="py-8 first:pt-0">
              <figure>
                <blockquote className="font-serif text-2xl italic leading-snug sm:text-3xl">“{rv.quote}”</blockquote>
                <figcaption className="eyebrow mt-4 text-[11px] font-normal text-night/70">
                  — {rv.author}{rv.badge ? `, ${rv.badge}` : ''}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
