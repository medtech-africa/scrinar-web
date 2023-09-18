import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const WeightIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      viewBox="0 0 41 41"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="38" height="38" rx="7" fill="#101828" />
      <path
        d="M18.5 30.5H22.5C27.5 30.5 29.5 28.5 29.5 23.5V17.5C29.5 12.5 27.5 10.5 22.5 10.5H18.5C13.5 10.5 11.5 12.5 11.5 17.5V23.5C11.5 28.5 13.5 30.5 18.5 30.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.75 16.7899C22.76 14.1299 18.24 14.1299 15.25 16.7899L17.43 20.2899C19.18 18.7299 21.82 18.7299 23.57 20.2899L25.75 16.7899Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.5"
        y="1.5"
        width="38"
        height="38"
        rx="7"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  )
}
