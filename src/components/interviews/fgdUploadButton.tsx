// 'use client'
import React, { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconPicker } from '@/components/ui/icon-picker'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import Modal from '@/components/ui/modal'
import AudioModal from '@/components/interviews/InterviewModalContent/audioModal'
import TranscriptModal from '@/components/interviews/InterviewModalContent/transcriptModal'
import FgdGuideModal from '@/components/interviews/InterviewModalContent/fgdGuideModal'
import { useSchoolResourceUpload } from '@/hooks/useSchoolResource'
import { UploadProgress } from './UploadProgress'

enum ModalType {
  audio = 'Upload Audio',
  transcript = 'Transcript',
  fgdGuide = 'FGD Guide',
}

const modalTypeToFileType = {
  [ModalType.audio]: 'audio',
  [ModalType.transcript]: 'transcript',
  [ModalType.fgdGuide]: 'fgdGuide',
}

export const FGDUploadButton = ({ refetch }: { refetch: () => void }) => {
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  )

  const [modalType, setModalType] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [language, setLanguage] = React.useState('english')
  const [open, toggleOpen] = React.useState(false)
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const {
    handleSave: onSave,
    isSubmitting,
    isUploading,
    uploadProgress,
  } = useSchoolResourceUpload()

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setModalType(option)
    setOpenModal(true)
    toggleOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        toggleOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      setSelectedOption(null)
      setUploadedFile(null)
      setFileName('')
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      console.log('🚀 ~ handleFileChange ~ selectedFile:', selectedFile)
      setUploadedFile(selectedFile)
      setFileName(selectedFile.name?.split('.')[0] || 'Fgd')
    }
  }

  const handleSave: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (uploadedFile) {
      onSave({
        uploadedFile,
        fileName: fileName,
        fileType: modalTypeToFileType[modalType as ModalType] ?? 'general',
        type: 'fgd',
        language,
        onSuccess: () => {
          setOpenModal(false)
          setUploadedFile(null)
          refetch()
          setFileName('')
        },
      })
    }
  }

  return (
    <div>
      <div className="flex relative w-fit">
        <motion.button
          className={cn(
            'flex h-fit items-center justify-between bg-primary text-white py-2 px-4 rounded-lg'
          )}
          onClick={() => toggleOpen(!open)}
          layout="position"
        >
          <div className="flex gap-2 items-center">
            <IconPicker icon="profile2User" size="1rem" />
            <Text className="block md:hidden lg:block" variant="text/md">
              Upload
            </Text>
          </div>
          <motion.div
            key="arrow"
            animate={{ rotate: open ? 0 : -90 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 50,
            }}
          >
            <IconPicker icon="arrowDown" />
          </motion.div>
        </motion.button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              ref={dropdownRef}
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="mt-2 w-fit bg-white rounded-lg p-4 shadow-lg absolute top-0 right-[130px] whitespace-nowrap z-[999]"
              variants={{
                open: {
                  opacity: 1,
                  height: 'auto',
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                },
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <div
                className={cn(
                  'cursor-pointer px-4 py-2',
                  selectedOption === ModalType.audio && 'bg-grey-100'
                )}
                onClick={() => handleOptionClick(ModalType.audio)}
              >
                <Text variant="text/md">
                  <span className="block">Upload Audio</span>
                </Text>
              </div>

              <div
                className={cn(
                  'cursor-pointer px-4 py-2',
                  selectedOption === ModalType.transcript && 'bg-grey-100'
                )}
                onClick={() => handleOptionClick(ModalType.transcript)}
              >
                <Text variant="text/md">
                  <span className="block">Transcript</span>
                </Text>
              </div>
              <div
                className={cn(
                  'cursor-pointer px-4 py-2',
                  selectedOption === ModalType.transcript && 'bg-grey-100'
                )}
                onClick={() => handleOptionClick(ModalType.fgdGuide)}
              >
                <Text variant="text/md">
                  <span className="block">FGD Guide</span>
                </Text>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal
        className="sm:w-1/2 sm:h-1/2 flex items-center justify-center"
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title={`${modalType}`}
      >
        <form onSubmit={handleSave}>
          {modalType === ModalType.audio && (
            <AudioModal
              fileInputRef={fileInputRef}
              fileName={fileName}
              language={language}
              setLanguage={setLanguage}
              setFileName={setFileName}
              handleFileChange={handleFileChange}
              hasFile={!!uploadedFile}
              isLoading={isUploading || isSubmitting}
            />
          )}
          {modalType === ModalType.transcript && (
            <TranscriptModal
              fileInputRef={fileInputRef}
              fileName={fileName}
              setFileName={setFileName}
              handleFileChange={handleFileChange}
              isLoading={isUploading || isSubmitting}
            />
          )}
          {modalType === ModalType.fgdGuide && (
            <FgdGuideModal
              fileInputRef={fileInputRef}
              fileName={fileName}
              setFileName={setFileName}
              setUploadedFile={setUploadedFile}
              isLoading={isUploading || isSubmitting}
            />
          )}
          <UploadProgress progress={uploadProgress} />
        </form>
      </Modal>
    </div>
  )
}
