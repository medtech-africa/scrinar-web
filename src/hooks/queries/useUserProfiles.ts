import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getUsers = (page?: number, level = '', type = '') => {
  let url = ''

  if (type === 'student') url = API.getStudents(page, level)
  else url = API.getParents(page, '', type)
  return baseAxios.get(url).then((res) => res.data)
}

const useUserProfiles = (
  page?: number,
  level?: string,
  type?: 'student' | 'male' | 'female'
) => {
  return useQuery({
    queryKey: ['user-profiles', page, level, type],
    queryFn: () => getUsers(page, level, type),
    placeholderData: keepPreviousData,
  })
}

export default useUserProfiles
