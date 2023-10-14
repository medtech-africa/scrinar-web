'use client'
import DropDownMenu from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import TableLoader from '@/components/table-loader'
// import { BadgeField } from '@/components/ui/Badge'
import { Avatar, AvatarRoot } from '@/components/ui/avatar'
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
import { Text } from '@/components/ui/text'
import useHealthData from '@/hooks/queries/useHealthData'
import { usePaginate } from '@/hooks/usePagination'
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
const FilterHeader = ({
  setOpenFilter: _,
  openFilter: __,
}: FilterHeaderProps) => {
  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2">
      <Input
        leadingIcon={<IconPicker icon="search" />}
        className="rounded-[49px] bg-grey-100 text-sm md:w-[17.25rem] w-[15rem]"
        placeholder="Search by Name, Gender or Age.."
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
        <Link href={`health-data/add-record`}>
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

export default function HealthData() {
  const router = useRouter()
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const { data: healthData, isLoading } = useHealthData(currentPage)

  const menuItems = [
    {
      title: 'View Data',
      icon: IconNames.documentText,
      action: () =>
        router.push(`/dashboard/health-data/view-record/${selectedRow}`),
    },
    {
      title: 'Edit Data',
      icon: IconNames.userEdit,
      action: () =>
        router.push(`/dashboard/health-data/update-record/${selectedRow}`),
    },
    {
      title: 'Delete Data',
      icon: IconNames.trash,
      action: () => {
        setDeleteModal(true)
        setSelectedRow(null)
      },
    },
  ]

  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  return (
    <div>
      <PageHeader
        title="Header"
        subtitle="Tracking Vital Metrics: BMI and Nutritional Information"
        avatar={
          <div className="flex">
            <Avatar
              src="/avatar3.svg"
              fallback="CN"
              size="sm"
              rootClassName="border border-lust-100"
              imgClassName="bg-lust-50"
            />
            <Avatar
              src="/avatar2.svg"
              fallback="PR"
              size="sm"
              rootClassName="border border-sunglow-100 -ml-2"
              imgClassName="bg-sunglow-50"
            />

            <Avatar
              src="/avatar.svg"
              fallback="ME"
              size="sm"
              rootClassName="border border-iris-100 -ml-2"
              imgClassName="bg-iris-50"
            />
            <AvatarRoot className="w-8 h-8 rounded-full border border-green-100 -ml-2">
              <div className="w-full h-full rounded-full flex items-center justify-center border border-white bg-green-50">
                <Text variant="text/sm" weight="x-bold">
                  50
                </Text>
                <Text variant="text/sm" weight="x-bold">
                  +
                </Text>
              </div>
            </AvatarRoot>
          </div>
        }
        isAvatar
      />
      <FilterHeader setOpenFilter={setOpenFilter} openFilter={openFilter} />
      {openFilter && <FilterData />}
      <Delete open={deleteModal} onClose={setDeleteModal} />
      <div className="py-3 md:py-8">
        <Table className="table-auto">
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Students Name</TableHead>
              <TableHead>
                Anthropometry
                <TableHead className="pl-0">Ht(m)</TableHead>
                <TableHead>Wt</TableHead>
                <TableHead>BMI</TableHead>
                <TableHead>WC(cm)</TableHead>
              </TableHead>
              <TableHead>BP(mmHg)</TableHead>
              <TableHead>Blood Sugar(mg/dL)</TableHead>
              <TableHead>Nutritional Access</TableHead>
              <TableHead>Exercise Activity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              healthData?.map((val: DataType) => (
                <TableRow
                  key={val.id}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell className="flex gap-x-2 items-center">
                    <div>{val?.image}</div>
                    <div className="flex flex-row gap-x-[3px]">
                      <div>{val?.firstName}</div>
                      <div>{val?.lastName}</div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <TableCell>
                      {val?.height}{' '}
                      {/* <BadgeField variant="success" value={'n'} /> */}
                    </TableCell>
                    <TableCell>{val?.weight}</TableCell>
                    <TableCell>{val?.bmi}</TableCell>
                    <TableCell>{val?.waist}</TableCell>
                  </TableCell>
                  <TableCell>{val?.bloodPressure}</TableCell>
                  <TableCell>{val?.glucoseLevel}</TableCell>
                  <TableCell>{val?.dietaryDiversityScore}</TableCell>
                  <TableCell>{val?.physicalActivityScore}</TableCell>
                  <TableCell className="relative">
                    <div
                      onClick={() => handleMoreClick(val?.userId)}
                      className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </div>
                    {selectedRow === val?.userId && (
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
        {healthData?.length === 0 && <EmptyData />}
      </div>
      {healthData?.length > 0 && (
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          total={healthData?.meta?.total}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  )
}
type DataType = {
  id?: string
  userId?: string
  image?: React.ReactNode
  firstName?: string
  lastName?: string
  bmi?: number
  height?: number
  weight?: number
  waist?: number
  bloodPressure?: string
  glucoseLevel?: number
  dietaryDiversityScore?: string
  physicalActivityScore?: string
  timestamp?: string
  variant?: string
  variantval?: string
}
