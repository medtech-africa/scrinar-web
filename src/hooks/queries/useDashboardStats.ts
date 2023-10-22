import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const fetchStats = async () => {
  const { data } = await baseAxios.get(API.schoolDashboard)
  return data
}

const useDashboardStats = () => {
  return useQuery(['dashboard-stats'], fetchStats)
}

export default useDashboardStats
