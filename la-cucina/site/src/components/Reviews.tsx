import { restaurant as r, reviews } from '../data/restaurant'

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-sage/20 bg-pine-deep py-24 text-neon md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <div className="flex flex-col justify-between gap-8 border-b border-sage/25 pb-12 md:flex-row md:items-end">
          <div className="flex items-end gap-6">
            <p className="font-display text-8xl leading-none md:text-9xl" aria-hidden>
              {r.rating.value}
            </p>
            <div>
              <p className="text-2xl tracking-widest text-tomato" aria-hidden>
                ★★★★★
              </p>
              <h2 id="reviews-title" className="font-label mt-1 text-sm uppercase tracking-wider text-neon/80">
                <span className="sr-only">Rated {r.rating.value} out of 5 from </span>
                {r.rating.count} reviews on Google
              </h2>
            </div>
          </div>
          <a href={r.mapsUrl} target="_blank" rel="noopener" className="eyebrow self-start rounded border border-sage/40 px-6 py-3 transition-colors hover:bg-sage/10 md:self-auto">
            Read all reviews on Google ↗
          </a>
        </div>

        <ul className="mt-12 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rv) => (
            <li key={rv.author} className="border-t border-sage/30 pt-6">
              <figure>
                <p className="text-sm tracking-widest text-tomato" aria-label="5 out of 5 stars">
                  ★★★★★
                </p>
                <blockquote className="mt-3 font-display text-xl italic leading-relaxed text-neon/95">“{rv.text}”</blockquote>
                <figcaption className="font-label mt-5 text-xs uppercase tracking-wider text-sage">
                  {rv.author}
                  <span className="sr-only">, Google review</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
