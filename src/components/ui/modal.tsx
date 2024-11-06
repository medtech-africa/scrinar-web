import React from 'react'
import { Dialog, DialogContent } from './dialog'
import { cn } from '@/lib/utils'

type IProps = {
  children: React.ReactNode
  open: boolean
  closeModal?: () => void
  title?: string
  className?: string
}

const Modal = ({ open, children, closeModal, title, className }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent title={title} className={cn('', className)}>
        <div className="overflow-y-auto h-full">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
