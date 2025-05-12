import React, { useState } from 'react'
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
} from 'recharts'
import SurveillanceCard from '@/components/SurveillanceCard'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const demographicData = {
  hypertension: {
    age: [
      { name: '60+', value: 65, fill: '#B53D3D' }, // High risk
      { name: '40-60', value: 35, fill: '#D78A39' }, // Low risk
      { name: '20-40', value: 15, fill: '#418B4A' }, // Healthy
    ],
    educationMale: [
      { name: 'None', value: 45, fill: '#B53D3D' },
      { name: 'SSCE', value: 30, fill: '#D78A39' },
      { name: 'BSC', value: 20, fill: '#418B4A' },
    ],
    educationFemale: [
      { name: 'None', value: 42, fill: '#B53D3D' },
      { name: 'SSCE', value: 28, fill: '#D78A39' },
      { name: 'BSC', value: 18, fill: '#418B4A' },
    ],
    occupationMale: [
      { name: 'Unemployed', value: 38, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 32, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 25, fill: '#418B4A' },
    ],
    occupationFemale: [
      { name: 'Unemployed', value: 35, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 30, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 22, fill: '#418B4A' },
    ],
  },
  cancer: {
    age: [
      { name: '60+', value: 55, fill: '#B53D3D' }, // High risk
      { name: '40-60', value: 30, fill: '#D78A39' }, // Low risk
      { name: '20-40', value: 12, fill: '#418B4A' }, // Healthy
    ],
    educationMale: [
      { name: 'None', value: 40, fill: '#B53D3D' },
      { name: 'SSCE', value: 28, fill: '#D78A39' },
      { name: 'BSC', value: 18, fill: '#418B4A' },
    ],
    educationFemale: [
      { name: 'None', value: 38, fill: '#B53D3D' },
      { name: 'SSCE', value: 25, fill: '#D78A39' },
      { name: 'BSC', value: 15, fill: '#418B4A' },
    ],
    occupationMale: [
      { name: 'Unemployed', value: 35, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 30, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 22, fill: '#418B4A' },
    ],
    occupationFemale: [
      { name: 'Unemployed', value: 32, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 28, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 20, fill: '#418B4A' },
    ],
  },
  stroke: {
    age: [
      { name: '60+', value: 60, fill: '#B53D3D' }, // High risk
      { name: '40-60', value: 28, fill: '#D78A39' }, // Low risk
      { name: '20-40', value: 8, fill: '#418B4A' }, // Healthy
    ],
    educationMale: [
      { name: 'None', value: 42, fill: '#B53D3D' },
      { name: 'SSCE', value: 25, fill: '#D78A39' },
      { name: 'BSC', value: 15, fill: '#418B4A' },
    ],
    educationFemale: [
      { name: 'None', value: 38, fill: '#B53D3D' },
      { name: 'SSCE', value: 22, fill: '#D78A39' },
      { name: 'BSC', value: 12, fill: '#418B4A' },
    ],
    occupationMale: [
      { name: 'Unemployed', value: 35, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 28, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 18, fill: '#418B4A' },
    ],
    occupationFemale: [
      { name: 'Unemployed', value: 32, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 25, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 15, fill: '#418B4A' },
    ],
  },
  diabetes: {
    age: [
      { name: '60+', value: 50, fill: '#B53D3D' }, // High risk
      { name: '40-60', value: 25, fill: '#D78A39' }, // Low risk
      { name: '20-40', value: 10, fill: '#418B4A' }, // Healthy
    ],
    educationMale: [
      { name: 'None', value: 38, fill: '#B53D3D' },
      { name: 'SSCE', value: 25, fill: '#D78A39' },
      { name: 'BSC', value: 15, fill: '#418B4A' },
    ],
    educationFemale: [
      { name: 'None', value: 35, fill: '#B53D3D' },
      { name: 'SSCE', value: 22, fill: '#D78A39' },
      { name: 'BSC', value: 12, fill: '#418B4A' },
    ],
    occupationMale: [
      { name: 'Unemployed', value: 32, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 28, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 18, fill: '#418B4A' },
    ],
    occupationFemale: [
      { name: 'Unemployed', value: 30, fill: '#B53D3D' },
      { name: 'Blue-Collar', value: 25, fill: '#D78A39' },
      { name: 'Service & Healthcare', value: 15, fill: '#418B4A' },
    ],
  },
}

const renderRadialChart = (data: any) => (
  <ResponsiveContainer width={170} height={170}>
    <RadialBarChart
      cx="50%"
      cy="50%"
      innerRadius="40%"
      outerRadius="100%"
      data={data}
    >
      <RadialBar background dataKey="value" />
      <Tooltip
        content={({ payload }) => {
          if (!payload || payload.length === 0) return null
          const { name, value } = payload[0].payload
          return (
            <div className="bg-white p-2 rounded shadow-md">
              <p className="font-bold text-gray-800">{value}</p>
              <p className="text-gray-600">{name}</p>
            </div>
          )
        }}
      />
    </RadialBarChart>
  </ResponsiveContainer>
)

const DemographicBreakdown: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="Visualizes disease data across different population groups"
      title="Demographic Breakdown"
    >
      {/* Risk Legend */}
      <div className="flex gap-3 mb-4 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#B53D3D] rounded-full mr-2"></span> High
          risk
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#D78A39] rounded-full mr-2"></span> Low
          risk
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#418B4A] rounded-full mr-2"></span>{' '}
          Healthy
        </div>
      </div>

      {/* Demographic Categories */}
      <div className="grid grid-cols-2 gap-6">
        {/* Age */}
        <div>
          <h3 className="font-bold text-gray-700">Age</h3>
          {renderRadialChart((demographicData as any)[selectedDisease]?.age)}
          {/* <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur. Magnis id velit integer urna
            nibh ut imperdiet urna sed turpis.
          </p> */}
        </div>

        {/* Education - Male */}
        <div>
          <h3 className="font-bold text-gray-700">Education - Male</h3>
          {renderRadialChart(
            (demographicData as any)[selectedDisease]?.educationMale
          )}
          {/* <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur. Magnis id velit integer urna
            nibh ut imperdiet urna sed turpis.
          </p> */}
        </div>

        {/* Education - Female */}
        <div>
          <h3 className="font-bold text-gray-700">Education - Female</h3>
          {renderRadialChart(
            (demographicData as any)[selectedDisease]?.educationFemale
          )}
          {/* <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur. Magnis id velit integer urna
            nibh ut imperdiet urna sed turpis.
          </p> */}
        </div>

        {/* Occupation - Male */}
        <div>
          <h3 className="font-bold text-gray-700">Occupation - Male</h3>
          {renderRadialChart(
            (demographicData as any)[selectedDisease]?.occupationMale
          )}
          {/* <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur. Magnis id velit integer urna
            nibh ut imperdiet urna sed turpis.
          </p> */}
        </div>

        {/* Occupation - Female */}
        <div>
          <h3 className="font-bold text-gray-700">Occupation - Female</h3>
          {renderRadialChart(
            (demographicData as any)[selectedDisease]?.occupationFemale
          )}
          {/* <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur. Magnis id velit integer urna
            nibh ut imperdiet urna sed turpis.
          </p> */}
        </div>
      </div>
    </SurveillanceCard>
  )
}

export default DemographicBreakdown
