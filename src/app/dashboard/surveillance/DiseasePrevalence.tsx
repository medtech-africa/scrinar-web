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
    { year: 2000, male: 4.2, female: 4.8 },
    { year: 2002, male: 4.3, female: 4.9 },
    { year: 2004, male: 4.5, female: 5.1 },
    { year: 2006, male: 4.7, female: 5.3 },
    { year: 2008, male: 4.8, female: 5.4 },
    { year: 2010, male: 5.0, female: 5.6 },
    { year: 2012, male: 5.1, female: 5.7 },
    { year: 2014, male: 5.3, female: 5.9 },
  ],
  diabetes: [
    { year: 2000, male: 6.2, female: 5.8 },
    { year: 2002, male: 6.8, female: 6.2 },
    { year: 2004, male: 7.1, female: 6.5 },
    { year: 2006, male: 7.8, female: 7.0 },
    { year: 2008, male: 8.3, female: 7.4 },
    { year: 2010, male: 9.1, female: 8.0 },
    { year: 2012, male: 9.5, female: 8.2 },
    { year: 2014, male: 10.2, female: 8.8 },
  ],
  hypertension: [
    { year: 2000, male: 28.5, female: 26.8 },
    { year: 2002, male: 29.2, female: 27.4 },
    { year: 2004, male: 30.2, female: 28.4 },
    { year: 2006, male: 31.5, female: 29.6 },
    { year: 2008, male: 32.1, female: 30.2 },
    { year: 2010, male: 33.2, female: 31.2 },
    { year: 2012, male: 33.8, female: 31.9 },
    { year: 2014, male: 34.5, female: 32.5 },
  ],
  stroke: [
    { year: 2000, male: 2.8, female: 2.5 },
    { year: 2002, male: 2.8, female: 2.5 },
    { year: 2004, male: 2.9, female: 2.6 },
    { year: 2006, male: 3.0, female: 2.7 },
    { year: 2008, male: 3.1, female: 2.8 },
    { year: 2010, male: 3.2, female: 2.9 },
    { year: 2012, male: 3.2, female: 2.9 },
    { year: 2014, male: 3.3, female: 3.0 },
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
