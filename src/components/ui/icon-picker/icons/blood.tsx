import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const BloodIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="38" height="38" rx="7" fill="#6941C6" />
      <path
        d="M21.1103 10.71C20.7503 10.43 20.2503 10.43 19.8903 10.71C17.9903 12.16 12.3803 16.89 12.4103 22.4C12.4103 26.86 16.0403 30.5 20.5103 30.5C24.9803 30.5 28.6103 26.87 28.6103 22.41C28.6203 16.98 23.0003 12.17 21.1103 10.71Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <rect
        x="1.5"
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
