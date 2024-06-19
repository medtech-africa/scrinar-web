import { cn } from '@/lib/utils'

import useClickAway from '@/hooks/useClickAway'
import { useMemo, useRef } from 'react'
import { ExportAsCsv } from './export-csv'
import { ExportAsExcel } from './export-excel'
import { IconPicker } from '@/components/ui/icon-picker'
import useHealthData from '@/hooks/queries/useHealthData'

interface IProps {
  onClose?: () => void
  className?: string
}

const DropDownMenuExportAll = ({ onClose, className }: IProps) => {
  const menuRef = useRef(null)

  useClickAway(menuRef, () => (onClose ? onClose() : null))

  const { data, isLoading } = useHealthData(1, '', 1000)

  const formattedData = useMemo(
    () =>
      data?.data?.map((healthData: any) => ({
        id: healthData?.id,
        createdAt: healthData?.createdAt,
        userId: healthData?.student?.id,
        age: healthData?.student?.age,
        avatarUrl: healthData?.student?.avatarUrl,
        lastName: healthData?.student?.lastName,
        firstName: healthData?.student?.firstName,
        fullName: healthData?.student?.fullName,
        gender: healthData?.student?.gender,
        latestHealthData: {
          bmi: healthData?.bmi ?? '',
          height: healthData?.height ?? '',
          weight: healthData?.weight ?? '',
          waist: healthData?.waist ?? '',
          bloodPressure: healthData?.bloodPressure ?? '',
          pulse: healthData?.pulse ?? '',
          dietaryDiversity: healthData?.dietaryDiversity ?? '',
          physicalActivity: healthData?.physicalActivity ?? '',
          cholesterol: healthData?.cholesterol,
          glucoseLevel: healthData?.glucoseLevel,
        },
        updatedAt: healthData?.updatedAt,
        school: healthData?.school,
      })),
    [data]
  )
  return (
    <div
      ref={menuRef}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-option"
      tabIndex={1}
      className={cn(
        'flex flex-col p-2 bg-white justify-center space-y-2 items-start shadow-xl absolute right-4 whitespace-nowrap z-[49] origin-top-right',
        className
      )}
    >
      {isLoading ? (
        <>
          <IconPicker icon="loader2" size="1rem" className="mr-2" />
          Please wait
        </>
      ) : (
        <>
          <ExportAsCsv fileName="all-health-data" data={formattedData ?? []} />
          <ExportAsExcel
            fileName="all-health-data"
            data={formattedData ?? []}
          />
        </>
      )}
    </div>
  )
}

export default DropDownMenuExportAll
