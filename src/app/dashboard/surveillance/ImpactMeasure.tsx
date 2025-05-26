import React, { useState } from 'react'
import SurveillanceCard from '@/components/SurveillanceCard'
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type FunnelDataItem = {
  name: string
  value: number
  percentage: string
  fill: string
}

type FunnelDataType = {
  [key: string]: FunnelDataItem[]
}

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const funnelData: FunnelDataType = {
  hypertension: [
    {
      name: 'Total population at risk',
      value: 35000,
      percentage: '35%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 28000,
      percentage: '28%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 21000, percentage: '21%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 17500, percentage: '17.5%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 14000,
      percentage: '14%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 10500,
      percentage: '10.5%',
      fill: '#73A9F5',
    },
  ],
  cancer: [
    {
      name: 'Total population at risk',
      value: 15000,
      percentage: '15%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 12000,
      percentage: '12%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 9000, percentage: '9%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 7500, percentage: '7.5%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 6000,
      percentage: '6%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 4500,
      percentage: '4.5%',
      fill: '#73A9F5',
    },
  ],
  stroke: [
    {
      name: 'Total population at risk',
      value: 20000,
      percentage: '20%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 16000,
      percentage: '16%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 12000, percentage: '12%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 10000, percentage: '10%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 8000,
      percentage: '8%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 6000,
      percentage: '6%',
      fill: '#73A9F5',
    },
  ],
  diabetes: [
    {
      name: 'Total population at risk',
      value: 25000,
      percentage: '25%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 20000,
      percentage: '20%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 15000, percentage: '15%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 12500, percentage: '12.5%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 10000,
      percentage: '10%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 7500,
      percentage: '7.5%',
      fill: '#73A9F5',
    },
  ],
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white shadow-md rounded-lg p-2">
        <p className="text-gray-800 font-semibold">{data.name}</p>
        <p className="text-sm text-gray-600">
          {data.value.toLocaleString()} people ({data.percentage})
        </p>
      </div>
    )
  }
  return null
}

const ImpactMeasure: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Track and visualize disease hotspots and trends across regions in real time."
      title="Impact Measurement"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section (Text Content) */}
        <div className="w-full md:w-1/3 text-gray-700 text-sm">
          <p>
            <strong>Outcome:</strong> $1.2M saved in emergency care through
            early intervention and prevention.
          </p>
          <p className="mt-3">
            <strong>Intervention:</strong>{' '}
            {funnelData[selectedDisease][4].value.toLocaleString()} received
            treatment → Reduced complications by 35%.
          </p>
          <p className="mt-3">
            <strong>Screening:</strong>{' '}
            {funnelData[selectedDisease][2].value.toLocaleString()} screened →
            Early detection prevented{' '}
            {Math.round(
              funnelData[selectedDisease][2].value * 0.15
            ).toLocaleString()}{' '}
            severe cases.
          </p>
        </div>

        {/* Right Section (Funnel Chart) */}
        <div className="w-full md:w-2/3">
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                color="#1570EF"
                dataKey="value"
                data={(funnelData as any)[selectedDisease]}
                isAnimationActive
              >
                <LabelList
                  position="right"
                  fill="#000"
                  fontSize={10}
                  stroke="none"
                  dataKey="name"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SurveillanceCard>
  )
}

export default ImpactMeasure
