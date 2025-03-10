'use client'
import DropDownMenu, { MenuItemProp } from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import SortBy from '@/components/sort-by'
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
import useParents from '@/hooks/queries/useParents'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { usePaginate } from '@/hooks/usePagination'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
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
  onSearchChange: (val: string) => void
  searchVal?: string
  loading?: boolean
  onSortChange: (val: string) => void
}
const FilterHeader = ({
  setOpenFilter: _,
  openFilter: __,
  onSearchChange,
  searchVal,
  loading,
  onSortChange,
}: FilterHeaderProps) => {
  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2 items-center">
      <div>
        <Input
          leadingIcon={<IconPicker icon="search" />}
          className="rounded-[49px] bg-grey-100 text-sm  md:w-[17.25rem] w-[15rem]"
          placeholder="Search by Name or HouseHold Code...."
          full={false}
          onChange={(e) => onSearchChange(e.target.value)}
          endingIcon={
            loading && searchVal && <IconPicker icon="loader2" size={20} />
          }
        />
        <SortBy onChange={onSortChange} />
      </div>
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
        <Link href={`parents/add`}>
          <Button
            value="Add New Parent"
            variant="primary"
            className="p-2 md:px-4 md:py-2 h-full"
            leadingIcon={<IconPicker icon="add" />}
          />
        </Link>
      </div>
    </div>
  )
}

export default function Parents() {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [sortVal, setSort] = useState('')

  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const [search, setSearch] = useDebouncedState('')
  const {
    data,
    isPending: isLoading,
    refetch,
    isFetching,
  } = useParents(currentPage, search, false, sortVal)
  useSchoolChangeRefresh(refetch)

  const parentsData = data?.data

  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(API.parent(encodeURIComponent(selectedRow ?? ''))),
  })

  const handleMoreClick = (rowId: string) => {
    setSelectedRow(selectedRow === rowId ? null : rowId)
  }

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: () =>
        router.push(`parents/view/${encodeURIComponent(selectedRow ?? '')}`),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () =>
        router.push(`parents/edit/${encodeURIComponent(selectedRow ?? '')}`),
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
    await mutate(undefined, {
      onSuccess: () => {
        setSelectedRow(null)
        setDeleteModal(false)
        refetch()
        toast.success('Successfully deleted parent')
        // toast.success('')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  return (
    <div>
      <PageHeader
        title="Parents"
        subtitle="Manage Parents profiles, Add, View and Delete Profile."
        avatar="avatar"
      />
      <FilterHeader
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        onSearchChange={setSearch}
        searchVal={search}
        loading={isFetching}
        onSortChange={setSort}
      />
      {openFilter && <FilterData />}
      <Delete
        open={deleteModal}
        onClose={setDeleteModal}
        action={handleDelete}
        actionLoading={deleteLoading}
      />

      <div className="py-3 md:py-8">
        <Table className="table-auto" hasEmptyData={parentsData?.length === 0}>
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>HouseHold Code</TableHead>
              <TableHead>Mobile No</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              parentsData?.map((val: DataType) => (
                <TableRow
                  key={val.id}
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
                  <TableCell className="capitalize">{val.gender}</TableCell>
                  <TableCell className="capitalize">
                    {val.familyCode ?? '-'}
                  </TableCell>
                  <TableCell className="capitalize">{val.mobile}</TableCell>
                  <TableCell>
                    {format(new Date(val.createdAt), 'PPP')}
                  </TableCell>
                  <TableCell className="relative">
                    <button
                      title="Icon picker"
                      onClick={() => handleMoreClick(val.id)}
                      className="p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </button>
                    {selectedRow === val.id && !deleteModal && (
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
        {parentsData?.length === 0 && <EmptyData />}
      </div>
      {parentsData?.length > 0 && (
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          total={data?.total}
          onNext={handleNext}
          onPrev={handlePrev}
          pageSize={data?.per_page}
          className="mt-2"
        />
      )}
    </div>
  )
}
type DataType = {
  id: string
  avatarUrl?: string
  firstName: string
  lastName: string
  familyCode: string
  gender: string
  createdAt: string
  mobile: string
}
