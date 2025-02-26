import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import { useEffect, useState } from 'react'
import useForms from '@/hooks/queries/useForms'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'

interface IFormData {
  name: string
  form: { value: string; label: string }
  address: string
  description?: string
  type: { value: string; label: string }
  coordinates?: {
    lat?: number
    lng?: number
  }
}

interface GooglePlace {
  label: string
  value: {
    description: string
    place_id: string
    reference: string
    structured_formatting: {
      main_text: string
      secondary_text: string
    }
    terms: Array<{
      offset: number
      value: string
    }>
  }
}

const defaultValues = {
  name: '',
  form: { value: '', label: '' },
  address: '',
  description: '',
  type: { value: '', label: '' },
  coordinates: {
    lat: 0,
    lng: 0,
  },
}

const typeOptions = [
  { value: 'school', label: 'School' },
  { value: 'community', label: 'Community' },
  { value: 'quarters', label: 'Quarters' },
]

export const AddNewProjectContent = () => {
  const queryClient = useQueryClient()
  const [selectedPlace, setSelectedPlace] = useState<GooglePlace | null>(null)
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false)

  const { isPending: formLoading, data: forms } = useForms()

  const formOptions = forms?.data?.map((form: any) => ({
    value: form.id,
    label: form.title,
  }))

  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: any) => baseAxios.post(API.projects, dataToSend),
  })

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: validation.projectValidation,
    defaultValues,
  })

  useEffect(() => {
    const getCoordinates = async () => {
      if (!selectedPlace) return

      setIsGettingCoordinates(true)
      try {
        // Get detailed place information from the place_id
        const results = await geocodeByPlaceId(selectedPlace.value.place_id)
        if (results && results.length > 0) {
          // Get latitude and longitude
          const latLng = await getLatLng(results[0])

          // Update the form
          setValue('address', selectedPlace.value.description)
          setValue('coordinates', {
            lat: latLng.lat,
            lng: latLng.lng,
          })
        }
      } catch (error) {
        console.error('Error getting coordinates:', error)
        toast.error('Failed to get coordinates for this address')
      } finally {
        setIsGettingCoordinates(false)
      }
    }

    if (selectedPlace) {
      getCoordinates()
    }
  }, [selectedPlace, setValue])

  const onSubmit = async (data: IFormData) => {
    const { address, coordinates, ...rest } = data

    if (!coordinates?.lat || !coordinates?.lng) {
      toast.error('Please enter a valid address that can be geocoded')
      return
    }

    const dataToSend = {
      ...rest,
      form: data.form.value,
      type: data.type.value,
      location: {
        address,
        coordinates,
      },
    }

    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully created project')
          reset(defaultValues)
          setSelectedPlace(null)
          postReset()
          queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } catch (error) {
      console.error('Project creation error:', error)
    }
  }

  return (
    <form>
      <div className="w-full h-full order-last md:order-first">
        <PageCard title="Add Basic Information" bodyStyle="p-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Project Name"
                  label="Name *"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.name ? 'destructive' : 'default'}
                  message={errors.name?.message}
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select Form"
                  label="Form *"
                  labelStyle="lg:text-sm text-xs"
                  className="capitalize"
                  isLoading={formLoading}
                  {...field}
                  options={formOptions}
                  variant={errors?.form ? 'destructive' : 'default'}
                  message={errors.form?.message}
                />
              )}
              name="form"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter Description"
                  label="Description"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.description ? 'destructive' : 'default'}
                  message={errors.description?.message}
                />
              )}
              name="description"
            />

            <div className="flex flex-col">
              <label className="text-grey-700 lg:text-sm text-xs font-medium mb-[6px]">
                Address *
              </label>
              <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                selectProps={{
                  value: selectedPlace,
                  onChange: setSelectedPlace,
                  placeholder: 'Search for an address...',
                  isLoading: isGettingCoordinates,
                  className: errors?.address ? 'border-red-500' : '',
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      borderColor: errors?.address ? '#F04438' : '#D0D5DD',
                      height: '46px',
                      borderRadius: '8px',
                    }),
                  },
                }}
              />
              {errors?.address && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <Controller
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select Type"
                  label="Type *"
                  labelStyle="lg:text-sm text-xs"
                  className="capitalize"
                  {...field}
                  options={typeOptions}
                  variant={errors?.type ? 'destructive' : 'default'}
                  message={errors.type?.message}
                />
              )}
              name="type"
            />
          </div>
          <Button
            variant={'primary'}
            onClick={handleSubmit((data) => onSubmit(data))}
            value="Save Project"
            type="submit"
            leadingIcon={<IconPicker icon="saveAdd" />}
            className="mt-6"
            disabled={isLoading}
            loading={isLoading}
          />
        </PageCard>
      </div>
    </form>
  )
}
