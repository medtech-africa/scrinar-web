import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const LoginIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M5.93335 5.04016C6.14002 2.64016 7.37335 1.66016 10.0733 1.66016H10.16C13.14 1.66016 14.3333 2.85349 14.3333 5.83349V10.1802C14.3333 13.1602 13.14 14.3535 10.16 14.3535H10.0733C7.39335 14.3535 6.16002 13.3868 5.94002 11.0268"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.33325 8H9.91992"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.43335 5.7666L10.6667 7.99994L8.43335 10.2333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
