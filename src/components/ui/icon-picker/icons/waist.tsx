import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const WaistIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="38" height="38" rx="7" fill="#42307D" />
      <path
        d="M29.9697 27.5V13.5C29.9697 11.5 28.9697 10.5 26.9697 10.5H22.9697C20.9697 10.5 19.9697 11.5 19.9697 13.5V27.5C19.9697 29.5 20.9697 30.5 22.9697 30.5H26.9697C28.9697 30.5 29.9697 29.5 29.9697 27.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.9697 14.5H24.9697"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.9697 26.5H23.9697"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.9697 22.4492L24.9697 22.4992"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.9697 18.5H22.9697"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.9903 10.5C12.3603 10.5 11.0303 11.83 11.0303 13.45V26.41C11.0303 26.86 11.2203 27.54 11.4503 27.93L12.2703 29.29C13.2103 30.86 14.7603 30.86 15.7003 29.29L16.5203 27.93C16.7503 27.54 16.9403 26.86 16.9403 26.41V13.45C16.9403 11.83 15.6103 10.5 13.9903 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.9403 15.5H11.0303"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="1.5"
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
