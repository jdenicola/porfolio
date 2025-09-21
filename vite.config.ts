import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use Vite's built-in env loader for config files
  const env = loadEnv(mode, process.cwd(), '')

  const rawBasePath = env.VITE_BASE_PATH || ''
  const normalizedBase = rawBasePath
    ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}/`
    : '/'

  return {
    plugins: [react(), tailwindcss()],
    base: normalizedBase,
    publicDir: 'public',
    build: {
      assetsDir: env.VITE_ASSET_PATH === undefined ? 'assets' : env.VITE_ASSET_PATH + '/assets'
    }
  }
})
