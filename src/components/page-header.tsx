'use client'
import { useRouter } from 'next/navigation'
import { IconPicker } from './ui/icon-picker'
import { IconNames } from './ui/icon-picker/icon-names'
import { Text } from './ui/text'

export type NavigationItem = {
  label: string
  icon?: IconNames
}

type PageHeaderTypes = {
  title?: string
  subtitle?: string
  navigation?: NavigationItem[]
  avatar?: React.ReactNode
}

export const PageHeader = ({
  title,
  subtitle,
  navigation,
  avatar,
}: PageHeaderTypes) => {
  const router = useRouter()
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
      <div className="flex items-baseline gap-4">
        <Text variant="display/xs" weight="medium" className="text-grey-900">
          {title}
        </Text>
        <Text> {avatar}</Text>
      </div>
      <div>
        <Text variant="text/sm" weight="default" className="text-grey-600">
          {subtitle}
        </Text>
      </div>
    </div>
  )
}
