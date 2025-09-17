import type { IconType } from 'react-icons'
import { MdHome, MdSettings, MdInfo, MdLogout, MdWork } from 'react-icons/md'

export type MenuItemDef = {
  label: string
  path?: string
  requiresAuth?: boolean
  action?: 'logout'
  icon?: IconType
}

export const menuItems: MenuItemDef[] = [
  { label: 'Home', path: '/', requiresAuth: true, icon: MdHome },
  { label: 'Portfolio', path: '/portfolio', requiresAuth: true, icon: MdWork },
  { label: 'Settings', path: '/settings', requiresAuth: true, icon: MdSettings },
  { label: 'About', path: '/about', requiresAuth: true, icon: MdInfo },
  { label: 'Logout', action: 'logout', requiresAuth: true, icon: MdLogout },
]
