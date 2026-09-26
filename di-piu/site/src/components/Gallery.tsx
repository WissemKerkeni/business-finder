import { Eyebrow, Photo } from './ui'
import { gallery } from '../data/restaurant'

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="border-b border-line bg-night px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line px-1 pb-4">
          <div>
            <Eyebrow className="mb-1">Ambiente</Eyebrow>
            <h2 id="gallery-title" className="font-serif text-3xl italic text-white">La sala</h2>
          </div>
          <p className="text-xs font-light text-muted">Photos from Google Maps</p>
        </div>
        <ul className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {gallery.map((g, i) => (
            <li key={g.id} className={`overflow-hidden rounded-sm bg-night-2 ${g.wide ? 'col-span-2 row-span-2' : i % 3 === 1 ? 'row-span-2' : ''}`}>
              <Photo id={g.id} alt={g.alt} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" sizes={g.wide ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
