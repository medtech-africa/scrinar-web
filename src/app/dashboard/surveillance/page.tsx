'use client'
import React from 'react'

// import { SurveillanceMap } from './SurveillanceMap'
import { useUser } from '@/context/user'
import ContentLoader from '@/components/content-loader'
import { useSurveillanceAnalytics } from '@/hooks/queries/useAnalytics'
import dynamic from 'next/dynamic'
import { Text } from '@/components/ui/text'
import DiseaseTrend from './DiseaseTrend'
import DiseasePrevalence from './DiseasePrevalence'
import RiskGroup from './RiskGroup'
import YearsAssessment from './YearsAssessment'
import DemographicBreakdown from './DemographicBreakdown'
import ComparativeAnalysis from './ComparativeAnalysis'
import ImpactMeasure from './ImpactMeasure'
import MortalityTrend from './MortalityTrend'
import TreatmentAdherence from './TreatmentAdherance'
import FacilityPerformance from './FacilityPerformance'
import HealthCost from './HealthCost'
import BehaviouralRisk from './BehaviouralRisk'

const SurveillanceMap = dynamic(
  () => import('./SurveillanceMap').then((mod) => mod.SurveillanceMap),
  {
    ssr: false,
    loading: () => <ContentLoader loading />,
  }
)

// const isValidUser = (roles: string[] = []) => {
//   const validUsers = [
//     'school',
//     'super_admin',
//     'jica_researchers',
//     'organization',
//   ]

//   return roles.every((val) => validUsers.includes(val))
// }

export default function SurveillancePage() {
  // const user = useUser((state) => state.user)
  const loading = useUser((state) => state.loading)
  const { isPending } = useSurveillanceAnalytics()

  if (isPending || loading) {
    return <ContentLoader loading />
  }

  // if (!isValidUser(user?.roles))
  //   return (
  //     <div className="h-[70vh]">
  //       <div className="flex items-center justify-center h-full">
  //         <p className="text-2xl font-semibold">Unauthorized Access</p>
  //       </div>
  //     </div>
  //   )

  return (
    <div className="w-full">
      <Text variant="display/xs" className="">
        Surveillance Analysis
      </Text>
      <Text variant="text/sm" className="text-grey-20">
         An analytical overview of all projects
      </Text>
      <div className="grid grid-cols-2 mt-9 lg:gap-6 gap-4">
        <div className="flex flex-col lg:gap-6 gap-4">
          <DiseaseTrend />
          <SurveillanceMap />
          <RiskGroup />
          <ComparativeAnalysis />
          <ImpactMeasure />
          <MortalityTrend />
          <FacilityPerformance />
          <BehaviouralRisk />
          {/* <SocialDeterminant /> */}
        </div>
        <div className="flex flex-col lg:gap-6 gap-4">
          <DiseasePrevalence />
          <DiseaseTrend />
          <YearsAssessment />
          <DemographicBreakdown />
          <TreatmentAdherence />
          <HealthCost />
        </div>
      </div>
    </div>
  )
}
