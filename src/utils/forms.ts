import { FieldType, FormField, FormFieldModel } from '@/types/forms'

export function convertToApiFormField(
  formFields: FormField[]
): FormFieldModel[] {
  return formFields.map((field, index) => {
    const baseModel: FormFieldModel = {
      fieldName: field.name,
      type: field.type,
      title: field.label,
      description: field.description,
      hint: field.placeholder,
      order: index + 1,
      required: field.required || false,
      unit: field.unit,
    }

    // Add choices if options are present
    if (field.options && field.options.length > 0) {
      baseModel.choices = field.options.map((option) => ({
        name: option.toLowerCase().replace(/\s+/g, '_'),
        label: option,
      }))
    }

    return baseModel
  })
}

// Utility function to convert FormFieldModel[] to FormField[]
export function convertToFormField(
  formFieldModels: FormFieldModel[]
): FormField[] {
  return formFieldModels.map((model) => {
    const baseField: FormField = {
      id: model?.id ?? model?.fieldName, // Using fieldName as id since it should be unique
      type: model.type as FieldType,
      label: model.title,
      name: model.fieldName,
      required: model.required,
      placeholder: model.hint,
      unit: model.unit,
    }

    // Add options if choices are present
    if (model.choices && model.choices.length > 0) {
      baseField.options = model.choices.map((choice) => choice.label)
    }

    return baseField
  })
}
