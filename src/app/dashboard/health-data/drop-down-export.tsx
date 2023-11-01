import { cn } from '@/lib/utils'

import useClickAway from '@/hooks/useClickAway'
import { useRef } from 'react'
import { ExportAsCsv } from './export-csv'
import { ExportAsExcel } from './export-excel'

interface IProps {
  onClose?: () => void
  className?: string
}

const DropDownMenuExport = ({ onClose, className }: IProps) => {
  const menuRef = useRef(null)

  useClickAway(menuRef, () => (onClose ? onClose() : null))

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
      <ExportAsCsv />
      <ExportAsExcel />
    </div>
  )
}

export default DropDownMenuExport
