// Types
export type FieldType =
  | 'number'
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'phone'
  | 'email'
  | 'website'
  | 'date'
  | 'divider'
  | 'image'
  | 'header'
  | 'label'
  | 'multipleChoice'
  | 'dropdown'

export interface FormField {
  id: string
  type: FieldType
  label: string
  name: string
  description?: string
  required?: boolean
  options?: string[]
  placeholder?: string
  unit?: string
}

export type FormModel = {
  title: string
  description: string
  state: string
  updatedAt: string
  createdAt: string
  id: string
  locationEnabled: boolean
}

type Appearance = {
  type: 'slider' | 'text_input' | string
  parameters?: {
    min?: number
    max?: number
    step?: number
  }
}
type Constraint = {
  expression: string
  message: string
}

type Relevant = {
  expression: string
  context: string
}

export type FormFieldModel = {
  id?: string
  fieldName: string
  type: string
  title: string
  description?: string
  hint?: string
  appearance?: Appearance
  choices?: {
    name: string
    label: string
    image?: string
  }[]
  order: number
  constraint?: Constraint
  relevant?: Relevant
  unit?: string
  required: boolean
}
