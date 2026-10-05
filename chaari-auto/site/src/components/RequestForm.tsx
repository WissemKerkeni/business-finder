import { useState, type FormEvent } from 'react'
import { business as b, form, requestMessage, wa, type Request } from '../data/business'
import { useCopy } from '../data/copy'
import { useLang } from '../i18n'
import { SectionTitle, WaIcon, Wrap, btn } from './ui'

const input = 'w-full rounded-[3px] border border-line bg-raised px-4 py-3.5 text-base text-chalk placeholder:text-[#6E6E73] focus:border-signal-text focus:outline-none'
const label = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-dim'

const empty: Request = { link: '', model: '', open: false, year: '', fuel: 0, gearbox: 0, budget: '', country: '', city: '', name: '' }

/** "Votre demande": no backend, no storage, no analytics. Submitting opens WhatsApp with the filled fields, one per line.
 *  A Mobile.de link can replace the make and model. */
export default function RequestForm() {
  const lang = useLang()
  const t = useCopy().form
  const [r, setR] = useState<Request>(empty)
  const [error, setError] = useState('')
  const set = <K extends keyof Request>(k: K) => (v: Request[K]) => setR((x) => ({ ...x, [k]: v }))

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const link = r.link.trim()
    if (link && !/^https?:\/\/\S+$/i.test(link)) {
      setError(t.badLink)
      document.getElementById('f-link')?.focus()
      return
    }
    const missing = [
      !link && !r.model.trim() && !r.open && ['f-link', t.missingModel],
      !r.country.trim() && ['f-country', t.missingCountry],
      !r.name.trim() && ['f-name', t.missingName],
    ].find(Boolean) as [string, string] | undefined
    if (missing) {
      setError(`${t.missing} ${missing[1]}.`)
      document.getElementById(missing[0])?.focus()
      return
    }
    setError('')
    window.open(wa(requestMessage(r, lang)), '_blank', 'noopener')
  }

  return (
    <section id="demande" aria-labelledby="demande-title" className="border-b border-line bg-ink py-12 md:py-16 lg:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <SectionTitle eyebrow={t.eyebrow} id="demande-title" className="mb-6">{t.title}</SectionTitle>
          <p className="mb-6 max-w-md leading-relaxed text-chalk-2">{t.lead}</p>
          <p className="font-mono text-xs uppercase tracking-wider text-dim">
            {t.direct} <a href={wa()} target="_blank" rel="noopener noreferrer" className="text-white hover:text-signal-text">{b.phone}</a>
          </p>
        </div>
        <form onSubmit={submit} noValidate className="grid gap-x-6 gap-y-5 sm:grid-cols-2" aria-describedby="req-err" data-reveal>
          <div className="rounded-[4px] border border-signal/60 bg-signal/10 p-4 sm:col-span-2 sm:p-5">
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <label htmlFor="f-link" className={`${label} !mb-0 !text-chalk`}>{t.link}</label>
              <a href={b.mobileDe} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal-text hover:text-white">{t.openMobile} ↗</a>
            </div>
            <input id="f-link" type="url" inputMode="url" className={input} autoComplete="off" placeholder={t.linkPh} value={r.link} onChange={(e) => set('link')(e.target.value)} aria-describedby="f-link-hint" />
            <p id="f-link-hint" className="mt-2 text-sm text-chalk-2">{t.linkHint}</p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-model" className={label}>{t.model}</label>
            <input id="f-model" className={input} autoComplete="off" placeholder={t.modelPh} value={r.model} onChange={(e) => set('model')(e.target.value)} />
          </div>
          <label className="-mt-2 flex items-center gap-3 text-sm text-chalk-2 sm:col-span-2">
            <input id="f-open" type="checkbox" className="h-5 w-5 accent-signal" checked={r.open} onChange={(e) => set('open')(e.target.checked)} />
            {t.open}
          </label>
          <div>
            <label htmlFor="f-year" className={label}>{t.year}</label>
            <input id="f-year" className={input} inputMode="numeric" placeholder={t.yearPh} value={r.year} onChange={(e) => set('year')(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-budget" className={label}>{t.budget}</label>
            <input id="f-budget" className={input} placeholder={t.budgetPh} value={r.budget} onChange={(e) => set('budget')(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-fuel" className={label}>{t.fuel}</label>
            <select id="f-fuel" className={`${input} select-arrow pr-10`} value={r.fuel} onChange={(e) => set('fuel')(Number(e.target.value))}>
              {form.fuels.map((o, i) => <option key={o.fr} value={i}>{o[lang]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-gear" className={label}>{t.gearbox}</label>
            <select id="f-gear" className={`${input} select-arrow pr-10`} value={r.gearbox} onChange={(e) => set('gearbox')(Number(e.target.value))}>
              {form.gearboxes.map((o, i) => <option key={o.fr} value={i}>{o[lang]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-country" className={label}>{t.country} *</label>
            <input id="f-country" className={input} required autoComplete="country-name" placeholder={t.countryPh} value={r.country} onChange={(e) => set('country')(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-city" className={label}>{t.city}</label>
            <input id="f-city" className={input} placeholder={t.cityPh} value={r.city} onChange={(e) => set('city')(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-name" className={label}>{t.name} *</label>
            <input id="f-name" className={input} required autoComplete="name" value={r.name} onChange={(e) => set('name')(e.target.value)} />
          </div>
          <div className="flex flex-col justify-between gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" className={`${btn.red} btn-shine !px-6 !py-4 !text-sm`}><WaIcon />{t.send}</button>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mute">{t.required}</p>
          </div>
          <p id="req-err" role="alert" className="text-sm text-[#FF8A92] sm:col-span-2" hidden={!error}>{error}</p>
        </form>
      </Wrap>
    </section>
  )
}
