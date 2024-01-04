'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import {
  markAsComplete,
  useTrainingCourse,
  useTrainingModules,
} from '@/hooks/queries/useTrainingModules'
import ContentLoader from '@/components/content-loader'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { TrainingModule } from '@/types/trainingModules.types'
import { Button } from '@/components/ui/button'
import { formatDuration } from 'date-fns'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Progress } from '@/components/ui/progress'
import { scrollToTop } from '@/utils/scrollToTop'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Quiz from './Quiz'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const navigationItems = [
  { label: 'Training Module', icon: IconNames.arrowRight },
  { label: 'Course' },
]

type TModule = TrainingModule & {
  onPlay: () => void
  isActive?: boolean
}

const CheckIcon = ({ fill = '#E31B23' }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_157_8927"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={16}
      height={16}
    >
      <rect width={16} height={16} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_157_8927)">
      <path
        d="M4.46662 11.9991L0.699951 8.23242L1.64995 7.29909L5.41662 11.0658L4.46662 11.9991ZM8.23328 11.9991L4.46662 8.23242L5.39995 7.28242L8.23328 10.1158L14.3666 3.98242L15.2999 4.93242L8.23328 11.9991ZM8.23328 8.23242L7.28328 7.29909L10.5833 3.99909L11.5333 4.93242L8.23328 8.23242Z"
        fill={fill}
      />
    </g>
  </svg>
)

const Module = ({
  title,
  content,
  video: { duration = 0 },
  onPlay,
  isActive = false,
  isCompleted = false,
}: TModule) => {
  return (
    <div
      className={cn(
        'flex items-start gap-4 self-stretch p-4 rounded-lg border border-gray-50 bg-white w-full cursor-pointer',
        isActive && 'border-lust-400'
      )}
      onClick={onPlay}
    >
      <div className="flex justify-center items-center w-4 h-4">
        <svg
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.66675 8.00026V5.62692C2.66675 2.68026 4.75341 1.47359 7.30675 2.94692L9.36675 4.13359L11.4267 5.32026C13.9801 6.79359 13.9801 9.20692 11.4267 10.6803L9.36675 11.8669L7.30675 13.0536C4.75341 14.5269 2.66675 13.3203 2.66675 10.3736V8.00026Z"
            stroke="#101828"
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="content flex flex-col items-start gap-2 flex-1">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex justify-between items-center self-stretch">
            <Text className="text-grey-800" variant="text/sm" weight="bold">
              {title}
            </Text>
            <Text className="text-[#344054] font-['Aeonik'] text-xs leading-[1.125rem]">
              {formatDuration({ seconds: duration })}
            </Text>
          </div>
          <Text
            className="self-stretch text-grey-700"
            variant="text/xs"
            weight="default"
          >
            {content}
          </Text>
        </div>
        <div className="w-full h-px bg-gray-50" />
        <div className="flex justify-between items-center self-stretch gap-x-2">
          <div className="flex justify-center items-center gap-2 flex-1">
            <div className="text-[#344054] font-['Aeonik'] text-xs leading-[1.125rem]">
              0%
            </div>
            <div className="flex justify-center items-center w-full h-2.5 rounded-full bg-gray-50">
              <Progress value={isCompleted ? 100 : 0} className="h-2" />
            </div>
            <div className="text-[#344054] font-['Aeonik'] text-xs leading-[1.125rem]">
              100%
            </div>
          </div>
          <Button className="flex justify-center items-center hover:bg-transparent gap-2 p-0 bg-transparent">
            <CheckIcon />
            <Text className="text-primary" variant="text/xs">
              Mark as complete
            </Text>
          </Button>
        </div>
      </div>
    </div>
  )
}

const CourseDetailsPage = ({ courseId }: { courseId: string }) => {
  const id = courseId
  const { data: course, isLoading } = useTrainingCourse({
    courseId,
  })
  const {
    data: modules,
    isLoading: isModulesLoading,
    refetch,
  } = useTrainingModules({
    courseId: id,
  })

  const { mutate, isPending: isMarking } = useMutation({
    mutationFn: (moduleId: string) => markAsComplete(id, moduleId),
    mutationKey: ['training-course-progress'],
  })

  const [currentModule, setCurrentModule] = useState<
    TrainingModule | undefined
  >(modules?.[0])

  const { data: quizQuestions } = useQuery({
    queryKey: ['quiz', currentModule?.quiz],
    enabled: !!currentModule?.quiz,
    queryFn: () =>
      currentModule?.quiz
        ? baseAxios
            .get(API.quizQuestions(currentModule.quiz))
            .then((res) => res.data?.data)
        : null,
  })
  console.log('quizQuestions', quizQuestions)

  const courseDetails = course

  const isLastModule = useMemo(() => {
    let lastModuleNumber = 0
    if (modules?.length) {
      lastModuleNumber = modules[modules.length - 1].moduleNumber
    }
    return lastModuleNumber === currentModule?.moduleNumber
  }, [currentModule?.moduleNumber, modules])

  const isFirstModule =
    modules?.at(0)?.moduleNumber === currentModule?.moduleNumber

  if (!courseDetails) {
    return
  }

  if (isModulesLoading) {
    return null
  }

  const goToModule = (type: 'next' | 'prev') => {
    const nextModule = modules?.find((module) => {
      const currentNumber = currentModule?.moduleNumber || 0
      if (type === 'next') {
        return module.moduleNumber === currentNumber + 1
      } else {
        return module.moduleNumber === currentNumber - 1
      }
    })
    if (nextModule) {
      scrollToTop()
      setCurrentModule(nextModule)
    }
  }

  const markCompleted = () => {
    try {
      if (currentModule?.id) {
        mutate(currentModule.id, {
          onSuccess: () => {
            refetch()
            goToModule('next')
            toast.success('Module marked as completed')
          },
        })
      }
    } catch (error) {
      //
    }
  }

  return (
    <div>
      <ContentLoader loading={isLoading} />
      <PageHeader
        title={courseDetails?.title}
        subtitle="Explore, Learn, and Grow through Comprehensive Health Training Modules."
        navigation={navigationItems}
      />

      <section className="grid lg:grid-cols-[3fr_2fr]">
        <section className="w-full my-4">
          <div className="">
            <Text variant="display/xs" weight="bold">
              {currentModule?.moduleNumber}. {currentModule?.title}
            </Text>
            {!!currentModule?.video.url && (
              <video
                className="h-[500px] w-full"
                src={currentModule.video.url}
                controls
              />
            )}
          </div>

          <div className="flex justify-between items-center my-8">
            <Button
              loading={isMarking}
              leadingIcon={<CheckIcon fill="#fff" />}
              onClick={markCompleted}
              disabled={currentModule?.isCompleted}
            >
              Mark completed
            </Button>
            {/* <Button onClick={markCompleted}>Take Quiz</Button> */}

            <Dialog>
              <DialogTrigger>Take Quiz</DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                title={`${currentModule?.content} Quiz Questions`}
              >
                <DialogHeader>
                  <DialogTitle>
                    {currentModule?.content} Quiz Questions
                  </DialogTitle>
                  <DialogDescription>
                    Answer the questions below
                  </DialogDescription>
                </DialogHeader>
                <Quiz questions={quizQuestions} />
              </DialogContent>
            </Dialog>
          </div>

          <Accordion type="single" collapsible defaultValue="resources">
            <AccordionItem value="resources">
              <AccordionTrigger>
                <Text
                  variant="text/sm"
                  className="text-grey-800"
                  weight="medium"
                >
                  Resources
                </Text>
              </AccordionTrigger>
              <AccordionContent className="gap-y-4 grid">
                {currentModule?.resources?.map((resource) => (
                  <div key={resource.title} className="w-full grid">
                    <div className="w-full flex justify-between items-center mb-1">
                      <Text variant="text/sm">{resource.title}</Text>
                      <a target="_blank" href={resource.url}>
                        <button
                          type="button"
                          className="relative inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Open in new tab
                        </button>
                      </a>
                    </div>
                    <iframe
                      src={resource.url}
                      height="480"
                      title={resource.title}
                      allow="autoplay"
                      className="w-full h-[calc(100vh-200px)]"
                    ></iframe>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-between items-center mt-8">
            <Button disabled={isFirstModule} onClick={() => goToModule('prev')}>
              Go To Previous Module
            </Button>
            <Button disabled={isLastModule} onClick={() => goToModule('next')}>
              Go To Next Module
            </Button>
          </div>
        </section>

        <div className="bg-white px-4 py-5 sm:px-6">
          <PageCard title="Module Summary" bodyStyle="px-4 pb-4">
            <Text className="text-gray-800" variant="text/xs">
              {courseDetails.description}
            </Text>
          </PageCard>

          <Accordion type="single" collapsible defaultValue="modules">
            <AccordionItem value="modules">
              <AccordionTrigger>
                <Text
                  variant="text/sm"
                  className="text-grey-800"
                  weight="medium"
                >
                  Topic Covered
                </Text>
              </AccordionTrigger>
              <AccordionContent className="gap-y-4 grid">
                {modules?.map((module) => (
                  <div key={module.id} className="w-full">
                    <Module
                      key={module.id}
                      {...module}
                      isActive={currentModule?.id === module.id}
                      onPlay={() => setCurrentModule(module)}
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}

export default CourseDetailsPage
