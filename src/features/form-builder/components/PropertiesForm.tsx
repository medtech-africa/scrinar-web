'use client'

import React from 'react'
import { useDesigner } from '../hooks/useDesigner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from 'react-hook-form'
import { Plus, X } from 'lucide-react'

interface PropertiesFormProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>
}

export const PropertiesForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
}: PropertiesFormProps<TFieldValues>) => {
  const { selectedElement, setSelectedElement } = useDesigner()

  const { watch, setValue } = useFormContext<{
    options: string[]
  }>()

  if (!selectedElement) return null

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
        <p className="text-xs text-gray-600">
          The label of the field. It will be displayed above the field.
        </p>
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
        <p className="text-xs text-gray-600">
          Unique name of the field. It will be used in the form submission and
          charts.
        </p>
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
        <p className="text-xs text-gray-600">
          The helper text of the field. It will be displayed below the field.
        </p>
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
          <p className="text-xs text-gray-600">The placeholder of the field</p>
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
        <div className="space-y-2">
          <Label className="flex items-center justify-between">
            Options
            <Button
              variant="tertiary"
              size="sm"
              type="button"
              onClick={() => {
                setValue('options', [
                  ...watch('options', []),
                  `Option ${(watch('options', []).length || 0) + 1}`,
                ])
              }}
              leadingIcon={<Plus size={16} />}
            >
              Add
            </Button>
          </Label>
          <Controller
            name={'options' as Path<TFieldValues>}
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                {watch('options')?.map((option, index) => (
                  <div key={'option_' + index} className="flex space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value
                        field.onChange(field.value)
                      }}
                    />
                    <Button
                      variant="tertiary"
                      className="p-1"
                      onlyIcon={<X className="" size={16} />}
                      size="sm"
                      type="button"
                      onClick={() => {
                        const newOptions = [...field.value]
                        newOptions.splice(index, 1)
                        field.onChange(newOptions)
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          />
          <p className="text-xs text-gray-600">The options of the field</p>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <Controller
          name={'required' as Path<TFieldValues>}
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          )}
        />

        <Label>Required</Label>
      </div>
      <div className="flex w-full justify-between">
        <Button
          variant="tertiary"
          onClick={() => setSelectedElement(null)}
          type="button"
        >
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
