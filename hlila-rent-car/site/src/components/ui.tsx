import type { ReactNode } from 'react'
import { photos, photoSrc, photoSrcSet, type PhotoKey } from '../data/agency'

type PhotoProps = {
  id: PhotoKey
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

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

export const Eyebrow = ({ children, className = 'text-swoosh-text' }: { children: ReactNode; className?: string }) => (
  <p className={`eyebrow mb-3 ${className}`}>{children}</p>
)

export const SectionTitle = ({ eyebrow, id, children, className = '', light = false }: { eyebrow: string; id: string; children: ReactNode; className?: string; light?: boolean }) => (
  <div className={className}>
    <Eyebrow className={light ? 'text-asphalt/70' : 'text-swoosh-text'}>{eyebrow}</Eyebrow>
    <h2 id={id} className={`font-cond text-[clamp(2.8rem,7vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight ${light ? 'text-asphalt' : 'text-chalk'}`}>{children}</h2>
  </div>
)

export const WaIcon = ({ className = 'h-3.5 w-3.5' }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M.057 24l1.687-6.163A11.867 11.867 0 0 1 .157 11.892C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
)

const btnBase = 'font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] px-6 py-3.5 transition-colors'
export const btn = {
  red: `${btnBase} bg-swoosh text-white hover:bg-swoosh-dark`,
  outline: `${btnBase} border border-line text-chalk hover:border-chalk`,
  outlineRed: `${btnBase} border border-line text-chalk hover:border-swoosh hover:bg-swoosh`,
}

export const Wordmark = ({ small = false }: { small?: boolean }) => (
  <span className="flex flex-col">
    <span className={`font-cond font-black italic uppercase tracking-wide text-chalk ${small ? 'text-xl' : 'text-2xl'}`}>Hlila Rent Car</span>
    <span className="-mt-0.5 block h-[2px] w-20 bg-swoosh" aria-hidden />
    {!small && <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-chalk-dim">Location de voitures</span>}
  </span>
)
