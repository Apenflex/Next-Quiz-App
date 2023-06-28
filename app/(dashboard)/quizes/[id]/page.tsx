import Quiz from "@/components/Quiz"
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
type Params = {
    id: string
}
const EntryPage = async ({ params }: { params: Params }) => {
    const entry = await getEntry(params.id)
    if (!entry) return null

    return (
        <div className="w-full h-full">
            <Quiz entry={entry} />
        </div>
    )
}
export default EntryPage