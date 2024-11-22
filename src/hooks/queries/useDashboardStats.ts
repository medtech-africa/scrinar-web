import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const fetchStats = async () => {
  const { data } = await baseAxios.get<{
    fatherCount: number;
    motherCount: number;
    childrenCount: number;
    healthDataCount: number;
    totalUniqueFamilies: number;
    healthDataFatherCount: number;
    healthDataMotherCount: number;
    healthDataStudentCount: number;
  }>(API.householdStats)
  return data
}

const useDashboardStats = (enabled: boolean) => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchStats,
    enabled: enabled,
  })
}

export default useDashboardStats
