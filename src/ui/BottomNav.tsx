import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { MdHome, MdSettings, MdInfo, MdWork } from 'react-icons/md'
import { useI18n } from '../context/I18nContext'

type NavItem = { label: string; value: string; icon: ReactNode }

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useI18n()

  const navItems: NavItem[] = [
    { label: t('nav.home', 'Home'), value: '/', icon: <MdHome size={22} /> },
    { label: t('nav.portfolio', 'Portfolio'), value: '/portfolio', icon: <MdWork size={22} /> },
    { label: t('nav.settings', 'Settings'), value: '/settings', icon: <MdSettings size={22} /> },
    { label: t('nav.about', 'About'), value: '/about', icon: <MdInfo size={22} /> },
  ]

  // Map current path to a value in navItems, fallback to '/'
  const current = navItems.find((i) => location.pathname === i.value)?.value || '/'

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={current}
        onChange={(_, newValue: string) => navigate(newValue)}
      >
        {navItems.map((i) => (
          <BottomNavigationAction key={i.value} value={i.value} label={i.label} icon={i.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
