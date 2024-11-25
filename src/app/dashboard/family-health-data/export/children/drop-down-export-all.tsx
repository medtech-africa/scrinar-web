import { cn } from '@/lib/utils'

import useClickAway from '@/hooks/useClickAway'
import { useMemo, useRef } from 'react'
import { ExportAsCsv } from '../export-csv'
import { ExportAsExcelBase as ExportAsExcel } from '../export-excel'
import { IconPicker } from '@/components/ui/icon-picker'
import { useExportStudentQuestionnaire } from '@/hooks/queries/useHealthData'
import { csvHeaders, excelHeaders } from './custom-header'

interface IProps {
  onClose?: () => void
  className?: string
}

const DropDownMenuExportChildren = ({ onClose, className }: IProps) => {
  const menuRef = useRef(null)

  useClickAway(menuRef, () => (onClose ? onClose() : null))

  const { data, isLoading } = useExportStudentQuestionnaire()

  // Formatted Data Structure
  const formattedData = useMemo(
    () =>
      data?.map((studentData: any) => ({
        // Basic Information
        userId: studentData?.student?.id,
        fullName: studentData?.student?.fullName,
        age: studentData?.student?.age,
        gender: studentData?.student?.gender,
        ethnicity: studentData?.ethnicity,
        religion: studentData?.religion,
        classLevel: studentData?.classLevel,
        distanceToSchool: studentData?.distanceToSchool,
        yearsAtSchool: studentData?.yearsAtSchool,
        communityName: studentData?.communityName,
        numberOfChildren: studentData?.numberOfChildren,
        siblingPosition: studentData?.siblingPosition,
        fatherOccupation: studentData?.fatherOccupation,
        motherOccupation: studentData?.motherOccupation,
        livingSituation: studentData?.livingSituation,
        healthProblems: studentData?.healthProblems,
        healthStatus: studentData?.healthStatus,

        // Diet and Nutrition
        balancedDietImportance: studentData?.balancedDietImportance,
        eatingHealthyFoods: studentData?.eatingHealthyFoods,
        snackPreference: studentData?.snackPreference,
        fruitsVegetables: studentData?.fruitsVegetables,
        snacksConsumption: studentData?.snacksConsumption,
        sugaryBeverages: studentData?.sugaryBeverages,
        dietConsequence: studentData?.dietConsequence,
        carbExamples: studentData?.carbExamples?.join(', '),
        proteinExamples: studentData?.proteinExamples?.join(', '),
        fatExamples: studentData?.fatExamples?.join(', '),
        vitaminExamples: studentData?.vitaminExamples?.join(', '),
        sweetsEffect: studentData?.sweetsEffect,
        saltyFoodEffect: studentData?.saltyFoodEffect,

        // Physical Activity
        physicalActivity: studentData?.physicalActivity,
        physicalActivityDuration: studentData?.physicalActivityDuration,
        physicalActivityTypes: studentData?.physicalActivityTypes?.join(', '),
        regularPhysicalActivity: studentData?.regularPhysicalActivity,
        barriersToPhysicalActivity:
          studentData?.barriersToPhysicalActivity?.join(', '),
        importanceOfPhysicalActivity: studentData?.importanceOfPhysicalActivity,
        activityBenefits: studentData?.activityBenefits,
        exerciseActivities: studentData?.exerciseActivities?.join(', '),
        houseChoresFrequency: studentData?.houseChoresFrequency,
        houseChoresTypes: studentData?.houseChoresTypes?.join(', '),
        outsidePhysicalActivitiesFrequency:
          studentData?.outsidePhysicalActivitiesFrequency,
        averageHoursOnMobileGamesComputerInternetDaily:
          studentData?.averageHoursOnMobileGamesComputerInternetDaily,
        averageHoursOnTelevisionDaily:
          studentData?.averageHoursOnTelevisionDaily,
        timeYouSleep: studentData?.timeYouSleep,
        timeYouWake: studentData?.timeYouWake,

        // Gender and Activities
        shouldBoysGirlsDoSameSports: studentData?.shouldBoysGirlsDoSameSports,
        suitableActivitiesForBoys: studentData?.suitableActivitiesForBoys,
        suitableActivitiesForGirls: studentData?.suitableActivitiesForGirls,
        sameTypesOfSportsAndActivities:
          studentData?.sameTypesOfSportsAndActivities,
        timeForPhysicalActivities: studentData?.timeForPhysicalActivities,
        moreOpportunitiesOutsideHouseChores:
          studentData?.moreOpportunitiesOutsideHouseChores,

        // Health Knowledge
        doYouKnowNCD: studentData?.doYouKnowNCD?.join(', '),
        ageGroupAtRiskOfNcd: studentData?.ageGroupAtRiskOfNcd,
        doYouKnowHighBloodPressure: studentData?.doYouKnowHighBloodPressure,
        doYouKnowDiabetes: studentData?.doYouKnowDiabetes,
        doYouKnowObesity: studentData?.doYouKnowObesity,
        howPreventGettingNcd: studentData?.howPreventGettingNcd,
        anyFamilyMemberWithNcd: studentData?.anyFamilyMemberWithNcd,

        // Mental Health and Stress
        mentalHealthImportance: studentData?.mentalHealthImportance,
        stressCauses: studentData?.stressCauses?.join(', '),
        feelingsOfstress: studentData?.feelingsOfstress,
        stressSigns: studentData?.stressSigns,
        makesFeelBetter: studentData?.makesFeelBetter?.join(', '),
        stressors: studentData?.stressors?.join(', '),

        // Risk Behaviors
        everSmoked: studentData?.everSmoked,
        currentSmoking: studentData?.currentSmoking,
        everTakenAlcohol: studentData?.everTakenAlcohol,
        currentAlcohol: studentData?.currentAlcohol,
        smokingRisks: studentData?.smokingRisks?.join(', '),
        alcoholRisks: studentData?.alcoholRisks?.join(', '),
        thoughtsOnSubstances: studentData?.thoughtsOnSubstances,

        // HPV and Health Services
        hpvVaccine: studentData?.hpvVaccine,
        ideaOfHpvVaccine: studentData?.ideaOfHpvVaccine,
        ideaOfHpvVaccineSource: studentData?.ideaOfHpvVaccineSource,
        hadHpvVaccine: studentData?.hadHpvVaccine,
        willingToReceiveHpvVaccine: studentData?.willingToReceiveHpvVaccine,
        healthCheckupsImportance: studentData?.healthCheckupsImportance,
        benefitsOfRegularHealthCheckups:
          studentData?.benefitsOfRegularHealthCheckups,
        doctorVisitFrequency: studentData?.doctorVisitFrequency,
        someoneToTalkToAboutHealth: studentData?.someoneToTalkToAboutHealth,

        // Water and Hygiene
        sourcesOfWaterAtHome: studentData?.sourcesOfWaterAtHome?.join(', '),
        waterTreatmentMethodAtHome:
          studentData?.waterTreatmentMethodAtHome?.join(', '),
        toiletFacility: studentData?.toiletFacility,
        facilityUsedToWashHand: studentData?.facilityUsedToWashHand,
        didYouCleanHandAfterLastToiletUsage:
          studentData?.didYouCleanHandAfterLastToiletUsage,
        whatWasUsedToWashHand: studentData?.whatWasUsedToWashHand,
      })),
    [data]
  )
  return (
    <div
      ref={menuRef}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-option"
      tabIndex={1}
      className={cn(
        'flex flex-col p-2 bg-white justify-center space-y-2 items-start shadow-xl absolute right-4 whitespace-nowrap z-[49] origin-top-right',
        className
      )}
    >
      {isLoading ? (
        <>
          <IconPicker icon="loader2" size="1rem" className="mr-2" />
          Please wait
        </>
      ) : (
        <>
          <ExportAsCsv
            fileName="children-questionnaires"
            data={formattedData ?? []}
            csvHeaders={csvHeaders}
          />
          <ExportAsExcel
            fileName="children-questionnaires"
            data={formattedData ?? []}
            excelHeaders={excelHeaders}
          />
        </>
      )}
    </div>
  )
}

export default DropDownMenuExportChildren
