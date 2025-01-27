'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar-new'
import { IconPicker } from '../ui/icon-picker'
import { Text } from '../ui/text'
import { NavLink } from './nav-link'
import React from 'react'

type Item = {
  title: string
  url: string
  icon?: React.ReactElement
  isActive?: (pathname: string) => boolean
  items?: {
    title: string
    url: string
    isActive?: (pathname: string) => boolean
  }[]
}

export function NavMain({
  items,
  pathname,
}: {
  items: Item[]
  pathname?: string
}) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={pathname ? item.isActive?.(pathname) : false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} size={'lg'}>
                  {item.icon && item.icon}
                  <Text variant="text/md">{item.title}</Text>
                  <IconPicker
                    icon={'arrowRight'}
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    const isActive = pathname
                      ? subItem?.isActive?.(pathname)
                      : false
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={isActive}>
                          <NavLink href={subItem.url} active={isActive}>
                            <Text variant="text/md">{subItem.title}</Text>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      })}
    </SidebarMenu>
  )
}
