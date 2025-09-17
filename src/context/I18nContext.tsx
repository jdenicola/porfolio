import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type LangCode = 'ENG' | 'SPA'

type Dict = Record<string, string>

type I18nContextValue = {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: (key: string, fallback?: string) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

// Import dictionaries statically so bundlers include them
import eng from '../i18n/eng.json'
import spa from '../i18n/spa.json'

const dictionaries: Record<LangCode, Dict> = {
  ENG: eng as Dict,
  SPA: spa as Dict,
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem('lang') as LangCode | null) : null
    return stored || 'ENG'
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {}
  }, [lang])

  const setLang = (l: LangCode) => setLangState(l)

  const t = useMemo(() => {
    return (key: string, fallback?: string) => {
      const dict = dictionaries[lang] || {}
      return (dict[key] as string) ?? fallback ?? key
    }
  }, [lang])

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
