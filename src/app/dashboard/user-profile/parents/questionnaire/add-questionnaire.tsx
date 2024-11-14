import { Avatar } from '@/components/ui/avatar'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import useParents from '@/hooks/queries/useParents'
import { Parent } from '@/types/questionnaire.types'
import { returnJoinedFirstCharacter } from '@/utils/returnJoinedFirstCharacter'
import React, { useMemo, useState } from 'react'
import { ParentQuestionnaire } from '.'

const AddParentQuestionnaire = () => {
  const { data: parentsData, isFetching: parentsLoading } = useParents(
    0,
    '',
    true
  )

  const [parent, setParent] = useState<Parent | null>()

  const parents = useMemo(
    () =>
      parentsData?.data?.map((st: any) => ({
        label: `${st?.firstName} ${st?.lastName}`,
        value: st?.id,
        ...st,
      })) ?? [],
    [parentsData]
  )

  return (
    <div className="w-full h-full">
      <PageCard title="Parent Bio Data" bodyStyle="p-4">
        <div className="flex items-end">
          <div className="flex items-center">
            {parent ? (
              <Avatar
                src={parent?.avatarUrl}
                fallback={returnJoinedFirstCharacter(
                  parent?.firstName,
                  parent?.lastName
                )}
              />
            ) : (
              <div className="p-4 rounded-full border border-lust-100 border-dashed ">
                <IconPicker icon="add" className="text-lust-900" />
              </div>
            )}
            <Text
              className="ml-2 text-gray-900"
              variant="text/md"
              weight="medium"
            >
              Parent Avatar
            </Text>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <Select
            label="Parent"
            full
            labelStyle="lg:text-sm text-xs"
            placeholder="Select Parent"
            isLoading={parentsLoading}
            isDisabled={parentsLoading}
            options={parents}
            onChange={(val) => setParent(val as Parent)}
            value={parent}
          />
          {parent && (
            <>
              <Input
                label="Parent Gender"
                disabled
                defaultValue={parent?.gender}
                labelStyle="lg:text-sm text-xs"
                className="capitalize"
              />
            </>
          )}
        </div>
      </PageCard>

      {parent && (
        <>
          <Text
            variant="display/xs"
            weight="medium"
            className="text-grey-900 capitalize mb-3"
          >
            Questionnaire
          </Text>
          <ParentQuestionnaire
            gender={parent?.gender}
            parentId={parent.id}
            hasDefault
          />
        </>
      )}
    </div>
  )
}

export { AddParentQuestionnaire }
