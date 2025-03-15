import React, { useState } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
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
    { year: 2015, North: 10000, East: 8000, South: 12000, West: 7000 },
    { year: 2016, North: 15000, East: 12000, South: 18000, West: 9000 },
    { year: 2017, North: 20000, East: 16000, South: 24000, West: 13000 },
    { year: 2018, North: 30000, East: 25000, South: 31000, West: 21000 },
    { year: 2019, North: 40000, East: 28000, South: 36000, West: 25000 },
    { year: 2020, North: 50000, East: 32000, South: 45000, West: 29000 },
    { year: 2021, North: 60000, East: 35000, South: 52000, West: 31000 },
    { year: 2022, North: 80000, East: 50000, South: 60000, West: 30562 }, // Highlighted year
    { year: 2023, North: 85000, East: 55000, South: 68000, West: 35000 },
    { year: 2024, North: 87000, East: 60000, South: 75000, West: 40000 },
    { year: 2025, North: 90000, East: 62000, South: 80000, West: 45000 },
  ],
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white shadow-lg rounded-md p-2">
        <p className="text-gray-900 font-semibold">{data.year}</p>
        <p className="text-lg font-bold">{data.West.toLocaleString()}</p>
        <p className="text-red-500 text-sm">📈 43%</p>
      </div>
    )
  }
  return null
}

const MortalityTrend: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Track NCD-related mortality rates over time and across different regions."
      title="NCD Mortality Trends"
    >
      <div className="flex flex-col">
        {/* Chart Section */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={(diseaseData as any)[selectedDisease]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeOpacity={0.2} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="North"
              stroke="#4169E1"
              name="North"
            />
            <Line type="monotone" dataKey="East" stroke="#12DCC4" name="East" />
            <Line
              type="monotone"
              dataKey="South"
              stroke="#000066"
              name="South"
            />
            <Line type="monotone" dataKey="West" stroke="#D19C57" name="West" />
          </LineChart>
        </ResponsiveContainer>

        {/* Insight Section */}
        <div className="mt-4">
          <p className="font-semibold">Insight</p>
          <p className="text-gray-600 text-sm">
            The west region in 2022 saw a{' '}
            <span className="text-red-500 font-semibold">43%</span> increase in
            diabetes-related deaths due to late diagnosis.
          </p>
        </div>
      </div>
    </SurveillanceCard>
  )
}

export default MortalityTrend
