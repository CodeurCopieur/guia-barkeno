<script setup lang="ts">
import { ref, computed } from 'vue'
import { THEMES } from '~/utils/themes'
import { useMainStore } from '~/stores/main.store'

const store = useMainStore()
const search = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

interface Chip {
  key: string
  label: string
  active: () => boolean
  pick: () => void
}

const chips = computed<Chip[]>(() => [
  ...THEMES.map(t => ({
    key: t.id,
    label: `${t.icon} ${t.name}`,
    active: () => store.theme === t.id && !store.favOnly,
    pick: () => store.setTheme(t.id),
  })),
  {
    key: 'fav',
    label: '⭐ Favoris',
    active: () => store.favOnly,
    pick: () => store.setFavOnly(),
  },
])

function onInput() {
  store.setQuery(search.value)
}

function onClear() {
  search.value = ''
  store.clearQuery()
  inputEl.value?.focus()
}

function onChipWheel(e: WheelEvent) {
  const el = e.currentTarget as HTMLElement
  if (el.scrollWidth <= el.clientWidth) return
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    el.scrollLeft += e.deltaY
    e.preventDefault()
  }
}
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-inner">
      <div class="search-wrap">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
      </svg>
      <input
        ref="inputEl"
        id="search"
        v-model="search"
        type="search"
        placeholder="Rechercher une phrase ou un mot…"
        aria-label="Rechercher une phrase"
        autocomplete="off"
        @input="onInput"
      >
      <button
        id="clear"
        type="button"
        aria-label="Effacer la recherche"
        :style="{ display: search ? 'block' : 'none' }"
        @click="onClear"
      >×</button>
    </div>
    <nav class="chips" id="chips" aria-label="Thèmes de phrases" @wheel="onChipWheel">
      <button
        v-for="c in chips"
        :key="c.key"
        type="button"
        class="chip"
        :aria-pressed="c.active()"
        @click="c.pick()"
      >{{ c.label }}</button>
    </nav>
    </div>
  </div>
</template>
