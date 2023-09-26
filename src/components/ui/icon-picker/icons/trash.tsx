import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const TrashIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M14 3.98763C11.78 3.76763 9.54667 3.6543 7.32 3.6543C6 3.6543 4.68 3.72096 3.36 3.8543L2 3.98763"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66675 3.31398L5.81341 2.44065C5.92008 1.80732 6.00008 1.33398 7.12675 1.33398H8.87341C10.0001 1.33398 10.0867 1.83398 10.1867 2.44732L10.3334 3.31398"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5667 6.09375L12.1334 12.8071C12.06 13.8537 12 14.6671 10.14 14.6671H5.86002C4.00002 14.6671 3.94002 13.8537 3.86668 12.8071L3.43335 6.09375"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.88672 11H9.10672"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33325 8.33398H9.66659"
        stroke="currentColor"
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
