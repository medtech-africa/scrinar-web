import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getParents = (page?: number, searchVal = '', all = false, sortVal = '') =>
  baseAxios
    .get(API.getParents(page, searchVal, '', all, sortVal))
    .then((res) => res.data?.data)

const useParents = (
  page?: number,
  searchVal?: string,
  all = false,
  sortVal?: string
) => {
  return useQuery({
    queryKey: ['parents', page, searchVal, sortVal],
    queryFn: () => getParents(page, searchVal, all, sortVal),
    placeholderData: keepPreviousData,
  })
}

const useParent = (id: string) => {
  return useQuery({
    queryKey: ['singleParent', id],
    queryFn: () => baseAxios.get(API.parent(id)).then((res) => res.data?.data),
  })
}

const useParentQuestionnaire = (id: string, options = {}) => {
  return useQuery({
    queryKey: ['parentQuestionnaire', id],
    queryFn: () =>
      baseAxios.get(API.parentQuestionnaire(id)).then((res) => res.data?.data),
    enabled: !!id,
    ...options,
  })
}

export { useParent, useParentQuestionnaire }

export default useParents
