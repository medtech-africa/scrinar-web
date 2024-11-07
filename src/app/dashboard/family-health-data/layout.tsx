'use client'
import { PageHeader } from '@/components/page-header'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import * as Tabs from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { useUser } from '@/context/user'
import { isMasterInstructor } from '@/utils/checkPermission'
import DropDownMenuExportAll from '../health-data/drop-down-export-all'
import DropDownMenuExport from '../health-data/drop-down-export'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Text } from '@/components/ui/text'

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
}
const FilterHeader = ({
  setOpenFilter: _,
  openFilter: __,
  onSearchChange,
  searchVal,
  loading,
}: FilterHeaderProps) => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.replace(path)
  }
  const [open, toggleOpen] = React.useState(false)
  const [openExport, setOpenExport] = useState(false)
  const [openExportAll, setOpenExportAll] = useState(false)
  const user = useUser((state) => state.user)
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

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
        <div className="flex relative w-fit">
          <motion.button
            className={cn(
              'flex h-fit items-center justify-between bg-primary text-white py-3 px-4 rounded-lg'
            )}
            onClick={() => toggleOpen(!open)}
            layout="position"
          >
            <div className="flex gap-2">
              <IconPicker icon="add" size="1.5rem" />
              <Text className="block md:hidden lg:block" variant="text/md">
                Add new record
              </Text>
            </div>
            <motion.div
              key="arrow"
              animate={{ rotate: open ? 0 : -90 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 50,
              }}
            >
              <IconPicker icon="arrowDown" />
            </motion.div>
          </motion.button>

          <AnimatePresence initial={false}>
            {open && (
              // Inside the JSX where Link is used
              <motion.div
                ref={dropdownRef}
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                className="w-fit bg-white rounded-lg p-4 shadow-lg absolute -top-5 right-[200px] whitespace-nowrap flex flex-col"
                variants={{
                  open: {
                    opacity: 1,
                    height: 'auto',
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                  },
                }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={cn('px-4 py-2 hover:bg-grey-100 cursor-pointer')}
                  onClick={() =>
                    handleNavigation('/dashboard/health-data/add-record')
                  }
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">Students</span>
                  </Text>
                </div>

                <div
                  className={cn('px-4 py-2 hover:bg-grey-100 cursor-pointer')}
                  onClick={() =>
                    handleNavigation('/dashboard/health-data/add-record')
                  }
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">Fathers</span>
                  </Text>
                </div>

                <div
                  className={cn('px-4 py-2 hover:bg-grey-100 cursor-pointer')}
                  onClick={() =>
                    handleNavigation('/dashboard/health-data/add-record')
                  }
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">Mothers</span>
                  </Text>
                </div>

                <div
                  className={cn('px-4 py-2 hover:bg-grey-100 cursor-pointer')}
                  onClick={() =>
                    handleNavigation('/dashboard/health-data/add-record')
                  }
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">Household</span>
                  </Text>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState(pathname?.split('/')[3] ?? '')
  const [openFilter, setOpenFilter] = useState(false)
  useEffect(() => {
    setSelectedTab(pathname?.split('/')[3] ?? '')
  }, [pathname])

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    router.push(`/dashboard/family-health-data/${value}`)
  }

  const [search, setSearch] = useDebouncedState('')

  // @Todo: not time
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
      />
      {openFilter && <FilterData />}

      <div className="py-3 md:py-8">
        <div>
          <Tabs.Root
            className="TabsRoot"
            value={selectedTab}
            onValueChange={handleTabChange}
          >
            <Tabs.List className="mb-4" aria-label="Tabs Navigation">
              <Tabs.Trigger className={triggerClassName} value="students">
                Students
              </Tabs.Trigger>
              <Tabs.Trigger className={triggerClassName} value="fathers">
                Fathers
              </Tabs.Trigger>
              <Tabs.Trigger className={triggerClassName} value="mothers">
                Mothers
              </Tabs.Trigger>
              <Tabs.Trigger className={triggerClassName} value="household">
                HouseHold
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={selectedTab}>{children}</Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  )
}
