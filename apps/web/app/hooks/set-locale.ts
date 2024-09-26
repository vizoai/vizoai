import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export function useLocale() {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const [locale, setLocale] = useState(lang)

  useEffect(() => {
    fetch('/action/set-locale', {
      method: 'POST',
      body: JSON.stringify({ locale: lang }),
    })
    setLocale(lang)
  }, [i18n.language])

  return [
    locale,
    (locale: string) => {
      i18n.changeLanguage(locale)
    },
  ] as const
}
