import { cn } from '@/lib/utils'
import * as React from 'react'
import { Text } from './text'

export interface PageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  bodyStyle?: string
  textContainerClassName?: string
}

const PageCard = React.forwardRef<HTMLDivElement, PageCardProps>(
  (
    { className, title, subtitle, bodyStyle, textContainerClassName, ...props },
    ref
  ) => (
    <div ref={ref} className={cn('w-full bg-white', className)}>
      <div className={cn('mb-6 md:mb-8', textContainerClassName)}>
        <Text weight="medium" className="text-grey-900">
          {title}
        </Text>
        {subtitle && (
          <Text weight="medium" className="text-gray-600 mb-2">
            {subtitle}
          </Text>
        )}
      </div>
      <div className={cn('w-full', bodyStyle)}>{props.children}</div>
    </div>
  )
)
PageCard.displayName = 'PageCard'

export { PageCard }
