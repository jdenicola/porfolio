import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import { Header } from '../ui/Header'
import { BottomNav } from '../ui/BottomNav'
import { HomePage } from '../screens/HomePage'
import { LoginPage } from '../screens/LoginPage'
import { SettingsPage } from '../screens/SettingsPage'
import { AboutPage } from '../screens/AboutPage'
import { PortfolioPage } from '../screens/PortfolioPage'
import { AdminPostsPage } from '../screens/AdminPostsPage'
import { PostEditPage } from '../screens/PostEditPage'
import { useAuth } from '../context/AuthContext'
import { LogoutPage } from '../screens/LogoutPage'
import { routerBasename } from '../lib/basePath'

function ProtectedAdmin() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (isAuthenticated) return <Outlet />
  const returnTo = location.pathname + location.search + location.hash
  return <Navigate to="/login" replace state={{ returnTo }} />
}

function AppLayout() {
  const location = useLocation()
  return (
    <div className="min-h-full flex flex-col bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      {location.pathname !== '/login' ? <BottomNav /> : null}
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/logout', element: <LogoutPage /> },
      { index: true, element: <HomePage /> },
      { path: '/portfolio', element: <PortfolioPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/about', element: <AboutPage /> },
      {
        element: <ProtectedAdmin />,
        children: [
          { path: '/admin/posts/new', element: <PostEditPage /> },
          { path: '/admin/posts', element: <AdminPostsPage /> },
          { path: '/admin/posts/:id/edit', element: <PostEditPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
],
{
  basename: routerBasename
})

export function AppRouter() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
