import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

interface School {
  name: string
  address: string
  id: number
}

export const getSchools = (search = '') =>
  baseAxios.get<School[]>(API.getSchools(search)).then((res) => res.data)

const useSchools = (search?: string) => {
  return useQuery({
    queryKey: ['schools', search],
    queryFn: () => getSchools(search),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export default useSchools
