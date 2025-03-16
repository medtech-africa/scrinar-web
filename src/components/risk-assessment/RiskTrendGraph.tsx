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
import { Text } from '../ui/text'

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
  level,
}: {
  active?: boolean
  payload?: any[]
  label?: string
  level: string
}) => {
  if (active && payload && payload.length) {
    // Find the highest risk category
    let highestRisk = payload[0]
    payload.forEach((item) => {
      if (item.value > highestRisk.value) {
        highestRisk = item
      }
    })

    return (
      <div className="bg-white p-4 shadow-md rounded-md border border-gray-200">
        <p className="font-semibold text-gray-700 capitalize">
          Risk Prediction: {level}
        </p>
        <p className="text-sm text-gray-600">{label} month prediction</p>
        <div className="mt-2">
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              style={{ color: entry.color }}
              className="text-xs"
            >
              {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:{' '}
              {entry.value.toFixed(1)}%
            </p>
          ))}
        </div>
      </div>
    )
  }

  return null
}

const RiskTrendGraph = ({
  predictions = [],
  level,
}: {
  predictions?: any[]
  level: string
}) => {
  // Convert probabilities to percentages for better readability on the chart
  const chartData = predictions.map((item) => ({
    month: item.month,
    low: Math.round(item.low * 100 * 10) / 10, // Convert to percentage with 1 decimal place
    moderate: Math.round(item.moderate * 100 * 10) / 10,
    high: Math.round(item.high * 100 * 10) / 10,
  }))

  // Sort by month
  chartData.sort((a, b) => a.month - b.month)

  // Create a complete array of months for the x-axis ticks
  const allMonths = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="w-full">
      <Text as="h3" variant="text/md" className="font-medium mb-4">
        Risk Trend Graph
      </Text>

      <Text variant="text/sm" className="text-gray-500 mb-4">
        Predictions of the probability of risk score changes in the next 3, 6,
        and 12 months
      </Text>

      {/* Legend */}
      <div className="flex gap-6 mb-4">
        <div className="flex items-center">
          <div className="w-3 h-2 rounded bg-green-500 mr-1"></div>
          <Text variant="text/xs" className="text-gray-600">
            Low risk
          </Text>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-2 rounded bg-orange-500 mr-1"></div>
          <Text variant="text/xs" className="text-gray-600">
            Moderate risk
          </Text>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-2 rounded bg-red-500 mr-1"></div>
          <Text variant="text/xs" className="text-gray-600">
            High risk
          </Text>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="month"
              ticks={allMonths}
              tickFormatter={(value) => {
                const currentDate = new Date()
                const futureDate = new Date()
                futureDate.setMonth(currentDate.getMonth() + value - 1) // Adjust to make month 1 = current month
                return futureDate.toLocaleString('default', {
                  month: 'short',
                  year: 'numeric',
                })
              }}
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
            />
            <Tooltip content={<CustomTooltip level={level} />} />
            <Line
              type="monotone"
              name="low"
              dataKey="low"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 5, fill: '#22c55e', stroke: 'white', strokeWidth: 2 }}
              activeDot={{
                r: 7,
                fill: '#22c55e',
                stroke: 'white',
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
            <Line
              type="monotone"
              name="moderate"
              dataKey="moderate"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ r: 5, fill: '#f97316', stroke: 'white', strokeWidth: 2 }}
              activeDot={{
                r: 7,
                fill: '#f97316',
                stroke: 'white',
                strokeWidth: 2,
              }}
              connectNulls={true}
            />
            <Line
              type="monotone"
              name="high"
              dataKey="high"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 5, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
              activeDot={{
                r: 7,
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
