import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getStudents = (page?: number, level = '') =>
  baseAxios.get(API.getStudents(page, level)).then((res) => res.data)

const useStudents = (page?: number, level?: string) => {
  return useQuery({
    queryKey: ['students', page, level],
    queryFn: () => getStudents(page, level),
    placeholderData: keepPreviousData
  });
}

const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['singleStudent', id],

    queryFn: () =>
      baseAxios.get(API.student(id)).then((res) => res.data)
  });
}

export { useStudent }

export default useStudents
