import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementDragOverlay } from './sidebar/SidebarBtnElement'
import { ElementsType, FormElements } from './elements/FormElements'
import { useDesigner } from '../hooks/useDesigner'

export const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>()
  const { elements } = useDesigner()

  useDndMonitor({
    onDragStart: (event) => {
      console.log('DRAG TIME', event)
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>
  const isSidebarElementBtn = draggedItem?.data.current?.isDesignerBtnElement

  if (isSidebarElementBtn) {
    const type = draggedItem?.data.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem?.data.current?.isDesignerElement

  if (isDesignerElement) {
    const type = draggedItem?.data.current?.type as ElementsType
    const elementId = draggedItem?.data.current?.elementId
    const element = elements.find((element) => element.id === elementId)
    if (!element) node = <div>No element found</div>
    else {
      const DesignElemComponent = FormElements[type].designerComponent

      node = (
        <div className="w-full h-[120px] py-2 px-4 opacity-60 border rounded-md bg-sidebar-accent/10 pointer-events-none">
          <DesignElemComponent elementInstance={element} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
