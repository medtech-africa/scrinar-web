import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const SmallCheckIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <mask
        id="mask0_52_16022"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_52_16022)">
        <path
          d="M6.66667 10.9337L4 8.26699L4.93333 7.33366L6.66667 9.06699L11.0667 4.66699L12 5.60033L6.66667 10.9337Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
