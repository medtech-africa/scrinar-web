import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import React from 'react'

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

export const useGeneratedRiskAssessment = (id: string) => {
  return useQuery({
    queryKey: ['generated-risk-assessment', id],
    queryFn: () =>
      baseAxios
        .get(API.generateRiskAssessment(id))
        .then((res) => res.data.data),
  })
}

export const useRiskAssessmentPolling = (id: string) => {
  const startTime = React.useRef(Date.now())

  return useQuery({
    queryKey: ['risk-assessment-polling', id],
    queryFn: () =>
      baseAxios
        .get(API.generateRiskAssessment(id))
        .then((res) => res.data.data),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data as RiskAssessmentModel | undefined
      const elapsedTime = Date.now() - startTime.current

      // Stop polling if we've exceeded 10 seconds
      if (elapsedTime >= 10000) {
        return false
      }

      // Check if we have the required fields for all models
      const hasRequiredFields =
        // CVD (WHO) model
        data?.responseData?.who?.lifestyleModification !== undefined &&
        data?.responseData?.who?.followUpAction !== undefined &&
        data?.responseData?.who?.breakdown !== undefined &&
        data?.responseData?.who?.diseaseBreakdown !== undefined &&
        // Diabetes (FINDRISC) model
        data?.responseData?.findrisc?.lifestyleModification !== undefined &&
        data?.responseData?.findrisc?.followUpAction !== undefined &&
        data?.responseData?.findrisc?.breakdown !== undefined &&
        data?.responseData?.findrisc?.diseaseBreakdown !== undefined &&
        // COPD model
        data?.responseData?.copd?.lifestyleModification !== undefined &&
        data?.responseData?.copd?.followUpAction !== undefined &&
        data?.responseData?.copd?.breakdown !== undefined &&
        data?.responseData?.copd?.diseaseBreakdown !== undefined &&
        // Breast Cancer model
        data?.responseData?.breastCancer?.lifestyleModification !== undefined &&
        data?.responseData?.breastCancer?.followUpAction !== undefined &&
        data?.responseData?.breastCancer?.breakdown !== undefined &&
        data?.responseData?.breastCancer?.diseaseBreakdown !== undefined &&
        // Prostate Cancer model
        data?.responseData?.prostateCancer?.lifestyleModification !==
          undefined &&
        data?.responseData?.prostateCancer?.followUpAction !== undefined &&
        data?.responseData?.prostateCancer?.breakdown !== undefined &&
        data?.responseData?.prostateCancer?.diseaseBreakdown !== undefined &&
        // Colorectal Cancer model
        data?.responseData?.colorectalCancer?.lifestyleModification !==
          undefined &&
        data?.responseData?.colorectalCancer?.followUpAction !== undefined &&
        data?.responseData?.colorectalCancer?.breakdown !== undefined &&
        data?.responseData?.colorectalCancer?.diseaseBreakdown !== undefined &&
        // CKD model
        data?.responseData?.ckd?.lifestyleModification !== undefined &&
        data?.responseData?.ckd?.followUpAction !== undefined &&
        data?.responseData?.ckd?.breakdown !== undefined &&
        data?.responseData?.ckd?.diseaseBreakdown !== undefined

      // Stop polling if we have the fields, otherwise poll every 3 seconds
      return hasRequiredFields ? false : 3000
    },
  })
}

export interface RiskAssessmentModel {
  user: {
    firstName: string
    middleName: string
    lastName: string
    id: string
  }
  status: string
  school: string
  requestData: RiskAssessmentModelRequestData
  responseData: RiskAssessmentModelResponseData
  createdAt: Date
  updatedAt: Date
  id: string
}

export interface RiskAssessmentModelRequestData {
  ncdType: string
  personalInfo?: PersonalInfo
  vitals?: Vitals
  bloodTest?: BloodTest
  familyHistory?: FamilyHistory
  lifestyle?: Lifestyle
  cardiac?: Cardiac
  previousHealthScreening?: PreviousHealthScreening
  consentAgreement?: boolean
  reportEmail?: string
  providerNote?: string
  consentSignature?: string
  copd?: COPDRequest
  breastCancer?: BreastCancerRequest
  prostateCancer?: ProstateCancerRequest
  colorectalCancer?: ColorectalCancer
}

interface Prediction {
  high: number
  low: number
  moderate: number
  month: number
}

export interface BloodTest {
  bloodSugarRandom?: string
  bloodSugarFasting?: string
  cholesterolTotal?: string
  cholesterolLdl?: string
  cholesterolHdl?: string
  cholesterolTriglycerides?: string
  hba1cLevel?: string
}

export interface Cardiac {
  chestPain: string
  strokeSymptoms: string
}

export interface FamilyHistory {
  cvd: string
  cvdOthers?: string
  diabetes: string
  diabetesOthers?: string
  hypertension: string
  hypertensionOthers?: string
  breastCancer: string
  breastCancerOthers?: string
  ovarianCancer: string
  ovarianCancerOthers?: string
  prostateCancer: string
  prostateCancerOthers?: string
  colorectalCancer: string
  colorectalCancerOthers?: string
  otherNcds: string
  otherNcdsOthers?: string
}

export interface Lifestyle {
  everSmoked: string
  currentSmokingStatus: string
  alcoholFrequency: string
  processedFoodsFrequency: string
  addSaltAtTable: string
  vegetableServingsPerWeek: string
  vegetableServingSize: string
  hasDailyPhysicalActivity: string
  moderateActivityMonths: number
  moderateActivityHoursPerWeek: string
  vigorousActivityMonths: number
  vigorousActivityHoursPerWeek: string
}

export interface PersonalInfo {
  gender: string
  firstName: string
  middleName?: string
  lastName: string
  age: number
  ethnicity?: string
  country?: string
  occupation: string
  phoneNumber: string
  address: string
  nationalId: string
  emergencyContact: string
}

export interface PreviousHealthScreening {
  date?: string
  bloodPressureAvailable?: string
  bloodPressureSystolic?: string
  bloodPressureDiastolic?: string
  bloodSugarAvailable?: string
  bloodSugarLevel?: string
  bmiAvailable?: string
  bmiLevel?: string
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
  copd?: COPD
  breastCancer?: BreastCancer
  prostateCancer?: ProstateCancer
  colorectalCancer?: ColorectalCancer
  ckd?: CKD
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
  diseaseBreakdown: { [key: string]: number }
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
  diseaseBreakdown: { [key: string]: number }
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

// New NCD Model Interfaces
export interface COPD {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: COPDBreakdown
  status: boolean
  diseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
}

export interface COPDRequest {
  coughDuration?: string
  shortnessOfBreath?: string
  activityLimitations?: string
  exposureToDust?: string
  pefLevel?: string
}

export interface COPDBreakdown {
  coughDuration: number
  shortnessOfBreath: number
  activityLimitations: number
  exposureToDust: number
  smokingHistory: number
}

export interface BreastCancer {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: BreastCancerBreakdown
  status: boolean
  diseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
}

export interface BreastCancerRequest {
  hasBeenDiagnosed?: string
  ageAtMenarche?: string
  ageAtFirstBirth?: string
  menopauseStatus?: string
  ageAtMenopause?: string
  hormoneReplacementTherapy?: string
  breastBiopsy?: string
  brcaMutationStatus?: string
  breastDensity?: string
  personalHistoryOvarianCancer?: string
  personalHistoryColorectalPancreaticCancer?: string
  personalHistoryUterineCancer?: string
  ashkenaziInheritance?: string
}

export interface BreastCancerBreakdown {
  age: number
  ageAtMenarche: number
  ageAtFirstBirth: number
  ageAtMenopause: number
  hormoneReplacementTherapy: number
  breastBiopsy: number
  familyHistory: number
  brcaMutationStatus: number
  breastDensity: number
}

export interface ProstateCancerRequest {
  ageGroup?: string
  psaLevel?: string
  digitalRectalExam?: string
  prostateVolume?: string
  previousBiopsy?: string
  freeToTotalPsaRatio?: string
  ethnicity?: string
  urinarySymptomsIncompleteEmptying?: string
  urinarySymptomsFrequency?: string
  urinarySymptomsIntermittency?: string
  urinarySymptomsUrgency?: string
  urinarySymptomsWeakStream?: string
  urinarySymptomsStraining?: string
  urinarySymptomsNocturia?: string
}

export interface ProstateCancer {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: ProstateCancerBreakdown
  status: boolean
  diseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
}

export interface ProstateCancerBreakdown {
  age: number
  familyHistory: number
  psaLevel: number
  digitalRectalExam: number
  prostateVolume: number
  previousBiopsy: number
  freeToTotalPsaRatio: number
  ethnicity: number
  urinarySymptoms: number
}

export interface ColorectalCancer {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: ColorectalCancerBreakdown
  status: boolean
  diseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
}

export interface ColorectalCancerBreakdown {
  age: number
  personalHistory: number
  familyHistory: number
  smokingStatus: number
  diet: number
  physicalActivity: number
  medicalHistory: number
  medicationUse: number
}

export interface CKD {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: CKDBreakdown
  status: boolean
  diseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
}

export interface CKDBreakdown {
  age: number
  serumCreatinine: number
  diabetes: number
  hypertension: number
  familyHistory: number
  cardiovascularDisease: number
  medications: number
  symptoms: number
  lifestyle: number
}
