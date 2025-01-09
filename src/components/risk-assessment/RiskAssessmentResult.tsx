import React, { useMemo, useState } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { motion } from 'framer-motion'
import { IconPicker } from '../ui/icon-picker'
import { ToastField } from '../ui/toast'
import { RiskAssessmentModelResponseData } from '@/hooks/queries/useRiskAssessment'
import ThresholdChart from '../ui/chart'
import { useFormContext } from 'react-hook-form'
import calculateAge from '@/utils/calculateAge'
import DashboardProgressPattern from '../svg/dashboard-progress-pattern'
import DashboardProgress from '../svg/dashboard-progess'
import { categorizeBMIWHO2007 } from '@/utils/vitalCalculations'
import { BadgeField } from '../ui/badge'
import { PageCard } from '../ui/page-card'
import { Card } from '../ui/card'

// Color constants based on the guide
const WHO_COLORS = {
  low: ['#6FCF97', '#27AE60'],
  moderate: ['#F2C94C', '#F2994A'],
  high: ['#EB5757', '#C0392B'],
}

const FINDRISC_COLORS = {
  low: ['#D5F5E3', '#82E0AA'],
  moderate: ['#FCF3CF', '#F7DC6F'],
  high: ['#FAD7A0', '#F39C12'],
  veryHigh: ['#F5B7B1', '#C0392B'],
}

interface IRiskGuage {
  score: number
  title: string
  type?: 'who' | 'findrisc' | 'healthdata'
  maxScore?: number
  onClick?: () => void
}

export interface IWHO {
  followUpAction: string
  lifestyleModification: string
  personalizedAdvice: string
  score: string
  riskLevel: string
  breakdown: Breakdown
  status: boolean
}

export type Breakdown = {
  age: number
  bmi: number
  bloodPressure: number
  smoking: number
  diabetes: number
  cholesterol: number
}

// Risk Gauge Component with enhanced styling and interactions
const RiskGauge = ({
  score,
  title,
  type = 'who',
  maxScore = 100,
  onClick,
}: IRiskGuage) => {
  const getColors = () => {
    if (type === 'who') {
      if (score < 10) return WHO_COLORS.low
      if (score < 20) return WHO_COLORS.moderate
      return WHO_COLORS.high
    } else {
      if (score < 7) return FINDRISC_COLORS.low
      if (score < 11) return FINDRISC_COLORS.moderate
      if (score < 14) return FINDRISC_COLORS.high
      return FINDRISC_COLORS.veryHigh
    }
  }

  const data = [
    { name: 'Risk', value: score },
    { name: 'Remaining', value: maxScore - score },
  ]

  return (
    <div className="relative w-48 h-48 cursor-pointer" onClick={onClick}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? getColors()[0] : '#f3f4f6'}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
        <span className="text-2xl font-bold">{score}%</span>
        <p className="text-sm" style={{ color: getColors()[1] }}>
          {title}
        </p>
      </div>
    </div>
  )
}

// Mapping of factor keys to human-readable names
const FACTOR_LABELS: { [key: string]: string } = {
  age: 'Age',
  bmi: 'Body Mass Index',
  bloodPressure: 'Blood Pressure',
  smoking: 'Smoking Status',
  diabetes: 'Diabetes',
  cholesterol: 'Cholesterol Levels',
}

const formatRiskFactors = (factors: Breakdown, totalRiskScore = 0) => {
  // Convert factors to array and calculate percentages
  const formattedFactors = Object.entries(factors)
    .map(([key, value]) => ({
      name: FACTOR_LABELS[key] || key, // Use mapped label or fallback to key
      value: value, // Original value
      percentage: (value / totalRiskScore) * 100, // Calculate percentage contribution
    }))
    // Sort by value in descending order
    .sort((a, b) => b.value - a.value)

  return formattedFactors
}
// Factor Breakdown Chart
const FactorBreakdown = ({ data }: { data: any }) => {
  return (
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
  )
}

// Critical Alerts Component
const CriticalAlerts = ({ alerts }: { alerts: any[] }) => {
  return alerts.length > 0 ? (
    <div className="space-y-4">
      {alerts.map((alert: any, index) => (
        <ToastField
          key={index}
          variant={alert.severity === 'critical' ? 'destructive' : 'warning2'}
          label={alert.title}
          subtext={alert.description}
        />
      ))}
    </div>
  ) : null
}

const RiskAssessmentResult = ({
  data,
}: {
  data: RiskAssessmentModelResponseData
}) => {
  const [activeTab, setActiveTab] = useState<'who' | 'findrisc' | 'healthdata'>(
    'who'
  )
  const { watch } = useFormContext()

  const activeData = data?.[activeTab] ?? null
  const { bmi, pulse, height, weight, waist } = watch('vitals', {})
  const fullname = watch('personalInfo.fullName')
  const { gender: genderVal, dateOfBirth } = watch('personalInfo', {})

  const gender = genderVal?.toLowerCase()
  const age = calculateAge(dateOfBirth)
  console.log(age, gender, bmi, pulse, '😘')
  const dataItems = [
    {
      id: '1',
      title: fullname,
      description: 'Name',
      icon: <IconPicker icon="primary" size={40} className="text-white" />,
    },
    {
      id: '2',
      title: height ? height + 'CM' : '-',
      description: 'Height',
      icon: <IconPicker icon="measurement" size={40} className="text-white" />,
    },
    {
      id: '3',
      title: gender ?? '-',
      description: 'Gender',
      icon: <IconPicker icon="gender" size={40} className="text-white" />,
    },
    {
      id: '4',
      title: weight + 'KG' ?? '-',
      description: 'Weight',
      icon: <IconPicker icon="weight" size={40} className="text-white" />,
    },
    {
      id: '5',
      title: age + ' years' ?? '-',
      description: 'Age',
      icon: <IconPicker icon="ageIcon" size={40} className="text-white" />,
    },
    {
      id: '6',
      title: waist + 'CM' ?? '-',
      description: 'Waist',
      icon: <IconPicker icon="waist" size={40} className="text-white" />,
    },
  ]
  const recommendations = useMemo(
    () =>
      activeData
        ? [
            {
              title: 'Personalized Advice',
              description: activeData?.personalizedAdvice,
            },
            {
              title: 'Lifestyle Modification',
              type: 'lifestyle',
              description: activeData?.lifestyleModification,
            },
            { title: 'Medical Advice', description: activeData.followUpAction },
          ]
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab]
  )

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-2xl font-bold">Risk Assessment Results</h2>
        {activeTab === 'who' ? (
          <IconPicker icon="health" className="text-primary" />
        ) : (
          <IconPicker icon="document" size={16} /> //activity
        )}
      </div>

      <div className="mb-6">
        <CriticalAlerts alerts={data.criticalAlerts ?? []} />
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'who' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('who')}
        >
          Cardiovascular Risk (WHO)
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'findrisc' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('findrisc')}
        >
          Diabetes Risk (FINDRISC)
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'healthdata' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('healthdata')}
        >
          Health Data
        </button>
      </div>
      {activeTab === 'healthdata' && (
        <>
          <div className="grid grid-cols-2 gap-x-3">
            <div>
              <ThresholdChart name="BMI" healthData={bmi} units="kg/m2" />
            </div>
            <div>
              <ThresholdChart name="Pulse" healthData={pulse} units="BPM" />
            </div>
          </div>
          <div className="space-y-6 mt-9">
            <PageCard title="Data Summary" bodyStyle="p-4">
              <div className="grid md:grid-rows-3 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                {dataItems.slice(0, 6).map((item) => (
                  <Card key={item.id} {...item} className="w-full capitalize" />
                ))}
              </div>
              <div className="grid md:grid-rows-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-y-4">
                  <div className="relative justify-center items-center flex">
                    <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
                    <DashboardProgress
                      progress={bmi}
                      variant={categorizeBMIWHO2007(age, gender, bmi)?.variant}
                    />
                  </div>
                  <BadgeField
                    variant={categorizeBMIWHO2007(age, gender, bmi)?.variant}
                    value={categorizeBMIWHO2007(age, gender, bmi)?.message}
                  />
                </div>
              </div>
            </PageCard>
          </div>
        </>
      )}

      {activeData && (
        <>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">
                {activeTab === 'who'
                  ? 'Cardiovascular Risk Score'
                  : activeTab === 'healthdata'
                    ? 'Health Data'
                    : ' Diabetes Risk Score'}
              </h3>
              <div className="flex justify-center">
                <RiskGauge
                  score={parseInt(activeData.score)}
                  title={activeData.riskLevel}
                  type={activeTab}
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">
                Contributing Factors
              </h3>
              <FactorBreakdown
                data={formatRiskFactors(
                  activeData.breakdown,
                  parseInt(activeData.score)
                )}
              />
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
            <div className="space-y-4">
              {recommendations?.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded"
                >
                  <div className="mr-4">
                    {rec.type === 'lifestyle' ? (
                      <IconPicker icon="document" size={16} /> //activity
                    ) : (
                      <IconPicker
                        icon="profile2User"
                        className="text-primary"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{rec.title}</h4>
                    <p className="text-gray-600">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

export { RiskAssessmentResult }
