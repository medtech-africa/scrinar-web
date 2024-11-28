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
export const OptionWithRadioField = ({
  label = '',
  options = [],
  form,
}: OptionsWithOtherFieldProps) => {
  const { customRegister, watch } = useCustomRegister()

  const currentValue = watch(form.id)

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
                {...customRegister(form.id)}
                defaultChecked={option === currentValue}
                className="mr-2"
              />
              <label htmlFor={id} className="text-sm">
                {option}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
