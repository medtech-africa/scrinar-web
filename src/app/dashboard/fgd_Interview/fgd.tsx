// 'use client'
import React, { useState } from 'react'
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
import { useSchoolResources } from '@/hooks/queries/useSchools'
import EmptyData from '@/components/empty-data'
import { cn } from '@/lib/utils'
import { IconPicker } from '@/components/ui/icon-picker'
import { FGDUploadButton } from '@/components/interviews/fgdUploadButton'
import Modal from '@/components/ui/modal'

const FGD = () => {
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

  const { data: fgd, isPending: isLoading, refetch } = useSchoolResources()
  const filteredFgd = fgd?.filter((resource) => resource.type === 'fgd')

  const [modalContent, setModalContent] = useState('')

  return (
    <div className="w-full">
      <div className="flex md:flex-row md:justify-between md:gap-0 flex-col justify-center items-center gap-y-6">
        <div className="">
          <CustomMediaRecorderComponent type="fgd" refetch={refetch} />
        </div>
        <FGDUploadButton refetch={refetch} />
      </div>
      <div className="py-3 md:py-8">
        <Table
          className={cn(
            'table-auto my-12',
            filteredFgd?.length === 0 && 'my-0'
          )}
          containerClassName="!max-h-[90vh]"
        >
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Transcription</TableHead>
              <TableHead className="">Translation</TableHead>
              <TableHead className="">Type</TableHead>
              <TableHead className=""></TableHead>
              {/* <TableHead className="">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableLoader />
            ) : (
              filteredFgd?.map?.((resource) => (
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
                  <TableCell>
                    {resource.transcription ? (
                      <a
                        onClick={() =>
                          setModalContent(resource.transcription ?? '')
                        }
                        className="underline"
                      >
                        view
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    {resource.translation ? (
                      <a
                        onClick={() =>
                          setModalContent(resource.translation ?? '')
                        }
                        className="underline"
                      >
                        view
                      </a>
                    ) : (
                      '-'
                    )}
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
        {filteredFgd?.length === 0 && <EmptyData />}
        <Modal
          className="sm:w-1/2 sm:h-1/2 flex items-center justify-center"
          open={!!modalContent}
          closeModal={() => setModalContent('')}
          // title={`${modalType}`}
        >
          <p className="">{modalContent}</p>
        </Modal>
      </div>
    </div>
  )
}

export default FGD
