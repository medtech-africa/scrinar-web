import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select } from '@/components/ui/select'
import { TextArea } from '@/components/ui/textarea'
import { FormField } from '@/types/forms.types'
import { Image } from 'lucide-react'
import { FormElementInstance, SubmitFunction } from './elements/FormElements'
import React from 'react'

const Wrapper = ({
  children,
  field,
}: {
  children: React.ReactNode
  field: FormField
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="label">
        {field?.label} {field.required && '*'}
      </div>
      {children}
      {field.description && (
        <div className="text-xs text-grey-500">{field.description}</div>
      )}
    </div>
  )
}

export const FieldContent = ({
  element,
  submitValue,
}: {
  element: FormElementInstance
  submitValue?: SubmitFunction
}) => {
  // const [value, setValue] = React.useState('')

  const field = element.extraAttributes as FormField

  switch (element.type) {
    case 'number':
      return (
        <Wrapper field={field}>
          <Input
            placeholder={field.placeholder}
            type="number"
            className="w-full"
            // onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => submitValue && submitValue(field.id, e.target.value)}
            // value={value}
          />
        </Wrapper>
      )
    case 'text':
      return (
        <div className="flex flex-col gap-2 w-full">
          <div className="label">
            {field?.label} {field.required && '*'}
          </div>
          <Input
            readOnly
            disabled
            placeholder={field.placeholder}
            className="w-full"
          />
          {field.description && (
            <div className="text-xs text-grey-500">{field.description}</div>
          )}
        </div>
      )
    case 'textarea':
      return (
        <Wrapper field={field}>
          <TextArea
            placeholder={field.placeholder}
            className="w-full"
            onBlur={(e) => submitValue && submitValue(field.id, e.target.value)}
          />
        </Wrapper>
      )
    case 'select':
      return (
        <Wrapper field={field}>
          <Select
            placeholder={field.placeholder || 'Select an option'}
            options={field.options?.map((option) => ({
              label: option,
              value: option,
            }))}
          />
        </Wrapper>
      )
    case 'radio':
      return (
        <Wrapper field={field}>
          <RadioGroup>
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>{' '}
        </Wrapper>
      )
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          {field.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox id={`${field.id}-${option}`} value={option} />
              <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      )
    case 'date':
      return (
        <Wrapper field={field}>
          <Calendar mode="single" className="rounded-md border" />
        </Wrapper>
      )
    case 'header':
      return <h2 className="text-xl font-bold">{field.label}</h2>
    case 'divider':
      return <hr className="my-4" />
    case 'image':
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm text-gray-600">Upload Image</span>
        </div>
      )
    default:
      return <Input placeholder={field.placeholder} className="w-full" />
  }
}
