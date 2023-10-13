import { Meta, StoryObj } from '@storybook/react'
import { BadgeField } from '../components/ui/badge'

const meta = {
  title: 'Design System/BadgeField',
  component: BadgeField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BadgeField>

export default meta
type Story = StoryObj<typeof meta>

export const PendingBadge: Story = {
  args: {
    variant: 'pending',
    children: 'Inprogress',
  },
}
export const SuccessBadge: Story = {
  args: {
    variant: 'success',
    children: 'Completed',
  },
}
export const WarningBadge: Story = {
  args: {
    variant: 'warning',
    children: 'Schedule',
  },
}
export const ErrorBadge: Story = {
  args: {
    variant: 'error',
    children: 'Overdue',
  },
}
export const Pending2Badge: Story = {
  args: {
    variant: 'pending2',
    children: 'Highly Obese',
  },
}
export const DangerBadge: Story = {
  args: {
    variant: 'danger',
    children: 'Over Weight',
  },
}
