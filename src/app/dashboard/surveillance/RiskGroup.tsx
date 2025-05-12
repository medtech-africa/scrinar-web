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
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'cancer', label: 'Cancer' },
  { value: 'stroke', label: 'Stroke' },
]

const riskData = {
  hypertension: [
    { ageGroup: '0-15', highRisk: 0.5, lowRisk: 1.5, healthy: 98 },
    { ageGroup: '16-30', highRisk: 2, lowRisk: 5, healthy: 93 },
    { ageGroup: '31-45', highRisk: 8, lowRisk: 12, healthy: 80 },
    { ageGroup: '46-55', highRisk: 15, lowRisk: 20, healthy: 65 },
    { ageGroup: '56-70', highRisk: 25, lowRisk: 30, healthy: 45 },
    { ageGroup: '71-85', highRisk: 35, lowRisk: 35, healthy: 30 },
    { ageGroup: '86-100', highRisk: 40, lowRisk: 35, healthy: 25 },
  ],
  cancer: [
    { ageGroup: '0-15', highRisk: 0.2, lowRisk: 0.8, healthy: 99 },
    { ageGroup: '16-30', highRisk: 0.5, lowRisk: 2, healthy: 97.5 },
    { ageGroup: '31-45', highRisk: 2, lowRisk: 5, healthy: 93 },
    { ageGroup: '46-55', highRisk: 5, lowRisk: 10, healthy: 85 },
    { ageGroup: '56-70', highRisk: 12, lowRisk: 18, healthy: 70 },
    { ageGroup: '71-85', highRisk: 20, lowRisk: 25, healthy: 55 },
    { ageGroup: '86-100', highRisk: 25, lowRisk: 30, healthy: 45 },
  ],
  stroke: [
    { ageGroup: '0-15', highRisk: 0.1, lowRisk: 0.4, healthy: 99.5 },
    { ageGroup: '16-30', highRisk: 0.3, lowRisk: 1, healthy: 98.7 },
    { ageGroup: '31-45', highRisk: 1, lowRisk: 3, healthy: 96 },
    { ageGroup: '46-55', highRisk: 3, lowRisk: 7, healthy: 90 },
    { ageGroup: '56-70', highRisk: 8, lowRisk: 12, healthy: 80 },
    { ageGroup: '71-85', highRisk: 15, lowRisk: 20, healthy: 65 },
    { ageGroup: '86-100', highRisk: 20, lowRisk: 25, healthy: 55 },
  ],
  diabetes: [
    { ageGroup: '0-15', highRisk: 0.3, lowRisk: 1, healthy: 98.7 },
    { ageGroup: '16-30', highRisk: 1, lowRisk: 3, healthy: 96 },
    { ageGroup: '31-45', highRisk: 4, lowRisk: 8, healthy: 88 },
    { ageGroup: '46-55', highRisk: 8, lowRisk: 12, healthy: 80 },
    { ageGroup: '56-70', highRisk: 15, lowRisk: 20, healthy: 65 },
    { ageGroup: '71-85', highRisk: 20, lowRisk: 25, healthy: 55 },
    { ageGroup: '86-100', highRisk: 25, lowRisk: 30, healthy: 45 },
  ],
}

const RiskGroup: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Track the evolving trends."
      title="Risk Group"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={(riskData as any)[selectedDisease]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ageGroup" />
          <YAxis tickFormatter={(tick) => `${tick}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar dataKey="healthy" stackId="a" fill="#4CAF50" name="Healthy" />
          <Bar dataKey="lowRisk" stackId="a" fill="#E6A15E" name="Low risk" />
          <Bar dataKey="highRisk" stackId="a" fill="#C25141" name="High risk" />
        </BarChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default RiskGroup
