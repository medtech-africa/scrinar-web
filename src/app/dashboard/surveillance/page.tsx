'use client'
import React from 'react'

import { SurveillanceMap } from './SurveillanceMap'
import { useUser } from '@/context/user'
import ContentLoader from '@/components/content-loader'
import { useSurveillanceAnalytics } from '@/hooks/queries/useAnalytics'

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
  const loading = useUser((state) => state.loading)
  const { isPending } = useSurveillanceAnalytics()

  if (isPending || loading) {
    return <ContentLoader loading={isPending || loading} />
  }

  if (!isValidUser(user?.roles))
    return (
      <div className="h-[70vh]">
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
