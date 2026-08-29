# Guia Barkeno · Phrases essentielles pour Barcelone

**Guia Barkeno** (le "guide de Barcelone" en catalan) est une application web qui aide les voyageurs à Barcelone à communiquer en espagnol et en catalan. Elle propose des phrases utiles pour chaque situation du quotidien, avec traduction et prononciation vocale.

## Description

L'objectif du projet est simple : rendre la barrière de la langue moins intimidante lors d'un voyage à Barcelone. L'application regroupe des phrases essentielles par catégories (se présenter, commander au restaurant, demander son chemin, faire des achats, urgence, etc.), chacune accompagnée de sa traduction et d'une prononciation vocale pour bien articuler.

Une fonctionnalité de traduction vocale permet également de convertir et de prononcer des phrases en direct.

## Stack technique

| Domaine | Technologie |
|---------|-------------|
| Framework | [Nuxt 4](https://nuxt.com) (Vue 3) |
| UI | Vue 3, Vue Router |
| État global | [Pinia](https://pinia.vuejs.org) + `@pinia/nuxt` |
| Langage | TypeScript |
| Style | CSS (assets globaux) |
| API navigateurs | Web Speech API (synthèse vocale / prononciation) |
| Génération | `nuxt generate` (site statique) + `nuxt build` |

## Scripts

```bash
npm run dev        # Serveur de développement
npm run build      # Compilation de production
npm run generate   # Génération du site statique
npm run preview    # Prévisualiser la version générée
```

## Fonctionnalités

- Phrases essentielles classées par catégorie
- Traduction espagnol / catalan
- Prononciation vocale (Web Speech API)
- Traducteur vocal en direct
- Recherche rapide dans les phrases
- Thèmes personnalisables

## Tags

`nuxt` · `vue3` · `typescript` · `barcelone` · `travel` · `phrases` · `catalan` · `espagnol` · `prononciation` · `speech` · `pinia` · `pwa`
