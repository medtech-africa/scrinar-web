import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const PrimaryIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1.5" width="38" height="38" rx="7" fill="#6941C6" />
      <path
        d="M18.0495 11.0293L12.0295 14.9593C10.0995 16.2193 10.0995 19.0393 12.0295 20.2993L18.0495 24.2293C19.1295 24.9393 20.9095 24.9393 21.9895 24.2293L27.9795 20.2993C29.8995 19.0393 29.8995 16.2293 27.9795 14.9693L21.9895 11.0393C20.9095 10.3193 19.1295 10.3193 18.0495 11.0293Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.6301 21.5801L13.6201 26.2701C13.6201 27.5401 14.6001 28.9001 15.8001 29.3001L18.9901 30.3601C19.5401 30.5401 20.4501 30.5401 21.0101 30.3601L24.2001 29.3001C25.4001 28.9001 26.3801 27.5401 26.3801 26.2701V21.6301"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.4004 23.5V17.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="1"
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
