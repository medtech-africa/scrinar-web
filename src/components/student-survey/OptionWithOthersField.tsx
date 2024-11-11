import { useCustomRegister } from '@/hooks/useCustomRegister'

type OptionsWithOtherFieldProps = {
  studentId?: string
  label?: string
  options?: string[]
  form: {
    id: string
    otherId?: string
  }
  otherValue?: string
  othersIndex?: number
}
export const OptionsWithOthersField = ({
  studentId = '',
  label = '',
  options = [],
  form,
  otherValue = 'Other',
  othersIndex,
}: OptionsWithOtherFieldProps) => {
  const { customRegister, watch } = useCustomRegister(studentId)

  const indexOfOthersOption = othersIndex || options.length - 1

  const lastItem = options[indexOfOthersOption] || otherValue

  const otherFieldID = form.id + 'Other'
  const currentValue = watch(form.id)
  const showOtherInputField = () => {
    if (
      (currentValue && !options.some((option) => option === currentValue)) ||
      currentValue === lastItem
    ) {
      return true
    }

    return false
  }

  return (
    <div className="form-group">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="space-y-2">
        {options.map((option, index) => {
          const id = `${form?.id}-${index}`
          return (
            <div key={id} className="flex items-center">
              <input
                type="radio"
                id={id}
                value={option}
                {...customRegister(form.id, { exclude: lastItem })}
                defaultChecked={
                  option === lastItem &&
                  currentValue &&
                  !options.some((option) => option === currentValue)
                }
                className="mr-2"
              />
              <label htmlFor={id} className="text-sm">
                {option}
              </label>
            </div>
          )
        })}
        {showOtherInputField() && (
          <input
            type="text"
            {...customRegister(otherFieldID)}
            defaultValue={
              currentValue && !options.some((option) => option === currentValue)
                ? currentValue
                : ''
            }
            placeholder="Please specify"
            className="mt-2 border p-2 w-full"
          />
        )}
      </div>
    </div>
  )
}
