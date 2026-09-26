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

export function Eyebrow({ children, className = '', rule = false }: { children: ReactNode; className?: string; rule?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-leaf ${className}`}>
      {rule && <span aria-hidden className="h-px w-6 bg-leaf" />}
      {children}
    </p>
  )
}

export const Price = ({ value, className = '' }: { value: string; className?: string }) => (
  <span className={`font-serif font-semibold whitespace-nowrap text-leaf ${className}`}>
    {value} <abbr title="Tunisian dinars" className="no-underline">DT</abbr>
  </span>
)

export const SectionTitle = ({ eyebrow, children, className = '' }: { eyebrow: string; children: ReactNode; className?: string }) => (
  <div className={className}>
    <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05]">{children}</h2>
  </div>
)

const btnBase = 'eyebrow inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 sm:px-7 py-3.5 transition-colors'
export const btn = {
  solid: `${btnBase} bg-leaf text-night hover:bg-[#9ccf5e]`,
  outline: `${btnBase} border border-white/40 text-white hover:border-white hover:bg-white/5`,
}

export const CameraIcon = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" className={`inline-block h-3.5 w-3.5 text-leaf ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
)
