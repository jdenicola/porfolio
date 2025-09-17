import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import type { Post, Linkable } from '../types/post'
import { useI18n } from '../context/I18nContext'

function renderLinkable(v?: Linkable, emptyFallback?: string) {
  if (!v) return emptyFallback || ''
  if (typeof v === 'string') return v
  if (v && typeof v === 'object' && 'url' in v) {
    const label = (v as any).value ?? ''
    const url = (v as any).url as string
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="text-blue-600 dark:text-blue-400 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {label}
      </a>
    )
  }
  return ''
}

export function PostCardContent({ post }: { post: Post }) {
  const { t } = useI18n()

  return (
    <CardContent>
      <Typography variant="h6" className="mb-2">{post.title}</Typography>
      <Typography variant="body2" className="mb-3 line-clamp-3">
        {post.excerpt}
      </Typography>
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
        <span>{renderLinkable(post.author, t('posts.unknownAuthor', 'Unknown'))}</span>
        <span>{renderLinkable(post.date, '')}</span>
      </div>
      {post.url ? (
        <Button component="a" href={post.url} target="_blank" rel="noreferrer noopener" variant="contained" size="small">
          {t('posts.readMore', 'Read more')}
        </Button>
      ) : (
        <Button variant="contained" size="small">{t('posts.readMore', 'Read more')}</Button>
      )}
    </CardContent>
  )
}

