'use client'
import ContentLoader from '@/components/content-loader'
import { PageHeader } from '@/components/page-header'
import AllTrainingModule from '@/components/ui/all-training-module'
//@todo: uncomment
// import AllTrainingModuleBottom from '@/components/ui/all-training-module-bottom'
// import { IconPicker } from '@/components/ui/icon-picker'
// import { Input } from '@/components/ui/input'
// import Bookmark from '@/components/ui/bookmark'
// import OngoingLesson from '@/components/ui/ongoing-lesson'
import { TabList } from '@/components/ui/tab-list'
import useTrainingModules from '@/hooks/queries/useTrainingModules'
// import { Text } from '@/components/ui/text'
import React, { useState } from 'react'

const data = [
  'All Training Module',
  // 'Ongoing Learning',
  // 'Bookmarks'
]

// const data2 = [
// 'All Training Module',
// 'Health Assessment',
// 'Nutrition',
// 'Exercise Education',
// ]
const TrainingModule = () => {
  const [activeTab, setActiveTab] = useState('All Training Module')
  // const [activeTab2, setActiveTab2] = useState('All Training Module')
  const { data: trainingData, isLoading } = useTrainingModules()

  const handleTabClick = (label: any) => {
    setActiveTab(label)
  }

  // const handleTabClick2 = (label: any) => {
  //   setActiveTab2(label)
  // }

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
      {/* <div className="py-8">
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
          <div>
            <Input
              leadingIcon={<IconPicker icon="search" />}
              placeholder="Search for topic or course"
              className="bg-grey-100 rounded-[49px]"
              full
            />
          </div>
        </div>
        <div className="mt-6">
          <TabList2
            labels={data2}
            onClickTabItem={handleTabClick2}
            activeTab={activeTab2}
          />
          {activeTab2 === 'All Training Module' && <AllTrainingModuleBottom />}
          {activeTab2 === 'Health Assessment' && <div>Content for Tab 2</div>}
          {activeTab2 === 'Nutrition' && <div>Content for Tab 3</div>}
          {activeTab2 === 'Exercise Education' && <div>Content for Tab 4</div>}
        </div>
      </div> */}
    </div>
  )
}

export default TrainingModule
