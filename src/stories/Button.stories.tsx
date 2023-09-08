import { IconPicker } from '@/components/ui/icon-picker'
import { Button } from '../components/ui/button'
import type { Meta, StoryObj } from '@storybook/react'
import Link from 'next/link'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      type: 'boolean',
    },
  },
  args: {
    children: 'Button',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
}
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <IconPicker icon="mail" className="mr-2" /> Login with Email
      </>
    ),
  },
}
export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Login with Email <IconPicker icon="mail" className="ml-2" />
      </>
    ),
  },
}
export const OnlyIcon: Story = {
  args: {
    children: (
      <>
        <IconPicker icon="mail" />
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    children: (
      <>
        <IconPicker icon="loader2" size="1.5rem" className="mr-2" />
        Please wait
      </>
    ),
  },
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <>
        <Link href="/login">Login</Link>
      </>
    ),
  },
}
