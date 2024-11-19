// 'use client'
import React, { useState } from 'react'
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
import { SchoolResource, useSchoolResources } from '@/hooks/queries/useSchools'
import EmptyData from '@/components/empty-data'
import { cn } from '@/lib/utils'
import Modal from '@/components/ui/modal'
// import Markdown from 'react-markdown'
import { TextArea } from '@/components/ui/textarea'

const Interview = () => {
  const CustomMediaRecorder = React.useMemo(
    () =>
      dynamic(() => import('@/components/customMediaRecorder'), {
        ssr: false,
        loading: () => (
          <div className="justify-items-center">
            <p className="text-grey-500">Record Audio</p>
            <button
              className="outline-none border-none bg-transparent"
              title="play"
            >
              <div role="button" tabIndex={0}>
                <IconPicker icon="play" size={24} className="text-primary" />
              </div>
            </button>
          </div>
        ),
      }),
    []
  )
  const CustomMediaRecorderComponent = (props: any) => {
    return <CustomMediaRecorder {...props} />
  }

  const {
    data: interviews,
    isPending: isLoading,
    refetch,
  } = useSchoolResources()
  const filteredInterviews = interviews?.filter(
    (resource) => resource.type === 'interview'
  )

  const [modalContent, setModalContent] = useState<SchoolResource | null>(null)

  return (
    <div className="w-full">
      <div className="flex md:flex-row md:justify-between md:gap-0 flex-col justify-center items-center gap-y-6">
        <div className="">
          <CustomMediaRecorderComponent type="interview" refetch={refetch} />
        </div>
        <InterviewUploadButton refetch={refetch} />
      </div>
      <div className="py-3">
        <Table
          className={cn(
            'table-auto my-2',
            filteredInterviews?.length === 0 && 'my-0'
          )}
          containerClassName="!max-h-fit"
        >
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Transcription</TableHead>
              {/* <TableHead className="">Translation</TableHead> */}
              <TableHead className="">Type</TableHead>
              <TableHead className=""></TableHead>
              {/* <TableHead className="">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              filteredInterviews?.map?.((resource) => (
                <TableRow
                  key={resource.id}
                  className="font-normal text-sm text-grey-600"
                >
                  <TableCell>
                    {resource?.fileName}
                    <p className="text-grey-600">
                      Uploaded by: {resource?.uploadedBy?.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    {resource.transcription ? (
                      <a
                        onClick={() => setModalContent(resource)}
                        className="underline cursor-pointer"
                      >
                        view
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  {/* <TableCell>
                    {resource.translation ? (
                      <a
                        onClick={() => setModalContent(resource)}
                        className="underline"
                      >
                        view
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell> */}
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
        {filteredInterviews?.length === 0 && <EmptyData />}
        <Modal
          className="sm:w-3/4 sm:h-1/2 grid items-center justify-center"
          open={!!modalContent}
          closeModal={() => setModalContent(null)}
        >
          <div className="w-full">
            <TextArea
              defaultValue={modalContent?.transcription}
              className="w-full min-h-96 md:min-w-[70vw]"
            />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Interview
