import Hero from './components/Hero'
import About from './components/About'
import Signatures from './components/Signatures'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import Location from './components/Location'
import Visit from './components/Visit'
import Footer from './components/Footer'
import ActionBar from './components/ActionBar'

export default function App() {
  return (
    <>
      <a href="#main" className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-cobalt focus:px-4 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <About />
        <Signatures />
        <Menu />
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
