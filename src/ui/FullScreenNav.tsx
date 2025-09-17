import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { menuItems } from '../data/menuItems'
import { useI18n } from '../context/I18nContext'

export function FullScreenNav() {
  const navigate = useNavigate()
  const items = menuItems.filter((m) => m.path && m.action !== 'logout')
  const { t } = useI18n()

  return (
    <Box className="min-h-[calc(100vh-64px)] p-4 flex flex-col gap-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.label}
            variant="contained"
            color="primary"
            size="large"
            className="w-full flex-1 flex items-center justify-center gap-2"
            onClick={() => navigate(item.path!)}
          >
            {Icon ? <Icon size={22} /> : null}
            {t('menu.' + item.label, item.label)}
          </Button>
        )
      })}
    </Box>
  )
}
