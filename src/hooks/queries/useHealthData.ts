import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getHealthData = (pageNumber = 1, searchVal = '') =>
  baseAxios
    .get(API.getHealthData(pageNumber, searchVal))
    .then((res) => res.data)

const useHealthData = (pageNumber = 1, searchVal?: string) => {
  return useQuery({
    queryKey: ['health-data', pageNumber, searchVal],
    queryFn: () => getHealthData(pageNumber, searchVal),
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
