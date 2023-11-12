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
  //master instructor
  openSchoolModal: boolean
  setOpenSchoolModal: (val: boolean) => void
  selectedSchool: string
  setSelectedSchool: (val: string) => void
}

const useUser = create<IUserState>((set, get) => ({
  loading: false,
  user: null,
  setLoading: (val: boolean) => set({ loading: val }),
  setUser: (user: any) => {
    set({ user })
  },
  updateUser: (val: any) => {
    const user = { ...get().user, ...val }
    set({ user })
  },
  loadUser: (userData) => {
    const cookies = new Cookies()
    const { token } = cookies.getAll()
    if (!isJwtExpired(token) && userData) {
      try {
        set({ loading: true, user: userData })
      } catch (error) {
        console.log('loadUser', '>>>>>>>>>>>')

        cookies.remove('token')
        set({ user: null })
      } finally {
        set({ loading: false })
      }
    } else {
      set({ loading: false, user: null })
    }
  },
  openSchoolModal: false,
  setOpenSchoolModal: (val: boolean) => set({ openSchoolModal: val }),
  selectedSchool: '',
  setSelectedSchool: (val: string) => set({ selectedSchool: val }),
}))

export { useUser }
