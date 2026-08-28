<script setup lang="ts">
defineProps<{
  title: string
  updated: string
}>()
</script>

<template>
  <main id="contenu-principal" class="legal">
    <div class="legal-wrap">
      <NuxtLink to="/" class="legal-back" aria-label="Retour à l'accueil">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 4l-8 8 8 8z"/></svg>
        Retour au guide
      </NuxtLink>
      <header class="legal-hero">
        <span class="legal-series">🧳 Guide de voyage · Barcelona</span>
        <h1>{{ title }}</h1>
        <p class="legal-updated">Dernière mise à jour : {{ updated }}</p>
      </header>
      <div class="legal-content">
        <slot />
      </div>
    </div>
  </main>
</template>
