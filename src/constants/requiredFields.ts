import { SpecificNcdType } from '@/app/dashboard/risk-assessment/NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'

export interface NcdRequiredFields {
  [NCD.CVD]: {
    dateOfBirth: boolean
    gender: boolean
    systolicBP: boolean
    bmi: boolean
    cholesterol: boolean
    smoking: boolean
    hasQuitSmoking: boolean
  }
  [NCD.DIABETES]: {
    dateOfBirth: boolean
    waist: boolean
    bmi: boolean
    physicalActivity: boolean
    hasFamilyhistoryDiabetes: boolean
    usesAntihypertensiveMedication: boolean
    hasHistoryHighBloodGlucose: boolean
  }
  [NCD.COPD]: {
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
  [NCD.BREAST_CANCER]: {
    dateOfBirth: boolean
    gender: boolean
    hasBeenDiagnosed: boolean
    ageAtMenarche: boolean
    ageAtFirstBirth: boolean
    menopauseStatus: boolean
    ageAtMenopause: boolean
    hormoneReplacementTherapy: boolean
    breastBiopsy: boolean
    familyHistoryBreastCancer: boolean
    familyHistoryOvarianCancer: boolean
    brcaMutationStatus: boolean
    breastDensity: boolean
    personalHistoryOvarianCancer: boolean
    personalHistoryColorectalPancreaticCancer: boolean
    personalHistoryUterineCancer: boolean
    ashkenaziInheritance: boolean
  }
  [NCD.PROSTATE_CANCER]: {
    dateOfBirth: boolean
    gender: boolean
    psaLevel: boolean
    familyHistoryProstateCancer: boolean
    urinarySymptomsIncompleteEmptying: boolean
    urinarySymptomsFrequency: boolean
    urinarySymptomsIntermittency: boolean
    urinarySymptomsUrgency: boolean
    urinarySymptomsWeakStream: boolean
    urinarySymptomsStraining: boolean
    urinarySymptomsNocturia: boolean
  }
  [NCD.COLORECTAL_CANCER]: {
    dateOfBirth: boolean
    gender: boolean
    personalHistory: boolean
    personalHistoryPolyps: boolean
    familyHistoryColorectalCancer: boolean
    familyHistoryPolyps: boolean
    inflammatoryBowelDisease: boolean
    numberOfRelatives: boolean
    colonoscopyHistory: boolean
    polypDiagnosis: boolean
    aspirinUse: boolean
    nsaidUse: boolean
    moderateActivityHoursPerWeek: boolean
    alcoholFrequency: boolean
    height: boolean
    weight: boolean
    hasQuitSmoking: boolean
  }
  [NCD.CKD]: {
    dateOfBirth: boolean
    gender: boolean
    serumCreatinine: boolean
  }
}

export const ncdRequiredFields: NcdRequiredFields = {
  [NCD.CVD]: {
    dateOfBirth: true,
    gender: true,
    bmi: true,
    cholesterol: true,
    smoking: true,
    hasQuitSmoking: true,
    systolicBP: true,
  },
  [NCD.DIABETES]: {
    dateOfBirth: true,
    waist: true,
    bmi: true,
    physicalActivity: true,
    hasFamilyhistoryDiabetes: true,
    usesAntihypertensiveMedication: true,
    hasHistoryHighBloodGlucose: true,
  },
  [NCD.COPD]: {
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
  [NCD.BREAST_CANCER]: {
    dateOfBirth: true,
    gender: true,
    hasBeenDiagnosed: true,
    ageAtMenarche: true,
    ageAtFirstBirth: true,
    menopauseStatus: true,
    ageAtMenopause: true,
    hormoneReplacementTherapy: true,
    breastBiopsy: true,
    familyHistoryBreastCancer: true,
    familyHistoryOvarianCancer: true,
    brcaMutationStatus: true,
    breastDensity: true,
    personalHistoryOvarianCancer: true,
    personalHistoryColorectalPancreaticCancer: true,
    personalHistoryUterineCancer: true,
    ashkenaziInheritance: true,
  },
  [NCD.PROSTATE_CANCER]: {
    dateOfBirth: true,
    gender: true,
    psaLevel: true,
    familyHistoryProstateCancer: true,
    urinarySymptomsIncompleteEmptying: true,
    urinarySymptomsFrequency: true,
    urinarySymptomsIntermittency: true,
    urinarySymptomsUrgency: true,
    urinarySymptomsWeakStream: true,
    urinarySymptomsStraining: true,
    urinarySymptomsNocturia: true,
  },
  [NCD.COLORECTAL_CANCER]: {
    dateOfBirth: true,
    gender: true,
    personalHistory: true,
    personalHistoryPolyps: true,
    familyHistoryColorectalCancer: true,
    familyHistoryPolyps: true,
    inflammatoryBowelDisease: true,
    numberOfRelatives: true,
    colonoscopyHistory: true,
    polypDiagnosis: true,
    aspirinUse: true,
    nsaidUse: true,
    moderateActivityHoursPerWeek: true,
    alcoholFrequency: true,
    height: true,
    weight: true,
    hasQuitSmoking: true,
  },
  [NCD.CKD]: {
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
  if (ncdType === NCD.PROSTATE_CANCER) {
    const hasPsaLevel =
      formData?.bloodTest?.psaLevel && formData.bloodTest.psaLevel.trim() !== ''

    return {
      ...ncdRequiredFields[NCD.PROSTATE_CANCER],
      // If PSA level is available, urinary symptoms are not required
      // If PSA level is not available, urinary symptoms are required (at least one should be filled)
      urinarySymptomsIncompleteEmptying: !hasPsaLevel,
      urinarySymptomsFrequency: !hasPsaLevel,
      urinarySymptomsIntermittency: !hasPsaLevel,
      urinarySymptomsUrgency: !hasPsaLevel,
      urinarySymptomsWeakStream: !hasPsaLevel,
      urinarySymptomsStraining: !hasPsaLevel,
      urinarySymptomsNocturia: !hasPsaLevel,
    }
  }

  return ncdRequiredFields[ncdType] || {}
}
