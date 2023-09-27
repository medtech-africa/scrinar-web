import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const fetchProfile = async () => {
  const { data } = await baseAxios.get(API.getProfile)
  return data
}

const useProfile = () => {
  return useQuery(['profile'], fetchProfile, {
    enabled: false,
  })
}

export default useProfile
