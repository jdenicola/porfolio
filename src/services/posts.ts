import api from '../lib/axios'
import type { Post } from '../types/post'
import { withBasePath } from '../lib/basePath'

const API_BASE: string = (import.meta as any).env?.VITE_API_BASE_URL
const POSTS_URL = `${API_BASE.replace(/\/$/, '')}/posts`

export async function getPosts(page = 1, perPage = 20): Promise<Post[]> {
  try {
    const res = await api.get<Post[]>(POSTS_URL, { params: { page, per_page: perPage } })
    return res.data
  } catch (e) {
    // Fallback to mock data from public/posts.json during development
    const res = await fetch(withBasePath('/posts.json'))
    if (!res.ok) throw new Error('Failed to load posts')
    const all = (await res.json()) as Post[]
    // Simulate server-side pagination
    const start = (page - 1) * perPage
    const end = start + perPage
    return all.slice(start, end)
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    // Try API first
    const res = await api.get<Post>(`${POSTS_URL}/${id}`)
    return res.data
  } catch (e) {
    // Fallback to local mock
    const res = await fetch(withBasePath('/posts.json'))
    if (!res.ok) return null
    const all = (await res.json()) as Post[]
    const found = all.find((p) => p.id === id)
    if (!found) return null
    // For mock, use excerpt as initial body if body is missing
    return { ...found, body: found.body ?? found.excerpt }
  }
}

export async function updatePost(payload: { id: string; title: string; body: string }): Promise<{ ok: true }> {
  try {
    // Attempt to POST/PATCH to API if configured
    await api.patch(`${POSTS_URL}/${payload.id}`, payload)
    return { ok: true }
  } catch (e) {
    // Mock update: just log it and resolve
    console.info('[mock] updatePost payload', payload)
    await new Promise((r) => setTimeout(r, 400))
    return { ok: true }
  }
}

export async function createPost(payload: { id: string; title: string; body: string }): Promise<{ ok: true }> {
  try {
    await api.post(`${POSTS_URL}`, payload)
    return { ok: true }
  } catch (e) {
    console.info('[mock] createPost payload', payload)
    await new Promise((r) => setTimeout(r, 400))
    return { ok: true }
  }
}
