// Two languages, two prerendered pages: French at / (default, x-default) and English at /en/.
// The language comes from the URL, so the prerendered HTML and the hydrated app always agree.
import { createContext, useContext } from 'react'

export type Lang = 'fr' | 'en'
export const langs: Lang[] = ['fr', 'en']

export const LangContext = createContext<Lang>('fr')
export const useLang = () => useContext(LangContext)

export const homePath = (l: Lang) => (l === 'fr' ? '/' : '/en/')
export const langFromPath = (p: string): Lang => (/^\/en(\/|$)/.test(p) ? 'en' : 'fr')

/** A string in both languages. */
export type L = { fr: string; en: string }
export const tr = (s: L, l: Lang) => s[l]

/** 12/02/2026 in French, 12 Feb 2026 in English. */
export function fmtDate(iso: string | null, l: Lang) {
  if (!iso) return ''
  if (l === 'fr') return iso.split('-').reverse().join('/')
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1]} ${y}`
}

/** 5,0 in French, 5.0 in English. */
export const fmtRating = (v: number, l: Lang) => (l === 'fr' ? v.toFixed(1).replace('.', ',') : v.toFixed(1))
