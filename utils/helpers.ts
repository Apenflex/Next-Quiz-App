import he from 'he'

export const fixData = (data: []) => {
    const fixedData = data.map((quiz: any) => {
        const fixedQuiz = {
            ...quiz,
            question: he.decode(quiz.question),
            correct_answer: he.decode(quiz.correct_answer),
            incorrect_answers: quiz.incorrect_answers.map((answer: string) => he.decode(answer)),
        }
        return fixedQuiz
    })
    return fixedData
}

export const filterList = {
    category: [
        { id: '9', name: 'General Knowledge' },
        { id: '10', name: 'Entertainment: Books' },
        { id: '11', name: 'Entertainment: Film' },
        { id: '12', name: 'Entertainment: Music' },
        { id: '13', name: 'Entertainment: Musicals & Theatres' },
        { id: '14', name: 'Entertainment: Television' },
        { id: '15', name: 'Entertainment: Video Games' },
        { id: '16', name: 'Entertainment: Board Games' },
        { id: '17', name: 'Science & Nature' },
        { id: '18', name: 'Science: Computers' },
        { id: '19', name: 'Science: Mathematics' },
        { id: '20', name: 'Mythology' },
        { id: '21', name: 'Sports' },
        { id: '22', name: 'Geography' },
        { id: '23', name: 'History' },
        { id: '24', name: 'Politics' },
        { id: '25', name: 'Art' },
        { id: '26', name: 'Celebrities' },
        { id: '27', name: 'Animals' },
        { id: '28', name: 'Vehicles' },
        { id: '29', name: 'Entertainment: Comics' },
        { id: '30', name: 'Science: Gadgets' },
        { id: '31', name: 'Entertainment: Japanese Anime & Manga' },
        { id: '32', name: 'Entertainment: Cartoon & Animations' },
    ],
    difficulty: [
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' },
    ],
}

export const fetchUrl = (category: {}, difficulty: {}) => {
    
    // https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple
    // https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple
    // https://opentdb.com/api.php?amount=10&category=21&type=multiple
    // https://opentdb.com/api.php?amount=10&category=21&type=multiple

    if (category === '' && difficulty === '') {
        return 'https://opentdb.com/api.php?amount=10&type=multiple'
    } else if (category !== '' && difficulty === '') {
        return `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
    } else if (category === '' && difficulty !== '') {
        return `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
    } else {
        return `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    }
}