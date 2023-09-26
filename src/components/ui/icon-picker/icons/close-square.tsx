import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const CloseSquareIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M6.86328 9.88661L10.6366 6.11328"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6366 9.88661L6.86328 6.11328"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75016 14.6673H10.7502C14.0835 14.6673 15.4168 13.334 15.4168 10.0007V6.00065C15.4168 2.66732 14.0835 1.33398 10.7502 1.33398H6.75016C3.41683 1.33398 2.0835 2.66732 2.0835 6.00065V10.0007C2.0835 13.334 3.41683 14.6673 6.75016 14.6673Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
