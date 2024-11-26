import React, { useState } from 'react'
import Modal from '../ui/modal'
import { SchoolResource } from '@/hooks/queries/useSchools'
import { TextArea } from '../ui/textarea'

export const ViewTranscript = ({ resource }: { resource: SchoolResource }) => {
  const [modalContent, setModalContent] = useState<SchoolResource | null>(null)

  if (!resource) return null

  return (
    <div>
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
  )
}
