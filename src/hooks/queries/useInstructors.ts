import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getInstructors = (currentPage = 1) =>
  baseAxios.get(API.getInstructors(currentPage)).then((res) => res.data)

const useInstructors = (page = 1) => {
  return useQuery(['instructors', page], () => getInstructors(page), {
    keepPreviousData: true,
  })
}

const useInstructor = (id: string) => {
  return useQuery(['singleInstructor', id], () =>
    baseAxios.get(API.instructor(id)).then((res) => res.data)
  )
}

export { useInstructor }

export default useInstructors
