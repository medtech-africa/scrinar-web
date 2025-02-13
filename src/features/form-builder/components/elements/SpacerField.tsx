import { LucideSeparatorHorizontal } from 'lucide-react'
import {
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from './FormElements'
import { Label } from '@/components/ui/label'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useDesigner } from '../../hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Slider } from '@/components/ui/slider'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) => {
  const { height } = (elementInstance as CustomInstance).extraAttributes

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Spacer field: {height}px</Label>
      <LucideSeparatorHorizontal className="h-8 w-8" />
    </div>
  )
}
const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
}) => {
  const element = elementInstance as CustomInstance
  const { height } = element.extraAttributes

  return (
    <div className="flex flex-col gap-2 w-full">
      <div style={{ height }} className="w-full" />
    </div>
  )
}

const propertiesSchema = z.object({
  height: z.number().min(1).max(500),
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
    mode: 'onSubmit',
    defaultValues: {
      height: element.extraAttributes?.height,
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
      <div className="space-y-3">
        <Label>Height (px): {form.watch('height')}</Label>
        <Controller
          name={'height'}
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Slider
              defaultValue={[value]}
              min={1}
              max={200}
              step={1}
              onValueChange={(value) => onChange(value[0])}
            />
          )}
        />
      </div>
    </form>
  )
}

const type = 'spacer'

const extraAttributes = {
  height: 10,
  label: 'spacer',
}

export const SpacerFieldFormElement: FormElement = {
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
    icon: LucideSeparatorHorizontal,
    label: 'Spacer Field',
  },
}
