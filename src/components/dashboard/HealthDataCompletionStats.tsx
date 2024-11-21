'use client'

import React from 'react'
import { useHealthDataCompletionAnalytics } from '@/hooks/queries/useAnalytics'
import { Text } from '../ui/text'
import { PieChart } from 'react-minimal-pie-chart'

const pieChartProps = {
  labelStyle: {
    fontSize: '14px',
    fontFamily: 'sans-serif',
    fill: '#000',
  },
  // label: ({
  //   dataEntry,
  // }: {
  //   dataEntry: {
  //     value: number
  //     color: string
  //     title: number
  //   }
  // }) => dataEntry.title,
  lineWidth: 20,
  labelPosition: 0,
  paddingAngle: 20,
  rounded: true,
  totalValue: 100,
}

const getData = (percent = 0) => {
  return [
    {
      value: percent,
      color: percent >= 80 ? '#12B76A' : '#E38627',
      title: `${percent}%`,
    },
    { value: 100 - percent, color: '#F2F4F7' },
  ]
}

export function HealthDataCompletionStats() {
  const { data, isPending } = useHealthDataCompletionAnalytics()

  if (isPending || !data) return null

  return (
    <div className="grid space-y-4">
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Completion status per focus group
      </Text>
      <div className="flex gap-x-4">
        <div className="flex flex-col gap-3 items-center">
          <Text variant={'text/md'}>Children</Text>
          <PieChart
            data={getData(data.children)}
            label={({ dataEntry }) => dataEntry.title}
            {...pieChartProps}
            className="w-40 h-40"
          />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Text variant={'text/md'}>Mothers</Text>
          <PieChart
            data={getData(data.mothers)}
            label={({ dataEntry }) => dataEntry.title}
            {...pieChartProps}
            className="w-40 h-40"
          />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Text variant={'text/md'}>Fathers</Text>
          <PieChart
            data={getData(data.fathers)}
            label={({ dataEntry }) => dataEntry.title}
            {...pieChartProps}
            className="w-40 h-40"
          />
        </div>
      </div>
    </div>
  )
}
