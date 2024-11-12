'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import DropDownMenu from '@/components/drop-down-menu'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { useRouter } from 'next/navigation'
import TableLoader from '@/components/table-loader'
import { TCholesterol } from '@/types/healthData.types'
import { useFamilyHealthData } from '@/hooks/queries/useHealthData'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
import { usePaginate } from '@/hooks/usePagination'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import Delete from '@/components/ui/delete'
import EmptyData from '@/components/empty-data'
import Pagination from '@/components/pagination'
import { useFHDSharedData } from '@/context/family-health-data-context'
import { cn } from '@/lib/utils'

type Props = {
  type: 'student' | 'mother' | 'father' | 'all' | 'household'
}
const FHDPageContent = ({ type }: Props) => {
  const router = useRouter()
  const { search } = useFHDSharedData()
  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const [selectedRow, setSelectedRow] = React.useState(null)
  const [deleteModal, setDeleteModal] = React.useState(false)
  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }
  const { data, isLoading, refetch } = useFamilyHealthData(
    currentPage,
    search,
    type === 'all' ? '' : type,
    10
  )
  useSchoolChangeRefresh(refetch)

  const healthData = data?.data?.data
  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(
        API.singleHealthData(encodeURIComponent(selectedRow ?? ''))
      ),
  })
  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        setSelectedRow(null)
        setDeleteModal(false)
        refetch()
        toast.success('Successfully deleted Health Data')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }
  const menuItems = [
    {
      title: 'View Data',
      icon: IconNames.documentText,
      action: () =>
        router.push(`/dashboard/health-data/view-record/${selectedRow ?? ''}`),
    },
    {
      title: 'Delete Data',
      icon: IconNames.trash,
      action: () => {
        setDeleteModal(true)
      },
    },
  ]

  return (
    <div>
      <div>
        <Delete
          open={deleteModal}
          onClose={setDeleteModal}
          action={handleDelete}
          actionLoading={deleteLoading}
        />
        <Table className="table-auto" hasEmptyData={healthData?.length === 0}>
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="bg-grey-200"></TableHead>
              <TableHead className="bg-grey-200 absolute pt-3 ">
                Anthropometry
              </TableHead>
              <TableHead className="bg-grey-200"></TableHead>
              <TableHead className="bg-grey-200"></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="bg-grey-200"></TableHead>
              <TableHead className="bg-grey-200 absolute pt-3 ">
                Cholesterol(mg/dL)
              </TableHead>
              <TableHead className="bg-grey-200"></TableHead>
              <TableHead className="bg-grey-200"></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableHeader className="bg-grey-100">
            <TableRow>
              {type === 'household' && <TableHead>Family code</TableHead>}
              <TableHead>Name</TableHead>
              <TableHead>Ht(m)</TableHead>
              <TableHead>Wt</TableHead>
              <TableHead className="w-3">BMI</TableHead>
              <TableHead>WC(cm)</TableHead>
              <TableHead>BP(mmHg)</TableHead>
              <TableHead>Pulse(bpm)</TableHead>
              <TableHead>Blood Sugar(mg/dL)</TableHead>
              <TableHead>Total Cholesterol</TableHead>
              <TableHead>LDL</TableHead>
              <TableHead>HDL</TableHead>
              <TableHead>Triglycerides</TableHead>
              {/* <TableHead>Nutritional Access</TableHead>*/}
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              healthData?.map?.((val: DataType | MemberType) =>
                type === 'household' && hasMemberArray(val) ? (
                  val?.members?.map((val2: DataType, index) => (
                    <TableBodyRow
                      key={val2?._id}
                      deleteModal={deleteModal}
                      handleMoreClick={handleMoreClick}
                      menuItems={menuItems}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      val={val2}
                      className={
                        index === val?.members?.length - 1
                          ? 'border-b border-lust-100'
                          : ''
                      }
                      isHousehold
                    />
                  ))
                ) : (
                  <TableBodyRow
                    key={(val as DataType)?._id}
                    deleteModal={deleteModal}
                    handleMoreClick={handleMoreClick}
                    menuItems={menuItems}
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    val={val as DataType}
                  />
                )
              )
            )}
          </TableBody>
        </Table>
      </div>
      {healthData?.length === 0 && <EmptyData />}
      {healthData?.length > 0 && (
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          total={data?.data?.total}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  )
}

type BodyRowType = {
  val: DataType
  className?: string
  isHousehold?: boolean
  handleMoreClick: (rowIndex: any) => void
  selectedRow: any
  deleteModal: boolean
  menuItems: {
    title: string
    icon: IconNames
    action: () => void
  }[]
  setSelectedRow: React.Dispatch<React.SetStateAction<any>>
}

const TableBodyRow = ({
  val,
  className = '',
  isHousehold = false,
  handleMoreClick,
  selectedRow,
  deleteModal,
  menuItems,
  setSelectedRow,
}: BodyRowType) => {
  const user = val?.student || val?.parent
  const userId = val?._id || user?._id
  return (
    <TableRow className={cn('font-normal text-sm text-grey-600', className)}>
      {isHousehold && <TableCell>{val?.familyCodeMember}</TableCell>}
      <TableCell>
        <div className="flex w-[100px] items-center capitalize">
          <div>{val?.image}</div>
          <div>
            {user?.fullName ||
              `${user?.firstName || ''} ${user?.lastName || ''}`}
          </div>
        </div>
      </TableCell>

      <TableCell>
        {val?.height} {/* <BadgeField variant="success" value={'n'} /> */}
      </TableCell>
      <TableCell>{val?.weight}</TableCell>
      <TableCell>{val?.bmi}</TableCell>
      <TableCell>{val?.waist}</TableCell>
      <TableCell>{val?.bloodPressure}</TableCell>
      <TableCell>{val?.pulse}</TableCell>
      <TableCell>{val?.glucoseLevel}</TableCell>
      <TableCell>{val?.cholesterol?.totalCholesterol}</TableCell>
      <TableCell>{val?.cholesterol?.ldl}</TableCell>
      <TableCell>{val?.cholesterol?.hdl}</TableCell>
      <TableCell>{val?.cholesterol?.triglycerides}</TableCell>
      {/* <TableCell>{val?.dietaryDiversityScore}</TableCell>*/}
      <TableCell>{val?.percentageCompletion}</TableCell>
      <TableCell className="relative">
        <div
          onClick={() => handleMoreClick(userId)}
          className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
        >
          <IconPicker icon="more" size="1.25rem" />
        </div>
        {selectedRow === userId && !deleteModal && (
          <DropDownMenu
            menuItems={menuItems}
            onClose={() => setSelectedRow(null)}
          />
        )}
      </TableCell>
    </TableRow>
  )
}

export default FHDPageContent
type DataType = {
  _id?: string
  familyCodeMember?: string
  familyCode?: string
  userId?: string
  image?: React.ReactNode
  student?: {
    _id: string
    firstName?: string
    lastName?: string
    fullName?: string
  }
  parent?: {
    _id: string
    firstName?: string
    lastName?: string
    fullName?: string
  }
  bmi?: number
  height?: number
  weight?: number
  waist?: number
  bloodPressure?: string
  pulse?: string
  cholesterol?: TCholesterol
  glucoseLevel?: number
  dietaryDiversityScore?: string
  physicalActivityScore?: string
  timestamp?: string
  variant?: string
  variantval?: string
  percentageCompletion?: number
}

type MemberType = { members: DataType[]; familyCode: string }

function hasMemberArray(val: DataType | MemberType): val is MemberType {
  return 'members' in val
}
