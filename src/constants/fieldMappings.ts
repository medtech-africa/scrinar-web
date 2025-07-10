/**
 * Shared field mappings for risk assessment forms
 * Maps internal field names to form field paths
 */
export const RISK_ASSESSMENT_FIELD_MAP: Record<string, string> = {
  // Personal Info fields
  age: 'personalInfo.age',
  gender: 'personalInfo.gender',
  dateOfBirth: 'personalInfo.dateOfBirth',

  // Vitals fields
  systolicBP: 'vitals.sys',
  diastolicBP: 'vitals.dys',
  bmi: 'vitals.bmi',
  height: 'vitals.height',
  weight: 'vitals.weight',
  waist: 'vitals.waist',
  pulse: 'vitals.pulse',
  oxygenSaturation: 'vitals.oxygenSaturation',
  temperature: 'vitals.temperature',

  // Blood Test fields
  diabetes: 'symptoms.diabetes',
  cholesterol: 'bloodTest.cholesterol.total',
  serumCreatinine: 'bloodTest.serumCreatinine',
  pefLevel: 'bloodTest.pefLevel',

  // Lifestyle fields
  smoking: 'lifestyle.tobacco.currentlyUses',
  hasQuitSmoking: 'lifestyle.tobacco.quit',

  // COPD fields
  coughDuration: 'copd.coughDuration',
  shortnessOfBreath: 'copd.shortnessOfBreath',
  activityLimitations: 'copd.activityLimitations',
  exposureToDust: 'copd.exposureToDust',

  // Breast Cancer fields
  ageAtMenarche: 'breastCancer.ageAtMenarche',
  ageAtFirstBirth: 'breastCancer.ageAtFirstBirth',
  ageAtMenopause: 'breastCancer.ageAtMenopause',
  hormoneReplacementTherapy: 'breastCancer.hormoneReplacementTherapy',
  benignBreastDisease: 'breastCancer.benignBreastDisease',
  familyHistoryBreastCancer: 'familyHistory.breastCancer',
  familyHistoryOvarianCancer: 'familyHistory.ovarianCancer',
  brcaMutationStatus: 'breastCancer.brcaMutationStatus',
  breastDensity: 'breastCancer.breastDensity',

  // Prostate Cancer fields
  psaLevel: 'prostateCancer.psaLevel',
  digitalRectalExam: 'prostateCancer.digitalRectalExam',
  prostateVolume: 'prostateCancer.prostateVolume',
  familyHistoryProstateCancer: 'familyHistory.prostateCancer',
  previousBiopsy: 'prostateCancer.previousBiopsy',
  freeToTotalPsaRatio: 'prostateCancer.freeToTotalPsaRatio',
  ethnicity: 'prostateCancer.ethnicity',
  urinarySymptoms: 'prostateCancer.urinarySymptoms',

  // Colorectal Cancer fields
  personalHistoryColorectalCancer: 'colorectalCancer.personalHistory',
  personalHistoryPolyps: 'colorectalCancer.personalHistoryPolyps',
  familyHistoryColorectalCancer: 'familyHistory.colorectalCancer',
  familyHistoryPolyps: 'colorectalCancer.familyHistoryPolyps',
  inflammatoryBowelDisease: 'colorectalCancer.inflammatoryBowelDisease',
  smokingStatus: 'colorectalCancer.smokingStatus',
  vegetableConsumption: 'colorectalCancer.vegetableConsumption',
  physicalActivity: 'colorectalCancer.physicalActivity',
  colonoscopyHistory: 'colorectalCancer.colonoscopyHistory',
  aspirinUse: 'colorectalCancer.aspirinUse',
  nsaidUse: 'colorectalCancer.nsaidUse',

  // CKD fields
  hypertension: 'symptoms.hypertension',
}

/**
 * Helper function to get field path from internal field name
 */
export const getFieldPath = (internalFieldName: string): string => {
  return RISK_ASSESSMENT_FIELD_MAP[internalFieldName] || internalFieldName
}

/**
 * Helper function to get internal field name from field path
 */
export const getInternalFieldName = (fieldPath: string): string => {
  const entry = Object.entries(RISK_ASSESSMENT_FIELD_MAP).find(
    ([_, path]) => path === fieldPath
  )
  return entry ? entry[0] : fieldPath
}
