import Header from './components/Header'
import Hero from './components/Hero'
import Fleet from './components/Fleet'
import { Delivery, Gallery, HowToBook, Reviews, Visit } from './components/Sections'
import { ActionBar, Faq, Footer, Location } from './components/Contact'

export default function App() {
  return (
    <>
      <a href="#main" className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-swoosh focus:px-4 focus:py-3 focus:text-white">
        Aller au contenu
      </a>
      <Header />
      <Hero />
      <main id="main">
        <Fleet />
        <HowToBook />
        <Delivery />
        <Gallery />
        <Reviews />
        <Faq />
        <Location />
        <Visit />
      </main>
      <Footer />
      <ActionBar />
    </>
  )
}
