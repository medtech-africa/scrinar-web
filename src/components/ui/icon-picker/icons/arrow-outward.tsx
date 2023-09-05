import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const ArrowOutwardIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <mask
        id="mask0_352_27327"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="17"
        height="16"
      >
        <rect x="0.333496" width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_352_27327)">
        <path
          d="M4.60033 11.9997L3.66699 11.0663L10.067 4.66634H4.33366V3.33301H12.3337V11.333H11.0003V5.59967L4.60033 11.9997Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
