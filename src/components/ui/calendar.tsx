'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconPicker } from './icon-picker'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const IconLeft = () => <IconPicker icon="arrowLeft" />
const IconRight = () => <IconPicker icon="arrowRight" />

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        // sort this object alphabetically
        button_next: cn(
          buttonVariants({ variant: 'primary' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          'absolute right-1'
        ),
        button_previous: cn(
          buttonVariants({ variant: 'primary' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          'absolute left-1'
        ),
        caption_label: 'text-sm font-medium',
        day: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'default' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        month_grid: 'w-full border-collapse space-y-1',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'primary' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        outside: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        week: 'flex w-full mt-2',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        weekday:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        weekdays: 'flex',
        ...classNames,
      }}
      components={{
        // IconLeft,
        // IconRight,

        Chevron: (props) => {
          if (props.orientation === 'left') {
            return <IconLeft />
            // return <IconLeft {...props} />
          }
          return <IconRight />
          // return <IconRight {...props} />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
