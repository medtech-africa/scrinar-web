import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getStudents = (currentPage = 1) =>
  baseAxios.get(API.getStudents(currentPage)).then((res) => res.data)

const useStudents = (page = 1) => {
  return useQuery(['students', page], () => getStudents(page), {
    keepPreviousData: true,
  })
}

export { getStudents }

export default useStudents
