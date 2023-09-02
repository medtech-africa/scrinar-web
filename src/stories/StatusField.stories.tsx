import { Meta, StoryObj } from "@storybook/react";
import {StatusField} from '../components/ui/StatusField';

const meta = {
title:'Design System/StatusField',
component: StatusField,
parameters: {
    layout: 'centered'
},

} satisfies Meta <typeof StatusField>

export default meta
type Story = StoryObj<typeof meta>

export const Inprogress: Story = {
args: {
    variant: 'inprogress',
    children: 'Inprogress'
}
}
export const Completed: Story = {
args: {
    variant: 'completed',
    children: 'Completed'
}
}
export const Schedule: Story = {
args: {
    variant: 'schedule',
    children: 'Schedule'
}
}
export const Overdue: Story = {
args: {
    variant: 'overdue',
    children: 'Overdue'
}
}
export const HighlyObese: Story = {
args: {
    variant: 'highlyObese',
    children: 'Highly Obese'
}
}
export const OverWeight: Story = {
args: {
    variant: 'overweight',
    children: 'Over Weight'
}
}