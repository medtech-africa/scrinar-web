import React, { useState } from 'react'
import SurveillanceCard from '@/components/SurveillanceCard'
// import { FaFilter } from 'react-icons/fa'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const facilityData = [
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
  {
    facility: 'Greenway',
    patients: '3,4566',
    time: '20-45 min',
    mortality: '5-10%',
  },
]

const FacilityPerformance: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <SurveillanceCard
      onChange={(value) => setSelectedDisease(value)}
      options={diseaseOptions}
      value={selectedDisease}
      subtitle="This displays performance metrics for healthcare facilities handling NCD cases"
      title="Facility-Level Performance"
    >
      {/* Filter Button */}
      <div className="flex items-center mb-4">
        <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm">
          {/* <FaFilter className="text-gray-600" /> */}
          <span className="text-gray-700 font-medium">Filter</span>
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="p-3 text-left">Facilities</th>
              <th className="p-3 text-left">Patient treated</th>
              <th className="p-3 text-left">Avg time treated</th>
              <th className="p-3 text-left">Mortality rate</th>
            </tr>
          </thead>
          <tbody>
            {facilityData.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{row.facility}</td>
                <td className="p-3">{row.patients}</td>
                <td className="p-3">{row.time}</td>
                <td className="p-3">{row.mortality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-2 mt-4">
        <button className="border p-2 rounded-md text-gray-600">&lt;</button>
        <button className="border p-2 rounded-md text-gray-600">&gt;</button>
      </div>
    </SurveillanceCard>
  )
}

export default FacilityPerformance
