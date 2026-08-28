import { useMainStore } from '~/stores/main.store'
import { norm } from '~/utils/text'

/** Traduction via plusieurs providers Google/MyMemory, avec cache dans le store. */
export function useTranslate() {
  const store = useMainStore()

  const cacheKey = (text: string, from: string, to: string) =>
    `${norm(text)}|${from}|${to}`

  async function viaGoogle(text: string, from: string, to: string) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(text)}`
    const ctl = new AbortController()
    const timer = setTimeout(() => ctl.abort(), 10000)
    try {
      const r = await fetch(url, { signal: ctl.signal })
      if (!r.ok) throw new Error('http ' + r.status)
      const j = await r.json()
      const t = j && j[0] ? j[0].map((seg: any[]) => seg && seg[0] ? seg[0] : '').join('') : ''
      if (!t) throw new Error('no translation')
      return t
    } finally { clearTimeout(timer) }
  }

  async function viaGoogleMirror(text: string, from: string, to: string) {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&q=${encodeURIComponent(text)}`
    const ctl = new AbortController()
    const timer = setTimeout(() => ctl.abort(), 10000)
    try {
      const r = await fetch(url, { signal: ctl.signal })
      if (!r.ok) throw new Error('http ' + r.status)
      const j = await r.json()
      const flat = (Array.isArray(j) ? j : [j])
        .map(x => Array.isArray(x) ? x.join('') : String(x)).join('')
      if (!flat) throw new Error('no translation')
      return flat
    } finally { clearTimeout(timer) }
  }

  async function viaMyMemory(text: string, from: string, to: string) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    const ctl = new AbortController()
    const timer = setTimeout(() => ctl.abort(), 10000)
    try {
      const r = await fetch(url, { signal: ctl.signal })
      if (!r.ok) throw new Error('http ' + r.status)
      const j = await r.json()
      const t = j && j.responseData && j.responseData.translatedText
      if (!t || /MYMEMORY WARNING/i.test(t)) throw new Error('no translation')
      return t
    } finally { clearTimeout(timer) }
  }

  async function translate(text: string, from: string, to: string) {
    const k = cacheKey(text, from, to)
    if (store.tCache[k]) return store.tCache[k]
    const providers = [viaGoogleMirror, viaGoogle, viaMyMemory]
    let lastErr: unknown = null
    for (const p of providers) {
      try {
        const t = await p(text, from, to)
        store.tCache[k] = t
        store.trimCache()
        store.saveTCache()
        return t
      } catch (e) { lastErr = e }
    }
    throw lastErr || new Error('no translation available')
  }

  return { translate }
}
