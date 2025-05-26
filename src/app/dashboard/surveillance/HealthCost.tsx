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
  Legend,
} from 'recharts'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const COLORS = ['#3366CC', '#003366', '#0044AA', '#0066CC', '#0099FF']

// Using approximate exchange rate of 1 USD = 1,300 NGN
const costData = {
  cancer: {
    directCosts: [
      { name: 'Chemotherapy', value: 45 },
      { name: 'Surgery', value: 25 },
      { name: 'Diagnostic Tests', value: 15 },
      { name: 'Radiation Therapy', value: 10 },
      { name: 'Supportive Care', value: 5 },
    ],
    indirectCosts: [
      { name: 'Lost Productivity', value: 40 },
      { name: 'Caregiver Costs', value: 30 },
      { name: 'Transportation', value: 15 },
      { name: 'Early Retirement', value: 10 },
      { name: 'Home Modifications', value: 5 },
    ],
    healthcareExpenses: [
      { incomeGroup: 'Low Income', cost: 8500000 }, // ₦8.5M
      { incomeGroup: 'Medium Income', cost: 15000000 }, // ₦15M
      { incomeGroup: 'High Income', cost: 25000000 }, // ₦25M
    ],
  },
  diabetes: {
    directCosts: [
      { name: 'Medication', value: 50 },
      { name: 'Regular Check-ups', value: 20 },
      { name: 'Monitoring Supplies', value: 15 },
      { name: 'Complications Care', value: 10 },
      { name: 'Emergency Care', value: 5 },
    ],
    indirectCosts: [
      { name: 'Lost Work Days', value: 35 },
      { name: 'Reduced Productivity', value: 30 },
      { name: 'Transportation', value: 20 },
      { name: 'Special Diet', value: 10 },
      { name: 'Early Retirement', value: 5 },
    ],
    healthcareExpenses: [
      { incomeGroup: 'Low Income', cost: 350000 }, // ₦350K
      { incomeGroup: 'Medium Income', cost: 750000 }, // ₦750K
      { incomeGroup: 'High Income', cost: 1500000 }, // ₦1.5M
    ],
  },
  hypertension: {
    directCosts: [
      { name: 'Medication', value: 60 },
      { name: 'Regular Monitoring', value: 20 },
      { name: 'Doctor Visits', value: 10 },
      { name: 'Lab Tests', value: 7 },
      { name: 'Emergency Care', value: 3 },
    ],
    indirectCosts: [
      { name: 'Lost Work Days', value: 35 },
      { name: 'Reduced Productivity', value: 30 },
      { name: 'Transportation', value: 20 },
      { name: 'Lifestyle Changes', value: 10 },
      { name: 'Early Retirement', value: 5 },
    ],
    healthcareExpenses: [
      { incomeGroup: 'Low Income', cost: 250000 }, // ₦250K
      { incomeGroup: 'Medium Income', cost: 500000 }, // ₦500K
      { incomeGroup: 'High Income', cost: 1000000 }, // ₦1M
    ],
  },
  stroke: {
    directCosts: [
      { name: 'Acute Care', value: 40 },
      { name: 'Rehabilitation', value: 25 },
      { name: 'Medication', value: 20 },
      { name: 'Long-term Care', value: 10 },
      { name: 'Follow-up Care', value: 5 },
    ],
    indirectCosts: [
      { name: 'Lost Productivity', value: 40 },
      { name: 'Caregiver Costs', value: 35 },
      { name: 'Transportation', value: 15 },
      { name: 'Home Modifications', value: 7 },
      { name: 'Early Retirement', value: 3 },
    ],
    healthcareExpenses: [
      { incomeGroup: 'Low Income', cost: 5000000 }, // ₦5M
      { incomeGroup: 'Medium Income', cost: 10000000 }, // ₦10M
      { incomeGroup: 'High Income', cost: 20000000 }, // ₦20M
    ],
  },
}

const formatNaira = (value: number) => {
  return `₦${value.toLocaleString('en-NG')}`
}

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
        Direct Costs (Medical expenses directly related to treatment)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={
              costData[selectedDisease as keyof typeof costData].directCosts
            }
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
          >
            {costData[selectedDisease as keyof typeof costData].directCosts.map(
              (_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              )
            )}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Indirect Costs Section */}
      <h3 className="text-gray-600 mt-6">
        Indirect Costs (Long-term economic burden)
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={
              costData[selectedDisease as keyof typeof costData].indirectCosts
            }
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
          >
            {costData[
              selectedDisease as keyof typeof costData
            ].indirectCosts.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* NCD-related Healthcare Expenses */}
      <h3 className="text-gray-600 mt-6">
        Annual Healthcare Expenses by Income Group
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={
            costData[selectedDisease as keyof typeof costData]
              .healthcareExpenses
          }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="incomeGroup" />
          <YAxis tickFormatter={formatNaira} fontSize={10} />
          <Tooltip
            formatter={(value) => [formatNaira(value as number), 'Cost']}
          />
          <Bar dataKey="cost" fill="#3366CC" name="Annual Cost" />
        </BarChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default HealthCost
