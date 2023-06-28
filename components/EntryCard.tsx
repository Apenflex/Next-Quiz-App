const EntryCard = ({ entry }) => {
    const { userAnswers, category, quizzes } = entry
    const quizCategory = quizzes.map((quiz) => quiz.category)
    const correctAnswersCount = userAnswers.reduce((count, answer, index) => {
        if (answer === quizzes[index].correctAnswer) {
            return count + 1
        }
        return count
    }, 0)

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
    const averageDifficulty = totalDifficulty / quizzes.length

    let difficultyLevel = ''
    if (averageDifficulty <= 1) {
        difficultyLevel = 'easy'
    } else if (averageDifficulty <= 2) {
        difficultyLevel = 'medium'
    } else {
        difficultyLevel = 'hard'
    }
    const difficultyColor = () => {
        switch (difficultyLevel) {
            case 'easy':
                return 'text-green-400'
            case 'medium':
                return 'text-yellow-400'
            case 'hard':
                return 'text-red-400'
        }
    }
    return (
        <div className="divide-y divide-gray-400/50 overflow-hidden rounded-lg bg-black shadow-[0_2px_9px_rgba(198,255,106,0.6)]">
            <div className="px-4 py-5">{category}</div>
            <div className="flex flex-col gap-2 px-4 py-2">
                <span className="border-b-2 border-b-neutral-200/30 text-center text-orange-400">List of Categories: </span>
                {quizCategory.map((item, i) => (
                    <span key={i} value={item}>
                        {item}
                    </span>
                ))}
            </div>
            <div className="flex justify-between gap-2 px-4 py-3">
                Difficulty:
                <span className={difficultyColor()}>{difficultyLevel}</span>
            </div>
            <div className="flex flex-col justify-between px-4 py-3 md:flex-row">
                <div className="flex">
                    <span>Questions:</span>
                    <span className="text-orange-300 ml-2 font-bold">{quizzes.length}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-sm">Your Result:</span>
                    <span className="text-green-400 ml-2 font-bold">{Math.round((correctAnswersCount / quizzes.length) * 100)}%</span>
                </div>
            </div>
        </div>
    )
}
export default EntryCard
