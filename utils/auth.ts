import { auth } from "@clerk/nextjs"

import { prisma } from "./db"

export const getUserByClerId = async () => {
    const { userId } = await auth()
    if(!userId) throw new Error('User id !!!')
    
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId as string,
        },
    })

    return user
}