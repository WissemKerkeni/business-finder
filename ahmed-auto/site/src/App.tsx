import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Stock from './components/Stock'
import CarDialog from './components/CarDialog'
import { ActionBar, Faq, Footer, Gallery, HowToBuy, Location, Reviews, Visit } from './components/Sections'
import { stock } from './data/dealer'

const idFromHash = () => {
  const m = typeof location !== 'undefined' ? location.hash.match(/^#car-(.+)$/) : null
  return m && stock.some((c) => c.id === m[1]) ? m[1] : null
}

export default function App() {
  // Car sheet state lives in the URL hash (#car-<id>) so a link opens its sheet.
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
    history.replaceState(null, '', `${location.pathname}${location.search}#vehicules`)
    setOpenId(null)
  }, [])

  return (
    <>
      <a href="#main" className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-signal focus:px-4 focus:py-3 focus:text-white">
        Aller au contenu
      </a>
      <Header />
      <Hero />
      <main id="main">
        <Stock onOpen={open} />
        <HowToBuy />
        <Gallery />
        <Reviews />
        <Faq />
        <Location />
        <Visit />
      </main>
      <Footer />
      <ActionBar />
      <CarDialog car={stock.find((c) => c.id === openId) ?? null} onClose={close} />
    </>
  )
}
