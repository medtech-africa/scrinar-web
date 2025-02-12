'use client'

import { MenuItemProp } from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { FormContent } from '@/components/forms/form-content'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import { SlideOver } from '@/components/slide-over'
import { BadgeField } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Delete from '@/components/ui/delete'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import useForms from '@/hooks/queries/useForms'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { usePaginate } from '@/hooks/usePagination'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
import { FormModel } from '@/types/forms.types'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import { FilePlus } from 'lucide-react'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
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
  setOpenModal: (value: boolean) => void
  setOpenFilter: (value: boolean) => void
  openFilter: boolean
  onSearchChange: (val: string) => void
  searchVal?: string
  loading?: boolean
}
const FilterHeader = ({
  // setOpenModal,
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
          placeholder="Search by Name...."
          full={false}
          onChange={(e) => onSearchChange(e.target.value)}
          endingIcon={
            loading && searchVal && <IconPicker icon="loader2" size={20} />
          }
        />
      </div>
      <div className="flex gap-x-4 mt-2 md:mt-0">
        {/* <Link href={`forms/add-form`}> */}
        {/* <Button
          value="New Form"
          variant="primary"
          onClick={() => setOpenModal(true)}
          className="p-2 md:px-4 md:py-2 h-full"
          leadingIcon={<IconPicker icon="add" />}
        /> */}
        {/* </Link> */}
      </div>
    </div>
  )
}

export default function Forms() {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const [search, setSearch] = useDebouncedState('')
  const {
    data,
    // isPending: isLoading,
    refetch,
    isFetching,
  } = useForms(currentPage, search)
  useSchoolChangeRefresh(refetch)

  const formsData = data?.data

  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(API.form(encodeURIComponent(selectedRow ?? ''))),
  })

  const selectedForm = useMemo(
    () => formsData?.find((form: FormModel) => form.id === selectedRow),
    [formsData, selectedRow]
  )

  const handleMoreClick = (rowId: string) => {
    setSelectedRow(rowId)
  }

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: (row?: string) =>
        router.push(
          `forms/${encodeURIComponent((row || selectedRow) ?? '')}?view=true`
        ),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () => {
        setOpenModal(true)
      },
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
        toast.success('Successfully deleted form')
        // toast.success('')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <PageHeader
        title="Forms"
        subtitle="Manage Forms profiles, Add and View"
        avatar="avatar"
      />
      <FilterHeader
        setOpenModal={setOpenModal}
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        onSearchChange={setSearch}
        searchVal={search}
        loading={isFetching}
      />
      {openFilter && <FilterData />}
      <Delete
        open={deleteModal}
        onClose={setDeleteModal}
        action={handleDelete}
        actionLoading={deleteLoading}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Button
          variant="default"
          onClick={() => {
            handleMoreClick('')
            setOpenModal(true)
          }}
          className="group items-center justify-center flex flex-col gap-2"
        >
          <FilePlus />
          <p className="font-bold text-xl text-white">Create new form</p>
        </Button>

        {formsData?.map((val: DataType) => (
          <Card
            key={val.id}
            className="font-normal text-sm text-grey-600 flex flex-col p-0 gap-0 border bg-card text-card-foreground border-border"
          >
            <div className="flex flex-col space-y-1.5 p-4 w-full">
              <div className="text-2xl font-semibold leading-none tracking-tight flex justify-between">
                <span className="truncate font-bold">{val.title}</span>

                {val.state === 'published' && (
                  <BadgeField className="py-1 px-2 text-xs" variant={'success'}>
                    Published
                  </BadgeField>
                )}
                {val.state === 'draft' && (
                  <BadgeField variant={'pending'} className="py-1 px-2 text-xs">
                    Draft
                  </BadgeField>
                )}
              </div>

              <div className="text-sm">
                {formatDistance(new Date(val.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>

            <div className="p-4 pt-0 h-5 truncate text-sm w-full">
              {val.description ?? 'No description'}
            </div>

            <div className="flex flex-row gap-2 w-full items-center p-4 pt-0 flex-wrap">
              {menuItems.map((item) => (
                <Button
                  variant={'tertiary'}
                  key={item.title}
                  onClick={() => {
                    handleMoreClick(val.id)
                    setTimeout(() => {
                      item.action?.(val.id)
                    }, 0)
                  }}
                  className="flex-1"
                >
                  <IconPicker icon={item.icon} size="1rem" />
                  <span className="ml-2">{item.title}</span>
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="">
        {/* <Table className="table-auto" hasEmptyData={formsData?.length === 0}>
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              formsData?.map((val: DataType) => (
                <TableRow
                  key={val.id}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell className="flex gap-x-2 items-center">
                    <div>{val.title}</div>
                  </TableCell>

                  <TableCell className="capitalize">
                    {val.description ?? '-'}
                  </TableCell>
                  <TableCell className="capitalize">{val.state}</TableCell>
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
                    {selectedRow === val.id && !deleteModal && !openModal && (
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
        </Table> */}
        {formsData?.length === 0 && <EmptyData />}
      </div>
      {formsData?.length > 0 && (
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

      <SlideOver
        onClose={closeModal}
        open={openModal}
        title={selectedForm?.id ? 'Edit Form' : 'New Form'}
        icon={<IconPicker icon="book" size={'1.25rem'} />}
      >
        <FormContent singleFormData={selectedForm} />
      </SlideOver>
    </div>
  )
}
type DataType = {
  id: string
  title: string
  description: string
  state: string
  createdAt: string
}
