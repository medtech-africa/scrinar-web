import { SpecificNcdType } from '@/app/dashboard/risk-assessment/NcdFilterContext'

export interface NcdRequiredFields {
  cvd: {
    dateOfBirth: boolean
    gender: boolean
    systolicBP: boolean
    bmi: boolean
    cholesterol: boolean
    smoking: boolean
    hasQuitSmoking: boolean
  }
  diabetes: {
    dateOfBirth: boolean
    waist: boolean
    bmi: boolean
    physicalActivity: boolean
    eatsFruitVegetableDaily: boolean
    diet: boolean
    hasFamilyhistoryDiabetes: boolean
    usesAntihypertensiveMedication: boolean
    hasHistoryHighBloodGlucose: boolean
  }
  copd: {
    dateOfBirth: boolean
    gender: boolean
    smoking: boolean
    hasQuitSmoking: boolean
    coughDuration: boolean
    shortnessOfBreath: boolean
    activityLimitations: boolean
    exposureToDust: boolean
    pefLevel: boolean
  }
  breastCancer: {
    dateOfBirth: boolean
    gender: boolean
    height: boolean
    weight: boolean
    ageAtMenarche: boolean
    ageAtFirstBirth: boolean
    menopauseStatus: boolean
    hormoneReplacementTherapy: boolean
    breastBiopsy: boolean
    familyHistoryBreastCancer: boolean
    familyHistoryOvarianCancer: boolean
    brcaMutationStatus: boolean
    breastDensity: boolean
  }
  prostateCancer: {
    dateOfBirth: boolean
    gender: boolean
    psaLevel: boolean
    familyHistoryProstateCancer: boolean
    urinarySymptoms: boolean
  }
  colorectalCancer: {
    dateOfBirth: boolean
    gender: boolean
    height: boolean
    weight: boolean
    personalHistoryColorectalCancer: boolean
    personalHistoryPolyps: boolean
    familyHistoryColorectalCancer: boolean
    familyHistoryPolyps: boolean
    inflammatoryBowelDisease: boolean
    smokingStatus: boolean
    vegetableConsumption: boolean
    diet: boolean
    colonoscopyHistory: boolean
    aspirinUse: boolean
    nsaidUse: boolean
  }
  ckd: {
    dateOfBirth: boolean
    gender: boolean
    serumCreatinine: boolean
  }
}

export const ncdRequiredFields: NcdRequiredFields = {
  cvd: {
    dateOfBirth: true,
    gender: true,
    bmi: true,
    cholesterol: true,
    smoking: true,
    hasQuitSmoking: true,
    systolicBP: true,
  },
  diabetes: {
    dateOfBirth: true,
    waist: true,
    bmi: true,
    physicalActivity: true,
    eatsFruitVegetableDaily: true,
    diet: true,
    hasFamilyhistoryDiabetes: true,
    usesAntihypertensiveMedication: true,
    hasHistoryHighBloodGlucose: true,
  },
  copd: {
    dateOfBirth: true,
    gender: true,
    smoking: true,
    hasQuitSmoking: true,
    coughDuration: true,
    shortnessOfBreath: true,
    activityLimitations: true,
    exposureToDust: true,
    pefLevel: true,
  },
  breastCancer: {
    dateOfBirth: true,
    gender: true,
    height: true,
    weight: true,
    ageAtMenarche: true,
    ageAtFirstBirth: true,
    menopauseStatus: true,
    hormoneReplacementTherapy: true,
    breastBiopsy: true,
    familyHistoryBreastCancer: true,
    familyHistoryOvarianCancer: true,
    brcaMutationStatus: true,
    breastDensity: true,
  },
  prostateCancer: {
    dateOfBirth: true,
    gender: true,
    psaLevel: true,
    familyHistoryProstateCancer: true,
    urinarySymptoms: true,
  },
  colorectalCancer: {
    dateOfBirth: true,
    gender: true,
    height: true,
    weight: true,
    personalHistoryColorectalCancer: true,
    personalHistoryPolyps: true,
    familyHistoryColorectalCancer: true,
    familyHistoryPolyps: true,
    inflammatoryBowelDisease: true,
    smokingStatus: true,
    vegetableConsumption: true,
    diet: true,
    colonoscopyHistory: true,
    aspirinUse: true,
    nsaidUse: true,
  },
  ckd: {
    dateOfBirth: true,
    gender: true,
    serumCreatinine: true,
  },
}

/**
 * Get required fields for a specific NCD type
 */
export const getRequiredFields = (
  ncdType: SpecificNcdType
): NcdRequiredFields[keyof NcdRequiredFields] | null => {
  return ncdRequiredFields[ncdType] || null
}

/**
 * Check if a field is required for any selected NCD
 */
export const isFieldRequired = (
  field: string,
  selectedNcds: SpecificNcdType[]
): boolean => {
  return selectedNcds.some((ncdType) => {
    const requiredFields = getRequiredFields(ncdType)
    if (!requiredFields) return false
    return requiredFields[field as keyof typeof requiredFields] || false
  })
}

/**
 * Check if urinary symptoms are properly filled
 */
export const checkUrinarySymptomsFilled = (formData: any): boolean => {
  const urinarySymptomFields = [
    'urinarySymptomsIncompleteEmptying',
    'urinarySymptomsFrequency',
    'urinarySymptomsIntermittency',
    'urinarySymptomsUrgency',
    'urinarySymptomsWeakStream',
    'urinarySymptomsStraining',
    'urinarySymptomsNocturia',
  ]

  return urinarySymptomFields.some((field) => {
    const value = formData?.prostateCancer?.[field]
    return value && value.trim() !== ''
  })
}

/**
 * Get conditional required fields logic
 * For example, prostate cancer urinary symptoms are only required when PSA level is not available
 */
export const getConditionalRequiredFields = (
  ncdType: SpecificNcdType,
  formData: any
): Partial<NcdRequiredFields[keyof NcdRequiredFields]> => {
  if (ncdType === 'prostateCancer') {
    const hasPsaLevel =
      formData?.bloodTest?.psaLevel && formData.bloodTest.psaLevel.trim() !== ''

    return {
      ...ncdRequiredFields.prostateCancer,
      // If PSA level is available, urinary symptoms are not required
      // If PSA level is not available, urinary symptoms are required (at least one should be filled)
      urinarySymptoms: !hasPsaLevel,
    }
  }

  return ncdRequiredFields[ncdType] || {}
}
