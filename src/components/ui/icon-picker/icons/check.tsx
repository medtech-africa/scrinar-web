import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'


export const CheckIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 13"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M6.54961 12.9996L0.849609 7.29961L2.27461 5.87461L6.54961 10.1496L15.7246 0.974609L17.1496 2.39961L6.54961 12.9996Z"
        fill="currentColor"
      />
    </svg>
  )
}
