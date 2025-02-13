import React from 'react'
import { TextFieldFormElement } from './TextField'
import { TitleFieldFormElement } from './TitleField'
import { TextAreaFieldFormElement } from './TextAreaField'
import { DividerFieldFormElement } from './DividerField'
import { SpacerFieldFormElement } from './SpacerField'
import { NumberFieldFormElement } from './NumberField'
import { DateFieldFormElement } from './DateField'
import { SelectFieldFormElement } from './SelectField'
import { FieldType } from '@/types/forms.types'

export type ElementsType = FieldType

export type FormElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
  type: ElementsType

  construct: (id: string) => FormElementInstance
  validate?: (id: FormElementInstance, value: string) => boolean

  designerBtnElement: {
    icon: React.ElementType
    label: string
  }

  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitFunction
    isInvalid?: boolean
    defaultValue?: string
  }>
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
}

type FormElementsType = {
  [_key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
  text: TextFieldFormElement,
  textarea: TextAreaFieldFormElement,
  number: NumberFieldFormElement,
  select: SelectFieldFormElement,
  radio: TextFieldFormElement,
  checkbox: TextFieldFormElement,
  phone: TextFieldFormElement,
  email: TextFieldFormElement,
  website: TextFieldFormElement,
  date: DateFieldFormElement,
  image: TextFieldFormElement,
  header: TitleFieldFormElement,
  subtitle: TitleFieldFormElement,
  divider: DividerFieldFormElement,
  spacer: SpacerFieldFormElement,
  label: SpacerFieldFormElement,
  multipleChoice: SpacerFieldFormElement,
  dropdown: SpacerFieldFormElement,
}
