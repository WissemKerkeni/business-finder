import type { CSSProperties, ReactNode } from 'react'
import { business, logo, photos, photoSrc, photoSrcSet, type PhotoKey } from '../data/business'
import { useCopy } from '../data/copy'

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

/** The logo, dark version (owner's request, 2026-10-05): the car from the owner's artwork (without its wordmark, cut out
 *  of its white background by scripts/make-logo.mjs) and CHAARI AUTO in white beside it, straight on the dark page with
 *  no plate. Everything scales with font-size (text-* class); `sizes` is the car's rendered width, for the srcset. */
export const LogoLockup = ({ className = '', sizes = '64px', priority = false }: { className?: string; sizes?: string; priority?: boolean }) => (
  <span className={`inline-flex select-none items-center gap-[0.45em] font-head font-bold leading-none tracking-[0.12em] text-white ${className}`}>
    <img
      src={logo.mark}
      srcSet={logo.markSet}
      sizes={sizes}
      alt=""
      width={logo.markW}
      height={logo.markH}
      className="h-[2.1em] w-auto"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
    />
    <span className="whitespace-nowrap">CHAARI AUTO</span>
  </span>
)

/** Brand marks (Facebook and TikTok from Simple Icons, CC0; Instagram drawn as its outline glyph), 24px grid. */
const socialIcons = {
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.3" />
    </>
  ),
  Facebook: <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />,
  TikTok: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />,
}

/** Instagram, Facebook and TikTok as icon links. `labels` shows the network name beside each icon (contact list). */
export function SocialLinks({ labels = false, className = '' }: { labels?: boolean; className?: string }) {
  const t = useCopy().footer
  const links: [keyof typeof socialIcons, string][] = [['Instagram', business.instagram], ['Facebook', business.facebook], ['TikTok', business.tiktok]]
  return (
    <span className={`flex flex-wrap items-center ${labels ? 'gap-x-5 gap-y-2' : 'gap-2'} ${className}`}>
      {links.map(([net, href]) => (
        <a key={net} href={href} target="_blank" rel="noopener noreferrer" aria-label={labels ? undefined : t.on(net)}
          className={labels
            ? 'inline-flex items-center gap-2 hover:text-signal-text'
            : 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-chalk-2 transition-colors hover:border-signal-text hover:text-white'}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-current">{socialIcons[net]}</svg>
          {labels && net}
        </a>
      ))}
    </span>
  )
}

export const Stars =({ className = '' }: { className?: string }) => {
  const t = useCopy()
  return <span className={`text-[#FBBC04] ${className}`} role="img" aria-label={t.reviews.stars}>★★★★★</span>
}
