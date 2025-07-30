import { NCD } from '@/types/riskAssessment.types'

export const NCD_DISPLAY_NAMES: Record<NCD, string> = {
  [NCD.CVD]: 'Cardiovascular Disease',
  [NCD.DIABETES]: 'Diabetes',
  [NCD.COPD]: 'COPD',
  [NCD.BREAST_CANCER]: 'Breast Cancer',
  [NCD.PROSTATE_CANCER]: 'Prostate Cancer',
  [NCD.COLORECTAL_CANCER]: 'Colorectal Cancer',
  [NCD.CKD]: 'CKD',
}

export const ALL_NCD_TYPES: NCD[] = [
  NCD.CVD,
  NCD.DIABETES,
  NCD.COPD,
  NCD.BREAST_CANCER,
  NCD.PROSTATE_CANCER,
  NCD.COLORECTAL_CANCER,
  NCD.CKD,
]

export const DEFAULT_NCD_TYPE = ALL_NCD_TYPES.join(',')
