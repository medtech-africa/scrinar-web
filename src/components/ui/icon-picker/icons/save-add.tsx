import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const SaveAddIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M10.6668 5.99325V13.5666C10.6668 14.5333 9.9735 14.9399 9.12683 14.4732L6.50684 13.0132C6.22684 12.8599 5.77349 12.8599 5.49349 13.0132L2.87349 14.4732C2.02683 14.9399 1.3335 14.5333 1.3335 13.5666V5.99325C1.3335 4.85325 2.26682 3.91992 3.40682 3.91992H8.59351C9.73351 3.91992 10.6668 4.85325 10.6668 5.99325Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6668 3.40731V10.9807C14.6668 11.9473 13.9735 12.354 13.1268 11.8873L10.6668 10.514V5.99398C10.6668 4.85398 9.73351 3.92065 8.59351 3.92065H5.3335V3.40731C5.3335 2.26731 6.26682 1.33398 7.40682 1.33398H12.5935C13.7335 1.33398 14.6668 2.26731 14.6668 3.40731Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6665 8H7.33317"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9.33268V6.66602"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
