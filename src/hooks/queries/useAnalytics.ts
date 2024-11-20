import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

export type HealthDataAnalyticsType = {
      date: string
      children: number
      fathers: number
      mothers: number
    }

const fetchStats = async () => {
  const { data } = await baseAxios.get<
    HealthDataAnalyticsType[]
  >(API.healthDataAnalytics)
  return data
}

export const useHealthDataAnalytics = () => {
  return useQuery({
    queryKey: ['health-data-analytics-stats'],
    queryFn: fetchStats,
  })
}

// const data = [
//   { year: '2014', type: 'Sales', sales: 1000 },
//   { year: '2015', type: 'Sales', sales: 1170 },
//   { year: '2016', type: 'Sales', sales: 660 },
//   { year: '2017', type: 'Sales', sales: 1030 },
//   { year: '2014', type: 'Expenses', sales: 400 },
//   { year: '2015', type: 'Expenses', sales: 460 },
//   { year: '2016', type: 'Expenses', sales: 1120 },
//   { year: '2017', type: 'Expenses', sales: 540 },
//   { year: '2014', type: 'Profit', sales: 300 },
//   { year: '2015', type: 'Profit', sales: 300 },
//   { year: '2016', type: 'Profit', sales: 300 },
//   { year: '2017', type: 'Profit', sales: 350 },
// ]