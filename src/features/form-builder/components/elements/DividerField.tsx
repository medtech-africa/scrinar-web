import { Minus } from 'lucide-react'
import {
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from './FormElements'
import { FieldContent } from '@/features/form-builder/components/FieldContent'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const DesignerComponent = ({}: { elementInstance: FormElementInstance }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>Divider field</Label>
      <Separator />
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

const PropertiesComponent = ({}: { elementInstance: FormElementInstance }) => {
  return <p>No properties for this field</p>
}

const type = 'divider'

const extraAttributes = {
  label: 'Divider field',
}

export const DividerFieldFormElement: FormElement = {
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
    icon: Minus,
    label: 'Divider Field',
  },
}
