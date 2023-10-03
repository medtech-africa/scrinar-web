import { cn } from '@/lib/utils'
import { IconPicker } from './ui/icon-picker'
import { Text } from './ui/text'
import { IconNames } from './ui/icon-picker/icon-names'
import useClickAway from '@/hooks/useClickAway'
import { useRef } from 'react'

export type MenuItemProp = {
  title: string
  icon: IconNames
  action?: () => void
}

interface IProps {
  menuItems: MenuItemProp[]
  onClose?: () => void
}

const DropDownMenu = ({ menuItems, onClose }: IProps) => {
  const menuRef = useRef(null)

  useClickAway(menuRef, () => (onClose ? onClose() : null))

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-option"
      tabIndex={1}
      className={cn(
        'flex flex-col p-2 bg-white justify-center space-y-2 items-start shadow-xl absolute right-4 whitespace-nowrap z-[1000] origin-top-right '
      )}
    >
      {menuItems.map((item, _) => (
        <div
          key={_}
          className="flex flex-row items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-grey-50 rounded w-full"
          onClick={item?.action}
        >
          <div
            className={cn(
              ' text-grey-600',
              item.title?.toLowerCase().includes('delete') &&
                'text-carmine-pink-red-900'
            )}
          >
            <IconPicker icon={item.icon} />
          </div>
          <Text
            className={cn(
              ' text-grey-600 text-xs',
              item.title?.toLowerCase().includes('delete') &&
                'text-carmine-pink-red-900'
            )}
          >
            {item.title}
          </Text>
        </div>
      ))}
    </div>
  )
}

export default DropDownMenu
