import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { prisma } from '@/utils/db'

const createNewUser = async () => {
    const user = await currentUser()
    // console.log(user)
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user?.id,
        },
    })

    if (!match) {
        const newUser = await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user?.emailAddresses[0]?.emailAddress,
            },
        })
        console.log(newUser)
    }

    redirect('/quizes')
}

const NewUser = async () => {
    await createNewUser()
    return <div>...Loading</div>
}

export default NewUser
