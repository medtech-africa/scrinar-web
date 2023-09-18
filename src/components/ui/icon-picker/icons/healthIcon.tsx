import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const HealthIcon2: FunctionComponent<IconPickerProp> = ({
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
      <rect x="1.5" y="1.5" width="38" height="38" rx="7" fill="#12B76A" />
      <path
        d="M27.4697 30.5H13.4697C10.4697 30.5 10.4697 29.15 10.4697 27.5V26.5C10.4697 25.95 10.9197 25.5 11.4697 25.5H29.4697C30.0197 25.5 30.4697 25.95 30.4697 26.5V27.5C30.4697 29.15 30.4697 30.5 27.4697 30.5Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.2195 21.5V25.5H11.7695V21.5C11.7695 17.66 14.4795 14.45 18.0895 13.68C18.6295 13.56 19.1895 13.5 19.7695 13.5H21.2195C21.7995 13.5 22.3695 13.56 22.9095 13.68C26.5195 14.46 29.2195 17.66 29.2195 21.5Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23 13C23 13.24 22.97 13.46 22.91 13.68C22.37 13.56 21.8 13.5 21.22 13.5H19.77C19.19 13.5 18.63 13.56 18.09 13.68C18.03 13.46 18 13.24 18 13C18 11.62 19.12 10.5 20.5 10.5C21.88 10.5 23 11.62 23 13Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.5 19.5H17.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
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
