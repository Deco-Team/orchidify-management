import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '~/auth/useAuth'
import Layout from '~/components/layout/Layout'
import { protectedRoute, publicRoute } from './routes'
import { UserRole } from '~/global/constants'

interface ProtectedRouteProps {
  roles: UserRole[]
  element: ReactNode
  name?: string
}

export default function ProtectedRoute({ element, roles, name }: ProtectedRouteProps) {
  const { userTokenPayload } = useAuth()

  useEffect(() => {
    if (name) document.title = name
  }, [name])

  if (!userTokenPayload) {
    return <Navigate to={publicRoute.login.path} replace={true} />
  }

  if (!userTokenPayload.role || !roles.includes(userTokenPayload.role as UserRole)) {
    return <Navigate to={protectedRoute.dashboard.path} replace={true} />
  }

  return <Layout>{element}</Layout>
}
