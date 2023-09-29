import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const BookmarkIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M4.5 11H7.5C10 11 11 10 11 7.5V4.5C11 2 10 1 7.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 1.2207V6.2107C8.5 7.1957 7.795 7.5807 6.93 7.0607L6.27 6.6657C6.12 6.5757 5.88 6.5757 5.73 6.6657L5.07 7.0607C4.205 7.5757 3.5 7.1957 3.5 6.2107V1.2207"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 11H7.5C10 11 11 10 11 7.5V4.5C11 2 10 1 7.5 1H4.5C2 1 1 2 1 4.5V7.5C1 10 2 11 4.5 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 1.2207V6.2107C8.5 7.1957 7.795 7.5807 6.93 7.0607L6.27 6.6657C6.12 6.5757 5.88 6.5757 5.73 6.6657L5.07 7.0607C4.205 7.5757 3.5 7.1957 3.5 6.2107V1.2207"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
