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
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const diseaseData = {
  cancer: [
    { year: 2000, male: 10, female: 12 },
    { year: 2002, male: 20, female: 22 },
    { year: 2004, male: 35, female: 30 },
    { year: 2006, male: 50, female: 45 },
    { year: 2008, male: 55, female: 60 },
    { year: 2010, male: 70, female: 65 },
    { year: 2012, male: 80, female: 78 },
    { year: 2014, male: 90, female: 85 },
  ],
  diabetes: [
    { year: 2000, male: 5, female: 8 },
    { year: 2002, male: 12, female: 15 },
    { year: 2004, male: 18, female: 20 },
    { year: 2006, male: 25, female: 28 },
    { year: 2008, male: 33, female: 35 },
    { year: 2010, male: 45, female: 48 },
    { year: 2012, male: 60, female: 58 },
    { year: 2014, male: 75, female: 70 },
  ],
  hypertension: [
    { year: 2000, male: 15, female: 18 },
    { year: 2002, male: 25, female: 28 },
    { year: 2004, male: 40, female: 42 },
    { year: 2006, male: 55, female: 50 },
    { year: 2008, male: 65, female: 68 },
    { year: 2010, male: 78, female: 75 },
    { year: 2012, male: 85, female: 82 },
    { year: 2014, male: 95, female: 90 },
  ],
  stroke: [
    { year: 2000, male: 8, female: 10 },
    { year: 2002, male: 18, female: 20 },
    { year: 2004, male: 30, female: 32 },
    { year: 2006, male: 45, female: 48 },
    { year: 2008, male: 55, female: 58 },
    { year: 2010, male: 65, female: 62 },
    { year: 2012, male: 78, female: 75 },
    { year: 2014, male: 88, female: 85 },
  ],
}

const DiseasePrevalence: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('cancer')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Track the evolving trends ."
      title="Disease Prevalence"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={(diseaseData as any)[selectedDisease]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeOpacity={0} />
          <XAxis dataKey="year" padding="no-gap" axisLine={false} />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
            // axisLine={false}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Bar type="monotone" dataKey="male" fill="#4178FD" name="Male" />
          <Bar type="monotone" dataKey="female" fill="#12DCC4" name="Female" />
        </BarChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default DiseasePrevalence
