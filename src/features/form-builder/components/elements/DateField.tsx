import { Calendar1, CalendarDays } from 'lucide-react'
import {
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from './FormElements'
import * as z from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDesigner } from '../../hooks/useDesigner'
import { PropertiesForm } from '../PropertiesForm'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) => {
  const element = elementInstance as CustomInstance
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="label">
        {element.extraAttributes?.label}{' '}
        {element.extraAttributes.required && '*'}
      </div>
      <Button
        variant={'secondary'}
        className="w-full justify-start text-left font-normal"
      >
        <Calendar1 className="mr-2 h-4 w-4" />
        <span>Pick a date</span>
      </Button>
      {element.extraAttributes.description && (
        <div className="text-xs text-grey-500">
          {element.extraAttributes.description}
        </div>
      )}
    </div>
  )
}
const FormComponent = ({
  elementInstance,
  submitValue,
  defaultValue,
  isInvalid,
}: {
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  defaultValue?: string
  isInvalid?: boolean
}) => {
  const element = elementInstance as CustomInstance
  const extraAttributes = element.extraAttributes

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  )
  const [error, setError] = useState(false)

  useEffect(() => setError(isInvalid === true), [isInvalid])

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="label">
        {extraAttributes?.label} {extraAttributes.required && '*'}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'secondary'}
            className={cn('w-full justify-start text-left font-normal', {
              'border-red-500': error,
            })}
          >
            <Calendar1 className="mr-2 h-4 w-4" />
            <span>{date ? date.toLocaleDateString() : 'Pick a date'}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* <DatePicker
            onChange={(val) => {
              setDate(val)
              submitValue && submitValue(val)
            }}
            value={date}
          /> */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)

              if (!submitValue) return
              const value = date?.toUTCString() || ''
              const valid = DateFieldFormElement.validate?.(element, value)
              setError(!valid)
              submitValue(element.id, value)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {extraAttributes.description && (
        <div className="text-xs text-grey-500">
          {extraAttributes.description}
        </div>
      )}
    </div>
  )
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  required: z.boolean().default(false),
})

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>
const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) => {
  const { updateElement, setSelectedElement } = useDesigner()
  const element = elementInstance as CustomInstance
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes?.label,
      description: element.extraAttributes?.description,
      required: element.extraAttributes?.required,
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: propertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: values,
    })
  }

  return (
    <form
      onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(applyChanges)(e)
        setSelectedElement(null)
      }}
    >
      <FormProvider {...form}>
        <PropertiesForm<propertiesFormSchemaType> control={form.control} />
      </FormProvider>
    </form>
  )
}

const extraAttributes = {
  label: 'Date field',
  description: 'Pick a date',
  required: false,
}
const type = 'date'
export const DateFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement, currentValue) => {
    const elem = formElement as CustomInstance
    if (elem.extraAttributes.required) return currentValue.length > 0
    return true
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: CalendarDays,
    label: 'Date Field',
  },
}
