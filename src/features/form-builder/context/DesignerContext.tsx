import React, { createContext, useEffect, useMemo } from 'react'
import { FormElementInstance } from '../components/elements/FormElements'
import { useParams } from 'next/navigation'
import { convertSingleToApiFormField } from '@/utils/forms'
import toast from 'react-hot-toast'
import { useMutateFormQuestions } from '@/hooks/queries/useForms'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { FormFieldModel } from '@/types/forms.types'

// export const mergeObjects = <T extends { [key: string]: any }>(
//   target: T,
//   source: T
// ) => {
//   for (const key in source) {
//     if (Array.isArray(source[key])) {
//       // Handle array concatenation
//       switch (Array.isArray(target[key])) {
//         case true:
//           target[key] = [...new Set([...target[key], ...source[key]])]
//           break
//         case false:
//           target[key] = source[key]
//           break
//       }
//       // target[key] = Array.isArray(target[key])
//       //   ? target[key].concat(source[key])
//       //   : source[key];
//     } else if (
//       source[key] &&
//       typeof source[key] === 'object' &&
//       !Array.isArray(source[key])
//     ) {
//       // Handle nested objects
//       if (!target[key]) {
//         target[key] = {}
//       }
//       mergeObjects(target[key], source[key])
//     } else {
//       // Handle primitive values
//       target[key] = source[key]
//     }
//   }
//   return target
// }

type SelectedElementType = FormElementInstance | null
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

  const handleFieldUpdate = (element: FormElementInstance) => {
    const fields = convertSingleToApiFormField({
      label: '',
      name: '',
      ...element.extraAttributes,
      id: element.id,
      type: element.type,
    })

    const response = {
      onSuccess: () => {},
      onError: () => {
        toast.error('Failed to create form questions. Please try again!')
      },
    }
    const isEdit = !element.id.startsWith('scrinar_')
    console.log('🚀 ~ handleFieldUpdate ~ element.id:', element)

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
    }
  }, [id])

  const removeElement = (id: string) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id)
    )
  }

  const updateElement = (id: string, newElement: FormElementInstance) => {
    console.log('🚀 ~ updateElement ~ id:', id)
    setElements((prevElements) => {
      const newElements = prevElements.map((element) => {
        if (element.id === id) {
          // console.log(element, newElement, mergeObjects(element, newElement))
          // const mergedData = mergeObjects(element, newElement)
          // console.log('🚀 ~ newElements ~ mergedData:', mergedData)
          handleFieldUpdate(newElement)
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
