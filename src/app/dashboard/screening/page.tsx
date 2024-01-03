'use client'
import DropDownMenu from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import {
  ScreeningAdd,
  ScreeningEdit,
  ScreeningView,
} from '@/components/screening-side'
import { CC, MD } from '@/components/svg/calendar-content'
import TableLoader from '@/components/table-loader'
import { BadgeField } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Delete from '@/components/ui/delete'
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
import useScreenings from '@/hooks/queries/useScreenings'
import { usePaginate } from '@/hooks/usePagination'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
import { cn } from '@/lib/utils'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { formatDate, formatTime } from '@/utils/formatDate'
import { useMutation } from '@tanstack/react-query'
// import { useRouter } from 'next/navigation'
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
  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )

  const { data, isLoading, refetch } = useScreenings(currentPage)
  useSchoolChangeRefresh(refetch)

  const screeningData: DataType = data?.data
  const [deleteModal, setDeleteModal] = useState(false)
  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(API.screening(encodeURIComponent(selectedRow ?? ''))),
  })

  const menuItems = [
    {
      title: 'Screening Details',
      icon: IconNames.calendar,
      action: () => {
        setActionType('view')
      },
    },
    {
      title: 'Edit Schedule',
      icon: IconNames.calendarEdit,
      action: () => {
        setActionType('edit')
      },
    },
    {
      title: 'Delete Data',
      icon: IconNames.trash,
      action: () => {
        setDeleteModal(true)
      },
    },
  ]

  const handleMoreClick = (id: any) => {
    setSelectedRow(selectedRow === id ? null : id)
  }

  const handleDelete = async () => {
    try {
      await mutate(undefined, {
        onSuccess: () => {
          setSelectedRow(null)
          setDeleteModal(false)
          refetch()
          toast.success('Successfully deleted screening')
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
      <Delete
        open={deleteModal}
        onClose={setDeleteModal}
        action={handleDelete}
        actionLoading={deleteLoading}
      />
      <div className="pb-3 md:pb-8 ">
        <Table
          className={cn(
            'table-auto',
            screeningData?.length !== 0 && 'min-h-[200px]'
          )}
        >
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
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              screeningData?.map((val) => (
                <TableRow
                  key={val.id}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell>
                    {val?.assessmentDate && formatDate(val?.assessmentDate)}
                  </TableCell>
                  <TableCell>
                    {val?.assessmentDate && formatTime(val?.assessmentDate)}
                  </TableCell>
                  <TableCell>{val.title}</TableCell>
                  <TableCell>{val.location}</TableCell>
                  <TableCell>{val.assessmentType}</TableCell>
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
                        onClose={() =>
                          !deleteModal && !actionType && setSelectedRow(null)
                        }
                        menuItems={menuItems}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {screeningData?.length === 0 && <EmptyData />}
      </div>
      {screeningData?.length > 0 && (
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          total={data?.total}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {actionType === 'view' && (
        <ScreeningView
          actionOpened={actionType === 'view'}
          setActionType={setActionType}
          id={selectedRow ?? ''}
        />
      )}
      {actionType === 'edit' && (
        <ScreeningEdit
          actionOpened={actionType === 'edit'}
          setActionType={setActionType}
          id={selectedRow ?? ''}
          refetchScreenings={refetch}
        />
      )}
    </div>
  )
}

export default function ScreeningManagement() {
  const [openFilter, _setOpenFilter] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Screening List')
  const [actionType, setActionType] = useState('')

  return (
    (<div>
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
          //Calendar View',
          labels={['Screening List']}
          onClickTabItem={setSelectedTab}
          activeTab={selectedTab}
        />
        <div className="mt-2 md:mt-0 flex flex-col justify-end items-end">
          {/* <Button
            onClick={() => setOpenFilter(!openFilter)}
            value="Filter Screening"
            className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-3"
            endingIcon={<IconPicker icon="arrowDown" />}
          /> */}
          {openFilter && <FilterData />}
        </div>
      </div>
      {selectedTab === 'Calendar View' ? (
        // @TODO: This is a dummy content
        (<div>
          <MD />
          <CC />
        </div>)
      ) : (
        <ScreeningList actionType={actionType} setActionType={setActionType} />
      )}
      {actionType === 'add' && (
        <ScreeningAdd
          setActionType={setActionType}
          actionOpened={actionType === 'add'}
        />
      )}
    </div>)
  );
}
type DataType = {
  id: string
  assessmentDate?: string
  time?: string
  title?: string
  location?: string
  assessmentType?: string
  status?: string
}[]

// const data: DataType = [
//   {
//     id: 1,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'Schedule',
//   },
//   {
//     id: 2,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'Overdue',
//   },
//   {
//     id: 3,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'In Progress',
//   },
//   {
//     id: 4,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'Schedule',
//   },
//   {
//     id: 5,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'Overdue',
//   },
//   {
//     id: 6,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'Completed',
//   },
//   {
//     id: 7,
//     date: '10 Aug, 2023',
//     time: '10:30AM',
//     title: 'Health Data Collection',
//     location: 'School Hall',
//     acessmentType: 'Physical Health Ass...',
//     status: 'Completed',
//   },
// ]
