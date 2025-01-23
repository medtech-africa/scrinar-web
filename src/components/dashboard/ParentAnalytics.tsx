import { useParentAnalytics } from '@/hooks/queries/useAnalytics'
import React from 'react'
import { FullWidthResizableBox } from './FullWidthResizableBox'
import { Text } from '../ui/text'

import {
  //   BarChart,
  //   Bar,
  //   XAxis,
  //   YAxis,
  //   CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as PieChartX,
  Pie,
  Cell,
} from 'recharts'
import { getTypeDistribution } from '@/utils/misc'
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28DFF',
  '#FF4E50',
  '#2ECC71',
  '#3498DB',
  '#E74C3C',
  '#9B59B6',
  '#F39C12',
  '#D35400',
  '#1ABC9C',
]
export const ReligionPieChart = () => {
  const { data } = useParentAnalytics()
  const parentData = data?.data
  if (!parentData) return null
  const formattedResult = getTypeDistribution(parentData, 'religion')
  // const result: Record<string, number> = parentData.reduce(
  //   (acc, obj) => {
  //     const occupation = obj.occupation?.trim().toLowerCase()
  //     acc[occupation] = (acc[occupation] || 0) + 1
  //     return acc
  //   },
  //   {} as Record<string, number>
  // )

  // const formattedResult = Object.entries(result)
  //   .filter(([value]) => value !== 'undefined')
  //   .map(([value, count]) => ({
  //     value,
  //     count,
  //   }))
  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Religion Distribution
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartX width={400} height={400}>
          <Pie
            data={formattedResult}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="value"
            label={(entry) => entry.value}
          >
            {formattedResult.map((entry, index) => (
              <Cell
                key={`religion-${index}`}
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
export const OccupationPieChart = () => {
  const { data } = useParentAnalytics()
  const parentData = data?.data
  if (!parentData) return null
  const formattedResult = getTypeDistribution(parentData, 'occupation')
  // const result: Record<string, number> = parentData.reduce(
  //   (acc, obj) => {
  //     const occupation = obj.occupation?.trim().toLowerCase()
  //     acc[occupation] = (acc[occupation] || 0) + 1
  //     return acc
  //   },
  //   {} as Record<string, number>
  // )

  // const formattedResult = Object.entries(result)
  //   .filter(([value]) => value !== 'undefined')
  //   .map(([value, count]) => ({
  //     value,
  //     count,
  //   }))
  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Occupation Distribution
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartX width={400} height={400}>
          <Pie
            data={formattedResult}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="value"
            label={(entry) => entry.value}
          >
            {formattedResult.map((entry, index) => (
              <Cell
                key={`occupation-${index}`}
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
export const EthnicityPieChart = () => {
  const { data } = useParentAnalytics()
  const parentData = data?.data
  if (!parentData) return null
  const formattedResult = getTypeDistribution(parentData, 'ethnicity')
  // const result: Record<string, number> = parentData.reduce(
  //   (acc, obj) => {
  //     const occupation = obj.occupation?.trim().toLowerCase()
  //     acc[occupation] = (acc[occupation] || 0) + 1
  //     return acc
  //   },
  //   {} as Record<string, number>
  // )

  // const formattedResult = Object.entries(result)
  //   .filter(([value]) => value !== 'undefined')
  //   .map(([value, count]) => ({
  //     value,
  //     count,
  //   }))
  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Ethnicity Distribution
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartX width={400} height={400}>
          <Pie
            data={formattedResult}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="value"
            label={(entry) => entry.value}
          >
            {formattedResult.map((entry, index) => (
              <Cell
                key={`ethnicity-${index}`}
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
export const HouseHoldIncomePieChart = () => {
  const { data } = useParentAnalytics()
  const parentData = data?.data
  if (!parentData) return null
  const formattedResult = getTypeDistribution(parentData, 'householdIncome')
  // const result: Record<string, number> = parentData.reduce(
  //   (acc, obj) => {
  //     const occupation = obj.occupation?.trim().toLowerCase()
  //     acc[occupation] = (acc[occupation] || 0) + 1
  //     return acc
  //   },
  //   {} as Record<string, number>
  // )

  // const formattedResult = Object.entries(result)
  //   .filter(([value]) => value !== 'undefined')
  //   .map(([value, count]) => ({
  //     value,
  //     count,
  //   }))
  return (
    <FullWidthResizableBox>
      <Text className="text-grey-700" variant="text/md" weight="medium">
        Household Income Distribution
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <PieChartX width={400} height={400}>
          <Pie
            data={formattedResult}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="value"
            label={(entry) => entry.value}
          >
            {formattedResult.map((entry, index) => (
              <Cell
                key={`householdIncome-${index}`}
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
const ParentAnalytics = () => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      <OccupationPieChart />
      <ReligionPieChart />
      <EthnicityPieChart />
      <HouseHoldIncomePieChart />
    </div>
  )
}

export default ParentAnalytics
