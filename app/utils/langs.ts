export interface Lang {
  label: string
  locale: string
}

export const LANGS: Record<string, Lang> = {
  fr: { label: '🇫🇷 Français', locale: 'fr-FR' },
  es: { label: '🇪🇸 Español', locale: 'es-ES' },
  ca: { label: 'Català', locale: 'ca-ES' },
}
