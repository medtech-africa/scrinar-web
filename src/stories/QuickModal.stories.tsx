import { Meta, StoryObj } from '@storybook/react'
import { QuickModal } from '../components/ui/quick-modal'

const meta = {
  title: 'Design System/Quick-Modal',
  component: QuickModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof QuickModal>

export default meta
type Story = StoryObj<typeof meta>

export const Instructor: Story = {
  args: {
    variant: 'teacher',
    header: 'Create New Instructor Profile',
    subtext: 'Lorem ipsum dolor sit amet',
  },
}
export const Health: Story = {
  args: {
    variant: 'health',
    header: 'Update Student Health Data',
    subtext: 'Lorem ipsum dolor sit amet',
  },
}
export const CreateProfile: Story = {
  args: {
    variant: 'default',
    header: 'Create New Student Profile',
    subtext: 'Lorem ipsum dolor sit amet',
  },
}
