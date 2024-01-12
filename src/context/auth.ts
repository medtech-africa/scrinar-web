import isJwtExpired from '@/utils/isJwtExpired'
import { create } from 'zustand'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'
interface IAuthState {
  isAuth: boolean
  authLoading: boolean
  hydrate: () => void
  signOut: () => void
  authenticate: (token: string) => void
}

const useAuth = create<IAuthState>((set) => ({
  isAuth: false,
  authLoading: false,
  hydrate: () => {
    const token = getCookie('token')
    const isAuth = !isJwtExpired(token ?? '') ? true : false
    set({ isAuth })
  },

  signOut: async () => {
    try {
      await deleteCookie('token')
      set({ isAuth: false })
    } catch (_e) {}
  },
  authenticate: async (token: string) => {
    set({ authLoading: true })
    try {
      await setCookie('token', token)
      set({ isAuth: true, authLoading: false })
      return Promise.resolve('')
    } catch (error) {
      deleteCookie('token')
      return Promise.reject(error)
    }
  },
}))

export { useAuth }
