import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useI18n } from '../context/I18nContext'

export function SettingsPage() {
  const { t } = useI18n()
  return (
    <Container className="py-6 text-slate-900 dark:text-slate-100">
      <Typography variant="h5" className="mb-2">{t('settings.title', 'Settings')}</Typography>
      <Typography variant="body1">{t('settings.comingSoon', 'Coming soon.')}</Typography>
    </Container>
  )
}
