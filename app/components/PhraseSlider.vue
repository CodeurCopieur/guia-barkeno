<script setup lang="ts">
import { ref, computed } from 'vue'
import { PER_SLIDE } from '~/utils/themes'
import { chunk } from '~/utils/text'

const props = defineProps<{ rows: Array<{ es: string; fr: string; key: string }> }>()

const slides = computed(() => chunk(props.rows, PER_SLIDE))
const idx = ref(0)

const canGoPrev = computed(() => idx.value > 0)
const canGoNext = computed(() => idx.value < slides.value.length - 1)

function go(i: number) {
  idx.value = Math.max(0, Math.min(slides.value.length - 1, i))
}

function onTouchStart(e: TouchEvent) {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
}

function onTouchEnd(e: TouchEvent) {
  if (startX.value == null) return
  const dx = e.changedTouches[0].clientX - startX.value
  const dy = e.changedTouches[0].clientY - startY.value
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    go(idx.value + (dx < 0 ? 1 : -1))
  }
  startX.value = null
  startY.value = null
}

const startX = ref<number | null>(null)
const startY = ref<number | null>(null)
</script>

<template>
  <div
    v-if="slides.length"
    class="slider"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <button
      v-if="slides.length > 1"
      type="button"
      class="s-nav prev"
      aria-label="Phrases précédentes"
      :disabled="!canGoPrev"
      @click="go(idx - 1)"
    >
      <svg viewBox="0 0 24 24"><path d="M15.5 4l-8 8 8 8z"/></svg>
    </button>
    <div class="viewport">
      <div class="track" :style="{ transform: `translateX(-${idx * 100}%)` }">
        <div v-for="(s, i) in slides" :key="i" class="slide">
          <PhraseCard
            v-for="row in s"
            :key="row.key"
            :es="row.es"
            :fr="row.fr"
            :fkey="row.key"
          />
        </div>
      </div>
    </div>
    <button
      v-if="slides.length > 1"
      type="button"
      class="s-nav next"
      aria-label="Phrases suivantes"
      :disabled="!canGoNext"
      @click="go(idx + 1)"
    >
      <svg viewBox="0 0 24 24"><path d="M8.5 4l8 8-8 8z"/></svg>
    </button>
    <div v-if="slides.length > 1" class="s-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        class="s-dot"
        :class="{ on: idx === i }"
        :aria-label="`Page ${i + 1}`"
        @click="go(i)"
      ></button>
    </div>
  </div>
</template>
