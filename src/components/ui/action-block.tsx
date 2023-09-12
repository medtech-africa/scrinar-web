import * as React from 'react'

import { cn } from '@/lib/utils'
import { Text } from './text'

export interface ActionBlockProps
  extends React.HTMLAttributes<Omit<HTMLDivElement, 'title'>> {
  title: string
}

const ActionBlock = React.forwardRef<HTMLDivElement, ActionBlockProps>(
  ({ className, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border min-h-[73px] border-grey-100',
        className
      )}
      {...props}
    >
      <div className="p-4 bg-grey-50">
        <Text variant="text/sm" weight="medium" className="text-grey-800">
          {title}
        </Text>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
)
ActionBlock.displayName = 'ActionBlock'

export { ActionBlock }
