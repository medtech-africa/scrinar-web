import { useFormContext } from 'react-hook-form'

type OptionsWithOtherFieldProps = {
  studentId?: string
  label?: string | React.ReactNode
  options?: string[]
  form: {
    id: string
    otherId?: string
  }
  otherValue?: string
  othersIndex?: number
  disabled?: boolean
  defaultValue?: string
}
export const OptionWithRadioField = ({
  label = '',
  options = [],
  form,
  disabled = false,
}: OptionsWithOtherFieldProps) => {
  const { register } = useFormContext()

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
                {...register(form.id)}
                disabled={disabled}
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
