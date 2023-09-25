import React from 'react'
import { CardDataProps } from './all-training-module-bottom'
import Image from 'next/image'
import { Text } from './text'
type TypeProp = 'ongoing' | 'bookmark'

type IProps = {
  data: CardDataProps[]
  type?: TypeProp
}
export const TrainingCard = ({ data, type }: IProps) => {
  return data.map((val) => (
    <div className="flex flex-row gap-4 p-4 shadow-md " key={val.id}>
      <Image src={val.image} alt="1" width={153} height={130} />
      <div className="flex flex-col gap-y-4 ">
        <div className="flex">
          <div className="px-4 py-[5px] mr-2 bg-grey-100 rounded-2xl">
            <Text variant="text/sm">{val.topic}</Text>
          </div>
          <div className="px-4 py-[5px] bg-grey-100 rounded-2xl">
            <Text variant="text/sm">{val.time}</Text>
          </div>
        </div>
        <div className="">
          <Text variant="text/md" weight="medium">
            {val.title}
          </Text>
          <Text variant="text/sm" className="text-grey-600 mt-2">
            {val.subtile}
          </Text>
        </div>
        {type === 'ongoing' ? (
          <div className="flex items-center gap-x-3">
            <Text>30%</Text>
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: 5 }}
              ></div>
            </div>
            <Text>100%</Text>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-baseline">
            <div className="flex flex-row flex-wrap gap-1">
              {val.category.map((cate, index) => (
                <div
                  className="px-4 py-[5px] mr-2 border rounded-2xl"
                  key={index}
                >
                  <Text variant="text/sm" className="text-grey-500">
                    {cate}
                  </Text>
                </div>
              ))}
            </div>
            {type === 'bookmark' && (
              <Text
                as="span"
                className="text-primary md:text-sm text-xs bg-lust-50 rounded-3xl transition-all cursor-pointer px-2 py-[5px]"
              >
                unbookmark
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  ))
}
