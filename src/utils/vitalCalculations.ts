type v =
  | 'danger'
  | 'pending'
  | 'success'
  | 'warning'
  | 'error'
  | 'pending2'
  | null
  | undefined
type IBMI = (val: number) => { variant: v; message: string }
type IBP = (
  systolic: number,
  diastolic: number
) => { variant: v; message: string; level: string }
type IBS = (bs: number) => { variant: v; message: string; level: string }

export const calculateBloodPressureRisk: IBP = (
  systolic: number,
  diastolic: number
) => {
  if (systolic < 91 || diastolic < 61) {
    return {
      level: 'Low blood pressure (Hypotension)',
      message: 'Hypotension',
      variant: 'pending',
    }
  } else if (systolic < 121 && diastolic < 81) {
    return {
      level: 'Normal blood pressure',
      message: 'Normal',
      variant: 'success',
    }
  } else if (
    systolic >= 120 &&
    systolic <= 139 &&
    diastolic >= 80 &&
    diastolic <= 89
  ) {
    return {
      level: 'Prehypertension',
      message: 'Prehypertension',
      variant: 'warning',
    }
  } else systolic >= 140 && diastolic >= 90
  {
    return {
      level: 'Hypertension',
      message: 'Hypertension',
      variant: 'danger',
    }
  }
  // if (systolic < 91 || diastolic < 61) {
  //   return {
  //     level: 'Low blood pressure (Hypotension)',
  //     message: 'Hypotension',
  //     variant: 'pending',
  //   }
  // } else if (systolic < 121 && diastolic < 81) {
  //   return {
  //     level: 'Normal blood pressure',
  //     message: 'Normal',
  //     variant: 'success',
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
  //     variant: 'danger',
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
  //     variant: 'error',
  //   }
  // }
}

export const calculateBmiRisk: IBMI = (val: number) => {
  if (val < 18.5) {
    return { variant: 'pending', message: 'Under Weight 😒' }
  } else if (val > 18.5 && val <= 24.9) {
    return { variant: 'success', message: 'Healthy 😍' }
  } else if (val > 24.9 && val < 30) {
    return { variant: 'danger', message: 'Overweight 😮' }
  } else {
    return { variant: 'error', message: 'Obese 😱' }
  }
}

export const categorizeBloodSugarLevel: IBS = (glucoseLevel: number) => {
  if (glucoseLevel < 70) {
    return {
      level: 'Low blood sugar (Hypoglycemia)',
      message: 'Hypoglycemia',
      variant: 'pending',
    }
  } else if (glucoseLevel >= 126 && glucoseLevel < 200) {
    return {
      level: 'Normal blood sugar',
      message: 'Normal',
      variant: 'success',
    }
  } else if (glucoseLevel >= 100 && glucoseLevel < 126) {
    return { level: 'Prediabetes', message: 'Prediabetes', variant: 'danger' }
  } else if (glucoseLevel >= 200) {
    return { level: 'Diabetes', message: 'Diabetes', variant: 'error' }
  } else {
    return { level: 'Unknown', message: 'Unknown', variant: 'pending2' }
  }
}
export const categorizeTotalCholesterol: IBS = (totalCholesterol: number) => {
  if (totalCholesterol > 170) {
    return {
      level: 'High Cholesterol',
      message: 'High',
      variant: 'error',
    }
  } else {
    return {
      level: 'Normal Cholesterol',
      message: 'Normal',
      variant: 'success',
    }
  }
}
export const getVariantColor = (variant: 'success' | 'pending' | 'danger') => {
  const colorMap = {
    success: '#12B76A',
    pending: '#F79009',
    danger: '#F04438',
  }

  return colorMap[variant] || '#E31B23'
}
