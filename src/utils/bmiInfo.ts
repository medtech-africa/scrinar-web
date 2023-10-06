type v =
  | 'danger'
  | 'pending'
  | 'success'
  | 'warning'
  | 'error'
  | 'pending2'
  | null
  | undefined
type Irs = (val: number) => { variant: v; message: string }

const bmiInfo: Irs = (val: number) => {
  if (val < 18.5) {
    return { variant: 'warning', message: 'Under Weight 😒' }
  } else if (val > 18.5 && val <= 24.9) {
    return { variant: 'success', message: 'Healthy 😍' }
  } else if (val > 24.9 && val < 30) {
    return { variant: 'pending2', message: 'Overweight 😮' }
  } else {
    return { variant: 'danger', message: 'Obese 😱' }
  }
}
export default bmiInfo
