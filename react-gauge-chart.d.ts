declare module 'react-gauge-chart' {
  import React from 'react'

  interface GaugeChartProps {
    id?: string
    className?: string
    style?: React.CSSProperties
    nrOfLevels?: number
    arcsLength?: number[]
    colors?: string[]
    percent?: number
    textColor?: string
    needleColor?: string
    needleBaseColor?: string
    arcPadding?: number
    cornerRadius?: number
    animate?: boolean
    animDelay?: number
    formatTextValue?: (value: string) => string
  }

  const GaugeChart: React.FC<GaugeChartProps>

  export default GaugeChart
}
