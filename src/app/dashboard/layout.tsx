'use client'

import { Header } from '@/components/ui/header'
import { SideBar } from '@/components/ui/sidebar'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'

import ContentLoader from '@/components/content-loader'
import { useUser } from '@/context/user'
import SelectSchoolModal from './select-school-modal'
import { isMasterInstructor } from '@/utils/checkPermission'
import useHealthData, {
  useFamilyHealthData,
} from '@/hooks/queries/useHealthData'
import useParents from '@/hooks/queries/useParents'
import useStudents from '@/hooks/queries/useStudents'
import useScreenings from '@/hooks/queries/useScreenings'
import { useSyncLocalStorage } from '@/hooks/useSyncLocalStorage'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sideOpen, sideToggleOpen] = useState(false)
  const { loading, user } = useUser()

  useHealthData()
  useParents()
  useFamilyHealthData()
  useFamilyHealthData(1, '', 'student', 10)
  useFamilyHealthData(1, '', 'mother', 10)
  useFamilyHealthData(1, '', 'father', 10)
  useFamilyHealthData(1, '', 'all', 10)
  useFamilyHealthData(1, '', 'household', 10)
  useFamilyHealthData(1, '', 'student', 10)
  useStudents(1, '', '')
  useScreenings(1)

  useSyncLocalStorage()

  return (
    <>
      <ContentLoader loading={loading} />
      <div className="w-full bg-grey-100 h-screen md:overflow-hidden">
        <div className="absolute z-30 md:py-4 md:pr-2 md:pl-4 h-full">
          <SideBar sideOpen={sideOpen} sideToggleOpen={sideToggleOpen} />
        </div>
        <div className="h-full relative md:grid md:grid-rows-[80px_1fr] md:ml-20.8 lg:ml-64 md:pl-9 ">
          <Header sideToggleOpen={sideToggleOpen} />
          <AnimatePresence mode="wait">
            <main className="md:px-8 py-4 px-2 relative md:pb-16 bg-white overflow-auto">
              {children}
            </main>
          </AnimatePresence>
        </div>
      </div>
      {isMasterInstructor(user?.roles) && <SelectSchoolModal />}
    </>
  )
}

export default DashboardLayout
