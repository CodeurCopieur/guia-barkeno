<script setup lang="ts">
import { ref } from 'vue'
import { LANGS } from '~/utils/langs'
import { useMainStore } from '~/stores/main.store'
import { useTranslate } from '~/composables/useTranslate'
import { useSpeech } from '~/composables/useSpeech'

const store = useMainStore()
const { translate } = useTranslate()
const { speak, isPlaying } = useSpeech()

const srcLang = ref('fr')
const dstLang = ref('es')
const manual = ref('')
const note = ref('')
const open = ref(false)
const showHist = ref(false)

let reqId = 0

function swap() {
  const tmp = srcLang.value
  srcLang.value = dstLang.value
  dstLang.value = tmp
}

async function doTranslate(text: string) {
  const id = ++reqId
  const MAX_TRIES = 4
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    try {
      const t = await translate(text, srcLang.value, dstLang.value)
      if (id !== reqId) return
      note.value = ''
      store.addHist(text, t, srcLang.value, dstLang.value)
      showHist.value = true
      manual.value = ''
      return
    } catch {
      if (id !== reqId) return
      if (attempt < MAX_TRIES) {
        note.value = `Réseau instable… nouvelle tentative ${attempt}/${MAX_TRIES - 1} ⏳`
        await new Promise(r => setTimeout(r, 2500 * attempt))
        if (id !== reqId) return
      } else {
        note.value = 'Traduction indisponible pour le moment 😕 — le texte reste dans le champ, réessaie dans quelques secondes.'
      }
    }
  }
}

function onSubmit() {
  const v = manual.value.trim()
  if (!v) return
  note.value = ''
  doTranslate(v)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    onSubmit()
  }
}

function localeFor(code: string) {
  return LANGS[code] ? LANGS[code].locale : code === 'ca' ? 'ca-ES' : code
}

function confirmClear() {
  if (confirm('Supprimer tout l\'historique des traductions ?')) {
    store.clearHist()
  }
}
</script>

<template>
  <section class="translator">
    <details class="acc">
      <summary aria-label="Ouvrir ou fermer le traducteur vocal">
        <h2>🎤 Traducteur vocal</h2>
        <span class="acc-icon" aria-hidden="true"></span>
      </summary>
      <div class="t-card">
        <div class="t-langs">
          <select v-model="srcLang" aria-label="Langue source">
            <option v-for="(l, code) in LANGS" :key="code" :value="code">{{ l.label }}</option>
          </select>
          <button type="button" class="btn" aria-label="Inverser les langues" @click="swap">⇄</button>
          <select v-model="dstLang" aria-label="Langue cible">
            <option v-for="(l, code) in LANGS" :key="code" :value="code">{{ l.label }}</option>
          </select>
        </div>

        <button type="button" class="hist-btn" @click="showHist = !showHist">
          🕘 Historique des traductions
          <span v-if="store.hist.length" class="h-count">{{ store.hist.length }}</span>
        </button>

        <div v-if="showHist" class="t-history">
          <div class="h-list">
            <template v-if="store.hist.length">
              <div v-for="(h, i) in store.hist" :key="h.t + '-' + i" class="h-item">
                <div class="h-texts">
                  <div class="h-line">
                    <button
                      type="button"
                      class="btn h-say"
                      :class="{ playing: isPlaying(`hist-${i}-src`) }"
                      :aria-label="`Écouter en ${LANGS[h.from] ? LANGS[h.from].label : h.from}`"
                      @click="speak(`hist-${i}-src`, h.src, localeFor(h.from))"
                    >
                      <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </button>
                    <p class="h-src">{{ h.src }}</p>
                  </div>
                  <div class="h-line">
                    <button
                      type="button"
                      class="btn h-say"
                      :class="{ playing: isPlaying(`hist-${i}-dst`) }"
                      aria-label="Écouter la traduction"
                      @click="speak(`hist-${i}-dst`, h.dst, localeFor(h.to))"
                    >
                      <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                    </button>
                    <p class="h-dst">{{ h.dst }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn h-del"
                  :aria-label="`Supprimer cette traduction : ${h.src}`"
                  @click="store.deleteHist(i)"
                >×</button>
              </div>
            </template>
            <p v-else class="h-empty">Aucune traduction enregistrée pour le moment.</p>
          </div>
          <div class="h-actions">
            <button
              v-if="store.hist.length"
              type="button"
              class="hist-clear"
              @click="confirmClear"
            >Tout supprimer</button>
            <button type="button" class="hist-clear" @click="store.clearCache()">Vider le cache</button>
          </div>
        </div>

        <form class="t-form" novalidate @submit.prevent="onSubmit">
          <label class="t-label" for="manualText">Ou écrivez votre phrase ✍️</label>
          <textarea
            id="manualText"
            v-model="manual"
            name="phrase"
            rows="4"
            placeholder="Tapez votre phrase à traduire…"
            autocomplete="off"
            @keydown="onKeydown"
          ></textarea>
          <div class="t-field-foot">
            <span class="t-char" aria-live="polite">{{ manual.length }}</span>
            <button type="submit" class="t-submit"><span>Traduire la phrase</span></button>
          </div>
        </form>
        <p class="t-note" :aria-live="'polite'">{{ note }}</p>
      </div>
    </details>
  </section>
</template>
