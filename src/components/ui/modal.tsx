import React from 'react'
import { Dialog, DialogContent } from './dialog'

type IProps = {
  children: React.ReactNode
  open: boolean
  closeModal?: () => void
  title?: string
}

const Modal = ({ open, children, closeModal, title }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent title={title}>
        <div className="overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
