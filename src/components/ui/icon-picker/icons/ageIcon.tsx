import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const AgeIcon: FunctionComponent<IconPickerProp> = ({
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
      <rect x="1" y="1.5" width="38" height="38" rx="7" fill="#E31B23" />
      <path
        d="M16 10.5V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 10.5V13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 17.5898H28.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 17V25.5C29 28.5 27.5 30.5 24 30.5H16C12.5 30.5 11 28.5 11 25.5V17C11 14 12.5 12 16 12H24C27.5 12 29 14 29 17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.6947 22.1992H23.7037"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.6947 25.1992H23.7037"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9955 22.1992H20.0045"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9955 25.1992H20.0045"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2943 22.1992H16.3033"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2943 25.1992H16.3033"
        stroke="currentColor"
        strokeWidth="2"
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
