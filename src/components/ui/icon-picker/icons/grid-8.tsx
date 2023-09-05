import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const Grid8Icon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      />
      <path
        d="M2 12H22"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      />
      <path
        d="M8.25 12V21.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      />
      <path
        d="M15.75 22V12"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      />
      <path
        d="M8.25 12V2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      />
      <path
        d="M15.75 12V2.54004"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="currentColor"
      />
    </svg>
  )
}
