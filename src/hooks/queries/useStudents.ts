import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getStudents = (page?: number, level = '') =>
  baseAxios.get(API.getStudents(page, level)).then((res) => res.data)

const useStudents = (page?: number, level?: string) => {
  return useQuery(['students', page, level], () => getStudents(page, level), {
    keepPreviousData: true,
  })
}

const useStudent = (id: string) => {
  return useQuery(['singleStudent', id], () =>
    baseAxios.get(API.student(id)).then((res) => res.data)
  )
}

export { useStudent }

export default useStudents
