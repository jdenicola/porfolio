import { useState } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useI18n } from '../context/I18nContext'
import { withBasePath } from '../lib/basePath'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useI18n()
  const returnTo = (location.state as any)?.returnTo || '/'

  if (isAuthenticated) return <Navigate to={returnTo} replace />

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(username, password)
      navigate(returnTo, { replace: true })
    } catch (err: any) {
      setError(err?.message || t('login.failed', 'Login failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Paper elevation={3} className="w-full max-w-sm">
        <Box component="form" onSubmit={onSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <img src={withBasePath('vite.svg')} alt={t('header.alt.logo', 'logo')} className="h-6 w-6" />
            <Typography variant="h6">{t('login.signIn', 'Sign in')}</Typography>
          </div>
          <TextField
            label={t('login.username', 'Username')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <TextField
            label={t('login.password', 'Password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? t('login.signingIn', 'Signing in...') : t('login.signIn', 'Sign in')}
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
