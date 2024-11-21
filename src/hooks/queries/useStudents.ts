import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getStudents = (page?: number, level = '', searchVal = '', sort = '') =>
  baseAxios
    .get(API.getStudents(page, level, searchVal, sort))
    .then((res) => res.data)

const useStudents = (
  page?: number,
  level?: string,
  searchVal?: string,
  sortVal?: string
) => {
  return useQuery({
    queryKey: ['students', page, level, searchVal, sortVal],
    queryFn: () => getStudents(page, level, searchVal, sortVal),
    placeholderData: keepPreviousData,
  })
}

type Student = {
  userId: string
  firstName: string
  lastName: string
  dob: string
  age: number
  gender: string
  avatarUrl: string
  parentMobile: string
  parentMobileAlt: string
  familyCode?: string
  level: string
  email?: string
  lga: string
  state: string
  user: string
  school: string
  createdAt: string
  updatedAt: string
  fullName: string
  id: string
}

const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['singleStudent', id],
    queryFn: () =>
      baseAxios.get(API.student(id)).then((res) => res.data as Student),
  })
}

export { useStudent }

export default useStudents
