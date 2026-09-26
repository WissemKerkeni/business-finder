import Header from './components/Header'
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

export default function App() {
  return (
    <>
      <a href="#main" className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-neon focus:px-4 focus:py-3 focus:text-pine-dark">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
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
    </>
  )
}
