'use client'
import { cn } from '@/lib/utils'
import * as Tabs from '@radix-ui/react-tabs'
//@todo: uncomment
import React from 'react'
import Interview from '../fgd_Interview/interview'
import FGD from '../fgd_Interview/fgd'

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)

const TrainingModule = () => {
  return (
    <div>
      <h1>Interviews and Focus Group Discussions</h1>
      <div className="">
        <Tabs.Root className="" defaultValue="interview">
          <Tabs.List className="mb-4" aria-label="">
            <Tabs.Trigger
              className={triggerClassName}
              value="interview"
              // onClick={() => refetch()}
            >
              Interviews
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="fgd"
              // onClick={() => refetch()}
            >
              FGD Interview
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="interview">
            <Interview />
          </Tabs.Content>
          <Tabs.Content value="fgd">
            <FGD />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}

export default TrainingModule
