import * as React from 'react'

import { cn } from '@/lib/utils'

export interface CardProps
  extends React.HTMLAttributes<Omit<HTMLDivElement, 'title'>> {
  description?: React.ReactNode
  icon?: React.ReactNode
  iconClassName?: string
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, title, description, icon, iconClassName, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border text-card-foreground min-h-[73px] p-4 bg-gray-50 shadow border-white justify-start items-center gap-4 inline-flex',
        className
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          <div
            className={cn(
              'p-2 rounded-lg flex-col justify-center items-start gap-[5px] inline-flex',
              iconClassName
            )}
          >
            {icon}
          </div>
          <div className="flex-col justify-center items-start gap-[5px] inline-flex">
            <div className="text-gray-900 text-base font-medium leading-normal">
              {title}
            </div>
            <div className="text-gray-500 text-xs font-normal leading-3">
              {description}
            </div>
          </div>
        </>
      )}
    </div>
  )
)
Card.displayName = 'Card'

export { Card }
