import { useFormContext } from 'react-hook-form'
import { useMutateStudentsSurvey } from './queries/useStudentSurvey'

export const useCustomRegister = (studentId: string) => {
  const { register, setValue, watch } = useFormContext()
  const { mutate } = useMutateStudentsSurvey(studentId)

  const customRegister = (name: string, options: any = {}) => {
    const { onBlur: originalBlur, ...rest } = register(name, options)

    const handleBlur = () => {
      const currentValue = watch(name)

      if (currentValue === 'Other' || currentValue === 'Yes, I have') {
        return
      }
      const newName = (value: string): string | number =>
        value.toLowerCase().includes('other')
          ? value.replace(/other/gi, '').trim()
          : value

      const key = newName(name)
      const data = { [key]: currentValue }
      if (currentValue) {
        mutate(data)
      }
    }

    return {
      ...rest,
      onBlur: (e: any) => {
        if (originalBlur) originalBlur(e)
        handleBlur()
      },
    }
  }

  return { customRegister, setValue, watch }
}
