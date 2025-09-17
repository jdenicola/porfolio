import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './context/AuthContext'
import { AppThemeProvider } from './context/ThemeContext'
import { AppRouter } from './router/AppRouter'
import { I18nProvider } from './context/I18nContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <I18nProvider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </I18nProvider>
    </AppThemeProvider>
  </StrictMode>,
)
