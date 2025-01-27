import { IParent, ParentsAnalyticsEnums } from '@/hooks/queries/useAnalytics'

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    | [string, typeof Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement['addEventListener']>)
    )
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    | [string, typeof Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement['removeEventListener']>)
    )
  }
}
export const getTypeDistribution = <T extends ParentsAnalyticsEnums>(
  data: IParent[],
  type: keyof typeof ParentsAnalyticsEnums
) => {
  const result: Record<T, number> = data.reduce(
    (acc, obj) => {
      const returnedType = obj[type]?.trim().toLowerCase() as T
      acc[returnedType] = (acc[returnedType] || 0) + 1
      return acc
    },
    {} as Record<T, number>
  )

  return Object.entries(result)
    .filter(([value]) => value !== 'undefined')
    .map(([value, count]) => ({
      value,
      count,
    }))
}
