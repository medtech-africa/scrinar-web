'use client'

import { MenuItemProp } from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Delete from '@/components/ui/delete'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { useProjects } from '@/hooks/queries/useProjects'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { usePaginate } from '@/hooks/usePagination'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
// import Link from 'next/link'
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

export default function Projects() {
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
    // isPending: isLoading,
    refetch,
    isFetching,
  } = useProjects(currentPage, search)
  useSchoolChangeRefresh(refetch)

  const projectsData = data?.data

  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(API.project(encodeURIComponent(selectedRow ?? ''))),
  })

  const handleMoreClick = (rowId: string) => {
    setSelectedRow(rowId)
  }

  const menuItems: MenuItemProp[] = [
    {
      title: 'View',
      icon: IconNames.documentText,
      action: (row?: string) =>
        router.push(
          `projects/${encodeURIComponent((row || selectedRow) ?? '')}`
        ),
    },
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: (row?: string) => {
        router.push(
          `projects/${encodeURIComponent((row || selectedRow) ?? '')}/edit`
        )
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
        toast.success('Successfully deleted project')
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
        title="Projects"
        subtitle="Manage Projects, Add, View, and Delete"
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
      <Delete
        open={deleteModal}
        onClose={setDeleteModal}
        action={handleDelete}
        actionLoading={deleteLoading}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Link href="projects/new">
          <Button
            variant="tertiary"
            className="group items-center justify-center flex flex-col gap-2 border-dashed border"
          >
            <FilePlus />
            <p className="font-bold text-xl text-black">Create new project</p>
          </Button>
        </Link>

        {projectsData?.map((val: DataType) => (
          <Card
            key={val.id}
            className="font-normal text-sm text-grey-600 flex flex-col p-0 gap-0 border bg-card text-card-foreground border-border"
          >
            <div className="flex flex-col space-y-1.5 p-4 w-full">
              <div className="text-2xl font-semibold leading-none tracking-tight flex justify-between">
                <span className="truncate font-bold">{val.title}</span>
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

      <div className="">{projectsData?.length === 0 && <EmptyData />}</div>
      {projectsData?.length > 0 && (
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
  title: string
  description: string
  state: string
  createdAt: string
}
