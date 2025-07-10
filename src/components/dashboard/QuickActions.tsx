import React from 'react'
import { IconNames } from '../ui/icon-picker/icon-names'
import { ActionBlock } from '../ui/action-block'
import { IconPicker } from '../ui/icon-picker'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'
import Modal from '../ui/modal'
import { AddHealthDataRecordContent } from '@/app/dashboard/health-data/add-record/add-health-data-record-content'
import { AddNewPatientContent } from '@/app/dashboard/risk-assessment/patients/add/add-new-patient-content'

const data = [
  {
    title: 'Create New Patient Profile',
    subtitle: 'Add Patient Profile',
    icon: 'profile2User' as IconNames,
    type: 'patient',
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
]

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const QuickActions = () => {
  //   const [modalTypeState, setModalType] = React.useState<string | null>()
  const router = useRouter()
  const searchParams = useSearchParams()
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
        {modalType === 'patient' && <AddNewPatientContent />}
        {modalType === 'health-data' && <AddHealthDataRecordContent />}
      </Modal>
    </div>
  )
}
