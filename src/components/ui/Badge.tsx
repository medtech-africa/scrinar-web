import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium border-[1px] py-[5px] px-4 rounded-2xl cursor-pointer',
  {
    variants: {
      variant: {
        pending:
          'border-[#FDE9CE80] text-yellow-orange-900 bg-yellow-orange-50',
        success: 'border-[#D0F1E180] text-green-900 bg-green-50',
        warning: 'border-[#FDF5D880] text-sunglow-900 bg-sunglow-50',
        error: 'border-[#F9D1D380] text-lust-900 bg-lust-50',
        pending2: 'border-[#FEE0D080] text-orange-900 bg-orange-50',
        danger:
          'border-[#FCDAD780] text-carmine-pink-red-900 bg-carmine-pink-red-50',
      },
    },
    defaultVariants: {
      variant: 'pending',
    },
  }
)

export interface BadgeVariantsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  value?: string
}

const BadgeField = React.forwardRef<HTMLDivElement, BadgeVariantsProps>(
  ({ variant, className, value, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, className }))}
        {...props}
        ref={ref}
      >
        {props.children || value}
      </div>
    )
  }
)
BadgeField.displayName = 'Badge'
export { BadgeField, badgeVariants }
