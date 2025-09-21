import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { getPostById, updatePost, createPost } from '../services/posts'
import type { Post } from '../types/post'
import { WysiwygEditor } from '../ui/WysiwygEditor'
import { useI18n } from '../context/I18nContext'

export function PostEditPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { t } = useI18n()
  const isCreate = !id || id === 'new'

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (isCreate) {
        setLoading(false)
        return
      }
      if (!id) return
      try {
        const data = await getPostById(id)
        if (!mounted) return
        if (!data) {
          setError(t('admin.posts.notFound', 'Post not found'))
        } else {
          setPost(data)
          setTitle(data.title)
          setBody(data.body || '')
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || t('admin.posts.loadError', 'Failed to load post'))
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [id])

  const onSave = async () => {
    setSaving(true)
    setError(null)
    try {
      if (isCreate) {
        const newId = 'p' + Date.now()
        await createPost({ id: newId, title, body })
      } else if (id) {
        await updatePost({ id, title, body })
      }
      navigate(-1)
    } catch (e: any) {
      setError(e?.message || t('admin.posts.saveError', 'Failed to save post'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-4">{t('posts.loading', 'Loading...')}</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!isCreate && !post) return null

  return (
    <Box className="p-4">
      <Paper elevation={3} className="p-4">
        <Stack spacing={2}>
          <Typography variant="h6">
            {isCreate ? t('admin.posts.creating', 'Create Post') : `${t('admin.posts.editing', 'Editing')} – ${post?.id}`}
          </Typography>
          <TextField label={t('admin.posts.title', 'Title')} value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <WysiwygEditor value={body} onChange={setBody} />
          <Box className="flex justify-between">
            <Button variant="text" onClick={() => navigate(-1)}>{t('common.back', 'Go back')}</Button>
            <Button variant="contained" onClick={onSave} disabled={saving}>
              {saving ? t('common.saving', 'Posting...') : t('common.save', 'Post')}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
