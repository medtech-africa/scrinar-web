import React from 'react'
import { Text } from './text'
import { TrainingCard } from './training-card'

const Bookmark = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col mb-8">
        <Text variant="text/lg" weight="medium">
          Bookmarks
        </Text>
        <Text variant="text/sm" className="text-grey-600 mt-2">
          Here are the overview of your watch later training module
        </Text>
        <div className="pt-6 grid lg:grid-cols-2 grid-cols-1">
          <TrainingCard data={[]} type="bookmark" />
        </div>
      </div>
    </div>
  )
}

export default Bookmark
