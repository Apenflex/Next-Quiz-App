import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Quiz App',
    description: 'Created by Svyatoslav Ivanyshyn',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-black`}>{children}</body>
            </html>
        </ClerkProvider>
    )
}
