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

        //Gender Household
        genderHouseholdRole: {
          farming_responsibility:
            parentData?.genderHouseholdRole?.farming_responsibility,
          income_responsibility:
            parentData?.genderHouseholdRole?.income_responsibility,
          cooking_responsibility:
            parentData?.genderHouseholdRole?.cooking_responsibility,
          cleaning_responsibility:
            parentData?.genderHouseholdRole?.cleaning_responsibility,
          childcare_responsibility:
            parentData?.genderHouseholdRole?.childcare_responsibility,
          water_collection_responsibility:
            parentData?.genderHouseholdRole?.water_collection_responsibility,
          fuel_collection_responsibility:
            parentData?.genderHouseholdRole?.fuel_collection_responsibility,
          purchasing_responsibility:
            parentData?.genderHouseholdRole?.purchasing_responsibility,
          selling_responsibility:
            parentData?.genderHouseholdRole?.selling_responsibility ||
            parentData?.genderHouseholdRole?.others?.selling_responsibility,
          budgeting_responsibility:
            parentData?.genderHouseholdRole?.budgeting_responsibility,
          education_decision_responsibility:
            parentData?.genderHouseholdRole?.education_decision_responsibility,
          healthcare_responsibility:
            parentData?.genderHouseholdRole?.healthcare_responsibility,
        },

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
          noChildBreakfast: parentData?.nutrition?.noChildBreakfast,
          doYouKnowDiabetes: parentData?.nutrition?.doYouKnowDiabetes,
          doYouKnowObesity: parentData?.nutrition?.doYouKnowObesity,
          howPreventGettingNcd: parentData?.nutrition?.howPreventGettingNcd,
          anyFamilyMemberWithNcd: parentData?.nutrition?.anyFamilyMemberWithNcd,
          awareImportanceOfFoodVariety:
            parentData?.nutrition?.awareImportanceOfFoodVariety,
          awareFoodHasDiffBenefits:
            parentData?.nutrition?.awareFoodHasDiffBenefits,
          effectsOfTooMuchSweets: parentData?.nutrition?.effectsOfTooMuchSweets,
          foodBenefits: parentData?.nutrition?.foodBenefits?.join(', '),
          effectsOfTooMuchSaltAndOil:
            parentData?.nutrition?.effectsOfTooMuchSaltAndOil,
          effectsOfTooMuchSaltAndOilOther:
            parentData?.nutrition?.effectsOfTooMuchSaltAndOilOther,
          numberDailyMeals: parentData?.nutrition?.numberDailyMeals,
          necessityForHealthChildDiet:
            parentData?.nutrition?.necessityForHealthChildDiet,
          reasonChangeImpactHealth:
            parentData?.nutrition?.reasonChangeImpactHealth,
          whyNotNecessityForHealthChildDiet:
            parentData?.nutrition?.whyNotNecessityForHealthChildDiet,
          changeInDietToBeHealthy:
            parentData?.nutrition?.changeInDietToBeHealthy,
          providesMoneyForMeals: parentData?.nutrition?.providesMoneyForMeals,
          decidesMoneyOnFruits: parentData?.nutrition?.decidesMoneyOnFruits,
          decidesMealsForFamily: parentData?.nutrition?.decidesMealsForFamily,
          childBreakfast: parentData?.nutrition?.childBreakfast,
          saltQuantityDetermination:
            parentData?.nutrition?.saltQuantityDetermination,
          thingsUsedWhenCooking: parentData?.nutrition?.thingsUsedWhenCooking,
          friedFood: parentData?.nutrition?.friedFood,
          childLunch: parentData?.nutrition?.childLunch,
          sourceOfFuel: parentData?.nutrition?.sourceOfFuel,
          considerationBeforeMeals:
            parentData?.nutrition?.considerationBeforeMeals,
          considerationBeforeMealsOther:
            parentData?.nutrition?.considerationBeforeMealsOther,
          foodKnowledge: {
            cereals: parentData?.nutrition?.foodKnowledge?.cereals,
            roots: parentData?.nutrition?.foodKnowledge?.roots,
            beans_nuts: parentData?.nutrition?.foodKnowledge?.beans_nuts,
            meat_fish: parentData?.nutrition?.foodKnowledge?.meat_fish,
            vegetables: parentData?.nutrition?.foodKnowledge?.vegetables,
            fruits: parentData?.nutrition?.foodKnowledge?.fruits,
          },
          foodGroupFrequency: {
            protein_sources_frequency:
              parentData?.nutrition?.foodGroupFrequency
                ?.protein_sources_frequency,
            varied_diet_frequency:
              parentData?.nutrition?.foodGroupFrequency?.varied_diet_frequency,
            green_leafy_vegetables_frequency:
              parentData?.nutrition?.foodGroupFrequency
                ?.green_leafy_vegetables_frequency,
            unhealthy_snacks_frequency:
              parentData?.nutrition?.foodGroupFrequency
                ?.unhealthy_snacks_frequency,
            sugary_drinks_frequency:
              parentData?.nutrition?.foodGroupFrequency
                ?.sugary_drinks_frequency,
            vegetable_portion_size:
              parentData?.nutrition?.foodGroupFrequency?.vegetable_portion_size,
          },
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
          noOfDailyMeals: parentData?.riskyBehavior?.noOfDailyMeals,
          mentalHealthImportance:
            parentData?.riskyBehavior?.mentalHealthImportance,
          stressCauses: parentData?.riskyBehavior?.stressCauses,
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
          whatWasUsedToWashHand:
            parentData?.healthHygiene?.whatWasUsedToWashHand ||
            parentData?.healthHygiene?.whatWasUsedToWashHandOther,
        },
        //health maintenance
        healthMaintenance: {
          importanceOfRegularScreening:
            parentData?.healthMaintenance?.importanceOfRegularScreening,
          ncdFatherPreventiveContribution:
            parentData?.healthMaintenance?.ncdFatherPreventiveContribution,
          healthFacility:
            parentData?.healthMaintenance?.healthFacility?.frequencyOfVisits,
          importanceOfKnowingProblems:
            parentData?.healthMaintenance?.importanceOfKnowingProblems,
          childHealth: {
            frequencyOfVisits:
              parentData?.healthMaintenance?.childHealth?.frequencyOfVisits,
            interestInStatus:
              parentData?.healthMaintenance?.childHealth?.interestInStatus,
            importanceOfKnowingProblems:
              parentData?.healthMaintenance?.childHealth
                ?.importanceOfKnowingProblems,
            frequencyOfUpdates:
              parentData?.healthMaintenance?.childHealth?.frequencyOfUpdates,
            supportBelief:
              parentData?.healthMaintenance?.childHealth?.supportBelief,
          },
          healthPrograms: {
            participationLikelihood:
              parentData?.healthMaintenance?.healthPrograms
                ?.participationLikelihood,
          },
          childHealthUsefulInformation:
            parentData?.healthMaintenance?.childHealthUsefulInformation,
          phcHealthUsage: parentData?.healthMaintenance?.phcHealthUsage,
          ncdInfoSources: parentData?.healthMaintenance?.ncdInfoSources,
          ncdInfoSourcesOther:
            parentData?.healthMaintenance?.ncdInfoSourcesOther,
        },

        //Ideal body
        idealBody: {
          womenShape: parentData?.idealBody?.womenShape,
          womenWeight: parentData?.idealBody?.womenWeight,
          adolescentWomenShape: parentData?.idealBody?.adolescentWomenShape,
          adolescentWomenWeight: parentData?.idealBody?.adolescentWomenWeight,
          menShape: parentData?.idealBody?.menShape,
          menWeight: parentData?.idealBody?.menWeight,
          adolescentMenShape: parentData?.idealBody?.adolescentMenShape,
          adolescentMenWeight: parentData?.idealBody?.adolescentMenWeight,
          isYourHeightHealthy: parentData?.idealBody?.isYourHeightHealthy,
        },

        // NCD
        ncd: {
          doYouKnowNCD: parentData?.ncd?.doYouKnowNCD?.join(', '),
          ageGroupAtRiskOfNcd: parentData?.ncd?.ageGroupAtRiskOfNcd,
          doYouKnowHighBloodPressure:
            parentData?.ncd?.doYouKnowHighBloodPressure,
          doYouKnowDiabetes:
            parentData?.ncd?.doYouKnowDiabetes ||
            parentData?.ncd?.doYouKnowDiabetesOther,
          doYouKnowObesity: parentData?.ncd?.doYouKnowObesity,
          howPreventGettingNcd:
            parentData?.ncd?.howPreventGettingNcd ||
            parentData?.ncd?.howPreventGettingNcdOther,
          anyFamilyMemberWithNcd:
            parentData?.ncd?.anyFamilyMemberWithNcd ||
            parentData?.ncd?.anyFamilyMemberWithNcdOther,
          howHighBpIsManaged:
            parentData?.ncd?.howHighBpIsManaged ||
            parentData?.ncd?.howHighBpIsManagedOther,
        },
        ncdRiskFactor: {
          work: {
            vigorousActivityTimeDuration:
              parentData?.ncdRiskFactor?.work?.vigorousActivityTimeDuration,
            vigorousActivity: parentData?.ncdRiskFactor?.work?.vigorousActivity,
            vigorousActivityDays:
              parentData?.ncdRiskFactor?.work?.vigorousActivityDays,
          },
          home: {
            houseChores:
              parentData?.ncdRiskFactor?.home?.houseChores?.join(', '),
            houseChoresDuration:
              parentData?.ncdRiskFactor?.home?.houseChoresDuration,
            physicalChoresFrequency:
              parentData?.ncdRiskFactor?.home?.physicalChoresFrequency,
          },
          travel: {
            walkOrBicycleTime:
              parentData?.ncdRiskFactor?.travel?.walkOrBicycleTime?.hours +
              ':' +
              parentData?.ncdRiskFactor?.travel?.walkOrBicycleTime?.minutes,
            walkOrBicycle: parentData?.ncdRiskFactor?.travel?.walkOrBicycle,
            walkOrBicycleDays:
              parentData?.ncdRiskFactor?.travel?.walkOrBicycleDays,
          },
          activities: {
            vigorousSports:
              parentData?.ncdRiskFactor?.activities?.vigorousSports,
            vigorousSportsDays:
              parentData?.ncdRiskFactor?.activities?.vigorousSportsDays,
            vigorousSportsTime:
              parentData?.ncdRiskFactor?.activities?.vigorousSportsTime?.hours +
              ':' +
              parentData?.ncdRiskFactor?.activities?.vigorousSportsTime
                ?.minutes,
          },
          sittingTime:
            parentData?.ncdRiskFactor?.sittingTime?.hours +
            ':' +
            parentData?.ncdRiskFactor?.sittingTime?.minutes,
          timeYouSleep: parentData?.ncdRiskFactor?.timeYouSleep,
          timeYouWake: parentData?.ncdRiskFactor?.timeYouWake,
          currentlySmokingTobacco:
            parentData?.ncdRiskFactor?.currentlySmokingTobacco,
          alcohol: {
            everConsumed: parentData?.ncdRiskFactor?.alcohol?.everConsumed,
            consumedPast12Months:
              parentData?.ncdRiskFactor?.alcohol?.consumedPast12Months,
            past30DaysFrequency:
              parentData?.ncdRiskFactor?.alcohol?.past30DaysFrequency,
            past7DaysHomebrewed:
              parentData?.ncdRiskFactor?.alcohol?.past7DaysHomebrewed,
            drinks: {
              homebrewedSpirits:
                parentData?.ncdRiskFactor?.alcohol?.drinks?.homebrewedSpirits,
              homebrewedBeerWine:
                parentData?.ncdRiskFactor?.alcohol?.drinks?.homebrewedBeerWine,
              nonDrinkableAlcohol:
                parentData?.ncdRiskFactor?.alcohol?.drinks?.nonDrinkableAlcohol,
              unknown: parentData?.ncdRiskFactor?.alcohol?.drinks?.unknown,
            },
          },
          smoking: {
            ageStarted: parentData?.ncdRiskFactor?.smoking?.ageStarted,
            currentlySmoking:
              parentData?.ncdRiskFactor?.smoking?.currentlySmoking,
            triedToStop: parentData?.ncdRiskFactor?.smoking?.triedToStop,
            pastTobaccoUse: parentData?.ncdRiskFactor?.smoking?.pastTobaccoUse,
            pastDailySmoking:
              parentData?.ncdRiskFactor?.smoking?.pastDailySmoking,
            insideHome: parentData?.ncdRiskFactor?.smoking?.insideHome,
            workplace: parentData?.ncdRiskFactor?.smoking?.workplace,
            smokelessTobacco:
              parentData?.ncdRiskFactor?.smoking?.smokelessTobacco,
            dailySmokelessTobacco:
              parentData?.ncdRiskFactor?.smoking?.dailySmokelessTobacco,
          },
        },
        physicalActivity: {
          amountOfPhysicalActivityDaily:
            parentData?.physicalActivity?.amountOfPhysicalActivityDaily,
          importanceOfChildPhysicalExerciseOnHealth:
            parentData?.physicalActivity
              ?.importanceOfChildPhysicalExerciseOnHealth,
          childGetsEnoughExercise:
            parentData?.physicalActivity?.childGetsEnoughExercise,
          importancePhysicalExerciseOnYourHealth:
            parentData?.physicalActivity
              ?.importancePhysicalExerciseOnYourHealth,
          longTermEffectOfPerformingPhysicalActivityRegularly:
            parentData?.physicalActivity
              ?.longTermEffectOfPerformingPhysicalActivityRegularly,
          goodFormsOfExercise:
            parentData?.physicalActivity?.goodFormsOfExercise?.join(', '),
          typesOfHouseChoresRegularly:
            parentData?.physicalActivity?.typesOfHouseChoresRegularly?.join(
              ', '
            ),
          shouldBoysGirlsDoSameSports:
            parentData?.physicalActivity?.shouldBoysGirlsDoSameSports,
          challengesFromBeingPhysicallyActive:
            parentData?.physicalActivity?.challengesFromBeingPhysicallyActive?.join(
              ', '
            ),
          importanceOfBeingPhysicallyActive:
            parentData?.physicalActivity?.importanceOfBeingPhysicallyActive?.join(
              ', '
            ),
          suitableActivitiesForBoys:
            parentData?.physicalActivity?.suitableActivitiesForBoys,
          suitableActivitiesForGirls:
            parentData?.physicalActivity?.suitableActivitiesForGirls,
          amountOfPhysicalActivityNeededIsDifferentForBoth:
            parentData?.physicalActivity
              ?.amountOfPhysicalActivityNeededIsDifferentForBoth,
          beliefsThatDiscourageGirlFromPhysical:
            parentData?.physicalActivity?.beliefsThatDiscourageGirlFromPhysical,
          amountOfTimeGirlsHaveForPhysicalThanBoys:
            parentData?.physicalActivity
              ?.amountOfTimeGirlsHaveForPhysicalThanBoys,
          amountOfOpportunitiesGirlsHaveForPhysicalThanBoys:
            parentData?.physicalActivity
              ?.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys,
          whyAmountOfTimeGirlsHaveForPhysicalThanBoys:
            parentData?.physicalActivity
              ?.whyAmountOfTimeGirlsHaveForPhysicalThanBoys,
          whyAmountOfOpportunitiesGirlsHaveForPhysicalThanBoys:
            parentData?.physicalActivity
              ?.whyAmountOfOpportunitiesGirlsHaveForPhysicalThanBoys,
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
