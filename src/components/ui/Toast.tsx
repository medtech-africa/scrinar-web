import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { IconPicker } from './icon-picker'
import { Button } from './button'
import { Text } from './text'
import { Renderable, Toast, ValueFunction } from 'react-hot-toast'

const toastVariants = cva(
  'flex justify-between items-center space-x-4 border-l-4 border-y border-y-grey-100 text-sm font-medium px-4 py-3 bg-white shadow-[0_7px_9px_0px_rgba(117,117,117,0.13)] max-w-[534px]',
  {
    variants: {
      variant: {
        success: 'border-green-900',
        destructive: 'border-lust-900',
        warning2: 'border-orange-900',
        info: 'border-blue-900',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  }
)

export interface ToastVariantsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  label?: string | ValueFunction<Renderable, Toast> | React.ReactNode
  subtext?: string
  buttonText2?: string
  action1?: () => void
  action2?: () => void
}

const ToastField = React.forwardRef<HTMLDivElement, ToastVariantsProps>(
  ({ variant, label, subtext, className, ...props }, ref) => {
    return (
      <div
        className={cn(toastVariants({ variant, className }))}
        {...props}
        ref={ref}
      >
        <div>
          {variant === 'success' && (
            <div className="rounded-full p-2 text-green-900 bg-green-50">
              <IconPicker icon="check" size={24} />
            </div>
          )}
          {variant === 'destructive' && (
            <div className="rounded-full p-2 text-lust-900 bg-lust-50 ">
              <IconPicker icon="danger" size={24} />
            </div>
          )}
          {variant === 'info' && (
            <div className=" rounded-full p-2 text-blue-900 bg-blue-50">
              <IconPicker icon="information" size={24} />
            </div>
          )}
          {variant === 'warning2' && (
            <div className=" rounded-full p-2 text-orange-900 bg-orange-50">
              <IconPicker icon="warning2" size={24} />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Text variant="text/sm" weight="medium" className="text-grey-800">
            {label as React.ReactNode}
          </Text>
          <Text variant="text/xs" className="text-grey-600">
            {subtext}
          </Text>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="tertiary"
            onClick={props.action1}
            onlyIcon={<IconPicker icon="closeSquare" />}
          />

          {props.buttonText2 && (
            <Button variant="tertiary" onClick={props.action2}>
              {props.buttonText2}
            </Button>
          )}
        </div>
      </div>
    )
  }
)
ToastField.displayName = 'Toast'
export { ToastField, toastVariants }
