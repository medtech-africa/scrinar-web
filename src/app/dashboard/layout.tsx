'use client'

import { Header } from '@/components/ui/header'
import { SideBar } from '@/components/ui/sidebar'
import { ProtectRoute } from '@/context/user-context'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import NextTopLoader from 'nextjs-toploader'
import colors from '@/constants/colors'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sideOpen, sideToggleOpen] = useState(false)
  return (
    <ProtectRoute>
      <NextTopLoader color={colors.lust[500]} showSpinner={false} />
      <div className="w-full bg-grey-100 h-screen md:overflow-hidden">
        <div className="absolute z-10 md:py-4 md:pr-2 md:pl-4 h-full">
          <SideBar sideOpen={sideOpen} sideToggleOpen={sideToggleOpen} />
        </div>
        <div className="h-full relative md:grid md:grid-rows-[80px_1fr] md:ml-20.8 lg:ml-60 md:pl-9 ">
          <Header sideToggleOpen={sideToggleOpen} />
          <AnimatePresence mode="wait">
            <main className="md:px-8 py-4 px-2 relative md:pb-16 bg-white overflow-auto">
              {children}
            </main>
          </AnimatePresence>
        </div>
      </div>
    </ProtectRoute>
  )
}

export default DashboardLayout
