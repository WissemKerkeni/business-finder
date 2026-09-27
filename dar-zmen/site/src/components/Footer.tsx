import { restaurant as r } from '../data/restaurant'

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 md:px-14">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 text-center font-mono text-[11px] uppercase tracking-wider text-ink/70 md:flex-row md:text-left">
        <p className="normal-case tracking-normal">
          <span className="font-serif text-lg text-ink">{r.name}</span> <span className="text-sandstone">·</span>{' '}
          <span lang="ar" className="font-arabic text-sm text-sandstone-ink">{r.nameAr}</span>
        </p>
        <p>{r.plusCode} · <a href={`tel:${r.phoneE164}`} className="hover:text-cobalt">{r.phone}</a></p>
        <p className="text-ink/55">Photos: Google Maps contributors</p>
      </div>
    </footer>
  )
}
