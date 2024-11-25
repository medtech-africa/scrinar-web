import { ParentFormData } from '@/types/questionnaire.types'

/**
 * Checks if a value should be included in the cleaned data
 */
const isValidValue = (value: any): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string' && value.trim() === '') return false
  if (Array.isArray(value) && value.length === 0) return false
  return true
}

/**
 * Transforms a select option object to its value
 */
const transformSelectOption = (value: any): any => {
  if (
    value &&
    typeof value === 'object' &&
    'label' in value &&
    'value' in value
  ) {
    if (typeof value.value === 'string' && /^\d+$/.test(value.value)) {
      return Number(value.value)
    }
    return value.value
  }

  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return Number(value)
  }
  return value
}

/**
 * Processes array values
 */
const processArray = (arr: any[]): any[] => {
  return arr
    .map((item) => {
      if (Array.isArray(item)) {
        return processArray(item)
      }
      if (item && typeof item === 'object') {
        return cleanFormData(item)
      }
      return transformSelectOption(item)
    })
    .filter(isValidValue)
}

/**
 * Cleans form data by removing empty values and transforming select options
 */
export const cleanFormData = (
  data: Record<string, any>
): Record<string, any> => {
  const cleaned: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    // Handle arrays
    if (Array.isArray(value)) {
      const processedArray = processArray(value)
      if (processedArray.length > 0) {
        cleaned[key] = processedArray
      }
      continue
    }

    // Handle nested objects
    if (value && typeof value === 'object' && !value?.label) {
      const processedObject = cleanFormData(value)
      if (Object.keys(processedObject).length > 0) {
        cleaned[key] = processedObject
      }
      continue
    }

    // Handle primitive values and select options
    const transformedValue = transformSelectOption(value)
    if (isValidValue(transformedValue)) {
      cleaned[key] = transformedValue
    }
  }

  return cleaned
}

export const formatQuestionnaireData = (data: any): Partial<ParentFormData> => {
  if (!data) return {}

  const formatted: Partial<ParentFormData> = {}

  // Only add properties that exist in the input data
  if (data.yearsInCommunity) {
    formatted.yearsInCommunity = {
      label: getLabelForYearsInCommunity(data.yearsInCommunity),
      value: data.yearsInCommunity,
    }
  }

  if (data.ethnicity) {
    formatted.ethnicity = {
      label: data.ethnicity,
      value: data.ethnicity,
    }
  }

  if (data.religion) {
    formatted.religion = {
      label: getReligionLabel(data.religion),
      value: data.religion,
    }
  }

  // Pass through simple fields if they exist
  if (data.languagesSpoken) formatted.languagesSpoken = data.languagesSpoken
  if (data.otherLanguage) formatted.otherLanguage = data.otherLanguage
  if (data.otherReligion) formatted.otherReligion = data.otherReligion
  if (data.education) formatted.education = data.education
  if (data.workStatus) formatted.workStatus = data.workStatus
  if (data.occupation) formatted.occupation = data.occupation
  if (data.householdIncome) formatted.householdIncome = data.householdIncome
  if (data.healthStatus) formatted.healthStatus = data.healthStatus
  if (data.noOfChildren) formatted.noOfChildren = data.noOfChildren
  if (data.isPregnant !== undefined) formatted.isPregnant = data.isPregnant

  // Handle nested objects with null checks
  if (data.householdMembers) {
    formatted.householdMembers = {
      children: data.householdMembers.children ?? 0,
      adults: data.householdMembers.adults ?? 0,
    }
  }

  if (data.chronicHealth?.hasCondition !== undefined) {
    formatted.chronicHealth = {
      hasCondition: {
        label: data.chronicHealth.hasCondition ? 'Yes' : 'No',
        value: data.chronicHealth.hasCondition,
      },
      ...(data.chronicHealth.condition && {
        condition: data.chronicHealth.condition,
      }),
    }
  }

  // Handle children array with null checks
  if (data.children?.length) {
    formatted.children = data.children
      ?.filter(
        (child: any) => child.age !== undefined && child.gender !== undefined
      )
      .map((child: any) => ({
        age: child.age!,
        gender: {
          label: child.gender === 'male' ? 'Male' : 'Female',
          value: child.gender!,
        },
        inSchool: child.inSchool ?? false,
      }))
  }

  // Handle nutrition section
  if (data.nutrition) {
    formatted.nutrition = {
      balancedDiet: createLabelValue(data.nutrition.balancedDiet),
      sugarEffects: createLabelValue(data.nutrition.sugarEffects),
      saltFatRisks: createLabelValue(data.nutrition.saltFatRisks),
      boysFood: data.nutrition.boysFood ?? [],
      girlsFood: data.nutrition.girlsFood ?? [],
    }
  }

  // Handle physical activity section
  if (data.generalPhysicalActivity) {
    formatted.generalPhysicalActivity = {
      importance: createLabelValue(data.generalPhysicalActivity.importance),
      childDailyActivity: createLabelValue(
        data.generalPhysicalActivity.childDailyActivity
      ),
      adultDailyActivity: createLabelValue(
        data.generalPhysicalActivity.adultDailyActivity
      ),
      suitableActivities: data.generalPhysicalActivity.suitableActivities ?? [],
    }
  }

  // Handle risky behavior section
  if (data.riskyBehavior) {
    formatted.riskyBehavior = {
      // TODO remove. old data
      smokingRisks: data.riskyBehavior.smokingRisks ?? [],
      secondhandSmoking: createLabelValue(data.riskyBehavior.secondhandSmoking),
      checkupImportance: createLabelValue(data.riskyBehavior.checkupImportance),
      stressFactors: data.riskyBehavior.stressFactors ?? [],
      longTermStress: data.riskyBehavior.longTermStress ?? [],
      stressSigns: data.riskyBehavior.stressSigns ?? [],
      otherStressSigns: data.riskyBehavior.otherStressSigns ?? '',
// end of TODO remove. old data

      mentalHealthImportance: data.riskyBehavior.mentalHealthImportance ?? '',
      stressCauses: data.riskyBehavior.stressCauses ?? '',
      thingsDoneToChildToEaseWorryUpset: data.riskyBehavior.thingsDoneToChildToEaseWorryUpset ?? [],
      feelingsOfstress: data.riskyBehavior.feelingsOfstress ?? '',
      whenAdolescentsExposedToSmoking: data.riskyBehavior.whenAdolescentsExposedToSmoking ?? '',
    }
  }

  // Handle attitudes sections with null checks
  if (data.nutritionAttitudes) {
    formatted.nutritionAttitudes = {
      balancedDietImportance: createLabelValue(
        data.nutritionAttitudes.balancedDietImportance
      ),
      healthyFoodDifficulty: createLabelValue(
        data.nutritionAttitudes.healthyFoodDifficulty
      ),
      idealBoysSize: createLabelValue(data.nutritionAttitudes.idealBoysSize),
      idealGirlsSize: createLabelValue(data.nutritionAttitudes.idealGirlsSize),
    }
  }

  if (data.physicalActivityAttitudes) {
    formatted.physicalActivityAttitudes = {
      genderImportance: createLabelValue(
        data.physicalActivityAttitudes.genderImportance
      ),
      boysMoreActive: data.physicalActivityAttitudes.boysMoreActive ?? false,
      girlsBarriers: data.physicalActivityAttitudes.girlsBarriers ?? [],
      boysSuitableActivities:
        data.physicalActivityAttitudes.boysSuitableActivities ?? '',
      girlsSuitableActivities:
        data.physicalActivityAttitudes.girlsSuitableActivities ?? '',
      mixedActivities: data.physicalActivityAttitudes.mixedActivities ?? false,
      timeComparison: createLabelValue(
        data.physicalActivityAttitudes.timeComparison
      ),
    }
  }

  // Handle practices sections with null checks
  if (data.nutritionPractices) {
    formatted.nutritionPractices = {
      fruitsVegetables: createLabelValue(
        data.nutritionPractices.fruitsVegetables
      ),
      snacks: createLabelValue(data.nutritionPractices.snacks),
      sugaryBeverages: createLabelValue(
        data.nutritionPractices.sugaryBeverages
      ),
    }
  }

  if (data.physicalActivityPractices) {
    formatted.physicalActivityPractices = {
      frequency: createLabelValue(data.physicalActivityPractices.frequency),
      duration: createLabelValue(data.physicalActivityPractices.duration),
      activities: data.physicalActivityPractices.activities ?? [],
      choreFrequency: data.physicalActivityPractices.choreFrequency ?? '',
      choreTypes: data.physicalActivityPractices.choreTypes ?? [],
      nonChoreActivity: data.physicalActivityPractices.nonChoreActivity ?? '',
      screenTime: {
        mobile: data.physicalActivityPractices.screenTime?.mobile ?? 0,
        tv: data.physicalActivityPractices.screenTime?.tv ?? 0,
      },
      sleep: {
        bedtime: data.physicalActivityPractices.sleep?.bedtime ?? '',
        wakeTime: data.physicalActivityPractices.sleep?.wakeTime ?? '',
      },
    }
  }

  if (data.riskyBehaviorPractices) {
    formatted.riskyBehaviorPractices = {
      checkups: createLabelValue(data.riskyBehaviorPractices.checkups),
      copingMethods: data.riskyBehaviorPractices.copingMethods ?? [],
      copingMethodsOther: data.riskyBehaviorPractices.copingMethodsOther ?? '',
      stressors: data.riskyBehaviorPractices.stressors ?? [],
      stressorsOther: data.riskyBehaviorPractices.stressorsOther ?? '',
    }
  }

  return formatted
}

// Helper functions for labels
const getLabelForYearsInCommunity = (value: string): string => {
  const labels: Record<string, string> = {
    less1: 'Less than 1 year',
    '1-5': '1-5 years',
    '6-10': '6-10 years',
    more10: 'More than 10 years',
  }
  return labels[value] || value
}

const getReligionLabel = (value: string): string => {
  const labels: Record<string, string> = {
    muslim: 'Muslim',
    christian: 'Christian',
    traditionalist: 'Traditionalist',
    other: 'Other',
  }
  return labels[value] || value
}

const createLabelValue = <T>(value: T | undefined | null) => {
  if (value === undefined || value === null) return undefined
  return {
    label: String(value),
    value,
  }
}
