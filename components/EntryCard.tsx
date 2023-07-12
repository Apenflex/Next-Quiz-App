type Quiz = {
    id: string
    quizEntryId: string
    category: string
    type: string
    difficulty: string
    question: string
    correctAnswer: string
    incorrectAnswers: string[]
}

type Entry = {
    id: string
    category: string
    userAnswers: string[]
    quizTime: number
    completed: boolean
    userId: string
    quizzes: Quiz[]
}

const EntryCard = ({ entry }: { entry: Entry }) => {
    const { userAnswers, category, quizzes } = entry
    const quizCategory = quizzes.map((quiz) => quiz.category)
    const correctAnswersCount = userAnswers.reduce((count, answer, index) => {
        if (answer === quizzes[index].correctAnswer) {
            return count + 1
        }
        return count
    }, 0)
    
    const calculateAverageDifficulty = (quizzes: Quiz[]) => {
        let totalDifficulty = 0
        for (const quiz of quizzes) {
            const difficulty = quiz.difficulty
            if (difficulty === 'easy') {
                totalDifficulty += 1
            } else if (difficulty === 'medium') {
                totalDifficulty += 2
            } else if (difficulty === 'hard') {
                totalDifficulty += 3
            }
        }
        return totalDifficulty / quizzes.length
    }
    const calculateDifficultyLevel = (averageDifficulty: number) => {
        if (averageDifficulty <= 1) {
            return 'easy'
        } else if (averageDifficulty <= 2) {
            return 'medium'
        } else {
            return 'hard'
        }
    }

    const difficultyColor = () => {
        switch (difficultyLevel) {
            case 'easy':
                return 'text-green-500'
            case 'medium':
                return 'text-yellow-500'
            case 'hard':
                return 'text-red-500'
        }
    }

    const avgDifficulty = calculateAverageDifficulty(quizzes)
    const difficultyLevel = calculateDifficultyLevel(avgDifficulty)
    const questionCount = quizzes.length
    const correctAnswersPercentage = Math.round((correctAnswersCount / quizzes.length) * 100)

    return (
        <div className="divide-y divide-gray-400/50 overflow-hidden rounded-lg bg-black shadow-[0_2px_9px_rgba(198,255,106,0.6)] hover:shadow-[0_3px_12px_rgba(198,255,106,0.7)] transition duration-300 ease-in-out ">
            <div className="px-4 py-5">{category}</div>
            <div className="flex flex-col gap-2 px-4 py-2">
                <span className="border-b-2 border-b-neutral-200/30 text-center text-orange-400">List of Categories: </span>
                <ul>
                    {quizCategory.map((item, i) => (
                        <li className="py-1" key={i}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-between gap-2 px-4 py-3">
                Difficulty:
                <span className={difficultyColor()}>{difficultyLevel}</span>
            </div>
            <div className="flex justify-between p-4">
                <div className="flex">
                    <span>Questions:</span>
                    <span className="text-orange-600 ml-2 font-bold">{questionCount}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-sm">Your Result:</span>
                    <span className="text-green-400 ml-2 font-bold">{correctAnswersPercentage}%</span>
                </div>
            </div>
        </div>
    )
}
export default EntryCard
