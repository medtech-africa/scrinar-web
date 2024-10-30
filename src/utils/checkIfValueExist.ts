export function checkIfValueExists<T extends { value: string }>(
  arr: T[],
  searchTerm: string,
  fieldName: string,
  setValue: (name: string, value: string) => void
): string {
  if (searchTerm !== undefined) {
    const foundOption = arr.find((option) =>
      option?.value.toLowerCase().includes(searchTerm?.toLowerCase())
    )

    if (foundOption) {
      return foundOption?.value
    } else {
      setValue(`${fieldName}Other`, searchTerm)
      return 'Other'
    }
  }

  return ''
}
export function cleanObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]

    // Remove entries with value 'Other' or undefined
    if (value === 'Other' || value === undefined) {
      return
    }

    // If key ends with 'Other', remove the 'Other' part from the key
    const cleanedKey = key.endsWith('Other') ? key.replace(/Other$/, '') : key

    // Add cleaned key-value pair to the result object
    result[cleanedKey] = value
  })

  return result
}
