import { useState, type FormEvent } from 'react'
import { business as b, form, requestMessage, wa, type Request } from '../data/business'
import { SectionTitle, WaIcon, Wrap, btn } from './ui'

const input = 'w-full rounded-[3px] border border-line bg-raised px-4 py-3.5 text-base text-chalk placeholder:text-[#6E6E73] focus:border-signal focus:outline-none'
const label = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-dim'

const empty: Request = { model: '', open: false, year: '', fuel: 'Peu importe', gearbox: 'Peu importe', budget: '', country: '', city: '', name: '' }

/** "Votre demande": no backend, no storage, no analytics. Submitting opens WhatsApp with the filled fields, one per line. */
export default function RequestForm() {
  const [r, setR] = useState<Request>(empty)
  const [error, setError] = useState('')
  const set = <K extends keyof Request>(k: K) => (v: Request[K]) => setR((x) => ({ ...x, [k]: v }))

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const missing = [
      !r.model.trim() && !r.open && ['f-model', 'Marque et modèle souhaités (ou cochez « ouvert(e) aux suggestions »)'],
      !r.country.trim() && ['f-country', 'Pays de résidence'],
      !r.name.trim() && ['f-name', 'Votre nom'],
    ].find(Boolean) as [string, string] | undefined
    if (missing) {
      setError(`Merci de remplir : ${missing[1]}.`)
      document.getElementById(missing[0])?.focus()
      return
    }
    setError('')
    window.open(wa(requestMessage(r)), '_blank', 'noopener')
  }

  return (
    <section id="demande" aria-labelledby="demande-title" className="border-b border-line bg-ink py-20 lg:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <SectionTitle eyebrow="WhatsApp" id="demande-title" className="mb-6">Votre demande</SectionTitle>
          <p className="mb-6 max-w-md leading-relaxed text-chalk-2">Décrivez la voiture que vous cherchez : le bouton ouvre WhatsApp avec votre message pré-rempli. Rien n’est enregistré sur ce site.</p>
          <p className="font-mono text-xs uppercase tracking-wider text-dim">
            Ou directement : <a href={wa()} target="_blank" rel="noopener noreferrer" className="text-white hover:text-signal-text">{b.phone}</a>
          </p>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-x-6 gap-y-5 sm:grid-cols-2" aria-describedby="req-err" data-reveal>
          <div className="sm:col-span-2">
            <label htmlFor="f-model" className={label}>Marque et modèle souhaités *</label>
            <input id="f-model" className={input} required={!r.open} autoComplete="off" placeholder="ex. Mercedes GLC, VW Tiguan…" value={r.model} onChange={(e) => set('model')(e.target.value)} />
          </div>
          <label className="-mt-2 flex items-center gap-3 text-sm text-chalk-2 sm:col-span-2">
            <input id="f-open" type="checkbox" className="h-5 w-5 accent-signal" checked={r.open} onChange={(e) => set('open')(e.target.checked)} />
            Je suis ouvert(e) aux suggestions
          </label>
          <div>
            <label htmlFor="f-year" className={label}>Année (de – à)</label>
            <input id="f-year" className={input} inputMode="numeric" placeholder="ex. 2021 – 2024" value={r.year} onChange={(e) => set('year')(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-budget" className={label}>Budget</label>
            <input id="f-budget" className={input} placeholder="Montant et devise" value={r.budget} onChange={(e) => set('budget')(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-fuel" className={label}>Carburant</label>
            <select id="f-fuel" className={`${input} select-arrow pr-10`} value={r.fuel} onChange={(e) => set('fuel')(e.target.value)}>
              {form.fuels.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-gear" className={label}>Boîte</label>
            <select id="f-gear" className={`${input} select-arrow pr-10`} value={r.gearbox} onChange={(e) => set('gearbox')(e.target.value)}>
              {form.gearboxes.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-country" className={label}>Pays de résidence *</label>
            <input id="f-country" className={input} required autoComplete="country-name" placeholder="ex. France, Allemagne, Italie…" value={r.country} onChange={(e) => set('country')(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-city" className={label}>Livraison à (ville)</label>
            <input id="f-city" className={input} placeholder="ex. Tunis, Sfax, Sousse…" value={r.city} onChange={(e) => set('city')(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-name" className={label}>Votre nom *</label>
            <input id="f-name" className={input} required autoComplete="name" value={r.name} onChange={(e) => set('name')(e.target.value)} />
          </div>
          <div className="flex flex-col justify-between gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" className={`${btn.red} btn-shine !px-6 !py-4 !text-sm`}><WaIcon />Envoyer sur WhatsApp</button>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mute">* obligatoire</p>
          </div>
          <p id="req-err" role="alert" className="text-sm text-[#FF8A92] sm:col-span-2" hidden={!error}>{error}</p>
        </form>
      </Wrap>
    </section>
  )
}
