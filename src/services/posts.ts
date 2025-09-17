import api from '../lib/axios'
import type { Post } from '../types/post'

const API_BASE: string = (import.meta as any).env?.VITE_API_BASE_URL
const POSTS_URL = `${API_BASE.replace(/\/$/, '')}/posts`

export async function getPosts(page = 1, perPage = 20): Promise<Post[]> {
  try {
    const res = await api.get<Post[]>(POSTS_URL, { params: { page, per_page: perPage } })
    return res.data
  } catch (e) {
    // Fallback to mock data from public/posts.json during development
    const res = await fetch('/posts.json')
    if (!res.ok) throw new Error('Failed to load posts')
    const all = (await res.json()) as Post[]
    // Simulate server-side pagination
    const start = (page - 1) * perPage
    const end = start + perPage
    return all.slice(start, end)
  }
}
