import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const CalendarTickIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M5.5835 1.33398V3.33398"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9165 1.33398V3.33398"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5835 6.06055H13.9168"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9168 12.6667C14.9168 13.1667 14.7768 13.64 14.5302 14.04C14.0702 14.8133 13.2235 15.3333 12.2502 15.3333C11.5768 15.3333 10.9635 15.0867 10.4968 14.6667C10.2902 14.4933 10.1102 14.28 9.97016 14.04C9.7235 13.64 9.5835 13.1667 9.5835 12.6667C9.5835 11.1933 10.7768 10 12.2502 10C13.0502 10 13.7635 10.3533 14.2502 10.9067C14.6635 11.38 14.9168 11.9933 14.9168 12.6667Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.21 12.667L11.87 13.327L13.29 12.0137"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 5.66732V10.9073C13.7633 10.354 13.05 10.0007 12.25 10.0007C10.7767 10.0007 9.58333 11.194 9.58333 12.6673C9.58333 13.1673 9.72333 13.6406 9.97 14.0406C10.11 14.2806 10.29 14.494 10.4967 14.6673H5.58333C3.25 14.6673 2.25 13.334 2.25 11.334V5.66732C2.25 3.66732 3.25 2.33398 5.58333 2.33398H10.9167C13.25 2.33398 14.25 3.66732 14.25 5.66732Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.24715 9.13411H8.25314"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.77938 9.13411H5.78537"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.77938 11.1341H5.78537"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
