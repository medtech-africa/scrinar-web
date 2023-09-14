import { IconPicker } from './ui/icon-picker'
import { Text } from './ui/text'

type NavigationItem = {
  label: string
  icon?: string // Make the icon optional
}

type PageHeaderTypes = {
  title?: string
  subtitle?: string
  navigation?: NavigationItem[] // Use an array of NavigationItem objects
  avatar?: React.ReactNode
}

export const PageHeader = ({
  title,
  subtitle,
  navigation,
  avatar,
}: PageHeaderTypes) => {
  return (
    <div className="flex flex-col gap-y-4 py-4">
      {navigation && (
        <div className="flex flex-row">
          <div className="bg-grey-100 rounded-full mr-4">
            <IconPicker icon="arrowLeft" />
          </div>
          <div className="flex flex-row gap-x-2">
            {navigation.map((item, index) => (
              <div key={index} className="flex flex-row gap-x-2">
                <Text
                  variant="text/sm"
                  className={
                    index === navigation.length - 1
                      ? 'text-grey-900' // Use a different text color for the last item
                      : 'text-grey-400'
                  }
                >
                  {item.label}
                </Text>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                {item.icon && <IconPicker icon={item.icon} />}
                {/* Render the icon if provided */}
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
