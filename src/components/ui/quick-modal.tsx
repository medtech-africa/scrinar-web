import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { IconPicker } from './icon-picker'

const QuickModalVariants = cva('flex  ', {
  variants: {
    variant: {
      default: '',
      teacher: 'border-carmine-pink-red-500',
      health: 'border-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof QuickModalVariants> {
  header?: string
  subtext?: string
}

const QuickModal = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, header, subtext }) => {
    return (
      <div className="w-[315px] h-[41px] flex justify-between items-center self-stretch">
        <div className="flex justify-center items-center">
          <div className="mr-4 bg-gray-100 p-2 rounded-lg">
            {variant === 'default' && (
              <IconPicker icon="profile2User" className="text-black" />
            )}
            {variant === 'health' && (
              <IconPicker icon="health" className="text-black" />
            )}
            {variant === 'teacher' && (
              <IconPicker icon="teacher" className="text-black" />
            )}
          </div>
          <div className="flex flex-col">
            <span className='text-sm font-medium text-gray-800 leading-[18px]'>{header}</span>
            <span className='text-sm font-normal text-gray-500 leading-[18px]'>{subtext}</span>
          </div>
        </div>
        <div>
          <IconPicker icon="arrowOutward" className="text-black" />
        </div>
      </div>
    )
  }
)
QuickModal.displayName = 'QuickModal'

export { QuickModal, QuickModalVariants }
