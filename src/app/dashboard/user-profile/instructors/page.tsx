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
import useInstructors from '@/hooks/queries/useInstructors'
import { usePaginate } from '@/hooks/usePagination'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { returnJoinedFirstCharacter } from '@/utils/returnJoinedFirstCharacter'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

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
const FilterHeader = ({
  setOpenFilter: _,
  openFilter: __,
}: FilterHeaderProps) => {
  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2">
      <Input
        leadingIcon={<IconPicker icon="search" />}
        className="rounded-[49px] bg-grey-100 text-sm  md:w-[17.25rem] w-[15rem]"
        placeholder="Search by Name, Email or Mobile Number...."
        full={false}
      />
      <div className="flex gap-x-4 mt-2 md:mt-0">
        {/* @Todo:not time */}
        {/* <Button
          onClick={() => setOpenFilter(!openFilter)}
          value="Filter Data"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
          endingIcon={<IconPicker icon="arrowDown" />}
        />
        <Button
          value="Export Data"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
          endingIcon={<IconPicker icon="export" />}
        /> */}
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
  const [lastKey, setLastKey] = useState(null)

  const { data, isLoading, refetch } = useInstructors(
    encodeURIComponent(JSON.stringify(lastKey))
  )
  const instructorsData = data?.data

  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate({
    onNextPage: async () => {
      setLastKey(data?.meta?.lastKey)
      refetch()
    },
  })
  const { isLoading: deleteLoading, mutate } = useMutation(() =>
    baseAxios.delete(API.instructor(encodeURIComponent(selectedRow ?? '')))
  )

  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: () =>
        router.push(
          `instructors/view/${encodeURIComponent(selectedRow ?? '')}`
        ),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () =>
        router.push(
          `instructors/edit-instructor/${encodeURIComponent(selectedRow ?? '')}`
        ),
    },
    {
      title: 'Send Password link',
      icon: IconNames.security,
    },
    {
      title: 'Delete',
      icon: IconNames.trash,
      action: () => {
        setDeleteModal(true)
      },
    },
  ]
  const handleDelete = async () => {
    try {
      await mutate(undefined, {
        onSuccess: () => {
          setSelectedRow(null)
          setDeleteModal(false)
          refetch()
          toast.success('Successfully deleted instructor')
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } finally {
      //
    }
  }

  return (
    <div>
      <PageHeader
        title="Instructors"
        subtitle="Manage Instructors profiles, Add, View and Delete Profile."
        avatar="avatar"
      />
      <FilterHeader setOpenFilter={setOpenFilter} openFilter={openFilter} />
      {openFilter && <FilterData />}
      <Delete
        open={deleteModal}
        onClose={setDeleteModal}
        action={handleDelete}
        actionLoading={deleteLoading}
      />
      <div className="py-3 md:py-8 ">
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
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              instructorsData?.map((val: DataType) => (
                <TableRow
                  key={val?.id}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell className="flex gap-x-2 items-center">
                    <div>
                      <Avatar
                        src={val?.avatarUrl}
                        fallback={returnJoinedFirstCharacter(
                          val.firstName,
                          val.lastName
                        )}
                      />
                    </div>
                    <div className="flex flex-row gap-x-[3px]">
                      <div>{val?.firstName}</div>
                      <div>{val?.lastName}</div>
                    </div>
                  </TableCell>

                  <TableCell className="capitalize">
                    {val?.user?.roles?.join(', ')}
                  </TableCell>
                  <TableCell>{val?.user?.email ?? '-'} </TableCell>
                  <TableCell>{val?.user?.phoneNumber ?? '-'}</TableCell>
                  <TableCell>
                    {val?.createdAt
                      ? format(new Date(val?.createdAt), 'PPP')
                      : '-'}
                  </TableCell>
                  <TableCell className="relative">
                    <div
                      onClick={() => handleMoreClick(val?.id)}
                      className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </div>
                    {selectedRow === val?.id && !deleteModal && (
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
        {instructorsData?.length === 0 && <EmptyData />}
      </div>
      {instructorsData?.length > 0 && (
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
  id?: number
  avatarUrl?: string
  firstName?: string
  lastName?: string
  user: {
    roles?: string[]
    email?: string
    phoneNumber?: string
  }
  createdAt: string
}
