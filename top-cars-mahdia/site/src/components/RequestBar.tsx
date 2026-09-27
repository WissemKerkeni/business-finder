import { useEffect, useState, type FormEvent } from 'react'
import { carName, fleet, pickupSuggestions, serviceOptions, wa, type ServiceKey } from '../data/agency'
import { WaIcon } from './ui'

const cell = 'flex flex-col justify-center px-4 py-3'
const label = 'mb-1 font-mono text-[11px] uppercase tracking-wider text-chalk-dim'
const field = 'w-full bg-transparent p-0 text-chalk focus:outline-none'
const fr = (iso: string) => iso.split('-').reverse().join('/')

type Req = { service: ServiceKey; place: string; from: string; to: string; car: string }

/** Builds the WhatsApp message for the chosen service; returns an error when the dates are inverted. */
export function requestMessage({ service, place, from, to, car }: Req): { url: string } | { error: string } {
  const bad = from && to && (service === 'location' ? to <= from : to < from)
  if (bad) return { error: 'La date de retour doit être après la date de départ.' }
  const lieu = place.trim()
  let t: string
  if (service === 'location') {
    t = `Bonjour, je voudrais louer ${car ? `le véhicule suivant : ${car}` : 'une voiture'}`
    if (from) t += ` du ${fr(from)}`
    if (to) t += ` au ${fr(to)}`
    if (lieu) t += `, prise en charge à ${lieu}`
  } else if (service === 'transfert') {
    t = 'Bonjour, je voudrais réserver un transfert aéroport'
    if (from) t += ` le ${fr(from)}`
    if (to) t += ` (retour le ${fr(to)})`
    if (lieu) t += `, prise en charge à ${lieu}`
    if (car) t += `, véhicule : ${car}`
  } else {
    t = 'Bonjour, je voudrais réserver une excursion avec chauffeur'
    if (from && to && to !== from) t += ` du ${fr(from)} au ${fr(to)}`
    else if (from) t += ` le ${fr(from)}`
    if (lieu) t += `, départ de ${lieu}`
    if (car) t += `, véhicule : ${car}`
  }
  return { url: wa(`${t}.`) }
}

/** Quick request bar: nothing is sent anywhere, the button opens WhatsApp with a prefilled message. */
export default function RequestBar() {
  const [service, setService] = useState<ServiceKey>('location')
  const [place, setPlace] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [car, setCar] = useState('')
  const [error, setError] = useState('')
  const [today, setToday] = useState<string>()
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const r = requestMessage({ service, place, from, to, car })
    if ('error' in r) return setError(r.error)
    setError('')
    window.open(r.url, '_blank', 'noopener')
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Demande de réservation" className="flex flex-col gap-2">
      <div className="grid grid-cols-1 divide-y divide-white/15 border border-white/15 bg-deep sm:grid-cols-2 lg:grid-cols-[1.3fr_1.4fr_1fr_1fr_1.3fr_auto] lg:divide-x lg:divide-y-0">
        <label className={cell}><span className={label}>Service</span>
          <select name="service" value={service} onChange={(e) => setService(e.target.value as ServiceKey)} className={`${field} cursor-pointer font-cond text-base font-bold`}>
            {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        <label className={cell}><span className={label}>Lieu de prise en charge</span>
          <input name="lieu" type="text" list="lieux" autoComplete="off" value={place} placeholder="Agence, hôtel, aéroport…" onChange={(e) => setPlace(e.target.value)} className={`${field} text-sm placeholder:text-neutral-500`} />
          <datalist id="lieux">{pickupSuggestions(service).map((p) => <option key={p} value={p} />)}</datalist>
        </label>
        <label className={cell}><span className={label}>Du</span>
          <input name="from" type="date" value={from} min={today} onChange={(e) => setFrom(e.target.value)} className={`${field} font-mono text-sm`} />
        </label>
        <label className={cell}><span className={label}>Au</span>
          <input name="to" type="date" value={to} min={from || today} onChange={(e) => setTo(e.target.value)} className={`${field} font-mono text-sm`} />
        </label>
        <label className={cell}><span className={label}>Véhicule</span>
          <select name="car" value={car} onChange={(e) => setCar(e.target.value)} className={`${field} cursor-pointer font-cond text-base font-bold`}>
            <option value="">Tous types</option>
            {fleet.map((c) => <option key={c.model} value={carName(c)}>{c.model}</option>)}
          </select>
        </label>
        <div className="flex p-2 sm:col-span-2 lg:col-span-1">
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-signal px-5 py-3 font-cond text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-signal-dark">
            <WaIcon />Envoyer sur WhatsApp
          </button>
        </div>
      </div>
      <p className="pl-1 font-mono text-xs text-neutral-400">Votre demande s’ouvre dans WhatsApp. Réponse de l’agence par message.</p>
      <p role="alert" className="pl-1 font-mono text-xs text-signal-text empty:hidden">{error}</p>
    </form>
  )
}
