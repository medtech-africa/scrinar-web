import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Convert month number to month name
const getMonthName = (month: number) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return monthNames[month - 1] // Adjusting for 0-based array
}

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: any[]
  label?: string
}) => {
  if (active && payload && payload.length) {
    const risks = [
      { name: 'Low risk', value: payload[0]?.value || 0, color: '#4ade80' },
      {
        name: 'Moderate risk',
        value: payload[1]?.value || 0,
        color: '#f97316',
      },
      { name: 'High risk', value: payload[2]?.value || 0, color: '#ef4444' },
    ]

    const highestRisk = risks.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    )

    return (
      <div className="bg-white p-4 shadow-md rounded-md border border-gray-200">
        <p className="font-semibold text-gray-700">{highestRisk.name}</p>
        <p className="text-sm text-gray-600">
          BP increased by 20% over last 3 readings, raising stroke risk by 8%
        </p>
      </div>
    )
  }

  return null
}

const RiskTrendGraph = ({ riskData = [] }: { riskData?: any[] }) => {
  const exactChartData = riskData
    .map((item) => ({
      month: item.month,
      monthName: getMonthName(item.month),
      low: item.low * 100,
      moderate: item.moderate * 100,
      high: item.high * 100,
    }))
    .sort((a, b) => a.month - b.month)

  return (
    <div className="w-full py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Risk Trend Graph
      </h1>

      {/* Legend */}
      <div className="flex gap-6 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
          <span className="text-gray-700">Low risk</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
          <span className="text-gray-700">Moderate risk</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span className="text-gray-700">High risk</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={exactChartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="monthName"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="low"
              stroke="#4ade80"
              strokeWidth={3}
              dot={{ r: 4, fill: '#4ade80', stroke: 'white', strokeWidth: 2 }}
              activeDot={{
                r: 8,
                fill: '#4ade80',
                stroke: 'white',
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="moderate"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: '#f97316', stroke: 'white', strokeWidth: 2 }}
              activeDot={{
                r: 8,
                fill: '#f97316',
                stroke: 'white',
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="high"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
              activeDot={{
                r: 8,
                fill: '#ef4444',
                stroke: 'white',
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export { RiskTrendGraph }
