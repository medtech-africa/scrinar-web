import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
  cancer: [
    { year: 2000, male: 4.2, female: 4.8 },
    { year: 2004, male: 4.5, female: 5.1 },
    { year: 2008, male: 4.8, female: 5.4 },
    { year: 2012, male: 5.1, female: 5.7 },
    { year: 2016, male: 5.4, female: 6.0 },
    { year: 2020, male: 5.7, female: 6.3 },
    { year: 2022, male: 5.9, female: 6.5 },
  ],
  diabetes: [
    { year: 2000, male: 6.2, female: 5.8 },
    { year: 2004, male: 7.1, female: 6.5 },
    { year: 2008, male: 8.3, female: 7.4 },
    { year: 2012, male: 9.5, female: 8.2 },
    { year: 2016, male: 10.8, female: 9.1 },
    { year: 2020, male: 11.9, female: 9.8 },
    { year: 2022, male: 12.5, female: 10.2 },
  ],
  hypertension: [
    { year: 2000, male: 28.5, female: 26.8 },
    { year: 2004, male: 30.2, female: 28.4 },
    { year: 2008, male: 32.1, female: 30.2 },
    { year: 2012, male: 33.8, female: 31.9 },
    { year: 2016, male: 35.4, female: 33.5 },
    { year: 2020, male: 36.9, female: 34.8 },
    { year: 2022, male: 37.5, female: 35.2 },
  ],
  stroke: [
    { year: 2000, male: 2.8, female: 2.5 },
    { year: 2004, male: 2.9, female: 2.6 },
    { year: 2008, male: 3.1, female: 2.8 },
    { year: 2012, male: 3.2, female: 2.9 },
    { year: 2016, male: 3.4, female: 3.1 },
    { year: 2020, male: 3.5, female: 3.2 },
    { year: 2022, male: 3.6, female: 3.3 },
  ],
}

const DiseaseTrend: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<string>('cancer')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Track the evolving trends of non-communicable diseases with up-to-date data."
      title="NCD Disease Trends"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={(diseaseData as any)[selectedDisease]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeOpacity={0} />
          <XAxis dataKey="year" padding="no-gap" axisLine={false} />
          <YAxis
            domain={[0, 50]}
            tickFormatter={(tick) => `${tick}%`}
            // axisLine={false}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="male"
            stroke="#4178FD"
            activeDot={{ r: 8 }}
            name="Male"
          />
          <Line
            type="monotone"
            dataKey="female"
            stroke="#12DCC4"
            name="Female"
          />
        </LineChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default DiseaseTrend
