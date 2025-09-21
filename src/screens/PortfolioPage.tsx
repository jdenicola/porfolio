import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Portfolio } from '../ui/Portfolio'
import type { BioData } from '../types/bio'
import { useI18n } from '../context/I18nContext'
import { withBasePath } from '../lib/basePath'

export function PortfolioPage() {
  const [bio, setBio] = useState<BioData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { t } = useI18n()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        console.log(withBasePath('bio.json'))
        const res = await fetch(withBasePath('bio.json'))
        if (!res.ok) throw new Error(t('portfolio.error.load', 'Failed to load bio'))
        const data = (await res.json()) as BioData
        if (mounted) setBio(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || t('portfolio.error.load', 'Failed to load bio'))
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <Container className="py-6 text-slate-900 dark:text-slate-100">
      <Typography variant="h5" className="mb-4">{t('portfolio.title', 'Portfolio')}</Typography>
      {error && <div className="text-red-500">{error}</div>}
      {!bio && !error && <div>{t('common.loading', 'Loading...')}</div>}
      {bio && <Portfolio data={bio} />}
    </Container>
  )
}
