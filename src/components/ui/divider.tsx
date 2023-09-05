import { cn } from '@/lib/utils'
import React, { FC } from 'react'

export const Divider: FC<{ className?: string }> = ({ className }) => {
  return <hr className={cn('border-0 border-t border-grey-100', className)} />
}
