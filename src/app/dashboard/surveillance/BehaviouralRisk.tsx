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

const ageGroups = [
  { key: '18-30', color: '#4178FD' },
  { key: '32-50', color: '#12DCC4' },
  { key: '51+', color: '#0B0E28' },
]

const data = [
  { name: 'Smoking', '18-30': 20, '32-50': 30, '51+': 40 },
  { name: 'Unhealthy Diet', '18-30': 25, '32-50': 40, '51+': 45 },
  { name: 'Physical Inactivity', '18-30': 15, '32-50': 50, '51+': 50 },
  { name: 'Alcohol Consumption', '18-30': 20, '32-50': 45, '51+': 45 },
]

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
      subtitle=" Tracks progress of awareness campaigns targeting these behaviors."
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
          data={data}
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
