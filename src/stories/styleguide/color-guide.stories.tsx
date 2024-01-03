import React from 'react'
import { Meta } from '@storybook/react'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { flatten } from 'flat'
import colors from '@/constants/colors'

const getContrastYIQ = (hexcolor = '') => {
  const r = parseInt(hexcolor.substring(1, 3), 16)
  const g = parseInt(hexcolor.substring(3, 5), 16)
  const b = parseInt(hexcolor.substring(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

const Color = ({ color = '', name = '' }) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center rounded-lg mb-10 w-[118.4px] h-[104px]'
      )}
      style={{ background: color }}
    >
      <Text
        className={cn('text-[10px]')}
        style={{ color: getContrastYIQ(color) }}
        weight="medium"
      >
        {color}-<b>{name}</b>
      </Text>
    </div>
  )
}

const ColorShades = ({ colorKey = '', colors = {} }) => {
  const flattenedColors = flatten<typeof colors, Record<string, string>>(colors)

  return (
    <div>
      <Text variant="text/xs" weight="medium">
        {colorKey}
      </Text>
      <div className="flex flex-wrap gap-3">
        {Object.keys(flattenedColors).map((item, index) => {
          return (
            <Color
              key={`color-${item}-${index}`}
              color={flattenedColors[item]}
              name={item}
            />
          )
        })}
      </div>
    </div>
  )
}

export const Colors = (): JSX.Element => {
  return (
    <section>
      <Text weight="medium" as="h3" className="mb-6">
        PROJECT COLORS
      </Text>

      <Color color={colors?.lust?.[900] ?? ''} name={'primary'} />
      <Color color={colors?.sunglow?.[900] ?? ''} name={'secondary'} />
      <ColorShades colorKey="Lust (Red)" colors={colors?.lust} />
      <ColorShades colorKey="Sunglow" colors={colors?.sunglow} />

      <Text weight="medium" as="h3" className="mb-6">
        SUPPORTING COLORS
      </Text>
      <ColorShades colorKey="Grey" colors={colors?.grey} />
      <ColorShades
        colorKey="Spanish Violet"
        colors={colors?.['spanish-violet']}
      />
      <ColorShades colorKey="Iris" colors={colors?.iris} />
      <ColorShades
        colorKey="Carmine Pink Red"
        colors={colors?.['carmine-pink-red']}
      />
      <ColorShades colorKey="Orange" colors={colors?.orange} />
      <ColorShades
        colorKey="Yellow Orange"
        colors={colors?.['yellow-orange']}
      />
      <ColorShades colorKey="Blue" colors={colors.blue} />
      <ColorShades colorKey="Green" colors={colors.green} />
    </section>
  )
}

const meta = {
  title: 'Design System/Colors',
  component: Colors,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as Meta

export default meta
