import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const ClockIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6666 8.00065C14.6666 11.6807 11.6799 14.6673 7.99992 14.6673C4.31992 14.6673 1.33325 11.6807 1.33325 8.00065C1.33325 4.32065 4.31992 1.33398 7.99992 1.33398C11.6799 1.33398 14.6666 4.32065 14.6666 8.00065Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4734 10.1192L8.40675 8.88586C8.04675 8.67253 7.75342 8.15919 7.75342 7.73919V5.00586"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
