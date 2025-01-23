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

export const useParentAnalytics = () => {
  return useQuery({
    queryKey: ['parent-analytics'],
    queryFn: async () => {
      const { data } = await baseAxios.get<ParentsAnalytics>(
        API.parentAnalytics
      )
      return data
    },
  })
}
export const useChildrenAnalytics = () => {
  return useQuery({
    queryKey: ['children-analytics'],
    queryFn: async () => {
      const { data } = await baseAxios.get<any>(API.childrenAnalytics)
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
export interface ParentsAnalytics {
  data: IParent[]
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
export enum ParentsAnalyticsEnums {
  occupation = 'occupation',
  religion = 'religion',
  ethnicity = 'ethnicity',
  householdIncome = 'householdIncome',
}
export interface IParent {
  parent: string
  yearsInCommunity: string
  ethnicity: string
  otherEthnicity: any
  languagesSpoken: string[]
  otherLanguage: any
  religion: string
  otherReligion: any
  education: string
  workStatus: string
  occupation: string
  householdMembers: HouseholdMembers
  householdIncome: string
  chronicHealth: ChronicHealth
  healthStatus: any
  noOfChildren: number
  children: Children[]
  isPregnant: boolean
  nutrition: Nutrition
  riskyBehavior: RiskyBehavior
  idealBody: IdealBody
  healthHygiene: HealthHygiene
  createdAt: string
  updatedAt: string
  ncd: Ncd
  ncdRiskFactor: NcdRiskFactor
  howManyWives: any
  school: string
  id: string
}

export interface HouseholdMembers {
  children: number
  adults: number
}

export interface ChronicHealth {
  hasCondition: boolean
}

export interface Children {
  age: number
  gender: string
  inSchool: boolean
}

export interface Nutrition {
  balancedDiet: string
  sugarEffects: string
  saltFatRisks: string
  boysFood: string[]
  awareImportanceOfFoodVariety: string
  awareFoodHasDiffBenefits: string
  effectsOfTooMuchSaltAndOil: string
  decidesMoneyOnFruits: string
  decidesMealsForFamily: string
  saltQuantityDetermination: string
  thingsUsedWhenCooking: string
  friedFood: string
  childBreakfast: string
  noChildBreakfast: string
  childLunch: string
  foodKnowledge: FoodKnowledge
  foodGroupFrequency: FoodGroupFrequency
}

export interface FoodKnowledge {
  cereals: string
  roots: string
  beans_nuts: string
  meat_fish: string
  vegetables: string
  fruits: string
}

export interface FoodGroupFrequency {
  protein_sources_frequency: string
  varied_diet_frequency: string
  green_leafy_vegetables_frequency: string
  unhealthy_snacks_frequency: string
  sugary_drinks_frequency: string
  vegetable_portion_size: number
}

export interface RiskyBehavior {
  noOfDailyMeals: number
}

export interface IdealBody {
  womenShape: any
  womenWeight: any
  adolescentWomenShape: any
  adolescentWomenWeight: any
  menShape: any
  menWeight: any
  adolescentMenShape: any
  adolescentMenWeight: any
  yourWeight: any
  yourHeight: any
  isYourHeightHealthy: any
}

export interface HealthHygiene {
  sourcesOfWaterAtHome: any[]
  waterTreatmentMethodAtHome: any[]
  didYouCleanHandAfterLastToiletUsage: any
  facilityUsedToWashHand: any
  toiletFacility: any
}

export interface Ncd {
  ageGroupAtRiskOfNcd: string
  doYouKnowNCD: string[]
  doYouKnowHighBloodPressure: string
  doYouKnowDiabetes: string
  doYouKnowObesity: string
  howPreventGettingNcd: string
  anyFamilyMemberWithNcd: string
  howHighBpIsManaged: string
}

export interface NcdRiskFactor {
  work: Work
  home: Home
  travel: Travel
}

export interface Work {
  vigorousActivityTimeDuration: any
}

export interface Home {
  houseChores: any[]
  houseChoresDuration: any
}

export interface Travel {
  walkOrBicycleTime: WalkOrBicycleTime
}

export interface WalkOrBicycleTime {
  hours: any
  minutes: any
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
