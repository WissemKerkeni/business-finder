import { useEffect, useState } from 'react'
import { restaurant as r } from '../data/restaurant'

/** Phones and tablets: Call · Directions · Reserve, shown once the hero (which has its own buttons) scrolls away. */
export default function ActionBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="Quick actions"
      className={`eyebrow fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-night/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={`tel:${r.phoneE164}`} className="border-r border-white/10 py-4 text-center text-white" tabIndex={visible ? 0 : -1}>Call</a>
      <a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className="border-r border-white/10 py-4 text-center text-white" tabIndex={visible ? 0 : -1}>Directions</a>
      <a href={`tel:${r.phoneE164}`} className="bg-leaf py-4 text-center text-night" tabIndex={visible ? 0 : -1}>Reserve</a>
    </nav>
  )
}
