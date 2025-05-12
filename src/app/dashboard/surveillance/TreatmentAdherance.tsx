import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

// Data for Adherence vs. Non-Adherence
const adherenceData = [
  { name: 'Non-adherent Patients', value: 45.3, color: '#B54436' },
  { name: 'Adherent Patients', value: 54.7, color: '#4CAF50' },
]

// Data for Reasons for Non-Adherence
const nonAdherenceReasons = [
  { name: 'Medication cost', value: 32.5, color: '#2A63F5' },
  { name: 'Side effects', value: 28.4, color: '#68D8D6' },
  { name: 'Complex medication schedule', value: 22.1, color: '#001065' },
  { name: 'Limited access to healthcare', value: 17.0, color: '#2649D9' },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-md p-2 text-sm font-semibold">
        {`${payload[0].name}: ${payload[0].value}%`}
      </div>
    )
  }
  return null
}

const TreatmentAdherence: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Helps identify gaps in disease management."
      title="Treatment Adherence"
    >
      <div className="flex flex-col space-y-6">
        {/* Adherence vs Non-Adherence */}
        <div>
          <p className="text-gray-700 font-semibold">
            Adherence vs. Non-Adherence
          </p>
          <PieChart width={300} height={250}>
            <Pie
              data={adherenceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {adherenceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>

        {/* Reasons for Non-Adherence */}
        <div>
          <p className="text-gray-700 font-semibold">
            Reasons for Non-Adherence
          </p>
          <PieChart width={300} height={250}>
            <Pie
              data={nonAdherenceReasons}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {nonAdherenceReasons.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>
      </div>
    </SurveillanceCard>
  )
}

export default TreatmentAdherence
