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
    { year: 2015, value: 5 },
    { year: 2016, value: 7 },
    { year: 2017, value: 9 },
    { year: 2018, value: 12 },
    { year: 2019, value: 18 },
    { year: 2020, value: 25 },
    { year: 2021, value: 30 },
    { year: 2022, value: 35 },
    { year: 2023, value: 32 },
    { year: 2024, value: 40 },
    { year: 2025, value: 45 },
    { year: 2026, value: 50 },
    { year: 2027, value: 60 },
    { year: 2028, value: 65 },
    { year: 2029, value: 70 },
    { year: 2030, value: 68 },
    { year: 2031, value: 75 },
    { year: 2032, value: 80 },
    { year: 2033, value: 85 },
    { year: 2034, value: 90 },
    { year: 2035, value: 95 },
  ],
  cancer: [
    { year: 2015, value: 10 },
    { year: 2016, value: 12 },
    { year: 2017, value: 15 },
    { year: 2018, value: 18 },
    { year: 2019, value: 22 },
    { year: 2020, value: 28 },
    { year: 2021, value: 32 },
    { year: 2022, value: 38 },
    { year: 2023, value: 42 },
    { year: 2024, value: 48 },
    { year: 2025, value: 52 },
    { year: 2026, value: 58 },
    { year: 2027, value: 62 },
    { year: 2028, value: 68 },
    { year: 2029, value: 72 },
    { year: 2030, value: 78 },
    { year: 2031, value: 82 },
    { year: 2032, value: 88 },
    { year: 2033, value: 92 },
    { year: 2034, value: 96 },
    { year: 2035, value: 98 },
  ],
  stroke: [
    { year: 2015, value: 8 },
    { year: 2016, value: 10 },
    { year: 2017, value: 13 },
    { year: 2018, value: 16 },
    { year: 2019, value: 20 },
    { year: 2020, value: 24 },
    { year: 2021, value: 28 },
    { year: 2022, value: 33 },
    { year: 2023, value: 36 },
    { year: 2024, value: 40 },
    { year: 2025, value: 44 },
    { year: 2026, value: 48 },
    { year: 2027, value: 52 },
    { year: 2028, value: 56 },
    { year: 2029, value: 60 },
    { year: 2030, value: 64 },
    { year: 2031, value: 68 },
    { year: 2032, value: 72 },
    { year: 2033, value: 76 },
    { year: 2034, value: 80 },
    { year: 2035, value: 84 },
  ],
  diabetes: [
    { year: 2015, value: 15 },
    { year: 2016, value: 18 },
    { year: 2017, value: 22 },
    { year: 2018, value: 26 },
    { year: 2019, value: 30 },
    { year: 2020, value: 35 },
    { year: 2021, value: 40 },
    { year: 2022, value: 45 },
    { year: 2023, value: 50 },
    { year: 2024, value: 55 },
    { year: 2025, value: 60 },
    { year: 2026, value: 65 },
    { year: 2027, value: 70 },
    { year: 2028, value: 75 },
    { year: 2029, value: 80 },
    { year: 2030, value: 85 },
    { year: 2031, value: 88 },
    { year: 2032, value: 91 },
    { year: 2033, value: 94 },
    { year: 2034, value: 97 },
    { year: 2035, value: 99 },
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
              const value = payload[0].value
              return (
                <div className="bg-white p-2 rounded shadow-md">
                  <p className="font-bold text-gray-800">{value}</p>
                  <p className="text-red-500 text-sm">📈 43%</p>
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
