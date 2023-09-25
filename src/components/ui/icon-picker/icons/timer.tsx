import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const TimerIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M12.7002 1.66602H7.30019C4.16686 1.66602 3.92519 4.48268 5.61686 6.01602L14.3835 13.9827C16.0752 15.516 15.8335 18.3327 12.7002 18.3327H7.30019C4.16686 18.3327 3.92519 15.516 5.61686 13.9827L14.3835 6.01602C16.0752 4.48268 15.8335 1.66602 12.7002 1.66602Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
