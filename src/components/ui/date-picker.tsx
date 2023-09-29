import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import Calendar from 'react-calendar'
import { Input, InputProps } from './input'
import { IconPicker } from './icon-picker'
import useClickAway from '@/hooks/useClickAway'

type val = string | Date | null
type Range<T> = [T, T]

interface IDatePicker extends Omit<InputProps, 'value' | 'onChange'> {
  value: val
  onChange: (v: val | Range<val>) => void
}

const DatePicker = ({ onChange, value, ...props }: IDatePicker) => {
  const [open, setOpen] = useState(false)
  const datePickerRef = useRef(null)

  useClickAway(datePickerRef, () => setOpen(false))
  return (
    <div ref={datePickerRef} className="relative w-full">
      <div className={cn(`cursor-pointer`)} onClick={() => setOpen((p) => !p)}>
        <Input
          labelStyle="lg:text-sm text-xs"
          endingIcon={
            <IconPicker icon="calendar2" className="cursor-pointer" size={20} />
          }
          className="disabled:text-grey-900 disabled:bg-white"
          value={value ? new Date(value).toLocaleDateString() : ''}
          disabled
          {...props}
        />
      </div>
      <div
        className={cn('absolute top-15 w-[256px] block z-50 bg-grey-50', {
          hidden: !open,
        })}
      >
        <Calendar
          value={value}
          onChange={(val) => {
            setOpen(false)
            onChange && onChange(val)
          }}
        />
      </div>
    </div>
  )
}

export default DatePicker
