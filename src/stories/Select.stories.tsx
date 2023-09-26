import { IconPicker } from '@/components/ui/icon-picker'
import { Select } from '../components/ui/select'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'dammy@play4health.com',
    className: 'min-w-[300px]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

const allOptions = [
  { value: 'pulse', label: 'Heart Beat' },
  { value: 'respiratoryRate', label: 'Respiration' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'bloodPressure', label: 'SBP/BBP' },
  { value: 'bloodGlucose', label: 'Glucose' },
]

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    options: allOptions,
  },
}

export const DefaultWithLeadingIcon: Story = {
  args: {
    variant: 'default',
    leadingIcon: <IconPicker icon="mail" size="1.25rem" />,
  },
}

export const DefaultWithLeadingIconAndMessage: Story = {
  args: {
    variant: 'default',
    leadingIcon: <IconPicker icon="mail" size="1.25rem" />,
    message: 'This is a hint text to help user.',
  },
}

export const DefaultWithLeadingIconDisabled: Story = {
  args: {
    variant: 'default',
    leadingIcon: <IconPicker icon="mail" size="1.25rem" />,
    isDisabled: true,
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
}

export const DestructiveWithLabelAndMessage: Story = {
  args: {
    variant: 'destructive',
    label: 'Email',
    message: 'This is an error message.',
  },
}
