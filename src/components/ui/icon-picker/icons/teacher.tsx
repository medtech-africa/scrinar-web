import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const TeacherIcon: FunctionComponent<IconPickerProp> = ({
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
        d="M10.3835 2.53028L4.36352 6.46028C2.43352 7.72028 2.43352 10.5403 4.36352 11.8003L10.3835 15.7303C11.4635 16.4403 13.2435 16.4403 14.3235 15.7303L20.3135 11.8003C22.2335 10.5403 22.2335 7.73028 20.3135 6.47028L14.3235 2.54028C13.2435 1.82028 11.4635 1.82028 10.3835 2.53028Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.96361 13.0801L5.95361 17.7701C5.95361 19.0401 6.93361 20.4001 8.13361 20.8001L11.3236 21.8601C11.8736 22.0401 12.7836 22.0401 13.3436 21.8601L16.5336 20.8001C17.7336 20.4001 18.7136 19.0401 18.7136 17.7701V13.1301"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.7334 15V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
