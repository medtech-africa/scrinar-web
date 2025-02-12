import React, { createContext, useEffect, useMemo } from 'react'
import { FormElementInstance } from '../components/elements/FormElements'
import { useParams } from 'next/navigation'
import {
  convertSingleToApiFormField,
  convertToFormField,
  slugify,
} from '@/utils/forms'
import toast from 'react-hot-toast'
import {
  useMutateFormQuestions,
  useMutateSortForm,
} from '@/hooks/queries/useForms'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { FieldType, FormFieldModel } from '@/types/forms.types'

type SelectedElementType =
  | (FormElementInstance & {
      index?: number
    })
  | null
type DesignerContextType = {
  formId: string

  elements: FormElementInstance[]
  setElements: (elements: FormElementInstance[]) => void

  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  updateElement: (id: string, element: FormElementInstance) => void

  selectedElement: SelectedElementType
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElementType>>
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [formId, setFormId] = React.useState<string>('')
  const [elements, setElements] = React.useState<FormElementInstance[]>([])
  // console.log('🚀 ~ elements:', elements)
  const [selectedElement, setSelectedElement] =
    React.useState<SelectedElementType>(null)

  const { mutate } = useMutateFormQuestions(formId ?? '')
  const { mutate: editQuestion } = useMutation({
    mutationFn: (payload: { id: string; data: FormFieldModel }) =>
      baseAxios.patch(
        API.singleFormQuestions(formId ?? '', payload.id ?? ''),
        payload.data
      ),
  })
  const queryClient = useQueryClient()

  const elementsOrder = React.useRef<string[]>([])

  const isInOrder = (map: string[] = []) => {
    let index = 0
    for (const item of elements) {
      if (item.id !== map[index]) {
        return false
      }
      index = index + 1
    }

    return true
  }

  const { mutate: mutateSort } = useMutateSortForm(formId ?? '')

  React.useEffect(() => {
    if (formId) {
      const sortList = async () => {
        if (isInOrder(elementsOrder.current)) return
        console.log(
          '🚀 ~ sortList ~ elementsOrder.current:',
          elementsOrder.current
        )
        mutateSort({
          fields: elements
            .map((field) => field.id)
            .filter((id) => !id.startsWith('scrinar')),
        })
      }
      sortList()
    }
  }, [formId, elements, mutateSort])

  const handleFieldUpdate = (element: FormElementInstance) => {
    const fields = convertSingleToApiFormField({
      label: '',
      ...element.extraAttributes,
      name:
        element.extraAttributes?.name ||
        slugify(element.extraAttributes?.label),
      id: element.id,
      type: element.type,
    })
    fields.order = selectedElement?.index || 1

    const response = {
      onSuccess: (res: { data: FormFieldModel }) => {
        console.log('🚀 ~ handleFieldUpdate ~ res:', res.data)
        toast.success('Successfully updated form question')
        queryClient.invalidateQueries({
          queryKey: ['single-form-questions', formId],
        })
        setSelectedElement({
          id: res.data.id!,
          index: res.data.order,
          type: res.data.type as FieldType,
          extraAttributes: convertToFormField([res.data])[0],
        })
      },
      onError: () => {
        toast.error('Failed to create form questions. Please try again!')
      },
    }
    const isEdit = !element.id.startsWith('scrinar_')
    // console.log('🚀 ~ handleFieldUpdate ~ element.id:', element)

    if (isEdit) {
      editQuestion({ id: element.id, data: fields }, response)
    } else {
      mutate(fields, response)
    }
  }

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prevElements) => {
      const newElements = [...prevElements]
      newElements.splice(index, 0, element)
      return newElements
    })
  }

  const id = useParams().id.toString()
  useEffect(() => {
    if (id) {
      setFormId(id)
      elementsOrder.current = elements
        .map((element) => element.id)
        .filter((id) => !id.startsWith('scrinar'))
    }
  }, [id])

  const removeElement = (id: string) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id)
    )
  }

  const updateElement = (id: string, newElement: FormElementInstance) => {
    console.log('🚀 ~ updateElement ~ id:', id)
    handleFieldUpdate(newElement)

    setElements((prevElements) => {
      const newElements = prevElements.map((element) => {
        if (element.id === id) {
          // handleFieldUpdate(newElement)
          setSelectedElement(newElement)
          return newElement
        }
        return element
      })
      return newElements
    })
  }

  const value: DesignerContextType = useMemo(
    () => ({
      elements,
      formId,
      addElement,
      removeElement,
      updateElement,
      selectedElement,
      setSelectedElement,
      setElements,
    }),
    [elements, selectedElement, formId]
  )

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  )
}
