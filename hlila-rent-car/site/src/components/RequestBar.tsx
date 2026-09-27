import { useEffect, useState, type FormEvent } from 'react'
import { fleet, pickups, wa } from '../data/agency'
import { WaIcon } from './ui'

const field = 'rounded-[4px] border border-line bg-graphite px-3 py-2.5 font-mono text-xs text-chalk focus:border-swoosh focus:outline-none'
const label = 'mb-1.5 font-mono text-[10px] uppercase tracking-wider text-chalk-dim'
const fr = (iso: string) => iso.split('-').reverse().join('/')

/** Builds the WhatsApp request message; returns null + error when the dates are inverted. */
export function requestMessage(o: { pickup: string; other: string; from: string; to: string; car: string }) {
  if (o.from && o.to && o.to <= o.from) return { error: 'La date de retour doit être après la date de départ.' }
  const p = pickups.find((x) => x.value === o.pickup)!
  const lieu = o.pickup === 'autre' ? o.other.trim() || 'une autre adresse' : p.phrase
  let t = `Bonjour, je voudrais louer ${o.car ? `la ${o.car}` : 'une voiture'}`
  if (o.from) t += ` du ${fr(o.from)}`
  if (o.to) t += ` au ${fr(o.to)}`
  return { url: wa(`${t}, prise en charge à ${lieu}.`) }
}

/** Quick request bar: nothing is sent anywhere, the button opens WhatsApp with a prefilled message. */
export default function RequestBar() {
  const [pickup, setPickup] = useState('agence')
  const [other, setOther] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [car, setCar] = useState('')
  const [error, setError] = useState('')
  const [today, setToday] = useState<string>()
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const r = requestMessage({ pickup, other, from, to, car })
    if ('error' in r) return setError(r.error!)
    setError('')
    window.open(r.url, '_blank', 'noopener')
  }

  return (
    <div className="rounded-[4px] border border-line bg-asphalt/90 p-4 backdrop-blur-md">
      <form onSubmit={submit} noValidate aria-label="Demande de location" className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col"><span className={label}>Lieu de prise en charge</span>
          <select name="lieu" value={pickup} onChange={(e) => setPickup(e.target.value)} className={field}>
            {pickups.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </label>
        <label className="flex flex-col"><span className={label}>Date de départ</span>
          <input name="from" type="date" value={from} min={today} onChange={(e) => setFrom(e.target.value)} className={field} />
        </label>
        <label className="flex flex-col"><span className={label}>Date de retour</span>
          <input name="to" type="date" value={to} min={from || today} onChange={(e) => setTo(e.target.value)} className={field} />
        </label>
        <label className="flex flex-col"><span className={label}>Voiture</span>
          <select name="car" value={car} onChange={(e) => setCar(e.target.value)} className={field}>
            <option value="">Toutes</option>
            {fleet.map((c) => <option key={c.model}>{c.model}</option>)}
          </select>
        </label>
        <button type="submit" className="flex h-[42px] items-center justify-center gap-2 rounded-[4px] bg-swoosh px-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-swoosh-dark sm:col-span-2 lg:col-span-1">
          <WaIcon />Demander sur WhatsApp
        </button>
        {pickup === 'autre' && (
          <label className="flex flex-col sm:col-span-2 lg:col-span-5"><span className={label}>Adresse de prise en charge</span>
            <input name="autre" type="text" value={other} placeholder="Hôtel, adresse…" onChange={(e) => setOther(e.target.value)} className={field} />
          </label>
        )}
      </form>
      <p className="mt-2.5 font-mono text-[10px] text-chalk-dim">Votre demande s’ouvre dans WhatsApp — rien n’est envoyé ailleurs.</p>
      <p role="alert" className="mt-2 font-mono text-[11px] text-swoosh-text empty:hidden">{error}</p>
    </div>
  )
}
