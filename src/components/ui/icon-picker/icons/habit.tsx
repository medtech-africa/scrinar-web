import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const HabitIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
    >
      <rect x="1.5" y="1.5" width="38" height="38" rx="7" fill="#F7CC3B" />
      <path
        d="M25.6797 26.5C28.0797 26.5 28.6797 25.15 28.6797 23.5V17.5C28.6797 15.85 28.0797 14.5 25.6797 14.5C23.2797 14.5 22.6797 15.85 22.6797 17.5V23.5C22.6797 25.15 23.2797 26.5 25.6797 26.5Z"
        stroke="#101828"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.3203 26.5C12.9203 26.5 12.3203 25.15 12.3203 23.5V17.5C12.3203 15.85 12.9203 14.5 15.3203 14.5C17.7203 14.5 18.3203 15.85 18.3203 17.5V23.5C18.3203 25.15 17.7203 26.5 15.3203 26.5Z"
        stroke="#101828"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3203 20.5H22.6803"
        stroke="#101828"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M31 23V18"
        stroke="#101828"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 23V18"
        stroke="#101828"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="1.5"
        y="1.5"
        width="38"
        height="38"
        rx="7"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  )
}
