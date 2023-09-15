import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const DocumentTextIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M14 4.66732V11.334C14 13.334 13 14.6673 10.6667 14.6673H5.33333C3 14.6673 2 13.334 2 11.334V4.66732C2 2.66732 3 1.33398 5.33333 1.33398H10.6667C13 1.33398 14 2.66732 14 4.66732Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.66675 3V4.33333C9.66675 5.06667 10.2667 5.66667 11.0001 5.66667H12.3334"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33325 8.66602H7.99992"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33325 11.334H10.6666"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
