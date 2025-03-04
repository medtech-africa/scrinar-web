import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select } from '@/components/ui/select'
import { TextArea } from '@/components/ui/textarea'
import { FormField } from '@/types/forms.types'
import { Calendar1, Image } from 'lucide-react'
import { FormElementInstance, SubmitFunction } from './elements/FormElements'
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
            // readOnly
            // disabled
            placeholder={field.placeholder}
            className="w-full"
            onBlur={(e) => submitValue && submitValue(field.id, e.target.value)}
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
            onBlur={(e) => submitValue && submitValue(field.id, e.target.value)}
          />
        </Wrapper>
      )
    case 'radio':
      return (
        <Wrapper field={field}>
          <RadioGroup
            onValueChange={(val) =>
              submitValue ? submitValue(field.id, val) : undefined
            }
          >
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
              <Checkbox
                id={`${field.id}-${option}`}
                value={option}
                // onCheckedChange={(checked) => {
                //   return checked
                //     ? field.onChange([...field.value, item.id])
                //     : field.onChange(
                //         field.value?.filter((value) => value !== item.id)
                //       )
                // }}
              />
              <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      )
    case 'date':
      return (
        <Wrapper field={field}>
          <Popover>
            <PopoverTrigger asChild>
              {/* <FormControl> */}
              <Button
                variant={'default'}
                className={cn('w-full justify-start text-left font-normal', {
                  // 'border-red-500': error,
                })}
              >
                <Calendar1 className="mr-2 h-4 w-4" />
                {/* <span>{date ? date.toLocaleDateString() : 'Pick a date'}</span> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                onSelect={(date) =>
                  date &&
                  submitValue &&
                  submitValue(field.id, date as unknown as string)
                }
                className="rounded-md border"
                // disabled={(date) =>
                //   date > new Date() || date < new Date('1900-01-01')
                // }
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
      return (
        <Input
          placeholder={field.placeholder}
          className="w-full"
          onBlur={(e) => submitValue && submitValue(field.id, e.target.value)}
        />
      )
  }
}
