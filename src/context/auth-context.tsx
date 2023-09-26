/* eslint-disable import/no-unused-modules */
import React, { createContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useAuth } from './auth'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const hydrateAuth = useAuth((state) => state.hydrate)
  const signOut = useAuth((state) => state.signOut)
  const [cookies] = useCookies(['token'])

  useEffect(() => {
    if (!cookies.token) {
      signOut()
    }
  }, [cookies.token, signOut])

  useEffect(() => {
    hydrateAuth()
  }, [hydrateAuth])
  return <>{children}</>
}

export default AuthProvider
