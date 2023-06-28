import StatChart from '@/components/StatChart'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
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

const StatsPage = async () => {
    const data = await getData()

    const entryStats = data.map((entry) => ({
        category: entry.category,
        userAnswers: entry.userAnswers,
        quizzes: entry.quizzes,
        quizTime: entry.quizTime,
        completed: entry.completed,
        correctAnswersCount: entry.correctAnswersCount,
        totalQuestions: entry.totalQuestions,
    }))
    
    const allQuestions = data.reduce((total, entry) => total + entry.quizzes.length, 0)
    const allCorrectAnswers = data.reduce((total, entry) => total + entry.correctAnswersCount, 0)
    const accuracyPercentage = (allCorrectAnswers / allQuestions) * 100

    const completedQuizzes = data.filter((entry) => entry.completed)
    const totalCompletedQuizzes = completedQuizzes.length

    return (
        <div className="h-full px-6 py-8">
            <div className="flex flex-col">
                <span className="text-xl mb-2">{`Tot.Correct Answers: ${accuracyPercentage} %`}</span>
                <span className="text-xl mb-2">{`Completed quizes ${totalCompletedQuizzes}`}</span>
            </div>
            <div className="h-full w-full">
                <StatChart data={entryStats} />
            </div>
        </div>
    )
}
export default StatsPage
