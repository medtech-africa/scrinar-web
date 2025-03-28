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
import { IconPicker } from '../ui/icon-picker'
import { ToastField } from '../ui/toast'
import {
  Findrisc,
  FindriscBreakdown,
  RiskData,
  Who,
  WhoBreakdown,
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
import Link from 'next/link'
import DiseaseBreakdown from './DiseaseBreakdown'
import RiskSummary from './RiskSummary'

// Types
export type RiskType = 'who' | 'findrisc'
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

const RISK_TABS: { id: RiskType; label: string }[] = [
  { id: 'who', label: 'Cardiovascular risk (WHO)' },
  { id: 'findrisc', label: 'Diabetes risk (FINDRISC)' },
]

const FACTOR_LABELS: { [key: string]: string } = {
  age: 'Age',
  bmi: 'Body Mass Index',
  bloodPressure: 'Blood Pressure',
  smoking: 'Smoking Status',
  diabetes: 'Diabetes',
  cholesterol: 'Cholesterol Levels',
}

const formatRiskFactors = (
  factors?: FindriscBreakdown | WhoBreakdown,
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
  data: Who | Findrisc | null
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
        <p className="text-sm">{data?.personalizedAdvice}</p>
      </div>

      {/* <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
            <IconPicker icon="health" className="text-red-500" size={16} />
          </div>
          <h4 className="font-medium">Diagnoses</h4>
        </div>
        <ul className="list-disc ml-8 text-sm space-y-1">
          <li>Prediabetes (HbA1c: 6.0%)</li>
          <li>Mild Hypertension (BP: 140/90)</li>
          <li>Angina Episodes (History Suggests Ischemia)</li>
        </ul>
      </div> */}

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
            <IconPicker icon="document" className="text-orange-500" size={16} />
          </div>
          <h4 className="font-medium">Recommended</h4>
        </div>
        <ul className="list-disc ml-8 text-sm space-y-1">
          {data?.lifestyleModification
            ?.split('.')
            .map((rec) => rec && <li key={rec}>{rec}</li>)}
        </ul>
      </div>

      {/* <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
            <IconPicker icon="alertCircle" className="text-red-500" size={16} />
          </div>
          <h4 className="font-medium">Stroke Risk Alert: 12% over 6 months</h4>
        </div>
      </div> */}

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
            <IconPicker icon="calendar" className="text-purple-500" size={16} />
          </div>
          <Text variant="text/sm">Follow up Action</Text>
        </div>
        <Text variant="text/sm" className="ml-4">
          {data?.followUpAction}
        </Text>
      </div>

      <div className="mt-6">
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Edit summary</h4>
          <textarea
            className="w-full border rounded-md p-3 h-20"
            placeholder="Add Your Observations"
            aria-label="Clinical observations"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-1"
          >
            <IconPicker icon="userEdit" size={16} /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-primary"
          >
            <IconPicker icon="saveAdd" size={16} /> Save to EHR
          </Button>

          <div className="flex-1" />
          <Link target="_blank" href="https://forcardio.app">
            <Button className="ml-auto">Schedule consultation</Button>
          </Link>
        </div>
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
}> = ({ data, isLoading = false }) => {
  const [activeTab, setActiveTab] = useState<RiskType>('who')

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
        {RISK_TABS.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'tertiary'}
            onClick={() => setActiveTab(tab.id)}
            data-testid={`tab-${tab.id}`}
          >
            {tab.label}
          </Button>
        ))}
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
              score={Number(activeData?.score)}
              riskLevel={activeData?.riskLevel ?? ''}
            />

            <RiskSummary
              score={Number(activeData?.score)}
              level={riskLevel}
              type={isWHO ? 'cvd' : 'diabetes'}
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
          {!!activeData?.diseaseBreakdown && (
            <div className="w-full bg-white p-6 rounded-lg border mb-4">
              <DiseaseBreakdown data={activeData?.diseaseBreakdown} />
            </div>
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

export default RiskAssessmentResult
