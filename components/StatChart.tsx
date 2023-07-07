'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type CustomTooltipTypes = {
    payload: {
        correctAnswersCount: number
        quizzes: string[]
        quizTime: number
        payload: {
            correctAnswersCount: number
            quizzes: string[]
            quizTime: number
        }
    }[]
}

const CustomTooltip: React.FC<CustomTooltipTypes> = ({ payload }) => {
    if (payload && payload.length !== 0) {
        const { correctAnswersCount, quizzes, quizTime } = payload[0].payload

        return (
            <div className="p-3 custom-tooltip shadow-lg bg-white/10 border border-lime-600/60 rounded-lg backdrop-blur-sm">
                <div className="flex flex-col gap-1">
                    <span className="text-md uppercase">{`Total Questions: ${quizzes.length}`}</span>
                    <span className="text-md uppercase">{`Correct Answers: ${correctAnswersCount} / 10`}</span>
                    <span className="text-md uppercase">{`Spent Time: ${quizTime} s`}</span>
                </div>
            </div>
        )
    }
    return null
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

interface StatChartProps {
    data: EntryStats[]
}

const StatChart: React.FC<StatChartProps> = ({ data }) => {
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Line type="monotone" dataKey="correctAnswersCount" stroke="#dc91fc" strokeWidth={1} activeDot={{ r: 6 }} />
                <XAxis dataKey="category" stroke="#9aa0fc" />
                <Tooltip
                    content={<CustomTooltip payload={data} />}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
export default StatChart
