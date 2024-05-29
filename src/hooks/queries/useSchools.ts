import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

interface School {
  name: string
  address: string
  id: number
}

export const getSchools = (search = '', state = '') =>
  baseAxios.get<School[]>(API.getSchools(search, state)).then((res) => res.data)

const useSchools = (search?: string, state?: string) => {
  return useQuery({
    queryKey: ['schools', search, state],
    queryFn: () => getSchools(search, state),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export default useSchools
