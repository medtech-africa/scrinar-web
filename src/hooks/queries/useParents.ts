import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getParents = (page?: number, level = '', searchVal = '') =>
  baseAxios.get(API.getParents(page, level, searchVal)).then((res) => res.data)

const useParents = (page?: number, level?: string, searchVal?: string) => {
  return useQuery({
    queryKey: ['parents', page, level, searchVal],
    queryFn: () => getParents(page, level, searchVal),
    placeholderData: keepPreviousData,
  })
}

const useParent = (id: string) => {
  return useQuery({
    queryKey: ['singleParent', id],
    queryFn: () => baseAxios.get(API.parent(id)).then((res) => res.data),
  })
}

export { useParent }

export default useParents
