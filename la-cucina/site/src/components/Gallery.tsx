import { gallery } from '../data/restaurant'
import { Eyebrow, Photo } from './ui'

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-pine-dark py-24 text-neon md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-12">
        <Eyebrow className="text-sage" rule={false}>
          Atmosfera &amp; Tavola
        </Eyebrow>
        <h2 id="gallery-title" className="mt-3 font-display text-5xl md:text-6xl">
          Momenti <em>alla Cucina</em>
        </h2>
        <ul className="mt-12 columns-2 gap-2 md:columns-3 lg:columns-4">
          {gallery.map((g) => (
            <li key={g.id} className="mb-2 break-inside-avoid overflow-hidden rounded">
              <Photo
                id={g.id}
                alt={g.alt}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className={`${g.aspect} w-full object-cover transition-transform duration-500 hover:scale-105`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
