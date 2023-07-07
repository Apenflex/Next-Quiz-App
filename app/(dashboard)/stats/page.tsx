import StatChart from '@/components/StatChart'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

interface Quiz {
    id: string
    quizEntryId: string
    category: string
    type: string
    difficulty: string
}

interface QuizEntry {
    id: string
    createdAt: Date
    updatedAt: Date
    category: string
    completed: boolean
    userAnswers: string[]
    quizzes: Quiz[]
}

interface EntryData {
    category: string
    userAnswers: string[]
    quizzes: string[]
    quizTime: number
    completed: boolean
    correctAnswersCount: number
    totalQuestions: number
}

const getData = async (): Promise<EntryData[]> => {
    const user = await getUserByClerId()
    const statistics = await prisma.quizEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            quizzes: true,
        },
    })

    const data = statistics.map((entry) => {
        const quizzes = entry.quizzes.map((quiz) => quiz.correctAnswer)
        const correctAnswersCount = entry.userAnswers.reduce((count, answer, index) => {
            if (answer === quizzes[index]) {
                return count + 1
            }
            return count
        }, 0)
        const totalQuestions = quizzes.length

        return {
            category: entry.category,
            userAnswers: entry.userAnswers,
            quizzes,
            quizTime: entry.quizTime,
            completed: entry.completed,
            correctAnswersCount,
            totalQuestions,
        }
    })
    return data
}

interface EntryStats {
    category: string
    userAnswers: string[]
    quizzes: string[]
    quizTime: number
    completed: boolean
    correctAnswersCount: number
    totalQuestions: number
    payload: {
        correctAnswersCount: number
        quizzes: string[]
        quizTime: number
    }
}

const StatsPage = async (): Promise<JSX.Element> => {
    const data = await getData()

    const entryStats: EntryStats[] = data.map((entry) => ({
        category: entry.category,
        userAnswers: entry.userAnswers,
        quizzes: entry.quizzes,
        quizTime: entry.quizTime,
        completed: entry.completed,
        correctAnswersCount: entry.correctAnswersCount,
        totalQuestions: entry.totalQuestions,
        payload: {
            correctAnswersCount: entry.correctAnswersCount,
            quizzes: entry.quizzes,
            quizTime: entry.quizTime,
        },
    }))

    const allQuestions = data.reduce((total, entry) => total + entry.quizzes.length, 0)
    const allCorrectAnswers = data.reduce((total, entry) => total + entry.correctAnswersCount, 0)
    const accuracyPercentage = (allCorrectAnswers / allQuestions) * 100

    const completedQuizzes = data.filter((entry) => entry.completed)
    const totalCompletedQuizzes = completedQuizzes.length

    return (
        <div className="h-full px-6 py-20">
            <div className="flex flex-col">
                <span className="text-xl mb-2">{`Tot.Correct Answers: ${accuracyPercentage.toFixed(2)} %`}</span>
                <span className="text-xl mb-2">{`Completed quizes ${totalCompletedQuizzes}`}</span>
            </div>
            <div className="h-full w-full">
                <StatChart data={entryStats} />
            </div>
        </div>
    )
}
export default StatsPage
