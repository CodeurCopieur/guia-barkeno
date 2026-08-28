<script setup lang="ts">
import { useMainStore } from '~/stores/main.store'

const store = useMainStore()
</script>

<template>
  <header class="hero">
    <span class="series-badge" aria-hidden="true">🧳 Guide de voyage · <strong>01</strong> / plusieurs</span>
    <h1>Barcelona <span class="flag" aria-hidden="true">🇪🇸</span></h1>
    <p class="lede">Español → Français · appuyez sur le haut-parleur 🔊 pour écouter la prononciation</p>
    <p class="intro">Le guide simple et rassurant pour les <strong>grands débutants</strong> : toutes les phrases indispensables pour profiter de ton séjour l'esprit tranquille. 😌</p>
    <div class="hero-stats" aria-hidden="true">
      <span><strong>{{ store.totalPhrases }}</strong> phrases</span>
      <span><strong>{{ store.totalThemes }}</strong> thèmes</span>
      <span><strong>3</strong> langues</span>
    </div>
  </header>
</template>
