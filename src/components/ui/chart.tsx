import React from 'react'
import GaugeChart from 'react-gauge-chart'

export interface ThresholdChartProps {
  name: string
  healthData: string
  highThreshold: number
  lowThreshold: number
  units: string
}

export default function ThresholdChart({
  healthData,
  name,
  highThreshold,
  lowThreshold,
  units,
}: ThresholdChartProps) {
  const latestDataPoint = parseFloat(healthData)

  const midRange = (highThreshold - lowThreshold) / 2
  const lowYellowThreshold = lowThreshold - midRange
  const highYellowThreshold = highThreshold + midRange
  function getColorForValue(value: number) {
    if (value < lowYellowThreshold) {
      return '#FF5F6D' // Red for low danger
    } else if (value >= lowYellowThreshold && value < lowThreshold) {
      return '#FFC371' // Yellow for low caution
    } else if (value >= lowThreshold && value <= highThreshold) {
      return '#96FF72' // Green for healthy
    } else if (value > highThreshold && value <= highYellowThreshold) {
      return '#FFC371' // Yellow for high caution
    } else {
      return '#FF5F6D' // Red for high danger
    }
  }
  const pointerData =
    latestDataPoint / 100 > 1
      ? 1
      : latestDataPoint / 100 < 0
        ? 0
        : latestDataPoint / 100

  const gaugeColor = getColorForValue(latestDataPoint)

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
          formatTextValue={() => `${latestDataPoint} ${units}`}
          nrOfLevels={30}
          percent={pointerData}
          colors={[gaugeColor]}
          textColor="#000000"

          // arcWidth={0.2}
        />
      )}
    </div>
  )
}
