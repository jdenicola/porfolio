import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import type { Post } from '../types/post'
import { getPosts } from '../services/posts'
import { useI18n } from '../context/I18nContext'

export function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { t } = useI18n()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getPosts(1, 50)
        if (!mounted) return
        setPosts(data)
      } catch (e: any) {
        if (mounted) setError(e?.message || t('posts.error.load', 'Failed to load posts'))
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="p-4">{t('posts.loading', 'Loading...')}</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <Box className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h5">{t('admin.posts.title', 'Manage Posts')}</Typography>
        <Button variant="contained" onClick={() => navigate('/admin/posts/new')}>
          {t('admin.posts.new', 'New Post')}
        </Button>
      </div>
      <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
        {posts.map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className="h-full bg-white/80 dark:bg-slate-800/80">
              {post.image && (
                <CardMedia component="img" image={post.image} alt={post.title} sx={{ height: 160, objectFit: 'cover' }} />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">{post.excerpt}</Typography>
              </CardContent>
              <CardActions className="justify-end">
                <Button size="small" variant="outlined" onClick={() => navigate(`/admin/posts/${post.id}/edit`)}>
                  {t('admin.posts.edit', 'Edit')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
