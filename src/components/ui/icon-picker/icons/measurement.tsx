import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const MeasurementIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      viewBox="0 0 41 41"
      fill="none"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="38" height="38" rx="7" fill="#F79009" />
      <g clipPath="url(#clip0_85_47216)">
        <path
          d="M13.5 25.5H27.5C29.5 25.5 30.5 24.5 30.5 22.5V18.5C30.5 16.5 29.5 15.5 27.5 15.5H13.5C11.5 15.5 10.5 16.5 10.5 18.5V22.5C10.5 24.5 11.5 25.5 13.5 25.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M26.5 15.5V20.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14.5 15.5V19.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18.55 15.5L18.5 20.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22.5 15.5V18.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <rect
        x="1.5"
        y="1.5"
        width="38"
        height="38"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <defs>
        <clipPath id="clip0_85_47216">
          <rect
            width="24"
            height="24"
            fill="currentColor"
            transform="translate(8.5 8.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
