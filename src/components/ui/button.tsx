import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { IconPicker } from './icon-picker'
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-4  focus-visible:ring-offset-0 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-grey-800 text-grey-50 hover:bg-grey-900 focus:border-grey-200 focus-visible:ring-grey-200',
        primary:
          'bg-lust-800 text-grey-50 hover:bg-lust-900 focus:border-lust-200 focus-visible:ring-lust-200',
        secondary:
          'bg-secondary text-grey-900 hover:bg-sunglow-800 focus-visible:ring-sunglow-200',
        tertiary: 'bg-grey-50 text-grey-900 hover:bg-grey-100',
        outline:
          'bg-white text-grey-900 hover:bg-grey-50 border border-grey-900 ',
      },

      size: {
        sm: 'px-4 py-[7px]',
        md: 'px-4 py-2',
        lg: 'px-4 py-3',
        xl: 'px-4 py-4',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-45',
        false: '',
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
      variant: 'primary',
      size: 'md',
      disabled: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean
  leadingIcon?: React.ReactNode
  endingIcon?: React.ReactNode
  onlyIcon?: React.ReactNode
  value?: string
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      leadingIcon,
      endingIcon,
      onlyIcon,
      value,
      formAction: _,
      loading,
      ...props
    },
    ref
  ) => {
    const Comp = 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, disabled }))}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {onlyIcon ? (
          <span className="inline-flex items-center">{onlyIcon}</span>
        ) : loading ? (
          <>
            <IconPicker icon="loader2" size="1rem" className="mr-2" />
            Please wait
          </>
        ) : (
          <>
            {leadingIcon && (
              <span className="inline-flex items-center mr-2">
                {leadingIcon}
              </span>
            )}
            {props.children || value}
            {endingIcon && (
              <span className="inline-flex items-center ml-2">
                {endingIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
