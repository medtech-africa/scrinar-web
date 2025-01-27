import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
  href: string
  active?: boolean
  className?: string
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, href, active, className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        {...props}
        href={href}
        className={cn(
          'flex items-center py-3 px-4 gap-2 rounded-lg',
          {
            'bg-primary text-white': active,
          },
          className
        )}
      >
        {children}
      </Link>
    )
  }
)

NavLink.displayName = 'NavLink'
