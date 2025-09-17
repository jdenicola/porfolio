import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { menuItems } from '../data/menuItems'
import { useThemeMode } from '../context/ThemeContext'
import { useI18n } from '../context/I18nContext'

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { mode, toggleMode } = useThemeMode()
  const { lang, setLang, t } = useI18n()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const handleItem = (path?: string, action?: 'logout') => {
    handleClose()
    if (action === 'logout') {
      logout()
      navigate('/login', { replace: true })
      return
    }
    if (path) navigate(path)
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex items-center justify-between">
        <Box className="flex items-center gap-2">
          <img src="/vite.svg" alt={t('header.alt.logo', 'logo')} className="h-6 w-6" />
          <Typography variant="h6" component="div">
            {t('header.brand', 'JDENICOLA')}
          </Typography>
        </Box>
        <div className="flex items-center gap-1">
          <FormControl size="small" variant="outlined" className="min-w-[90px] mr-1">
            <InputLabel id="lang-select-label" sx={{ color: 'inherit' }}>
              Lang
            </InputLabel>
            <Select
              labelId="lang-select-label"
              id="lang-select"
              value={lang}
              label={t('lang.' + lang, lang)}
              onChange={(e: SelectChangeEvent) => setLang(e.target.value as any)}
              aria-label={t('header.aria.language', 'Language')}
              sx={{ color: 'inherit', borderColor: 'inherit' }}
            >
              <MenuItem value="ENG">{t('lang.ENG', 'ENG')}</MenuItem>
              <MenuItem value="SPA">{t('lang.SPA', 'SPA')}</MenuItem>
            </Select>
          </FormControl>
          <IconButton size="large" color="inherit" aria-label={t('header.aria.toggleTheme', 'Toggle theme')} onClick={toggleMode}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton
            size="large"
            aria-label={t('header.aria.menu', 'Menu')}
            aria-controls={open ? 'main-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="main-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.label} onClick={() => handleItem(item.path, item.action)}>
                {t('menu.' + item.label, item.label)}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
