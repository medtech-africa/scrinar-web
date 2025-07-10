import { useNcdFilter } from '@/app/dashboard/risk-assessment/NcdFilterContext'

/**
 * Custom hook that returns a function to append asterisk (*) to field labels
 * when the field is required for the selected assessment type
 *
 * @returns A function that accepts a string (field label) and returns the label with asterisk if required
 *
 * @example
 * ```tsx
 * const isRequiredField = useRequiredFieldLabel()
 *
 * <Input
 *   label={isRequiredField("PEF Level (L/min)")}
 *   // ... other props
 * />
 * ```
 */
export const useRequiredFieldLabel = () => {
  const { isFieldRequired } = useNcdFilter()

  return (label: string, fieldPath: string) => {
    const isRequired = isFieldRequired(fieldPath)
    return isRequired ? `${label} (*)` : label
  }
}
