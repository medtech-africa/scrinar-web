import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const SecurityIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M13.9401 7.41288C13.9401 10.6729 11.5734 13.7262 8.34007 14.6195C8.12007 14.6795 7.88005 14.6795 7.66005 14.6195C4.42672 13.7262 2.06006 10.6729 2.06006 7.41288V4.4862C2.06006 3.93953 2.4734 3.31954 2.98673 3.11287L6.70005 1.59289C7.53339 1.25289 8.47339 1.25289 9.30672 1.59289L13.0201 3.11287C13.5267 3.31954 13.9467 3.93953 13.9467 4.4862L13.9401 7.41288Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
