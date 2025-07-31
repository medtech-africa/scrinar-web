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
  cholesterol: 'bloodTest.cholesterolTotal',
  serumCreatinine: 'bloodTest.serumCreatinine',
  psaLevel: 'bloodTest.psaLevel',
  pefLevel: 'copd.pefLevel',

  // Lifestyle fields
  smoking: 'lifestyle.everSmoked',
  hasQuitSmoking: 'lifestyle.currentSmokingStatus',
  physicalActivity: 'lifestyle.hasDailyPhysicalActivity',
  usesAntihypertensiveMedication: 'lifestyle.usesAntihypertensiveMedication',
  hasHistoryHighBloodGlucose:
    'previousHealthScreening.hasHistoryHighBloodGlucose',

  // COPD fields
  coughDuration: 'copd.coughDuration',
  shortnessOfBreath: 'copd.shortnessOfBreath',
  activityLimitations: 'copd.activityLimitations',
  exposureToDust: 'copd.exposureToDust',

  // Breast Cancer fields
  ageAtMenarche: 'breastCancer.ageAtMenarche',
  ageAtFirstBirth: 'breastCancer.ageAtFirstBirth',
  menopauseStatus: 'breastCancer.menopauseStatus',
  ageAtMenopause: 'breastCancer.ageAtMenopause',
  hormoneReplacementTherapy: 'breastCancer.hormoneReplacementTherapy',
  breastBiopsy: 'breastCancer.breastBiopsy',
  familyHistoryBreastCancer: 'familyHistory.breastCancer',
  familyHistoryOvarianCancer: 'familyHistory.ovarianCancer',
  brcaMutationStatus: 'breastCancer.brcaMutationStatus',
  breastDensity: 'breastCancer.breastDensity',
  personalHistoryOvarianCancer: 'breastCancer.personalHistoryOvarianCancer',
  personalHistoryColorectalPancreaticCancer:
    'breastCancer.personalHistoryColorectalPancreaticCancer',
  personalHistoryUterineCancer: 'breastCancer.personalHistoryUterineCancer',
  ashkenaziInheritance: 'breastCancer.ashkenaziInheritance',

  // Prostate Cancer fields
  familyHistoryProstateCancer: 'familyHistory.prostateCancer',
  urinarySymptoms: 'prostateCancer.urinarySymptomsFrequency',
  urinarySymptomsIncompleteEmptying:
    'prostateCancer.urinarySymptomsIncompleteEmptying',
  urinarySymptomsFrequency: 'prostateCancer.urinarySymptomsFrequency',
  urinarySymptomsIntermittency: 'prostateCancer.urinarySymptomsIntermittency',
  urinarySymptomsUrgency: 'prostateCancer.urinarySymptomsUrgency',
  urinarySymptomsWeakStream: 'prostateCancer.urinarySymptomsWeakStream',
  urinarySymptomsStraining: 'prostateCancer.urinarySymptomsStraining',
  urinarySymptomsNocturia: 'prostateCancer.urinarySymptomsNocturia',

  // Colorectal Cancer fields
  personalHistory: 'colorectalCancer.personalHistory',
  personalHistoryPolyps: 'colorectalCancer.personalHistoryPolyps',
  familyHistoryColorectalCancer:
    'colorectalCancer.familyHistoryColorectalCancer',
  familyHistoryPolyps: 'colorectalCancer.familyHistoryPolyps',
  inflammatoryBowelDisease: 'colorectalCancer.inflammatoryBowelDisease',
  numberOfRelatives: 'colorectalCancer.numberOfRelatives',
  colonoscopyHistory: 'colorectalCancer.colonoscopyHistory',
  polypDiagnosis: 'colorectalCancer.polypDiagnosis',
  aspirinUse: 'colorectalCancer.aspirinUse',
  nsaidUse: 'colorectalCancer.nsaidUse',

  // Diabetes fields
  hasFamilyhistoryDiabetes: 'familyHistory.diabetes',
}

/**
 * Field display names for user-friendly error messages
 */
export const FIELD_DISPLAY_NAMES: Record<string, string> = {
  // Personal Info fields
  age: 'Age',
  gender: 'Gender',

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
  cholesterol: 'Total Cholesterol',
  serumCreatinine: 'Serum Creatinine',
  pefLevel: 'PEF Level',

  // Lifestyle fields
  smoking: 'Smoking Status',
  hasQuitSmoking: 'Smoking Cessation',
  physicalActivity: 'Physical Activity',
  usesAntihypertensiveMedication: 'Use of Antihypertensive Medication',
  hasHistoryHighBloodGlucose: 'History of High Blood Glucose',

  // COPD fields
  coughDuration: 'Cough Duration',
  shortnessOfBreath: 'Shortness of Breath',
  activityLimitations: 'Activity Limitations',
  exposureToDust: 'Exposure to Dust',

  // Breast Cancer fields
  ageAtMenarche: 'Age at Menarche',
  ageAtFirstBirth: 'Age at First Birth',
  menopauseStatus: 'Menopause Status',
  ageAtMenopause: 'Age at Menopause',
  hormoneReplacementTherapy: 'Hormone Replacement Therapy',
  breastBiopsy: 'Breast Biopsy',
  familyHistoryBreastCancer: 'Family History of Breast Cancer',
  familyHistoryOvarianCancer: 'Family History of Ovarian Cancer',
  brcaMutationStatus: 'BRCA Mutation Status',
  breastDensity: 'Breast Density',
  personalHistoryOvarianCancer: 'Personal History of Ovarian Cancer',
  personalHistoryColorectalPancreaticCancer:
    'Personal History of Colorectal/Pancreatic Cancer',
  personalHistoryUterineCancer: 'Personal History of Uterine Cancer',
  ashkenaziInheritance: 'Ashkenazi Inheritance',

  // Prostate Cancer fields
  familyHistoryProstateCancer: 'Family History of Prostate Cancer',
  urinarySymptoms: 'Urinary Symptoms',
  urinarySymptomsIncompleteEmptying: 'Incomplete Emptying',
  urinarySymptomsFrequency: 'Urinary Frequency',
  urinarySymptomsIntermittency: 'Urinary Intermittency',
  urinarySymptomsUrgency: 'Urinary Urgency',
  urinarySymptomsWeakStream: 'Weak Urinary Stream',
  urinarySymptomsStraining: 'Urinary Straining',
  urinarySymptomsNocturia: 'Nocturia',
  psaLevel: 'PSA Level',

  // Colorectal Cancer fields
  personalHistory: 'Personal History of Colorectal Cancer',
  personalHistoryPolyps: 'Personal History of Polyps',
  familyHistoryColorectalCancer: 'Family History of Colorectal Cancer',
  familyHistoryPolyps: 'Family History of Polyps',
  inflammatoryBowelDisease: 'Inflammatory Bowel Disease',
  numberOfRelatives: 'Number of Relatives with Cancer',
  colonoscopyHistory: 'Colonoscopy History',
  polypDiagnosis: 'Polyp Diagnosis',
  aspirinUse: 'Aspirin Use',
  nsaidUse: 'NSAID Use',

  // CKD fields
  hypertension: 'Hypertension',

  // Diabetes fields
  hasFamilyhistoryDiabetes: 'Family History of Diabetes',
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
