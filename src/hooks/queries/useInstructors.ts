import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getInstructors = (lastKey?: string) =>
  baseAxios.get(API.getInstructors(lastKey)).then((res) => res.data)

const useInstructors = (lastKey?: string) => {
  console.log(API.getInstructors(lastKey))
  return useQuery(['instructors', lastKey], () => getInstructors(lastKey), {
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
