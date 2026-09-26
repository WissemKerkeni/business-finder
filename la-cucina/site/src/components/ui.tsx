import type { ReactNode } from 'react'
import { photo, photoSrcSet } from '../data/restaurant'

type PhotoProps = {
  id: string
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
      src={photo(id, 1600)}
      srcSet={photoSrcSet(id)}
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

export function Eyebrow({ children, className = '', rule = true }: { children: ReactNode; className?: string; rule?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {rule && <span aria-hidden className="h-px w-8 bg-current opacity-50" />}
      {children}
    </p>
  )
}

export const Price = ({ value, className = '' }: { value: number; className?: string }) => (
  <span className={`font-label font-semibold whitespace-nowrap text-tomato ${className}`}>
    {value} <abbr title="Tunisian dinars" className="no-underline">DT</abbr>
  </span>
)

export const btn = {
  solid: 'eyebrow inline-flex items-center justify-center rounded px-7 py-4 bg-neon text-pine-dark transition-colors hover:bg-white',
  outline: 'eyebrow inline-flex items-center justify-center rounded px-7 py-4 border border-neon/40 text-neon transition-colors hover:bg-neon/10',
}
