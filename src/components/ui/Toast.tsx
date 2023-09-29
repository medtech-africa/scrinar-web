import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { IconPicker } from './icon-picker'

const toastVariants = cva(
  'flex justify-between items-center w-[570px] h-[64px]  border-l-4 text-sm font-medium  px-4 py-3 cursor-pointer',
  {
    variants: {
      variant: {
        success: 'border-[#12B76A] ',
        danger: 'border-[#E31B23]',
        warning2: 'border-[#FB6514]',
        information: 'border-[#1570EF] ',
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
  value?: string
  label?: string
  subtext?: string
}

const ToastField = React.forwardRef<HTMLDivElement, ToastVariantsProps>(
  ({ variant, label, subtext, className,  ...props }, ref) => {
    return (
      <div
        className={cn(toastVariants({ variant, className }))}
        {...props}
        ref={ref}
      >
        <div className="flex items-center justify-between">
          <div className="m-4">
            {variant === 'success' && (
              <IconPicker
                icon="check"
                className="w-[16.3px] h-[12.03px] rounded-full p-6 text-green-900 bg-green-50"
              />
            )}
            {variant === 'danger' && (
              <IconPicker
                icon="danger"
                className="w-[16.3px] h-[12.03px] rounded-full p-6 text-lust-900 bg-lust-50 "
              />
            )}
            {variant === 'information' && (
              <IconPicker
                icon="information"
                className="w-[16.3px] h-[12.03px] rounded-full p-6 text-blue-900 bg-blue-50"
              />
            )}
            {variant === 'warning2' && (
              <IconPicker
                icon="warning2"
                className="w-[16.3px] h-[12.03px] rounded-full p-6 text-orange-900 bg-orange-50"
              />
            )}
          </div>
          <div className="flex flex-col ml-4">
            <span className="text-base font-semibold">{label}</span>
            <span>{subtext}</span>
          </div>
        </div>
        <div>
          <span className='px-4 py-2 mr-2 ml-1'>button text 1</span>
          <span>button text 2</span>
          {props.children}
          </div>
      </div>
    )
  }
)
ToastField.displayName = 'Toast'
export { ToastField, toastVariants }
