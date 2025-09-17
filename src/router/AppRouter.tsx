import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { useAuth } from '../context/AuthContext'
import { Header } from '../ui/Header'
import { BottomNav } from '../ui/BottomNav'
import { HomePage } from '../screens/HomePage'
import { LoginPage } from '../screens/LoginPage'
import { SettingsPage } from '../screens/SettingsPage'
import { AboutPage } from '../screens/AboutPage'
import { PortfolioPage } from '../screens/PortfolioPage'

function Protected() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

function AppLayout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-full flex flex-col bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      {isAuthenticated ? <BottomNav /> : null}
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      {
        element: <Protected />,
        children: [
          { index: true, element: <HomePage /> },
          { path: '/portfolio', element: <PortfolioPage /> },
          { path: '/settings', element: <SettingsPage /> },
          { path: '/about', element: <AboutPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export function AppRouter() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
