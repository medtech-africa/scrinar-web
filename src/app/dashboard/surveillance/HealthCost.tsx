import React, { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

// Data for Pie Charts
const directCostData = [
  { name: 'Medication Cost', value: 30 },
  { name: 'Diagnostic Tests', value: 20 },
  { name: 'Medical Procedures', value: 15 },
  { name: 'Hospitalization Costs', value: 18 },
  { name: 'Rehabilitation & Therapy', value: 17 },
]

const indirectCostData = [
  { name: 'Early Retirement Costs', value: 25 },
  { name: 'Premature Death', value: 22 },
  { name: 'Disability Costs', value: 18 },
  { name: 'Lost Productivity', value: 20 },
  { name: 'Increased Insurance Costs', value: 15 },
]

const COLORS = ['#3366CC', '#003366', '#0044AA', '#0066CC', '#0099FF']

// Data for Bar Chart
const healthcareExpenses = [
  { incomeGroup: 'Low Income', cost: 8000 },
  { incomeGroup: 'Medium Income', cost: 6000 },
  { incomeGroup: 'High Income', cost: 4000 },
]

const HealthCost: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<string>('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Helps identify gaps in disease management"
      title="Healthcare Cost"
    >
      {/* Direct Costs Section */}
      <h3 className="text-gray-600 mt-4">
        Direct Costs (Medical expenses directly related to NCD treatment)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={directCostData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
          >
            {directCostData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Indirect Costs Section */}
      <h3 className="text-gray-600 mt-6">
        Indirect Costs (Long-term economic burden caused by NCDs)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={indirectCostData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
          >
            {indirectCostData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* NCD-related Healthcare Expenses */}
      <h3 className="text-gray-600 mt-6">NCD-related healthcare expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={healthcareExpenses}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="incomeGroup" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cost" fill="#3366CC" />
        </BarChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default HealthCost
