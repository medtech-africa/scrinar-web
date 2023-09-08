import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const LocationIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12" //important to be the right value
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M5.99994 6.71473C6.86151 6.71473 7.55994 6.01629 7.55994 5.15473C7.55994 4.29316 6.86151 3.59473 5.99994 3.59473C5.13838 3.59473 4.43994 4.29316 4.43994 5.15473C4.43994 6.01629 5.13838 6.71473 5.99994 6.71473Z"
        stroke="currentColor"
      />
      <path
        d="M1.8101 4.245C2.7951 -0.0849988 9.2101 -0.0799987 10.1901 4.25C10.7651 6.79 9.1851 8.94 7.8001 10.27C6.7951 11.24 5.2051 11.24 4.1951 10.27C2.8151 8.94 1.2351 6.785 1.8101 4.245Z"
        stroke="currentColor"
      />
    </svg>
  )
}
