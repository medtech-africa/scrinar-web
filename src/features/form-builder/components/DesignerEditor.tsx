'use client'

import { SlideOver } from '@/components/slide-over'
import React from 'react'
import { useDesigner } from '../hooks/useDesigner'
import { IconPicker } from '@/components/ui/icon-picker'
import { FormElements } from './elements/FormElements'

export const DesignerEditor = () => {
  const { selectedElement, setSelectedElement } = useDesigner()

  if (!selectedElement) return null

  const PropertiesElement =
    FormElements[selectedElement.type].propertiesComponent

  return (
    <SlideOver
      onClose={() => setSelectedElement(null)}
      open={!!selectedElement}
      allowDismiss={false}
      title={'Edit Field'}
      icon={<IconPicker icon="book" size={'1.25rem'} />}
    >
      <PropertiesElement elementInstance={selectedElement} />
    </SlideOver>
  )
}
