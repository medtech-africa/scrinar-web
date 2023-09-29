import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const PasswordIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      viewBox="0 0 20 20"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.18337 16.25H6.25004C5.73337 16.25 5.27504 16.2333 4.86671 16.175C2.67504 15.9333 2.08337 14.9 2.08337 12.0833V7.91667C2.08337 5.1 2.67504 4.06667 4.86671 3.825C5.27504 3.76667 5.73337 3.75 6.25004 3.75H9.13337"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5167 3.75H13.7501C14.2667 3.75 14.7251 3.76667 15.1334 3.825C17.3251 4.06667 17.9167 5.1 17.9167 7.91667V12.0833C17.9167 14.9 17.3251 15.9333 15.1334 16.175C14.7251 16.2333 14.2667 16.25 13.7501 16.25H12.5167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 1.66663V18.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.24534 10H9.25283"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.91209 10H5.91957"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
