'use client'
import { Button } from '@/components/ui/button'
import { DashboardCard } from '@/components/ui/dashboard-card'
import { DialogContent, Dialog } from '@/components/ui/dialog'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/context/auth'
import { useUser } from '@/context/user'
import useSchools from '@/hooks/queries/useSchools'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { isMasterInstructor } from '@/utils/checkPermission'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'
// import useStateLGA from '@/hooks/queries/useStateLGA'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface IFormData {
  school: { value: string; label: string }
  state: { value: string; label: string }
}

const stateOptions = [
  {
    label: 'FCT Abuja',
    value: 'abuja',
  },
  {
    label: 'Oyo State',
    value: 'oyo',
  },
  {
    label: 'All',
    value: '',
  },
]
const SelectSchoolModal = () => {
  const {
    user,
    openSchoolModal,
    setOpenSchoolModal,
    selectedSchool,
    setSelectedSchool,
  } = useUser()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    // resetField,
  } = useForm<IFormData>()
  const { authenticate } = useAuth()
  const [searchValue, setSearchValue] = useDebouncedState('')
  const [state, setState] = useState(stateOptions[0])
  const [screenType, setScreenType] = useState('1')

  const { data: schoolsData, isFetching: schoolsLoading } = useSchools(
    searchValue,
    state.value
  )

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (schoolId: string) =>
      baseAxios.get(API.attachToSchool(schoolId)),
  })

  const schools = useMemo(
    () =>
      schoolsData?.map((st) => ({
        label: st?.name,
        value: st?.id,
      })) ?? [],
    [schoolsData]
  )

  const filterOptions = (option: any) => {
    return option
  }

  const onSubmit = async (data: IFormData) => {
    await mutate(data.school.value, {
      onSuccess: async (res) => {
        const responseData = res.data
        const accessToken = responseData?.access_token
        toast.success(`${data.school.label} selected`)
        await authenticate(accessToken)
        setSelectedSchool(data.school.label)
        setOpenSchoolModal(false)
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  useEffect(() => {
    if (isMasterInstructor(user?.roles) && !selectedSchool)
      setOpenSchoolModal(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedSchool])

  return (
    <Dialog open={openSchoolModal}>
      <DialogContent
        onClose={() =>
          !selectedSchool
            ? toast.error('Please select a school to contine')
            : setOpenSchoolModal(false)
        }
        className="md:h-[80%]"
        title={'Master Instructor - Select school'}
      >
        {screenType === '1' ? (
          <div className="px-4 flex flex-wrap items-center justify-center h-full gap-4 mx-auto max-w-2xl">
            <DashboardCard
              onClick={() => !isLoading && setScreenType('2')}
              className="cursor-pointer hover:border-primary transition-all group"
            >
              <Text
                className="group-hover:font-bold m-auto transition-all"
                variant="display/sm"
              >
                Play4Health
              </Text>
            </DashboardCard>

            <DashboardCard
              onClick={() =>
                !isLoading &&
                onSubmit({
                  school: { label: 'JICA', value: 'jica' }, //@Todo: change value to jica id
                  state: { label: 'All', value: '' },
                })
              }
              className="cursor-pointer hover:border-primary transition-all group"
            >
              {isLoading ? (
                <div className="m-auto text-center">
                  <IconPicker icon="loader2" size="1rem" className="mr-2" />
                  Please wait
                </div>
              ) : (
                <Text
                  className="group-hover:font-bold m-auto transition-all"
                  variant="display/md"
                >
                  JICA
                </Text>
              )}
            </DashboardCard>
          </div>
        ) : (
          <form
            className="m-auto h-full w-4/5 max-w-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 h-full content-center gap-6">
              <span
                onClick={() => setScreenType('1')}
                className={'flex flex-row gap-x-2 cursor-pointer mb-4'}
              >
                <IconPicker icon={IconNames.arrowLeft} />
                <Text variant="text/sm" className="text-grey-900">
                  Back
                </Text>
              </span>
              <Select
                onChange={(val: any) => {
                  setState(val)
                  setValue('school', { value: '', label: '' })
                }}
                placeholder="Select State"
                label="Select state"
                labelStyle="lg:text-sm text-xs"
                options={stateOptions}
                variant={errors?.state ? 'destructive' : 'default'}
                message={errors.state?.message ?? ''}
                classNames={{
                  menuList: () => 'h-[200px]',
                }}
                // filterOption={filterOptions}
                value={state}
              />

              <Controller
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Select
                    onChange={(val: any) => {
                      onChange(val)
                    }}
                    placeholder="Select one"
                    label="Select school"
                    labelStyle="lg:text-sm text-xs"
                    {...field}
                    options={schools}
                    isLoading={schoolsLoading}
                    variant={errors?.school ? 'destructive' : 'default'}
                    message={errors.school?.message ?? ''}
                    classNames={{
                      menuList: () => 'h-[200px]',
                    }}
                    onBlur={() => setSearchValue('')}
                    onInputChange={(val) => setSearchValue(val)}
                    filterOption={filterOptions}
                  />
                )}
                name="school"
              />

              <Button value="Submit" loading={isLoading} type="submit" />
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SelectSchoolModal
