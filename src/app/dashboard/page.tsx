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
import { isMasterInstructor } from '@/utils/checkPermission'
import useSchoolChangeRefresh from '@/hooks/useSchoolChangeRefresh'
import { AddNewParentContent } from './user-profile/parents/add/add-new-parent-content'
import { AddParentQuestionnaire } from './user-profile/parents/questionnaire/add-questionnaire'
import { HealthDataBarStats } from '@/components/dashboard/HealthDataBarStats'
import { HealthDataCompletionStats } from '@/components/dashboard/HealthDataCompletionStats'

const dashboardStats = [
  {
    title: 'Total Users',
    icon: 'profile2User' as IconNames,
    count: 'totalCount' as const,
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
  },
  {
    title: 'Children',
    icon: 'profile2User' as IconNames,
    count: 'childrenCount' as const,
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
    slug: '/family-health-data/students',
  },
  {
    title: 'Fathers',
    icon: 'profile2User' as IconNames,
    count: 'fatherCount' as const,
    avatars: [
      'https://i.pravatar.cc/300',
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/50',
    ],
    slug: '/family-health-data/fathers',
  },
  {
    title: 'Mothers',
    icon: 'profile2User' as IconNames,
    count: 'motherCount' as const,
    avatars: [
      'https://i.pravatar.cc/300',
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/50',
    ],
    slug: '/family-health-data/mothers',
  },
  {
    title: 'House holds',
    icon: 'eclise' as IconNames,
    count: 'totalUniqueFamilies' as const,
    avatars: [
      'https://i.pravatar.cc/100x100',
      'https://i.pravatar.cc/200x100',
      'https://i.pravatar.cc/300x400',
    ],
    slug: '/family-health-data/household',
  },
]

const dashboardHealthDataStats = [
  {
    title: 'Health Data',
    icon: 'health' as IconNames,
    count: 'healthDataCount' as const,
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
    slug: '/health-data',
  },
  {
    title: 'Children',
    icon: 'profile2User' as IconNames,
    count: 'healthDataStudentCount' as const,
    avatars: [
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/200',
      'https://i.pravatar.cc/60',
    ],
    slug: '/family-health-data/students',
  },
  {
    title: 'Fathers',
    icon: 'profile2User' as IconNames,
    count: 'healthDataFatherCount' as const,
    avatars: [
      'https://i.pravatar.cc/300',
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/50',
    ],
    slug: '/family-health-data/fathers',
  },
  {
    title: 'Mothers',
    icon: 'profile2User' as IconNames,
    count: 'healthDataMotherCount' as const,
    avatars: [
      'https://i.pravatar.cc/300',
      'https://i.pravatar.cc/100',
      'https://i.pravatar.cc/50',
    ],
    slug: '/family-health-data/mothers',
  },
]

const actionData1 = [
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
  const user = useUser((state) => state.user)
  const selectedSchool = useUser((state) => state.selectedSchool)
  const isMI = isMasterInstructor(user?.user?.roles ?? user?.roles)
  const {
    isPending: isLoading,
    data,
    refetch,
  } = useDashboardStats(isMI ? (selectedSchool ? true : false) : true)
  useSchoolChangeRefresh(refetch)

  if (isMI && !selectedSchool) {
    return null
  }

  const totalStats = [...dashboardStats, ...dashboardHealthDataStats]

  const getCardTitle = (count: (typeof totalStats)[number]['count']) => {
    if (count === 'totalCount') {
      if (data?.childrenCount) {
        const totalCount =
          data?.childrenCount + data?.fatherCount + data?.motherCount
        return String(totalCount)
      } else {
        return '..'
      }
    }

    return data?.[count] ? String(data?.[count]) : '..'
  }

  return (
    <div className="text-grey-900">
      <section className="pb-4">
        <Text variant="text/sm" className="text-grey-600 mb-4 capitalize">
          Hi, {user?.firstName ?? isMI ? 'Master Instructor' : 'Admin'} Welcome
          Back 😄
        </Text>
        <Text variant="display/xs" weight="medium">
          Dashboard Overview (Work In Progress)
        </Text>
      </section>
      <section className="grid lg:grid-cols-[2.5fr_1fr] gap-6 mt-2.2 py-5">
        <div className="">
          <section>
            <Text className="text-grey-700" variant="text/md" weight="medium">
              Users
            </Text>
            <div className="lg:grid-cols-3 flex flex-wrap gap-4 mb-6 sm:grid-cols-1 justify-center sm:justify-start">
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
                      title={getCardTitle(stat.count)}
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
                    {stat.slug && (
                      <Link href={`/dashboard${stat.slug}`}>
                        <span className="absolute inset-0" />
                      </Link>
                    )}
                  </DashboardCard>
                )
              })}
            </div>
            {/* <div className="grid md:grid-cols-[70%_30%] gap-6 p-4 border border-grey-100">
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
          </div> */}
          </section>
          <section>
            <Text className="text-grey-700" variant="text/md" weight="medium">
              Health data count
            </Text>
            <div className="lg:grid-cols-3 flex flex-wrap gap-4 mb-6 sm:grid-cols-1 justify-center sm:justify-start">
              {dashboardHealthDataStats.map((stat, _) => {
                const statColor =
                  stat.icon === 'health'
                    ? 'lust'
                    : stat.icon === 'teacher'
                      ? 'green'
                      : 'iris'
                return (
                  <DashboardCard className="w-ful relative" key={_}>
                    <DashboardCardHeader
                      title={getCardTitle(stat.count)}
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
                    {stat.slug && (
                      <Link href={`/dashboard${stat.slug}`}>
                        <span className="absolute inset-0" />
                      </Link>
                    )}
                  </DashboardCard>
                )
              })}
            </div>
          </section>
        </div>

        <section>
          <ActionBlock title="Quick Actions" className="mb-4">
            {actionData1.map((act, _) => (
              <div key={`quick_actions_${_}`}>
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
                  <IconPicker icon="arrowOutward" className="text-grey-900" />
                </div>
                {_ !== actionData1.length - 1 && <Divider className="my-4" />}
              </div>
            ))}
          </ActionBlock>
        </section>
      </section>
      <div className="grid gap-6">
        <HealthDataBarStats />
        <HealthDataCompletionStats />
      </div>
      <Modal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title={`Add new ${modalType}`}
      >
        {modalType === 'student' && <AddNewStudentContent />}
        {modalType === 'parent' && <AddNewParentContent />}
        {modalType === 'instructor' && <AddRecordContent />}
        {modalType === 'health-data' && <AddHealthDataRecordContent />}
        {modalType === 'parent questionnaire' && <AddParentQuestionnaire />}
      </Modal>
      <ContentLoader loading={isLoading} />
    </div>
  )
}
