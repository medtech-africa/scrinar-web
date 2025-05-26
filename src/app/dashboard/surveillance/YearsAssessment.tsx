import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const diseaseData = {
  hypertension: [
    { year: 2025, value: 34.8 },
    { year: 2026, value: 35.2 },
    { year: 2027, value: 35.6 },
    { year: 2028, value: 36.0 },
    { year: 2029, value: 36.4 },
    { year: 2030, value: 36.8 },
    { year: 2031, value: 37.2 },
    { year: 2032, value: 37.6 },
    { year: 2033, value: 38.0 },
    { year: 2034, value: 38.4 },
    { year: 2035, value: 38.8 },
  ],
  cancer: [
    { year: 2025, value: 5.2 },
    { year: 2026, value: 5.3 },
    { year: 2027, value: 5.4 },
    { year: 2028, value: 5.5 },
    { year: 2029, value: 5.6 },
    { year: 2030, value: 5.7 },
    { year: 2031, value: 5.8 },
    { year: 2032, value: 5.9 },
    { year: 2033, value: 6.0 },
    { year: 2034, value: 6.1 },
    { year: 2035, value: 6.2 },
  ],
  stroke: [
    { year: 2025, value: 3.3 },
    { year: 2026, value: 3.3 },
    { year: 2027, value: 3.4 },
    { year: 2028, value: 3.4 },
    { year: 2029, value: 3.5 },
    { year: 2030, value: 3.5 },
    { year: 2031, value: 3.6 },
    { year: 2032, value: 3.6 },
    { year: 2033, value: 3.7 },
    { year: 2034, value: 3.7 },
    { year: 2035, value: 3.8 },
  ],
  diabetes: [
    { year: 2025, value: 9.2 },
    { year: 2026, value: 9.5 },
    { year: 2027, value: 9.8 },
    { year: 2028, value: 10.1 },
    { year: 2029, value: 10.4 },
    { year: 2030, value: 10.7 },
    { year: 2031, value: 11.0 },
    { year: 2032, value: 11.3 },
    { year: 2033, value: 11.6 },
    { year: 2034, value: 11.9 },
    { year: 2035, value: 12.2 },
  ],
}

const YearsAssessment: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<string>('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Forecasts future NCD trends based on our 10-year assessment"
      title="10-Year NCD Assessment"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={(diseaseData as any)[selectedDisease]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeOpacity={0.1} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null
              const value = payload[0].value as number
              const startValue = (diseaseData as any)[selectedDisease][0]
                .value as number
              const percentageChange = (
                ((value - startValue) / startValue) *
                100
              ).toFixed(1)
              return (
                <div className="bg-white p-2 rounded shadow-md">
                  <p className="font-bold text-gray-800">{value}%</p>
                  <p className="text-red-500 text-sm">
                    📈 {percentageChange}% change since 2025
                  </p>
                </div>
              )
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4178FD"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default YearsAssessment
