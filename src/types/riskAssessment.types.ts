export enum NCD {
  DIABETES = 'diabetes',
  CVD = 'cvd',
  COPD = 'copd',
  BREAST_CANCER = 'breastCancer',
  PROSTATE_CANCER = 'prostateCancer',
  COLORECTAL_CANCER = 'colorectalCancer',
  CKD = 'ckd',
}

export type ResultRiskType =
  | 'who'
  | 'findrisc'
  | 'copd'
  | 'breastCancer'
  | 'prostate'
  | 'colorectal'
  | 'ckd'
