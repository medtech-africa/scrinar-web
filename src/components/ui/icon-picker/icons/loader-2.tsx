import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const Loader2Icon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(`text-currentColor animate-spin`, className)}
      style={{
        width: size,
        height: size,
        ...rest.style,
      }}
      {...rest}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  )
}
