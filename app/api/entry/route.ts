import { NextResponse } from "next/server"

import { updatePath } from "@/utils/actions"
import { getUserByClerId } from "@/utils/auth"
import { prisma } from "@/utils/db"

type Quiz = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
};

export const POST = async (request: Request) => {
    const quiezes = await request.json()
    console.log(quiezes)
    const user = await getUserByClerId()

    const quizEntry = await prisma.quizEntry.create({
        data: {
            userId: user.id,
            category: 'Quiz',
            quizzes: {
                create: quiezes.map((quiz: Quiz) => ({
                    category: quiz.category,
                    type: quiz.type,
                    difficulty: quiz.difficulty,
                    question: quiz.question,
                    correctAnswer: quiz.correctAnswer,
                    incorrectAnswers: quiz.incorrectAnswers,
                })),
            },
        },
    })
    updatePath(['/quiz'])
    return NextResponse.json({ data: quizEntry })
}