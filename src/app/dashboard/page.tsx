'use client'

import { Text } from '@/components/ui/text'
import {
  DashboardCard,
  DashboardCardAvatar,
  DashboardCardDivider,
  DashboardCardFooter,
  DashboardCardHeader,
  DashboardCardIcon,
} from '@/components/ui/dashboard-card'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { cn } from '@/lib/utils'
import colors from '@/constants/colors'
import { Button } from '@/components/ui/button'
import DashboardProgressPattern from '@/components/svg/dashboard-progress-pattern'
import DashboardProgress from '@/components/svg/dashboard-progess'
import { ActionBlock } from '@/components/ui/action-block'
import { Divider } from '@/components/ui/divider'
import Link from 'next/link'
import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { AddNewStudentContent } from './user-profile/students/add-student/add-new-student-content'
import { AddRecordContent } from './user-profile/instructors/add-instructor/add-record-content'
import { AddHealthDataRecordContent } from './health-data/add-record/add-health-data-record-content'
import { useUser } from '@/context/user'
import useDashboardStats from '@/hooks/queries/useDashboardStats'
import ContentLoader from '@/components/content-loader'
import restrictNonAdmin from '@/utils/checkPermission'

const dashboardStats = [
  {
    title: 'Students',
    icon: 'profile2User' as IconNames,
    count: 'totalStudents',
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
    slug: '/user-profile/students',
  },
  {
    title: 'Instructors',
    icon: 'teacher' as IconNames,
    count: 'totalInstructors',
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
    slug: '/user-profile/instructors',
  },
  {
    title: 'Health Data',
    icon: 'health' as IconNames,
    count: 'totalHealthData',
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
    slug: '/health-data',
  },
]

const actionData1 = [
  {
    title: 'Create New Student Profile',
    subtitle: 'Add Student Profile',
    icon: 'profile2User' as IconNames,
    type: 'student',
  },
  {
    title: 'Create Student Health Data',
    subtitle: 'Add student health progress',
    icon: 'health' as IconNames,
    type: 'health-data',
  },
  {
    title: 'Create New Instructor Profile',
    subtitle: 'Add New Instructor for School',
    icon: 'teacher' as IconNames,
    type: 'instructor',
    admin: true,
  },
]

const _actionData2 = [
  {
    date: 'Aug 10, 2023  •  8:00AM',
    location: 'School Hall',
    status: 'upcoming',
  },
  {
    date: 'Aug 10, 2023  •  8:00AM',
    location: 'School Hall',
    status: 'missed',
  },
  {
    date: 'Aug 10, 2023  •  8:00AM',
    location: 'School Hall',
    status: 'other',
  },
]
export default function Home() {
  const [modalType, setModalType] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const { user } = useUser()
  const { isLoading, data } = useDashboardStats()

  return (
    <div className="text-grey-900">
      <section className="pb-4">
        <Text variant="text/sm" className="text-grey-600 mb-4 capitalize">
          Hi, {user?.firstName ?? 'Admin'} Welcome Back 😄
        </Text>
        <Text variant="display/xs" weight="medium">
          Dashboard Overview
        </Text>
      </section>
      <section className="grid lg:grid-cols-[2.5fr_1fr] gap-6 mt-2.2 py-8">
        <section>
          <div className="lg:grid-cols-3 flex flex-wrap gap-4 mb-6">
            {dashboardStats.map((stat, _) => {
              const statColor =
                stat.icon === 'health'
                  ? 'lust'
                  : stat.icon === 'teacher'
                  ? 'green'
                  : 'iris'
              return (
                <DashboardCard className="w-ful relative" key={_}>
                  <DashboardCardHeader
                    title={data?.[stat.count] ?? '..'}
                    subtitle={stat.title}
                    icon={
                      <DashboardCardIcon
                        className={cn(`bg-${statColor}-50`)}
                        style={{ borderColor: colors[statColor][100] }}
                      >
                        <IconPicker
                          icon={stat.icon}
                          size="1.5rem"
                          className={cn(`text-${statColor}-900`)}
                        />
                      </DashboardCardIcon>
                    }
                  />
                  <DashboardCardDivider />
                  <DashboardCardFooter>
                    <div className="justify-start items-start flex">
                      <DashboardCardAvatar
                        src="https://i.pravatar.cc/100"
                        background="bg-rose-100"
                        border="border-rose-200"
                      />
                      <DashboardCardAvatar
                        className="-ml-1.2"
                        src="https://i.pravatar.cc/200"
                        background="bg-violet-100"
                        border="border-violet-200"
                      />
                      <DashboardCardAvatar
                        className="-ml-1.2"
                        src="https://i.pravatar.cc/60"
                        background="bg-emerald-50"
                        border="border-emerald-100"
                      />

                      <DashboardCardAvatar
                        className="-ml-1.2"
                        background="bg-emerald-50"
                        border="border-emerald-100"
                      >
                        <div className="left-[13px] top-[10px] absolute text-slate-800 text-[10px] font-bold leading-[10px]">
                          +
                        </div>
                      </DashboardCardAvatar>
                    </div>
                    <div className="w-4 h-4 relative">
                      <IconPicker
                        icon="arrowOutward"
                        className="text-grey-900"
                      />
                    </div>
                  </DashboardCardFooter>
                  <Link href={`/dashboard${stat.slug}`}>
                    <span className="absolute inset-0" />
                  </Link>
                </DashboardCard>
              )
            })}
          </div>
          <div className="grid md:grid-cols-[70%_30%] gap-6 p-4 border border-grey-100">
            <div>
              <Text variant="text/sm" className="mb-4 text-grey-500">
                Ongoing Learning
              </Text>
              <Text variant="display/xs" weight="bold">
                Age-Appropriate Exercises for Students
              </Text>
              <Text variant="text/sm" className="text-grey-500 mt-2 mb-6">
                Discover suitable exercises tailored to {"students'"} age and
                development.
              </Text>
              <Link href={'/dashboard/training-module'}>
                <Button
                  className="border-2 border-sunglow-200 font-medium"
                  variant="secondary"
                >
                  Continue Training Module
                </Button>
              </Link>
            </div>
            <div className="relative justify-center items-center flex">
              <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
              <DashboardProgress progress={40} />
            </div>
          </div>
        </section>
        <section>
          <ActionBlock title="Quick Actions" className="mb-6">
            {actionData1.map(
              (act, _) =>
                ((act?.admin && restrictNonAdmin(user?.user?.roles)) ||
                  !act?.admin) && (
                  <div key={_}>
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => {
                        setModalType(act.type)
                        setOpenModal(true)
                      }}
                    >
                      <div className="flex  items-center gap-6">
                        <IconPicker
                          icon={act.icon}
                          size="1.5rem"
                          className="text-grey-900"
                        />
                        <div>
                          <Text
                            variant="text/sm"
                            weight="medium"
                            className="mb-1.1"
                          >
                            {act.title}
                          </Text>
                          <Text variant="text/sm" className="text-grey-500">
                            {act.subtitle}
                          </Text>
                        </div>
                      </div>
                      <IconPicker
                        icon="arrowOutward"
                        className="text-grey-900"
                      />
                    </div>
                    {_ !== actionData1.length - 1 && (
                      <Divider className="my-4" />
                    )}
                  </div>
                )
            )}
          </ActionBlock>

          <ActionBlock title="Upcoming Screening">
            <Text variant="text/sm" weight="medium" className="mb-1.1">
              No upcoming screening
            </Text>
            {/* {actionData2.map((act, _) => {
              const statusColor =
                act.status === 'upcoming'
                  ? 'sunglow'
                  : act.status === 'missed'
                  ? 'lust'
                  : 'iris'
              return (
                <div
                  key={_}
                  className={cn(
                    'p-4 flex gap-2 border-l-4 bg-grey-50',
                    _ !== actionData2.length - 1 && 'mb-4'
                  )}
                  style={{
                    color: colors[statusColor][900],
                    borderLeftColor: colors[statusColor][900],
                  }}
                >
                  <IconPicker icon="eclise" size="0.75rem" />
                  <div>
                    <Text
                      variant="text/sm"
                      weight="medium"
                      className="mb-2 -mt-1 text-grey-900"
                    >
                      Upcoming Screening Here
                    </Text>
                    <div className="flex gap-2 items-center">
                      <Text variant="text/sm" className="text-grey-500">
                        {act.date}
                      </Text>
                      <div className="w-[1px] min-h-[18px] h-full bg-grey-200" />
                      <IconPicker
                        icon="location"
                        size="0.75rem"
                        className="text-grey-900"
                      />
                      <Text variant="text/sm" className="text-grey-500">
                        {act.location}
                      </Text>
                    </div>
                  </div>
                </div>
              )
            })} */}
          </ActionBlock>
        </section>
      </section>
      <Modal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title={`Add new ${modalType}`}
      >
        {modalType === 'student' && <AddNewStudentContent />}
        {modalType === 'instructor' && <AddRecordContent />}
        {modalType === 'health-data' && <AddHealthDataRecordContent />}
      </Modal>
      <ContentLoader loading={isLoading} />
    </div>
  )
}
