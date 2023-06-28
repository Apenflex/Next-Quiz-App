import Quiz from "@/components/Quiz"
import { ParamsId } from '@/types/paramsId'
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id: string) => {
    const user = await getUserByClerId()
    const entry = await prisma.quizEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            },
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
    return entry
}

const EntryPage = async ({ params }: { params: ParamsId }) => {
    const entry = await getEntry(params.id)
    if (!entry) return null

    return (
        <div className="w-full h-full">
            <Quiz entry={entry} />
        </div>
    )
}
export default EntryPage