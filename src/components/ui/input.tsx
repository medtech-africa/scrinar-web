import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Text } from './text'
import { IconPicker } from './icon-picker'

const inputVariants = cva(
  'py-[10px] px-[14px] rounded-lg border border-grey-300 bg-white placeholder:text-grey-500 text-grey-900 utils-focus-outset disabled:bg-grey-50 disabled:text-grey-500',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-carmine-pink-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  full?: boolean
  label?: string
  option?: string
  message?: string
  leadingIcon?: React.ReactNode
  endingIcon?: React.ReactNode
  labelStyle?: string
  optionStyle?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      full = true,
      message,
      leadingIcon,
      endingIcon,
      label,
      labelStyle,
      option,
      optionStyle,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <div className="flex flex-row gap-x-1 items-baseline">
          {!!label && (
            <label
              htmlFor={props.name}
              className={cn(
                'text-grey-700 font-medium text-sm mb-[6px]',
                labelStyle
              )}
            >
              {label}
              {helperText && <span className="block">{helperText}</span>}
            </label>
          )}
          {!!option && (
            <label
              htmlFor={props.name}
              className={cn('text-xs text-grey-400', optionStyle)}
            >
              {option}
            </label>
          )}
        </div>
        <div className="relative">
          <span className=" absolute flex items-center left-[14px] top-0 bottom-0 text-grey-900">
            {leadingIcon}
          </span>
          <input
            className={cn(
              inputVariants({ variant, className }),
              full && 'w-full',
              !!leadingIcon && 'pl-[42px]'
            )}
            ref={ref}
            {...props}
          />
          <div className="flex absolute right-[14px] top-0 bottom-0 items-center">
            {variant === 'destructive' && (
              <IconPicker icon="alertCircle" className="text-error-500" />
            )}
            {!!endingIcon && (
              <span className="text-grey-900 text-xl">{endingIcon}</span>
            )}
          </div>
        </div>

        {!!message && (
          <Text
            className={cn(
              'text-grey-500 mt-[6px]',
              variant === 'destructive' && 'text-error-500'
            )}
            variant="text/sm"
          >
            {message}
          </Text>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
