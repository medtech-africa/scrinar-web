import React from 'react'
import { Text } from './text'
import Image from 'next/image'

const AllTrainingModule = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col mb-8">
        <Text variant="text/lg" weight="medium">
          Recommended
        </Text>
        <Text variant="text/sm" className="text-grey-600 mt-2">
          Discover handpicked modules to elevate your training journey.
        </Text>
        <div className="grid lg:grid-rows-1 md:grid-cols-2 gap-6 mt-6">
          <Image
            src="/module.png"
            alt="module"
            className="rounded-2xl"
            width={500}
            height={300}
          />
          <Image
            className="rounded-2xl"
            src="/module.png"
            alt="module"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}

export default AllTrainingModule
