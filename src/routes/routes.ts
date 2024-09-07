import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))

export const publicRoute = {
  login: {
    path: '/',
    Component: Login
  }
}

export const protectedRoute = {
  dashboard: {
    path: '/dashboard',
    Component: Home
  }
}
