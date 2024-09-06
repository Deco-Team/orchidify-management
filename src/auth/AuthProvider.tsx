import { decodeJwt } from 'jose'
import { createContext, ReactNode, useMemo, useState } from 'react'
import { LoginResponseDto } from '~/data/auth.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { UserRole } from '~/global/constants'
import { callApi } from '~/utils/apiCaller'

interface IUserTokenPayload {
  name?: string
  sub?: string
  role?: string
  iat?: number
  exp?: number
}

interface IAuthContextValue {
  userTokenPayload: IUserTokenPayload | null
  accessToken: string | null
  refreshToken: string | null
  login: (role: UserRole, email: string, password: string) => Promise<ErrorResponseDto | null>
  logout: () => void
}

const defaultContextValue: IAuthContextValue = {
  accessToken: null,
  refreshToken: null,
  userTokenPayload: null,
  login: () => Promise.resolve(null),
  logout: () => {}
}

export const AuthContext = createContext<IAuthContextValue>(defaultContextValue)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'))
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'))
  const jwtPayload = useMemo(() => {
    if (accessToken) return decodeJwt(accessToken)
    return null
  }, [accessToken])

  const login = async (role: UserRole, email: string, password: string) => {
    const { response, error } = await callApi('/auth/management/login', 'POST', {}, {}, { role, email, password })
    if (response) {
      const { accessToken, refreshToken } = response.data.data as LoginResponseDto
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      return null
    } else if (error!.response) {
      return error!.response.data as ErrorResponseDto
    } else {
      return { message: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.' } as ErrorResponseDto
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setAccessToken(null)
    setRefreshToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        userTokenPayload: jwtPayload
          ? {
              name: jwtPayload.name as string | undefined,
              role: jwtPayload.role as string | undefined,
              sub: jwtPayload.sub,
              iat: jwtPayload.iat,
              exp: jwtPayload.exp
            }
          : null,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
