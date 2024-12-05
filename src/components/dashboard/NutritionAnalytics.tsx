'use client'

import React from 'react'
import {
  useGeneralAnalytics,
  useNutritionAnalytics,
} from '@/hooks/queries/useAnalytics'
import { Text } from '../ui/text'
import { PieChart } from 'react-minimal-pie-chart'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as PieChartX,
  Pie,
  Cell,
} from 'recharts'
import { FullWidthResizableBox } from './FullWidthResizableBox'

const pieChartProps = {
  labelStyle: {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    fill: '#000',
  },
}

const foodKnowledgeColorMapper = {
  energy: '#1f77b4',
  body_building: '#ff7f0e',
  protective: '#2ca02c',
  not_sure: '#d62728',
}
const foodKnowledgeLabelMapper = {
  energy: 'Energy',
  body_building: 'Body building',
  protective: 'Protective',
  not_sure: 'Not sure',
}

const foodGroups = [
  { label: 'Cereals (e.g., maize, rice, sorghums)', key: 'cereals' },
  { label: 'Roots (e.g., yam, cassava, potatoes)', key: 'roots' },
  { label: 'Beans & nuts', key: 'beans_nuts' },
  { label: 'Meat, fish, egg & milk products', key: 'meat_fish' },
  { label: 'Vegetables', key: 'vegetables' },
  { label: 'Fruits', key: 'fruits' },
]

export function NutritionAnalytics() {
  const { data, isPending } = useNutritionAnalytics()

  if (isPending || !data) return null

  return (
    <div className="grid space-y-4">
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Food knowledge
      </Text>
      <div className="">
        {/* a color mapper legend */}
        <div className="flex gap-4">
          {Object.entries(foodKnowledgeColorMapper).map(([key, color]) => (
            <div className="flex items-center gap-2" key={key}>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              <Text variant="text/md">
                {
                  foodKnowledgeLabelMapper[
                    key as keyof typeof foodKnowledgeLabelMapper
                  ]
                }
              </Text>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 grid-cols-3">
        {data.foodKnowledge.map((foodKnowledge) => {
          const data: [string, number][] = Object.entries(
            foodKnowledge.categories
          )

          const food = foodGroups.find(
            (foodGroup) => foodGroup.key === foodKnowledge.food
          )

          return (
            <div
              className="flex flex-col gap-3 items-center"
              key={foodKnowledge.food}
            >
              <Text variant={'text/md'}>
                {food?.label || foodKnowledge.food}
              </Text>
              <PieChart
                data={data.map(([category, count]) => ({
                  value: count,
                  color:
                    foodKnowledgeColorMapper[
                      category as keyof typeof foodKnowledgeColorMapper
                    ] || '#12B76A',
                  title: category,
                }))}
                label={({ x, y, dx, dy, dataEntry }) => (
                  <text
                    x={x}
                    y={y}
                    dx={dx}
                    dy={dy}
                    dominant-baseline="central"
                    text-anchor="middle"
                    color="orange"
                    style={{
                      fontSize: '8px',
                      fontFamily: 'sans-serif',
                      filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
                    }}
                    fill="white"
                  >
                    {Math.round(dataEntry.percentage) + '%'}
                  </text>
                )}
                {...pieChartProps}
                className="max-w-48"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const WeightAwarenessBarChart = () => {
  const { data } = useGeneralAnalytics()
  console.log('🚀 ~ WeightAwarenessBarChart ~ data:', data)
  const weightAwarenessData = data?.data.weightAwareness

  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Weight Awareness
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={500}
          data={weightAwarenessData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="knowsWeight" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            name="Healthy Weight"
            stackId="a"
            fill="#82ca9d"
          />
          <Bar
            dataKey="count"
            name="Unhealthy Weight"
            stackId="b"
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </FullWidthResizableBox>
  )
}

export const DoYouKnowHighBloodPressure = () => {
  const { data } = useGeneralAnalytics()
  const doYouKnowHighBloodPressure = data?.data.doYouKnowHighBloodPressure

  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        High Blood Pressure Awareness
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={500}
          data={doYouKnowHighBloodPressure}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tickFormatter={(label) =>
              label.length > 10 ? `${label.substring(0, 10)}...` : label
            }
            dataKey="value"
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </FullWidthResizableBox>
  )
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']
export const AgeGroupPieChart = () => {
  const { data } = useGeneralAnalytics()
  const ageGroupData = data?.data.ageGroupDistribution
  if (!ageGroupData) return null

  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Age Group Distribution
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartX width={400} height={400}>
          <Pie
            data={ageGroupData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="ageGroup"
            label={(entry) => entry.ageGroup}
          >
            {ageGroupData.map((entry, index) => (
              <Cell
                key={`age-cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChartX>
      </ResponsiveContainer>
    </FullWidthResizableBox>
  )
}

const GenderPieChart = () => {
  const { data } = useGeneralAnalytics()
  const genderData = data?.data.countPerGender
  if (!genderData) return null

  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Gender Distribution
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartX width={400} height={400}>
          <Pie
            data={genderData.map((entry) => ({
              ...entry,
              value: entry.value || 'Other',
            }))}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="value"
            label={(entry) => entry.value || 'Other'}
          >
            {genderData.map((entry, index) => (
              <Cell
                key={`gender-cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChartX>
      </ResponsiveContainer>
    </FullWidthResizableBox>
  )
}

export const GeneralAnalyticsBarChart = () => {
  return (
    <div className="pb-10 space-y-10">
      <WeightAwarenessBarChart />
      <DoYouKnowHighBloodPressure />
      <div className="grid grid-cols-2">
        <AgeGroupPieChart />
        <GenderPieChart />
      </div>
    </div>
  )
}
