import React, { useState } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { motion } from 'framer-motion'
import { ToastField } from '../ui/toast'
import {
  Findrisc,
  FindriscBreakdown,
  RiskData,
  Who,
  WhoBreakdown,
  COPD,
  COPDBreakdown,
  BreastCancer,
  BreastCancerBreakdown,
  ProstateCancer,
  ProstateCancerBreakdown,
  ColorectalCancer,
  ColorectalCancerBreakdown,
  CKD,
  CKDBreakdown,
} from '@/hooks/queries/useRiskAssessment'
// import { useFormContext } from 'react-hook-form'
// import calculateAge from '@/utils/calculateAge'
import { PageCard } from '../ui/page-card'
import { Button } from '../ui/button'
import { Skeleton } from '@/components/ui/skeleton'
// import { cn } from '@/lib/utils'
import { Text } from '../ui/text'
import { RiskTrendGraph } from './RiskTrendGraph'
import { RiskGaugeBar } from './RiskGaugeBar'
import PreventionTips from './PreventionTips'
import DiseaseBreakdown from './DiseaseBreakdown'
import RiskSummary from './RiskSummary'
import { NCD } from '@/types/riskAssessment.types'

// Types
export type RiskType =
  | 'who'
  | 'findrisc'
  | 'copd'
  | 'breastCancer'
  | 'prostateCancer'
  | 'colorectalCancer'
  | 'ckd'
export type RiskLevel = 'low' | 'moderate' | 'high'

export interface IRiskBreakdownItem {
  name: string
  value: number
}

// interface IRiskRecommendation {
//   icon: string
//   title: string
//   description: string
// }

interface IClinicalAlert {
  severity: 'warning' | 'critical'
  title: string
  description: string
}

// // Shared constants
// const RISK_COLORS = {
//   low: '#6FCF97',
//   moderate: '#F2C94C',
//   high: '#EB5757',
// }

const FACTOR_LABELS: { [key: string]: string } = {
  age: 'Age',
  bmi: 'Body Mass Index',
  bloodPressure: 'Blood Pressure',
  smoking: 'Smoking Status',
  diabetes: 'Diabetes',
  cholesterol: 'Cholesterol Levels',
  // COPD factors
  coughDuration: 'Chronic Cough',
  shortnessOfBreath: 'Shortness of Breath',
  activityLimitations: 'Activity Limitations',
  exposureToDust: 'Dust Exposure',
  smokingHistory: 'Smoking History',
  // Breast Cancer factors
  ageAtMenarche: 'Age at Menarche',
  ageAtFirstBirth: 'Age at First Birth',
  ageAtMenopause: 'Age at Menopause',
  hormoneReplacementTherapy: 'Hormone Replacement Therapy',
  benignBreastDisease: 'Benign Breast Disease',
  familyHistory: 'Family History',
  brcaMutationStatus: 'BRCA Mutation Status',
  breastDensity: 'Breast Density',
  // Prostate Cancer factors
  psaLevel: 'PSA Level',
  digitalRectalExam: 'Digital Rectal Exam',
  prostateVolume: 'Prostate Volume',
  previousBiopsy: 'Previous Biopsy',
  freeToTotalPsaRatio: 'Free-to-Total PSA Ratio',
  ethnicity: 'Ethnicity',
  urinarySymptoms: 'Urinary Symptoms',
  // Colorectal Cancer factors
  personalHistory: 'Personal History',
  smokingStatus: 'Smoking Status',
  diet: 'Diet',
  physicalActivity: 'Physical Activity',
  medicalHistory: 'Medical History',
  medicationUse: 'Medication Use',
  // CKD factors
  serumCreatinine: 'Serum Creatinine',
  cardiovascularDisease: 'Cardiovascular Disease',
  medications: 'Medications',
  symptoms: 'Symptoms',
  lifestyle: 'Lifestyle',
}

const formatRiskFactors = (
  factors?:
    | FindriscBreakdown
    | WhoBreakdown
    | COPDBreakdown
    | BreastCancerBreakdown
    | ProstateCancerBreakdown
    | ColorectalCancerBreakdown
    | CKDBreakdown,
  totalRiskScore = 0
) => {
  const formattedFactors = Object.entries(factors ?? {})
    .map(([key, value]) => ({
      name: FACTOR_LABELS[key] || key, // Use mapped label or fallback to key
      value: value, // Original value
      percentage: (value / totalRiskScore) * 100, // Calculate percentage contribution
    }))
    .sort((a, b) => b.value - a.value)

  return formattedFactors
}
const FactorBreakdown = ({
  data,
  isLoading = false,
}: {
  data: any
  isLoading?: boolean
}) => {
  if (isLoading) {
    return <Skeleton className="w-full h-80" />
  }

  if (!data) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
        <p className="text-gray-500">No risk factor data available</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8 p-4 border rounded-2xl border-grey-400">
        <Text className="font-medium text-grey-700 mb-2">
          Here are some conditions that cannot be altered; they contribute to an
          individual&apos;s baseline risk of cardiovascular diseases
        </Text>

        <div className="space-y-4">
          <div className="flex items-center gap-1">
            <Text className="font-medium">Age:</Text>
            <Text variant="text/sm" className="flex-1">
              The risk of CVD goes up as you get older. This is because blood
              vessels can stiffen, and arteries may build up plaque over time.
            </Text>
          </div>

          <div className="flex items-center gap-1">
            <Text className="font-medium">Gender:</Text>
            <Text variant="text/sm" className="flex-1">
              Men are generally at higher risk earlier in life, though risk for
              women increases post-menopause.
            </Text>
          </div>

          <div className="flex items-center gap-1">
            <Text className="font-medium">Family history:</Text>
            <Text variant="text/sm" className="flex-1">
              Some people are more likely to have heart diseases because it runs
              in their family.
            </Text>
          </div>
        </div>
      </div>

      <div className="w-full h-64">
        {data === undefined ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="mt-6 text-sm">
        Managing underlying conditions listed above like high blood pressure,
        unhealthy diet or high cholesterol with the help of your healthcare
        provider would significantly improve your quality of life and reduce the
        risk over the next 10 years.
      </p>
    </div>
  )
}

// Clinical summary component
const ClinicalSummary = ({
  data,
  isLoading = false,
}: {
  data:
    | Who
    | Findrisc
    | COPD
    | BreastCancer
    | ProstateCancer
    | ColorectalCancer
    | CKD
    | null
  isLoading?: boolean
}) => {
  if (isLoading) {
    return <Skeleton className="w-full h-[500px]" />
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg border">
      <Text as="h3" className="text-base font-medium">
        AI-Generated Clinical Summary
      </Text>

      <Text className="text-sm text-gray-600 mb-4">
        AI-Generated Summary gives clinicians a concise patient overview,
        highlighting key diagnoses, risk levels, and recommended actions.
      </Text>

      <div className="mb-4">
        <h4 className="font-medium">Patient Overview</h4>
        {data?.personalizedAdvice === undefined ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <p className="text-sm">{data?.personalizedAdvice}</p>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-medium">Lifestyle Modifications</h4>
        {data?.lifestyleModification === undefined ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <p className="text-sm">{data?.lifestyleModification}</p>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-medium">Follow-up Actions</h4>
        {data?.followUpAction === undefined ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <p className="text-sm">{data?.followUpAction}</p>
        )}
      </div>
    </div>
  )
}

const RecommendationList = () => {
  const recommendations = [
    '🩺  Schedule cardiology consult" (if stroke/CVD risk rises)',
    '💊  Adjust antihypertensive meds" (if BP is consistently high)',
    '‍♂️  Encourage exercise & weight management" (if metabolic risk worsens)',
  ]

  return (
    <div className="mt-4">
      <Text className="font-medium mb-2">
        Recommendations based on risk trend
      </Text>
      <ul className="space-y-2">
        {recommendations.map((rec) => (
          <Text variant="text/sm" key={rec}>
            {rec}
          </Text>
        ))}
      </ul>
    </div>
  )
}

// Critical alerts component
const CriticalAlerts = ({ alerts }: { alerts?: IClinicalAlert[] }) => {
  if (!alerts || alerts.length === 0) return null

  return (
    <div className="space-y-4" data-testid="critical-alerts">
      {alerts.map((alert, index) => (
        <ToastField
          key={`alert-${index}`}
          variant={alert.severity === 'critical' ? 'destructive' : 'warning2'}
          label={alert.title}
          subtext={alert.description}
        />
      ))}
    </div>
  )
}

// Main component
export const RiskAssessmentResult: React.FC<{
  data?: RiskData
  isLoading?: boolean
  ncdType?: string
}> = ({ data, isLoading = false, ncdType }) => {
  const RISK_TABS: { id: RiskType; label: string; show: boolean }[] = [
    {
      id: 'who',
      label: 'Cardiovascular risk',
      show: ncdType ? ncdType === 'all' || ncdType === NCD.CVD : true,
    },
    {
      id: 'findrisc',
      label: 'Diabetes risk',
      show: ncdType ? ncdType === 'all' || ncdType === NCD.DIABETES : true,
    },
    {
      id: 'copd',
      label: 'COPD risk',
      show: ncdType ? ncdType === 'all' || ncdType === NCD.COPD : true,
    },
    {
      id: 'breastCancer',
      label: 'Breast Cancer risk',
      show: ncdType ? ncdType === 'all' || ncdType === NCD.BREAST_CANCER : true,
    },
    {
      id: 'prostateCancer',
      label: 'Prostate Cancer risk',
      show: ncdType
        ? ncdType === 'all' || ncdType === NCD.PROSTATE_CANCER
        : true,
    },
    {
      id: 'colorectalCancer',
      label: 'Colorectal Cancer risk',
      show: ncdType
        ? ncdType === 'all' || ncdType === NCD.COLORECTAL_CANCER
        : true,
    },
    {
      id: 'ckd',
      label: 'CKD risk',
      show: ncdType ? ncdType === 'all' || ncdType === NCD.CKD : true,
    },
  ]

  const [activeTab, setActiveTab] = useState<RiskType>(
    ncdType !== NCD.DIABETES ? 'who' : 'findrisc'
  )

  const isWHO = activeTab === 'who'

  // const formContext = useFormContext()

  // const vitals = formContext
  //   ? formContext.watch('vitals', {})
  //   : data?.vitals || {}
  // const personalInfo = formContext
  //   ? formContext.watch('personalInfo', {})
  //   : data?.personalInfo || {}

  // const { bmi = 0, pulse = 0, height = 0, weight = 0, waist = 0 } = vitals
  // const {
  //   gender: genderVal = '',
  //   dateOfBirth = '',
  //   fullName = '',
  // } = personalInfo

  // const gender = genderVal?.toLowerCase() || ''
  // const age = dateOfBirth ? calculateAge(dateOfBirth) : 0

  const { activeData, criticalAlerts, predictions } = useActiveRiskData(
    activeTab,
    data
  )

  const riskLevel = getRiskLevel(Number(activeData?.score) ?? 0)

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-40" />
          ))}
        </div>
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className=" mx-auto"
      data-testid="risk-assessment-results"
    >
      <div className="mb-4 md:mb-6">
        <Text as="h2" variant="display/xs" className="font-medium">
          Risk Assessment Result
        </Text>
        <p className="text-sm text-gray-500">
          This content was generated by an AI. It is intended for informational
          purposes only and should not be considered a substitute for
          professional advice or expert opinion.
        </p>
      </div>

      <div className="mb-6">
        <CriticalAlerts alerts={criticalAlerts as IClinicalAlert[]} />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {RISK_TABS.map(
          (tab) =>
            tab.show && (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'tertiary'}
                onClick={() => setActiveTab(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
              </Button>
            )
        )}
      </div>

      <div className="space-y-8">
        <>
          <div>
            <Text as="h2" className="font-medium mb-2">
              Risk Score
            </Text>
            <p className="text-sm text-gray-600 mb-4">
              The risk score helps you make lifestyle changes or take medical
              advise to prevent heart disease.
            </p>

            <RiskGaugeBar
              score={parseFloat(activeData?.score ?? '0')}
              riskLevel={activeData?.riskLevel ?? ''}
              type={getRiskTypeLabel(activeTab)}
            />

            <RiskSummary
              score={parseFloat(activeData?.score ?? '0')}
              level={riskLevel}
              type={getRiskTypeForSummary(activeTab)}
            />

            {isWHO && (
              <div className="mt-6">
                <PreventionTips />
              </div>
            )}
          </div>

          <ClinicalSummary data={activeData} isLoading={isLoading} />

          <PageCard
            className="p-4 md:p-6 border-[0.2px] border-grey-300 rounded-lg"
            title="Short-term & Mid-term Prediction"
          >
            <RiskTrendGraph predictions={predictions ?? []} level={riskLevel} />
            <RecommendationList />
          </PageCard>

          <PageCard
            title="Contributing Factors"
            subtitle="These are some conditions and behaviors that increase the risk of cardiovascular diseases"
          >
            <FactorBreakdown
              data={formatRiskFactors(
                activeData?.breakdown,
                parseInt(activeData?.score || '0')
              )}
              isLoading={isLoading}
            />
          </PageCard>
          {activeData?.diseaseBreakdown === undefined ? (
            <div className="w-full bg-white p-6 rounded-lg border mb-4">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </div>
            </div>
          ) : (
            activeData?.diseaseBreakdown && (
              <div className="w-full bg-white p-6 rounded-lg border mb-4">
                <DiseaseBreakdown data={activeData?.diseaseBreakdown} />
              </div>
            )
          )}
        </>
      </div>
    </motion.div>
  )
}

// Here's how the hooks and utility files might look:

// src/hooks/useActiveRiskData.ts
export const useActiveRiskData = (activeTab: RiskType, data?: RiskData) => {
  // Get the active tab data from real data or fallback to mock

  const activeData = data?.[activeTab] || null
  return {
    activeData,
    criticalAlerts: data?.criticalAlerts || null,
    predictions: activeData?.predictions || [],
  }
}

export const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 15) return 'high'
  if (score >= 5) return 'moderate'
  return 'low'
}

export const getRiskColor = (riskLevel: RiskLevel): string => {
  const colors = {
    low: '#6FCF97',
    moderate: '#F2C94C',
    high: '#EB5757',
  }
  return colors[riskLevel] || colors.low
}

// Helper function to get risk type label
const getRiskTypeLabel = (activeTab: RiskType): string => {
  switch (activeTab) {
    case 'who':
      return 'CVD'
    case 'findrisc':
      return 'Diabetes'
    case 'copd':
      return 'COPD'
    case 'breastCancer':
      return 'Breast Cancer'
    case 'prostateCancer':
      return 'Prostate Cancer'
    case 'colorectalCancer':
      return 'Colorectal Cancer'
    case 'ckd':
      return 'CKD'
    default:
      return 'CVD'
  }
}

// Helper function to get risk type for summary
const getRiskTypeForSummary = (
  activeTab: RiskType
):
  | 'cvd'
  | 'diabetes'
  | 'copd'
  | 'breastCancer'
  | 'prostateCancer'
  | 'colorectalCancer'
  | 'ckd' => {
  switch (activeTab) {
    case 'who':
      return 'cvd'
    case 'findrisc':
      return 'diabetes'
    case 'copd':
      return 'copd'
    case 'breastCancer':
      return 'breastCancer'
    case 'prostateCancer':
      return 'prostateCancer'
    case 'colorectalCancer':
      return 'colorectalCancer'
    case 'ckd':
      return 'ckd'
    default:
      return 'cvd'
  }
}

export default RiskAssessmentResult
