import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const CalendarIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M8 2V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.75 17.5996H3.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7141 12.0406L11.3922 11.6404L10.7417 11.1969C10.4285 10.9834 10.23 10.6632 10.23 10.22C10.23 9.71831 10.4237 9.37115 10.7155 9.1384C11.0206 8.89503 11.4696 8.75 12 8.75C12.5303 8.75 12.9761 8.89496 13.2783 9.13747C13.5674 9.36945 13.76 9.71657 13.76 10.22C13.76 10.6637 13.5709 10.9746 13.2463 11.1982L12.5875 11.6521L13.2842 12.0454C13.7539 12.3106 14 12.738 14 13.23C14 13.7087 13.8209 14.0639 13.5143 14.3102C13.1953 14.5665 12.6925 14.74 12 14.74C11.3019 14.74 10.7996 14.5662 10.4825 14.3107C10.1778 14.0652 10 13.7104 10 13.23C10 12.7407 10.2442 12.3179 10.7141 12.0406ZM10.6 10.29C10.6 10.6739 10.7534 11.0139 11.0274 11.2515C11.2946 11.4832 11.6431 11.59 12 11.59C12.3569 11.59 12.7054 11.4832 12.9726 11.2515C13.2466 11.0139 13.4 10.6739 13.4 10.29C13.4 9.90251 13.2473 9.56152 12.9674 9.32535C12.6972 9.09733 12.3488 9 12 9C11.6512 9 11.3028 9.09733 11.0326 9.32535C10.7527 9.56152 10.6 9.90251 10.6 10.29ZM10.36 13.07C10.36 13.5186 10.5468 13.899 10.8755 14.1547C11.1896 14.399 11.5934 14.5 12 14.5C12.4066 14.5 12.8104 14.399 13.1245 14.1547C13.4532 13.899 13.64 13.5186 13.64 13.07C13.64 12.6236 13.4509 12.246 13.1229 11.9929C12.8095 11.751 12.4067 11.65 12 11.65C11.5966 11.65 11.1934 11.747 10.8786 11.988C10.5476 12.2413 10.36 12.6206 10.36 13.07Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  )
}
