'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'
import { deleteEntry, saveQuizAnswersToDatabase } from '@/utils/api'

const Quiz = ({ entry }) => {
    const quizzes = entry.quizzes || []
    const router = useRouter()
    const [Sending, setSending] = useState(false)
    const [Deleting, setDeleting] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswers, setUserAnswers] = useState([])
    const [seconds, setSeconds] = useState(0)
    const [intervalId, setIntervalId] = useState(null)

    useEffect(() => {
        const id = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1)
        }, 1000)
        setIntervalId(id)

        return () => {
            clearInterval(id)
            setIntervalId(null)
        }
    }, [])

    const handleAnswer = (answer) => {
        setUserAnswers((prevAnswers) => [...prevAnswers, answer])
        setCurrentQuestion((prevQuestion) => prevQuestion + 1)
    }

    const isAnswered = (questionIndex) => {
        return userAnswers[questionIndex] !== undefined
    }

    const handleDelete = async () => {
        setDeleting(true)
        await deleteEntry(entry.id)
        setDeleting(false)
        router.push('/quizes')
        router.refresh()
    }

    const handleFinishQuiz = async () => {
        setSending(true)
        await saveQuizAnswersToDatabase(entry.id, userAnswers, seconds)
        setSending(false)
        router.push(`/quizes/finished/${entry.id}`)
    }

    const allQuestionsAnswered = userAnswers.length === quizzes.length

    useEffect(() => {
        if (allQuestionsAnswered && intervalId) {
            clearInterval(intervalId)
            setIntervalId(null)
        }
    }, [allQuestionsAnswered, intervalId])

    return (
        <div className="p-4">
            <div className="relative w-full h-full gap-3 text-white shadow-[0_5px_35px_rgba(106,210,255,0.5)] rounded-lg p-4">
                <span className="absolute top-3 left-3 text-lg font-bold">{seconds}</span>
                {currentQuestion < quizzes.length ? (
                    <div className="flex flex-col justify-center items-center h-full">
                        <h2 className="text-lg mb-3">Question {currentQuestion + 1}</h2>
                        <p className="text-xl text-center mb-4">{quizzes[currentQuestion].question}</p>
                        <ul className="mb-8">
                            {quizzes[currentQuestion].incorrectAnswers.map((option) => (
                                <li className="mb-3 text-xl" key={option}>
                                    <label className="cursor-pointer">
                                        <input
                                            className="mr-2"
                                            type="radio"
                                            name={`question${currentQuestion}`}
                                            value={option}
                                            onChange={() => handleAnswer(option)}
                                            disabled={isAnswered(currentQuestion)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                            <li className="mb-3 text-xl" key={quizzes[currentQuestion].correctAnswer}>
                                <label className="cursor-pointer">
                                    <input
                                        className="mr-2"
                                        type="radio"
                                        name={`question${currentQuestion}`}
                                        value={quizzes[currentQuestion].correctAnswer}
                                        onChange={() => handleAnswer(quizzes[currentQuestion].correctAnswer)}
                                        disabled={isAnswered(currentQuestion)}
                                    />
                                    {quizzes[currentQuestion].correctAnswer}
                                </label>
                            </li>
                        </ul>
                        <div className="flex flex-col justify-around gap-8 sm:flex-row">
                            <Link
                                className="rounded-md py-2 px-4 shadow-[0_2px_25px_rgba(158,106,255,0.5)] transition-shadow hover:shadow-[0_2px_25px_rgba(168,122,255,0.6)]"
                                href="/quizes/"
                            >
                                Back to quizes
                            </Link>
                            <button
                                className="w-[120px] rounded-md py-2 px-4 shadow-[0_2px_25px_rgba(255,106,181,0.5)] transition-shadow hover:shadow-[0_2px_25px_rgba(255,106,181,0.6)]"
                                onClick={handleDelete}
                                disabled={Deleting}
                            >
                                {Deleting ? <Spinner /> : 'Delete Quiz'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col mt-5 justify-around gap-6 sm:flex-row">
                        <h2 className="text-center">Quiz Completed</h2>

                        <button
                            className="rounded-md py-2 px-4 shadow-[0_2px_25px_rgba(255,106,181,0.5)] transition-shadow hover:shadow-[0_2px_25px_rgba(255,106,181,0.6)] animate-pulse"
                            onClick={handleFinishQuiz}
                            disabled={Sending}
                        >
                            {Sending ? <Spinner /> : 'Show results'}
                        </button>

                        <Link
                            className="text-center rounded-md py-2 px-4 shadow-[0_2px_25px_rgba(158,106,255,0.5)] transition-shadow hover:shadow-[0_2px_25px_rgba(168,122,255,0.6)]"
                            href="/quizes/"
                        >
                            Back to quizes
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Quiz
