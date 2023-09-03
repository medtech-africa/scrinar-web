import type { Meta } from '@storybook/react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

/**
 A sample table component.
 It uses components from `@/components/ui/table` to render a table.
 */
export const ExampleTable = () => (
  <div className="max-w-3xl mx-auto">
    <Table>
      <TableCaption>A list of your students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>BMI</TableHead>
          <TableHead className="text-right">Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Ben Victor</TableCell>
          <TableCell>Obese</TableCell>
          <TableCell>12.2</TableCell>
          <TableCell className="text-right">Aug 10, 2023</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Dami Abraham</TableCell>
          <TableCell>Obese</TableCell>
          <TableCell>22.2</TableCell>
          <TableCell className="text-right">Aug 20, 2023</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Oluwafemi Akanbi</TableCell>
          <TableCell>Normal</TableCell>
          <TableCell>12.2</TableCell>
          <TableCell className="text-right">Sept 4, 2023</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)

const meta = {
  title: 'Example/Table',
  component: ExampleTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ExampleTable>

export default meta
