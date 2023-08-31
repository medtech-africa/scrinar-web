import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'

const meta = {
  title: 'Example/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  args: {
    // children: "Text",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  //   tags: ["autodocs"],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {}
