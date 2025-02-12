'use client'

import React from 'react'
import { FormElements } from '../elements/FormElements'
import { SidebarBtnElement } from './SidebarBtnElement'
import { Separator } from '@/components/ui/separator'

// const FIELD_COMPONENTS = [
//   { type: 'text', icon: Type, label: 'Text Input' },
//   { type: 'textarea', icon: TextQuote, label: 'Long Text' },
//   { type: 'number', icon: FileDigit, label: 'Number Input' },
//   { type: 'select', icon: List, label: 'Select' },
//   { type: 'radio', icon: List, label: 'Radio Group' },
//   { type: 'checkbox', icon: Check, label: 'Checkbox' },
//   { type: 'phone', icon: Phone, label: 'Phone' },
//   { type: 'email', icon: Mail, label: 'Email' },
//   { type: 'website', icon: Globe, label: 'Website' },
//   { type: 'date', icon: CalendarDays, label: 'Date' },
//   { type: 'image', icon: Image, label: 'Image' },
//   { type: 'header', icon: Heading, label: 'Header' },
//   { type: 'divider', icon: Minus, label: 'Divider' },
// ]

export const DesignerSidebar = () => {
  return (
    <div className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l border-border bg-background overflow-y-auto h-full px-2 pt-2">
      <p className="text-sm">Drag and drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        {/* layout */}
        <p className="text-sm col-span-1 md:col-span-2 my-2">Layout elements</p>
        <SidebarBtnElement formElement={FormElements.header} />
        <SidebarBtnElement formElement={FormElements.divider} />
        <SidebarBtnElement formElement={FormElements.spacer} />

        {/* form */}
        <p className="text-sm col-span-1 md:col-span-2 my-2">Form elements</p>
        <SidebarBtnElement formElement={FormElements.text} />
        <SidebarBtnElement formElement={FormElements.textarea} />
        <SidebarBtnElement formElement={FormElements.number} />
        <SidebarBtnElement formElement={FormElements.checkbox} />
        <SidebarBtnElement formElement={FormElements.select} />
        <SidebarBtnElement formElement={FormElements.radio} />
        <SidebarBtnElement formElement={FormElements.email} />
        <SidebarBtnElement formElement={FormElements.date} />
      </div>
    </div>
  )
}
