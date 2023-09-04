import { Button } from '../components/ui/button'
import type { Meta, StoryObj } from '@storybook/react'
import { Loader2, Mail } from 'lucide-react'
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
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
}
export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Login with Email <Mail className="ml-2 h-4 w-4" />
      </>
    ),
  },
}
export const OnlyIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="h-4 w-4" />
      </>
    ),
  },
}

export const Loading: Story = {
  args: {
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
