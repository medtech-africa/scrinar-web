import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getHealthData = (_lastKey = 0) =>
  baseAxios.get(API.healthData).then((res) => res.data)

const useHealthData = (lastKey = 0) => {
  return useQuery(['health-data', lastKey], () => getHealthData(lastKey), {
    keepPreviousData: true,
  })
}

const useSingleHealthData = (id: string) => {
  return useQuery(['single-health-data', id], () =>
    baseAxios.get(API.singleHealthData(id)).then((res) => res.data)
  )
}

export { useSingleHealthData }

export default useHealthData
