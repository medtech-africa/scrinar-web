import { cn } from '@/lib/utils'
import React, { FC } from 'react'
import { Text } from './text'

export type ITabList = {
  onClickTabItem: (label: string) => void
  activeTab: string
  labels: string[]
}

const TabList: FC<ITabList> = ({ labels, onClickTabItem, activeTab }) => {
  const isActive = (label: string) =>
    label === (activeTab ? activeTab : labels?.[0])
  const onClick = (label: string) => () => onClickTabItem(label)

  return (
    <section className="flex flex-wrap my-2">
      {labels.map((label) => (
        <Text
          as="span"
          className={cn(
            'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
            isActive(label) &&
              'border-b-2 border-primary font-bold text-grey-900'
          )}
          key={label}
          onClick={onClick(label)}
        >
          {label}
        </Text>
      ))}
    </section>
  )
}
const TabList2: FC<ITabList> = ({ labels, onClickTabItem, activeTab }) => {
  const isActive = (label: string) =>
    label === (activeTab ? activeTab : labels?.[0])
  const onClick = (label: string) => () => onClickTabItem(label)

  return (
    <section className="flex flex-wrap">
      {labels.map((label) => (
        <Text
          as="span"
          className={cn(
            'text-sm text-grey-700 transition-all cursor-pointer px-[10px] py-4',
            isActive(label) && 'text-primary font-bold bg-lust-50 rounded-3xl'
          )}
          key={label}
          onClick={onClick(label)}
        >
          {label}
        </Text>
      ))}
    </section>
  )
}
export { TabList, TabList2 }
