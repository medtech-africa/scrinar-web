import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import React from 'react'
import { useDesigner } from '../../hooks/useDesigner'
import { FormElements } from '../elements/FormElements'

export const PreviewDialogBtn = () => {
  const { elements } = useDesigner()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'} className="gap-2">
          <Eye className="size-6" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent
        title="Preview"
        className="w-screen h-screen max-h-screen md:max-w-screen-sm flex flex-col flex-grow p-0 gap-0"
      >
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold">Form preview</p>
          <p className="text-sm">
            This is a preview of the form and this is how it will look like.
          </p>
        </div>
        <div className="flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-full flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent
              return (
                <FormComponent key={element.id} elementInstance={element} />
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
