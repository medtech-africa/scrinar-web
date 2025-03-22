import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getCertificate = (userId: string) =>
  baseAxios.get(API.getCertificate(userId)).then((res) => res.data)

const useCertificate = (userId: string) => {
  return useQuery({
    queryKey: ['certificate', userId],
    queryFn: () => getCertificate(userId),
    enabled: !!userId,
  })
}

export default useCertificate
