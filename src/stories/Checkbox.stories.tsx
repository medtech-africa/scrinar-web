import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Example/Checkbox',
  // A control that allows the user to toggle between checked and not checked.
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
  },
}

export function CheckboxWithText() {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor="terms1"
        >
          Accept terms and conditions
        </Label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export function CheckboxDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" disabled />
      <Label
        htmlFor="terms2"
      >
        Accept terms and conditions
      </Label>
    </div>
  )
}
