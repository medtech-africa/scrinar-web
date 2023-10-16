const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'instructor', label: 'Instructor' },
]
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]
const schoolTypeOptions = [
  { value: 'private', label: 'Private' },
  { value: 'public', label: 'Public' },
]
const educationalInstitutionOptions = [
  { value: 'nursery', label: 'Nursery' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
]
const schoolTransportQuestionOptions = [
  { value: 'on foot', label: 'On Foot' },
  { value: 'parent car', label: 'Parent Car' },
  { value: 'school bus', label: 'School Bus' },
  {
    value: 'Public transport (taxi, bus or okada)',
    label: 'Public transport (taxi, bus or okada)',
  },
  { value: 'bicycle', label: 'Bicycle' },
  { value: 'others', label: 'Others' },
]
const sportQuestionOptions = [
  { value: 'rarely/never', label: 'Rarely / Never' },
  {
    value: 'less than 3 days in the week',
    label: 'less than 3 days in the week',
  },
  { value: '3 or more days in the week', label: '3 or more days in the week' },
  { value: 'daily', label: 'Daily' },
]
const foodAmountOptions = [
  {
    value: 'Less than usual for age group',
    label: 'Less than usual for age group',
  },
  {
    value: 'Same/usual for age group',
    label: 'Same/usual for age group',
  },
  {
    value: 'More than usual for age group',
    label: 'More than usual for age group',
  },
]
export {
  roleOptions,
  genderOptions,
  schoolTypeOptions,
  educationalInstitutionOptions,
  schoolTransportQuestionOptions,
  sportQuestionOptions,
  foodAmountOptions,
}
