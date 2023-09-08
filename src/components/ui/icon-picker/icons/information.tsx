import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const InformationIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M10.7509 2.45001C11.4509 1.86001 12.5809 1.86001 13.2609 2.45001L14.8409 3.80001C15.1409 4.05001 15.7109 4.26001 16.1109 4.26001H17.8109C18.8709 4.26001 19.7409 5.13001 19.7409 6.19001V7.89001C19.7409 8.29001 19.9509 8.85001 20.2009 9.15001L21.5509 10.73C22.1409 11.43 22.1409 12.56 21.5509 13.24L20.2009 14.82C19.9509 15.12 19.7409 15.68 19.7409 16.08V17.78C19.7409 18.84 18.8709 19.71 17.8109 19.71H16.1109C15.7109 19.71 15.1509 19.92 14.8509 20.17L13.2709 21.52C12.5709 22.11 11.4409 22.11 10.7609 21.52L9.18086 20.17C8.88086 19.92 8.31086 19.71 7.92086 19.71H6.17086C5.11086 19.71 4.24086 18.84 4.24086 17.78V16.07C4.24086 15.68 4.04086 15.11 3.79086 14.82L2.44086 13.23C1.86086 12.54 1.86086 11.42 2.44086 10.73L3.79086 9.14001C4.04086 8.84001 4.24086 8.28001 4.24086 7.89001V6.20001C4.24086 5.14001 5.11086 4.27001 6.17086 4.27001H7.90086C8.30086 4.27001 8.86086 4.06001 9.16086 3.81001L10.7509 2.45001Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.13V12.96"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9941 16H12.0031"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
