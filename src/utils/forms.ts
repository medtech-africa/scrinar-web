import { FieldType, FormField, FormFieldModel } from '@/types/forms.types'

export function convertSingleToApiFormField(
  formField: FormField
): FormFieldModel {
  const baseModel: FormFieldModel = {
    fieldName: formField.name,
    type: formField.type,
    title: formField.label,
    description: formField.description,
    hint: formField.placeholder,
    order: 1, // Default order or set dynamically if needed
    required: formField.required || false,
    unit: formField.unit,
  }

  // Add choices if options are present
  if (formField.options && formField.options.length > 0) {
    baseModel.choices = formField.options.map((option) => ({
      name: option.toLowerCase().replace(/\s+/g, '_'),
      label: option,
    }))
  }

  return baseModel
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
