/* eslint-disable @typescript-eslint/no-explicit-any */
import usePagination from '@/hooks/usePagination'
import React, { useMemo } from 'react'
import { IconPicker } from './ui/icon-picker'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

/* eslint-disable import/no-unused-modules */
interface Iprops {
  current: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  onPrev: () => void
  onNext: (max?: number) => void
  total: number
  pageSize?: number
  className?: string
}

const Pagination = ({
  current = 0,
  setCurrent,
  total,
  onNext,
  onPrev,
  pageSize = 10,
  className,
}: Iprops) => {
  const max = useMemo(() => (total ? Math.ceil(total / pageSize) : 0), [total, pageSize])
  const pageRange = usePagination({
    totalCount: total,
    pageSize: pageSize,
    siblingCount: 1,
    currentPage: current,
  })

  return (
    <div className={cn('flex gap-x-2 justify-end', className)}>
      <Button
        variant="tertiary"
        onClick={onPrev}
        size="sm"
        // onClick={() => (current > 1 ? setCurrent((pr) => pr - 1) : null)}
      >
        <IconPicker icon="arrowLeft" className="" />
      </Button>
      {pageRange?.map((v, i) =>
        v === '....' ? (
          <p key={i}>....</p>
        ) : (
          <Button
            onClick={() => setCurrent(v as number)}
            key={i}
            variant={current === v ? 'primary' : 'tertiary'}
            size="sm"
          >
            {v}
          </Button>
        )
      )}

      <Button size="sm" variant="tertiary" onClick={() => onNext(max)}>
        <IconPicker icon="arrowRight" className="" />
      </Button>
    </div>
  )
}

export default Pagination
