'use client'
import { PageHeader } from '@/components/PageHeader'
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
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

const FilterData = () => {
  return (
    <div className="flex flex-row py-4 mt-2 border-y border-grey-50 gap-4">
      <div className="gap-x-4 md:flex md:flex-row grid grid-cols-2 gap-y-2">
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
type FilterHeaderProps = {
  setOpenFilter: (value: boolean) => void
  openFilter: boolean
}
const FilterHeader = ({ setOpenFilter, openFilter }: FilterHeaderProps) => {
  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50">
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
        <Link href={`/dashboard/health-data/add-record`}>
          <Button
            value="Add New Record"
            variant="primary"
            className="p-2 md:px-4 md:py-2 h-full"
            leadingIcon={<IconPicker icon="add" />}
          />
        </Link>
      </div>
    </div>
  )
}
const DropDownMenu = () => {
  return (
    <div
      className={cn(
        'flex flex-col p-2 bg-grey-50 mt-8 justify-center space-y-3 items-start shadow-xl absolute right-4 z-40 whitespace-nowrap'
      )}
    >
      <div className="flex flex-row items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-[#F9FAFB] rounded">
        <div className="bg-grey-100 rounded-full">
          <IconPicker icon="book" size={16} />
        </div>
        <Text className="hover:text-grey-900 text-grey-600 hover:text-sm text-xs ">
          View Data
        </Text>
      </div>
      <div className="flex flex-row items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-[#F9FAFB] rounded">
        <div className="bg-grey-100 rounded-full">
          <IconPicker icon="profile2User" size={16} />
        </div>
        <Text className="hover:text-grey-900 text-grey-600 hover:text-sm text-xs">
          Edit Data
        </Text>
      </div>
      <div className="flex flex-row items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-[#F9FAFB] rounded">
        <div className="bg-grey-100 rounded-full">
          <IconPicker icon="warning2" size={16} />
        </div>
        <Text className="hover:text-carmine-pink-red-900 text-carmine-pink-red-600 hover:text-sm text-xs">
          Delete Data
        </Text>
      </div>
    </div>
  )
}

export default function HealthData() {
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  return (
    <div>
      <PageHeader
        title="Header"
        subtitle="Tracking Vital Metrics: BMI and Nutritional Information"
        avatar="avatar"
      />
      <FilterHeader setOpenFilter={setOpenFilter} openFilter={openFilter} />
      {openFilter && <FilterData />}
      <div className="max-h-[500px] overflow-y-auto">
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
          <TableBody className="h-[500px]">
            {data.length === 0 ? (
              <div className="flex flex-1 justify-center flex-col items-center absolute left-[40%] h-[400px]">
                <IconPicker icon="grid7" />
                <Text className="text-grey-400" variant="text/sm">
                  No Data Entry
                </Text>
              </div>
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
                  <TableCell className="flex justify-center relative text-left">
                    <div
                      onClick={() => handleMoreClick(val.id)}
                      className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50"
                    >
                      <IconPicker icon="more" />
                    </div>
                    {selectedRow === val.id && <DropDownMenu />}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
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
  {
    id: 3,
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
  {
    id: 4,
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
  {
    id: 5,
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
  {
    id: 6,
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
  {
    id: 7,
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
