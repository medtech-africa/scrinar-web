import isJwtExpired from '@/utils/isJwtExpired'
import { create } from 'zustand'
import { getCookie, deleteCookie } from 'cookies-next'

export interface NestedUser {
  email: string
  phoneNumber: string
  avatarUrl: string
  roles: string[]
}

export interface ISchool {
  userId: string
  name: string
  website: string
  address: string
  zipCode: string
  schoolType: string
  educationalInstitution: string[]
  lga: string
  state: string
  user: NestedUser
  createdAt: string
  updatedAt: string
  id: string
  email: string
  phoneNumber: string
  avatarUrl: string
  roles: string[]
  school?: { name: string }
  fullName: string
}
export interface IUser {
  email: string
  isSuspended: boolean
  leaderBoardScore: number
  isVerified: boolean
  roles: string[]
  loginDevices: any[]
  userId: string
  createdAt: string
  updatedAt: string
  schoolID: string
  id: string
  firstName: string
  lastName: string
  middleName: string
  dob: string
  gender: string
  //
}

interface IUserState {
  loading: boolean
  user: null | (IUser & ISchool)
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
    const token = getCookie('token')
    if (!isJwtExpired(token ?? '') && userData) {
      try {
        set({ loading: true, user: userData })
      } catch (error) {
        console.log('loadUser', '>>>>>>>>>>>')

        deleteCookie('token')
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
