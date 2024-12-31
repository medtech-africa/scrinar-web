'use client'
import React from 'react'

import { SurveillanceMap } from './SurveillanceMap'
import { useUser } from '@/context/user'

// const SurveillanceMap = dynamic(
//   () => import('./SurveillanceMap').then((mod) => mod.SurveillanceMap),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   }
// )

const isValidUser = (roles: string[] = []) => {
  const validUsers = [
    'school',
    'super_admin',
    'jica_researchers',
    'organization',
  ]

  return roles.every((val) => validUsers.includes(val))
}

export default function SurveillancePage() {
  const user = useUser((state) => state.user)

  console.log(user?.roles)

  if (!isValidUser(user?.roles))
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-semibold">Unauthorized Access</p>
        </div>
      </div>
    )

  return (
    <div className="w-full">
      <SurveillanceMap />
    </div>
  )
}
