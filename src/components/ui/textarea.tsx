import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Text } from './text'

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
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  full?: boolean
  label?: string
  option?: string
  message?: string
  labelStyle?: string
  optionStyle?: string
  helperText?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      variant,
      full = true,
      message,
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
          <textarea
            className={cn(
              inputVariants({ variant, className }),
              full && 'w-full'
            )}
            ref={ref}
            {...props}
          />
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
TextArea.displayName = 'TextArea'

export { TextArea, inputVariants }
