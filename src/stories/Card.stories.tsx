import { Card } from '@/components/ui/card'
import {
  AgeIcon,
  GenderIcon,
  HelpCircleIcon,
  WeightIcon,
} from '@/components/ui/icon-picker/icons'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Example/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '12 Years',
    description: 'Age',
    iconClassName: 'bg-lust-900',
    className: '',
    icon: <AgeIcon size={24} color="white" />,
  },
}

const dataItems = [
  {
    title: 'Gender',
    description: 'Male',
    iconClassName: 'bg-[#1570EF]',
    icon: <GenderIcon size={24} color="white" />,
  },
  {
    title: '180IN',
    description: 'Height',
    iconClassName: 'bg-yellow-orange-900',
    icon: <HelpCircleIcon size={24} color="white" />,
  },
  {
    title: '50KG',
    description: 'Weight',
    iconClassName: 'bg-gray-900',
    icon: <WeightIcon size={24} color="white" />,
  },
]

export const Example = () => {
  return (
    <div className="grid gap-4 w-[400px] bg-white p-10">
      {dataItems.map((item) => (
        <Card key={item.title} {...item} className="w-full" />
      ))}
    </div>
  )
}
