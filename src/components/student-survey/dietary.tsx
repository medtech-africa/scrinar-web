import React, { useEffect } from 'react'
import { PageCard } from '../ui/page-card'
import { Input } from '../ui/input'
import { useFormContext } from 'react-hook-form'
import { Select } from '../ui/select'

const Dietary = ({ studentSurvey }: { studentSurvey: any }) => {
  const { register, setValue, watch } = useFormContext()
  useEffect(() => {
    studentSurvey?.meals.forEach((meal: any, index: number) => {
      setValue(`meals[${index}].time`, meal.time || '')
      setValue(`meals[${index}].type`, meal.type || '')
      setValue(`meals[${index}].foodName`, meal.foodName || '')
      setValue(`meals[${index}].ingredients`, meal.ingredients || '')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageCard title="24 Hour Recall for Dietary Diversity" bodyStyle="p-4">
      <div className="grid grid-cols-1 gap-6">
        <h3 className="text-lg font-semibold mb-2">
          List all the foods you ate in the last 24 hours (breakfast, lunch,
          dinner, snacks, and drinks).
        </h3>

        {/* Input for meals */}
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
              <h4 className="font-medium mb-2">Meal {index + 1}</h4>
              <div className="flex gap-4">
                <Input
                  {...register(`meals[${index}].time`)}
                  label="Time (e.g., 8:00 AM)"
                  placeholder="Time"
                />
                <Select
                  {...register(`meals[${index}].type`)}
                  label="Type (Breakfast/Lunch/Dinner/Snack)"
                  value={{
                    value: watch(`meals[${index}].type`),
                    label: watch(`meals[${index}].type`),
                  }}
                  options={[
                    { value: 'Breakfast', label: 'Breakfast' },
                    { value: 'Lunch', label: 'Lunch' },
                    { value: 'Dinner', label: 'Dinner' },
                    { value: 'Snack', label: 'Snack' },
                  ]}
                  onChange={(selectedOption: any) => {
                    const value = selectedOption.value
                    setValue(`meals[${index}].type`, value)
                  }}
                />
              </div>

              <Input
                {...register(`meals[${index}].foodName`)}
                label="Name of Dish/Food/Drink"
                placeholder="Name of Dish/Food/Drink"
              />

              <Input
                {...register(`meals[${index}].ingredients`)}
                label="List of food items used in making meal"
                placeholder="List of ingredients (comma separated)"
              />
            </div>
          ))}
        </div>
      </div>
    </PageCard>
  )
}

export default Dietary
