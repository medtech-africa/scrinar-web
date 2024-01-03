import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getInstructors = (lastKey?: string) =>
  baseAxios.get(API.getInstructors(lastKey)).then((res) => res.data)

const useInstructors = (lastKey?: string) => {
  return useQuery({
    queryKey: ['instructors', lastKey],
    queryFn: () => getInstructors(lastKey),
    placeholderData: keepPreviousData
  });
}

const useInstructor = (id: string) => {
  return useQuery({
    queryKey: ['singleInstructor', id],

    queryFn: () =>
      baseAxios.get(API.instructor(id)).then((res) => res.data)
  });
}
export { useInstructor }

export default useInstructors
