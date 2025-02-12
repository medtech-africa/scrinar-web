'use client'

import React, { useEffect } from 'react'
import { PreviewDialogBtn } from './buttons/PreviewDialogBtn'
import { SaveFormBtn } from './buttons/SaveFormBtn'
import { PublishDialogBtn } from './buttons/PublishDialogBtn'
import { useFormQuestions, useSingleForm } from '@/hooks/queries/useForms'
import { Designer } from './Designer'
import {
  DndContext,
  // KeyboardSensor,
  MouseSensor,
  // PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { DragOverlayWrapper } from './DragOverlayWrapper'
import { FormModel } from '@/types/forms.types'
// import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useDesigner } from '../hooks/useDesigner'
import { ElementsType } from './elements/FormElements'
import { convertToFormField } from '@/utils/forms'

const FormBuilder = ({ form }: { form: FormModel }) => {
  // const pointerSensor = useSensor(PointerSensor)
  // const keyboardSensor = useSensor(KeyboardSensor, {
  //   coordinateGetter: sortableKeyboardCoordinates,
  // })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // in px
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // in px
      tolerance: 5,
    },
  })

  const sensors = useSensors(
    mouseSensor,
    touchSensor
    // pointerSensor,
    // keyboardSensor
  )

  return (
    <DndContext sensors={sensors}>
      <div className="flex flex-col w-full h-full">
        <nav className="flex justify-between border-b p-2 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="mr-2">Form:</span>
            {form.title}
          </h2>
          <div className="flex item-center gap-2">
            <PreviewDialogBtn />
            {/* {!(form.state === 'published') && ( */}
            <>
              <SaveFormBtn />
              <PublishDialogBtn />
            </>
            {/* )} */}
          </div>
        </nav>

        <div className="flex w-full flex-grow items-center relative overflow-y-auto h-[200px] bg-accent">
          <Designer formId={form.id} />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  )
}

export const Builder = ({ id }: { id: string }) => {
  const { data, isPending: isLoading } = useSingleForm(id)

  const { setElements } = useDesigner()

  const { data: formQuestions, isPending: formQuestionsLoading } =
    useFormQuestions(id)

  useEffect(() => {
    if (formQuestions) {
      console.log('🚀 ~ useEffect ~ formQuestions:', formQuestions)
      const elements = formQuestions.data
        .filter((question) => question.id)
        .map((question) => {
          return {
            id: question.id ?? '',
            type: question.type as ElementsType,
            extraAttributes: convertToFormField([question])[0],
          }
        })
      setElements(elements)
    }
  }, [formQuestions, setElements])

  if (formQuestionsLoading || isLoading) return null

  if (!data) return null

  return (
    <>
      <FormBuilder form={data} />
    </>
  )
}
