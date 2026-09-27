import { agency as a } from '../data/agency'
import RequestBar from './RequestBar'
import { Photo } from './ui'

export default function Hero() {
  return (
    <header id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden border-b border-line pt-28 lg:h-[900px] lg:min-h-0">
      <div className="absolute inset-0 -z-10">
        <Photo id="hero" priority alt="MG ZS blanc, MG5 gris et MG ZS noir alignés sous l’abri de Hlila Rent Car à Monastir" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,15,17,.45)_0%,rgba(14,15,17,.85)_70%,#0E0F11_100%)]" />
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 sm:px-8 lg:pb-12">
        <p className="eyebrow mb-3 text-swoosh-text">Monastir · Location de voitures</p>
        <h1 className="mb-4 font-cond text-[clamp(3rem,9vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight">
          Louez votre voiture à Monastir
        </h1>
        <p className="mb-4 max-w-3xl text-lg leading-relaxed text-chalk-dim">
          Citadines, berlines et SUV en boîte manuelle ou automatique. Livraison à l’aéroport sur demande.
        </p>
        <p className="mb-8 flex items-center gap-2 font-mono text-sm">
          <span className="font-bold">{a.rating.value.toFixed(1).replace('.', ',')}</span>
          <span className="tracking-widest text-swoosh" aria-label="5 étoiles sur 5">★★★★★</span>
          <span className="text-chalk-dim">· <a href={a.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{a.rating.count} avis Google</a></span>
        </p>
        <RequestBar />
      </div>
    </header>
  )
}
