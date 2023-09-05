import { Meta, StoryObj } from '@storybook/react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from '../components/ui/avatar'

const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://img.lovepik.com/element/40128/7461.png_1200.png',
    fallback: 'CN',
  },
}

export const Fallback: Story = {
  args: {
    src: '',
    fallback: 'CN',
  },
}

export const Example = () => (
  <Avatar
    src="https://img.lovepik.com/element/40128/7461.png_1200.png"
    fallback="CN"
  />
)

export const Example2 = () => (
  <AvatarRoot>
    <AvatarImage
      src="https://img.lovepik.com/element/40128/7461.png_1200.png"
      alt="@asah"
    />
    <AvatarFallback>CN</AvatarFallback>
  </AvatarRoot>
)
