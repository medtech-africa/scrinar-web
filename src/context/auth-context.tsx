import React, { createContext, useEffect } from 'react'
import { useAuth } from './auth'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const hydrateAuth = useAuth((state) => state.hydrate)

  useEffect(() => {
    hydrateAuth()
  }, [hydrateAuth])
  return <>{children}</>
}

export default AuthProvider
