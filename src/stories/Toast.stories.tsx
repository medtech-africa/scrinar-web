import { Meta, StoryObj } from '@storybook/react'
import { ToastField } from '../components/ui/Toast'

const meta = {
  title: 'Design System/ToastField',
  component: ToastField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ToastField>

export default meta
type Story = StoryObj<typeof meta>

export const SuccessBadge: Story = {
  args: {
    variant: 'success',
    label: 'label',
    subtext: 'Subtext here',
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
    variant: 'information',
    label: 'label',
    subtext: 'Subtext here',
  },
}

export const DangerBadge: Story = {
  args: {
    variant: 'danger',
    label: 'label',
    subtext: 'Subtext here',
  },
}
