import { cn } from '@/lib/utils'

import useClickAway from '@/hooks/useClickAway'
import { useMemo, useRef } from 'react'
import { ExportAsCsv } from '../export-csv'
import { ExportAsExcel } from '../export-excel'
import { IconPicker } from '@/components/ui/icon-picker'
import { useExportParentQuestionnaire } from '@/hooks/queries/useHealthData'
import { csvHeaders, excelHeaders } from './custom-header'

interface IProps {
  onClose?: () => void
  className?: string
}

const DropDownMenuExportParents = ({ onClose, className }: IProps) => {
  const menuRef = useRef(null)

  useClickAway(menuRef, () => (onClose ? onClose() : null))

  const { data, isLoading } = useExportParentQuestionnaire()
  // Formatted Data Structure
  const formattedData = useMemo(
    () =>
      data?.map((parentData: any) => ({
        userId: parentData?.parent?.id,
        firstName: parentData?.parent?.firstName,
        lastName: parentData?.parent?.lastName,
        middleName: parentData?.parent?.middleName,
        age: parentData?.parent?.age,
        gender: parentData?.parent?.gender,
        mobile: parentData?.parent?.mobile ?? '-',
        familyCode: parentData?.familyCode,
        isGuardian: parentData?.isGuardian ?? '-',
        yearsInCommunity: parentData?.yearsInCommunity,
        ethnicity: parentData?.ethnicity,
        otherEthnicity: parentData?.otherEthnicity,
        languagesSpoken: parentData?.languagesSpoken?.join(', '),
        otherLanguage: parentData?.otherLanguage,
        religion: parentData?.religion,
        otherReligion: parentData?.otherReligion,
        education: parentData?.education,
        workStatus: parentData?.workStatus,
        occupation: parentData?.occupation,
        householdMembers: {
          children: parentData?.householdMembers?.children,
          adults: parentData?.householdMembers?.adults,
        },
        householdIncome: parentData?.householdIncome,
        chronicHealth: {
          hasCondition: parentData?.chronicHealth?.hasCondition,
          condition: parentData?.chronicHealth?.condition,
        },
        healthStatus: parentData?.healthStatus,
        noOfChildren: parentData?.noOfChildren,
        isPregnant: parentData?.isPregnant
          ? parentData?.isPregnant
          : parentData?.parent?.gender === 'male'
            ? '-'
            : false,
        howManyWives: parentData?.howManyWives,

        // Nutrition
        nutrition: {
          balancedDiet: parentData?.nutrition?.balancedDiet,
          sugarEffects: parentData?.nutrition?.sugarEffects,
          saltFatRisks: parentData?.nutrition?.saltFatRisks,
          boysFood: parentData?.nutrition?.boysFood?.join(', '),
          girlsFood: parentData?.nutrition?.girlsFood?.join(', '),
          doYouKnowNCD: parentData?.nutrition?.doYouKnowNCD?.join(', '),
          doYouKnowHighBloodPressure:
            parentData?.nutrition?.doYouKnowHighBloodPressure,
          doYouKnowDiabetes: parentData?.nutrition?.doYouKnowDiabetes,
          doYouKnowObesity: parentData?.nutrition?.doYouKnowObesity,
          howPreventGettingNcd: parentData?.nutrition?.howPreventGettingNcd,
          anyFamilyMemberWithNcd: parentData?.nutrition?.anyFamilyMemberWithNcd,
        },

        // Risky Behavior
        riskyBehavior: {
          smokingRisks: parentData?.riskyBehavior?.smokingRisks?.join(', '),
          secondhandSmoking: parentData?.riskyBehavior?.secondhandSmoking,
          checkupImportance: parentData?.riskyBehavior?.checkupImportance,
          stressFactors: parentData?.riskyBehavior?.stressFactors?.join(', '),
          longTermStress: parentData?.riskyBehavior?.longTermStress?.join(', '),
          stressSigns: parentData?.riskyBehavior?.stressSigns?.join(', '),
          otherStressSigns: parentData?.riskyBehavior?.otherStressSigns,
        },

        // Nutrition Practices
        nutritionPractices: {
          fruitsVegetables: parentData?.nutritionPractices?.fruitsVegetables,
          snacks: parentData?.nutritionPractices?.snacks,
          sugaryBeverages: parentData?.nutritionPractices?.sugaryBeverages,
        },

        // Health Hygiene
        healthHygiene: {
          sourcesOfWaterAtHome:
            parentData?.healthHygiene?.sourcesOfWaterAtHome?.join(', '),
          waterTreatmentMethodAtHome:
            parentData?.healthHygiene?.waterTreatmentMethodAtHome?.join(', '),
          didYouCleanHandAfterLastToiletUsage:
            parentData?.healthHygiene?.didYouCleanHandAfterLastToiletUsage,
          facilityUsedToWashHand:
            parentData?.healthHygiene?.facilityUsedToWashHand,
          toiletFacility: parentData?.healthHygiene?.toiletFacility,
        },
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
            fileName="parent-questionnaires"
            data={formattedData ?? []}
            csvHeaders={csvHeaders}
          />
          <ExportAsExcel
            fileName="parent-questionnaires"
            data={formattedData ?? []}
            excelHeaders={excelHeaders}
          />
        </>
      )}
    </div>
  )
}

export default DropDownMenuExportParents
