'use client'
import { useRouter } from "next/navigation"

import { createQuiz } from '@/utils/api'

const NewEntryCard = () => {
    const router = useRouter()

    const handleOnClick = async () => {
        const data = await createQuiz()
        router.push(`/quizes/${data.id}`)
        router.refresh()
    }

    return (
        <div className="cursor-pointer overflow-hidden rounded-lg bg-black shadow-[0_2px_9px_rgba(255,106,148,0.6)]" onClick={handleOnClick}>
            <div className="px-4 py-5 sm:p-6">
                <span className="text-3xl">New Quiz</span>
            </div>
        </div>
    )
}
export default NewEntryCard