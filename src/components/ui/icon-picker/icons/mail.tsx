import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const MailIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M18.3337 5.00004C18.3337 4.08337 17.5837 3.33337 16.667 3.33337H3.33366C2.41699 3.33337 1.66699 4.08337 1.66699 5.00004M18.3337 5.00004V15C18.3337 15.9167 17.5837 16.6667 16.667 16.6667H3.33366C2.41699 16.6667 1.66699 15.9167 1.66699 15V5.00004M18.3337 5.00004L10.0003 10.8334L1.66699 5.00004"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
