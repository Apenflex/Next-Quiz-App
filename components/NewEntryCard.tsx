'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Spinner from '@/components/Spinner'
import { createQuiz } from '@/utils/api'

const NewEntryCard = () => {
    const router = useRouter()
    const [Loading, setLoading] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const filterIcon = filterOpen ? '▲' : '▼'
    
    const handleCreateQuiz = async () => {
        setLoading(true)
        const data = await createQuiz()
        router.push(`/quizes/${data.id}`)
        setLoading(false)
        router.refresh()
    }

    return (
        <div className="overflow-hidden rounded-lg px-4 py-5 sm:p-6 text-3xl bg-black shadow-[0_2px_9px_rgba(255,106,148,0.6)] hover:shadow-[0_2px_10px_rgba(255,106,148,0.8)] transition duration-300 ease-in-out">
            <div className="flex flex-col h-full items-start">
                <button className="cursor-pointer text-xl mb-6" onClick={() => setFilterOpen(!filterOpen)}>
                    Filter <span className='text-xs'>{filterIcon}</span>
                </button>
                <button className="cursor-pointer" onClick={handleCreateQuiz} disabled={Loading}>
                    {Loading ? <Spinner /> : 'New Quiz'}
                </button>
            </div>
        </div>
    )
}
export default NewEntryCard
