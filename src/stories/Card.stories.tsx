import { Card } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/react'
import { Mail } from 'lucide-react'

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
    title: 'Primary 1',
    description: 'Level',
    icon: <Mail className="h-4 w-4" />,
  },
}
