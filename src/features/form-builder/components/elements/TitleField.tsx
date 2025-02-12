import { Heading } from 'lucide-react'
import {
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from './FormElements'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDesigner } from '../../hooks/useDesigner'
import { FieldContent } from '@/features/form-builder/components/FieldContent'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

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
      <Label>Title field</Label>
      <p className="text-xl">{element.extraAttributes?.label}</p>
    </div>
  )
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
  name: z.string().min(2).max(50),
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
      name: element.extraAttributes?.name,
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
      // onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit(applyChanges)()
        setSelectedElement(null)
      }}
    >
      <div>
        <Label>Field Label</Label>
        <Controller
          name={'label'}
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChange={onChange} />
          )}
        />
      </div>
      <div className="flex w-full justify-between">
        <Button
          variant="tertiary"
          onClick={() => setSelectedElement(null)}
          type="button"
        >
          Cancel
        </Button>
        <Button type="submit" loading={form.formState.isSubmitting}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}

const type = 'header'

const extraAttributes = {
  label: 'Title field',
  name: `title_${crypto.randomUUID()}`,
}

export const TitleFieldFormElement: FormElement = {
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
    icon: Heading,
    label: 'Title Field',
  },
}
