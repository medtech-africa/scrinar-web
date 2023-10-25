import React from 'react'
import { AxisOptions, Chart } from 'react-charts'
import { Text } from './text'
import { ResizableBox } from '../resizableBox'

export interface Root2 {
  name: string
  healthData: Datum[]
}

export interface Datum {
  x: string
  y: string
}

export default function ChartComp({ healthData, name }: Root2) {
  const data = [
    {
      label: name,
      data: healthData?.map((item: Datum) => ({
        primary: new Date(item?.x),
        secondary: parseInt(item?.y, 10),
      })),
    },
  ]
  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
      show: false,
    }),
    []
  )

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: 'area',
      },
    ],
    []
  )

  return (
    <>
      <br />
      <ResizableBox>
        <Text>{name}</Text>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            defaultColors: ['#F9B4AF'],
          }}
        />
      </ResizableBox>
    </>
  )
}
