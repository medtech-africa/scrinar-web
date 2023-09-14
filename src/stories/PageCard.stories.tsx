import { PageCard } from '@/components/ui/PageCard'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Example/PageCard',
  component: PageCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '12 Years',
  },
}

export const Example = () => {
  return (
    <div>
      <PageCard title="Add New health" className="w-full">
        <div>hhjjj</div>
      </PageCard>
    </div>
  )
}
