import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:border-2',
  {
    variants: {
      variant: {
        default:
          'bg-grey-800 text-grey-50 hover:bg-grey-900 focus:border-grey-200',
        primary:
          'bg-lust-800 text-grey-50 hover:bg-lust-900 focus:border-lust-200',
        secondary:
          'bg-secondary text-grey-900 hover:bg-sunglow-800 focus:border-sunglow-200',
      },

      size: {
        default: 'h-10 px-4 py-2',
        sm: 'px-4 py-[7px]',
        md: 'px-4 py-2',
        lg: 'px-4 py-3',
        xl: 'px-4 py-4',
      },
      disabled: {
        true: 'pointer-events-none',
        false: ' cursor-pointer ',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        disabled: true,
        class: 'bg-lust-50 text-lust-200',
      },
      {
        variant: 'secondary',
        disabled: true,
        class: 'bg-sunglow-100 text-gray-400 ',
      },
      {
        variant: 'default',
        disabled: true,
        class: 'bg-gray-100 text-gray-400',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      disabled,
      formAction: _,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, disabled }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
