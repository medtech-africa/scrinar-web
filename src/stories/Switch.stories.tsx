import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Example/Switch',
  // A control that allows the user to toggle between checked and not checked.
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
  },
}

export function SwitchWithText() {
  return (
    <div className="container">
       <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
    </div>
  )
}

export function SwitchDisabled() {
  return (
        <div className="container">
    <div className="flex items-center space-x-2">
      <Switch id="terms2" disabled />
      <Label
        htmlFor="terms2"
      >
        Accept terms and conditions
      </Label>
    </div>
    </div>
  )
}
