import { SectionTitle } from './ui'
import { featuredReview, restaurant as r, reviews } from '../data/restaurant'

export default function Reviews() {
  const max = Math.max(...r.rating.distribution)
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ink px-5 py-24 text-white md:px-14 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionTitle eyebrow="05 — What guests say" id="reviews-title" dark className="mb-14">
          <span className="sr-only">Google reviews of Dar Zmen</span><span aria-hidden>On Google</span>
        </SectionTitle>
        <div className="grid grid-cols-1 gap-14 border-b border-white/15 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-end gap-4">
              <p className="font-serif text-8xl leading-none">{r.rating.value}</p>
              <div className="pb-2">
                <p aria-label={`${r.rating.value} out of 5 stars`} className="text-lg tracking-[0.2em] text-sandstone">★★★★<span className="text-white/30">★</span></p>
                <p className="eyebrow text-[10px] text-white/70">{r.rating.count} Google reviews</p>
              </div>
            </div>
            <dl className="mt-8 space-y-2 font-mono text-[11px] text-white/70">
              {r.rating.distribution.map((n, i) => (
                <div key={i} className="flex items-center gap-3">
                  <dt className="w-7">{5 - i}★</dt>
                  <dd className="flex flex-1 items-center gap-3">
                    <span className="h-px flex-1 bg-white/15"><span className="block h-px bg-sandstone" style={{ width: `${(n / max) * 100}%` }} /></span>
                    <span className="w-8 text-right">{n}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow mt-8 inline-block text-sandstone hover:text-white">Read all reviews on Google ↗</a>
          </div>
          <figure className="lg:col-span-8 lg:border-l lg:border-white/15 lg:pl-10">
            <blockquote className="font-serif text-3xl italic leading-tight md:text-[40px]">“{featuredReview.quote}”</blockquote>
            <figcaption className="eyebrow mt-6 text-[10px] text-white/60">
              — {featuredReview.author} · <span className="text-sandstone" aria-label="5 stars">★★★★★</span> · {featuredReview.note}
            </figcaption>
          </figure>
        </div>
        <ul className="grid grid-cols-1 divide-y divide-white/15 pt-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:pt-12">
          {reviews.map((rv) => (
            <li key={rv.author} className="flex flex-col justify-between gap-6 py-6 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
              <blockquote className="font-light leading-relaxed text-white/85">“{rv.quote}”</blockquote>
              <p className="eyebrow text-[10px] text-white/60">— {rv.author}{rv.badge ? `, ${rv.badge}` : ''} <span className="text-sandstone">★5</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
