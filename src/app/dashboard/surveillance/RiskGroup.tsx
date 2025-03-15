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
    { ageGroup: '0-15', highRisk: 2, lowRisk: 3, healthy: 30 },
    { ageGroup: '16-30', highRisk: 5, lowRisk: 10, healthy: 85 },
    { ageGroup: '31-45', highRisk: 20, lowRisk: 18, healthy: 22 },
    { ageGroup: '46-55', highRisk: 35, lowRisk: 20, healthy: 15 },
    { ageGroup: '56-70', highRisk: 40, lowRisk: 22, healthy: 18 },
    { ageGroup: '71-85', highRisk: 50, lowRisk: 25, healthy: 5 },
    { ageGroup: '86-100', highRisk: 60, lowRisk: 10, healthy: 10 },
  ],
  cancer: [
    { ageGroup: '0-15', highRisk: 1, lowRisk: 2, healthy: 97 },
    { ageGroup: '16-30', highRisk: 3, lowRisk: 7, healthy: 90 },
    { ageGroup: '31-45', highRisk: 10, lowRisk: 15, healthy: 75 },
    { ageGroup: '46-55', highRisk: 20, lowRisk: 25, healthy: 55 },
    { ageGroup: '56-70', highRisk: 30, lowRisk: 30, healthy: 40 },
    { ageGroup: '71-85', highRisk: 40, lowRisk: 15, healthy: 25 },
    { ageGroup: '86-100', highRisk: 50, lowRisk: 5, healthy: 15 },
  ],
  stroke: [
    { ageGroup: '0-15', highRisk: 1, lowRisk: 1, healthy: 98 },
    { ageGroup: '16-30', highRisk: 2, lowRisk: 5, healthy: 93 },
    { ageGroup: '31-45', highRisk: 8, lowRisk: 12, healthy: 80 },
    { ageGroup: '46-55', highRisk: 15, lowRisk: 20, healthy: 65 },
    { ageGroup: '56-70', highRisk: 25, lowRisk: 30, healthy: 45 },
    { ageGroup: '71-85', highRisk: 35, lowRisk: 35, healthy: 30 },
    { ageGroup: '86-100', highRisk: 45, lowRisk: 40, healthy: 15 },
  ],
  diabetes: [
    { ageGroup: '0-15', highRisk: 1, lowRisk: 4, healthy: 95 },
    { ageGroup: '16-30', highRisk: 4, lowRisk: 11, healthy: 85 },
    { ageGroup: '31-45', highRisk: 15, lowRisk: 20, healthy: 65 },
    { ageGroup: '46-55', highRisk: 25, lowRisk: 25, healthy: 50 },
    { ageGroup: '56-70', highRisk: 35, lowRisk: 30, healthy: 35 },
    { ageGroup: '71-85', highRisk: 45, lowRisk: 30, healthy: 25 },
    { ageGroup: '86-100', highRisk: 55, lowRisk: 30, healthy: 15 },
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
