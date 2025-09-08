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
  RiskAssessmentModelResponseData,
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
import { RiskGaugeBarCOPD } from './RiskGaugeBarCOPD'
import { RiskGaugeBarBreastCancer } from './RiskGaugeBarBreastCancer'
import { RiskGaugeBarColorectal } from './RiskGaugeBarColorectal'
import PreventionTips from './PreventionTips'
import { ResultRiskType as RiskType } from '@/types/riskAssessment.types'
import Link from 'next/link'

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
  BMI: 'Body Mass Index',
  bloodPressure: 'Blood Pressure',
  smoking: 'Smoking Status',
  diabetes: 'Diabetes',
  cholesterol: 'Cholesterol Levels',
  // FINDRISC factors
  waistCircumference: 'Waist Circumference',
  fruitVegetableIntake: 'Fruit & Vegetable Intake',
  antihypertensiveMedication: 'Antihypertensive Medication',
  highBloodGlucoseHistory: 'High Blood Glucose History',
  // COPD factors
  coughDuration: 'Chronic Cough',
  shortnessOfBreath: 'Shortness of Breath',
  activityLimitations: 'Activity Limitations',
  exposureToDust: 'Dust Exposure',
  smokingHistory: 'Smoking History',
  pefLevel: 'PEF Level',
  // Breast Cancer factors
  ageAtMenarche: 'Age at Menarche',
  ageAtFirstBirth: 'Age at First Birth',
  ageAtMenopause: 'Age at Menopause',
  hormoneReplacementTherapy: 'Hormone Replacement Therapy',
  breastBiopsy: 'Breast Biopsy',
  familyHistory: 'Family History',
  brcaMutationStatus: 'BRCA Mutation Status',
  breastDensity: 'Breast Density',
  // Prostate Cancer factors
  // psaLevel: 'PSA Level',
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
    | ColorectalCancerBreakdown,
  totalRiskScore = 0
) => {
  const formattedFactors = Object.entries(factors ?? {})
    .map(([key, value]) => ({
      name: FACTOR_LABELS[key] || key, // Use mapped label or fallback to key
      value: value as number, // Type assertion for value
      percentage: ((value as number) / totalRiskScore) * 100, // Calculate percentage contribution
    }))
    .sort((a, b) => b.value - a.value)

  return formattedFactors
}
const FactorBreakdown = ({
  data,
  isLoading = false,
  activeTab,
}: {
  data: any
  isLoading?: boolean
  activeTab?: RiskType
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
          {activeTab === 'ckd'
            ? "Here are some conditions that cannot be altered; they contribute to an individual's baseline risk of kidney disease"
            : "Here are some conditions that cannot be altered; they contribute to an individual's baseline risk of cardiovascular diseases"}
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
          <ResponsiveContainer width="100%" height={256}>
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
        {activeTab === 'ckd'
          ? 'Managing underlying conditions listed above like diabetes, high blood pressure, or kidney-related issues with the help of your healthcare provider would significantly improve your kidney function and overall health.'
          : 'Managing underlying conditions listed above like high blood pressure, unhealthy diet or high cholesterol with the help of your healthcare provider would significantly improve your quality of life and reduce the risk over the next 10 years.'}
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
    | (CKD & {
        followUpAction?: string
        lifestyleModification?: string
        personalizedAdvice?: string
      })
    | null
  isLoading?: boolean
}) => {
  if (isLoading) {
    return <Skeleton className="w-full h-[500px]" />
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg border">
      <Text as="h3" className="text-base font-medium">
        Scrinar Clinacal Summary
      </Text>

      <Text className="text-sm text-gray-600 mb-4">
        Scrinar Summary gives clinicians a concise patient overview,
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

const RecommendationList = ({ recommendation }: { recommendation: string }) => {
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
      {recommendation ? (
        <Text variant="text/sm">{recommendation}</Text>
      ) : (
        <ul className="space-y-2">
          {recommendations.map((rec) => (
            <Text variant="text/sm" key={rec}>
              {rec}
            </Text>
          ))}
        </ul>
      )}
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
  assessmentId?: string
  showActionButton?: boolean
}> = ({
  data,
  isLoading = false,
  ncdType: _ncdType,
  assessmentId,
  showActionButton,
}) => {
  // Helper function to check if NCD data is available (not empty object)
  const hasValidData = (ncdType: RiskType): boolean => {
    const ncdData = data?.[ncdType]
    if (!ncdData) return false

    // Check if it's an empty object
    if (Object.keys(ncdData).length === 0) return false

    // For CKD, check if it has either the old structure (followUpAction) or new structure (eGFR, stage)
    if (ncdType === 'ckd') {
      const ckdData = ncdData as any // Type assertion for CKD data
      return !!(ckdData.stage || data?.ckdOutput)
    }

    // For other NCDs, check if they have followUpAction (indicating they have actual data)
    return !!(ncdData.score || ncdData.riskLevel)
  }

  const RISK_TABS: { id: RiskType; label: string; show: boolean }[] = [
    {
      id: 'who',
      label: 'Cardiovascular risk',
      show: hasValidData('who'),
    },
    {
      id: 'findrisc',
      label: 'Diabetes risk',
      show: hasValidData('findrisc'),
    },
    {
      id: 'copd',
      label: 'COPD risk',
      show: hasValidData('copd'),
    },
    {
      id: 'breastCancer',
      label: 'Breast Cancer risk',
      show: hasValidData('breastCancer'),
    },
    {
      id: 'prostate',
      label: 'Prostate Cancer risk',
      show: hasValidData('prostate'),
    },
    {
      id: 'colorectal',
      label: 'Colorectal Cancer risk',
      show: hasValidData('colorectal'),
    },
    {
      id: 'ckd',
      label: 'CKD risk',
      show: hasValidData('ckd'),
    },
  ]

  const [activeTab, setActiveTab] = useState<RiskType>(
    RISK_TABS.find((tab) => tab.show)?.id || 'who'
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

  const riskLevel = getRiskLevel(
    parseFloat(String(activeData?.score)?.replace('Stage ', '') ?? '0'),
    activeTab
  )

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

      {showActionButton && assessmentId && (
        <div className="flex justify-end my-4">
          <Link href={`/dashboard/risk-assessment/${assessmentId}`}>
            <Button variant="outline">See Complete Assessment</Button>
          </Link>
        </div>
      )}

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
              {activeTab === 'ckd' ? 'CKD Stage' : 'Risk Score'}
            </Text>
            <p className="text-sm text-gray-600 mb-4">
              {activeTab === 'ckd'
                ? 'The CKD stage indicates the severity of kidney disease and helps guide treatment decisions.'
                : 'The risk score helps you make lifestyle changes or take medical advise to prevent heart disease.'}
            </p>

            {/* Render appropriate gauge component based on NCD type */}
            {activeTab === 'copd' ? (
              <RiskGaugeBarCOPD
                score={parseFloat(activeData?.score ?? '0')}
                riskLevel={activeData?.riskLevel ?? ''}
              />
            ) : activeTab === 'breastCancer' ? (
              <RiskGaugeBarBreastCancer
                data={{
                  tenYearRisk:
                    (activeData as any)?.tenYearRisk ||
                    parseFloat(activeData?.score ?? '0'),
                  lifetimeRisk:
                    (activeData as any)?.lifetimeRisk ||
                    parseFloat(activeData?.score ?? '0'),
                  riskLevel: activeData?.riskLevel ?? '',
                }}
              />
            ) : activeTab === 'colorectal' ? (
              <RiskGaugeBarColorectal
                data={{
                  shortHorizonRisk:
                    parseFloat((activeData as any)?.tenYearRisk) ||
                    parseFloat(activeData?.score ?? '0'),
                  longHorizonRisk:
                    parseFloat((activeData as any)?.lifetimeRisk) ||
                    parseFloat(activeData?.score ?? '0'),
                  riskLevel: activeData?.riskLevel ?? '',
                }}
              />
            ) : (
              <RiskGaugeBar
                score={
                  activeTab === 'ckd'
                    ? parseFloat(
                        String(activeData?.score)?.replace('Stage ', '') ?? '0'
                      )
                    : parseFloat(activeData?.score ?? '0')
                }
                riskLevel={activeData?.riskLevel ?? ''}
                activeTab={activeTab}
                interpretation={
                  activeTab === 'ckd' ? (activeData as any)?.interpretation : ''
                }
              />
            )}

            {isWHO && (
              <div className="mt-6">
                <PreventionTips />
              </div>
            )}
          </div>

          <ClinicalSummary data={activeData} isLoading={isLoading} />

          <PageCard
            className="p-4 md:p-6 border-[0.2px] border-grey-300 rounded-lg"
            title={
              predictions.length > 0 ? 'Short-term & Mid-term Prediction' : ''
            }
          >
            <RiskTrendGraph predictions={predictions ?? []} level={riskLevel} />
            <RecommendationList
              recommendation={
                activeTab === 'ckd'
                  ? (activeData as any)?.recommendation
                  : activeTab === 'who' ||
                      activeTab === 'findrisc' ||
                      activeTab === 'breastCancer' ||
                      activeTab === 'prostate' ||
                      activeTab === 'colorectal'
                    ? (activeData as any)?.recommendation
                    : undefined
              }
            />
          </PageCard>

          {['who', 'findrisc'].includes(activeTab) && (
            <PageCard
              title="Contributing Factors"
              subtitle="These are some conditions and behaviors that increase the risk of cardiovascular diseases"
            >
              <FactorBreakdown
                data={formatRiskFactors(
                  (activeData as any)?.breakdown,
                  parseInt(activeData?.score || '0')
                )}
                isLoading={isLoading}
                activeTab={activeTab}
              />
            </PageCard>
          )}
          {/* {activeData?.diseaseBreakdown === undefined ? (
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
          )} */}
        </>
      </div>
    </motion.div>
  )
}

export const useActiveRiskData = (
  activeTab: RiskType,
  data?: RiskAssessmentModelResponseData
) => {
  let activeData = data?.[activeTab] || null

  if (activeTab === 'ckd' && data?.ckd && data?.ckdOutput) {
    activeData = { ...data.ckd, ...data.ckdOutput }
  }

  if (activeTab === 'prostate' && data?.prostate && data?.prostateOutput) {
    activeData = { ...data.prostate, ...data.prostateOutput }
  }

  if (
    activeTab === 'colorectal' &&
    data?.colorectal &&
    data?.colorectalOutput
  ) {
    activeData = { ...data.colorectal, ...data.colorectalOutput }
  }

  if (activeTab === 'copd' && data?.copd && data?.copdOutput) {
    activeData = { ...data.copd, ...data.copdOutput }
  }

  if (
    activeTab === 'breastCancer' &&
    data?.breastCancer &&
    data?.breastCancerOutput
  ) {
    activeData = { ...data.breastCancer, ...data.breastCancerOutput }
  }

  return {
    activeData,
    criticalAlerts: data?.criticalAlerts || null,
    predictions: data?.predictions || [],
  }
}

export const getRiskLevel = (
  score: number,
  activeTab?: RiskType
): RiskLevel => {
  // Special handling for CKD stages
  if (activeTab === 'ckd') {
    if (score >= 4) return 'high' // Stage 4-5
    if (score >= 2) return 'moderate' // Stage 2-3
    return 'low' // Stage 1
  }

  // Default risk level calculation for other NCDs
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

export default RiskAssessmentResult
