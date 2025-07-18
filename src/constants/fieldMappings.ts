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
  cholesterol: 'bloodTest.cholesterolTotal',
  serumCreatinine: 'bloodTest.serumCreatinine',
  pefLevel: 'bloodTest.pefLevel',

  // Lifestyle fields
  smoking: 'lifestyle.tobaccoCurrentlyUses',
  hasQuitSmoking: 'lifestyle.tobaccoQuit',

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
  urinarySymptoms: 'prostateCancer.urinarySymptomsFrequency',

  // Colorectal Cancer fields
  personalHistoryColorectalCancer: 'colorectalCancer.personalHistory',
  personalHistoryPolyps: 'colorectalCancer.personalHistoryPolyps',
  familyHistoryColorectalCancer: 'familyHistory.colorectalCancer',
  familyHistoryPolyps: 'colorectalCancer.familyHistoryPolyps',
  inflammatoryBowelDisease: 'colorectalCancer.inflammatoryBowelDisease',
  smokingStatus: 'colorectalCancer.smokingStatus',
  vegetableConsumption: 'colorectalCancer.vegetableConsumption',
  physicalActivity: 'physicalActivity',
  colonoscopyHistory: 'colorectalCancer.colonoscopyHistory',
  aspirinUse: 'colorectalCancer.aspirinUse',
  nsaidUse: 'colorectalCancer.nsaidUse',

  // CKD fields
  hypertension: 'symptoms.hypertension',
}

/**
 * Field display names for user-friendly error messages
 */
export const FIELD_DISPLAY_NAMES: Record<string, string> = {
  // Personal Info fields
  age: 'Age',
  gender: 'Gender',
  dateOfBirth: 'Date of Birth',

  // Vitals fields
  systolicBP: 'Systolic Blood Pressure',
  diastolicBP: 'Diastolic Blood Pressure',
  bmi: 'BMI',
  height: 'Height',
  weight: 'Weight',
  waist: 'Waist Circumference',
  pulse: 'Pulse Rate',
  oxygenSaturation: 'Oxygen Saturation',
  temperature: 'Temperature',

  // Blood Test fields
  diabetes: 'Diabetes Status',
  cholesterol: 'Total Cholesterol',
  serumCreatinine: 'Serum Creatinine',
  pefLevel: 'PEF Level',

  // Lifestyle fields
  smoking: 'Smoking Status',
  hasQuitSmoking: 'Smoking Cessation',

  // COPD fields
  coughDuration: 'Cough Duration',
  shortnessOfBreath: 'Shortness of Breath',
  activityLimitations: 'Activity Limitations',
  exposureToDust: 'Exposure to Dust',

  // Breast Cancer fields
  ageAtMenarche: 'Age at Menarche',
  ageAtFirstBirth: 'Age at First Birth',
  ageAtMenopause: 'Age at Menopause',
  hormoneReplacementTherapy: 'Hormone Replacement Therapy',
  benignBreastDisease: 'Benign Breast Disease',
  familyHistoryBreastCancer: 'Family History of Breast Cancer',
  familyHistoryOvarianCancer: 'Family History of Ovarian Cancer',
  brcaMutationStatus: 'BRCA Mutation Status',
  breastDensity: 'Breast Density',

  // Prostate Cancer fields
  psaLevel: 'PSA Level',
  digitalRectalExam: 'Digital Rectal Exam',
  prostateVolume: 'Prostate Volume',
  familyHistoryProstateCancer: 'Family History of Prostate Cancer',
  previousBiopsy: 'Previous Biopsy',
  freeToTotalPsaRatio: 'Free to Total PSA Ratio',
  urinarySymptoms: 'Urinary Symptoms',

  // Colorectal Cancer fields
  personalHistoryColorectalCancer: 'Personal History of Colorectal Cancer',
  personalHistoryPolyps: 'Personal History of Polyps',
  familyHistoryColorectalCancer: 'Family History of Colorectal Cancer',
  familyHistoryPolyps: 'Family History of Polyps',
  inflammatoryBowelDisease: 'Inflammatory Bowel Disease',
  smokingStatus: 'Smoking Status',
  vegetableConsumption: 'Vegetable Consumption',
  physicalActivity: 'Physical Activity',
  colonoscopyHistory: 'Colonoscopy History',
  aspirinUse: 'Aspirin Use',
  nsaidUse: 'NSAID Use',

  // CKD fields
  hypertension: 'Hypertension',
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

/**
 * Helper function to get display name for a field
 */
export const getFieldDisplayName = (internalFieldName: string): string => {
  return FIELD_DISPLAY_NAMES[internalFieldName] || internalFieldName
}
