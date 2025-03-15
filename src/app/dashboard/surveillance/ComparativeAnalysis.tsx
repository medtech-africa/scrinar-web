import React, { useState } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

// Example Data (Ensure actual data follows this format)
const diseaseData = {
  hypertension: [
    { year: 2010, cases: 10 },
    { year: 2011, cases: 15 },
    { year: 2012, cases: 22 },
    { year: 2013, cases: 28 },
    { year: 2014, cases: 35 },
    { year: 2015, cases: 40 },
    { year: 2016, cases: 45 },
    { year: 2017, cases: 42 },
    { year: 2018, cases: 50 },
    { year: 2019, cases: 44 },
    { year: 2020, cases: 47 },
    { year: 2021, cases: 55 },
    { year: 2022, cases: 62 },
    { year: 2023, cases: 70 },
    { year: 2024, cases: 75 },
    { year: 2025, cases: 80 },
  ],
  cancer: [
    { year: 2010, cases: 5 },
    { year: 2011, cases: 8 },
    { year: 2012, cases: 12 },
    { year: 2013, cases: 18 },
    { year: 2014, cases: 22 },
    { year: 2015, cases: 25 },
    { year: 2016, cases: 30 },
    { year: 2017, cases: 35 },
    { year: 2018, cases: 40 },
    { year: 2019, cases: 45 },
    { year: 2020, cases: 50 },
    { year: 2021, cases: 55 },
    { year: 2022, cases: 60 },
    { year: 2023, cases: 65 },
    { year: 2024, cases: 70 },
    { year: 2025, cases: 75 },
  ],
  stroke: [
    { year: 2010, cases: 8 },
    { year: 2011, cases: 10 },
    { year: 2012, cases: 15 },
    { year: 2013, cases: 20 },
    { year: 2014, cases: 25 },
    { year: 2015, cases: 30 },
    { year: 2016, cases: 35 },
    { year: 2017, cases: 38 },
    { year: 2018, cases: 42 },
    { year: 2019, cases: 45 },
    { year: 2020, cases: 48 },
    { year: 2021, cases: 50 },
    { year: 2022, cases: 55 },
    { year: 2023, cases: 60 },
    { year: 2024, cases: 65 },
    { year: 2025, cases: 70 },
  ],
  diabetes: [
    { year: 2010, cases: 12 },
    { year: 2011, cases: 14 },
    { year: 2012, cases: 18 },
    { year: 2013, cases: 22 },
    { year: 2014, cases: 26 },
    { year: 2015, cases: 30 },
    { year: 2016, cases: 34 },
    { year: 2017, cases: 38 },
    { year: 2018, cases: 42 },
    { year: 2019, cases: 45 },
    { year: 2020, cases: 48 },
    { year: 2021, cases: 52 },
    { year: 2022, cases: 56 },
    { year: 2023, cases: 60 },
    { year: 2024, cases: 65 },
    { year: 2025, cases: 70 },
  ],
}

// Custom Tooltip to match the design
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const cases = payload[0].value
    const prevCases = payload[0].payload.prevCases || cases
    const change = ((cases - prevCases) / prevCases) * 100
    const isIncrease = change >= 0

    return (
      <div className="bg-white shadow-md rounded-lg p-2">
        <p className="text-black font-semibold">{cases} Total cases</p>
        <p
          className={`text-sm ${isIncrease ? 'text-green-500' : 'text-red-500'}`}
        >
          {isIncrease ? '↑' : '↓'} {change.toFixed(1)}%
        </p>
      </div>
    )
  }
  return null
}

const ComparativeAnalysis: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  // Add previous cases to calculate % change
  const dataWithChange = (diseaseData as any)[selectedDisease].map(
    (d: any, index: any, arr: any) => ({
      ...d,
      prevCases: index > 0 ? arr[index - 1].cases : d.cases,
    })
  )

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      title="Comparative Analysis"
      subtitle="Compares data year-to-year to identify improvements or emerging challenges."
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dataWithChange}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeOpacity={0} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#A0AEC0' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
            tick={{ fill: '#A0AEC0' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="cases"
            fill="#4178FD"
            barSize={40}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default ComparativeAnalysis
