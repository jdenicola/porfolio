import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ThemeDemoCard } from '../ui/ThemeDemoCard'
import { useI18n } from '../context/I18nContext'

export function AboutPage() {
  const { t } = useI18n()
  return (
    <Container className="py-6 text-slate-900 dark:text-slate-100">
      <Typography variant="h4" className="mb-4">{t('header.brand', 'JDENICOLA')} ({import.meta.env?.VITE_PRELOAD})</Typography>
      <Typography variant="h5" className="mb-2">{t('about.title', 'About')}</Typography>
      <Typography variant="body1">{t('about.description', 'This is a starter using React, Vite, MUI 6, and Tailwind CSS.')}</Typography>
      <ThemeDemoCard />
    </Container>
  )
}
