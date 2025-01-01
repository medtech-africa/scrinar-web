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
  const { data } = await baseAxios.get<HealthDataAnalyticsType[]>(
    API.healthDataAnalytics
  )
  return data
}

export const useHealthDataAnalytics = () => {
  return useQuery({
    queryKey: ['health-data-analytics-stats'],
    queryFn: fetchStats,
  })
}

export const useHealthDataCompletionAnalytics = () => {
  return useQuery({
    queryKey: ['health-data-completion-stats'],
    queryFn: async () => {
      const { data } = await baseAxios.get<{
        fathers: number
        mothers: number
        children: number
      }>(API.healthDataCompletionAnalytics)
      return data
    },
  })
}

export interface NutritionAnalytics {
  foodKnowledge: FoodKnowledge[]
}

export interface FoodKnowledge {
  food: string
  categories: Categories
}

export interface Categories {
  body_building?: number
  not_sure: number
  energy: number
  protective?: number
}

export const useNutritionAnalytics = () => {
  return useQuery({
    queryKey: ['nutrition-analytics'],
    queryFn: async () => {
      const { data } = await baseAxios.get<NutritionAnalytics>(
        API.nutritionAnalytics
      )
      return data
    },
  })
}

export const useGeneralAnalytics = () => {
  return useQuery({
    queryKey: ['general-analytics'],
    queryFn: async () => {
      const { data } = await baseAxios.get<GeneralAnalytics>(
        API.generalAnalytics
      )
      return data
    },
  })
}

export const useSurveillanceAnalytics = () => {
  return useQuery({
    queryKey: ['surveillance-analytics'],
    queryFn: async () => {
      const { data } = await baseAxios.get<{
        data: {
          count: number
          schoolName: string
          geo: {
            latitude: number
            longitude: number
          }
        }[]
      }>(API.surveillanceAnalytics)
      return data
    },
  })
}

export interface GeneralAnalytics {
  data: Data
}

interface Data {
  countPerGender: CountPerGender[]
  livingSituation: CountPerGender[]
  distanceToSchool: CountPerGender[]
  doYouKnowHighBloodPressure: CountPerGender[]
  ageGroupDistribution: AgeGroupDistribution[]
  awarenessOfFoodVariety: AwarenessOfFoodVariety[]
  weightAwareness: WeightAwareness[]
  heightAwareness: HeightAwareness[]
}

interface AgeGroupDistribution {
  count: number
  ageGroup: string
}

interface AwarenessOfFoodVariety {
  count: number
  awareness: null | string
}

interface CountPerGender {
  count: number
  value: null | string
}

interface HeightAwareness {
  count: number
  knowsHeight?: string
  isHeightHealthy?: string
}

interface WeightAwareness {
  count: number
  knowsWeight?: string
  isWeightHealthy?: null | string
}
