import React from 'react'
import { IconNames } from '../ui/icon-picker/icon-names'
import { ActionBlock } from '../ui/action-block'
import { IconPicker } from '../ui/icon-picker'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'
import Modal from '../ui/modal'
import { AddHealthDataRecordContent } from '@/app/dashboard/health-data/add-record/add-health-data-record-content'
import { AddRecordContent } from '@/app/dashboard/user-profile/instructors/add-instructor/add-record-content'
import { AddNewParentContent } from '@/app/dashboard/user-profile/parents/add/add-new-parent-content'
import { AddParentQuestionnaire } from '@/app/dashboard/user-profile/parents/questionnaire/add-questionnaire'
import { AddNewStudentContent } from '@/app/dashboard/user-profile/students/add-student/add-new-student-content'

// import { useQueryState } from 'nuqs'

const data = [
  {
    title: 'Create New Child Profile',
    subtitle: 'Add Child Profile',
    icon: 'profile2User' as IconNames,
    type: 'student',
  },
  {
    title: 'Create New Parent Profile',
    subtitle: 'Add Parent Profile',
    icon: 'profile2User' as IconNames,
    type: 'parent',
  },
  {
    title: 'NCD Risk Assessment',
    subtitle: 'Get risk assessment report',
    icon: 'assessment' as IconNames,
    type: 'link',
    url: 'dashboard/risk-assessment',
  },
  {
    title: 'Enter Health Data',
    subtitle: 'Add health progress',
    icon: 'health' as IconNames,
    type: 'health-data',
  },
  {
    title: 'Enter Parent Questionnaire',
    subtitle: 'Add/update parent questionnaire',
    icon: 'bookmark' as IconNames,
    type: 'parent questionnaire',
  },
]

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const QuickActions = () => {
  //   const [modalTypeState, setModalType] = React.useState<string | null>()
  const router = useRouter()
  const searchParams = useSearchParams()
  console.log(
    '🚀 ~ QuickActions ~ searchParams:',
    searchParams.get('modalType')
  )
  const modalType = searchParams.get('modalType')
  const pathname = usePathname()

  return (
    <div className="">
      <ActionBlock title="Quick Actions" className="mb-4">
        {data.map((item, idx) => (
          <div key={item.title}>
            <button
              className="flex justify-between items-center cursor-pointer border-none outline-none bg-transparent w-full"
              onClick={() => {
                if (item.type === 'link') {
                  item.url && router.push(item.url)
                  return
                }
                const params = new URLSearchParams()
                params.set('modalType', item.type)

                router.push(pathname + '?' + params.toString())
              }}
            >
              <div className="flex items-center gap-4 flex-1">
                <IconPicker
                  icon={item.icon}
                  size="1.5rem"
                  className="text-grey-900"
                />
                <div className="text-left">
                  <Text variant="text/sm" weight="medium" className="mb-1.1">
                    {item.title}
                  </Text>
                  <Text variant="text/sm" className="text-grey-500">
                    {item.subtitle}
                  </Text>
                </div>
              </div>
              <IconPicker icon="arrowOutward" className="text-grey-900" />
            </button>
            {idx !== data.length - 1 && <Divider className="my-4" />}
          </div>
        ))}
      </ActionBlock>
      <Modal
        open={!!modalType}
        key={modalType}
        closeModal={() => {
          router.push(pathname)
        }}
        title={`Add new ${modalType}`}
      >
        {modalType === 'student' && <AddNewStudentContent />}
        {modalType === 'parent' && <AddNewParentContent />}
        {modalType === 'instructor' && <AddRecordContent />}
        {modalType === 'health-data' && <AddHealthDataRecordContent />}
        {modalType === 'parent questionnaire' && <AddParentQuestionnaire />}
      </Modal>
    </div>
  )
}
