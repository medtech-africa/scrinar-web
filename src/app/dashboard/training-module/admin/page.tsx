'use client'
import DropDownMenu from '@/components/drop-down-menu'
import EmptyData from '@/components/empty-data'
import { PageHeader } from '@/components/page-header'
import Pagination from '@/components/pagination'
import TableLoader from '@/components/table-loader'
import { Avatar } from '@/components/ui/avatar'
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
import { usePaginate } from '@/hooks/usePagination'
import { useState } from 'react'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
import { useTrainer, useTrainers } from '@/hooks/queries/useTrainingModules'
import Modal from '@/components/ui/modal'
import { ITrainer } from '@/types/trainingModules.types'
import Trainer from './Trainer'

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
    </div>
  )
}

export default function TrainerPage() {
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedRow, setSelectedRow] = useState<string | null>('')
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | undefined>(
    undefined
  )
  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const { data, isLoading, refetch } = useTrainers()
  const { data: trainer } = useTrainer({
    id: selectedTrainer?.id,
    placeholderData: selectedTrainer,
  })
  useSchoolChangeRefresh(refetch)
  const healthData = data?.data

  console.log({ healthData })
  console.log({ selectedTrainer, trainer })

  const menuItems = [
    {
      title: 'View Data',
      icon: IconNames.documentText,
      action: () => {
        console.log('trainer', healthData?.find((v) => v.id === selectedRow))
        healthData &&
          setSelectedTrainer(healthData.find((v) => v.id === selectedRow))
      },
    },
  ]

  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }

  return (
    <div>
      <PageHeader
        title="Trainer"
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
          </div>
        }
        isAvatar
      />
      <FilterHeader setOpenFilter={setOpenFilter} openFilter={openFilter} />
      <div className="py-3 md:py-8">
        <Table className="table-auto" hasEmptyData={healthData?.length === 0}>
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Completed modules</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              healthData?.map?.((val) => (
                <TableRow
                  key={val.id}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell>
                    <div>{val?.email}</div>
                  </TableCell>

                  <TableCell>{val?.completedModulesCount}</TableCell>
                  <TableCell>{val?.leaderBoardScore}</TableCell>
                  <TableCell>{val?.userId}</TableCell>
                  <TableCell className="relative">
                    <div
                      onClick={() => handleMoreClick(val?.id)}
                      className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                    >
                      <IconPicker icon="more" size="1.25rem" />
                    </div>
                    {selectedRow === val?.id && (
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
        {healthData?.length === 0 && <EmptyData />}
      </div>
      {healthData && healthData?.length > 0 && (
        <Pagination
          current={currentPage}
          setCurrent={setCurrentPage}
          total={data?.total ?? 0}
          onNext={handleNext}
          onPrev={handlePrev}
          pageSize={data?.per_page}
        />
      )}
      <Modal
        open={!!selectedTrainer}
        closeModal={() => setSelectedTrainer(undefined)}
        title={'Trainer Details'}
      >
        <Trainer trainer={trainer} />
      </Modal>
    </div>
  )
}
