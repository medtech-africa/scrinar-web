import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import React from 'react'

export const SaveFormBtn = () => {
  return (
    <Button variant={'secondary'} className="gap-2">
      <Save className="size-6" />
      Save
    </Button>
  )
}
