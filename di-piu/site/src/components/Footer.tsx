import { restaurant as r } from '../data/restaurant'

export default function Footer() {
  return (
    <footer className="bg-night px-5 pb-10 sm:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted md:flex-row">
        <p className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-3">
          <span className="font-serif text-base italic text-white">{r.name} Ristorante</span>
          <span aria-hidden className="hidden text-white/30 sm:inline">·</span>
          <span>{r.plusCode} {r.address.postalCode}, {r.address.countryName}</span>
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider">
          <li><a href={r.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
          <li><a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">Google Maps</a></li>
          <li><a href="/llms.txt" className="hover:text-white">llms.txt</a></li>
        </ul>
      </div>
      <p className="mx-auto mt-6 max-w-7xl text-center text-[11px] text-muted/70 md:text-left">Photos and reviews from Google Maps. Menu and prices from the restaurant’s printed card.</p>
    </footer>
  )
}
