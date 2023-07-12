import { chooseFilterProps } from '@/components/NewEntryCard'
import { fixData } from '@/utils/helpers'
import { fetchUrl } from '@/utils/helpers'
/**
 * @description Function to create url for api requests
 * @param {string} path - path to api endpoint
 * @returns {string} url for api requests
 */
export const createUrl = (path: string): string => {
    return window.location.origin + path
}

export const getQuizes = async (url: string) => {
    const res = await fetch(url)
    if (res.ok) {
        const data = await res.json()
        const fixedData = fixData(data.results)
        return fixedData
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const createQuiz = async (filterData: chooseFilterProps) => {
    const { category, difficulty } = filterData
    
    const data = await getQuizes(fetchUrl(category.id, difficulty.id))
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