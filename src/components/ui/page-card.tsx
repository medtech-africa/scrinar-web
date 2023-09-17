import { cn } from '@/lib/utils'
import * as React from 'react'
import { Text } from './text'

export interface PageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  bodyStyle?: string
}

const PageCard = React.forwardRef<HTMLDivElement, PageCardProps>(
  ({ className, title, bodyStyle, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full bg-white border border-gray-100 rounded-lg',
        className
      )}
    >
      <div className="bg-grey-50 pb-6">
        <Text
          variant="text/sm"
          weight="medium"
          className="text-grey-800 p-4 flex items-start"
        >
          {title}
        </Text>
      </div>
      <div className={cn('w-full', bodyStyle)}>{props.children}</div>
    </div>
  )
)
PageCard.displayName = 'PageCard'

export { PageCard }
