import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getHealthData = (_pageNumber = 1) =>
  baseAxios.get(API.healthData).then((res) => res.data)

const useHealthData = (pageNumber = 1) => {
  return useQuery({
    queryKey: ['health-data', pageNumber],
    queryFn: () => getHealthData(pageNumber),
    placeholderData: keepPreviousData
  });
}

const useSingleHealthData = (id: string) => {
  return useQuery({
    queryKey: ['single-health-data', id],

    queryFn: () =>
      baseAxios.get(API.singleHealthData(id)).then((res) => res.data)
  });
}

const useHealthRiskData = () => {
  return useQuery({
    queryKey: ['health-risk-data'],

    queryFn: () =>
      baseAxios.get(API.highRisk).then((res) => res.data)
  });
}

export { useSingleHealthData, useHealthRiskData }

export default useHealthData
