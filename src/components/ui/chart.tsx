import { getColorForValue } from '@/utils/chartVitalcolors'
import React from 'react'
import GaugeChart from 'react-gauge-chart'

export interface ThresholdChartProps {
  name: string
  healthData: string
  units: string
}

export default function ThresholdChart({
  healthData,
  name,
  units,
}: ThresholdChartProps) {
  const latestDataPoint = parseFloat(healthData)

  const pointerData =
    latestDataPoint / 100 > 1
      ? 1
      : latestDataPoint / 100 < 0
        ? 0
        : latestDataPoint / 100

  const gaugeColor = getColorForValue(latestDataPoint, name)?.color
  const gaugeName = getColorForValue(latestDataPoint, name)?.name
  return (
    <div style={{ width: '100%', height: 200, textAlign: 'center' }}>
      <h3>{name}</h3>
      {!healthData ? (
        <div style={{ marginTop: '20px' }}>
          <p>No data available</p>
        </div>
      ) : (
        <GaugeChart
          id="gauge-chart"
          // className="capitalize"
          formatTextValue={() => `${latestDataPoint} ${units} - ${gaugeName}`}
          nrOfLevels={30}
          percent={pointerData}
          colors={[gaugeColor as string]}
          textColor="#000000"
        />
      )}
    </div>
  )
}
