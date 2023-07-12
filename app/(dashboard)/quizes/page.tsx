import Link from 'next/link'

import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getQuizzes = async () => {
    const user = await getUserByClerId()
    const data = await prisma.quizEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            quizzes: {
                select: {
                    id: true,
                    quizEntryId: true,
                    category: true,
                    type: true,
                    difficulty: true,
                    question: true,
                    correctAnswer: true,
                    incorrectAnswers: true,
                },
            },
        },
    })

    return data
}

const QuizPage = async () => {
    const quizes = await getQuizzes()

    return (
        <div className="text-white px-4 pt-20 pb-4 bg-black sm:px-6 sm:pt-20">
            <div className="grid justify-center grid-cols-1 gap-10 lg:grid-cols-custom-3 sm:grid-cols-2">
                <NewEntryCard />
                {quizes.map((quiz) => (
                    <div key={quiz.id}>
                        <Link href={`/quizes/${quiz.id}`}>
                            <EntryCard entry={quiz} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default QuizPage
