import { Input } from '../components/ui/input'
import type { Meta, StoryObj } from '@storybook/react'
import { Mail } from 'lucide-react'

const meta = {
  title: 'Example/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    placeholder: 'dammy@play4health.com',
    className: 'min-w-[300px]',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const DefaultWithLeadingIcon: Story = {
  args: {
    variant: 'default',
    leadingIcon: <Mail size={20} />,
  },
}

export const DefaultWithLeadingIconAndMessage: Story = {
  args: {
    variant: 'default',
    leadingIcon: <Mail size={20} />,
    message: 'This is a hint text to help user.',
  },
}

export const DefaultWithLeadingIconDisabled: Story = {
  args: {
    variant: 'default',
    leadingIcon: <Mail size={20} />,
    disabled: true,
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
