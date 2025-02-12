'use client'

import React from 'react'
import { useDesigner } from '../hooks/useDesigner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface PropertiesFormProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
}

export const PropertiesForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
}: PropertiesFormProps<TFieldValues>) => {
  const { selectedElement, setSelectedElement, updateElement } = useDesigner()

  if (!selectedElement) return null

  const attributes = selectedElement.extraAttributes || {}

  return (
    <div className="space-y-4">
      <div>
        <Label>Field Label</Label>
        <Controller
          name={'label' as Path<TFieldValues>}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChange={onChange} />
          )}
        />
      </div>
      <div>
        <Label>Field Name</Label>
        <Controller
          name={'name' as Path<TFieldValues>}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChange={onChange} />
          )}
        />
      </div>
      <div>
        <Label>Field Description (optional)</Label>
        <Controller
          name={'description' as Path<TFieldValues>}
          control={control}
          render={({ field }) => (
            <Input value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {['text', 'textarea', 'email', 'phone', 'website', 'number'].includes(
        selectedElement.type
      ) && (
        <div>
          <Label>Placeholder</Label>
          <Controller
            name={'placeholder' as Path<TFieldValues>}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
      )}
      {['number'].includes(selectedElement.type) && (
        <div>
          <Label>Unit (e.g, kg, lb, gram, etc)</Label>
          <Controller
            name={'unit' as Path<TFieldValues>}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
      )}
      {['select', 'radio', 'multipleChoice', 'checkbox'].includes(
        selectedElement.type
      ) && (
        <div>
          <Label>Options</Label>
          <div className="space-y-2">
            {(attributes.options as string[])?.map((option, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(attributes.options || [])]
                    newOptions[index] = e.target.value
                    updateElement(selectedElement.id, {
                      ...selectedElement,
                      extraAttributes: {
                        ...selectedElement.extraAttributes,
                        options: newOptions,
                      },
                    })
                  }}
                />
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => {
                    const newOptions = (attributes.options as string[])?.filter(
                      (_, i) => i !== index
                    )

                    console.log('🚀 ~ newOptions:', newOptions)

                    updateElement(selectedElement.id, {
                      ...selectedElement,
                      extraAttributes: {
                        ...selectedElement.extraAttributes,
                        options: newOptions,
                      },
                    })
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="tertiary"
              size="sm"
              onClick={() => {
                updateElement(selectedElement.id, {
                  ...selectedElement,
                  extraAttributes: {
                    ...selectedElement.extraAttributes,
                    options: [
                      ...(attributes.options || []),
                      `Option ${(attributes.options?.length || 0) + 1}`,
                    ],
                  },
                })
              }}
            >
              Add Option
            </Button>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Switch
          checked={attributes.required}
          onCheckedChange={(checked) =>
            updateElement(selectedElement.id, {
              ...selectedElement,
              extraAttributes: {
                ...selectedElement.extraAttributes,
                required: checked,
              },
            })
          }
        />
        <Label>Required</Label>
      </div>
      <div className="flex w-full justify-between">
        <Button variant="tertiary" onClick={() => setSelectedElement(null)}>
          Cancel
        </Button>
        <Button
          type="submit"
          // loading={isPending || editLoading}
          // onClick={() => handleFieldUpdate(selectedElement)}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
