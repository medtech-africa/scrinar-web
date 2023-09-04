import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusVariants = cva( 'inline-flex items-center justify-center rounded-lg text-sm font-medium border-[1px] py-[5px] px-4 rounded-2xl cursor-pointer',{
    variants: {
      variant: {
       orange: 'border-[#FDE9CE80] text-yellow-orange-900 bg-yellow-orange-50',
       green: 'border-[#D0F1E180] text-green-900 bg-green-50',
       yellow: 'border-[#FDF5D880] text-sunglow-900 bg-sunglow-50',
       red: 'border-[#F9D1D380] text-lust-900 bg-lust-50',
       darkorange: 'border-[#FEE0D080] text-orange-900 bg-orange-50',
       darkRed: 'border-[#FCDAD780] text-carmine-pink-red-900 bg-carmine-pink-red-50',

      }
    },
    defaultVariants: {
      variant: 'orange',
    },
})

export interface StatusVariantsProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof statusVariants> {}


const StatusField =  React.forwardRef<HTMLDivElement, StatusVariantsProps>(({variant, className, ...props}, ref)=> {
  return (
    <div className={cn(statusVariants({variant, className}))}   {...props}  ref={ref}/>
  )
}
) 
export { StatusField, statusVariants}