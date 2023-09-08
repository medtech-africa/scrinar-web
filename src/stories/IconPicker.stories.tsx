import { IconPicker, IconPickerProps } from '@/components/ui/icon-picker'
import { Icons } from '@/components/ui/icon-picker/icon-names'
import { Text } from '@/components/ui/text'
import type { Meta } from '@storybook/react'
import { FC } from 'react'

const meta = {
  title: 'Example/IconPicker',
  component: IconPicker,
  args: {
    className: 'text-primary',
    size: '2rem',
  },
  parameters: {
    layout: 'fullscreen',
  },
  excludeStories: ['IconWrapper'],
} satisfies Meta

export default meta
// type Story = StoryObj<typeof meta>

export const IconWrapper: FC<{ icon: IconPickerProps['icon'] }> = ({
  icon,
}) => (
  <div className="flex flex-col items-center justify-center">
    <IconPicker icon={icon} size="2rem" />
    <Text as="div" className="text-[10px]">
      {icon}
    </Text>
  </div>
)

export const AllIconPickerIcons = () => (
  <div className="grid gap-5 items-end grid-cols-12">
    {Object.values(Icons).map((icon) => (
      <IconWrapper key={icon} icon={icon} />
    ))}
  </div>
)
