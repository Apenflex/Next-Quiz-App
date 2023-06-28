import { NextResponse } from 'next/server'

import { updatePath } from '@/utils/actions'
import { getUserByClerId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type Params = {
    id: string
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {
    const user = await getUserByClerId()
    
    await prisma.quiz.deleteMany({
        where: {
            quizEntryId: params.id,
        },
    })

    await prisma.quizEntry.delete({
        where: {
            id: params.id,
        },
    })

    updatePath(['/quizes'])
    return NextResponse.json({ data: { id: params.id } })
}

export const POST = async (request: Request, { params }: { params: Params }) => {
    const { answers, seconds } = await request.json()

    const user = await getUserByClerId()

    const answerEntry = await prisma.quizEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            userAnswers: answers,
            quizTime: seconds,
            completed: true,
        },
    })
    updatePath(['/quizes'])
    return NextResponse.json({ data: answerEntry })
}

