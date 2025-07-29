// convert string[] to array of {value, label}
export const convertStringsToOptionArray = (
  values: string[] | [string, string][] = []
) => {
  if (Array.isArray(values) && values.length > 0 && Array.isArray(values[0])) {
    return (values as [string, string][]).map(([label, value]) => ({
      value,
      label,
    }))
  }
  return values.map((value) => ({
    value,
    label: value,
  }))
}
export const convertStringToOption = (value = '') => {
  return {
    value,
    label: value,
  }
}
