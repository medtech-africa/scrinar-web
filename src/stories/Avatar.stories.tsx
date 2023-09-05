import { Meta } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'

const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta

export const Example = () => (
  <Avatar>
    <AvatarImage src="https://img.lovepik.com/element/40128/7461.png_1200.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)
