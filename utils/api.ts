import he from 'he'
/**
 * @description Function to create url for api requests
 * @param {string} path - path to api endpoint
 * @returns {string} url for api requests
 */
export const createUrl = (path: string): string => {
    return window.location.origin + path
}

export const getAllQuizes = async () => {
    const res = await fetch(
        'https://opentdb.com/api.php?amount=10&type=multiple')
    if (res.ok) {
        const data = await res.json()
        const fixedData = data.results.map((quiz: any) => {
            const fixedQuiz = {
                ...quiz,
                question: he.decode(quiz.question),
                correct_answer: he.decode(quiz.correct_answer),
                incorrect_answers: quiz.incorrect_answers.map((answer: string) => he.decode(answer))
            }
            return fixedQuiz
        })
        return fixedData
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const createQuiz = async () => {
    const data = await getAllQuizes()
    const res = await fetch(
        new Request(createUrl('/api/entry'), {
            method: 'POST',
            body: JSON.stringify( data ),
        })
    )
    
    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const deleteEntry = async (id: string) => {
    const res = await fetch(
        new Request(createUrl(`/api/entry/${id}`), {
            method: 'DELETE',
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const saveQuizAnswersToDatabase = async (id: string, answers: string[], seconds: number) => {
    const res = await fetch(
        new Request(createUrl(`/api/entry/${id}`), {
            method: 'POST',
            body: JSON.stringify({ answers, seconds }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on the API server!')
    }
}