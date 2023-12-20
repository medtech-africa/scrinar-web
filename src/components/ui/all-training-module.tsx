import React from 'react'
import { Text } from './text'
import Image from 'next/image'
import { IconPicker } from './icon-picker'
import Link from 'next/link'
import { TrainingModule } from '@/types/trainingModules.types'

interface TMProps {
  modules: TrainingModule[]
}
const AllTrainingModule = ({ modules }: TMProps) => {
  return (
    <div className="py-8">
      <div className="flex flex-col mb-8">
        {/* <Text variant="text/lg" weight="medium">
          Recommended
        </Text> */}
        <Text variant="text/sm" className="text-grey-600 mt-2">
          Discover handpicked modules to elevate your training journey.
        </Text>

        {!!modules?.length && (
          <div className="grid lg:grid-rows-1 md:grid-cols-2 gap-6 mt-6">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={`training-module/course/${module.id}`}
              >
                <div className="relative rounded-2xl overflow-hidden w-full h-[200px] border border-grey hover:border-[3px] hover:border-black/30">
                  <Image
                    src={module.imageUrl ?? '/module.png'}
                    alt={module.title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <div className="inline-flex items-center text-white justify-center text-[10px] font-medium  py-[5px] px-4 rounded-2xl cursor-pointer bg-black bg-opacity-30 absolute top-4 left-4">
                    {module.category}
                  </div>
                  {/* <div className="inline-flex items-center text-white justify-center gap-x-2 py-[5px] px-4 rounded-2xl cursor-pointer bg-black bg-opacity-30 absolute top-4 right-[16.5px]">
                  <IconPicker icon="bookmark" />
                  <Text className="text-[10px] "> Bookmark</Text>
                </div> */}

                  <div className="absolute right-[16.5px] bottom-4 cursor-pointer">
                    <div className="relative w-6 h-6 border border-lust-700 bg-lust-900 rounded-full text-white z-50 ">
                      <IconPicker
                        icon="play"
                        className="absolute top-[3px] left-[3px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-[3px] absolute left-4 bottom-5 text-white w-[80%] z-10">
                    <Text variant="text/md" weight="bold">
                      {module.title}
                    </Text>
                    <Text variant="text/xs">{module.description}</Text>
                  </div>
                  <div className="bg-gradient-to-b from-transparent from-10% via-transparent via-10% to-[#00000075] to-150% absolute top-0 left-0 w-full h-full opacity-90"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllTrainingModule
