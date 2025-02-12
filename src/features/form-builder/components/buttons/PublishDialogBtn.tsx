import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'

export const PublishDialogBtn = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlePublish = () => {
    // Logic to publish the form
    console.log('Form published!')
    setIsOpen(false) // Close the dialog
    setSuccess(true) // Close the dialog
  }

  const shareUrl = `${window.location.origin}/dashboard/forms/${window.location.pathname.split('/').pop()}/submit`

  if (success) {
    return (
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <AlertDialogContent className="w-full px-0">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-center text-4xl font-bold text-primary pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl border-b pb-10 text-gray-600 w-full text-center px-1">
              Anyone with the link can view and submit the form
            </h3>

            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4 px-4">
              <Input readOnly className="w-full" value={shareUrl} full />
              <Button
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                  toast.success('Link copied to clipboard!')
                }}
              >
                Copy link
              </Button>
            </div>

            <div className="flex justify-between w-full px-4">
              <button
                className="flex flex-row gap-x-1 text-sm items-center outline-none border-none"
                onClick={() => setSuccess(false)}
              >
                <ArrowLeft size={16} />
                <span className="">Back</span>
              </button>
              <button
                className="flex flex-row gap-x-1 text-sm items-center outline-none border-none"
                onClick={() => setSuccess(false)}
              >
                <span className="">View details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'secondary'} className="gap-2" size={'sm'}>
          <Send className="size-6" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will publish the form and make it publicly accessible.
            Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish}>Publish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
