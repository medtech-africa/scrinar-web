'use client'

import React from 'react'
import {
  HealthDataAnalyticsType,
  useHealthDataAnalytics,
} from '@/hooks/queries/useAnalytics'
import { AxisOptions, Chart as ChartX } from 'react-charts'
import { ResizableBox } from '../resizableBox'
import { Text } from '../ui/text'
import useWindowSize from '@/hooks/useWindowSize'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts'

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

  const { width = 0 } = useWindowSize()

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
    <ResizableBox width={width * 0.7}>
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
  const { width = 0 } = useWindowSize()

  if (isPending || !data) return null

  return (
    <div className="w-full">
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Health Data entered per day grouped by user type
      </Text>
      <ResizableBox width={width * 0.7}>
        <Example data={data || []} />
      </ResizableBox>
      {/* <BarStacked data={data || []} /> */}
    </div>
  )
}

const Example = ({ data }: { data: HealthDataAnalyticsType[] }) => {
  const dataWithTotal = data.map((v) => ({
    ...v,
    total: v.children + v.fathers + v.mothers,
  }))
  const maxTotal = Math.max(...dataWithTotal.map((v) => v.total))
  const tickCount = Math.ceil(maxTotal / 2) + 3

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={dataWithTotal} barCategoryGap={'20%'}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="date" />
        <YAxis tickCount={tickCount} />
        <Tooltip />
        <Legend />
        <Bar dataKey="fathers" stackId="a" fill="#FAA43A" legendType="circle" />
        <Bar dataKey="mothers" stackId="a" fill="#fd6768" legendType="circle" />
        <Bar
          dataKey="children"
          stackId="a"
          fill="#0d83ab"
          legendType="circle"
          // fill="#8884d8"
        >
          <LabelList
            dataKey="total"
            position="middle"
            content={({ x, y, width, value }) => (
              <text
                x={+(x || 0) + +(width || 0) / 2}
                y={+(y || 0) - 10}
                textAnchor="middle"
                fill="#333"
              >
                {value}
              </text>
            )}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
