import type { Meta, StoryObj } from '@storybook/react'

import { SideBar } from '@/components/ui/sidebar'

const meta = {
  title: 'Example/Sidebar',
  component: SideBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SideBar>

export default meta
type Story = StoryObj<typeof meta>

export const OpenedSidebar: Story = {
  args: {
    sideToggleOpen: () => null,
    sideOpen: true,
  },
}
