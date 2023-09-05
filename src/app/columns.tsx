"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: string
  bmi: number
  status: "pending" | "processing" | "success" | "failed"
  studentName: string
  nutritionalHealth: string
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "bmi",
    header: "BMI",
  },
  {
    accessorKey: "status",
      header: "Status",
    //  header: () => <div className="text-right">Status</div>,
  },
  {
    accessorKey: "nutritionalHealth",
    header: "Nutritional Health",
  },
]
