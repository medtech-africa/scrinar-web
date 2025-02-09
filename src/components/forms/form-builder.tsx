'use client'

import React, { useState, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TextArea as Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import {
  Phone,
  Mail,
  Globe,
  Image,
  Type,
  TextQuote,
  Check,
  List,
  CalendarDays,
  Heading,
  Minus,
  GripVertical,
  FileDigit,
} from 'lucide-react'
import { IconPicker } from '../ui/icon-picker'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import { FormField, FormModel, FieldType, FormFieldModel } from '@/types/forms'
import { convertToApiFormField, convertToFormField } from '@/utils/forms'
import { redirect } from 'next/navigation'

interface Props {
  form?: FormModel
  questions?: FormFieldModel[]
}

interface FormData {
  id: string
  name: string
  fields: FormField[]
}

const FIELD_COMPONENTS = [
  { type: 'text', icon: Type, label: 'Text Input' },
  { type: 'textarea', icon: TextQuote, label: 'Long Text' },
  { type: 'number', icon: FileDigit, label: 'Number Input' },
  { type: 'select', icon: List, label: 'Select' },
  { type: 'radio', icon: List, label: 'Radio Group' },
  { type: 'checkbox', icon: Check, label: 'Checkbox' },
  { type: 'phone', icon: Phone, label: 'Phone' },
  { type: 'email', icon: Mail, label: 'Email' },
  { type: 'website', icon: Globe, label: 'Website' },
  { type: 'date', icon: CalendarDays, label: 'Date' },
  { type: 'image', icon: Image, label: 'Image' },
  { type: 'header', icon: Heading, label: 'Header' },
  { type: 'divider', icon: Minus, label: 'Divider' },
]

const renderFieldContent = (field: FormField) => {
  switch (field.type) {
    case 'number':
      return (
        <Input
          placeholder={field.placeholder}
          type="number"
          className="w-full"
        />
      )
    case 'text':
      return <Input placeholder={field.placeholder} className="w-full" />
    case 'textarea':
      return <Textarea placeholder={field.placeholder} className="w-full" />
    case 'select':
      return (
        <Select
          placeholder={field.placeholder || 'Select an option'}
          options={field.options?.map((option) => ({
            label: option,
            value: option,
          }))}
        />
      )
    case 'radio':
      return (
        <RadioGroup>
          {field.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${field.id}-${option}`} />
              <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          {field.options?.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox id={`${field.id}-${option}`} value={option} />
              <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </div>
      )
    case 'date':
      return <Calendar mode="single" className="rounded-md border" />
    case 'header':
      return <h2 className="text-xl font-bold">{field.label}</h2>
    case 'divider':
      return <hr className="my-4" />
    case 'image':
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm text-gray-600">Upload Image</span>
        </div>
      )
    default:
      return <Input placeholder={field.placeholder} className="w-full" />
  }
}

const SortableField = ({
  field,
  onEdit,
  onDelete,
}: {
  field: FormField
  onEdit: (field: FormField) => void
  onDelete: (field: FormField) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 p-4 rounded group relative"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      <div className="ml-6">
        <div className="flex justify-between items-center mb-2">
          <Label>{field.label}</Label>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => onEdit(field)}>
              Edit
            </Button>
            <Button
              variant="primary"
              className="py-3 px-3"
              onClick={() => onDelete(field)}
            >
              <IconPicker icon="trash" />
            </Button>
          </div>
        </div>
        {renderFieldContent(field)}
      </div>
    </div>
  )
}

const FormBuilder = ({ form, questions }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    id: crypto.randomUUID(),
    name: '',
    fields: [],
  })

  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormFieldModel[]) =>
      baseAxios
        .post<{
          data: FormFieldModel[]
        }>(API.formQuestions(form?.id ?? ''), data)
        .then((res) => res.data.data),
    onSuccess: () => {
      //do next
    },
    onError: (_err) => {
      toast.error('Failed to create form questions. Please try again!')
    },
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (form) {
      setFormData({ ...formData, name: form.title })
    }

    if (questions?.length) {
      const fields = convertToFormField(questions)
      setFormData({ ...formData, fields })
    }
  }, [form, questions])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.fields.findIndex(
          (field) => field.id === active.id
        )
        const newIndex = prev.fields.findIndex((field) => field.id === over.id)

        return {
          ...prev,
          fields: arrayMove(prev.fields, oldIndex, newIndex),
        }
      })
    }
  }

  const handleDragStart = (e: React.DragEvent, type: FieldType) => {
    e.dataTransfer.setData('fieldType', type)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const type = e.dataTransfer.getData('fieldType') as FieldType

    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: `New ${type} field`,
      name: `field_${crypto.randomUUID()}`,
      required: false,
      placeholder: '',
      unit: '',
      ...(['select', 'radio', 'checkbox', 'multipleChoice'].includes(type)
        ? { options: ['Option 1', 'Option 2', 'Option 3'] }
        : {}),
    }

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }))
  }, [])

  const handleFieldEdit = useCallback((field: FormField) => {
    setSelectedField(field)
    setIsEditModalOpen(true)
  }, [])

  const handleFieldDelete = useCallback((field: FormField) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((f) => f.id !== field.id),
    }))
  }, [])

  const handleFieldUpdate = useCallback((updatedField: FormField) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      ),
    }))
    setIsEditModalOpen(false)
    setSelectedField(null)
  }, [])

  const handleSave = () => {
    if (!formData?.fields?.length) {
      toast.error('Please add some questions to the form!')
      return
    }

    if (!form?.id) {
      redirect('/dashboard/forms')
    }

    const fields = convertToApiFormField(formData.fields)

    mutate(fields)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{form?.title}</h2>

        <div className="space-x-4">
          <Button
            variant="tertiary"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button onClick={handleSave} loading={isPending}>
            Save Questions
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {!previewMode && (
          <div className="col-span-3 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Form Fields</h3>
            <div className="space-y-2">
              {FIELD_COMPONENTS.map((component) => (
                <div
                  key={component.type}
                  className="flex items-center p-2 bg-gray-50 rounded cursor-move hover:bg-gray-100"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, component.type as FieldType)
                  }
                >
                  <component.icon className="w-4 h-4 mr-2" />
                  <span>{component.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={cn('bg-white p-6 rounded-lg shadow', {
            'col-span-9': !previewMode,
            'col-span-12': previewMode,
          })}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="max-h-[600px] overflow-y-auto pr-2 h-full">
              <SortableContext
                items={formData.fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {formData.fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    onEdit={handleFieldEdit}
                    onDelete={handleFieldDelete}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
          </DialogHeader>
          {selectedField && (
            <div className="space-y-4">
              <div>
                <Label>Field Label</Label>
                <Input
                  value={selectedField.label}
                  onChange={(e) =>
                    setSelectedField({
                      ...selectedField,
                      label: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Field Name</Label>
                <Input
                  value={selectedField.name}
                  onChange={(e) =>
                    setSelectedField({
                      ...selectedField,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Field Description(optional)</Label>
                <Input
                  value={selectedField.description}
                  onChange={(e) =>
                    setSelectedField({
                      ...selectedField,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              {[
                'text',
                'textarea',
                'email',
                'phone',
                'website',
                'number',
              ].includes(selectedField.type) && (
                <div>
                  <Label>Placeholder</Label>
                  <Input
                    value={selectedField.placeholder || ''}
                    onChange={(e) =>
                      setSelectedField({
                        ...selectedField,
                        placeholder: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {['number'].includes(selectedField.type) && (
                <div>
                  <Label>Unit (e.g, kg, lb, gram, etc)</Label>
                  <Input
                    value={selectedField.unit || ''}
                    onChange={(e) =>
                      setSelectedField({
                        ...selectedField,
                        unit: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {['select', 'radio', 'multipleChoice', 'checkbox'].includes(
                selectedField.type
              ) && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {selectedField.options?.map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [
                              ...(selectedField.options || []),
                            ]
                            newOptions[index] = e.target.value
                            setSelectedField({
                              ...selectedField,
                              options: newOptions,
                            })
                          }}
                        />
                        <Button
                          variant="tertiary"
                          size="sm"
                          onClick={() => {
                            const newOptions = selectedField.options?.filter(
                              (_, i) => i !== index
                            )
                            setSelectedField({
                              ...selectedField,
                              options: newOptions,
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
                        setSelectedField({
                          ...selectedField,
                          options: [
                            ...(selectedField.options || []),
                            `Option ${(selectedField.options?.length || 0) + 1}`,
                          ],
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
                  checked={selectedField.required}
                  onCheckedChange={(checked) =>
                    setSelectedField({
                      ...selectedField,
                      required: checked,
                    })
                  }
                />
                <Label>Required</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="tertiary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleFieldUpdate(selectedField)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { FormBuilder }
