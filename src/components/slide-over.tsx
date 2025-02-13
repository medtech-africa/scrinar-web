import { DialogContent, DialogOverlay } from '@reach/dialog'
import { CloseSquareIcon } from './ui/icon-picker/icons'
import { cn } from '@/lib/utils'
import '@reach/dialog/styles.css'

export const SlideOver = ({
  children,
  open,
  onClose,
  icon,
  title,
  className,
  allowDismiss = true,
}: {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  title: string
  icon?: React.ReactNode
  className?: string
  allowDismiss?: boolean
}) => {
  return (
    <DialogOverlay
      isOpen={open}
      onDismiss={allowDismiss ? onClose : undefined}
      className="p-0"
      style={{ zIndex: 99, backgroundColor: 'rgba(0,0,0,0.20)' }}
    >
      <DialogContent
        className={cn(
          '!w-full md:!w-[300px] h-full fixed right-0 top-0 bg-white !bottom-0 !p-0 !m-0 !overflow-auto',
          className
        )}
        aria-label={title}
      >
        <div className="relative h-full">
          <div
            className={cn(
              'flex justify-between border-b items-center  border-zinc-400 border-opacity-20 px-8 py-5 animate-slide-in-left fixed bg-white w-full md:w-[300px] z-50',
              className
            )}
          >
            <div className="flex items-center gap-x-4">
              {icon}
              <div className="text-zinc-800 text-lg font-bold">{title}</div>
            </div>
            <CloseSquareIcon className="h-4 w-4" onClick={onClose} />
          </div>
          <div className="h-[73px]" />
          <div className="p-6">{children}</div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
