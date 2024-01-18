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
import { useDebouncedState } from '@/hooks/useDebouncedState'

type FilterHeaderProps = {
  onChange: (value: string) => void
  value: string
}
const FilterHeader = ({ onChange }: FilterHeaderProps) => {
  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between mt-2 border-y border-grey-50 mb-2">
      <Input
        leadingIcon={<IconPicker icon="search" />}
        className="rounded-[49px] bg-grey-100 text-sm md:w-[17.25rem] w-[15rem]"
        placeholder="Search by email, userId, name ..."
        full={false}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default function TrainerPage() {
  const [selectedRow, setSelectedRow] = useState<string | null>('')
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer | undefined>(
    undefined
  )
  const { currentPage, setCurrentPage, handlePrev, handleNext } = usePaginate(
    {}
  )
  const [search, setSearch] = useDebouncedState('')
  const { data, isLoading, refetch } = useTrainers({
    search,
    page: currentPage,
  })
  const { data: trainer } = useTrainer({
    id: selectedTrainer?.id,
    placeholderData: selectedTrainer,
  })
  useSchoolChangeRefresh(refetch)
  const healthData = data?.data

  const menuItems = [
    {
      title: 'View Data',
      icon: IconNames.documentText,
      action: () => {
        setSelectedTrainer(healthData?.find((v) => v.id === selectedRow))
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
        subtitle="Check trainers data"
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
      <FilterHeader onChange={setSearch} value={search} />
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
          pageSize={data?.per_page}
          onNext={handleNext}
          onPrev={handlePrev}
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
