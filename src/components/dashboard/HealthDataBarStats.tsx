'use client'

import React from 'react'
import {
  HealthDataAnalyticsType,
  useHealthDataAnalytics,
} from '@/hooks/queries/useAnalytics'
import { AxisOptions, Chart as ChartX } from 'react-charts'
import { ResizableBox } from '../resizableBox'
import { Text } from '../ui/text'

function transformData(
  data: { date: string; children: number; fathers: number; mothers: number }[]
) {
  if (!data || !data[0]) return []

  return Object.keys(data[0])
    .filter((key) => key !== 'date')
    .map((label) => ({
      label,
      data: data.map((item) => ({
        date: item.date,
        count: item[label as keyof typeof item],
      })),
    }))
}

export default function BarStacked({
  data,
}: {
  data: HealthDataAnalyticsType[]
}) {
  const transformedData = transformData(data || [])

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof transformedData)[number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => datum.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof transformedData)[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.count,
        stacked: true,
      },
    ],
    []
  )

  return (
    <ResizableBox>
      <ChartX
        options={{
          data: transformedData,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </ResizableBox>
  )
}

export function HealthDataBarStats() {
  const { data, isPending } = useHealthDataAnalytics()

  if (isPending || !data) return null

  return (
    <div>
      <Text className="text-grey-600">
        Health Data entered per day grouped by user type
      </Text>
      <BarStacked data={data || []} />
    </div>
  )
}
