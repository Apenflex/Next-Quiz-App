'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

import Spinner from "@/components/Spinner"
import { createQuiz } from '@/utils/api'

const NewEntryCard = () => {
    const router = useRouter()
    const [Loading, setLoading] = useState(false)

    const handleOnClick = async () => {
        setLoading(true)
        const data = await createQuiz()
        router.push(`/quizes/${data.id}`)
        setLoading(false)
        router.refresh()
    }

    return (
        <button
            className="cursor-pointer overflow-hidden rounded-lg px-4 py-5 sm:p-6 text-3xl bg-black shadow-[0_2px_9px_rgba(255,106,148,0.6)]"
            onClick={handleOnClick}
            disabled={Loading}>
            {Loading ? <Spinner /> : 'New Quiz'}
        </button>
    )
}
export default NewEntryCard