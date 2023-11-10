import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

interface School {
  name: string
  id: number
}

const getSchools = (state = '') =>
  baseAxios.get<School[]>(API.getSchools(state)).then((res) => res.data)

const useSchools = (state?: string) => {
  return useQuery(['schools', state], () => getSchools(state), {
    keepPreviousData: true,
  })
}

export default useSchools
