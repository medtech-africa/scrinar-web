'use client'
import { PageHeader } from '@/components/page-header'
import AllTrainingModule from '@/components/ui/all-training-module'
import AllTrainingModuleBottom from '@/components/ui/all-training-module-bottom'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { TabList, TabList2 } from '@/components/ui/tab-list'
import { Text } from '@/components/ui/text'
import React, { useState } from 'react'
import Bookmark from '@/components/ui/bookmark'
import OngoingLesson from '@/components/ui/ongoing-lesson'
const data = ['All Training Module', 'Ongoing Learning', 'Bookmarks']
const data2 = [
  'All Training Module',
  'Health Assessment',
  'Nutrition',
  'Exercise Education',
]
const TrainingModule = () => {
  const [activeTab, setActiveTab] = useState('All Training Module')
  const [activeTab2, setActiveTab2] = useState('All Training Module')
  const handleTabClick = (label: any) => {
    setActiveTab(label)
  }
  const handleTabClick2 = (label: any) => {
    setActiveTab2(label)
  }
  return (
    <div>
      <PageHeader
        title="Training Module"
        subtitle="Explore, Learn, and Grow through Comprehensive Health Training Modules."
      />

      <TabList
        labels={data}
        onClickTabItem={handleTabClick}
        activeTab={activeTab}
      />

      {activeTab === 'All Training Module' && <AllTrainingModule />}
      {activeTab === 'Ongoing Learning' && <OngoingLesson />}
      {activeTab === 'Bookmarks' && <Bookmark />}
      <div>
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
      </div>
    </div>
  )
}

export default TrainingModule
