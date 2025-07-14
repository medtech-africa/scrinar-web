import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getPatients = (page?: number, searchVal = '') =>
  baseAxios.get(API.getPatients(page, searchVal)).then((res) => res.data?.data)

const usePatients = (page?: number, searchVal?: string, sortVal?: string) => {
  return useQuery({
    queryKey: ['patients', page, searchVal, sortVal],
    queryFn: () => getPatients(page, searchVal),
    placeholderData: keepPreviousData,
  })
}

const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['singlePatient', id],
    queryFn: () => {
      if (!id) {
        return null
      }
      return baseAxios.get(API.patient(id)).then((res) => res.data?.data)
    },
  })
}

export { usePatient }

export default usePatients
