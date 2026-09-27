import type { ReactNode } from 'react'
import { photo, photos, photoSrcSet, type PhotoKey } from '../data/restaurant'

type PhotoProps = {
  id: PhotoKey
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  width?: number
  height?: number
}

/** Responsive image served from Google's photo CDN (`=wN` widths). */
export function Photo({ id, alt, className, sizes = '100vw', priority, width = 1600, height = 1200 }: PhotoProps) {
  return (
    <img
      src={photo(photos[id], 1600)}
      srcSet={photoSrcSet(photos[id])}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      // Google's photo CDN rejects hot-linked requests that carry a Referer header.
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  )
}

export const Eyebrow = ({ children, className = 'text-sandstone-ink' }: { children: ReactNode; className?: string }) => (
  <p className={`eyebrow mb-4 ${className}`}>{children}</p>
)

export const SectionTitle = ({ eyebrow, id, children, className = '', dark = false }: { eyebrow: string; id: string; children: ReactNode; className?: string; dark?: boolean }) => (
  <div className={className}>
    <Eyebrow className={dark ? 'text-sandstone' : 'text-sandstone-ink'}>{eyebrow}</Eyebrow>
    <h2 id={id} className={`font-serif text-[clamp(2.6rem,7vw,4.75rem)] leading-[0.95] tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>{children}</h2>
  </div>
)

export const Price = ({ value, className = '' }: { value: string; className?: string }) => (
  <span className={`font-mono font-bold whitespace-nowrap text-cobalt ${className}`}>
    {value} <abbr title="Tunisian dinars" className="no-underline">DT</abbr>
  </span>
)

/** Arabic text set right-to-left but aligned with the Latin text above it. */
export const Ar = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span lang="ar" dir="rtl" className={`font-arabic block text-left ${className}`}>{children}</span>
)

const btnBase = 'eyebrow inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4 transition-colors'
export const btn = {
  solid: `${btnBase} bg-cobalt text-white hover:bg-cobalt-dark`,
  outlineLight: `${btnBase} border border-white/60 text-white hover:border-white hover:bg-white/10`,
  outlineDark: `${btnBase} border border-ink/30 text-ink hover:border-cobalt hover:text-cobalt`,
}
