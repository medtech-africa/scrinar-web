import { List } from 'lucide-react'
import {
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from './FormElements'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDesigner } from '../../hooks/useDesigner'
import { PropertiesForm } from '../PropertiesForm'
import { FieldContent } from '@/features/form-builder/components/FieldContent'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) => {
  const element = elementInstance as CustomInstance
  return <FieldContent element={element} />
}
const FormComponent = ({
  elementInstance,
  submitValue,
}: {
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
}) => {
  const element = elementInstance as CustomInstance
  return (
    <div className="flex flex-col gap-2 w-full">
      <FieldContent element={element} submitValue={submitValue} />
    </div>
  )
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([]),
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
      placeholder: element.extraAttributes?.placeholder,
      options: element.extraAttributes?.options,
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
        form.handleSubmit(applyChanges)
        setSelectedElement(null)
      }}
    >
      <PropertiesForm<propertiesFormSchemaType> control={form.control} />
    </form>
  )
}

const extraAttributes = {
  label: 'Select field',
  description: 'Helper',
  required: false,
  placeholder: 'Enter a value here...',
  options: ['Option 1', 'Option 2', 'Option 3'],
}

const type = 'select'

export const SelectFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: List,
    label: 'Select Field',
  },
}
