import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useThemeMode } from '../context/ThemeContext'
import { useI18n } from '../context/I18nContext'

export function ThemeDemoCard() {
  const { mode, toggleMode } = useThemeMode()
  const { t } = useI18n()

  return (
    <Card
      className="mt-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
      elevation={0}
    >
      <CardContent>
        <Typography variant="h6" className="mb-2">{t('theme.demoTitle', 'Theme demo')}</Typography>
        <Typography variant="body2" className="mb-4">
          {t('theme.currentMode', 'Current mode:')} <span className="font-semibold">{t(`theme.mode.${mode}`, mode)}</span>. {t('theme.mixInfo', 'This card mixes MUI components with Tailwind dark/light utilities.')}
        </Typography>
        <Box className="flex gap-2">
          <Button variant="contained" onClick={toggleMode}>{t('theme.toggle', 'Toggle theme')}</Button>
          <Button variant="outlined" className="dark:border-slate-500 dark:text-slate-100">{t('theme.outlinedExample', 'Outlined example')}</Button>
        </Box>
      </CardContent>
    </Card>
  )
}
