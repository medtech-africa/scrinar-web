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

export const OrangeStatus: Story = {
args: {
    variant: 'orange',
    children: 'Inprogress'
}
}
export const GreenStatus: Story = {
args: {
    variant: 'green',
    children: 'Completed'
}
}
export const YellowStatus: Story = {
args: {
    variant: 'yellow',
    children: 'Schedule'
}
}
export const RedStatus: Story = {
args: {
    variant: 'red',
    children: 'Overdue'
}
}
export const DarkOrangeStatus: Story = {
args: {
    variant: 'darkorange',
    children: 'Highly Obese'
}
}
export const DarkRedStatus: Story = {
args: {
    variant: 'darkRed',
    children: 'Over Weight'
}
}