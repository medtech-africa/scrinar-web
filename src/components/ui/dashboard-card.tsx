import React from 'react'
import { cn } from '@/lib/utils'

import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

const DashboardCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-[230.33px] h-36 p-1 bg-gray-50 rounded-lg border border-gray-100 flex-col justify-start items-start gap-2 inline-flex',
      className
    )}
    {...props}
  >
    <div
      className={cn(
        'self-stretch h-[136px] p-4 bg-white rounded-md flex-col justify-start items-start gap-4 flex'
      )}
    >
      {children}
    </div>
  </div>
))
DashboardCard.displayName = 'DashboardCard'

export interface DashboardCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  subtitle: string
}
const DashboardCardHeader = React.forwardRef<
  HTMLDivElement,
  DashboardCardHeaderProps
>(({ className, icon, title, subtitle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'self-stretch justify-center items-center gap-4 inline-flex',
      className
    )}
    {...props}
  >
    {icon}
    <div className="grow shrink basis-0 h-8 justify-between items-center gap-2 flex">
      <div className="text-gray-900 text-2xl font-bold leading-loose">
        {title}
      </div>
      <div className="text-gray-500 text-xs font-medium leading-[10px]">
        {subtitle}
      </div>
    </div>
  </div>
))
DashboardCardHeader.displayName = 'DashboardCardHeader'

const DashboardCardIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-2 bg-violet-100 rounded-lg shadow border border-violet-200 justify-center items-center gap-2.5 flex',
      className
    )}
    {...props}
  >
    <div className="w-6 h-6 justify-center items-center flex">
      <div className="w-6 h-6 relative">{children}</div>
    </div>
  </div>
))
DashboardCardIcon.displayName = 'DashboardCardIcon'

export interface DashboardCardAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  border?: string
  background?: string
  src?: string | StaticImport | null
}

const DashboardCardAvatar = React.forwardRef<
  HTMLDivElement,
  DashboardCardAvatarProps
>(({ className, border, background, src = '', children, ...props }, ref) => (
  <div ref={ref} className={cn('w-8 h-8 relative', className)} {...props}>
    <div
      className={cn(
        'w-8 h-8 left-0 top-0 absolute bg-white rounded-full border border-orange-100',
        border
      )}
    />
    <div
      className={cn(
        'w-7 h-7 left-[2px] top-[2px] absolute bg-amber-50 rounded-full',
        background
      )}
    />
    {children || !src ? (
      children
    ) : (
      <Image
        className="w-[26px] h-[26px] left-[3px] top-[3px] absolute rounded-[100px]"
        src={src}
        width={26}
        height={26}
        alt=""
      />
    )}
  </div>
))
DashboardCardAvatar.displayName = 'DashboardCardAvatar'

const DashboardCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'self-stretch justify-between items-center gap-2.5 inline-flex',
      className
    )}
    {...props}
  />
))
DashboardCardFooter.displayName = 'DashboardCardFooter'

const DashboardCardDivider = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('self-stretch h-[0px] border border-gray-50', className)}
    {...props}
  ></div>
)
DashboardCardDivider.displayName = 'DashboardCardDivider'

export {
  DashboardCard,
  DashboardCardHeader,
  DashboardCardIcon,
  DashboardCardAvatar,
  DashboardCardFooter,
  DashboardCardDivider,
}
