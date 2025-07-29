import { useNcdFilter } from '@/app/dashboard/risk-assessment/NcdFilterContext'
import React from 'react'

/**
 * Custom hook that returns a function to append red asterisk (*) to field labels
 * when the field is required for the selected assessment type
 *
 * @returns A function that accepts a string (field label) and returns the label with red asterisk if required
 *
 * @example
 * ```tsx
 * const isRequiredField = useRequiredFieldLabel()
 *
 * <Input
 *   label={isRequiredField("PEF Level (L/min)", "copd.pefLevel")}
 *   // ... other props
 * />
 * ```
 */
export const useRequiredFieldLabel = () => {
  const { isFieldRequired } = useNcdFilter()

  // eslint-disable-next-line react/display-name
  return (
    label: string,
    fieldPath: string,
    formData?: any
  ): React.ReactNode => {
    const isRequired = isFieldRequired(fieldPath, formData)
    if (isRequired) {
      return (
        <span>
          {label} <span className="text-red-500">*</span>
        </span>
      )
    }
    return label
  }
}
