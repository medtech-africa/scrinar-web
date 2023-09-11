'use client'
import { BadgeField } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Text } from '@/components/ui/text'
// import Link from 'next/link'
import { useState } from 'react'

const PageHeader = () => {
  return (
    <div className=" flex flex-col gap-y-4 px-6 py-4 ">
      <div className="flex items-baseline gap-4">
        <Text
          variant="display/xs"
          weight="medium"
          className="text-2xl text-grey-900"
        >
          Health Data
        </Text>
        <Text> Avatar</Text>
      </div>
      <div>
        <Text
          variant="display/sm"
          weight="default"
          className="text-sm text-grey-600"
        >
          Tracking Vital Metrics: BMI and Nutritional Information
        </Text>
      </div>
    </div>
  )
}

const FilterData = () => {
  return (
    <div className="flex flex-row px-6 py-4 mt-2 border-y border-grey-50 gap-4">
      <div className="flex gap-x-4">
        <Button
          value="Timestamp"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100"
          endingIcon={<IconPicker icon="add" />}
        />
        <Button
          value="Nutritional Health"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100"
          endingIcon={<IconPicker icon="add" />}
        />
        <Button
          value="Exercise Habits"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100"
          endingIcon={<IconPicker icon="add" />}
        />
        <Button
          value="Sort By"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100"
          endingIcon={<IconPicker icon="add" />}
        />
      </div>
    </div>
  )
}

export default function HealthData() {
  const [openFilter, setOpenFilter] = useState(false)
  const FilterHeader = () => {
    return (
      <div className="md:flex md:flex-row grid grid-cols-1 w-full px-6 py-4 justify-between mt-2 border-y border-grey-50">
        <Input
          leadingIcon={<IconPicker icon="search" />}
          className="rounded-[49px] bg-grey-100 text-sm md:w-[17.25rem] w-[15rem]"
          placeholder="Search by Name, Gender or Age.."
          full={false}
        />
        <div className="flex gap-x-4 mt-2 md:mt-0">
          <Button
            onClick={() => setOpenFilter(!openFilter)}
            value="Filter Data"
            className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
            endingIcon={<IconPicker icon="arrowDown" />}
          />
          <Button
            value="Export Data"
            className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
            endingIcon={<IconPicker icon="export" />}
          />
          <Button
            value="Add New Record"
            variant="primary"
            className="p-2 md:px-4 md:py-2"
            leadingIcon={<IconPicker icon="add" />}
          />
        </div>
      </div>
    )
  }
  return (
    <div>
      <PageHeader />
      <FilterHeader />
      {openFilter && <FilterData />}
      <Table>
        <TableHeader className="bg-grey-100">
          <TableRow>
            <TableHead>Students Name</TableHead>
            <TableHead>BMI</TableHead>
            <TableHead></TableHead>
            <TableHead>Nutritional Health</TableHead>
            <TableHead>Exercise Habits</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell>No data available</TableCell>
            </TableRow>
          ) : (
            data.map((val) => (
              <TableRow
                key={val.id}
                className="font-normal text-sm text-grey-600"
              >
                <TableCell className="flex gap-x-2 items-center">
                  <div>{val.image}</div>
                  <div className="flex flex-row gap-x-[3px]">
                    <div>{val.firstName}</div>
                    <div>{val.lastName}</div>
                  </div>
                </TableCell>

                <TableCell>{val.bmi}</TableCell>
                <TableCell>
                  <BadgeField variant="error" value={val.variantval} />
                </TableCell>
                <TableCell>{val.nutritional}</TableCell>
                <TableCell>{val.exercise}</TableCell>
                <TableCell>{val.timestamp}</TableCell>
                <TableCell className="flex justify-center">
                  <IconPicker icon="more" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
type DataType = {
  id?: number
  image?: React.ReactNode
  firstName?: string
  lastName?: string
  bmi?: number
  nutritional?: string
  exercise?: string
  timestamp?: string
  variant?: string
  variantval?: string
}[]

const data: DataType = [
  {
    id: 1,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Emmanuel',
    lastName: 'adebayo',
    bmi: 23.3,
    nutritional: 'good',
    exercise: 'Moderately Good',
    timestamp: 'Aug 10, 2023',
    variant: 'success',
    variantval: 'Healthy',
  },
  {
    id: 2,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    bmi: 23.3,
    nutritional: 'Execellent',
    exercise: 'Very Active',
    timestamp: 'Aug 10, 2023',
    variant: 'error',
    variantval: 'Extremely obese',
  },
]
