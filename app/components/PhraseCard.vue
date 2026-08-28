<script setup lang="ts">
import { useMainStore } from '~/stores/main.store'
import { useSpeech } from '~/composables/useSpeech'
import { hi } from '~/utils/text'

const props = defineProps<{
  es: string
  fr: string
  fkey: string
}>()

const store = useMainStore()
const { speak, isPlaying } = useSpeech()

function toggleFav() {
  store.toggleFav(props.fkey)
}
</script>

<template>
  <div class="card">
    <div class="top">
      <div class="es" v-html="hi(es, store.q)"></div>
      <div class="actions">
        <button
          type="button"
          class="btn say"
          :class="{ playing: isPlaying(`say-${fkey}`) }"
          :aria-label="`Écouter : ${es}`"
          @click="speak(`say-${fkey}`, es, 'es-ES')"
        >
          <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        </button>
        <button
          type="button"
          class="btn fav"
          :class="{ on: store.favs.has(fkey) }"
          :aria-label="`Favori : ${es}`"
          :aria-pressed="store.favs.has(fkey)"
          @click="toggleFav"
        >
          <svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </button>
      </div>
    </div>
    <div class="fr" v-html="hi(fr, store.q)"></div>
  </div>
</template>
