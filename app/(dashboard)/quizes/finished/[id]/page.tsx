import Link from "next/link"

import { ParamsId } from "@/types/paramsId"
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getResult = async (id: string): Promise<QuizEntry> => {
    const user = await getUserByClerId()
    const timeSpent = await prisma.quizEntry.findUnique({
        where: {
            id: id,
        },
        select: {
            quizTime: true,
            userAnswers: true,
            quizzes: {
                select: {
                    correctAnswer: true,
                },
            },
        },
    })

    return timeSpent as QuizEntry
}

type QuizEntry = {
    id: string
    quizTime: number
    userAnswers: string[]
    quizzes: {
        correctAnswer: string
    }[]
}

const resultPage = async ({ params }: { params: ParamsId }) => {
    const results = await getResult(params.id)
    console.log(results)
    const { quizTime, userAnswers, quizzes } = results

    const correctAnswersCount = userAnswers.reduce((count, answer, index) => {
        if (answer === quizzes[index].correctAnswer) {
            return count + 1
        }
        return count
    }, 0)

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col gap-6 text-center">
                <h1 className="text-xl">You result</h1>
                <div className="text-lg">
                    Correct answers:
                    <span className="text-2xl"> {correctAnswersCount}</span>
                    <span className="font-bold">/ 10</span>
                </div>
                <div className="text-lg">Time spent: {quizTime} seconds</div>
            </div>
            <div>
                <Link
                    className="rounded-md py-2 px-4 shadow-[0_2px_25px_rgba(158,106,255,0.5)] transition-shadow hover:shadow-[0_2px_25px_rgba(168,122,255,0.6)]"
                    href="/quizes/"
                >
                    Back to quizes
                </Link>
            </div>
        </div>
    )
}
export default resultPage