import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const HealthIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M8.97021 22H14.9702C19.9702 22 21.9702 20 21.9702 15V9C21.9702 4 19.9702 2 14.9702 2H8.97021C3.97021 2 1.97021 4 1.97021 9V15C1.97021 20 3.97021 22 8.97021 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.97021 12.7001L7.97021 12.6801C8.72021 12.6801 9.56021 13.2501 9.84021 13.9501L10.9802 16.8301C11.2402 17.4801 11.6502 17.4801 11.9102 16.8301L14.2002 11.0201C14.4202 10.4601 14.8302 10.4401 15.1102 10.9701L16.1502 12.9401C16.4602 13.5301 17.2602 14.0101 17.9202 14.0101H21.9802"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
