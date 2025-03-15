import React, { useState } from 'react'
import {
  // BubbleChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  CartesianGrid,
} from 'recharts'
// import { FaFilter } from 'react-icons/fa'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const data = [
  { x: 20, y: 1, z: 2000, risk: '30% not at risk', area: 'urban' },
  { x: 40, y: 1, z: 3320, risk: '20% at low risk', area: 'urban' },
  { x: 70, y: 1, z: 3850, risk: '70% at high risk', area: 'urban' },
  { x: 20, y: 2, z: 2000, risk: '30% not at risk', area: 'rural' },
  { x: 40, y: 2, z: 3320, risk: '20% at low risk', area: 'rural' },
  { x: 80, y: 2, z: 4000, risk: '80% at high risk', area: 'rural' },
]

const SocialDeterminant: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')
  const [filters, setFilters] = useState({ rural: true, urban: true })

  // Filter data based on selection
  const filteredData = data.filter((d) => (filters as any)[d.area])

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Visualizes the relationship between NCD prevalence and social factors"
      title="Social Determinants of Health"
    >
      {/* Filter Button with Dropdown */}
      <div className="relative inline-block mb-4">
        <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm">
          {/* <FaFilter className="text-gray-600" /> */}
          <span className="text-gray-700 font-medium">Filter</span>
        </button>

        {/* Filter Dropdown */}
        <div className="absolute bg-white shadow-md rounded-md p-2 mt-2">
          {Object.keys(filters).map((key) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={(filters as any)[key]}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    [key]: !(prev as any)[key],
                  }))
                }
              />
              <span className="text-gray-700">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bubble Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, 100]}
            label={{ value: 'Risk (%)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            dataKey="y"
            type="category"
            ticks={[1, 2]}
            tickFormatter={(val) => (val === 1 ? 'High Income' : 'Low Income')}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ payload }) => {
              if (!payload || !payload.length) return null
              const data = payload[0].payload
              return (
                <div className="bg-white shadow-md p-2 rounded-md text-sm">
                  <p>
                    <strong>{data.risk}</strong>
                  </p>
                  <p>{data.z} cases</p>
                </div>
              )
            }}
          />
          <Scatter name="Cases" data={filteredData} fill="#ff5733" />
        </ScatterChart>
      </ResponsiveContainer>
    </SurveillanceCard>
  )
}

export default SocialDeterminant
