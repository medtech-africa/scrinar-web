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
// import { FaFilter } from 'react-icons/fa'
import SurveillanceCard from '@/components/SurveillanceCard'

interface AgeGroup {
  key: string
  color: string
}

interface RiskFactor {
  name: string
  '18-29': number
  '30-49': number
  '50+': number
}

interface RiskData {
  [key: string]: RiskFactor[]
}

const ageGroups: AgeGroup[] = [
  { key: '18-29', color: '#4178FD' },
  { key: '30-49', color: '#12DCC4' },
  { key: '50+', color: '#0B0E28' },
]

const riskData: RiskData = {
  cancer: [
    {
      name: 'Smoking',
      '18-29': 12.5,
      '30-49': 18.3,
      '50+': 22.7,
    },
    {
      name: 'Unhealthy Diet',
      '18-29': 38.2,
      '30-49': 45.8,
      '50+': 42.5,
    },
    {
      name: 'Physical Inactivity',
      '18-29': 28.6,
      '30-49': 35.3,
      '50+': 48.7,
    },
    {
      name: 'Alcohol Consumption',
      '18-29': 15.8,
      '30-49': 22.5,
      '50+': 25.3,
    },
    {
      name: 'Obesity',
      '18-29': 18.4,
      '30-49': 25.8,
      '50+': 22.5,
    },
    {
      name: 'UV Exposure',
      '18-29': 45.2,
      '30-49': 38.6,
      '50+': 32.5,
    },
  ],
  diabetes: [
    {
      name: 'Unhealthy Diet',
      '18-29': 42.2,
      '30-49': 58.8,
      '50+': 52.5,
    },
    {
      name: 'Physical Inactivity',
      '18-29': 32.6,
      '30-49': 45.3,
      '50+': 62.7,
    },
    {
      name: 'Obesity',
      '18-29': 22.4,
      '30-49': 35.8,
      '50+': 28.5,
    },
    {
      name: 'Stress',
      '18-29': 32.5,
      '30-49': 48.6,
      '50+': 38.8,
    },
    {
      name: 'Family History',
      '18-29': 15.4,
      '30-49': 22.8,
      '50+': 28.5,
    },
    {
      name: 'Sleep Deprivation',
      '18-29': 35.4,
      '30-49': 42.8,
      '50+': 38.5,
    },
  ],
  hypertension: [
    {
      name: 'Salt Intake',
      '18-29': 68.4,
      '30-49': 75.8,
      '50+': 72.5,
    },
    {
      name: 'Physical Inactivity',
      '18-29': 38.6,
      '30-49': 45.3,
      '50+': 58.7,
    },
    {
      name: 'Stress',
      '18-29': 32.5,
      '30-49': 48.6,
      '50+': 38.8,
    },
    {
      name: 'Alcohol Consumption',
      '18-29': 15.8,
      '30-49': 22.5,
      '50+': 18.3,
    },
    {
      name: 'Obesity',
      '18-29': 25.4,
      '30-49': 32.8,
      '50+': 28.5,
    },
    {
      name: 'Smoking',
      '18-29': 10.5,
      '30-49': 14.3,
      '50+': 12.7,
    },
  ],
  stroke: [
    {
      name: 'Hypertension',
      '18-29': 15.4,
      '30-49': 28.8,
      '50+': 42.5,
    },
    {
      name: 'Physical Inactivity',
      '18-29': 32.6,
      '30-49': 42.3,
      '50+': 58.7,
    },
    {
      name: 'Smoking',
      '18-29': 12.5,
      '30-49': 18.3,
      '50+': 22.7,
    },
    {
      name: 'Alcohol Consumption',
      '18-29': 18.8,
      '30-49': 25.5,
      '50+': 28.3,
    },
    {
      name: 'Obesity',
      '18-29': 22.4,
      '30-49': 28.8,
      '50+': 25.5,
    },
    {
      name: 'Stress',
      '18-29': 28.5,
      '30-49': 42.6,
      '50+': 35.8,
    },
  ],
}

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const BehaviouralRisk: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      title="Behavioral Risk Factor"
      subtitle="Tracks progress of awareness campaigns targeting these behaviors."
    >
      <div className="flex items-center space-x-4 mb-4">
        <button className="flex items-center px-3 py-2 border rounded-md text-gray-600">
          {/* <FaFilter className="mr-2" /> */}
          Filter
        </button>
        <div className="flex space-x-4">
          {ageGroups.map(({ key, color }) => (
            <div key={key} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span className="text-sm text-gray-600">{key}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={riskData[selectedDisease]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeOpacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          {ageGroups.map(({ key, color }) => (
            <Bar key={key} dataKey={key} fill={color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default BehaviouralRisk
