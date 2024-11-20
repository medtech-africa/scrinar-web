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
        count: item[label as keyof Omit<typeof item, 'date'>],
      })),
    }))
}

type AxisType = AxisOptions<
  ReturnType<typeof transformData>[number]['data'][number]
>

export default function BarStacked({
  data,
}: {
  data: HealthDataAnalyticsType[]
}) {
  const transformedData = transformData(data || [])
  console.log('🚀 ~ transformedData:', transformedData)

  // AxisOptions<(typeof transformedData)[number]['data'][number]>
  const primaryAxis = React.useMemo<AxisType>(
    () => ({
      getValue: (datum) => datum?.date,
    }),
    []
  )

  const secondaryAxes = React.useMemo<AxisType[]>(
    () => [
      {
        getValue: (datum) => datum?.count,
        stacked: true,
        scaleType: 'linear',
      },
    ],
    []
  )

  if (transformedData.length === 0) return null

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

  console.log('🚀 ~ HealthDataBarStats ~ data:', data)
  return (
    <div>
      <Text className="text-grey-600">
        Health Data entered per day grouped by user type
      </Text>
      <BarStacked data={data || []} />
    </div>
  )
}
