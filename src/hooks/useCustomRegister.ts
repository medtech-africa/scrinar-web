import { useFormContext } from 'react-hook-form'
import { useMutateStudentsSurvey } from './queries/useStudentSurvey'
import { useLocalStudentSurvey } from './useLocalParentSurvey'

function dotToNested(obj: Record<string, string>) {
  // const result = {};
  const result: { [key: string]: string | object } = {}

  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split('.')
    let current = result

    keys.forEach((k, index) => {
      if (!current[k]) {
        current[k] = index === keys.length - 1 ? value : {}
      }
      // TODO
      // @ts-expect-error type mismatch
      current = current[k]
    })
  }

  return result
}

export const useCustomRegister = (studentId?: string) => {
  const { register, setValue, watch, control } = useFormContext()
  const { mutate } = useMutateStudentsSurvey(studentId ?? '')

  // const [__, setFormData] = useLocalStorage(
  //   `student_survey_${studentId}`,
  //   {}
  // )
  const { storeStudentSurvey } = useLocalStudentSurvey()

  const customRegister = (name: string, options: any = {}) => {
    const { exclude, ...restOptions } = options
    const { onBlur: originalBlur, ...rest } = register(name, restOptions)

    const handleBlur = () => {
      const currentValue = watch(name)

      if (
        currentValue === 'Other' ||
        currentValue === 'Yes, I have' ||
        currentValue === exclude
      ) {
        return
      }
      const newName = (value: string): string | number =>
        value.toLowerCase().includes('other')
          ? value.replace(/other/gi, '').trim()
          : value

      const key = newName(name)
      const data = dotToNested({ [key]: currentValue })
      // let data = { [key]: currentValue }
      // if (typeof key === 'string' && key.split('.').length === 2) {
      //   const [newKey, nestedKey] = key.split('.')
      //   data = { [newKey]: { [nestedKey]: currentValue } }
      // }

      if (currentValue) {
        storeStudentSurvey(studentId ?? "", data)
        mutate(data)
      }
    }

    return {
      ...rest,
      onBlur: (e: any) => {
        if (originalBlur) originalBlur(e)
        if (studentId) handleBlur()
      },
    }
  }

  return { customRegister, setValue, watch, control }
}

export { useCustomRegister as useStudentCustomRegister }
