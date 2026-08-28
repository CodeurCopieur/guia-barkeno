import { defineStore } from 'pinia'
import { THEMES } from '~/utils/themes'

export interface HistItem {
  src: string
  dst: string
  from: string
  to: string
  t: number
}

const HIST_MAX = 50
const T_CACHE_MAX = 200

export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 'none' as string,
    favOnly: false,
    q: '',
    favs: new Set<string>(),
    hist: [] as HistItem[],
    tCache: {} as Record<string, string>,
  }),

  getters: {
    totalPhrases: () => THEMES.reduce((a, t) => a + t.phrases.length, 0),
    totalThemes: () => THEMES.length,
    // Rendu des phrases filtrées selon l'état (thème / favoris / recherche)
    visibleGroups(state) {
      const showAll = !!state.q || state.theme === 'all'
      return THEMES
        .filter(t => showAll || state.theme === t.id)
        .map(t => ({
          ...t,
          rows: t.phrases
            .map((p, idx) => ({ ...p, key: `${t.id}|${idx}` }))
            .filter((p) => {
              if (state.favOnly && !state.favs.has(p.key)) return false
              if (state.q && !(`${norm(p.es)} ${norm(p.fr)}`).includes(state.q)) return false
              return true
            }),
        }))
        .filter(t => t.rows.length > 0)
    },
    totalVisible(state) {
      return state.q || state.theme !== 'none' || state.favOnly
        ? state.visibleGroups.reduce((a, g) => a + g.rows.length, 0)
        : 0
    },
  },

  actions: {
    load() {
      if (import.meta.server) return
      try {
        this.favs = new Set(JSON.parse(localStorage.getItem('barcelone-favs') || '[]'))
      } catch { this.favs = new Set() }
      try {
        this.hist = JSON.parse(localStorage.getItem('barcelone-hist') || '[]')
      } catch { this.hist = [] }
      try {
        this.tCache = JSON.parse(localStorage.getItem('barcelone-tcache') || '{}')
      } catch { this.tCache = {} }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.getVoices()
      }
    },

    saveFavs() {
      if (import.meta.server) return
      localStorage.setItem('barcelone-favs', JSON.stringify([...this.favs]))
    },

    toggleFav(key: string) {
      if (this.favs.has(key)) this.favs.delete(key)
      else this.favs.add(key)
      this.saveFavs()
    },

    setTheme(id: string) {
      this.theme = id
      this.favOnly = false
    },

    setFavOnly() {
      this.theme = 'all'
      this.favOnly = true
    },

    setQuery(q: string) {
      this.q = q.trim()
    },

    clearQuery() {
      this.q = ''
    },

    saveHist() {
      if (import.meta.server) return
      try {
        localStorage.setItem('barcelone-hist', JSON.stringify(this.hist))
      } catch {
        this.hist = this.hist.slice(0, Math.floor(this.hist.length / 2))
        try { localStorage.setItem('barcelone-hist', JSON.stringify(this.hist)) } catch { /* noop */ }
      }
    },

    addHist(src: string, dst: string, from: string, to: string) {
      if (!dst || /indisponible/i.test(dst)) return
      if (this.hist[0] && this.hist[0].src === src && this.hist[0].dst === dst) return
      this.hist.unshift({ src, dst, from, to, t: Date.now() })
      this.hist = this.hist.slice(0, HIST_MAX)
      this.saveHist()
    },

    deleteHist(i: number) {
      this.hist.splice(i, 1)
      this.saveHist()
    },

    clearHist() {
      this.hist = []
      this.saveHist()
    },

    saveTCache() {
      if (import.meta.server) return
      try {
        localStorage.setItem('barcelone-tcache', JSON.stringify(this.tCache))
      } catch { /* noop */ }
    },

    clearCache() {
      this.tCache = {}
      this.saveTCache()
    },

    trimCache() {
      const keys = Object.keys(this.tCache)
      while (keys.length > T_CACHE_MAX) delete this.tCache[keys.shift()!]
    },
  },
})

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
