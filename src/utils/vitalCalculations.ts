/**
 * Vital calculations and categorization functions
 *
 * IMPORTANT: All blood test categorization functions (categorizeBloodSugarLevel,
 * categorizeTotalCholesterol, categorizeLDLC, categorizeHDLC, categorizeTG)
 * expect values in mg/dL units. The UI handles unit conversion, but these
 * functions always receive mg/dL values from the backend.
 */

import { TVariant, TVariantEnum } from '@/types/variants.types'

type IBP = (
  systolic: number,
  diastolic: number
) => { variant: TVariant; message: string; level: string }
type IBS = (bs: number) => { variant: TVariant; message: string; level: string }

export const calculateBloodPressureRisk: IBP = (
  systolic: number,
  diastolic: number
) => {
  if (systolic < 91 || diastolic < 61) {
    return {
      level: 'Low blood pressure (Hypotension)',
      message: 'Hypotension',
      variant: TVariantEnum.Pending,
    }
  } else if (systolic < 121 && diastolic < 81) {
    return {
      level: 'Normal blood pressure',
      message: 'Normal',
      variant: TVariantEnum.Success,
    }
  } else if (
    (systolic >= 120 && systolic <= 139) ||
    (diastolic >= 80 && diastolic <= 89)
  ) {
    return {
      level: 'Prehypertension',
      message: 'Prehypertension',
      variant: TVariantEnum.Warning,
    }
  } else {
    return {
      level: 'Hypertension',
      message: 'Hypertension',
      variant: TVariantEnum.Danger,
    }
  }
  // if (systolic < 91 || diastolic < 61) {
  //   return {
  //     level: 'Low blood pressure (Hypotension)',
  //     message: 'Hypotension',
  //     variant: TVariantEnum.Pending,
  //   }
  // } else if (systolic < 121 && diastolic < 81) {
  //   return {
  //     level: 'Normal blood pressure',
  //     message: 'Normal',
  //     variant: TVariantEnum.Success,
  //   }
  // } else if (systolic < 131 && diastolic < 86) {
  //   return {
  //     level: 'Elevated blood pressure',
  //     message: 'Elevated',
  //     variant: 'warning',
  //   }
  // } else if (systolic < 141 || diastolic < 91) {
  //   return {
  //     level: 'Stage 1 hypertension (Mild)',
  //     message: 'Mild',
  //     variant: TVariantEnum.Danger,
  //   }
  // } else if (systolic < 181 && diastolic < 121) {
  //   return {
  //     level: 'Stage 2 hypertension (Moderate)',
  //     message: 'Moderate',
  //     variant: 'pending2',
  //   }
  // } else {
  //   return {
  //     level: 'Stage 3 hypertension (Severe)',
  //     message: 'Severe',
  //     variant: TVariantEnum.Error,
  //   }
  // }
}

/**
 * Categorizes blood sugar level based on mg/dL values
 * @param glucoseLevel - Blood glucose level in mg/dL
 * @returns Object with variant, message, and level
 */
export const categorizeBloodSugarLevel: IBS = (glucoseLevel: number) => {
  if (glucoseLevel < 70) {
    return {
      level: 'Low blood sugar (Hypoglycemia)',
      message: 'Hypoglycemia',
      variant: TVariantEnum.Pending,
    }
  } else if (glucoseLevel >= 70 && glucoseLevel < 100) {
    return {
      level: 'Normal blood sugar',
      message: 'Normal',
      variant: TVariantEnum.Success,
    }
  } else if (glucoseLevel >= 100 && glucoseLevel < 126) {
    return {
      level: 'Prediabetes',
      message: 'Prediabetes',
      variant: TVariantEnum.Warning,
    }
  } else if (glucoseLevel >= 126) {
    return {
      level: 'Diabetes',
      message: 'Diabetes',
      variant: TVariantEnum.Danger,
    }
  } else {
    return { level: 'Unknown', message: 'Unknown', variant: 'pending2' }
  }
}

/**
 * Categorizes total cholesterol based on mg/dL values
 * @param totalCholesterol - Total cholesterol level in mg/dL
 * @returns Object with variant, message, and level
 */
export const categorizeTotalCholesterol: IBS = (totalCholesterol: number) => {
  if (totalCholesterol < 170) {
    return {
      level: 'Desirable Level',
      message: 'Desirable Level',
      variant: TVariantEnum.Success,
    }
  } else if (totalCholesterol >= 170 && totalCholesterol <= 199) {
    return {
      level: 'Borderline Level',
      message: 'Borderline Level',
      variant: TVariantEnum.Pending,
    }
  } else {
    return {
      level: 'Undesirable Level',
      message: 'Undesirable Level',
      variant: TVariantEnum.Error,
    }
  }
}

/**
 * Categorizes LDL cholesterol based on mg/dL values
 * @param ldlCholesterol - LDL cholesterol level in mg/dL
 * @returns Object with variant, message, and level
 */
export const categorizeLDLC: IBS = (ldlCholesterol: number) => {
  if (ldlCholesterol < 100) {
    return {
      level: 'Desirable Level',
      message: 'Desirable Level',
      variant: TVariantEnum.Success,
    }
  } else if (ldlCholesterol >= 100 && ldlCholesterol <= 129) {
    return {
      level: 'Borderline Level',
      message: 'Borderline Level',
      variant: TVariantEnum.Pending,
    }
  } else {
    return {
      level: 'Undesirable Level',
      message: 'Undesirable Level',
      variant: TVariantEnum.Error,
    }
  }
}

/**
 * Categorizes HDL cholesterol based on mg/dL values
 * @param hdlCholesterol - HDL cholesterol level in mg/dL
 * @returns Object with variant, message, and level
 */
export const categorizeHDLC: IBS = (hdlCholesterol: number) => {
  if (hdlCholesterol < 35) {
    return {
      level: 'Undesirable Level',
      message: 'Undesirable Level',
      variant: TVariantEnum.Error,
    }
  } else if (hdlCholesterol >= 35 && hdlCholesterol <= 45) {
    return {
      level: 'Borderline Level',
      message: 'Borderline Level',
      variant: TVariantEnum.Pending,
    }
  } else {
    return {
      level: 'Desirable Level',
      message: 'Desirable Level',
      variant: TVariantEnum.Success,
    }
  }
}

/**
 * Categorizes triglycerides based on mg/dL values
 * @param triglycerides - Triglycerides level in mg/dL
 * @returns Object with variant, message, and level
 */
export const categorizeTG: IBS = (triglycerides: number) => {
  if (triglycerides < 150) {
    return {
      level: 'Desirable Level',
      message: 'Desirable Level',
      variant: TVariantEnum.Success,
    }
  } else {
    return {
      level: 'Undesirable Level',
      message: 'Undesirable Level',
      variant: TVariantEnum.Error,
    }
  }
}

export const getVariantColor = (variant: TVariantEnum) => {
  switch (variant) {
    case TVariantEnum.Success:
      return '#12B76A'
    case TVariantEnum.Pending:
      return '#F79009'
    case TVariantEnum.Danger:
      return '#F04438'
    default:
      return '#E31B23'
  }
}

export const calculateBmiRisk = (val: number) => {
  if (val < 18.5) {
    return { variant: TVariantEnum.Pending, message: 'Under Weight 😒' }
  } else if (val > 18.5 && val <= 24.9) {
    return { variant: TVariantEnum.Success, message: 'Healthy 😍' }
  } else if (val > 24.9 && val < 30) {
    return { variant: TVariantEnum.Danger, message: 'Overweight 😮' }
  } else {
    return { variant: TVariantEnum.Error, message: 'Obese 😱' }
  }
}

export function categorizeBMIWHO2007(age: number, gender: string, bmi: number) {
  if (age < 19) {
    // BMI categories for children and adolescents
    if (gender === 'male') {
      if (bmi < 16) {
        return { variant: TVariantEnum.Error, message: 'Severely Thin 😔' }
      } else if (bmi >= 16 && bmi < 17) {
        return { variant: TVariantEnum.Pending2, message: 'Moderately Thin 😟' }
      } else if (bmi >= 17 && bmi < 18.5) {
        return { variant: TVariantEnum.Warning, message: 'Mildly Thin 🙁' }
      } else if (bmi >= 18.5 && bmi < 25) {
        return { variant: TVariantEnum.Success, message: 'Healthy 😍' }
      } else if (bmi >= 25 && bmi < 30) {
        return { variant: TVariantEnum.Danger, message: 'Overweight 😮' }
      } else {
        return { variant: TVariantEnum.Error, message: 'Obese 😱' }
      }
    } else if (gender === 'female') {
      if (bmi < 16) {
        return { variant: TVariantEnum.Error, message: 'Severely Thin 😔' }
      } else if (bmi >= 16 && bmi < 17) {
        return { variant: TVariantEnum.Pending2, message: 'Moderately Thin 😟' }
      } else if (bmi >= 17 && bmi < 18.5) {
        return { variant: TVariantEnum.Warning, message: 'Mildly Thin 🙁' }
      } else if (bmi >= 18.5 && bmi < 24) {
        return { variant: TVariantEnum.Success, message: 'Healthy 😍' }
      } else if (bmi >= 24 && bmi < 30) {
        return { variant: TVariantEnum.Danger, message: 'Overweight 😮' }
      } else {
        return { variant: TVariantEnum.Error, message: 'Obese 😱' }
      }
    }
  } else {
    // BMI categories for adults
    if (bmi < 16) {
      return { variant: TVariantEnum.Error, message: 'Severely Thin 😔' }
    } else if (bmi >= 16 && bmi < 17) {
      return { variant: TVariantEnum.Pending2, message: 'Moderately Thin 😟' }
    } else if (bmi >= 17 && bmi < 18.5) {
      return { variant: TVariantEnum.Warning, message: 'Mildly Thin 🙁' }
    } else if (bmi >= 18.5 && bmi < 25) {
      return { variant: TVariantEnum.Success, message: 'Healthy 😍' }
    } else if (bmi >= 25 && bmi < 30) {
      return { variant: TVariantEnum.Danger, message: 'Overweight 😮' }
    } else {
      return { variant: TVariantEnum.Error, message: 'Obese 😱' }
    }
  }
}
