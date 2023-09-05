import React, { FC, ComponentType } from 'react'
import { IconPickerProp } from './icons.models'
import { IconNames } from './icon-names'
import { Message } from './message'
import { IconMap } from './icon-map'

import { icons } from './icons'

export interface IconPickerProps extends IconPickerProp {
  icon: IconNames | `${IconNames}`
}
type Iconstype = Record<string, ComponentType<IconPickerProp>>

export const IconPicker: FC<IconPickerProps> = ({ icon, size, className }) => {
  const iconComponentMap: Iconstype = Object.fromEntries(
    Array.from(IconMap.entries()).map(([key, moduleName]) => [
      key,
      (icons as any)?.[moduleName],
    ])
  )
  const Icon = iconComponentMap[icon]

  if (!Icon) {
    return <Message>Missing icon: {icon}</Message>
  }

  return <Icon size={size} className={className} aria-hidden="true" />
}
