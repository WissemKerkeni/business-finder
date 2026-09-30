import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Steps from './components/Steps'
import RequestForm from './components/RequestForm'
import Deliveries from './components/Deliveries'
import ForSale from './components/ForSale'
import Videos from './components/Videos'
import CarDialog from './components/CarDialog'
import { ActionBar, Audience, Contact, Cta, Faq, Footer, Legal, Testimonials } from './components/Sections'
import { deliveries, forSale, type Car } from './data/business'

const allCars: Car[] = [...deliveries, ...forSale]

const idFromHash = () => {
  const m = typeof location !== 'undefined' ? location.hash.match(/^#car-(.+)$/) : null
  return m && allCars.some((c) => c.id === m[1]) ? m[1] : null
}

/** Scroll reveal: marks html.js, then sets data-in on each [data-reveal] element as it enters the viewport
 *  (a data attribute, not a class, so React re-renders never remove it). */
function useReveal() {
  useEffect(() => {
    // js-init disables transitions for the first frames, so switching to the hidden start state doesn't animate backwards.
    const root = document.documentElement
    root.classList.add('js', 'js-init')
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('js-init')))
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const show = (e: Element) => { (e as HTMLElement).dataset.in = '' }
    if (!('IntersectionObserver' in window)) { els.forEach(show); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target) }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    els.forEach((e) => io.observe(e))
    // Fallback for fast scrolls and jump links (#contact…): anything above the bottom of the viewport is revealed,
    // so no content is ever left hidden above the reader.
    let raf = 0
    const sweep = () => {
      raf = 0
      for (const e of els) if (!('in' in e.dataset) && e.getBoundingClientRect().top < innerHeight * 0.95) { show(e); io.unobserve(e) }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sweep) }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('hashchange', onScroll)
    sweep()
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('hashchange', onScroll); cancelAnimationFrame(raf) }
  }, [])
}

export default function App() {
  useReveal()
  // The car panel state lives in the URL hash (#car-<id>) so a link opens its panel.
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const sync = () => setOpenId(idFromHash())
    sync()
    addEventListener('hashchange', sync)
    return () => removeEventListener('hashchange', sync)
  }, [])

  const open = useCallback((id: string) => {
    history.replaceState(null, '', `#car-${id}`)
    setOpenId(id)
  }, [])
  const close = useCallback(() => {
    const back = forSale.some((c) => c.id === openId) ? '#vehicules' : '#voitures'
    history.replaceState(null, '', `${location.pathname}${location.search}${back}`)
    setOpenId(null)
  }, [openId])

  return (
    <>
      <a href="#main" className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-signal focus:px-4 focus:py-3 focus:text-white">
        Aller au contenu
      </a>
      <Header />
      <Hero />
      <main id="main">
        <Steps />
        <Audience />
        <RequestForm />
        <ForSale onOpen={open} />
        <Deliveries onOpen={open} />
        <Videos />
        <Testimonials />
        <Faq />
        <Contact />
        <Cta />
        <Legal />
      </main>
      <Footer />
      <ActionBar />
      <CarDialog car={allCars.find((c) => c.id === openId) ?? null} onClose={close} />
    </>
  )
}
