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
import usePatients from '@/hooks/queries/usePatients'
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
          value="Age"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100"
          endingIcon={<IconPicker icon="add" />}
        />
        <Button
          value="Gender"
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
}

const FilterHeader = ({
  setOpenFilter: _,
  openFilter: __,
  onSearchChange,
  searchVal,
  loading,
}: FilterHeaderProps) => {
  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2 items-center">
      <div>
        <Input
          leadingIcon={<IconPicker icon="search" />}
          className="rounded-[49px] bg-grey-100 text-sm  md:w-[17.25rem] w-[15rem]"
          placeholder="Search by Name, Medical Record Number or Gender...."
          full={false}
          onChange={(e) => onSearchChange(e.target.value)}
          endingIcon={
            loading && searchVal && <IconPicker icon="loader2" size={20} />
          }
        />
      </div>
      <div className="flex gap-x-4 mt-2 md:mt-0">
        <Link href={`patients/add`}>
          <Button
            value="Add New Patient"
            variant="primary"
            className="p-2 md:px-4 md:py-2 h-full"
            leadingIcon={<IconPicker icon="add" />}
          />
        </Link>
      </div>
    </div>
  )
}

export default function Patients() {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const [search, setSearch] = useDebouncedState('')
  const {
    data,
    isPending: isLoading,
    refetch,
    isFetching,
  } = usePatients(currentPage, search)
  useSchoolChangeRefresh(refetch)

  const patientsData = data?.data

  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(API.patient(encodeURIComponent(selectedRow ?? ''))),
  })

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: () =>
        router.push(`patients/view/${encodeURIComponent(selectedRow ?? '')}`),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () =>
        router.push(`patients/edit/${encodeURIComponent(selectedRow ?? '')}`),
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
        toast.success('Successfully deleted patient')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Manage Patient profiles, Add, View and Delete Profile."
        avatar="avatar"
      />
      <FilterHeader
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        onSearchChange={setSearch}
        searchVal={search}
        loading={isFetching}
      />

      {openFilter && <FilterData />}

      <div className="bg-white rounded-lg border border-grey-50">
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoader />
              ) : (
                patientsData?.map((patient: DataType) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-x-3">
                        <Avatar
                          src={patient.avatarUrl}
                          fallback={returnJoinedFirstCharacter(
                            patient.firstName,
                            patient.lastName
                          )}
                        />
                        <div>
                          <div className="font-medium text-base">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-grey-500">
                            {patient.nationalId || 'No ID'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-base">{patient.age}</div>
                    </TableCell>

                    <TableCell>
                      <div className="text-base">
                        {patient.phoneNumber || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-base">
                        {format(new Date(patient.createdAt), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropDownMenu
                        menuItems={menuItems}
                        onClose={() => setSelectedRow(null)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {patientsData?.length === 0 && <EmptyData />}

          {patientsData?.length > 0 && (
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
        </>
      </div>

      <Delete
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        action={handleDelete}
        actionLoading={deleteLoading}
      />
    </div>
  )
}

type DataType = {
  id: string
  avatarUrl?: string
  firstName: string
  lastName: string
  age: number
  gender: string
  phoneNumber?: string
  nationalId?: string
  createdAt: string
}
