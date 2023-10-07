import isJwtExpired from '@/utils/isJwtExpired'
import { create } from 'zustand'
import { Cookies } from 'react-cookie'

interface IAuthState {
  isAuth: boolean
  hydrate: () => void
  signOut: () => void
  authenticate: (token: string) => void
}

const useAuth = create<IAuthState>((set) => ({
  isAuth: false,
  hydrate: () => {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const isAuth = !isJwtExpired(token) ? true : false
    set({ isAuth })
  },

  signOut: async () => {
    try {
      const cookies = new Cookies()
      await cookies.remove('token')
      set({ isAuth: false })
    } catch (_e) {}
  },
  authenticate: async (token: string) => {
    const cookies = new Cookies()
    try {
      cookies.set('token', token, { secure: true, sameSite: 'none' })
      set({ isAuth: true })
      return Promise.resolve('')
    } catch (error) {
      cookies.remove('token')
      return Promise.reject(error)
    }
  },
}))

export { useAuth }
