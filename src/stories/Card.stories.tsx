import { Card } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/react'
import { TimeCalendarLinear, AstrologyManOutline } from 'react-icons-sax'

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
    icon: <TimeCalendarLinear size={24} color="white" />,
  },
}

const dataItems = [
  {
    title: 'Gender',
    description: 'Male',
    iconClassName: 'bg-[#1570EF]',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
  {
    title: '180IN',
    description: 'Height',
    iconClassName: 'bg-yellow-orange-900',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
  {
    title: '50KG',
    description: 'Weight',
    iconClassName: 'bg-gray-900',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
]

export const Example = () => {
  return (
    <div className="grid gap-4 w-[300px] bg-white p-10">
      {dataItems.map((item) => (
        <Card key={item.title} {...item} className="w-full" />
      ))}
    </div>
  )
}
