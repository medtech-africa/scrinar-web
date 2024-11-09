import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
const getHealthData = (page = 1, searchVal = '', limit = 10, type = '') =>
  baseAxios
    .get(API.getHealthData, {
      params: { page, limit, type, search: searchVal },
    })
    .then((res) => res.data)

const useHealthData = (
  pageNumber = 1,
  searchVal?: string,
  type = '',
  limit = 10
) => {
  return useQuery({
    queryKey: ['health-data', pageNumber, searchVal, type, limit],
    queryFn: () => getHealthData(pageNumber, searchVal, limit, type),
    placeholderData: keepPreviousData,
  })
}

const useSingleHealthData = (id: string) => {
  return useQuery({
    queryKey: ['single-health-data', id],

    queryFn: () =>
      baseAxios.get(API.singleHealthData(id)).then((res) => res.data),
  })
}

const useHealthRiskData = () => {
  return useQuery({
    queryKey: ['health-risk-data'],

    queryFn: () => baseAxios.get(API.highRisk).then((res) => res.data),
  })
}

export { useSingleHealthData, useHealthRiskData }

export default useHealthData
