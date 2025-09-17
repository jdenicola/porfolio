import { useCallback, useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import type { Post } from '../types/post'
import { getPosts } from '../services/posts'
import { useI18n } from '../context/I18nContext'
import { PostCardContent } from './PostCardContent'

export function PostsGrid() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchingMore, setFetchingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 20
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const { t } = useI18n()

  // Initial load
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getPosts(1, perPage)
        if (!mounted) return
        setPosts(data)
        setHasMore(data.length === perPage)
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

  const loadMore = useCallback(async () => {
    if (loading || fetchingMore || !hasMore) return
    setFetchingMore(true)
    const nextPage = page + 1
    try {
      const data = await getPosts(nextPage, perPage)
      setPosts((prev) => [...prev, ...data])
      setPage(nextPage)
      setHasMore(data.length === perPage)
    } catch (e: any) {
      setError(e?.message || t('posts.error.loadMore', 'Failed to load more posts'))
    } finally {
      setFetchingMore(false)
    }
  }, [page, perPage, loading, fetchingMore, hasMore])

  // Infinite scroll using IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return
    const el = sentinelRef.current

    const observer = new IntersectionObserver(async (entries) => {
      const entry = entries[0]
      if (!entry.isIntersecting) return
      loadMore()
    }, { rootMargin: '200px 0px' })

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  if (loading) return <div className="p-4">{t('posts.loading', 'Loading...')}</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  // moved link rendering logic into PostCardContent

  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-4 p-4 pb-20">
      {posts.map((post) => (
        <article
          key={post.id}
          className={post.featured ? 'xl:col-span-2 md:col-span-1' : 'md:col-span-1'}
        >
          <Card className="h-full bg-white/80 dark:bg-slate-800/80 dark:border-slate-700 overflow-hidden mb-4">
            {post.image && (
              <Box sx={{ maxHeight: 200, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={post.image}
                  alt={post.title}
                  sx={{ width: '100%', maxWidth: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                  className="w-full max-w-full"
                />
              </Box>
            )}
            <PostCardContent post={post} />
          </Card>
        </article>
      ))}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="md:col-span-3 h-10" />

      {/* Load more button fallback */}
      {hasMore && !fetchingMore && (
        <div className="md:col-span-3 flex justify-center">
          <Button variant="outlined" onClick={loadMore}>{t('posts.loadMore', 'Load more')}</Button>
        </div>
      )}

      {fetchingMore && <div className="md:col-span-3 p-4 text-center">{t('posts.loadingMore', 'Loading more...')}</div>}
    </div>
  )
}
