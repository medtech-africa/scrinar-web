import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
debugger
const getData = (params: { page: number; limit: number }) =>
  baseAxios
    .get<{
      data: { data: RiskAssessmentModel[] }
    }>(API.riskAssessmentData, { params })
    .then((res) => res.data.data.data)

export const useRiskAssessments = ({ page = 1, limit = 10 } = {}) => {
  return useQuery({
    queryKey: ['risk-assessments', page, limit],
    queryFn: () => getData({ page, limit }),
  })
}

export const useRiskAssessment = (id: string) => {
  return useQuery({
    queryKey: ['risk-assessment', id],
    queryFn: () =>
      baseAxios.get(API.riskAssessmentDetails(id)).then((res) => res.data.data),
  })
}

export interface RiskAssessmentModel {
  user: string
  school: string
  requestData: RiskAssessmentModelRequestData
  responseData: RiskAssessmentModelResponseData
  createdAt: Date
  updatedAt: Date
  id: string
}

export interface RiskAssessmentModelRequestData {
  personalInfo: PersonalInfo
  vitals: Vitals
  bloodTest: BloodTest
  familyHistory: FamilyHistory
  lifestyle: Lifestyle
  cardiac: Cardiac
  symptoms: Symptoms
  diagnosedConditions: DiagnosedConditions
  sleepPatterns: SleepPatterns
  previousHealthScreening: PreviousHealthScreening
  consentAgreement: boolean
}

interface Prediction {
  high: number
  low: number
  moderate: number
  month: number
}

export interface BloodTest {
  bloodSugar: BloodSugar
  cholesterol: Cholesterol
  hba1c: Hba1C
}

export interface BloodSugar {
  random: string
  fasting: string
}

export interface Cholesterol {
  total: string
  ldl: string
  hdl: string
  triglycerides: string
}

export interface Hba1C {
  level: string
}

export interface Cardiac {
  chestPain: string
  strokeSymptoms: string
}

export interface DiagnosedConditions {
  hypertension: string
  diabetes: string
  highCholesterol: string
}

export interface FamilyHistory {
  cvd: string
  diabetes: string
  hypertension: string
  cancer: string
  stroke: string
  otherNcdsOption: string
}

export interface Lifestyle {
  tobacco: Tobacco
  alcohol: Alcohol
  diet: Diet
  physicalActivity: PhysicalActivity
}

export interface Alcohol {
  usage: string
}

export interface Diet {
  processedFoods: string
  addSalt: string
  fruitVegServings: string
}

export interface PhysicalActivity {
  engages: string
}

export interface Tobacco {
  currentlyUses: string
  quit: string
}

export interface PersonalInfo {
  gender: string
  fullName: string
  dateOfBirth: string
  occupation: string
  phoneNumber: string
  address: string
  nationalId: string
  emergencyContact: string
}

export interface PreviousHealthScreening {
  bloodPressure: BloodPressure
  bloodSugar: BloodPressure
  bmi: BloodPressure
}

export interface BloodPressure {
  available: string
}

export interface SleepPatterns {
  hoursPerNight: string
}

export interface Symptoms {
  chestPain: string
  shortnessOfBreath: string
  irregularHeartbeat: string
}

export interface Vitals {
  height: string
  weight: string
  waist: string
  sys: string
  dys: string
  pulse: string
  oxygenSaturation: string
  temperature: string
  bmi: number
}

export interface RiskAssessmentModelResponseData {
  who?: Who
  findrisc?: Findrisc
  healthdata?: any
  criticalAlerts: any[]
  predictions?: Prediction[]
}

export interface Findrisc {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: FindriscBreakdown
  status: boolean
  heartDiseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
}

export interface FindriscBreakdown {
  age: number
  bmi: number
  waist: number
  physicalActivity: number
  familyHistory: number
  diet: number
}

export interface Who {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  heartDiseaseBreakdown: { [key: string]: number }
  score: string
  riskLevel: string
  breakdown: WhoBreakdown
  status: boolean
  predictions?: Prediction[]
}

export interface WhoBreakdown {
  age: number
  bmi: number
  bloodPressure: number
  smoking: number
  diabetes: number
  cholesterol: number
}

export type RiskData = RiskAssessmentModelResponseData &
  Partial<RiskAssessmentModelRequestData>
