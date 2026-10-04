import { useEffect, useRef, useState } from 'react'
import { photoSrc, videoCaption, videoOrder, type Video } from '../data/business'
import { useCopy } from '../data/copy'
import { fmtDate, useLang } from '../i18n'
import { SectionTitle, Wrap, rd } from './ui'

/** Portrait clips with poster + play button, as in the Stitch design: on hover the tile zooms, the scrim lightens and the
 *  play ring turns red; on a mouse/trackpad the muted clip also previews while hovered. A click plays it with controls.
 *  preload="none"; one clip plays at a time; a clip pauses when it leaves the view. */
export default function Videos() {
  const lang = useLang()
  const t = useCopy().videos
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  const [started, setStarted] = useState<Record<string, boolean>>({})
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    const vids = refs.current.filter(Boolean) as HTMLVideoElement[]
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement
      if (!e.isIntersecting && !v.paused) v.pause()
    }), { threshold: 0.25 })
    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  const stopOthers = (v: HTMLVideoElement) => refs.current.forEach((o) => { if (o && o !== v && !o.paused) o.pause() })
  const play = (i: number, clip: Video) => {
    const v = refs.current[i]
    if (!v) return
    setPreview(null)
    setStarted((s) => ({ ...s, [clip.id]: true }))
    stopOthers(v)
    void v.play()
  }
  const canHover = () => typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches
  const startPreview = (i: number, clip: Video) => {
    const v = refs.current[i]
    if (!v || started[clip.id] || !canHover()) return
    setPreview(clip.id)
    stopOthers(v)
    v.currentTime = 0
    void v.play().catch(() => {})
  }
  const endPreview = (i: number, clip: Video) => {
    const v = refs.current[i]
    if (!v || started[clip.id]) return
    setPreview((p) => (p === clip.id ? null : p))
    v.pause()
  }

  return (
    <section id="videos" aria-labelledby="videos-title" className="border-b border-line bg-ink py-12 md:py-16 lg:py-28">
      <Wrap>
        <SectionTitle eyebrow={t.eyebrow} id="videos-title" className="mb-8 lg:mb-10">{t.title}</SectionTitle>
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:gap-6">
          {videoOrder.map((clip, i) => {
            const cap = videoCaption(clip, lang)
            const live = started[clip.id]
            return (
              <figure
                key={clip.id}
                className="group w-[68vw] shrink-0 snap-start sm:w-[260px] lg:w-auto"
                data-reveal
                style={rd(i, 110)}
                onMouseEnter={() => startPreview(i, clip)}
                onMouseLeave={() => endPreview(i, clip)}
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-raised">
                  <video
                    ref={(el) => { refs.current[i] = el }}
                    src={clip.file}
                    poster={photoSrc(clip.poster, 640)}
                    preload="none"
                    muted
                    playsInline
                    loop
                    controls={!!live}
                    width={clip.w}
                    height={clip.h}
                    onPlay={(e) => stopOthers(e.currentTarget)}
                    aria-label={t.label(cap, fmtDate(clip.uploadDate, lang))}
                    className={`h-full w-full object-cover transition-transform duration-500 ease-out ${live ? '' : 'group-hover:scale-105'}`}
                  />
                  {!live && (
                    <button
                      type="button"
                      onClick={() => play(i, clip)}
                      aria-label={`${t.play} : ${cap}`}
                      className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${preview === clip.id ? 'bg-black/0' : 'bg-black/40 group-hover:bg-black/20'}`}
                    >
                      <span className={`flex h-14 w-14 items-center justify-center rounded-full border bg-ink/70 transition-all duration-300 group-hover:scale-110 group-hover:border-signal group-hover:text-signal-text ${preview === clip.id ? 'border-signal text-signal-text opacity-80' : 'border-white/60 text-white'}`}>
                        <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    </button>
                  )}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-signal-text transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                </div>
                <figcaption className="pt-3 font-mono text-[11px] uppercase tracking-[0.1em]">
                  <p className="text-chalk transition-colors group-hover:text-white">{cap}</p>
                  <p className="mt-1 text-mute">
                    Facebook · {fmtDate(clip.uploadDate, lang)} · <a href={clip.postUrl} target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-signal-text">{t.seeFb}</a>
                  </p>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </Wrap>
    </section>
  )
}
