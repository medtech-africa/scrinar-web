'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { useTrainingModule } from '@/hooks/queries/useTrainingModules'
import ContentLoader from '@/components/content-loader'
import { TrainingModule } from '@/types/trainingModules.types'

const navigationItems = [
  { label: 'Training Module', icon: IconNames.arrowRight },
  { label: 'Course' },
]
const CoursePage = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const { data, isLoading } = useTrainingModule(id)

  const courseDetails = (data?.data as TrainingModule) || undefined

  if (!courseDetails) {
    return
  }

  return (
    <div>
      <ContentLoader loading={isLoading} />
      <PageHeader
        title={courseDetails?.title}
        subtitle="Explore, Learn, and Grow through Comprehensive Health Training Modules."
        navigation={navigationItems}
      />

      <section className="w-full my-4">
        {!!courseDetails.introVideo && (
          <video
            className="h-[500px] w-full"
            src={courseDetails.introVideo}
            controls
          />
        )}
      </section>

      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Resources
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {courseDetails?.resourceUrl}
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <a target="_blank" href={courseDetails?.resourceUrl}>
              <button
                type="button"
                className="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Open
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage
