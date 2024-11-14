import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

interface School {
  name: string
  address: string
  id: number
}

export const getSchools = (search = '', state = '') =>
  baseAxios.get<School[]>(API.getSchools(search, state)).then((res) => res.data)

const useSchools = (search?: string, state?: string) => {
  return useQuery({
    queryKey: ['schools', search, state],
    queryFn: () => getSchools(search, state),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

export const useSchoolResources = () => {
  return useQuery({
    queryKey: ['school-resources'],
    queryFn: () =>
      baseAxios
        .get<{ data: SchoolResource[] }>(API.schoolResources)
        .then((res) => res.data?.data),
  })
}

export default useSchools

type SchoolResource = {
  fileURL: string
  fileName: string
  type: string
  fileType: string
  lga: string
  state: string
  uploadedBy: UploadedBy
  user: string
  createdAt: string
  updatedAt: string
  id: string
  transcription?: string
  translation?: string
}

export interface UploadedBy {
  name: string
}
