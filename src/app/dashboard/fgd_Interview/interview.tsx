// 'use client'
import React from 'react'
import { IconPicker } from '@/components/ui/icon-picker'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TableLoader from '@/components/table-loader'
import dynamic from 'next/dynamic'
import { InterviewUploadButton } from '@/components/interviews/InterviewUploadButton'
import { useSchoolResources } from '@/hooks/queries/useSchools'

const Interview = () => {
  const CustomMediaRecorder = React.useMemo(
    () =>
      dynamic(() => import('@/components/customMediaRecorder'), {
        ssr: false,
        loading: () => (
          <div className="justify-items-center">
            <p className="text-grey-500">Record Audio</p>
            <div className="bg-primary inline-flex flex-row p-4 rounded-full text-white items-center">
              <div role="button" tabIndex={0}>
                <IconPicker icon="play" size={24} />
              </div>
            </div>
          </div>
        ),
      }),
    []
  )

  // const [selectedRow, setSelectedRow] = React.useState(null)

  const { data: interviews, isPending: isLoading } = useSchoolResources()

  // const handleMoreClick = (rowIndex: any) => {
  //   setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  // }
  // const menuItems = [
  //   {
  //     title: 'Play Audio',
  //     icon: IconNames.documentText,
  //     action: () => console.log('play audio'),
  //   },
  //   {
  //     title: 'Download Audio',
  //     icon: IconNames.trash,
  //     action: () => {
  //       console.log('download audio')
  //     },
  //   },
  // ]

  return (
    <div className="w-full">
      <div className="flex md:flex-row md:justify-between md:gap-0 flex-col justify-center items-center gap-y-6">
        <div className="">
          <CustomMediaRecorder />
        </div>
        <InterviewUploadButton />
      </div>

      <Table className="table-auto my-12">
        <TableHeader className="bg-grey-100">
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className=""></TableHead>
            {/* <TableHead className="">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableLoader />
          ) : (
            interviews?.map?.((resource) => (
              <TableRow
                key={resource.id}
                className="font-normal text-sm text-grey-600"
              >
                <TableCell>
                  {resource?.fileName}
                  <p className="text-grey-600">
                    Uploaded by: {resource?.uploadedBy.name}
                  </p>
                </TableCell>
                <TableCell>{resource?.fileType || resource?.type}</TableCell>
                <TableCell>
                  <a
                    href={resource.fileURL}
                    target="_blank"
                    className="underline"
                  >
                    view
                  </a>
                </TableCell>

                {/* <TableCell className="relative">
                  <div
                    onClick={() => handleMoreClick(resource?.id)}
                    className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                  >
                    <IconPicker icon="more" size="1.25rem" />
                  </div>
                  {selectedRow === resource?.id && (
                    <DropDownMenu
                      menuItems={menuItems}
                      onClose={() => setSelectedRow(null)}
                    />
                  )}
                </TableCell> */}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default Interview
