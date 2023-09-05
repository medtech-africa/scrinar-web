import * as React from 'react'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const cardVariants = cva('', {
  variants: {
    // size: {
    //   sm: 'px-4 py-[7px]',
    //   md: 'px-4 py-2',
    //   lg: 'px-4 py-3',
    //   xl: 'px-4 py-4',
    // },
  },
  defaultVariants: {
    // size: 'md',
  },
})

export interface CardProps
  extends React.HTMLAttributes<Omit<HTMLDivElement, 'title'>>,
    VariantProps<typeof cardVariants> {
  //   title: React.ReactNode
  description: React.ReactNode
  icon: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border text-card-foreground min-h-[73px] p-4 bg-gray-50 shadow border-white justify-start items-center gap-4 inline-flex',
        className
      )}
      {...props}
    >
      {<div className="">{icon}</div>}
      <div className="flex-col justify-center items-start gap-[5px] inline-flex">
        <div className="text-gray-900 text-base font-medium leading-normal">
          {title}
        </div>
        <div className="text-gray-500 text-xs font-normal leading-3">
          {description}
        </div>
      </div>
    </div>
  )
)
Card.displayName = 'Card'

export { Card }
