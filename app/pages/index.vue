<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '~/stores/main.store'

const store = useMainStore()
store.load()

const idle = computed(() =>
  store.theme === 'none' && !store.q && !store.favOnly
)
const emptyResults = computed(
  () => !idle.value && store.totalVisible === 0
)
</script>

<template>
  <div>
    <HeroBar />
    <ToolbarSearch />
    <main id="contenu-principal">
      <VoiceTranslator />
      <p class="count" role="status" aria-live="polite">
        {{ store.totalVisible > 0 ? `${store.totalVisible} phrase${store.totalVisible > 1 ? 's' : ''}` : '' }}
      </p>
      <div id="content">
        <template v-if="idle">
          <div class="empty">
            <div class="big">👆</div>
            Choisissez un thème ci-dessus<br>pour afficher les phrases.
          </div>
        </template>
        <template v-else-if="emptyResults">
          <div class="empty">
            <div class="big">🔍</div>
            Aucune phrase trouvée.<br>Essaie un autre mot.
          </div>
        </template>
        <PhraseSection
          v-for="group in store.visibleGroups"
          :key="group.id"
          :group="group"
        />
      </div>
    </main>
  </div>
</template>
