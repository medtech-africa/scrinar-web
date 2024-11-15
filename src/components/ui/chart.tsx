import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export interface Datum {
  x: string
  y: string
}

export interface ThresholdChartProps {
  name: string
  healthData: Datum[]
  highThreshold: number
  lowThreshold: number
}

export default function ThresholdChart({
  healthData,
  name,
  highThreshold,
  lowThreshold,
}: ThresholdChartProps) {
  const hasData = healthData && healthData.length > 0

  const formattedData = healthData?.map((item: Datum) => ({
    x: new Date(item.x).toLocaleDateString(),
    y: parseInt(item.y, 10),
  }))

  return (
    <div style={{ width: '100%', height: 400, textAlign: 'center' }}>
      <h3>{name}</h3>

      {!hasData ? (
        <div style={{ marginTop: '20px' }}>
          <p>No data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" hide />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <ReferenceLine
              y={highThreshold}
              stroke="red"
              strokeDasharray="3 3"
              label={{ position: 'insideTopRight', value: 'High Threshold' }}
            />
            <ReferenceLine
              y={lowThreshold}
              stroke="blue"
              strokeDasharray="3 3"
              label={{ position: 'insideBottomRight', value: 'Low Threshold' }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#F9B4AF"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
