import type { CSSProperties, ReactNode } from 'react'
import { photos, photoSrc, photoSrcSet, type PhotoKey } from '../data/business'

type PhotoProps = { id: PhotoKey; alt: string; className?: string; sizes?: string; priority?: boolean }

/** Self-hosted WebP with a srcset (640/1024/1600, hero up to 2000). */
export function Photo({ id, alt, className, sizes = '100vw', priority }: PhotoProps) {
  const { w, h } = photos[id]
  return (
    <img
      src={photoSrc(id, 1600)}
      srcSet={photoSrcSet(id)}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  )
}

export const Wrap = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1320px] px-4 sm:px-8 lg:px-12 ${className}`}>{children}</div>
)

/** Stagger delay for scroll-reveal children (see useReveal in App.tsx). */
export const rd = (i: number, step = 90) => ({ '--rd': `${i * step}ms` }) as CSSProperties

export const SectionTitle = ({ eyebrow, id, children, className = '' }: { eyebrow: string; id: string; children: ReactNode; className?: string }) => (
  <div className={className} data-reveal>
    <p className="eyebrow mb-3 text-signal-text">{eyebrow}</p>
    <h2 id={id} className="font-head text-4xl font-bold uppercase leading-[0.95] tracking-[-0.01em] text-chalk sm:text-5xl lg:text-6xl">{children}</h2>
  </div>
)

export const WaIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} shrink-0 fill-current`}>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
)

const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors'
export const btn = {
  red: `${base} bg-signal px-5 py-3.5 text-white hover:bg-signal-dark`,
  outline: `${base} border border-chalk/70 px-5 py-3.5 text-chalk hover:bg-chalk hover:text-ink`,
}

/** Wordmark: CHAARI AUTO on a white German-style plate, like the plate holder on every car the business posts. */
export const Plate = ({ className = 'text-sm sm:text-base' }: { className?: string }) => (
  <span className={`inline-flex select-none items-center rounded-[3px] border border-ink bg-plate px-3 py-1 font-head font-bold tracking-[0.12em] text-ink outline outline-1 outline-plate ${className}`}>
    CHAARI AUTO
  </span>
)

export const Stars = ({ className = '' }: { className?: string }) => (
  <span className={`text-signal-text ${className}`} role="img" aria-label="5 étoiles sur 5">★★★★★</span>
)
