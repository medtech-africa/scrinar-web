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
  const [open, toggleOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  )
  const [selectedRow, setSelectedRow] = React.useState(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

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
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    if (option === 'Upload Audio' && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      console.log('Uploaded file:', selectedFile)
    }
  }
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
  return (
    <div className="w-full h-10">
      <div className="flex justify-start relative w-fit">
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
              className="mt-2 w-fit bg-white rounded-lg p-4 shadow-lg absolute top-0 left-[130px] whitespace-nowrap"
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
                  <span className="block md:hidden lg:block">Upload Audio</span>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Table className="table-auto my-20">
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default Interview
