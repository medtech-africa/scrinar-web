'use client'
import { Button } from '@/components/ui/button'
import { DialogContent, Dialog } from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
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
import React, { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface IFormData {
  school: { value: string; label: string }
}
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
    // resetField,
  } = useForm<IFormData>()
  const { authenticate } = useAuth()
  const [searchValue, setSearchValue] = useDebouncedState('')

  const { data: schoolsData, isFetching: schoolsLoading } =
    useSchools(searchValue)

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
        <form
          className="m-auto h-full w-4/5 max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 h-full content-center gap-6">
            {/* <Select
            placeholder="Select State"
            label="State"
            onChange={(val) => {
              setState(val)
              resetField('school', {
                defaultValue: {
                  value: '',
                  label: '',
                },
              })
            }}
            labelStyle="lg:text-sm text-xs"
            className="capitalize"
            isLoading={stateLoading}
            options={stateOptions}
          /> */}

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
      </DialogContent>
    </Dialog>
  )
}

export default SelectSchoolModal
