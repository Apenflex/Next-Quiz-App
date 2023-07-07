// import he from 'he'
import Link from 'next/link'

import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntries = async () => {
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
    const quizes = await getEntries()
    // const decode = he.decode('Which of these words means &quot;idle spectator&quot;?')
    // console.log('render', decode)
    return (
        <div className="text-white px-4 py-4 bg-black sm:px-6 sm:py-4">
            {/* <h2 className="text-3xl text-center mb-6">Quizes</h2> */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
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
