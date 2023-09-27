import isJwtExpired from '@/utils/isJwtExpired'
import { create } from 'zustand'
import { Cookies } from 'react-cookie'

interface IUserState {
  loading: boolean
  user: null | any
  loadUser: (user?: any) => void
  setUser: (val: any) => void
  updateUser: (val: any) => void
  setLoading: (val: boolean) => void
}

const useUser = create<IUserState>((set, get) => ({
  loading: true,
  user: null,
  setLoading: (val: boolean) => set({ loading: val }),
  setUser: (user: any) => {
    set({ user })
  },
  updateUser: (val: any) => {
    const user = { ...get().user, ...val }
    set({ user })
  },
  loadUser: (admin) => {
    const cookies = new Cookies()
    const { token } = cookies.getAll()
    if (!isJwtExpired(token) && admin) {
      try {
        set({ loading: true, user: admin })
      } catch (error) {
        cookies.remove('token')
        set({ user: null })
      } finally {
        set({ loading: false })
      }
    } else {
      set({ loading: false, user: null })
    }
  },
}))

export { useUser }
