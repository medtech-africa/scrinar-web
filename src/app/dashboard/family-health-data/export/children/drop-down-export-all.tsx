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
      data?.map((studentData: ChildrenData) => {
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
              snack_source:
                studentData?.nutrition?.foodGroupFrequency?.snack_source?.join(
                  ', '
                ),
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

export interface ChildrenData {
  student: {
    latestHealthData: {
      bmi: string
      height: string
      weight: string
      pulse: string
      waist: string
      bloodPressure: string
      glucoseLevel: string
    }
    fullName: string
    age: string
    gender: string
    id: string
  }
  //

  amountOfPhysicalActivityHouseChore: string
  physicalActivityTypes: any[]
  houseChoresTypes: any[]
  copingMechanisms: any[]
  stressFactors: any[]
  reasonForHpvVaccineUncertainty: string[]
  sourcesOfWaterAtHome: string[]
  waterTreatmentMethodAtHome: string[]
  stressCauses: string[]
  favoriteActivities: any[]
  physicalChores: any[]
  doctorVisitFrequency: string
  makesFeelBetter: string[]
  stressors: string[]
  everSmoked: string
  currentSmoking: string
  everTakenAlcohol: string
  currentAlcohol: string
  gender: string
  age: string
  ethnicity: string
  religion: string
  classLevel: string
  distanceToSchool: null
  yearsAtSchool: string
  communityName: string
  numberOfChildren: string
  siblingPosition: string
  fatherOccupation: string
  motherOccupation: null
  livingSituation: string
  healthProblems: string
  healthStatus: string
  hpvVaccine: string
  balancedDietImportance: null
  eatingHealthyFoods: null
  snackPreference: null
  idealBodySizeBoys: null
  idealBodySizeGirls: null
  regularPhysicalActivity: null
  barriersToPhysicalActivity: any[]
  importanceOfPhysicalActivity: null
  suitableActivitiesBoys: null
  suitableActivitiesGirls: null
  sameTypesOfSportsAndActivities: null
  timeForPhysicalActivities: null
  moreOpportunitiesOutsideHouseChores: null
  smokingRisks: any[]
  alcoholRisks: any[]
  thoughtsOnSubstances: string
  importanceOfMentalHealth: null
  balancedDiet: null
  dietConsequence: null
  carbExamples: any[]
  proteinExamples: any[]
  fatExamples: any[]
  vitaminExamples: any[]
  sweetsEffect: null
  saltyFoodEffect: null
  doYouKnowNCD: string[]
  ageGroupAtRiskOfNcd: string
  doYouKnowHighBloodPressure: string
  doYouKnowDiabetes: string
  doYouKnowObesity: string
  howPreventGettingNcd: string
  anyFamilyMemberWithNcd: string
  amountOfPhysicalActivityDaily: string
  longTermEffectOfPerformingPhysicalActivityRegularly: string
  goodFormsOfExercise: string[]
  amountOfSportsParticipation: string
  amountOfPhysicalActivityEngagement: string
  typesOfHouseChoresRegularly: string[]
  averageHoursOnMobileGamesComputerInternetDaily: string
  averageHoursOnTelevisionDaily: string
  timeYouSleep: string
  timeYouWake: string
  shouldBoysGirlsDoSameSports: string
  challengesFromBeingPhysicallyActive: string[]
  importanceOfBeingPhysicallyActive: string[]
  suitableActivitiesForBoys: string
  suitableActivitiesForGirls: string
  idealBody: IdealBody
  nutrition: Nutrition
  physicalActivity: null
  activityBenefits: null
  exerciseActivities: any[]
  meals: any[]
  createdAt: Date
  updatedAt: Date
  updatedBy: string
  feelingsOfstress: string
  healthCheckupImportance: string
  mentalHealthImportance: string
  benefitsOfRegularHealthCheckups: string
  someoneToTalkToAboutHealth: string
  ideaOfHpvVaccine: string
  hadHpvVaccine: string
  willingToReceiveHpvVaccineIfNotReceived: string
  willingToReceiveHpvVaccineIfOffered: string
  ideaOfHpvVaccineSource: null
  toiletFacility: string
  facilityUsedToWashHand: string
  didYouCleanHandAfterLastToiletUsage: string
  whatWasUsedToWashHand: string
  id: string
}

export interface IdealBody {
  womenShape: string
  adolescentWomenShape: string
  womenWeight: string
  adolescentWomenWeight: string
  menShape: string
  menWeight: string
  adolescentMenShape: string
  knowYourWeight: string
  yourWeight: string
  isYourWeightHealthy: string
  knowYourHeight: string
  yourHeight: string
  isYourHeightHealthy: string
  adolescentMenWeight: null
  adolescentMenShapeOther: string
}

export interface Nutrition {
  awareImportanceOfFoodVariety: string
  awareFoodHasDiffBenefits: string
  effectsOfTooMuchSweets: string
  effectsOfTooMuchSaltAndOil: string
  changeInDietToBeHealthy: string
  numberDailyMeals: string
  reasonChangeImpactHealth: string
  foodKnowledge: FoodKnowledge
  mealFrequency: MealFrequency
  foodGroupFrequency: FoodGroupFrequency
}

export interface FoodGroupFrequency {
  protein_sources_frequency: string
  varied_diet_frequency: string
  green_leafy_vegetables_frequency: string
  unhealthy_snacks_frequency: string
  sugary_drinks_frequency: string
  vegetable_portion_size: string
  snack_source: string[]
}

export interface FoodKnowledge {
  cereals: string
  roots: string
  beans_nuts: string
  meat_fish: string
  vegetables: string
  fruits: string
}

export interface MealFrequency {
  breakfast_frequency: string
  breakfast_time: string
  lunch_frequency: string
  dinner_frequency: string
  breakfast_skipped_reason: string
}
