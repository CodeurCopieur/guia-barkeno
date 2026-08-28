import { ref } from 'vue'

/** Clé du bouton actuellement en lecture (null si aucun). */
const activeKey = ref<string | null>(null)

let voices: SpeechSynthesisVoice[] = []
let voicesLoaded = false

function ensureVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  // getVoices() renvoie parfois une liste vide au premier appel :
  // il faut attendre l'événement voiceschanged.
  const list = window.speechSynthesis.getVoices()
  if (list.length) {
    voices = list
    voicesLoaded = true
  } else if (!voicesLoaded) {
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices() || []
      voicesLoaded = true
    }
  }
}

/** Retourne la meilleure voix pour la langue (ex. "es-ES" → voix espagnole). */
function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const code = lang.toLowerCase().slice(0, 2) // es / fr / ca
  // 1. Voix exacte pour la locale (ex. es-ES)
  const exact = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
  if (exact) return exact
  // 2. Voix dont la langue commence par le code (es, ca...)
  const byCode = voices.find(v => v.lang.toLowerCase().startsWith(code))
  if (byCode) return byCode
  // 3. Voix locale (attention au tri des balises locales ex. es-MX, es-AR)
  return voices
    .filter(v => v.lang.toLowerCase().startsWith(code))
    .find(v => v.localService)
}

export function useSpeech() {
  const available = typeof window !== 'undefined' && 'speechSynthesis' in window

  if (available) ensureVoices()

  function speak(key: string, text: string, lang: string) {
    if (!available) return
    window.speechSynthesis.cancel()
    activeKey.value = key

    const u = new SpeechSynthesisUtterance(text.replace(/…/g, '.'))
    u.rate = 0.85

    // Force une vraie voix de la langue demandée (sinon le navigateur
    // lit avec la voix par défaut du système, d'où la lecture "française").
    ensureVoices()
    const voice = pickVoice(lang)
    if (voice) {
      u.voice = voice
      u.lang = voice.lang
    } else {
      u.lang = lang
    }

    const clear = () => {
      if (activeKey.value === key) activeKey.value = null
    }
    u.onend = clear
    u.onerror = clear
    window.speechSynthesis.speak(u)
  }

  function stop() {
    if (!available) return
    window.speechSynthesis.cancel()
    activeKey.value = null
  }

  /** true si ce bouton (clé) est en lecture. */
  function isPlaying(key: string) {
    return activeKey.value === key
  }

  return { speak, stop, isPlaying }
}
