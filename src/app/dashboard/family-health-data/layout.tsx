'use client'
import { PageHeader } from '@/components/page-header'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { useUser } from '@/context/user'
import { isMasterInstructor } from '@/utils/checkPermission'
import DropDownMenuExportAll from '../health-data/drop-down-export-all'
import DropDownMenuExport from '../health-data/drop-down-export'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useFHDSharedData } from '@/context/family-health-data-context'

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
const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)

type FilterHeaderProps = {
  setOpenFilter: (value: boolean) => void
  openFilter: boolean
  onSearchChange: (val: string) => void
  searchVal?: string
  loading?: boolean
  type: string
}
const FilterHeader = ({
  setOpenFilter: _,
  openFilter: __,
  onSearchChange,
  searchVal,
  loading,
  type,
}: FilterHeaderProps) => {
  const [openExport, setOpenExport] = useState(false)
  const [openExportAll, setOpenExportAll] = useState(false)
  const user = useUser((state) => state.user)

  return (
    <div className="md:flex md:flex-row grid grid-cols-1 py-4 justify-between items-center mt-2 border-y border-grey-50 mb-2">
      <Input
        leadingIcon={<IconPicker icon="search" />}
        className="rounded-[49px] bg-grey-100 text-sm md:w-[17.25rem] w-[15rem]"
        placeholder="Search by Name, Gender or Age.."
        full={false}
        onChange={(e) => onSearchChange(e.target.value)}
        endingIcon={
          loading && searchVal && <IconPicker icon="loader2" size={20} />
        }
      />
      <div className="flex items-center gap-x-4 mt-2 md:mt-0">
        {/* @Todo:not time */}
        {/* <Button
          onClick={() => setOpenFilter(!openFilter)}
          value="Filter Data"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
          endingIcon={<IconPicker icon="arrowDown" />}
        />*/}

        <div>
          {isMasterInstructor(user?.roles) && (
            <div className="relative mb-2">
              <Button
                value="Export All Health Data"
                className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
                endingIcon={<IconPicker icon="export" />}
                onClick={() => setOpenExportAll(true)}
              />
              {openExportAll && (
                <DropDownMenuExportAll
                  onClose={() => setOpenExportAll(false)}
                />
              )}
            </div>
          )}

          <div className="relative">
            <Button
              value="Export Health Risk"
              className="bg-grey-50 text-grey-900 hover:bg-grey-100 p-2 md:px-4 md:py-2"
              endingIcon={<IconPicker icon="export" />}
              onClick={() => setOpenExport(true)}
            />
            {openExport && (
              <DropDownMenuExport onClose={() => setOpenExport(false)} />
            )}
          </div>
        </div>
        <Link
          href={`/dashboard/health-data/add-record?type=${type === 'all' ? 'student' : type}`}
        >
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

export default function FamilyHealthDataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const type = pathname.split('/')[3]
  const [openFilter, setOpenFilter] = useState(false)

  const [search, setSearch] = useDebouncedState('')
  const { setSearch: setSearchContext } = useFHDSharedData()

  useEffect(() => {
    setSearchContext(search)
    return () => setSearchContext('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div>
      <PageHeader
        title="Health Data Logs"
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
      <FilterHeader
        setOpenFilter={setOpenFilter}
        openFilter={openFilter}
        onSearchChange={setSearch}
        searchVal={search}
        // loading={isFetching}
        type={
          type === 'students' || type === 'household'
            ? 'student'
            : type?.replace('s', '')
        }
      />
      {openFilter && <FilterData />}

      <div className="py-3 md:py-8">
        <div>
          <div className="mb-4 flex gap-2" aria-label="Tabs Navigation">
            <Link
              className={triggerClassName}
              href="/dashboard/family-health-data/all"
              data-state={pathname.includes('all') && 'active'}
            >
              All
            </Link>
            <Link
              className={triggerClassName}
              href="/dashboard/family-health-data/students"
              data-state={pathname.includes('students') && 'active'}
            >
              Students
            </Link>
            <Link
              className={triggerClassName}
              href="/dashboard/family-health-data/fathers"
              data-state={pathname.includes('fathers') && 'active'}
            >
              Fathers
            </Link>
            <Link
              className={triggerClassName}
              href="/dashboard/family-health-data/mothers"
              data-state={pathname.includes('mothers') && 'active'}
            >
              Mothers
            </Link>
            <Link
              className={triggerClassName}
              href="/dashboard/family-health-data/household"
              data-state={pathname.includes('household') && 'active'}
            >
              HouseHold
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
