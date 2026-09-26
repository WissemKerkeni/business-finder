import { restaurant as r } from '../data/restaurant'

export default function Footer() {
  return (
    <footer className="border-t border-sage/20 bg-pine-deep text-neon/70">
      <div className="font-label mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-xs tracking-wider md:flex-row md:items-center md:justify-between md:px-12">
        <nav aria-label="Social" className="flex gap-6">
          <a href={r.instagram} target="_blank" rel="noopener me" className="hover:text-neon">
            Instagram {r.instagramHandle}
          </a>
          <a href={r.facebook} target="_blank" rel="noopener me" className="hover:text-neon">
            Facebook
          </a>
          <a href="/llms.txt" className="hover:text-neon">
            Fact sheet
          </a>
        </nav>
        <p>
          © {new Date().getFullYear()} {r.name} · {r.address.street}, {r.address.locality}
        </p>
      </div>
    </footer>
  )
}
