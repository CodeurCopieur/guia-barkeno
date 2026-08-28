<script setup lang="ts">
defineProps<{
  group: {
    id: string
    icon: string
    name: string
    rows: Array<{ es: string; fr: string; key: string }>
  }
}>()
</script>

<template>
  <section>
    <h2>{{ group.icon }} {{ group.name }} <span class="n">{{ group.rows.length }}</span></h2>
    <PhraseSlider :rows="group.rows" />
  </section>
</template>
