import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { PostsGrid } from '../ui/PostsGrid'
import { useI18n } from '../context/I18nContext'

export function HomePage() {
  const { t } = useI18n()
  return (
    <Box className="bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="px-4 pt-4">
        <Typography variant="h5" className="mb-4">{t('home.latestPosts', 'Latest Posts')}</Typography>
      </div>
      <PostsGrid />
    </Box>
  )
}
