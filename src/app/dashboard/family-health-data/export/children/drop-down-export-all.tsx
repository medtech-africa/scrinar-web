import { cn } from '@/lib/utils'

import useClickAway from '@/hooks/useClickAway'
import { useMemo, useRef } from 'react'
import { ExportAsCsv } from '../export-csv'
import { ExportAsExcelStudent } from '../export-excel'
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
  console.log(data)
  // Formatted Data Structure
  const formattedData = useMemo(
    () =>
      data?.map((studentData: any) => {
        const latestHealthData = studentData?.student?.latestHealthData ?? {}

        return {
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

          // health data
          bmi: latestHealthData?.bmi,
          height: latestHealthData?.height,
          weight: latestHealthData?.weight,
          pulse: latestHealthData?.pulse,
          waist: latestHealthData?.waist,
          bloodPressure: latestHealthData?.bloodPressure,
          // cholesterol: data?.cholesterol?.totalCholeterol,awareImportanceOfFoodVariety
          glucoseLevel: latestHealthData?.glucoseLevel,

          nutrition: {
            // Diet and Nutrition
            awareImportanceOfFoodVariety:
              studentData?.nutrition?.awareImportanceOfFoodVariety,
            awareFoodHasDiffBenefits:
              studentData?.nutrition?.awareFoodHasDiffBenefits,
            changeInDietToBeHealthy:
              studentData?.nutrition?.changeInDietToBeHealthy,
            effectsOfTooMuchSaltAndOil:
              studentData?.nutrition?.effectsOfTooMuchSaltAndOil,
            effectsOfTooMuchSweets:
              studentData?.nutrition?.effectsOfTooMuchSweets,
            foodGroupFrequency: {
              protein_sources_frequency:
                studentData?.nutrition?.foodGroupFrequency
                  ?.protein_sources_frequency,
              varied_diet_frequency:
                studentData?.nutrition?.foodGroupFrequency
                  ?.varied_diet_frequency,
              green_leafy_vegetables_frequency:
                studentData?.nutrition?.foodGroupFrequency
                  ?.green_leafy_vegetables_frequency,
              unhealthy_snacks_frequency:
                studentData?.nutrition?.foodGroupFrequency
                  ?.unhealthy_snacks_frequency,
              sugary_drinks_frequency:
                studentData?.nutrition?.foodGroupFrequency
                  ?.sugary_drinks_frequency,
              vegetable_portion_size:
                studentData?.nutrition?.foodGroupFrequency
                  ?.vegetable_portion_size,
            },
            foodKnowledge: {
              cereals: studentData?.nutrition?.foodKnowledge?.cereals,
              roots: studentData?.nutrition?.foodKnowledge?.roots,
              beans_nuts: studentData?.nutrition?.foodKnowledge?.beans_nuts,
              meat_fish: studentData?.nutrition?.foodKnowledge?.meat_fish,
              vegetables: studentData?.nutrition?.foodKnowledge?.vegetables,
              fruits: studentData?.nutrition?.foodKnowledge?.fruits,
            },
            mealFrequency: {
              breakfast_frequency:
                studentData?.nutrition?.mealFrequency?.breakfast_frequency,
              breakfast_time:
                studentData?.nutrition?.mealFrequency?.breakfast_time,
              breakfast_skipped_reason:
                studentData?.nutrition?.mealFrequency?.breakfast_skipped_reason,
              lunch_frequency:
                studentData?.nutrition?.mealFrequency?.lunch_frequency,
              dinner_frequency:
                studentData?.nutrition?.mealFrequency?.dinner_frequency,
            },
            numberDailyMeals: studentData?.nutrition?.numberDailyMeals,
            reasonChangeImpactHealth:
              studentData?.nutrition?.reasonChangeImpactHealth,
          },
          idealBody: {
            womenShape: studentData?.idealBody?.womenShape,
            womenWeight: studentData?.idealBody?.womenWeight,
            adolescentWomenShape: studentData?.idealBody?.adolescentWomenShape,
            adolescentWomenWeight:
              studentData?.idealBody?.adolescentWomenWeight,
            menShape: studentData?.idealBody?.menShape,
            menWeight: studentData?.idealBody?.menWeight,
            adolescentMenShape: studentData?.idealBody?.adolescentMenShape,
            adolescentMenWeight: studentData?.idealBody?.adolescentMenWeight,

            knowYourWeight: studentData?.idealBody?.knowYourWeight,
            yourHeight: studentData?.idealBody?.yourHeight,
            isYourHeightHealthy: studentData?.idealBody?.isYourHeightHealthy,

            knowYourHeight: studentData?.idealBody?.knowYourHeight,
            yourWeight: studentData?.idealBody?.yourWeight,
            isYourWeightHealthy: studentData?.idealBody?.isYourWeightHealthy,
          },

          // Physical Activity

          physicalActivity: {
            amountOfPhysicalActivityDaily:
              studentData?.amountOfPhysicalActivityDaily,
            longTermEffectOfPerformingPhysicalActivityRegularly:
              studentData?.longTermEffectOfPerformingPhysicalActivityRegularly,
            goodFormsOfExercise: studentData?.goodFormsOfExercise?.join(', '),
            amountOfSportsParticipation:
              studentData?.amountOfSportsParticipation,
            amountOfPhysicalActivityEngagement:
              studentData?.amountOfPhysicalActivityEngagement,
            amountOfPhysicalActivityHouseChore:
              studentData?.amountOfPhysicalActivityHouseChore,
            typesOfHouseChoresRegularly:
              studentData?.typesOfHouseChoresRegularly?.join(', '),
            averageHoursOnMobileGamesComputerInternetDaily:
              studentData?.averageHoursOnMobileGamesComputerInternetDaily,
            averageHoursOnTelevisionDaily:
              studentData?.averageHoursOnTelevisionDaily,
            timeYouSleep: studentData?.timeYouSleep,
            timeYouWake: studentData?.timeYouWake,
            shouldBoysGirlsDoSameSports:
              studentData?.shouldBoysGirlsDoSameSports,
            challengesFromBeingPhysicallyActive:
              studentData?.challengesFromBeingPhysicallyActive?.join(', '),
            importanceOfBeingPhysicallyActive:
              studentData?.importanceOfBeingPhysicallyActive?.join(', '),
            suitableActivitiesForBoys: studentData?.suitableActivitiesForBoys,
            suitableActivitiesForGirls: studentData?.suitableActivitiesForGirls,
          },
          // Health Knowledge
          ncd: {
            doYouKnowNCD: studentData?.doYouKnowNCD?.join(', '),
            ageGroupAtRiskOfNcd: studentData?.ageGroupAtRiskOfNcd,
            doYouKnowHighBloodPressure: studentData?.doYouKnowHighBloodPressure,
            doYouKnowDiabetes: studentData?.doYouKnowDiabetes,
            doYouKnowObesity: studentData?.doYouKnowObesity,
            howPreventGettingNcd: studentData?.howPreventGettingNcd,
            anyFamilyMemberWithNcd: studentData?.anyFamilyMemberWithNcd,
          },

          // Mental Health and Stress
          ncdRiskFactor: {
            healthCheckupImportance: studentData?.healthCheckupImportance,
            mentalHealthImportance: studentData?.mentalHealthImportance,
            stressors: studentData?.stressors?.join(', '),
            makesFeelBetter: studentData?.makesFeelBetter?.join(', '),
            thoughtsOnSubstances: studentData?.thoughtsOnSubstances,
            feelingsOfstress: studentData?.feelingsOfstress,
            everSmoked: studentData?.everSmoked,
            currentAlcohol: studentData?.currentAlcohol,
            everTakenAlcohol: studentData?.everTakenAlcohol,
            currentSmoking: studentData?.currentSmoking,
            stressCauses: studentData?.stressCauses?.join(', '),

            // Risk Behaviors
            // smokingRisks: studentData?.smokingRisks?.join(', '),
            // alcoholRisks: studentData?.alcoholRisks?.join(', '),
          },

          healthServices: {
            doctorVisitFrequency: studentData?.doctorVisitFrequency,
            benefitsOfRegularHealthCheckups:
              studentData?.benefitsOfRegularHealthCheckups,
            someoneToTalkToAboutHealth: studentData?.someoneToTalkToAboutHealth,
            // HPV and Health Services
            ideaOfHpvVaccine: studentData?.ideaOfHpvVaccine,
            ideaOfHpvVaccineSource: studentData?.ideaOfHpvVaccineSource,
            hadHpvVaccine: studentData?.hadHpvVaccine,
            willingToReceiveHpvVaccineIfNotReceived:
              studentData?.willingToReceiveHpvVaccineIfNotReceived,
            willingToReceiveHpvVaccineIfOffered:
              studentData?.willingToReceiveHpvVaccineIfOffered,
            reasonForHpvVaccineUncertainty:
              studentData?.reasonForHpvVaccineUncertainty.join(', '),
          },

          healthHygiene: {
            // Water and Hygiene
            sourcesOfWaterAtHome: studentData?.sourcesOfWaterAtHome?.join(', '),
            waterTreatmentMethodAtHome:
              studentData?.waterTreatmentMethodAtHome?.join(', '),
            toiletFacility: studentData?.toiletFacility,
            facilityUsedToWashHand: studentData?.facilityUsedToWashHand,
            didYouCleanHandAfterLastToiletUsage:
              studentData?.didYouCleanHandAfterLastToiletUsage,
            whatWasUsedToWashHand: studentData?.whatWasUsedToWashHand,
          },
        }
      }),
    [data]
  )
  return (
    <button
      ref={menuRef}
      title="export dropdown"
      type="button"
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
        <div
          role="menuitem"
          title="menu"
          className="flex flex-col justify-center space-y-2 items-start"
        >
          <ExportAsCsv
            fileName="children-questionnaires"
            data={formattedData ?? []}
            csvHeaders={csvHeaders}
          />
          <ExportAsExcelStudent
            fileName="children-questionnaires"
            data={formattedData ?? []}
            excelHeaders={excelHeaders}
          />
        </div>
      )}
    </button>
  )
}

export default DropDownMenuExportChildren
