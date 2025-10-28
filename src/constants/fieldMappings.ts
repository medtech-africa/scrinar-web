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
  cholesterolHdl: 'bloodTest.cholesterolHdl',
  cholesterolLdl: 'bloodTest.cholesterolLdl',
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
  // ageAtMenopause: 'breastCancer.ageAtMenopause',
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
  colonoscopyHistory: 'colorectalCancer.colonoscopyHistory',
  polypDiagnosis: 'colorectalCancer.polypDiagnosis',
  aspirinUse: 'colorectalCancer.aspirinUse',
  nsaidUse: 'colorectalCancer.nsaidUse',
  alcoholFrequency: 'lifestyle.alcoholFrequency',
  vegetableServingsPerWeek: 'lifestyle.vegetableServingsPerWeek',
  vegetableServingSize: 'lifestyle.vegetableServingSize',

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
  systolicBP: 'Systolic Blood Pressure (Vitals)',
  diastolicBP: 'Diastolic Blood Pressure (Vitals)',
  bmi: 'BMI (Vitals)',
  height: 'Height (Vitals)',
  weight: 'Weight (Vitals)',
  waist: 'Waist Circumference (Vitals)',
  pulse: 'Pulse Rate (Vitals)',
  oxygenSaturation: 'Oxygen Saturation (Vitals)',
  temperature: 'Temperature (Vitals)',

  // Blood Test fields
  cholesterol: 'Total Cholesterol (Laboratory Tests)',
  cholesterolHdl: 'HDL Cholesterol (Laboratory Tests)',
  cholesterolLdl: 'LDL Cholesterol (Laboratory Tests)',
  serumCreatinine: 'Serum Creatinine (Laboratory Tests)',
  pefLevel: 'PEF Level (NCD Questionnaire/COPD)',

  // Lifestyle fields
  smoking: 'Smoking Status (Lifestyle)',
  hasQuitSmoking: 'Smoking Cessation (Lifestyle)',
  physicalActivity: 'Physical Activity (Lifestyle)',
  usesAntihypertensiveMedication:
    'Use of Antihypertensive Medication (Lifestyle)',
  hasHistoryHighBloodGlucose:
    'History of High Blood Glucose (NCD Questionnaire/Diabetes)',
  alcoholFrequency: 'Alcohol Frequency (Lifestyle)',

  // COPD fields
  coughDuration: 'Cough Duration (NCD Questionnaire/COPD)',
  shortnessOfBreath: 'Shortness of Breath (NCD Questionnaire/COPD)',
  activityLimitations: 'Activity Limitations (NCD Questionnaire/COPD)',
  exposureToDust: 'Exposure to Dust (NCD Questionnaire/COPD)',

  // Breast Cancer fields
  ageAtMenarche: 'Age at Menarche (NCD Questionnaire/Breast Cancer)',
  ageAtFirstBirth: 'Age at First Birth (NCD Questionnaire/Breast Cancer)',
  menopauseStatus: 'Menopause Status (NCD Questionnaire/Breast Cancer)',
  // ageAtMenopause: 'Age at Menopause',
  hormoneReplacementTherapy:
    'Hormone Replacement Therapy (NCD Questionnaire/Breast Cancer)',
  breastBiopsy: 'Breast Biopsy (NCD Questionnaire/Breast Cancer)',
  familyHistoryBreastCancer: 'Family History of Breast Cancer (Family History)',
  familyHistoryOvarianCancer:
    'Family History of Ovarian Cancer (Family History)',
  brcaMutationStatus: 'BRCA Mutation Status (NCD Questionnaire/Breast Cancer)',
  breastDensity: 'Breast Density (NCD Questionnaire/Breast Cancer)',
  personalHistoryOvarianCancer:
    'Personal History of Ovarian Cancer (NCD Questionnaire/Breast Cancer)',
  personalHistoryColorectalPancreaticCancer:
    'Personal History of Colorectal/Pancreatic Cancer (NCD Questionnaire/Breast Cancer)',
  personalHistoryUterineCancer:
    'Personal History of Uterine Cancer (NCD Questionnaire/Breast Cancer)',
  ashkenaziInheritance:
    'Ashkenazi Inheritance (NCD Questionnaire/Breast Cancer)',

  // Prostate Cancer fields
  familyHistoryProstateCancer:
    'Family History of Prostate Cancer (Family History)',
  urinarySymptoms: 'Urinary Symptoms (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsIncompleteEmptying:
    'Incomplete Emptying (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsFrequency:
    'Urinary Frequency (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsIntermittency:
    'Urinary Intermittency (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsUrgency: 'Urinary Urgency (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsWeakStream:
    'Weak Urinary Stream (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsStraining:
    'Urinary Straining (NCD Questionnaire/Prostate Cancer)',
  urinarySymptomsNocturia: 'Nocturia (NCD Questionnaire/Prostate Cancer)',
  psaLevel: 'PSA Level (Laboratory Tests)',

  // Colorectal Cancer fields
  personalHistory:
    'Personal History of Colorectal Cancer (NCD Questionnaire/Colorectal Cancer)',
  personalHistoryPolyps:
    'Personal History of Polyps (NCD Questionnaire/Colorectal Cancer)',
  familyHistoryColorectalCancer:
    'Family History of Colorectal Cancer (NCD Questionnaire/Colorectal Cancer)',
  familyHistoryPolyps:
    'Family History of Polyps (NCD Questionnaire/Colorectal Cancer)',
  colonoscopyHistory:
    'Colonoscopy History (NCD Questionnaire/Colorectal Cancer)',
  polypDiagnosis: 'Polyp Diagnosis (NCD Questionnaire/Colorectal Cancer)',
  aspirinUse: 'Aspirin Use (NCD Questionnaire/Colorectal Cancer)',
  nsaidUse: 'NSAID Use (NCD Questionnaire/Colorectal Cancer)',
  vegetableServingsPerWeek: 'Vegetable Servings Per Week (Lifestyle)',
  vegetableServingSize: 'Vegetable Serving Size (Lifestyle)',

  // CKD fields
  hypertension: 'Hypertension',

  // Diabetes fields
  hasFamilyhistoryDiabetes: 'Family History of Diabetes (Family History)',
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
