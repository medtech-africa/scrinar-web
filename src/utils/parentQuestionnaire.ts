/**
 * Checks if a value should be included in the cleaned data
 */
const isValidValue = (value: any): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string' && value.trim() === '') return false
  if (Array.isArray(value) && value.length === 0) return false
  return true
}

/**
 * Transforms a select option object to its value
 */
const transformSelectOption = (value: any): any => {
  if (
    value &&
    typeof value === 'object' &&
    'label' in value &&
    'value' in value
  ) {
    return value.value
  }
  return value
}

/**
 * Processes array values
 */
const processArray = (arr: any[]): any[] => {
  return arr
    .map((item) => {
      if (Array.isArray(item)) {
        return processArray(item)
      }
      if (item && typeof item === 'object') {
        return cleanFormData(item)
      }
      return transformSelectOption(item)
    })
    .filter(isValidValue)
}

/**
 * Cleans form data by removing empty values and transforming select options
 */
export const cleanFormData = (
  data: Record<string, any>
): Record<string, any> => {
  const cleaned: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    // Handle arrays
    if (Array.isArray(value)) {
      const processedArray = processArray(value)
      if (processedArray.length > 0) {
        cleaned[key] = processedArray
      }
      continue
    }

    // Handle nested objects
    if (value && typeof value === 'object' && !value?.label) {
      const processedObject = cleanFormData(value)
      if (Object.keys(processedObject).length > 0) {
        cleaned[key] = processedObject
      }
      continue
    }

    // Handle primitive values and select options
    const transformedValue = transformSelectOption(value)
    if (isValidValue(transformedValue)) {
      cleaned[key] = transformedValue
    }
  }

  return cleaned
}
