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
  if (systolic < 90 || diastolic < 60) {
    return {
      level: 'Low blood pressure (Hypotension)',
      message: 'Hypotension',
      variant: 'pending',
    }
  } else if (systolic < 120 && diastolic < 80) {
    return {
      level: 'Normal blood pressure',
      message: 'Normal',
      variant: 'success',
    }
  } else if (systolic < 130 && diastolic < 85) {
    return {
      level: 'Elevated blood pressure',
      message: 'Elevated',
      variant: 'warning',
    }
  } else if (systolic < 140 || diastolic < 90) {
    return {
      level: 'Stage 1 hypertension (Mild)',
      message: 'Mild',
      variant: 'danger',
    }
  } else if (systolic < 180 && diastolic < 120) {
    return {
      level: 'Stage 2 hypertension (Moderate)',
      message: 'Moderate',
      variant: 'pending2',
    }
  } else {
    return {
      level: 'Stage 3 hypertension (Severe)',
      message: 'Severe',
      variant: 'error',
    }
  }
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
  } else if (glucoseLevel >= 70 && glucoseLevel < 100) {
    return {
      level: 'Normal blood sugar',
      message: 'Normal',
      variant: 'success',
    }
  } else if (glucoseLevel >= 100 && glucoseLevel < 126) {
    return { level: 'Prediabetes', message: 'Prediabetes', variant: 'danger' }
  } else if (glucoseLevel >= 126) {
    return { level: 'Diabetes', message: 'Diabetes', variant: 'error' }
  } else {
    return { level: 'Unknown', message: 'Unknown', variant: 'pending2' }
  }
}
