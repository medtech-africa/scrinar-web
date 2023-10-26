import React from 'react'
import { Text } from '../ui/text'
import { getVariantColor } from '@/utils/vitalCalculations'
import { TVariantEnum } from '@/types/variants.types'

const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0 // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage
}

const Circle = ({ colour = '', percentage = 10 }) => {
  const r = 70
  const circ = 2 * Math.PI * r
  const strokePct = ((100 - percentage) * circ) / 100 // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={'2rem'}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  )
}

const Text2 = ({ percentage = 0 }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={'1.5em'}
    >
      {percentage.toFixed(0)}%
    </text>
  )
}

const _DashboardProgress2 = ({ progress = 30 }) => {
  const pct = cleanPercentage(progress)
  return (
    <svg width={159} height={159}>
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Circle colour="#FCE8E9" />
        <Circle colour={'#E31B23'} percentage={pct} />
      </g>
      <Text2 percentage={pct} />
    </svg>
  )
}

const DashboardProgress = ({
  progress = 10,
  variant = TVariantEnum.Success,
}: {
  progress: number
  variant?: TVariantEnum
}) => {
  const radius = 75
  const strokeWidth = 20
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = (1 - progress / 70) * circumference

  return (
    <div className="relative">
      <div className="absolute text-center top-0 right-0 bottom-0 left-0 flex justify-center flex-col">
        <Text
          variant="text/xl"
          weight="bold"
          className="text-grey-700 mb-[3px]"
        >
          {progress}
        </Text>
        <Text className="text-grey-700 text-xs">Progress</Text>
      </div>
      <svg
        width="159"
        height="159"
        viewBox="0 0 159 159"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="z-10"
      >
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          strokeWidth={strokeWidth}
          stroke="#FCE8E9"
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          strokeWidth={strokeWidth}
          stroke="url(#linearGradient)"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
        />
        <defs>
          <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={getVariantColor(variant)} />
            <stop offset="100%" stopColor={getVariantColor(variant)} />
          </linearGradient>
        </defs>
        <path
          d="M79.75 4.47852C89.5991 4.47852 99.3518 6.41845 108.451 10.1876C117.551 13.9567 125.819 19.4811 132.783 26.4455C139.747 33.4099 145.272 41.6778 149.041 50.7773C152.81 59.8767 154.75 69.6294 154.75 79.4785C154.75 89.3277 152.81 99.0804 149.041 108.18C145.272 117.279 139.747 125.547 132.783 132.512C125.819 139.476 117.551 145 108.451 148.769C99.3518 152.539 89.5991 154.479 79.75 154.479L79.75 129.418C86.3081 129.418 92.802 128.126 98.8609 125.616C104.92 123.107 110.425 119.428 115.062 114.791C119.7 110.154 123.378 104.648 125.888 98.5895C128.398 92.5306 129.689 86.0367 129.689 79.4785C129.689 72.9204 128.398 66.4265 125.888 60.3676C123.378 54.3086 119.7 48.8034 115.062 44.1661C110.425 39.5288 104.92 35.8503 98.861 33.3406C92.802 30.8309 86.3081 29.5392 79.75 29.5392V4.47852Z"
          fill="url(#paint0_linear_352_27549)"
        />
      </svg>
    </div>
  )
}
export default DashboardProgress
