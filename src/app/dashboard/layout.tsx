'use client'

import { Header } from '@/components/ui/Header'
import { SideBar } from '@/components/ui/sidebar'
import { AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sideOpen, sideToggleOpen] = useState(false)

  return (
    <div className="w-full bg-grey-100 h-screen">
      <div className="absolute z-10 md:py-4 md:pr-2 md:pl-4 h-full">
        <SideBar sideOpen={sideOpen} sideToggleOpen={sideToggleOpen} />
      </div>
      <div className="h-full relative md:grid md:grid-rows-[80px_1fr] md:ml-60 md:pl-9">
        <Header sideToggleOpen={sideToggleOpen} />
        <AnimatePresence mode="wait">
          <main className="md:px-8 py-4 px-2 relative md:pb-16 bg-white">
            {children}
          </main>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DashboardLayout
