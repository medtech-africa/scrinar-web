'use client'
import DropDownMenu, { MenuItemProp } from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import TableLoader from '@/components/table-loader'
import { Avatar } from '@/components/ui/avatar'
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
import useStudents from '@/hooks/queries/useStudents'
import { usePaginate } from '@/hooks/usePagination'
import { returnJoinedFirstCharacter } from '@/utils/returnJoinedFirstCharacter'
import { format } from 'date-fns'
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
        placeholder="Search by Name, Level, Gender or Age...."
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
        <Link href={`students/add-student`}>
          <Button
            value="Add New Student"
            variant="primary"
            className="p-2 md:px-4 md:py-2 h-full"
            leadingIcon={<IconPicker icon="add" />}
          />
        </Link>
      </div>
    </div>
  )
}

export default function Students() {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )

  const { data, isLoading } = useStudents(currentPage)

  const studentsData = data?.data

  const handleMoreClick = (rowIndex: string) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: () =>
        router.push(`students/view/${encodeURIComponent(selectedRow ?? '')}`),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () =>
        router.push(
          `students/edit-student/${encodeURIComponent(selectedRow ?? '')}`
        ),
    },
    {
      title: 'Delete',
      icon: IconNames.trash,
      action: () => {
        setDeleteModal(true)
        setSelectedRow(null)
      },
    },
  ]

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle="Manage Students profiles, Add, View and Delete Profile."
        avatar="avatar"
      />
      <FilterHeader setOpenFilter={setOpenFilter} openFilter={openFilter} />
      {openFilter && <FilterData />}
      <Delete open={deleteModal} onClose={setDeleteModal} />

      <div className="py-3 md:py-8">
        <Table className="table-auto">
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              studentsData?.map((val: DataType) => (
                <TableRow
                  key={val.userId}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell className="flex gap-x-2 items-center">
                    <Avatar
                      src={val?.avatarUrl}
                      fallback={returnJoinedFirstCharacter(
                        val.firstName,
                        val.lastName
                      )}
                    />
                    <div className="flex gap-x-[3px]">
                      <div>{val.firstName}</div>
                      <div>{val.lastName}</div>
                    </div>
                  </TableCell>

                  <TableCell>{val.level ?? '-'}</TableCell>
                  <TableCell>{val.gender}</TableCell>
                  <TableCell>{val.age}</TableCell>
                  <TableCell>
                    {format(new Date(val.createdAt), 'PPP')}
                  </TableCell>
                  <TableCell className="relative">
                    <div
                      onClick={() => handleMoreClick(val.userId)}
                      className="p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </div>
                    {selectedRow === val.userId && (
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
        {studentsData?.length === 0 && <EmptyData />}
      </div>
      {studentsData?.length > 0 && (
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          total={data?.meta?.total}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  )
}
type DataType = {
  id?: string
  userId: string
  avatarUrl?: string
  firstName: string
  lastName: string
  level: string
  gender: string
  age?: string
  createdAt: string
}
