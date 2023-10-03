import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      'display/2xl': 'text-7xl leading-[5.625rem]',
      'display/xl': 'text-6xl leading-[4.5rem]',
      'display/lg': 'text-5xl leading-[3.75rem]',
      'display/md': 'text-4xl leading-11',
      'display/sm': 'text-3xl leading-[2.375rem]',
      'display/xs': 'text-2xl',
      'text/xl': 'text-xl leading-[1.875rem]',
      'text/lg': 'text-lg leading-7',
      'text/md': 'text-base leading-6',
      'text/sm': 'text-sm leading-[1.125rem]',
      'text/xs': 'text-xs leading-[1.125rem]',
    },
    weight: {
      default: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
      'x-bold': 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'text/md',
    weight: 'default',
  },
})

export interface TextProps
  extends React.ComponentPropsWithRef<'div'>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
}

const Text = React.forwardRef<any, TextProps>(
  ({ className, variant, weight, as: Comp = 'p', ...props }, ref) => {
    return (
      <Comp
        className={cn(textVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Text.displayName = 'Text'

export { Text, textVariants }
