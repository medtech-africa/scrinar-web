'use client'
import ContentLoader from '@/components/content-loader'
import { PageHeader } from '@/components/page-header'
import AllTrainingModule from '@/components/ui/all-training-module'
//@todo: uncomment
import AllTrainingModuleBottom from '@/components/ui/all-training-module-bottom'
// import { IconPicker } from '@/components/ui/icon-picker'
// import { Input } from '@/components/ui/input'
// import Bookmark from '@/components/ui/bookmark'
// import OngoingLesson from '@/components/ui/ongoing-lesson'
import { TabList, TabListButton } from '@/components/ui/tab-list'
import { useTrainingCourses } from '@/hooks/queries/useTrainingModules'
import { Text } from '@/components/ui/text'
import React, { useMemo, useState } from 'react'

const data = [
  'All Training Module',
  'Ongoing Learning',
  // 'Bookmarks'
]

const coursesTab = [
  { label: 'All Training Module', value: 'all' },
  { label: 'Health Assessment', value: 'health_assessment' },
  { label: 'Nutrition', value: 'nutrition' },
  { label: 'Exercise', value: 'exercise' },
]

const TrainingModule = () => {
  const [activeTab, setActiveTab] = useState('All Training Module')
  const [activeTab2, setActiveTab2] = useState('all')
  const { data: trainingData, isLoading } = useTrainingCourses()

  const handleTabClick = (label: any) => {
    setActiveTab(label)
  }

  const handleTabClick2 = (tab: any) => {
    setActiveTab2(tab.value)
  }

  const courses = useMemo(() => {
    const allCourses = trainingData?.data?.data ?? []
    const currentTab = coursesTab.find((course) => course.value === activeTab2)
    if (!currentTab || activeTab2 === 'all') return allCourses
    return allCourses.filter(
      (course) =>
        course.categories?.includes(currentTab?.label.toLowerCase() ?? '')
    )
  }, [activeTab2, trainingData?.data?.data])

  return (
    <div>
      <ContentLoader loading={isLoading} />

      <PageHeader
        title="Training Module"
        subtitle="Explore, Learn, and Grow through Comprehensive Health Training Modules."
      />

      <TabList
        labels={data}
        onClickTabItem={handleTabClick}
        activeTab={activeTab}
      />

      {activeTab === 'All Training Module' && (
        <AllTrainingModule modules={trainingData?.data?.data ?? []} />
      )}
      {/* {activeTab === 'Ongoing Learning' && <OngoingLesson />}
      {activeTab === 'Bookmarks' && <Bookmark />} */}

      {/* @todo: uncomment */}
      <div className="py-8">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Text variant="text/lg" weight="medium">
              All Training Module
            </Text>
            <Text variant="text/sm" className="text-grey-600 mt-2">
              Browse topics spanning nutrition, fitness, mental health, and
              beyond.
            </Text>
          </div>
          {/* TODO filter */}
          {/* <div>
            <Input
              leadingIcon={<IconPicker icon="search" />}
              placeholder="Search for topic or course"
              className="bg-grey-100 rounded-[49px]"
              full
            />
          </div> */}
        </div>
        <div className="mt-6">
          <TabListButton
            tabs={coursesTab}
            onClickTabItem={handleTabClick2}
            activeTab={activeTab2}
          />
          <AllTrainingModuleBottom courses={courses} />
          {/* {activeTab2 === 'all' && (
            <AllTrainingModuleBottom courses={courses} />
          )}
          {activeTab2 === 'health_assessment' && <div>Content for Tab 2</div>}
          {activeTab2 === 'nutrition' && <div>Content for Tab 3</div>}
          {activeTab2 === 'exercise' && <div>Content for Tab 4</div>} */}
        </div>
      </div>
    </div>
  )
}

export default TrainingModule
