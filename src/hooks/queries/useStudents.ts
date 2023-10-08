import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getStudents = (_lastKey = 0) =>
  baseAxios.get(API.getStudents('')).then((res) => res.data)

const useStudents = (lastKey = 0) => {
  return useQuery(['students', lastKey], () => getStudents(lastKey), {
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
