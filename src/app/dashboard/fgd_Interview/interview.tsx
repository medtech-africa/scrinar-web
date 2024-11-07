// 'use client'
import React, { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconPicker } from '@/components/ui/icon-picker'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TableLoader from '@/components/table-loader'
import DropDownMenu from '@/components/drop-down-menu'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import Modal from '@/components/ui/modal'
import AudioModal from './InterviewModalContent/audioModal'
import TranscriptModal from './InterviewModalContent/transcriptModal'
import FgdGuideModal from './InterviewModalContent/fgdGuideModal'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

const interviews = [
  {
    id: 1,
    name: 'Interview with head of Town',
    type: 'audio',
  },
  {
    id: 2,
    name: 'Interview with head of Town',
    type: 'transcript',
  },
]
const Interview = () => {
  const CustomMediaRecorder = dynamic(
    () => import('@/components/customMediaRecorder'),
    {
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
    }
  )

  const [openModal, setOpenModal] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  )

  const [modalType, setModalType] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [open, toggleOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState(null)
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setModalType(option)
    setOpenModal(true)
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
  // const { isRecording, toggleRecording, audioUrl } = useAudioRecorder()

  const isLoading = false
  const handleMoreClick = (rowIndex: any) => {
    setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
  }
  const menuItems = [
    {
      title: 'Play Audio',
      icon: IconNames.documentText,
      action: () => console.log('play audio'),
    },
    {
      title: 'Download Audio',
      icon: IconNames.trash,
      action: () => {
        console.log('download audio')
      },
    },
  ]
  const handleSave = async (audioUrl?: any) => {
    console.log(audioUrl, 'audioUrl')
    const formData = new FormData()

    if (audioUrl) {
      formData.append('audio', audioUrl, 'audio.wav')
      console.log(formData, 'formData')
    } else if (uploadedFile && fileName && !audioUrl) {
      console.log('File name:', fileName)
      console.log('Uploaded file:', uploadedFile)
    } else {
      toast.error('Please select a file and enter a file name.')
    }
    //  try {
    //    const response = await fetch('/upload-audio-endpoint', {
    //      method: 'POST',
    //      body: formData,
    //    })

    //    if (!response.ok) {
    //      throw new Error('Failed to upload audio')
    //    }

    //    const responseData = await response.json()
    //    console.log('Audio uploaded successfully:', responseData)
    //    toast.success('Audio uploaded successfully')
    //  } catch (error) {
    //    console.error('Error uploading audio:', error)
    //    toast.error('Error uploading audio')
    //  }
  }

  return (
    <div className="w-full">
      <div className="flex xl:flex-row xl:justify-between xl:gap-0 flex-col justify-center items-center gap-y-6">
        <div className="">
          <CustomMediaRecorder onSave={handleSave} />
        </div>
        <div className="flex relative w-fit">
          <motion.button
            className={cn(
              'flex h-fit items-center justify-between bg-primary text-white py-3 px-4 rounded-lg'
            )}
            onClick={() => toggleOpen(!open)}
            layout="position"
          >
            <div className="flex gap-2">
              <IconPicker icon="profile2User" size="1.5rem" />
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
                className="mt-2 w-fit bg-white rounded-lg p-4 shadow-lg absolute top-0 right-[130px] whitespace-nowrap"
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
                    'px-4 py-2',
                    selectedOption === 'Upload Audio' && 'bg-grey-100'
                  )}
                  onClick={() => handleOptionClick('Upload Audio')}
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">
                      Upload Audio
                    </span>
                    <span className="hidden md:block lg:hidden">U</span>
                  </Text>
                </div>

                <div
                  className={cn(
                    'px-4 py-2',
                    selectedOption === 'Transcript' && 'bg-grey-100'
                  )}
                  onClick={() => handleOptionClick('Transcript')}
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">Transcript</span>
                    <span className="hidden md:block lg:hidden">T</span>
                  </Text>
                </div>
                <div
                  className={cn(
                    'px-4 py-2',
                    selectedOption === 'Transcript' && 'bg-grey-100'
                  )}
                  onClick={() => handleOptionClick('FGD Guide')}
                >
                  <Text variant="text/md">
                    <span className="block md:hidden lg:block">FGD Guide</span>
                    <span className="hidden md:block lg:hidden">F</span>
                  </Text>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Table className="table-auto my-24">
        <TableHeader className="bg-grey-100">
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Type</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableLoader />
          ) : (
            interviews?.map?.((val) => (
              <TableRow
                key={val.id}
                className="font-normal text-sm text-grey-600"
              >
                <TableCell>{val?.name}</TableCell>
                <TableCell>{val?.type}</TableCell>

                <TableCell className="relative">
                  <div
                    onClick={() => handleMoreClick(val?.id)}
                    className=" p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
                  >
                    <IconPicker icon="more" size="1.25rem" />
                  </div>
                  {selectedRow === val?.id && (
                    <DropDownMenu
                      menuItems={menuItems}
                      onClose={() => setSelectedRow(null)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal
        className="sm:w-1/2 sm:h-1/2 flex items-center justify-center"
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title={`${modalType}`}
      >
        {modalType === 'Upload Audio' && (
          <AudioModal
            fileInputRef={fileInputRef}
            fileName={fileName}
            setFileName={setFileName}
            setUploadedFile={setUploadedFile}
            handleSave={handleSave}
          />
        )}
        {modalType === 'Transcript' && (
          <TranscriptModal
            fileInputRef={fileInputRef}
            fileName={fileName}
            setFileName={setFileName}
            setUploadedFile={setUploadedFile}
            handleSave={handleSave}
          />
        )}
        {modalType === 'FGD Guide' && (
          <FgdGuideModal
            fileInputRef={fileInputRef}
            fileName={fileName}
            setFileName={setFileName}
            setUploadedFile={setUploadedFile}
            handleSave={handleSave}
          />
        )}
      </Modal>
    </div>
  )
}

export default Interview
