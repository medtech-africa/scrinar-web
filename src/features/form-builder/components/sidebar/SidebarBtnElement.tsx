'use client'

import React from 'react'
import { FormElement } from '../elements/FormElements'
import { Button } from '@/components/ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export const SidebarBtnElement = ({
  formElement,
}: {
  formElement: FormElement
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  })

  return (
    <Button
      ref={setNodeRef}
      className={cn(
        'flex flex-col gap-2 size-[100px] cursor-grab border-border border !p-2',
        {
          'ring-2 ring-primary z-50': isDragging,
        }
      )}
      variant={'tertiary'}
      {...listeners}
      {...attributes}
    >
      <Icon className="size-8 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement
}) => {
  const { label, icon: Icon } = formElement.designerBtnElement
  return (
    <Button
      className={cn(
        'flex flex-col gap-2 size-[120px] cursor-grab border-border border !p-2'
      )}
      variant={'tertiary'}
    >
      <Icon className="size-8 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}
