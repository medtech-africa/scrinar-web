import React, { useState } from 'react'
import SurveillanceCard from '@/components/SurveillanceCard'
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const funnelData = {
  hypertension: [
    {
      name: 'Total population at risk',
      value: 5000,
      percentage: '15%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 4500,
      percentage: '17%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 4256, percentage: '16%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 4256, percentage: '16%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 3675,
      percentage: '14%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 3675,
      percentage: '14%',
      fill: '#73A9F5',
    },
  ],
  cancer: [
    {
      name: 'Total population at risk',
      value: 3000,
      percentage: '10%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 2800,
      percentage: '12%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 2500, percentage: '11%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 2300, percentage: '10%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 2000,
      percentage: '9%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 1800,
      percentage: '8%',
      fill: '#73A9F5',
    },
  ],
  stroke: [
    {
      name: 'Total population at risk',
      value: 4000,
      percentage: '12%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 3800,
      percentage: '14%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 3500, percentage: '13%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 3300, percentage: '12%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 3000,
      percentage: '11%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 2800,
      percentage: '10%',
      fill: '#73A9F5',
    },
  ],
  diabetes: [
    {
      name: 'Total population at risk',
      value: 6000,
      percentage: '18%',
      fill: '#082D60',
    },
    {
      name: 'Reached by Awareness Campaigns',
      value: 5500,
      percentage: '20%',
      fill: '#0D438F',
    },
    { name: 'Screened', value: 5000, percentage: '18%', fill: '#115ABF' },
    { name: 'Diagnosed', value: 4800, percentage: '17%', fill: '#1570EF' },
    {
      name: 'Received Treatment',
      value: 4500,
      percentage: '16%',
      fill: '#448DF2',
    },
    {
      name: 'Condition Under Control',
      value: 4200,
      percentage: '15%',
      fill: '#73A9F5',
    },
  ],
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2">
        <p className="text-gray-800 font-semibold">Outcomes</p>
        <p className="text-sm text-gray-600">
          69% successfully managed their BP
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
            <strong>Outcome:</strong> $2M saved in emergency care due to early
            intervention.
          </p>
          <p className="mt-3">
            <strong>Intervention:</strong> 3,675 received treatment → Reduced
            long-term complications by 40%.
          </p>
          <p className="mt-3">
            <strong>Screening:</strong> 4,256 screened → Early detection
            prevented 1,500 severe cases.
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
