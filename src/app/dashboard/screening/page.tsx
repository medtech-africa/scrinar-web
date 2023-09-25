'use client'
import DropDownMenu from '@/components/drop-down-menu'
import { PageHeader } from '@/components/page-header'
import {
  ScreeningAdd,
  ScreeningEdit,
  ScreeningView,
} from '@/components/screening-side'
import { CC, MD } from '@/components/svg/calendar-content'
import { BadgeField } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { TabList } from '@/components/ui/tab-list'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Text } from '@/components/ui/text'
// import { useRouter } from 'next/navigation'
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
          value="Status"
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

const ScreeningList = ({
  actionType,
  setActionType,
}: {
  actionType: string
  setActionType: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [selectedRow, setSelectedRow] = useState(null)

  const menuItems = [
    {
      title: 'Screening Details',
      icon: IconNames.calendar,
      action: () => setActionType('view'),
    },
    {
      title: 'Edit Schedule',
      icon: IconNames.calendarEdit,
      action: () => setActionType('edit'),
    },
    { title: 'Delete Data', icon: IconNames.trash },
  ]

  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  return (
    <div>
      <div className="max-h-[500px] overflow-y-auto pb-3 md:pb-8">
        <Table>
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Assessment Type</TableHead>
              <TableHead>Status</TableHead>
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
                  <TableCell>{val.date}</TableCell>
                  <TableCell>{val.time}</TableCell>
                  <TableCell>{val.title}</TableCell>
                  <TableCell>{val.location}</TableCell>
                  <TableCell>{val.acessmentType}</TableCell>
                  <TableCell>
                    <BadgeField
                      variant={
                        val.status === 'Completed'
                          ? 'success'
                          : val.status === 'Overdue'
                          ? 'error'
                          : val.status === 'Schedule'
                          ? 'warning'
                          : 'pending'
                      }
                      value={val.status}
                    />
                  </TableCell>
                  <TableCell className="relative">
                    <div
                      onClick={() => handleMoreClick(val.id)}
                      className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </div>
                    {selectedRow === val.id && (
                      <DropDownMenu
                        onClose={() => setSelectedRow(null)}
                        menuItems={menuItems}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ScreeningView
        actionOpened={actionType === 'view'}
        setActionType={setActionType}
      />
      <ScreeningEdit
        actionOpened={actionType === 'edit'}
        setActionType={setActionType}
      />
    </div>
  )
}

export default function ScreeningManagement() {
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Calendar View')
  const [actionType, setActionType] = useState('')

  return (
    <div>
      <PageHeader
        title="Screening Management"
        subtitle="Tracking and Schedule Screenings"
      />
      <Button
        value="Schedule Screening"
        className="my-6"
        leadingIcon={<IconPicker icon="add" />}
        onClick={() => setActionType('add')}
      />

      <div className="md:flex md:flex-row md:items-start grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2">
        <TabList
          labels={['Calendar View', 'Screening List']}
          onClickTabItem={setSelectedTab}
          activeTab={selectedTab}
        />
        <div className="mt-2 md:mt-0 flex flex-col justify-end items-end">
          <Button
            onClick={() => setOpenFilter(!openFilter)}
            value="Filter Screening"
            className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-3"
            endingIcon={<IconPicker icon="arrowDown" />}
          />
          {openFilter && <FilterData />}
        </div>
      </div>

      {selectedTab === 'Calendar View' ? (
        // @TODO: This is a dummy content
        <div>
          <MD />
          <CC />
        </div>
      ) : (
        <ScreeningList actionType={actionType} setActionType={setActionType} />
      )}

      <ScreeningAdd
        setActionType={setActionType}
        actionOpened={actionType === 'add'}
      />
    </div>
  )
}
type DataType = {
  id?: number
  date?: string
  time?: string
  title?: string
  location?: string
  acessmentType?: string
  status?: string
}[]

const data: DataType = [
  {
    id: 1,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'Schedule',
  },
  {
    id: 2,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'Overdue',
  },
  {
    id: 3,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'In Progress',
  },
  {
    id: 4,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'Schedule',
  },
  {
    id: 5,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'Overdue',
  },
  {
    id: 6,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'Completed',
  },
  {
    id: 7,
    date: '10 Aug, 2023',
    time: '10:30AM',
    title: 'Health Data Collection',
    location: 'School Hall',
    acessmentType: 'Physical Health Ass...',
    status: 'Completed',
  },
]
