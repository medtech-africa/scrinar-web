import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const CalendarEditIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M5.33337 1.33398V3.33398"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6666 1.33398V3.33398"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33337 6.06055H13.6667"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8066 10.5129L10.4467 12.8729C10.3533 12.9662 10.2666 13.1395 10.2466 13.2662L10.12 14.1662C10.0733 14.4929 10.3 14.7195 10.6267 14.6729L11.5267 14.5462C11.6533 14.5262 11.8333 14.4395 11.92 14.3462L14.28 11.9862C14.6867 11.5795 14.88 11.1062 14.28 10.5062C13.6867 9.91288 13.2133 10.1062 12.8066 10.5129Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4667 10.8535C12.6667 11.5735 13.2267 12.1335 13.9467 12.3335"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.6673H5.33333C3 14.6673 2 13.334 2 11.334V5.66732C2 3.66732 3 2.33398 5.33333 2.33398H10.6667C13 2.33398 14 3.66732 14 5.66732V8.00065"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99703 9.13411H8.00302"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5295 9.13411H5.53549"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5295 11.1341H5.53549"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
