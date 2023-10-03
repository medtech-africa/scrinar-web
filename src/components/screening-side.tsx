import React, { Dispatch, SetStateAction } from 'react'
import { Text } from './ui/text'
import { IconPicker } from './ui/icon-picker'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Select } from './ui/select'
import { Label } from './ui/label'

type Iprops = {
  actionOpened: boolean
  setActionType: Dispatch<SetStateAction<string>>
}

const ViewLayout = ({
  children,
  actionOpened,
}: {
  children: React.ReactNode
  actionOpened: boolean
}) => (
  <AnimatePresence initial={false}>
    {actionOpened && (
      <motion.section
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        exit={{ x: 200 }}
        transition={{ duration: 0.1 }}
        className="p-8 w-full md:w-[396px] z-50 fixed right-0 top-0 bg-white bottom-0"
      >
        {children}
      </motion.section>
    )}
  </AnimatePresence>
)

const ScreeningView = ({ actionOpened = false, setActionType }: Iprops) => {
  return (
    <ViewLayout actionOpened={actionOpened}>
      <Text variant="text/lg" weight="medium" className="mb-4">
        Screening Details
      </Text>
      <Text variant="text/sm" className="text-grey-600 mb-6">
        Your Scheduled Screening Details: Explore Your Upcoming Appointment
      </Text>
      <Text variant="text/lg" weight="medium" className="mb-4">
        Health Data Collection
      </Text>
      <div className="flex gap-4 mb-4">
        <div className="p-3 bg-grey-50 rounded">
          <IconPicker size="1.25rem" icon="calendar" />
        </div>
        <div className="w-full">
          <Input disabled defaultValue="10/08/2023" />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="p-3 bg-grey-50 rounded">
          <IconPicker size="1.25rem" icon="clock" />
        </div>
        <div className="w-full">
          <Input disabled defaultValue="10:30AM" />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="p-3 bg-grey-50 rounded">
          <IconPicker size="1.25rem" icon="location" />
        </div>
        <div className="w-full">
          <Input disabled defaultValue="School Hall" />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="p-3 bg-grey-50 rounded">
          <IconPicker size="1.25rem" icon="document" />
        </div>
        <div className="w-full">
          <Input disabled defaultValue="Screening Location" />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="p-3 bg-grey-50 rounded">
          <IconPicker size="1.25rem" icon="timer" />
        </div>
        <div className="w-full">
          <Input disabled defaultValue="Schedule" />
        </div>
      </div>
      <textarea
        disabled
        defaultValue="More description about the screening"
        className="py-2.2 px-3.5 rounded-lg bg-white utils-focus-outset mb-4 w-full"
      />
      <div className="flex gap-4">
        <Button
          onClick={() => setActionType('')}
          value="Close"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100 w-full py-3"
          leadingIcon={<IconPicker icon="closeSquare" />}
        />
        <Button
          value="Edit"
          className="w-full py-3"
          leadingIcon={<IconPicker icon="calendarTick" />}
          onClick={() => setActionType('edit')}
        />
      </div>
    </ViewLayout>
  )
}

const ScreeningAdd = ({ actionOpened = false, setActionType }: Iprops) => {
  return (
    <ViewLayout actionOpened={actionOpened}>
      <Text variant="text/lg" weight="medium" className="mb-4">
        Add New Screening
      </Text>
      <Text variant="text/sm" className="text-grey-600 mb-6">
        Schedule a New Screening Event
      </Text>

      <Input
        label="Screening Title"
        placeholder="e.g Data Collection"
        className="mb-4"
      />
      <div className="flex gap-4 mb-4">
        <Input
          label="Screening Date"
          placeholder="DD/MM/YYYY"
          leadingIcon={<IconPicker icon="calendar" size="1.25rem" />}
        />
        <Input
          label="Screening Time"
          placeholder="HH:MM"
          leadingIcon={<IconPicker icon="clock" size="1.25rem" />}
        />
      </div>

      <Input
        label="Screening Location"
        placeholder="e.g School Halln"
        className="mb-4"
      />

      <Select
        label="Assessment Type"
        placeholder="e.g Physical Assessment"
        className="mb-4"
      />

      <div>
        <Label htmlFor="de">Screening Note</Label>
        <textarea
          name="de"
          className="py-2.2 px-3.5 rounded-lg bg-white utils-focus-outset mb-4 w-full"
          rows={4}
          placeholder="Enter a description..."
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setActionType('')}
          value="Cancel"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100 w-full py-3"
          leadingIcon={<IconPicker icon="closeSquare" />}
        />
        <Button
          value="Schedule Now"
          className="w-full py-3"
          leadingIcon={<IconPicker icon="calendarTick" />}
        />
      </div>
    </ViewLayout>
  )
}

const ScreeningEdit = ({ actionOpened = false, setActionType }: Iprops) => {
  return (
    <ViewLayout actionOpened={actionOpened}>
      <Text variant="text/lg" weight="medium" className="mb-4">
        Add New Screening
      </Text>
      <Text variant="text/sm" className="text-grey-600 mb-6">
        Schedule a New Screening Event
      </Text>

      <Input
        label="Screening Title"
        defaultValue="Health Data Collection"
        className="mb-4"
        disabled
      />
      <div className="flex gap-4 mb-4">
        <Input
          label="Screening Date"
          placeholder="DD/MM/YYYY"
          leadingIcon={<IconPicker icon="calendar" size="1.25rem" />}
        />
        <Input
          label="Screening Time"
          placeholder="HH:MM"
          leadingIcon={<IconPicker icon="clock" size="1.25rem" />}
        />
      </div>

      <Input
        label="Screening Location"
        defaultValue="School Hall"
        disabled
        className="mb-4"
      />

      <Select
        label="Assessment Type"
        placeholder="e.g Physical Assessment"
        className="mb-4"
      />

      <Select
        label="Assessment Type"
        defaultValue="Schedule"
        options={[
          { value: 'Schedule', label: 'Schedule' },
          { value: 'Overdue', label: 'Overdue' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Completed', label: 'Completed' },
        ]}
        className="mb-4"
      />

      <div>
        <Label htmlFor="de">Screening Note</Label>
        <textarea
          name="de"
          className="py-2.2 px-3.5 rounded-lg bg-white utils-focus-outset mb-4 w-full"
          rows={4}
          placeholder="Enter a description..."
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setActionType('')}
          value="Cancel"
          className="bg-grey-50 text-grey-900 hover:bg-grey-100 w-full py-3"
          leadingIcon={<IconPicker icon="closeSquare" />}
        />
        <Button
          value="Update"
          className="w-full py-3"
          leadingIcon={<IconPicker icon="calendarTick" />}
        />
      </div>
    </ViewLayout>
  )
}

export { ScreeningView, ScreeningAdd, ScreeningEdit }
