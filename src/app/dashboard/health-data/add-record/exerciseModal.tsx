'use client'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { foodAmountOptions } from '@/constants/selectOptions'
import filterObject from '@/utils/filterObject'
import { useState } from 'react'
import { Text } from '@/components/ui/text'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
interface IProps {
  setExerciseData: (val: IDataToSend) => void
  onClose: () => void
}

interface IFormValue {
  foodAmount: { value: string; label: string }
  mealsPerDay: number
  fruitsTimes: {
    vegetable: number
    fruits: number
    fish: number
    egg: number
    meat: number
    carbonhydrates: number
    sweets: number
    pastries: number
    sugar: number
    friedFood: number
  }
  dietary?: string
}
interface IDataToSend extends Omit<IFormValue, 'foodAmount' | 'dietary'> {
  foodAmount: string
  dietary: string[]
}
export const ExerciseModal = ({ setExerciseData, onClose }: IProps) => {
  const [dietaries, setDietaries] = useState<string[]>([])
  const [dietary, setDietary] = useState('')

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.exercise,
  })
  const onSubmit = async (data: IFormValue) => {
    const { ...filteredData } = filterObject(data)

    const dataToSend = {
      ...filteredData,
      dietary: dietaries,
      foodAmount: data.foodAmount.label,
    }
    if (dataToSend) {
      setExerciseData(dataToSend)
      reset()
      toast.success('Successfully saved')
      onClose()
    } else {
      errorMessage('Failed to save')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 py-7 mt-2">
        <div className="w-full h-full order-last md:order-first">
          <PageCard title="Add Basic Information" bodyStyle="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
              <Controller
                name="foodAmount"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Food Amount"
                    labelStyle="lg:text-sm text-xs"
                    options={foodAmountOptions}
                    label="What is the amount of food child eats compared with the age group?"
                    variant={errors?.foodAmount ? 'destructive' : 'default'}
                    message={errors.foodAmount && errors.foodAmount?.message}
                  />
                )}
              />

              <Controller
                name="mealsPerDay"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Number of meals usually eaten per day"
                    labelStyle="lg:text-sm text-xs"
                    type="number"
                    placeholder="Number of Meals per Day"
                    variant={errors?.mealsPerDay ? 'destructive' : 'default'}
                    message={errors.mealsPerDay && errors.mealsPerDay.message}
                  />
                )}
              />
              <div className="grid gap-y-2">
                <h1>
                  What is the number of times the child took a serving (not just
                  a bit) of these food types in the last week? (excluding at
                  ceremonies or public function)
                </h1>
                <div className="grid gap-4 grid-cols-2 ">
                  <Controller
                    name="fruitsTimes.fruits"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="FRUITS"
                        placeholder="Number of Times "
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.fruits
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.fruitsTimes?.fruits &&
                          errors.fruitsTimes?.fruits.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.meat"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of Times "
                        label="MEAT"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.meat ? 'destructive' : 'default'
                        }
                        message={
                          errors.fruitsTimes?.meat &&
                          errors.fruitsTimes?.meat.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.vegetable"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="VEGETABLE"
                        placeholder="Number of Times "
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.vegetable
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.fruitsTimes?.vegetable &&
                          errors.fruitsTimes?.vegetable.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.fish"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of Times "
                        label="FISH"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.fish ? 'destructive' : 'default'
                        }
                        message={
                          errors.fruitsTimes?.fish &&
                          errors.fruitsTimes?.fish.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.egg"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of Times "
                        label="EGG"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.egg ? 'destructive' : 'default'
                        }
                        message={
                          errors.fruitsTimes?.egg &&
                          errors.fruitsTimes?.egg.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.carbonhydrates"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of Times "
                        label="CARBONHYDRATES"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.carbonhydrates
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.fruitsTimes?.carbonhydrates &&
                          errors.fruitsTimes?.carbonhydrates.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.sweets"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="SWEET (chocolate, candy,ice cream)"
                        placeholder="Number of Times "
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.sweets
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.fruitsTimes?.sweets &&
                          errors.fruitsTimes?.sweets.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.pastries"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Number of Times "
                        label="PASTRIES"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.pastries
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.fruitsTimes?.pastries &&
                          errors.fruitsTimes?.pastries.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.sugar"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="SUGAR SWEETENED (coca-cola, viju, ribena, yoghurt)"
                        placeholder="Number of Times "
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.sugar ? 'destructive' : 'default'
                        }
                        message={
                          errors.fruitsTimes?.sugar &&
                          errors.fruitsTimes?.sugar.message
                        }
                      />
                    )}
                  />
                  <Controller
                    name="fruitsTimes.friedFood"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="FRIED FOODS (meat, fish, eggs and other foods that were fried)"
                        placeholder="Number of Times "
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.fruitsTimes?.friedFood
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.fruitsTimes?.friedFood &&
                          errors.fruitsTimes?.friedFood.message
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Text className="text-grey-700 font-medium text-sm ">
                  Using the 24-hour dietary recall (recall all food eaten in the
                  last 24 hours, including drinks. Do not include weekends or
                  days with special occasions),
                </Text>
                <div className="py-[12px] px-4 bg-grey-100 rounded-lg w-full">
                  <div className="flex flex-wrap">
                    {dietaries.map((al, i) => (
                      <div
                        key={i}
                        className="mr-1 px-2 py-1 flex border-[0.5px] border-[#8C8CA2] rounded-2xl items-center mb-1"
                      >
                        <p className="text-body text-xs mr-[6.9px]">{al}</p>
                        <div
                          onClick={() =>
                            setDietaries((pr) =>
                              pr.filter((item, index) => index !== i)
                            )
                          }
                        >
                          <IconPicker icon="closeSquare" />
                        </div>
                      </div>
                    ))}
                    <Controller
                      name="dietary"
                      control={control}
                      render={({}) => (
                        <Input
                          onChange={(e) => setDietary(e.target.value)}
                          value={dietary}
                          full
                          className="ml-[12px] flex-1 bg-grey-100 border-grey-100"
                          type="text"
                          onBlur={() => {
                            if (!dietaries.includes(dietary) && dietary) {
                              setDietaries((pr) => [...pr, dietary])
                              setDietary('')
                            }
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === 'Enter' &&
                              !dietaries.includes(dietary) &&
                              dietary
                            ) {
                              setDietaries((pr) => [...pr, dietary])
                              setDietary('')
                              e.preventDefault()
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <Text variant="text/sm" className="mt-[6px] text-error-500">
                  {errors.dietary && errors.dietary.message}
                </Text>
              </div>
            </div>
            <Button
              variant={'primary'}
              value="Save"
              type="submit"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
              //   disabled={isLoading || imageLoading}
              //   loading={isLoading || imageLoading}
            />
          </PageCard>
        </div>
      </div>
    </form>
  )
}
