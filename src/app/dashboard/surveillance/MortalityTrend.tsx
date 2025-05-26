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

interface DiseaseDataItem {
  year: number
  North: number
  East: number
  South: number
  West: number
}

interface DiseaseDataType {
  [key: string]: DiseaseDataItem[]
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: DiseaseDataItem
  }>
  label?: number
  selectedDisease: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  selectedDisease,
}) => {
  if (active && payload && payload.length && label) {
    const data = payload[0].payload
    const total = data.North + data.East + data.South + data.West
    const yearOverYear =
      Number(label) > 2015
        ? (
            ((total -
              (diseaseData[selectedDisease][Number(label) - 2016].North +
                diseaseData[selectedDisease][Number(label) - 2016].East +
                diseaseData[selectedDisease][Number(label) - 2016].South +
                diseaseData[selectedDisease][Number(label) - 2016].West)) /
              (diseaseData[selectedDisease][Number(label) - 2016].North +
                diseaseData[selectedDisease][Number(label) - 2016].East +
                diseaseData[selectedDisease][Number(label) - 2016].South +
                diseaseData[selectedDisease][Number(label) - 2016].West)) *
            100
          ).toFixed(1)
        : 0

    return (
      <div className="bg-white shadow-lg rounded-md p-3">
        <p className="text-gray-900 font-semibold">{label}</p>
        <p className="text-sm text-gray-600">Total: {total.toLocaleString()}</p>
        <p className="text-sm text-gray-600">
          North: {data.North.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          East: {data.East.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          South: {data.South.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          West: {data.West.toLocaleString()}
        </p>
        {Number(yearOverYear) > 0 ? (
          <p className="text-red-500 text-sm">📈 {yearOverYear}% increase</p>
        ) : (
          <p className="text-green-500 text-sm">
            📉 {Math.abs(Number(yearOverYear))}% decrease
          </p>
        )}
      </div>
    )
  }
  return null
}

const diseaseData: DiseaseDataType = {
  hypertension: [
    { year: 2015, North: 8500, East: 9200, South: 10500, West: 8800 },
    { year: 2016, North: 9200, East: 9800, South: 11200, West: 9400 },
    { year: 2017, North: 9800, East: 10500, South: 11800, West: 9900 },
    { year: 2018, North: 10500, East: 11200, South: 12500, West: 10500 },
    { year: 2019, North: 11200, East: 11800, South: 13200, West: 11200 },
    { year: 2020, North: 11800, East: 12500, South: 13800, West: 11800 },
    { year: 2021, North: 12500, East: 13200, South: 14500, West: 12500 },
    { year: 2022, North: 13200, East: 13800, South: 15200, West: 13200 },
  ],
  cancer: [
    { year: 2015, North: 12500, East: 11800, South: 13200, West: 12200 },
    { year: 2016, North: 13200, East: 12500, South: 13800, West: 12800 },
    { year: 2017, North: 13800, East: 13200, South: 14500, West: 13500 },
    { year: 2018, North: 14500, East: 13800, South: 15200, West: 14200 },
    { year: 2019, North: 15200, East: 14500, South: 15800, West: 14800 },
    { year: 2020, North: 15800, East: 15200, South: 16500, West: 15500 },
    { year: 2021, North: 16500, East: 15800, South: 17200, West: 16200 },
    { year: 2022, North: 17200, East: 16500, South: 17800, West: 16800 },
  ],
  stroke: [
    { year: 2015, North: 6800, East: 7200, South: 8500, West: 7000 },
    { year: 2016, North: 7200, East: 7800, South: 9200, West: 7500 },
    { year: 2017, North: 7800, East: 8500, South: 9800, West: 8200 },
    { year: 2018, North: 8500, East: 9200, South: 10500, West: 8800 },
    { year: 2019, North: 9200, East: 9800, South: 11200, West: 9500 },
    { year: 2020, North: 9800, East: 10500, South: 11800, West: 10200 },
    { year: 2021, North: 10500, East: 11200, South: 12500, West: 10800 },
    { year: 2022, North: 11200, East: 11800, South: 13200, West: 11500 },
  ],
  diabetes: [
    { year: 2015, North: 5800, East: 6200, South: 7200, West: 6000 },
    { year: 2016, North: 6200, East: 6800, South: 7800, West: 6500 },
    { year: 2017, North: 6800, East: 7500, South: 8500, West: 7200 },
    { year: 2018, North: 7500, East: 8200, South: 9200, West: 7800 },
    { year: 2019, North: 8200, East: 8800, South: 9800, West: 8500 },
    { year: 2020, North: 8800, East: 9500, South: 10500, West: 9200 },
    { year: 2021, North: 9500, East: 10200, South: 11200, West: 9800 },
    { year: 2022, North: 10200, East: 10800, South: 11800, West: 10500 },
  ],
}

const MortalityTrend: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState('hypertension')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Mortality Trends
        </h2>
        <select
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="hypertension">Hypertension</option>
          <option value="cancer">Cancer</option>
          <option value="stroke">Stroke</option>
          <option value="diabetes">Diabetes</option>
        </select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={diseaseData[selectedDisease]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toString()}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip selectedDisease={selectedDisease} />}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="North"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="East"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="South"
              stroke="#ffc658"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="West"
              stroke="#ff8042"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MortalityTrend
