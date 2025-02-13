'use client'

import { Header } from '@/components/ui/header'
import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

import ContentLoader from '@/components/content-loader'
import { useUser } from '@/context/user'
import SelectSchoolModal from './select-school-modal'
import { isMasterInstructor } from '@/utils/checkPermission'
// import useHealthData, {
//   useFamilyHealthData,
// } from '@/hooks/queries/useHealthData'
// import useParents from '@/hooks/queries/useParents'
// import useStudents from '@/hooks/queries/useStudents'
// import useScreenings from '@/hooks/queries/useScreenings'
import { useSyncLocalStorage } from '@/hooks/useSyncLocalStorage'
import { SidebarProvider } from '@/components/ui/sidebar-new'
import { AppSidebar } from '@/components/sidebar/app-sidebar'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { loading, user } = useUser()

  // useHealthData()
  // useParents()
  // useFamilyHealthData()
  // useFamilyHealthData(1, '', 'student', 10)
  // useFamilyHealthData(1, '', 'mother', 10)
  // useFamilyHealthData(1, '', 'father', 10)
  // useFamilyHealthData(1, '', 'all', 10)
  // useFamilyHealthData(1, '', 'household', 10)
  // useFamilyHealthData(1, '', 'student', 10)
  // useStudents(1, '', '')
  // useScreenings(1)

  useSyncLocalStorage()

  return (
    <>
      <ContentLoader loading={loading} />
      <SidebarProvider defaultOpen={true}>
        <div className="w-full bg-grey-100 h-screen md:overflow-hidden flex">
          <AppSidebar />
          <div className="h-full relative md:grid md:grid-rows-[auto_1fr] md:pl-4 w-full">
            <Header />
            <AnimatePresence mode="wait">
              <main className="md:px-8 py-3 px-2 relative md:pb-8 bg-white overflow-auto">
                {children}
              </main>
            </AnimatePresence>
          </div>
        </div>
      </SidebarProvider>
      {isMasterInstructor(user?.roles) && <SelectSchoolModal />}
    </>
  )
}

export default DashboardLayout
