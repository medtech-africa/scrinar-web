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

export const useRiskAssessmentPolling = (
  id: string,
  selectedNcds?: string[]
) => {
  const startTime = React.useRef(Date.now())

  return useQuery({
    queryKey: ['risk-assessment-polling', id, selectedNcds],
    queryFn: () =>
      baseAxios
        .get(API.generateRiskAssessment(id))
        .then((res) => res.data.data),
    enabled: !!id,
    // Disable caching to ensure fresh data on each poll
    staleTime: 0,
    gcTime: 0,
    refetchInterval: (query) => {
      const data = query.state.data as RiskAssessmentModel | undefined
      const elapsedTime = Date.now() - startTime.current

      // Stop polling if we've exceeded 60 seconds
      if (elapsedTime >= 60000) {
        return false
      }

      // If no selected NCDs provided, use the old logic
      if (!selectedNcds || selectedNcds.length === 0) {
        const hasRequiredFields =
          // CVD (WHO) model
          data?.responseData?.who?.lifestyleModification !== undefined &&
          data?.responseData?.who?.followUpAction !== undefined &&
          data?.responseData?.who?.breakdown !== undefined &&
          // Diabetes (FINDRISC) model
          data?.responseData?.findrisc?.lifestyleModification !== undefined &&
          data?.responseData?.findrisc?.followUpAction !== undefined &&
          data?.responseData?.findrisc?.breakdown !== undefined &&
          // COPD model - check for either old structure or new structure
          ((data?.responseData?.copd?.lifestyleModification !== undefined &&
            data?.responseData?.copd?.followUpAction !== undefined) ||
            (data?.responseData?.copd?.riskScore !== undefined &&
              data?.responseData?.copd?.riskCategory !== undefined)) &&
          // Breast Cancer model
          data?.responseData?.breastCancer?.lifestyleModification !==
            undefined &&
          data?.responseData?.breastCancer?.followUpAction !== undefined &&
          // Prostate Cancer model
          data?.responseData?.prostate?.lifestyleModification !== undefined &&
          data?.responseData?.prostate?.followUpAction !== undefined &&
          // Colorectal Cancer model
          data?.responseData?.colorectal?.lifestyleModification !== undefined &&
          data?.responseData?.colorectal?.followUpAction !== undefined &&
          // CKD model - check for either old structure or new structure
          ((data?.responseData?.ckd?.lifestyleModification !== undefined &&
            data?.responseData?.ckd?.followUpAction !== undefined) ||
            (data?.responseData?.ckdOutput?.lifestyleModification !==
              undefined &&
              data?.responseData?.ckdOutput?.followUpAction !== undefined))

        return hasRequiredFields ? false : 3000
      }

      // Check for selected NCDs specifically
      if (!data?.responseData) return 3000

      const responseData = data.responseData

      // Check each selected NCD type
      for (const ncdType of selectedNcds) {
        const ncdData = (responseData as any)[ncdType]

        // Check if the NCD data exists and is not empty
        if (!ncdData || Object.keys(ncdData).length === 0) {
          return 3000
        }

        // Check for required fields based on NCD type
        switch (ncdType) {
          case 'CVD':
            if (!ncdData.who?.score || !ncdData.who?.riskLevel) return 3000
            break
          case 'DIABETES':
            if (!ncdData.findrisc?.score || !ncdData.findrisc?.riskLevel)
              return 3000
            break
          case 'COPD':
            if (!ncdData.copd?.score && !ncdData.copd?.riskScore) return 3000
            break
          case 'BREAST_CANCER':
            if (
              !ncdData.breastCancer?.score ||
              !ncdData.breastCancer?.riskLevel
            )
              return 3000
            break
          case 'PROSTATE_CANCER':
            if (!ncdData.prostate?.score || !ncdData.prostate?.riskLevel)
              return 3000
            break
          case 'COLORECTAL_CANCER':
            if (!ncdData.colorectal?.score || !ncdData.colorectal?.riskLevel)
              return 3000
            break
          case 'CKD':
            if (!ncdData.ckd?.stage && !ncdData.ckdOutput?.stage) return 3000
            break
        }
      }

      // If we reach here, all selected NCDs have complete data
      return false
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
  colorectalCancer?: ColorectalCancerRequest
  ckd?: CKDRequest
  diabetes?: DiabetesRequest
  status?: string
}

interface Prediction {
  high: number
  low: number
  moderate: number
  month: number
}

interface TenYearPrediction {
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
  serumCreatinine?: string
  psaLevel?: string
}

export interface Cardiac {
  chestPain: string
  chestPainLocation: string
  painOnExertion: string
  slowDownWithPain: string
  painRelievedByRest: string
  painDurationLessThan10Min: string
  severePainOver30Min: string
  strokeSymptoms: string
}

export interface FamilyHistory {
  cvd: string
  cvdOthers?: string
  diabetes: string
  hypertension: string
  breastCancer: string
  ovarianCancer: string
  prostateCancer: string
  colorectalCancer: string
  otherNcds: string
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
  usesAntihypertensiveMedication?: string
}

export interface PersonalInfo {
  gender: string
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: string
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
  hasHistoryHighBloodGlucose?: string
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

export interface CKDRequest {
  age: string
  serumCreatinine: string
  diabetes: string
  hypertension: string
  familyHistory: string
}

export interface DiabetesRequest {
  age: string
  bmi: string
  waist: string
  physicalActivity: string
  familyHistory: string
  usesAntihypertensiveMedication: string
  hasHistoryHighBloodGlucose: string
}

export interface RiskAssessmentModelResponseData {
  who?: Who
  findrisc?: Findrisc
  copd?: COPD
  breastCancer?: BreastCancer
  prostate?: ProstateCancer & NCDOutput
  colorectal?: ColorectalCancer
  ckd?: CKD & NCDOutput
  ckdOutput?: NCDOutput
  healthdata?: any
  prostateOutput?: NCDOutput
  colorectalOutput?: NCDOutput
  copdOutput?: NCDOutput
  breastCancerOutput?: NCDOutput
  criticalAlerts: CriticalAlert[]
  predictions?: Prediction[]
}

export interface CriticalAlert {
  severity: string
  title: string
  description: string
}

export interface Findrisc {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  findRiscScorePoint?: number
  riskLevel: string
  breakdown: FindriscBreakdown
  status: boolean
  diseaseBreakdown: { [key: string]: number }
  predictions?: Prediction[]
  _id?: string
}

export interface FindriscBreakdown {
  age: number
  bmi: number
  waistCircumference?: number
  physicalActivity: number
  familyHistory: number
  diet: number
  fruitVegetableIntake?: number
  antihypertensiveMedication?: number
  highBloodGlucoseHistory?: number
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
  tenYearPredictions?: TenYearPrediction[]
  _id?: string
}

export interface WhoBreakdown {
  age: number
  BMI?: number
  bmi?: number
  bloodPressure: number
  smoking: number
  diabetes: number
  cholesterol: number
}

export type RiskData = RiskAssessmentModelResponseData &
  Partial<RiskAssessmentModelRequestData>

// New NCD Model Interfaces
export interface COPD {
  followUpAction?: string
  lifestyleModification?: string
  personalizedAdvice?: string
  score?: string
  riskLevel?: string
  breakdown?: COPDBreakdown
  status?: boolean
  diseaseBreakdown?: { [key: string]: number }
  predictions?: Prediction[]
  // New COPD structure
  riskScore?: number
  riskCategory?: string
  copdRisk?: string
  lungCancerRisk?: string
  recommendations?: string[]
}
export interface COPDRequest {
  coughDuration?: string
  shortnessOfBreath?: string
  activityLimitations?: string
  exposureToDust?: string
  pefLevel?: string
}

export interface ColorectalCancerRequest {
  personalHistory?: string
  personalHistoryPolyps?: string
  inflammatoryBowelDisease?: string
  familyHistoryColorectalCancer?: string
  familyHistoryPolyps?: string
  numberOfRelatives?: string
  colonoscopyHistory?: string
  polypDiagnosis?: string
  aspirinUse?: string
  nsaidUse?: string
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
  breakdown?: BreastCancerBreakdown
  status: boolean
  diseaseBreakdown?: { [key: string]: number }
  predictions?: Prediction[]
  _id?: string
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
  eGFR: number
  interpretation: string
  recommendation: string
  stage: string
}

export interface NCDOutput {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  status: boolean
  _id?: string
}
