'use client'
import { useRouter } from 'next/navigation'
import { IconPicker } from './ui/icon-picker'
import { IconNames } from './ui/icon-picker/icon-names'
import { Text } from './ui/text'
import { Button } from './ui/button'
import { useState } from 'react'
import DropDownMenu, { MenuItemProp } from './drop-down-menu'
export type NavigationItem = {
  label: string
  icon?: IconNames
}

type PageHeaderTypes = {
  title?: string
  subtitle?: string
  navigation?: NavigationItem[]
  avatar?: React.ReactNode
  user?: boolean
  isAvatar?: boolean
}

export const PageHeader = ({
  title,
  subtitle,
  navigation,
  avatar,
  user,
  isAvatar,
}: PageHeaderTypes) => {
  const router = useRouter()
  const menuItems: MenuItemProp[] = [
    {
      title: 'Edit',
      icon: IconNames.userEdit,
      action: () => router.push('/dashboard/health-data/update-record'),
    },
    {
      title: 'Delete',
      icon: IconNames.trash,
    },
  ]

  const [toggle, setToggle] = useState(false)
  return (
    <div className="flex flex-col gap-y-4 py-4">
      {navigation && (
        <div className="flex flex-row">
          <div
            onClick={router.back}
            className="bg-grey-100 rounded-full mr-4 cursor-pointer"
          >
            <IconPicker icon="arrowLeft" />
          </div>
          <div className="flex flex-row gap-x-2">
            {navigation.map((item, index) => (
              <div key={index} className={'flex flex-row gap-x-2'}>
                <Text
                  variant="text/sm"
                  className={
                    index === navigation.length - 1
                      ? 'text-grey-900'
                      : 'text-grey-400'
                  }
                >
                  {item.label}
                </Text>
                {item.icon && <IconPicker icon={item.icon} />}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex items-center">
          {user && (
            <div className="bg-grey-100 p-3 rounded-full cursor-pointer mr-4">
              Av
            </div>
          )}
          <div>
            <div className="flex items-baseline gap-4 mb-2">
              <Text
                variant="display/xs"
                weight="medium"
                className="text-grey-900 "
              >
                {title}
              </Text>
              {isAvatar && <Text> {avatar}</Text>}
            </div>
            <div className="">
              {/* <IconPicker icon="calendar2" /> */}
              <Text
                variant="text/sm"
                weight="default"
                className="text-grey-600 "
              >
                {subtitle}
              </Text>
            </div>
          </div>
        </div>
        {user && (
          <div className="mt-4">
            <Button
              onClick={() => setToggle(!toggle)}
              value="Action"
              className="bg-grey-50 text-grey-900 hover:bg-grey-100"
              endingIcon={<IconPicker icon="arrowDown" />}
            />
            {toggle && (
              <DropDownMenu
                menuItems={menuItems}
                onClose={() => setToggle(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
