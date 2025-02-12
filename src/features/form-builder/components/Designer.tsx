'use client'

import React, { useState } from 'react'
import { DesignerSidebar } from '@/features/form-builder/components/sidebar'
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './elements/FormElements'
import { useDesigner } from '@/features/form-builder/hooks'
import { Trash } from 'lucide-react'
import { DesignerEditor } from './DesignerEditor'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import { useMutateFormQuestions } from '@/hooks/queries/useForms'
import { convertSingleToApiFormField, slugify } from '@/utils/forms'

export const Designer = ({ formId }: { formId: string }) => {
  const {
    addElement,
    elements,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner()

  const { setNodeRef, isOver } = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  })

  const { mutate } = useMutateFormQuestions(formId ?? '')

  useDndMonitor({
    onDragEnd: (event) => {
      const { over, active } = event

      const addActiveElement = (index: number) => {
        const type = active.data.current?.type as ElementsType
        const newElement = FormElements[type].construct(
          `scrinar_${crypto.randomUUID()}`
        )
        const fields = convertSingleToApiFormField({
          label: '',
          name: slugify(newElement.extraAttributes?.label || newElement.type),
          ...newElement.extraAttributes,
          id: newElement.id,
          type: newElement.type,
        })
        console.log('>>>>>>>>>>>> I was called here')
        mutate(fields)
        addElement(index, newElement)
      }

      if (over && active.id !== over.id) {
        const isDesignerBtnElement = active.data.current?.isDesignerBtnElement
        const isDroppingOverDesignerDropArea =
          over.data.current?.isDesignerDropArea

        const droppingSidebarElementOverDesignerDropArea =
          isDesignerBtnElement && isDroppingOverDesignerDropArea

        if (droppingSidebarElementOverDesignerDropArea) {
          // dropping sidebar element over drop-zone-area
          addActiveElement(elements.length)
          return
        }

        // dropping sidebar button over designer element
        // so that it can appear on before or after based on where it was dropped
        const isDroppingOverDesignerElement =
          over.data.current?.isTopHalfDesignerElement ||
          over.data.current?.isBottomHalfDesignerElement

        const droppingSidebarBtnOverDesignerElement =
          isDesignerBtnElement && isDroppingOverDesignerElement

        if (droppingSidebarBtnOverDesignerElement) {
          const indexOfDesignerElement = elements.findIndex(
            (element) => element.id === over.data.current?.elementId
          )
          if (indexOfDesignerElement > -1) {
            const isTopHalf = over.data.current?.isTopHalfDesignerElement
            const indexOfNewElement = isTopHalf
              ? indexOfDesignerElement
              : indexOfDesignerElement + 1
            addActiveElement(indexOfNewElement)
          }
          return
        }

        // dragging an existing designer element over another
        const isDraggingDesignerElement = active.data.current?.isDesignerElement
        const draggingDesignerElementOverDesignerElement =
          isDraggingDesignerElement && isDroppingOverDesignerElement

        if (draggingDesignerElementOverDesignerElement) {
          const overId = over.data.current?.elementId
          const activeId = active.data.current?.elementId

          if (overId && activeId) {
            const indexOfOverElement = elements.findIndex(
              (element) => element.id === overId
            )
            const indexOfActiveElement = elements.findIndex(
              (element) => element.id === activeId
            )

            if (indexOfOverElement === -1 || indexOfActiveElement === -1) return

            const isTopHalf = over.data.current?.isTopHalfDesignerElement
            const indexOfNewElement = isTopHalf
              ? indexOfOverElement
              : indexOfOverElement + 1

            const activeElement = { ...elements[indexOfActiveElement] }

            removeElement(activeId)

            addElement(indexOfNewElement, activeElement)
          }
          return
        }
      }
    },
  })

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}
      >
        <div
          ref={setNodeRef}
          className={cn(
            'max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            {
              'ring-2 ring-primary/20': isOver,
            }
          )}
        >
          {!isOver && elements.length === 0 && (
            <p className="text-3xl flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                  formId={formId}
                />
              ))}
            </div>
          )}
          {isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
      <DesignerEditor />
    </div>
  )
}

const DesignerElementWrapper = ({
  element,
  formId,
}: {
  element: FormElementInstance
  formId: string
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false)

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () =>
      baseAxios.delete(
        API.singleFormQuestions(formId ?? '', element?.id ?? '')
      ),
  })

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      elementId: element.id,
      isTopHalfDesignerElement: true,
      type: element.type,
    },
  })
  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      elementId: element.id,
      isBottomHalfDesignerElement: true,
      type: element.type,
    },
  })

  const { removeElement, setSelectedElement } = useDesigner()

  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  })

  if (draggable.isDragging) {
    return (
      <div
        className={cn(
          'w-full flex h-[120px] rounded-md px-4 py-2 pointer-events-none bg-sidebar-accent/10 opacity-30'
        )}
      ></div>
    )
  }

  const DesignerElement = FormElements[element.type].designerComponent

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="w-full relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-primary/30 ring-inset"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute w-full h-1/2 rounded-t-md transition-colors', {
          'bg-green-200': topHalf.isOver,
        })}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={cn(
          'absolute w-full h-1/2 rounded-b-md bottom-0 transition-colors',
          {
            'bg-red-200': bottomHalf.isOver,
          }
        )}
      />

      {topHalf.isOver && (
        <div
          className={
            'absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none'
          }
        />
      )}
      <div
        className={cn(
          'w-full flex h-[120px] rounded-md px-4 py-2 pointer-events-none bg-gray-100',
          {
            'opacity-30': isMouseOver,
            'border-t-4 border-grey-600': topHalf.isOver,
            'border-b-4 border-grey-600': bottomHalf.isOver,
          }
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div
          className={
            'absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none'
          }
        />
      )}

      {isMouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <button
              title="delete"
              type="button"
              className="outline-none h-full border rounded-md rounded-l-none bg-red-500 flex justify-center items-center px-2"
              onClick={(e) => {
                e.stopPropagation()
                deleteMutate(undefined, {
                  onSuccess: () => {
                    toast.success('Question deleted successfully!')
                    // setFormData((prev) => ({
                    //   ...prev,
                    //   fields: prev.fields.filter((f) => f.id !== field.id),
                    // }))
                    // setSelectedField(null)
                  },
                })
                removeElement(element.id)
              }}
            >
              <Trash className="size-6 text-white" />
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}
    </div>
  )
}
