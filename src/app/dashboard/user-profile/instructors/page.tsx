'use client'
import DropDownMenu, { MenuItemProp } from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import Delete from '@/components/ui/delete'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2">
      <Input
        leadingIcon={<IconPicker icon="search" />}
        className="rounded-[49px] bg-grey-100 text-sm  md:w-[17.25rem] w-[15rem]"
        placeholder="Search by Name, Email or Mobile Number...."
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
        <Link href={`instructors/add-instructor`}>
          <Button
            value="Add New Instructor"
            variant="primary"
            className="p-2 md:px-4 md:py-2 h-full"
            leadingIcon={<IconPicker icon="add" />}
          />
        </Link>
      </div>
    </div>
  )
}

export default function Instructors() {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: () => router.push(`instructors/view/${selectedRow}`),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () => router.push(`instructors/edit-instructor/${selectedRow}`),
    },
    {
      title: 'Send Password link',
      icon: IconNames.security,
    },
    {
      title: 'Delete',
      icon: IconNames.trash,
      action: () => {
        setDeleteModal(true), setSelectedRow(null)
      },
    },
  ]

  return (
    <div>
      <PageHeader
        title="Instructors"
        subtitle="Manage Instructors profiles, Add, View and Delete Profile."
        avatar="avatar"
      />
      <FilterHeader setOpenFilter={setOpenFilter} openFilter={openFilter} />
      {openFilter && <FilterData />}
      {deleteModal && <Delete onClose={setDeleteModal} />}
      <div className="max-h-[500px] overflow-y-auto py-3 md:py-8">
        <Table>
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-[500px]">
            {data.length === 0 ? (
              <EmptyData />
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

                  <TableCell>{val.role}</TableCell>
                  <TableCell>{val.email}</TableCell>
                  <TableCell>{val.phoneNumber}</TableCell>
                  <TableCell>{val.timestamp}</TableCell>
                  <TableCell className="relative">
                    <div
                      onClick={() => handleMoreClick(val.id)}
                      className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </div>
                    {selectedRow === val.id && (
                      <DropDownMenu
                        menuItems={menuItems}
                        onClose={() => setSelectedRow(null)}
                      />
                    )}
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
  role?: string
  email?: string
  phoneNumber?: string
  timestamp?: string
}[]

const data: DataType = [
  {
    id: 1,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Emmanuel',
    lastName: 'adebayo',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
  {
    id: 2,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
  {
    id: 3,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
  {
    id: 4,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
  {
    id: 5,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
  {
    id: 6,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
  {
    id: 7,
    image: (
      <div className="bg-grey-100 p-3 rounded-full cursor-pointer">Av</div>
    ),
    firstName: 'Asah',
    lastName: 'Benjamin',
    role: 'teacher',
    email: 'name@example.com',
    phoneNumber: '(+234) 81 123 1234 345',
    timestamp: 'Aug 10, 2023',
  },
]
