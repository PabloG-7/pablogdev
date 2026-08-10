import { useState, useEffect, useCallback } from 'react'
import { translations, type Language, type TranslationKey } from '../data/translations'

export function useLanguage() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang') as Language | null
    return saved || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang]?.[key] || translations.pt[key] || key
    },
    [lang]
  )

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang)
  }, [])

  return { lang, t, setLanguage }
}