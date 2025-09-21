const base = import.meta.env.MODE === 'development' ? import.meta.env.BASE_URL || '/' : '/' + import.meta.env.VITE_BASE_PATH
const normalizedBase = base.endsWith('/') ? base : base + '/'
const rawBasePath = import.meta.env.VITE_BASE_PATH || ''
const trimmedBasePath = rawBasePath.replace(/^\/+|\/+$/g, '')

export const routerBasename = trimmedBasePath ? `/${trimmedBasePath}` : ''

/**
 * Resolves a relative asset path against the app base URL so assets load under non-root deployments.
 */
export function withBasePath(path = ''): string {
  if (!path) return normalizedBase
  const sanitized = path.startsWith('/') ? path.slice(1) : path
  return normalizedBase + sanitized
}
