import { ToastField } from '@/components/ui/toast'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Design System/ToastField',
  component: ToastField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      options: ['success', 'warning2', 'info', 'destructive'],
      control: { type: 'radio' },
    },
  },

  tags: ['autodocs'],
} satisfies Meta<typeof ToastField>

export default meta
type Story = StoryObj<typeof meta>

export const SuccessBadge: Story = {
  args: {
    variant: 'success',
    label: 'label',
    subtext: 'Subtext here',
    buttonText2: 'myw yoke',
  },
}
export const WarningBadge: Story = {
  args: {
    variant: 'warning2',
    label: 'label',
    subtext: 'Subtext here',
  },
}
export const InformationBadge: Story = {
  args: {
    variant: 'info',
    label: 'label',
    subtext: 'Subtext here',
  },
}

export const DestructiveBadge: Story = {
  args: {
    variant: 'destructive',
    label: 'label',
    subtext: 'Subtext here',
  },
}
