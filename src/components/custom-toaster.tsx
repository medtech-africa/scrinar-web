'use client'
import { ToastField } from '@/components/ui/toast'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={4}
      toastOptions={{
        duration: 3000,
        style: {
          animation: 'custom-exit 1s ease',
        },
      }}
    >
      {(t) => (
        <ToastField
          variant={
            t.type === 'success'
              ? 'success'
              : t.type === 'error'
              ? 'destructive'
              : null
          }
          label={t.message || ''}
          action1={() => toast.remove(t.id)}
        />
      )}
    </Toaster>
  )
}

export default CustomToaster
