'use client'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'

type IQuiz = {
  id: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  answer: string
  answerNote: string
  imageUrl: string
  chapter: string
  isKid: boolean
  quiz: string
}
type QuizProps = {
  questions: IQuiz[]
  onComplete: (score: number) => void
}

const convertToQuiz = (data: IQuiz) => {
  return {
    id: data.id,
    question: data.question,
    choices: [data.optionA, data.optionB, data.optionC, data.optionD],
    correctAnswer: data.answer,
    answerNote: data.answerNote,
    imageUrl: data.imageUrl,
    chapter: data.chapter,
    isKid: data.isKid,
    quiz: data.quiz,
  }
}

const Quiz = ({ questions = [], onComplete }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  )
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const currentQuestion = useMemo(
    () => questions.map(convertToQuiz)?.[activeQuestion],
    [questions, activeQuestion]
  )

  const { question, choices, correctAnswer } = currentQuestion

  const hasPassScore = useMemo(() => {
    const questionsMedian = Math.round(questions.length / 2)
    return result.score >= questionsMedian
  }, [questions, result])

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)

      if (hasPassScore) {
        onComplete(result.score)
      }
    }
  }

  const onAnswerSelected = (answer: string, index: number) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number: number) =>
    number > 9 ? number : `0${number}`

  return (
    <div className="max-w-[500px] min-w-[250px] rounded mt-[100px] px-[60px] py-[30px] flex justify-center items-center mx-auto">
      {!showResult ? (
        <div>
          <div>
            <Text variant="display/lg" weight="bold" as="span">
              {addLeadingZero(activeQuestion + 1)}
            </Text>
            <Text
              variant="display/sm"
              weight="bold"
              as="span"
              className="total-question"
            >
              /{addLeadingZero(questions.length)}
            </Text>
          </div>
          <Text variant="display/md" weight="bold" as="h2">
            {question}
          </Text>
          <ul className="mt-5 -ml-10">
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={cn(
                  'no-underline text-[#2d264b] text-base border cursor-pointer mt-[15px] p-[11px] rounded-2xl border-solid border-[#eaeaea]',
                  selectedAnswerIndex === index
                    ? 'border border-solid border-[#800080]'
                    : null
                )}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
              className="mt-5"
            >
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="">
          <h3 className="text-2xl tracking-[1.4px] text-center mb-2">
            Message
          </h3>
          {/* <p className="text-base font-medium">
            Total Question:{' '}
            <span className="text-[#800080] text-[22px]">
              {questions.length}
            </span>
          </p> */}
          {/* <p className="text-base font-medium">
            Total Score:
            <span className="text-[#800080] text-[22px]"> {result.score}</span>
          </p> */}
          {/* <p className="text-base font-medium">
            Correct Answers:
            <span className="text-[#800080] text-[22px]">
              {' '}
              {result.correctAnswers}
            </span>
          </p> */}
          {/* <p className="text-base font-medium">
            Wrong Answers:
            <span className="text-[#800080] text-[22px]">
              {' '}
              {result.wrongAnswers}
            </span>
          </p> */}

          {hasPassScore ? (
            <p className="text-lg font-medium text-green-900 text-center">
              Congratulations! You have successfully completed this module
            </p>
          ) : (
            <p className="text-lg font-medium text-center">
              Score too low. Please take the quiz again!!!
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz
