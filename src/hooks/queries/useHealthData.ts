import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getHealthData = (_pageNumber = 1) =>
  baseAxios.get(API.healthData).then((res) => res.data)

const useHealthData = (pageNumber = 1) => {
  return useQuery(
    ['health-data', pageNumber],
    () => getHealthData(pageNumber),
    {
      keepPreviousData: true,
    }
  )
}

const useSingleHealthData = (id: string) => {
  return useQuery(['single-health-data', id], () =>
    baseAxios.get(API.singleHealthData(id)).then((res) => res.data)
  )
}

const useHealthRiskData = () => {
  return useQuery(['health-risk-data'], () =>
    baseAxios.get(API.highRisk).then((res) => res.data)
  )
}

export { useSingleHealthData, useHealthRiskData }

export default useHealthData
