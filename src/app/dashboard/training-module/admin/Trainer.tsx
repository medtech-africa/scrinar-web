import { Card } from '@/components/ui/card'
import { ITrainer } from '@/types/trainingModules.types'
import { formatRelative } from 'date-fns'
import React from 'react'

const Trainer = ({ trainer }: { trainer?: ITrainer }) => {
  if (!trainer) return null

  const totalScore =
    trainer.completedModules?.reduce((acc, curr) => {
      return acc + curr.score
    }, 0) || 0

  return (
    <div className="height-full">
      <div className="flex mt-10 flex-wrap gap-4">
        <Card className="w-1/4" title="Name" description={trainer.name} />
        <Card className="w-1/4" title="Email" description={trainer.email} />
        <Card className="w-1/4" title="Total score" description={totalScore} />
        <Card
          className="w-1/4"
          title="Phone number"
          description={trainer.phoneNumber}
        />
        <Card
          className="w-1/4"
          title="Number of completed modules"
          description={trainer.completedModules?.length || 0}
        />
      </div>
      <div className="mt-4">
        <h4 className="mb-2">Completed modules</h4>
        <div className="flex flex-wrap gap-4">
          {trainer.completedModules?.map((module) => (
            <Card key={module.id} className="w-1/4">
              <div className="grid justify-between">
                <div className="text-sm font-bold">
                  {module.trainingModule.content}
                </div>
                <div className="text-md">Score: {module.score}</div>
                <div className="text-md">
                  Date: {formatRelative(module.updatedAt, new Date())}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trainer
