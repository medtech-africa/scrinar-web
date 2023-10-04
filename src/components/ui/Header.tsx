import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import useClickAway from '@/hooks/useClickAway'
import { IconPicker } from './icon-picker'
import { Avatar } from './avatar'
import Link from 'next/link'
import { IconNames } from './icon-picker/icon-names'
import { useRouter } from 'next/navigation'
import DropDownMenu from '../drop-down-menu'

interface IHeader {
  sideToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ sideToggleOpen }: IHeader) => {
  const router = useRouter()
  const menuRef = useRef(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [openDropDown, setOpenDropDown] = useState<boolean>(false)

  useClickAway(menuRef, () => setVisible(false))
  const menuItems = [
    {
      title: 'Profile',
      icon: IconNames.profile2User,
      action: () => router.push('/dashboard/settings'),
    },
    {
      title: 'Logout',
      icon: IconNames.login,
      action: () => null,
    },
  ]

  return (
    <header>
      <div className="flex bg-white justify-between border-b-[1px] border-grey-100 items-center px-4 md:px-8 py-4">
        <div className="md:hidden" onClick={() => sideToggleOpen((pr) => !pr)}>
          <IconPicker size={24} icon="hamburger" />
        </div>
        <div>
          <Input
            leadingIcon={<IconPicker icon="search" />}
            className="rounded-[49px] bg-grey-100 text-sm md:w-[17.25rem] w-[15rem]"
            placeholder="Search for something..."
            full={false}
          />
        </div>
        <div>
          <div className="md:flex flex-row space-x-2 md:space-x-4 items-center hidden">
            <div className="bg-grey-100 p-3 rounded-full cursor-pointer">
              <IconPicker icon="notificationBell" size="1.5rem" />
            </div>
            <Link
              href="/dashboard/settings"
              className="bg-grey-100 p-3 rounded-full"
            >
              <IconPicker icon="setting2" size="1.5rem" />
            </Link>
            <Avatar
              src="/avatar3.svg"
              fallback="PR"
              size="lg"
              rootClassName="border border-lust-100"
              imgClassName="bg-lust-50"
            />
            <div
              onClick={() => setOpenDropDown(true)}
              className="cursor-pointer flex space-x-2 md:space-x-4 items-center relative"
            >
              <Text className="font-medium text-grey-600 text-xs sm:text-base ">
                School Name here
              </Text>
              <IconPicker icon="arrowDown" />
              {openDropDown && (
                <DropDownMenu
                  className="top-9 right-0 min-w-[200px] w-full m-0"
                  menuItems={menuItems}
                  onClose={() => setOpenDropDown(false)}
                />
              )}
            </div>
          </div>
          <div
            className="md:hidden flex items-center cursor-pointer focus:bg-black  active:bg-gray-200 transition-all duration-300 ease-in-out"
            onClick={() => setVisible((pr) => !pr)}
          >
            {/* menu */}
            <IconPicker icon="more" />
          </div>
        </div>
      </div>
      <div
        ref={menuRef}
        className={cn(
          'flex flex-col p-3 md:hidden bg-grey-50 justify-center space-y-3 items-start shadow-xl absolute right-4 z-40',
          visible ? 'flex' : 'hidden'
        )}
      >
        <Text className="font-medium text-grey-600 text-xs">
          School Name here
        </Text>
        <div className="flex flex-row items-center space-x-2 cursor-pointer px-2 hover:bg-grey-200 w-full">
          <div className="bg-grey-100 p-2 rounded-full">
            <IconPicker icon="notificationBell" size={18} />
          </div>
          <Text>Notification</Text>
        </div>
        <Link
          href="/dashboard/settings"
          className="flex flex-row items-center space-x-2 px-2 hover:bg-grey-200 w-full"
        >
          <div className="bg-grey-100 p-2 rounded-full">
            <IconPicker icon="setting2" size={18} />
          </div>
          <Text>Settings</Text>
        </Link>
        <div className="flex flex-row items-center space-x-2 cursor-pointer px-2 hover:bg-grey-200 w-full">
          <Avatar size="sm" fallback="SH" />
          <Text>Profile</Text>
        </div>
        <div className="flex flex-row items-center space-x-2 cursor-pointer px-2 hover:bg-grey-200 w-full">
          <div className="bg-grey-100 p-2 rounded-full text-primary">
            <IconPicker icon="login" size={18} />
          </div>
          <Text className="text-primary">Logout</Text>
        </div>
      </div>
    </header>
  )
}
