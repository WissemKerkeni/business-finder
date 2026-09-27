import { Photo, SectionTitle } from './ui'
import { gallery } from '../data/restaurant'

export default function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="px-5 py-24 md:px-14 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionTitle eyebrow="04 — The house in pictures" id="gallery-title" className="mb-14">Stone, tile <i>&amp; steam</i></SectionTitle>
        {/* Explicit spans on a fixed row grid, so the mosaic has no holes at any width. */}
        <ul className="grid auto-rows-[140px] grid-cols-2 gap-2 sm:auto-rows-[180px] md:auto-rows-[170px] md:grid-cols-12">
          {gallery.map((g) => (
            <li key={g.id} className={`zoom relative overflow-hidden ${g.span}`}>
              <Photo id={g.id} alt={g.alt} className="h-full w-full object-cover" sizes="(min-width: 768px) 40vw, 50vw" />
              <span className="eyebrow absolute bottom-0 left-0 bg-black/50 px-3 py-2 text-[9px] text-white">{g.caption}</span>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-4 text-[10px] text-ink/60">Photos shared by guests on Google Maps</p>
      </div>
    </section>
  )
}
