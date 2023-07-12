'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Filter from '@/components/Filter'
import Spinner from '@/components/Spinner'
import { createQuiz } from '@/utils/api'

export type chooseFilterProps = {
    category: { id: string; value: string }
    difficulty: { id: string; value: string }
}

const NewEntryCard = () => {
    const router = useRouter()
    const [Loading, setLoading] = useState(false)
    const [filterData, setFilterData] = useState({
        category: { id: '', value: '' },
        difficulty: { id: '', value: '' }
    })
    
    const chooseFilter = (filter: chooseFilterProps) => {
        setFilterData(filter)
    }

    const handleCreateQuiz = async () => {
        setLoading(true)
        const data = await createQuiz(filterData)
        router.push(`/quizes/${data.id}`)
        setLoading(false)
        router.refresh()
    }

    return (
        <div className="overflow-hidden rounded-lg px-4 py-5 sm:p-6 text-3xl bg-black shadow-[0_2px_9px_rgba(255,106,148,0.6)] hover:shadow-[0_2px_10px_rgba(255,106,148,0.8)] transition duration-300 ease-in-out">
            <div className="flex flex-col h-full items-start">
                <Filter chooseFilter={chooseFilter} />
                <div className="flex justify-center w-full">
                    <button
                        className="text-xl cursor-pointer rounded-md py-2 px-5 bg-lime-600/60 shadow-md shadow-lime-400/70 hover:bg-lime-600/70 transition duration-300 ease-in-out"
                        onClick={handleCreateQuiz}
                        disabled={Loading}
                    >
                        {Loading ? <Spinner /> : 'New Quiz'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default NewEntryCard
