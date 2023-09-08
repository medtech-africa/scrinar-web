import { Button } from '@/components/ui/button'

import { Student, columns } from '../columns'
import { DataTable } from '@/components/ui/data-table'
import { Text } from '@/components/ui/text'

async function getData(): Promise<Student[]> {
  return [
    {
      id: '728ed52f',
      bmi: 10.0,
      status: 'pending',
      studentName: 'Robert Johnson',
      nutritionalHealth: 'Good',
    },
    {
      id: '728ed5',
      bmi: 18.9,
      status: 'pending',
      studentName: 'Sophia Clark',
      nutritionalHealth: 'Fair',
    },
    {
      id: '7ed52f',
      bmi: 18.9,
      status: 'pending',
      studentName: 'Robert Johnson',
      nutritionalHealth: 'Excellent',
    },
  ]
}

export default async function Home() {
  const data = await getData()

  return (
    <div>
      <section className="pb-4">
        <Text variant="text/sm" className="text-grey-600 mb-4">
          Hi, “Name” Welcome Back 😄
        </Text>
        <Text variant="display/xs" weight="medium">
          Dashboard Overview
        </Text>
      </section>
      <Button>Holla</Button>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
