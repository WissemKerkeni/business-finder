import type { ReactNode } from 'react'
import { photos, photoSrc, photoSrcSet, type PhotoKey } from '../data/dealer'

type PhotoProps = { id: PhotoKey; alt: string; className?: string; sizes?: string; priority?: boolean }

/** Self-hosted WebP with a srcset (640/1024/1600, hero also 2400). */
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

export const SectionTitle = ({ eyebrow, id, children, className = '' }: { eyebrow: string; id: string; children: ReactNode; className?: string }) => (
  <div className={className}>
    <p className="eyebrow mb-3 text-signal-text">{eyebrow}</p>
    <h2 id={id} className="font-wide text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-chalk sm:text-5xl lg:text-6xl">{children}</h2>
  </div>
)

export const WaIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
  </svg>
)

const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors'
export const btn = {
  red: `${base} bg-signal px-5 py-3 text-white hover:bg-signal-dark`,
  outline: `${base} border border-white/25 px-5 py-3 text-chalk hover:border-white`,
}

/** Wordmark from the dealer's logo: red car line over italic "AHMED AUTO". */
export const Wordmark = ({ className = 'text-lg sm:text-xl lg:text-2xl' }: { className?: string }) => (
  <span className="flex flex-col leading-none">
    <svg aria-hidden="true" viewBox="0 0 120 14" className="mb-0.5 h-3 w-24">
      <path d="M2 12 C 20 11, 30 3, 58 2 C 80 1, 98 5, 118 11" fill="none" stroke="#C4121E" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
    <span className={`font-wide font-black italic uppercase tracking-tight whitespace-nowrap text-chalk ${className}`}>AHMED AUTO</span>
  </span>
)

export const Stars = ({ n, className = '' }: { n: number; className?: string }) => (
  <span className={`text-signal-text ${className}`} role="img" aria-label={`${n} étoiles sur 5`}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
)
