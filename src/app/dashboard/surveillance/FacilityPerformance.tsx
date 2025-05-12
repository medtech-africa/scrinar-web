import React, { useState } from 'react'
import SurveillanceCard from '@/components/SurveillanceCard'
// import { FaFilter } from 'react-icons/fa'

const diseaseOptions = [
  { value: 'cancer', label: 'Cancer' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'stroke', label: 'Stroke' },
]

const facilityData = {
  cancer: [
    {
      facility: 'Oncology Center of Excellence',
      patients: '2,845',
      time: '120-180 min',
      mortality: '12.5%',
    },
    {
      facility: 'Cancer Research Hospital',
      patients: '3,632',
      time: '150-240 min',
      mortality: '10.8%',
    },
    {
      facility: 'Metropolitan Cancer Center',
      patients: '4,287',
      time: '135-210 min',
      mortality: '11.2%',
    },
    {
      facility: 'Regional Oncology Institute',
      patients: '3,234',
      time: '140-220 min',
      mortality: '13.1%',
    },
    {
      facility: 'University Cancer Center',
      patients: '5,456',
      time: '160-250 min',
      mortality: '9.8%',
    },
  ],
  diabetes: [
    {
      facility: 'Endocrine Care Center',
      patients: '8,845',
      time: '30-45 min',
      mortality: '1.2%',
    },
    {
      facility: 'Diabetes Management Clinic',
      patients: '6,932',
      time: '25-40 min',
      mortality: '0.9%',
    },
    {
      facility: 'Metropolitan Diabetes Center',
      patients: '7,287',
      time: '35-50 min',
      mortality: '1.1%',
    },
    {
      facility: 'Community Diabetes Clinic',
      patients: '5,234',
      time: '20-35 min',
      mortality: '0.8%',
    },
    {
      facility: 'Regional Endocrine Institute',
      patients: '6,456',
      time: '30-45 min',
      mortality: '1.0%',
    },
  ],
  hypertension: [
    {
      facility: 'Cardiac Care Center',
      patients: '12,845',
      time: '35-60 min',
      mortality: '3.2%',
    },
    {
      facility: 'Heart Health Institute',
      patients: '9,632',
      time: '40-75 min',
      mortality: '4.1%',
    },
    {
      facility: 'Community Health Clinic',
      patients: '5,287',
      time: '25-45 min',
      mortality: '2.8%',
    },
    {
      facility: 'Metropolitan Hospital',
      patients: '15,234',
      time: '45-90 min',
      mortality: '3.8%',
    },
    {
      facility: 'Regional Medical Center',
      patients: '8,956',
      time: '30-55 min',
      mortality: '3.5%',
    },
  ],
  stroke: [
    {
      facility: 'Neurology Center',
      patients: '3,845',
      time: '90-150 min',
      mortality: '8.5%',
    },
    {
      facility: 'Stroke Care Institute',
      patients: '4,632',
      time: '100-180 min',
      mortality: '7.8%',
    },
    {
      facility: 'Neurovascular Center',
      patients: '3,287',
      time: '95-160 min',
      mortality: '9.2%',
    },
    {
      facility: 'Regional Stroke Center',
      patients: '5,234',
      time: '110-190 min',
      mortality: '8.1%',
    },
    {
      facility: 'University Neurology Hospital',
      patients: '4,456',
      time: '105-175 min',
      mortality: '7.5%',
    },
  ],
}

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
              <th className="p-3 text-left">Patients Treated</th>
              <th className="p-3 text-left">Avg. Treatment Time</th>
              <th className="p-3 text-left">Mortality Rate</th>
            </tr>
          </thead>
          <tbody>
            {facilityData[selectedDisease as keyof typeof facilityData].map(
              (row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{row.facility}</td>
                  <td className="p-3">{row.patients}</td>
                  <td className="p-3">{row.time}</td>
                  <td className="p-3">{row.mortality}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-2 mt-4">
        <button className="border p-2 rounded-md text-gray-600 hover:bg-gray-50">
          &lt;
        </button>
        <button className="border p-2 rounded-md text-gray-600 hover:bg-gray-50">
          &gt;
        </button>
      </div>
    </SurveillanceCard>
  )
}

export default FacilityPerformance
