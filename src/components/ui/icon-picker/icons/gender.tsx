import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const GenderIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      viewBox="0 0 40 41"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1.5" width="38" height="38" rx="7" fill="#1570EF" />
      <path
        d="M18.25 30C22.5302 30 26 26.5302 26 22.25C26 17.9698 22.5302 14.5 18.25 14.5C13.9698 14.5 10.5 17.9698 10.5 22.25C10.5 26.5302 13.9698 30 18.25 30Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 11L24 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 11H29.5V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1.5"
        width="38"
        height="38"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
